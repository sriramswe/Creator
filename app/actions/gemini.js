"use server";

/**
 * Generate Blog Content using OpenRouter
 */
export async function generateBlogContent(title, category = "", tags = []) {
  try {
    if (!title || title.trim().length === 0) {
      throw new Error("Title is required to generate content");
    }

    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("OpenRouter API key is not configured");
    }

    const prompt = `
Write a comprehensive blog post with the title: "${title}"

${category ? `Category: ${category}` : ""}
${tags.length > 0 ? `Tags: ${tags.join(", ")}` : ""}

Requirements:
- Write engaging, informative content
- Use HTML tags: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>
- Include 3–5 sections
- 800–1200 words
- Add examples and insights
- Do NOT include title
- Start with introduction
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Blog AI Generator",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          model: "openrouter/auto", // ✅ BEST
          messages: [
            {
              role: "system",
              content: "You are a professional blog writer. Return HTML content only."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1500
        }),
      }
    );

    const text = await response.text();

    if (!response.ok) {
      throw new Error(`OpenRouter Error: ${text}`);
    }

    const data = JSON.parse(text);

    const content = data.choices?.[0]?.message?.content?.trim();

    if (!content || content.length < 100) {
      throw new Error("Generated content is too short");
    }

    return {
      success: true,
      content,
    };
  } catch (error) {
    console.error("AI Error:", error);

    return {
      success: false,
      error: error.message || "Failed to generate content",
    };
  }
}

/**
 * Improve Existing Content (OpenRouter)
 */
export async function improveContent(
  currentContent,
  improvementType = "enhance"
) {
  try {
    if (!currentContent || currentContent.trim().length === 0) {
      throw new Error("Content is required");
    }

    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("OpenRouter API key is not configured");
    }

    let instruction = "";

    switch (improvementType) {
      case "expand":
        instruction = "Expand this content with more details, examples, and insights.";
        break;
      case "simplify":
        instruction = "Simplify this content and make it easier to read.";
        break;
      default:
        instruction = "Improve this content to make it more engaging and well-structured.";
    }

    const prompt = `
${instruction}

Content:
${currentContent}

Requirements:
- Maintain HTML format
- Keep structure clean
- Improve readability
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Blog AI Improver",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          model: "openrouter/auto", // ✅ SAFE
          messages: [
            {
              role: "system",
              content: "You are a content editor. Return improved HTML only."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.6,
          max_tokens: 1500
        }),
      }
    );

    const text = await response.text();

    if (!response.ok) {
      throw new Error(`OpenRouter Error: ${text}`);
    }

    const data = JSON.parse(text);

    return {
      success: true,
      content: data.choices?.[0]?.message?.content?.trim(),
    };
  } catch (error) {
    console.error("Improve Error:", error);

    return {
      success: false,
      error: error.message || "Failed to improve content",
    };
  }
}