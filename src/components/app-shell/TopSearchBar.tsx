"use client";

import { Search, Command, X } from "lucide-react";
import type { FeedFiltersState } from "@/lib/types";

type Props = {
  filters: FeedFiltersState;
  onChange: (f: FeedFiltersState) => void;
};

export function TopSearchBar({ filters, onChange }: Props) {
  return (
    <header className="bg-white border-b border-[var(--border)]">
      <div className="flex items-center gap-4 px-4 lg:px-6 h-14">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--slate-500)]" />
          <input
            type="text"
            value={filters.searchQuery || ""}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value || undefined })}
            placeholder="Search hearing care insights, research, or clinical topics..."
            className="w-full pl-9 pr-10 py-2 bg-[var(--page)] border border-[var(--border)] rounded-lg text-sm text-[var(--navy-950)] placeholder:text-[var(--slate-500)] focus:outline-none focus:ring-2 focus:ring-[var(--coral-300)] focus:border-transparent transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onChange({ ...filters, searchQuery: undefined })}
              className="absolute right-10 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-[var(--coral-50)] text-[var(--slate-500)]"
            >
              <X className="w-3 h-3" />
            </button>
          )}
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] text-[var(--slate-500)] bg-white border border-[var(--border)] rounded px-1.5 py-0.5">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </div>
      </div>
    </header>
  );
}
