"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Props = {
  theme: { title: string; description: string };
  onSelect: (topic: string) => void;
};

export function ThemeOfWeekCard({ theme, onSelect }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-xl overflow-hidden border border-[var(--border)]"
    >
      <div className="h-40 relative">
        <img
          src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80"
          alt="Brain neural connections and hearing"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-950)]/80 via-[var(--navy-950)]/30 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-white/80">
            Theme of the Week
          </span>
        </div>
      </div>
      <div className="p-4 bg-white">
        <h3 className="font-editorial text-lg font-bold text-[var(--navy-950)] leading-tight mb-1">
          {theme.title}
        </h3>
        <p className="text-xs text-[var(--slate-700)] leading-relaxed mb-3">
          {theme.description}
        </p>
        <button
          onClick={() => onSelect(theme.title)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--coral-500)] hover:text-[var(--coral-300)] transition-colors"
        >
          Explore theme
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
}
