import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { analyzeSubmission } from "@/lib/gemini";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, business_name, industry, help_text } = body;

  if (!name || !email || !business_name || !industry || !help_text) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const { summary, category } = await analyzeSubmission(help_text);

  const { data, error } = await supabase
    .from("submissions")
    .insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      business_name: business_name.trim(),
      industry,
      help_text: help_text.trim(),
      ai_summary: summary,
      ai_category: category,
    })
    .select()
    .single();

  if (error) {
    console.error("[POST /api/submissions]", error.message);
    return NextResponse.json({ error: "Failed to save your submission." }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");

  let query = supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("ai_category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("[GET /api/submissions]", error.message);
    return NextResponse.json({ error: "Failed to fetch submissions." }, { status: 500 });
  }

  return NextResponse.json(data);
}
