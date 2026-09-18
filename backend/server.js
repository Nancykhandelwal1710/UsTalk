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

app.post("/api/chat", (req, res) => {
  const { message, conversationHistory = [] } = req.body;

  console.log("Chat request received:");
  console.log("Message:", message);
  console.log("History:", conversationHistory);

  res.json({
    role: "assistant",
    content: "I received your message. AI will be connected here.",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`UsTalk backend running on port ${PORT}`);
});