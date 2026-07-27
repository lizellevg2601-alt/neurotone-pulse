import { RelevanceProfile } from "@/lib/types";

export const mockProfile: RelevanceProfile = {
  role: "Sales Director / Revenue Leader",
  seniority: "Head of Sales",
  orgSize: "Growth-Stage Health Tech",
  companyStage: "Scaling",
  functionFocus: ["Sales Strategy", "Opportunity Closure", "Revenue Operations", "Team Leadership"],
  region: ["North America", "Europe", "South Africa"],
  industry: ["Hearing Care", "Health Tech", "Audiology"],
  preferredDepth: "balanced",
  strategicWeight: 70,
  tacticalWeight: 30,
  podcastWeight: 30,
  boostedKeywords: [
    "sales strategy", "opportunity closure", "patient acquisition", "pipeline management",
    "competitive positioning", "sales enablement", "objection handling", "revenue growth",
    "practice growth", "closing techniques", "GTM strategy", "sales coaching",
    "auditory training", "neuroplasticity", "tinnitus", "hearing loss",
    "cognitive training", "patient outcomes", "practice management",
  ],
  blockedTopics: [],
};
