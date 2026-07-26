"use client";

import { useEffect, useMemo, useState } from "react";
import { AppSidebar } from "@/components/app-shell/AppSidebar";
import { TopSearchBar } from "@/components/app-shell/TopSearchBar";
import { MobileNav } from "@/components/app-shell/MobileNav";
import { PersonalisationBar } from "@/components/personalisation/PersonalisationBar";
import { RelevanceProfileDrawer } from "@/components/personalisation/RelevanceProfileDrawer";
import { FeedFilters } from "@/components/feed/FeedFilters";
import { FeaturedArticleCard } from "@/components/feed/FeaturedArticleCard";
import { PodcastCard } from "@/components/feed/PodcastCard";
import { ThemeOfWeekCard } from "@/components/intelligence/ThemeOfWeekCard";
import { AIOverviewCard } from "@/components/intelligence/AIOverviewCard";
import { TrendingThemes } from "@/components/intelligence/TrendingThemes";
import type { FeedFiltersState, FeedItem } from "@/lib/types";

function filterAndSort(
  items: FeedItem[],
  filters: FeedFiltersState
): FeedItem[] {
  let filtered =
    filters.contentType === "all"
      ? items
      : items.filter((i) => i.type === filters.contentType);

  if (filters.showSavedOnly) {
    filtered = filtered.filter((i) => i.saved);
  }

  if (filters.searchQuery) {
    const q = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.summary.toLowerCase().includes(q) ||
        i.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filters.topicFilter) {
    const topic = filters.topicFilter.toLowerCase();
    filtered = filtered.filter(
      (i) =>
        i.title.toLowerCase().includes(topic) ||
        i.summary.toLowerCase().includes(topic) ||
        i.tags.some((t) => t.toLowerCase().includes(topic))
    );
  }

  switch (filters.sort) {
    case "recent":
      filtered.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime()
      );
      break;
    case "score":
      filtered.sort((a, b) => b.relevanceScore - a.relevanceScore);
      break;
    case "discussed":
      filtered.sort(
        (a, b) =>
          ((b.likes || 0) + (b.comments || 0)) -
          ((a.likes || 0) + (a.comments || 0))
      );
      break;
    case "relevant":
    default:
      break;
  }

  return filtered;
}

