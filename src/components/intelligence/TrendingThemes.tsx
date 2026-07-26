"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { TrendingTheme } from "@/lib/types";

type Props = {
  themes: TrendingTheme[];
  onSelect?: (topic: string) => void;
};

export function TrendingThemes({ themes, onSelect }: Props) {
  if (themes.length === 0) return null;

  return (
    <div className="bg-white border border-[var(--border)] rounded-xl p-4">
      <h3 className="font-semibold text-sm text-[var(--navy-950)] mb-3">
        Trending Themes
      </h3>
      <div className="space-y-2">
        {themes.map((theme) => (
          <div
            key={theme.rank}
            onClick={() => onSelect?.(theme.topic)}
            className="flex items-center gap-3 py-1.5 group cursor-pointer"
          >
            <span className="text-xs font-bold text-[var(--slate-500)] w-4">
              {theme.rank}
            </span>
            <span className="text-sm text-[var(--navy-950)] flex-1 group-hover:text-[var(--coral-500)] transition-colors">
              {theme.topic}
            </span>
            <div className="flex items-center gap-1">
              <span
                className={`text-xs font-medium ${
                  theme.direction === "up"
                    ? "text-green-600"
                    : theme.direction === "down"
                    ? "text-red-500"
                    : "text-[var(--slate-500)]"
                }`}
              >
                {theme.change > 0 ? "+" : ""}
                {theme.change}%
              </span>
              {theme.direction === "up" ? (
                <TrendingUp className="w-3 h-3 text-green-600" />
              ) : theme.direction === "down" ? (
                <TrendingDown className="w-3 h-3 text-red-500" />
              ) : (
                <Minus className="w-3 h-3 text-[var(--slate-500)]" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}