export async function sendMessage(message, conversationHistory = []) {
  const response = await fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      conversationHistory,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get response from UsTalk backend.");
  }

  return response.json();
}