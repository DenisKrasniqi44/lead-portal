export interface Submission {
  id: string;
  name: string;
  email: string;
  business_name: string;
  industry: string;
  help_text: string;
  ai_summary: string | null;
  ai_category: string | null;
  created_at: string;
}

export const INDUSTRIES = [
  "Healthcare",
  "Real Estate",
  "Legal",
  "Finance",
  "Professional Services",
  "Other",
] as const;

export const CATEGORIES = [
  "Automation",
  "Website",
  "AI Integration",
  "SEO",
  "Custom Software",
  "Other",
] as const;
