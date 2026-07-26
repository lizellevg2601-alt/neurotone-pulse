"use client";

import {
  LayoutDashboard,
  Rss,
  Tags,
  Bookmark,
  Headphones,
  Newspaper,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { useState, type ComponentType } from "react";
import type { FeedFiltersState } from "@/lib/types";

type Props = {
  filters: FeedFiltersState;
  onChange: (f: FeedFiltersState) => void;
};

const navItems: { icon: ComponentType<{ className?: string }>; label: string; filter: Partial<FeedFiltersState> }[] = [
  { icon: LayoutDashboard, label: "Home", filter: { view: "feed", contentType: "all", topicFilter: undefined, showSavedOnly: false } },
  { icon: Rss, label: "Feed", filter: { view: "feed", contentType: "all", topicFilter: undefined, showSavedOnly: false } },
  { icon: Tags, label: "Topics", filter: { view: "topics" } },
  { icon: Bookmark, label: "Saved", filter: { view: "feed", showSavedOnly: true } },
  { icon: Headphones, label: "Podcasts", filter: { view: "feed", contentType: "podcast", topicFilter: undefined } },
  { icon: Newspaper, label: "Digest", filter: { view: "digest" } },
  { icon: Settings, label: "Settings", filter: { view: "settings" } },
];

export function AppSidebar({ filters, onChange }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  function isActive(item: typeof navItems[number]) {
    if (!item.filter) return false;
    if (item.label === "Home") return filters.view === "feed" && filters.contentType === "all" && !filters.topicFilter && !filters.showSavedOnly;
    if (item.label === "Feed") return filters.view === "feed" && filters.contentType === "all" && !filters.showSavedOnly;
    if (item.label === "Topics") return filters.view === "topics";
    if (item.label === "Saved") return !!filters.showSavedOnly;
    if (item.label === "Podcasts") return filters.contentType === "podcast" && filters.view === "feed";
    if (item.label === "Digest") return filters.view === "digest";
    if (item.label === "Settings") return filters.view === "settings";
    return false;
  }

  function handleClick(item: typeof navItems[number]) {
    if (!item.filter) return;
    onChange({ ...filters, ...item.filter } as FeedFiltersState);
  }

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-56"
      } shrink-0 bg-white border-r border-[var(--border)] flex flex-col transition-all duration-200 hidden lg:flex`}
    >
      <div className="px-4 pt-6 pb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--navy-900)] flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold">NT</span>
          </div>
          {!collapsed && (
            <div>
              <div className="font-bold text-sm text-[var(--navy-950)]">
                Neurotone Pulse
              </div>
              <div className="text-[10px] text-[var(--slate-500)] leading-tight">
                Intelligence for Hearing Care
              </div>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleClick(item)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive(item)
                ? "bg-[var(--coral-100)] text-[var(--navy-900)]"
                : "text-[var(--slate-500)] hover:bg-[var(--coral-50)] hover:text-[var(--navy-900)]"
            }`}
          >
            <item.icon
              className={`w-4 h-4 shrink-0 ${
                isActive(item) ? "text-[var(--coral-500)]" : ""
              }`}
            />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--blue-grey-200)] flex items-center justify-center text-xs font-semibold text-[var(--navy-900)] shrink-0">
            NT
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-sm font-medium text-[var(--navy-900)] truncate">
                EMEA Team
              </div>
              <div className="text-[11px] text-[var(--slate-500)]">
                Neurotone AI
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex items-center justify-center h-8 border-t border-[var(--border)] text-[var(--slate-500)] hover:text-[var(--navy-900)] transition-colors"
      >
        <ChevronLeft
          className={`w-4 h-4 transition-transform ${
            collapsed ? "rotate-180" : ""
          }`}
        />
      </button>
    </aside>
  );
}
