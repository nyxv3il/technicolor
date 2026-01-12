// Netlify serverless function
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { query, context: userContext } = JSON.parse(event.body);

    const API_KEY = process.env.OPENROUTER_API_KEY;

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
                userContext.rules
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

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: data.choices[0].message.content,
      }),
    };
  } catch (error) {
    console.error("AI Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "CONNECTION_FAILURE: Unable to reach core processor.",
      }),
    };
  }
};
