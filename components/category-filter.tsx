"use client";

import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/types";

interface CategoryFilterProps {
  active?: string;
}

export default function CategoryFilter({ active }: CategoryFilterProps) {
  const router = useRouter();

  function applyFilter(category: string | null) {
    const url = category
      ? `/dashboard?category=${encodeURIComponent(category)}`
      : "/dashboard";
    router.push(url);
  }

  const baseClass =
    "rounded-full px-4 py-1.5 text-sm font-medium border transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500";
  const activeClass = "bg-indigo-600 border-indigo-600 text-white";
  const inactiveClass =
    "bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600";

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => applyFilter(null)}
        className={`${baseClass} ${!active ? activeClass : inactiveClass}`}
      >
        All
      </button>

      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => applyFilter(cat)}
          className={`${baseClass} ${active === cat ? activeClass : inactiveClass}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
