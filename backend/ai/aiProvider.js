async function generateResponse(message, conversationHistory = []) {
  console.log("AI Provider received:", {
    message,
    conversationHistory,
  });

  return {
    role: "assistant",
    content: "AI provider connected. Real model coming next.",
  };
}

module.exports = {
  generateResponse,
};