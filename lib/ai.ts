import Groq from "groq-sdk";
import { CATEGORIES } from "./types";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function analyzeSubmission(helpText: string): Promise<{
  summary: string;
  category: string;
}> {
  const validCategories = CATEGORIES.join(", ");

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that analyzes business inquiries for a digital services agency. " +
          "Respond only with valid JSON — no markdown, no prose, no extra text.",
      },
      {
        role: "user",
        content:
          `Given the following client inquiry, return a JSON object with exactly two fields:\n` +
          `- "summary": one clear, concise sentence describing what the client needs\n` +
          `- "category": exactly one value from this list: ${validCategories}\n\n` +
          `Inquiry:\n"${helpText}"`,
      },
    ],
    temperature: 0.2,
    max_tokens: 200,
  });

  const raw = completion.choices[0]?.message?.content?.trim() ?? "";

  try {
    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/m, "")
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
