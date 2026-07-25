import Parser from "rss-parser";
import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const feedSources = [
  { id: "hearing-tracker", name: "Hearing Tracker", type: "article", feedUrl: "https://www.hearingtracker.com/feed.xml", siteUrl: "https://www.hearingtracker.com" },
  { id: "hearing-review", name: "The Hearing Review", type: "article", feedUrl: "https://www.hearingreview.com/feed", siteUrl: "https://www.hearingreview.com" },
  { id: "audiology-online", name: "Audiology Online", type: "article", feedUrl: "https://www.audiologyonline.com/releases/feed", siteUrl: "https://www.audiologyonline.com" },
  { id: "audiology-worldnews", name: "Audiology Worldnews", type: "article", feedUrl: "https://www.audiology-worldnews.com/feed", siteUrl: "https://www.audiology-worldnews.com" },
  { id: "bihima", name: "BIHIMA", type: "article", feedUrl: "https://www.bihima.com/feed", siteUrl: "https://www.bihima.com" },
  { id: "phonak-blog", name: "Phonak Audiology Blog", type: "article", feedUrl: "https://audiologyblog.phonakpro.com/feed", siteUrl: "https://audiologyblog.phonakpro.com" },
];

function estimateReadTime(content) {
  const words = (content || "").replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function parseDuration(duration) {
  if (!duration) return undefined;
  const parts = duration.split(":").map(Number);
  if (parts.length === 3) return parts[0] * 60 + parts[1] + Math.round(parts[2] / 60);
  if (parts.length === 2) return parts[0] + Math.round(parts[1] / 60);
  return Math.round(Number(duration) / 60);
}

function extractImage(content) {
  const match = (content || "").match(/<img[^>]+src=["']([^"']+)["']/);
  return match?.[1];
}

function hashId(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

const parser = new Parser({
  timeout: 15000,
  headers: { "User-Agent": "NeurotonePulse/1.0" },
  customFields: { item: ["itunes:duration", "itunes:image"] },
});

async function main() {
  console.log("Fetching RSS feeds...");

  const results = await Promise.allSettled(
    feedSources.map(async (source) => {
      let items;
      try {
        const feed = await parser.parseURL(source.feedUrl);
        items = feed.items || [];
      } catch (err) {
        console.warn(`  FAIL ${source.id}: ${err.message || err}`);
        return [];
      }
      console.log(`  OK ${source.id} (${items.length} items)`);
      return items.slice(0, 10).map((item) => {
        const link = item.link || source.siteUrl;
        const content = item.content || item.contentSnippet || "";
        const isArticle = source.type === "article";

        return {
          id: `feed-${source.id}-${hashId(link)}`,
          type: source.type,
          title: item.title || "Untitled",
          source: source.name,
          sourceUrl: link,
          author: item.creator || source.author,
          publishedAt: item.isoDate || item.pubDate || new Date().toISOString(),
          readTime: isArticle ? estimateReadTime(content) : undefined,
          duration: !isArticle ? parseDuration(item["itunes:duration"]) : undefined,
          summary: item.contentSnippet?.trim() || item.content?.replace(/<[^>]*>/g, "").trim().slice(0, 400) || "",
          imageUrl: isArticle ? extractImage(content) : item["itunes:image"] || undefined,
          tags: (item.categories || []).slice(0, 6),
          relevanceScore: 50,
          whyItMatters: [],
          saved: false,
        };
      });
    })
  );

  const items = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      items.push(...result.value);
    } else {
      console.warn("Feed fetch failed:", result.reason?.message || result.reason);
    }
  }

  items.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const output = { items: items.slice(0, 50), fetchedAt: new Date().toISOString() };
  const outPath = resolve(__dirname, "..", "public", "feed-data.json");

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(output, null, 2));

  console.log(`Generated feed-data.json with ${output.items.length} items`);
}

main().then(() => {
  process.exit(0);
}).catch((err) => {
  console.error("Failed to generate feed data:", err);
  process.exit(1);
});
