"use server";

/**
 * Generate Blog Content using Ollama (FREE, local AI)
 */
export async function generateBlogContent(title, category = "", tags = []) {
  try {
    if (!title || title.trim().length === 0) {
      throw new Error("Title is required to generate content");
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

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3", // make sure installed in Ollama
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to connect to Ollama");
    }

    const data = await response.json();

    const content = data.response;

    if (!content || content.trim().length < 100) {
      throw new Error("Generated content is too short");
    }

    return {
      success: true,
      content: content.trim(),
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
 * Improve Existing Content
 */
export async function improveContent(
  currentContent,
  improvementType = "enhance"
) {
  try {
    if (!currentContent || currentContent.trim().length === 0) {
      throw new Error("Content is required");
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

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3",
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to connect to Ollama");
    }

    const data = await response.json();

    return {
      success: true,
      content: data.response.trim(),
    };
  } catch (error) {
    console.error("Improve Error:", error);

    return {
      success: false,
      error: error.message || "Failed to improve content",
    };
  }
}