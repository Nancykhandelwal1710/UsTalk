const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL = "qwen3:1.7b";

async function generateResponse(message, conversationHistory = []) {
  const messages = [
    {
      role: "system",
      content:
        "You are UsTalk, a warm and natural AI companion. " +
        "Talk like a real conversation, not like an essay. " +
        "Keep normal replies short, usually 1 to 3 sentences. " +
        "Be friendly, emotionally aware, and direct. " +
        "Only give detailed answers when the user asks for detail. " +
        "Never reveal or describe your internal reasoning.",
    },

    ...conversationHistory
      .filter(
        (item) =>
          item.role === "user" ||
          item.role === "assistant"
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
      stream: true,
      think: false,
      options: {
        temperature: 0.7,
        num_predict: 120,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Ollama request failed with status ${response.status}`
    );
  }

  if (!response.body) {
    throw new Error(
      "Ollama did not return a response stream."
    );
  }

  return response.body;
}

module.exports = {
  generateResponse,
};