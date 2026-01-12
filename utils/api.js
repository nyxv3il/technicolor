const API_KEY =
  "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";

export async function askAI(query, context) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "tngtech/deepseek-r1t2-chimera:free",
          messages: [
            {
              role: "system",
              content: `You are the Technicolor '26 AI Assistant. Here are the rules: ${JSON.stringify(
                context.rules
              )}. Answer briefly and professionally in a cyberpunk terminal style.`,
            },
            {
              role: "user",
              content: query,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI Error:", error);
    return "CONNECTION_FAILURE: Unable to reach core processor.";
  }
}
