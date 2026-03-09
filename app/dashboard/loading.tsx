export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 space-y-2">
          <div className="h-8 w-40 rounded-lg bg-gray-200 animate-pulse" />
          <div className="h-4 w-24 rounded-lg bg-gray-200 animate-pulse" />
        </div>

        {/* Filter pill skeletons */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="h-8 rounded-full bg-gray-200 animate-pulse"
              style={{ width: `${60 + i * 8}px` }}
            />
          ))}
        </div>

        {/* Card skeletons */}
        <div className="grid gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1 mr-4">
                  <div className="h-4 w-36 rounded bg-gray-200 animate-pulse" />
                  <div className="h-3 w-52 rounded bg-gray-200 animate-pulse" />
                  <div className="h-3 w-28 rounded bg-gray-200 animate-pulse" />
                </div>
                <div className="h-6 w-24 rounded-full bg-gray-200 animate-pulse shrink-0" />
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3 w-full rounded bg-gray-200 animate-pulse" />
                <div className="h-3 w-5/6 rounded bg-gray-200 animate-pulse" />
              </div>
              <div className="mt-4 space-y-1.5">
                <div className="h-3 w-full rounded bg-gray-200 animate-pulse" />
                <div className="h-3 w-4/5 rounded bg-gray-200 animate-pulse" />
              </div>
              <div className="mt-4 h-3 w-32 rounded bg-gray-200 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
