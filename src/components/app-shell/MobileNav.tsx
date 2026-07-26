"use client";

import {
  LayoutDashboard,
  Rss,
  Bookmark,
  Headphones,
  Settings,
} from "lucide-react";
import type { FeedFiltersState, ViewMode } from "@/lib/types";

type Props = {
  filters: FeedFiltersState;
  onChange: (f: FeedFiltersState) => void;
};

const items: { icon: React.ComponentType<{ className?: string }>; label: string; action: Partial<FeedFiltersState> }[] = [
  { icon: LayoutDashboard, label: "Home", action: { view: "feed" as ViewMode, contentType: "all", topicFilter: undefined, showSavedOnly: false } },
  { icon: Rss, label: "Feed", action: { view: "feed" as ViewMode, contentType: "all", showSavedOnly: false } },
  { icon: Bookmark, label: "Saved", action: { view: "feed" as ViewMode, showSavedOnly: true } },
  { icon: Headphones, label: "Podcasts", action: { view: "feed" as ViewMode, contentType: "podcast", topicFilter: undefined } },
  { icon: Settings, label: "Settings", action: { view: "settings" as ViewMode } },
];

function isActive(f: FeedFiltersState, item: typeof items[number]): boolean {
  if (item.label === "Home") return f.view === "feed" && f.contentType === "all" && !f.showSavedOnly && !f.topicFilter;
  if (item.label === "Feed") return f.view === "feed" && f.contentType === "all" && !f.showSavedOnly;
  if (item.label === "Saved") return !!f.showSavedOnly;
  if (item.label === "Podcasts") return f.contentType === "podcast" && f.view === "feed";
  if (item.label === "Settings") return f.view === "settings";
  return false;
}

export function MobileNav({ filters, onChange }: Props) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--border)] z-50">
      <div className="flex items-center justify-around h-14 px-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(filters, item);
          return (
            <button
              key={item.label}
              onClick={() => onChange({ ...filters, ...item.action })}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
                active
                  ? "text-[var(--coral-500)]"
                  : "text-[var(--slate-500)]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}