export default function Dashboard() {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FeedFiltersState>({
    contentType: "all",
    sort: "relevant",
    view: "feed",
  });

  useEffect(() => {
    async function loadFeed() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/feed-data.json");
        if (!res.ok) throw new Error("Failed to load feed");
        const data = await res.json();
        setFeed(data.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    loadFeed();
  }, []);

  const featured = feed.find((i) => i.type === "article") || feed[0];
  const rest = feed.filter((i) => i.id !== featured?.id);
  const filtered = filterAndSort(rest, filters);

  const computedThemes = useMemo(() => {
    const tagCounts = new Map<string, number>();
    for (const item of feed) {
      for (const tag of item.tags) {
        const key = tag.toLowerCase();
        tagCounts.set(key, (tagCounts.get(key) || 0) + 1);
      }
    }
    return [...tagCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([topic, count], i) => ({
        rank: i + 1,
        topic: topic.charAt(0).toUpperCase() + topic.slice(1),
        change: 10 + Math.round(Math.random() * 25),
        direction: (i < 3 ? "up" : i === 3 ? "flat" : "down") as "up" | "down" | "flat",
      }));
  }, [feed]);

  const feedStats = useMemo(() => {
    const articles = feed.filter((i) => i.type === "article").length;
    const podcasts = feed.filter((i) => i.type === "podcast").length;
    const sources = new Set(feed.map((i) => i.source)).size;
    return { articles, podcasts, sources };
  }, [feed]);

  function handleSave(id: string) {
    setFeed((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, saved: !item.saved } : item
      )
    );
  }

  return (
    <div className="min-h-screen bg-[var(--page)]">
      <div className="flex">
        <AppSidebar filters={filters} onChange={setFilters} />

        <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
          <TopSearchBar filters={filters} onChange={setFilters} />
          <PersonalisationBar />

          <main className="flex-1 p-4 lg:p-6">
            {filters.view === "topics" && (
              <div className="max-w-2xl">
                <h1 className="font-editorial text-xl font-bold text-[var(--navy-950)] mb-4">Topics</h1>
                <p className="text-sm text-[var(--slate-500)] mb-6">Browse all topics mentioned across your feed. Click a topic to filter articles.</p>
                <div className="flex flex-wrap gap-2">
                  {[...new Set(feed.flatMap((i) => i.tags))].sort().map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setFilters({ ...filters, view: "feed", topicFilter: filters.topicFilter === tag ? undefined : tag })}
                      className={`text-sm px-3 py-1.5 rounded-full transition-colors ${
                        filters.topicFilter === tag
                          ? "bg-[var(--navy-900)] text-white"
                          : "bg-[var(--coral-50)] text-[var(--coral-500)] hover:bg-[var(--coral-100)]"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filters.view === "digest" && (
              <div className="max-w-2xl">
                <h1 className="font-editorial text-xl font-bold text-[var(--navy-950)] mb-4">Digest</h1>
                <p className="text-sm text-[var(--slate-500)] mb-6">A quick summary of what&apos;s happening in hearing care.</p>
                <div className="space-y-4">
                  <div className="bg-white border border-[var(--border)] rounded-xl p-4">
                    <h3 className="font-semibold text-sm text-[var(--navy-950)] mb-2">At a glance</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[var(--navy-950)]">{feedStats.articles}</div>
                        <div className="text-xs text-[var(--slate-500)]">Articles</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[var(--navy-950)]">{feedStats.podcasts}</div>
                        <div className="text-xs text-[var(--slate-500)]">Podcasts</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[var(--navy-950)]">{feedStats.sources}</div>
                        <div className="text-xs text-[var(--slate-500)]">Sources</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-[var(--border)] rounded-xl p-4">
                    <h3 className="font-semibold text-sm text-[var(--navy-950)] mb-2">Latest headlines</h3>
                    <ul className="space-y-2">
                      {feed.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 10).map((item) => (
                        <li key={item.id}>
                          <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--navy-950)] hover:text-[var(--coral-500)] transition-colors">
                            {item.title}
                          </a>
                          <span className="text-xs text-[var(--slate-500)] ml-2">{item.source}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {filters.view === "settings" && (
              <div className="max-w-2xl">
                <h1 className="font-editorial text-xl font-bold text-[var(--navy-950)] mb-4">Settings</h1>
                <RelevanceProfileDrawer open />
              </div>
            )}

            {filters.view === "feed" && (
              <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-1 min-w-0 space-y-4">
                  <div className="flex items-center justify-between mb-1">
                    <h1 className="font-editorial text-xl font-bold text-[var(--navy-950)]">
                      Your Feed
                    </h1>
                    <RelevanceProfileDrawer />
                  </div>

                  <FeedFilters filters={filters} onChange={setFilters} />

                  {loading && (
                    <div className="text-center py-12 text-[var(--slate-500)]">
                      Loading feed...
                    </div>
                  )}

                  {error && (
                    <div className="text-center py-12 text-red-500">
                      {error}
                    </div>
                  )}

                  {!loading && !error && feed.length === 0 && (
                    <div className="text-center py-12 text-[var(--slate-500)]">
                      No feed items found.
                    </div>
                  )}

                  {!loading && featured && (
                    <FeaturedArticleCard item={featured} onSave={handleSave} />
                  )}

                  {!loading && (
                    <div className="space-y-3">
                      {filtered.length === 0 && !loading ? (
                        <div className="text-center py-12 text-[var(--slate-500)] text-sm">
                          No matching items. Try adjusting your filters.
                        </div>
                      ) : (
                        filtered.map((item) =>
                          item.type === "podcast" ? (
                            <PodcastCard
                              key={item.id}
                              item={item}
                              onSave={handleSave}
                            />
                          ) : (
                            <FeaturedArticleCard
                              key={item.id}
                              item={item}
                              onSave={handleSave}
                            />
                          )
                        )
                      )}
                    </div>
                  )}
                </div>

                <aside className="xl:w-[300px] shrink-0 space-y-4">
                  <ThemeOfWeekCard />
                  <AIOverviewCard feedItems={feed} />
                  <TrendingThemes themes={computedThemes} onSelect={(topic) => setFilters((prev) => ({ ...prev, topicFilter: prev.topicFilter === topic ? undefined : topic, contentType: "all" }))} />
                </aside>
              </div>
            )}
          </main>
        </div>
      </div>

      <MobileNav filters={filters} onChange={setFilters} />
    </div>
  );
}
