"use client";

import { ContentType } from "@/lib/types";
import type { FeedFiltersState } from "@/lib/types";

type Props = {
  filters: FeedFiltersState;
  onChange: (f: FeedFiltersState) => void;
};

const types: { label: string; value: ContentType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Articles", value: "article" },
  { label: "Podcasts", value: "podcast" },
];

export function FeedFilters({ filters, onChange }: Props) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto">
      {types.map((t) => (
        <button
          key={t.value}
          onClick={() => onChange({ ...filters, contentType: t.value })}
          className={`text-sm px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
            filters.contentType === t.value
              ? "bg-[var(--navy-900)] text-white"
              : "text-[var(--slate-500)] hover:text-[var(--navy-900)] hover:bg-[var(--coral-50)]"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
