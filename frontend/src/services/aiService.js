export async function sendMessage(
  message,
  conversationHistory = [],
  onChunk
) {
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
    throw new Error(
      "Failed to get response from UsTalk backend."
    );
  }

  if (!response.body) {
    throw new Error(
      "UsTalk backend did not return a response stream."
    );
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let fullResponse = "";
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    buffer += decoder.decode(value, {
      stream: true,
    });

    const lines = buffer.split("\n");

    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.trim()) continue;

      try {
        const data = JSON.parse(line);

        const chunk = data?.message?.content || "";

        if (chunk) {
          fullResponse += chunk;

          if (onChunk) {
            onChunk(chunk, fullResponse);
          }
        }
      } catch (error) {
        console.warn(
          "Could not parse AI stream chunk:",
          line
        );
      }
    }
  }

  return {
    content: fullResponse,
  };
}