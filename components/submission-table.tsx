import type { Submission } from "@/lib/types";

const CATEGORY_COLORS: Record<string, string> = {
  Automation: "bg-blue-100 text-blue-700",
  Website: "bg-green-100 text-green-700",
  "AI Integration": "bg-purple-100 text-purple-700",
  SEO: "bg-yellow-100 text-yellow-700",
  "Custom Software": "bg-orange-100 text-orange-700",
  Other: "bg-gray-100 text-gray-600",
};

interface SubmissionTableProps {
  submissions: Submission[];
}

export default function SubmissionTable({ submissions }: SubmissionTableProps) {
  if (submissions.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-sm">No submissions match this filter.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {submissions.map((s) => (
        <div
          key={s.id}
          className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 truncate">{s.name}</p>
              <p className="text-sm text-gray-500 mt-0.5">
                {s.business_name}&nbsp;·&nbsp;{s.industry}
              </p>
              <a
                href={`mailto:${s.email}`}
                className="text-sm text-indigo-600 hover:underline"
              >
                {s.email}
              </a>
            </div>

            {s.ai_category && (
              <span
                className={`self-start shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                  CATEGORY_COLORS[s.ai_category] ?? "bg-gray-100 text-gray-600"
                }`}
              >
                {s.ai_category}
              </span>
            )}
          </div>

          {s.ai_summary && (
            <p className="mt-3 text-sm text-gray-700 italic border-l-2 border-indigo-200 pl-3">
              {s.ai_summary}
            </p>
          )}

          <p className="mt-3 text-sm text-gray-600 leading-relaxed">{s.help_text}</p>

          <p className="mt-4 text-xs text-gray-400">
            {new Date(s.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      ))}
    </div>
  );
}
