import { GoogleGenerativeAI } from "@google/generative-ai";
import { CATEGORIES } from "./types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeSubmission(helpText: string): Promise<{
  summary: string;
  category: string;
}> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const validCategories = CATEGORIES.join(", ");

  const prompt = `You are analyzing a business inquiry for a digital services agency.

Given the following client inquiry, respond with a JSON object containing exactly two fields:
- "summary": one clear, concise sentence describing what the client needs
- "category": exactly one value from this list: ${validCategories}

Inquiry:
"${helpText}"

Respond with only valid JSON. No markdown fences, no extra text.`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();

  try {
    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/, "")
      .trim();

    const parsed = JSON.parse(cleaned) as { summary?: string; category?: string };

    const category = CATEGORIES.includes(parsed.category as (typeof CATEGORIES)[number])
      ? parsed.category!
      : "Other";

    return {
      summary: parsed.summary?.trim() || "No summary available.",
      category,
    };
  } catch {
    return { summary: "Unable to generate a summary.", category: "Other" };
  }
}
