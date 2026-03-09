import { supabase } from "@/lib/supabase";
import SubmissionTable from "@/components/submission-table";
import CategoryFilter from "@/components/category-filter";
import type { Submission } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

interface DashboardPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { category: rawCategory } = await searchParams;

  // Only accept valid known categories to prevent injection into the query
  const activeCategory = CATEGORIES.includes(rawCategory as (typeof CATEGORIES)[number])
    ? rawCategory
    : undefined;

  let query = supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (activeCategory) {
    query = query.eq("ai_category", activeCategory);
  }

  const { data: submissions, error } = await query;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Submissions</h1>
          {!error && (
            <p className="mt-1 text-sm text-gray-500">
              {submissions?.length ?? 0}{" "}
              {submissions?.length === 1 ? "entry" : "entries"}
              {activeCategory ? ` in "${activeCategory}"` : " total"}
            </p>
          )}
        </div>

        <div className="mb-6">
          <CategoryFilter active={activeCategory} />
        </div>

        {error ? (
          <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            Failed to load submissions. Please try refreshing the page.
          </p>
        ) : (
          <SubmissionTable submissions={(submissions as Submission[]) ?? []} />
        )}
      </div>
    </main>
  );
}
