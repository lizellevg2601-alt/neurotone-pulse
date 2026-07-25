"use client";

import { motion } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import { useState } from "react";

export function AIOverviewCard() {
  const [expanded, setExpanded] = useState(false);

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
            <Insight text="Auditory-cognitive training shows clinically meaningful improvements in speech-in-noise perception — 85% of patients achieve ≥3 dB SNR improvement." />
            <Insight text="WHO now recommends hearing aids for dementia prevention — cognitive health is becoming a primary motivator for patients seeking hearing care." />
            <Insight text="Bimodal neuromodulation for tinnitus shows strong compliance and satisfaction — brain-based tinnitus therapies are gaining clinical adoption." />
            <Insight text="Practitioners report patient objections around cost and perceived benefit as top barriers — clinical evidence is the strongest rebuttal." />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-[var(--coral-50)] rounded-lg p-3 border border-[var(--coral-200)]">
              <h4 className="text-xs font-semibold text-[var(--navy-950)] mb-1">
                Top Signals for You
              </h4>
              <ul className="space-y-1">
                <li className="text-xs text-[var(--slate-700)] flex items-start gap-1.5">
                  <span className="text-[var(--coral-500)]">•</span>
                  Neuroplasticity research shows auditory training reshapes cortical pathways in as little as 4 weeks
                </li>
                <li className="text-xs text-[var(--slate-700)] flex items-start gap-1.5">
                  <span className="text-[var(--coral-500)]">•</span>
                  Medicare Advantage hearing benefits are expanding — more patients entering the pipeline
                </li>
              </ul>
            </div>

            <div className="text-xs text-[var(--slate-500)]">
              <span className="font-medium text-[var(--navy-950)]">
                Source breakdown
              </span>
              <div className="flex items-center gap-3 mt-1">
                <span>📝 42 articles</span>
                <span>🎙 8 podcasts</span>
                <span>📋 15 industry reports</span>
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
          28 articles
        </span>
        <span className="w-1 h-1 rounded-full bg-[var(--slate-500)]" />
        <span className="font-medium text-[var(--navy-950)]">
          12 podcasts
        </span>
        <span className="w-1 h-1 rounded-full bg-[var(--slate-500)]" />
        <span className="font-medium text-[var(--navy-950)]">
          46 LinkedIn posts
        </span>
      </div>
    </motion.div>
  );
}

function Insight({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--coral-300)] mt-1.5 shrink-0" />
      <p className="text-xs text-[var(--slate-700)] leading-relaxed">{text}</p>
    </div>
  );
}
