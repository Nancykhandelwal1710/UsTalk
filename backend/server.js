const { generateResponse } = require("./ai/aiProvider");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

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

    const response = await generateResponse(
      message,
      conversationHistory
    );

    res.json(response);
  } catch (error) {
    console.error("AI response error:", error);

    res.status(500).json({
      role: "assistant",
      content: "Something went wrong while processing your message.",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`UsTalk backend running on port ${PORT}`);
});