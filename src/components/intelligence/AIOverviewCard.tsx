"use client";

import { motion } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";
import type { FeedItem } from "@/lib/types";

type Props = {
  feedItems: FeedItem[];
};

const insightTemplates = [
  { keywords: ["tinnitus", "ringing"], insight: "Tinnitus research is trending — neuromodulation and brain-based therapies are gaining clinical adoption." },
  { keywords: ["dementia", "cognitive decline", "alzheimer"], insight: "WHO now recommends hearing aids for dementia prevention — cognitive health is becoming a primary motivator for patients." },
  { keywords: ["auditory", "auditory-cognitive", "speech", "training"], insight: "Auditory-cognitive training shows clinically meaningful improvements in speech-in-noise perception." },
  { keywords: ["neuroplasticity", "brain", "cortical"], insight: "Neuroplasticity research shows auditory training reshapes cortical pathways in as little as 4 weeks." },
  { keywords: ["OTC", "over-the-counter"], insight: "The OTC hearing aid market continues to evolve — new entrants and pricing shifts affect patient acquisition." },
  { keywords: ["practice", "clinic", "revenue", "patient acquisition"], insight: "Practice management AI tools are helping clinics streamline operations and improve patient retention." },
  { keywords: ["medicare", "insurance", "coverage"], insight: "Medicare Advantage hearing benefits are expanding — more patients entering the pipeline." },
  { keywords: ["neuromodulation", "bimodal", "stimulation"], insight: "Bimodal neuromodulation for tinnitus shows strong compliance and satisfaction rates in recent studies." },
  { keywords: ["hearing loss", "hearing aid"], insight: "Hearing aid technology advancements are driving better patient outcomes and adoption rates." },
];

export function AIOverviewCard({ feedItems }: Props) {
  const [expanded, setExpanded] = useState(false);

  const insights = useMemo(() => {
    const text = feedItems.map((i) => `${i.title} ${i.summary} ${i.tags.join(" ")}`).join(" ").toLowerCase();
    const matched: string[] = [];
    for (const tpl of insightTemplates) {
      if (tpl.keywords.some((kw) => text.includes(kw))) {
        matched.push(tpl.insight);
      }
    }
    return matched.length > 0 ? matched.slice(0, 4) : ["Your feed is active — check back for AI-generated insights as more articles are indexed."];
  }, [feedItems]);

  const articleCount = feedItems.filter((i) => i.type === "article").length;
  const podcastCount = feedItems.filter((i) => i.type === "podcast").length;
  const sourceCount = new Set(feedItems.map((i) => i.source)).size;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white border border-[var(--border)] rounded-xl overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[var(--coral-500)]" />
          <h3 className="font-semibold text-sm text-[var(--navy-950)]">
            AI Overview
          </h3>
          <span className="text-[10px] text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded ml-auto">
            Updated just now
          </span>
        </div>

        {!expanded ? (
          <div className="space-y-2">
            {insights.slice(0, 3).map((text, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--coral-300)] mt-1.5 shrink-0" />
                <p className="text-xs text-[var(--slate-700)] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-[var(--coral-50)] rounded-lg p-3 border border-[var(--coral-200)]">
              <h4 className="text-xs font-semibold text-[var(--navy-950)] mb-1">
                Top Signals for You
              </h4>
              <ul className="space-y-1">
                {insights.slice(0, 3).map((text, i) => (
                  <li key={i} className="text-xs text-[var(--slate-700)] flex items-start gap-1.5">
                    <span className="text-[var(--coral-500)]">•</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-xs text-[var(--slate-500)]">
              <span className="font-medium text-[var(--navy-950)]">
                Source breakdown
              </span>
              <div className="flex items-center gap-3 mt-1">
                <span>📝 {articleCount} articles</span>
                <span>🎙 {podcastCount} podcasts</span>
                <span>📋 {sourceCount} sources</span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-[var(--coral-500)] hover:text-[var(--coral-300)] font-medium mt-3 transition-colors"
        >
          {expanded ? "Show less" : "Explore all insights"}
          <ChevronDown
            className={`w-3 h-3 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div className="px-4 py-2.5 bg-[var(--blue-grey-100)] border-t border-[var(--border)] text-[10px] text-[var(--slate-500)] flex items-center gap-3">
        <span>Synthesised from</span>
        <span className="font-medium text-[var(--navy-950)]">
          {articleCount} articles
        </span>
        <span className="w-1 h-1 rounded-full bg-[var(--slate-500)]" />
        <span className="font-medium text-[var(--navy-950)]">
          {podcastCount} podcasts
        </span>
        <span className="w-1 h-1 rounded-full bg-[var(--slate-500)]" />
        <span className="font-medium text-[var(--navy-950)]">
          {sourceCount} sources
        </span>
      </div>
    </motion.div>
  );
}