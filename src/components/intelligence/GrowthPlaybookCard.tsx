"use client";

import { useMemo } from "react";
import { TrendingUp } from "lucide-react";
import type { FeedItem } from "@/lib/types";

type Props = {
  feedItems: FeedItem[];
};

const playbookEntries = [
  { keywords: ["patient acquisition", "lead", "conversion", "pipeline"], title: "Pipeline Velocity", tip: "Track cost-per-lead and conversion rate weekly. Most hearing care practices leave 40%+ of pipeline revenue on the table due to slow follow-up." },
  { keywords: ["objection", "barrier", "stall", "hesitation"], title: "Handling Objections", tip: "The top patient objection is perceived benefit vs cost. Lead with clinical outcomes (dementia prevention, cognitive health) to reframe value." },
  { keywords: ["pricing", "insurance", "financing", "affordable"], title: "Pricing & Financing", tip: "Monthly subscription models for hearing treatment reduce upfront friction and increase close rates — especially with the 55+ demographic." },
  { keywords: ["marketing", "brand", "campaign", "advertising"], title: "Go-To-Market", tip: "Direct mail to segmented 55+ lists still delivers 30:1 ROI in hearing care when paired with guarantee-backed offers." },
  { keywords: ["sales", "closing", "deal", "revenue", "growth"], title: "Closing Play", tip: "Diagnose before you pitch. Practitioners respond when you frame your solution around their specific patient-flow and revenue challenges." },
  { keywords: ["training", "coaching", "team", "enablement"], title: "Team Enablement", tip: "Role-play objection handling weekly. Top-performing sales teams in hearing care practice until the phone team can handle every objection confidently." },
  { keywords: ["competition", "competitive", "otc", "market share"], title: "Competitive Positioning", tip: "OTC devices are the entry point — position your brain-training app as the clinical upgrade that OTC cannot deliver." },
  { keywords: ["digital", "AI", "automation", "platform"], title: "Sales Tech Stack", tip: "AI-powered CRM automation can recover 15-30% of lost revenue through automated recall campaigns and 24/7 lead capture." },
];

export function GrowthPlaybookCard({ feedItems }: Props) {
  const activeEntries = useMemo(() => {
    const text = feedItems.map((i) => `${i.title} ${i.summary} ${i.tags.join(" ")}`).join(" ").toLowerCase();
    return playbookEntries.filter((e) => e.keywords.some((kw) => text.includes(kw)));
  }, [feedItems]);

  if (activeEntries.length === 0) return null;

  return (
    <div className="bg-white border border-[var(--border)] rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-4 h-4 text-[var(--coral-500)]" />
        <h3 className="font-semibold text-sm text-[var(--navy-950)]">
          Growth Playbook
        </h3>
        <span className="text-[10px] text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded ml-auto">
          Sales
        </span>
      </div>
      <div className="space-y-3">
        {activeEntries.slice(0, 4).map((entry, i) => (
          <div key={i} className="border-b border-[var(--border)] pb-2 last:border-0 last:pb-0">
            <div className="text-xs font-semibold text-[var(--navy-950)] mb-0.5">
              {entry.title}
            </div>
            <p className="text-[11px] text-[var(--slate-700)] leading-relaxed">
              {entry.tip}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
