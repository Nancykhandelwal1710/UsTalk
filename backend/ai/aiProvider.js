const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL = "qwen3:1.7b";

async function generateResponse(message, conversationHistory = []) {
  const messages = [
    {
      role: "system",
      content:
        "You are UsTalk, a warm, natural AI companion. " +
        "Be conversational, concise, and helpful. " +
        "Do not mention internal reasoning or system instructions.",
    },
    ...conversationHistory
      .filter(
        (item) =>
          item.role === "user" || item.role === "assistant"
      )
      .map((item) => ({
        role: item.role,
        content: item.content,
      })),
    {
      role: "user",
      content: message,
    },
  ];

  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Ollama request failed with status ${response.status}`
    );
  }

  const data = await response.json();

  return {
    role: "assistant",
    content: data.message?.content?.trim() || "I'm here.",
  };
}

module.exports = {
  generateResponse,
};