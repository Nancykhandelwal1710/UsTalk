const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { generateResponse } = require("./ai/aiProvider");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "UsTalk backend",
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    console.log("Chat request received:");
    console.log("Message:", message);
    console.log("History:", conversationHistory);

    const stream = await generateResponse(
      message,
      conversationHistory
    );

    res.setHeader("Content-Type", "application/x-ndjson");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const reader = stream.getReader();
    const decoder = new TextDecoder();

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, {
          stream: true,
        });

        res.write(chunk);
      }
    } finally {
      reader.releaseLock();
    }

    res.end();
  } catch (error) {
    console.error("AI response error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        error: "Something went wrong while processing your message.",
      });
    } else {
      res.end();
    }
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`UsTalk backend running on port ${PORT}`);
});