import { readFile, writeFile } from "node:fs/promises";
import { discoverStories, type DiscoverStory } from "../data/discover";
import { fetchXPost, type FetchedPost } from "../lib/ingest/fetch-post";
import { makeStorySlug } from "../lib/ingest/slug";
import { assertStorySafe } from "../lib/ingest/validate";
import { site } from "../lib/site";

const FEED_PATH = "data/source-feeds/awesome-grok-bot-field-cases.json";
const INGESTED_PATH = "data/discover/ingested.json";
const MAX_PER_RUN = Math.max(1, Number(process.env.SOURCE_INGEST_LIMIT ?? "10"));
const MAX_ATTEMPTS = Math.max(1, Number(process.env.SOURCE_INGEST_MAX_ATTEMPTS ?? "3"));
const RETRYABLE = new Set([
  "source_unreadable",
  "site_extract_failed",
  "rate_limited",
  "unexpected_error",
]);

type IngestState = {
  status: "pending" | "retry" | "published" | "queued" | "skipped" | "source-only";
  attempts: number;
  code?: string;
  reason?: string;
};

type SourceCase = {
  id: string;
  title: string;
  url: string;
  sourceSummary: string;
  sourceType: string;
  sourceStatus: "candidate" | "already-ingested";
  ingest: IngestState;
};

type Feed = {
  schemaVersion: number;
  source: Record<string, unknown>;
  stats: Record<string, number>;
  cases: SourceCase[];
};

type ExtractResponse = {
  status: "published" | "queued" | "extracted" | "skipped";
  story?: DiscoverStory;
  confidence?: number;
  code?: string;
  reason?: string;
};

async function saveFeed(feed: Feed) {
  await writeFile(FEED_PATH, `${JSON.stringify(feed, null, 2)}\n`, "utf8");
}

async function saveIngested(stories: DiscoverStory[]) {
  await writeFile(INGESTED_PATH, `${JSON.stringify(stories, null, 2)}\n`, "utf8");
}

function shouldProcess(item: SourceCase) {
  if (item.sourceType !== "x" || item.sourceStatus !== "candidate") return false;
  const recoverOldPermissionFailure = item.ingest.status === "skipped" && item.ingest.code === "github_403";
  if (!["pending", "retry"].includes(item.ingest.status) && !recoverOldPermissionFailure) return false;
  return (item.ingest.attempts ?? 0) < MAX_ATTEMPTS;
}

function markSkipped(code: string, reason: string, attempts: number): IngestState {
  const retry = RETRYABLE.has(code) && attempts < MAX_ATTEMPTS;
  return {
    status: retry ? "retry" : "skipped",
    attempts,
    code,
    reason,
  };
}

async function extractViaLiveSite(item: SourceCase): Promise<DiscoverStory> {
  const response = await fetch(`${site.url}/api/ingest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-ingest-mode": "extract",
      "User-Agent": "UseGrokBot-awesome-source-ingest",
    },
    body: JSON.stringify({
      xUrl: item.url,
      phase: "extract",
      notes: `Discovered via RongleCat/awesome-grok-bot Field Cases. Source-index summary: ${item.sourceSummary}`,
    }),
  });

  let data: ExtractResponse;
  try {
    data = (await response.json()) as ExtractResponse;
  } catch {
    throw new Error(`site_extract_failed:${response.status}:invalid_json`);
  }

  if (data.status === "extracted" && data.story) return data.story;

  const code = data.code || (response.status === 429 ? "rate_limited" : "site_extract_failed");
  const reason = data.reason || `Live extraction returned ${response.status}`;
  throw new Error(`${code}:${reason}`);
}

function fallbackTitle(item: SourceCase) {
  const colon = item.title.indexOf(":");
  const value = colon >= 0 ? item.title.slice(colon + 1).trim() : item.title.trim();
  return value || item.title;
}

function fallbackCategory(text: string): DiscoverStory["category"] {
  const value = text.toLowerCase();
  if (/wordpress|arduino|engineering|\bpr\b|databricks|developer|technical|code|software/.test(value)) return "coding";
  if (/market|research|brief|scan|reconcile|credit/.test(value)) return "research";
  if (/calendar|reservation|travel|shopping|flights|beer|personal/.test(value)) return "personal";
  if (/sales|buyer|lead|customer/.test(value)) return "sales";
  if (/content|image|write|video|post/.test(value)) return "content";
  if (/marketing|seo|campaign/.test(value)) return "marketing";
  return "operations";
}

function fallbackOutcomes(category: DiscoverStory["category"]): DiscoverStory["outcomes"] {
  if (category === "coding") return ["build-software", "automate-work"];
  if (category === "research") return ["research", "save-time"];
  if (category === "sales" || category === "marketing") return ["grow-business", "automate-work"];
  if (category === "content") return ["create-content", "save-time"];
  return ["automate-work", "save-time"];
}

function fallbackApps(text: string): DiscoverStory["apps"] {
  const value = text.toLowerCase();
  const apps: DiscoverStory["apps"] = [];
  const add = (app: DiscoverStory["apps"][number]) => {
    if (!apps.includes(app)) apps.push(app);
  };

  if (/\bgmail\b/.test(value)) add("gmail");
  if (/google sheets|\bsheets\b/.test(value)) add("google-sheets");
  if (/google calendar/.test(value)) add("google-calendar");
  if (/\bslack\b/.test(value)) add("slack");
  if (/\bnotion\b/.test(value)) add("notion");
  if (/\bgithub\b/.test(value)) add("github");
  if (/\bsalesforce\b/.test(value)) add("salesforce");
  if (/\bhubspot\b/.test(value)) add("hubspot");
  if (/\blinkedin\b/.test(value)) add("linkedin");
  if (/\breddit\b/.test(value)) add("reddit");
  if (/\byoutube\b/.test(value)) add("youtube");
  if (/\bbrowser\b|website|site\b/.test(value)) add("browser");
  if (/\bx\b|twitter/.test(value)) add("x");

  return apps;
}

function fallbackSchedule(text: string): DiscoverStory["schedule"] {
  const value = text.toLowerCase();
  if (/always[- ]on|24\/7|continuous/.test(value)) return "always-on";
  if (/daily|every day|morning/.test(value)) return "daily";
  if (/weekly|every week/.test(value)) return "weekly";
  return "one-time";
}

function audienceFor(category: DiscoverStory["category"]) {
  switch (category) {
    case "coding":
      return ["Developers", "Engineering teams"];
    case "research":
      return ["Researchers", "Operators"];
    case "sales":
      return ["Sales teams", "Founders"];
    case "marketing":
      return ["Marketers", "Founders"];
    case "content":
      return ["Creators", "Content teams"];
    case "personal":
      return ["People exploring personal automation", "Grok Bot users"];
    default:
      return ["Operators", "Grok Bot users"];
  }
}

function buildSafeFallback(item: SourceCase, post: FetchedPost, existingStories: DiscoverStory[]): DiscoverStory {
  const title = fallbackTitle(item);
  const combined = `${item.title}\n${item.sourceSummary}\n${post.sourceText}`;
  const category = fallbackCategory(combined);
  const whoShouldTry = audienceFor(category);
  const slug = makeStorySlug(post.handle, title, new Set(existingStories.map((story) => story.slug)));

  return {
    slug,
    title,
    headline: item.sourceSummary,
    whatTheyDid: item.sourceSummary,
    howItWorks:
      "This public case was surfaced through the awesome-grok-bot Field Cases index. UseGrokBot keeps the original X permalink and did not re-run this Bot.",
    whyUseful:
      "It is a concrete public example of work being handed to Grok Bot, with the original source kept for context.",
    whyItMatters:
      "The source-index summary is CC0, while the linked X post remains the original author's source. This fallback deliberately avoids adding claims that are not supported by the source.",
    whoShouldTry,
    usefulFor: whoShouldTry.join(" / "),
    output: item.sourceSummary,
    category,
    outcomes: fallbackOutcomes(category),
    apps: fallbackApps(combined),
    difficulty: "medium",
    schedule: fallbackSchedule(combined),
    source: "community",
    authorName: post.authorName,
    handle: post.handle,
    publishedAt: post.publishedAt,
    xPostUrl: item.url,
    sourceUrl: item.url,
    sourceLabel: `${post.authorName} on X`,
  };
}

async function safeFallback(item: SourceCase, existingStories: DiscoverStory[]) {
  const post = await fetchXPost(item.url);
  return buildSafeFallback(item, post, existingStories);
}

function parseFailure(error: unknown) {
  const raw = error instanceof Error ? error.message : String(error);
  const separator = raw.indexOf(":");
  if (separator <= 0) return { code: "unexpected_error", reason: raw };
  return {
    code: raw.slice(0, separator),
    reason: raw.slice(separator + 1),
  };
}

async function getStory(item: SourceCase, existingStories: DiscoverStory[]) {
  // These entries already reached the publish step, so do not burn another AI call.
  if (["extract_failed", "github_403"].includes(item.ingest.code ?? "")) {
    console.log("Using safe source-index fallback for a previously attempted case.");
    return safeFallback(item, existingStories);
  }

  try {
    return await extractViaLiveSite(item);
  } catch (error) {
    const failure = parseFailure(error);
    if (["extract_failed", "site_extract_failed", "rate_limited"].includes(failure.code)) {
      console.log(`${failure.code}; using safe source-index fallback.`);
      return safeFallback(item, existingStories);
    }
    throw error;
  }
}

async function main() {
  const feed = JSON.parse(await readFile(FEED_PATH, "utf8")) as Feed;
  const ingested = JSON.parse(await readFile(INGESTED_PATH, "utf8")) as DiscoverStory[];
  const workingStories = [...discoverStories];
  const queue = feed.cases.filter(shouldProcess).slice(0, MAX_PER_RUN);

  if (!queue.length) {
    console.log("No new X Field Cases to ingest.");
    return;
  }

  console.log(`Auto-ingesting ${queue.length} X Field Cases from awesome-grok-bot.`);

  for (const candidate of queue) {
    const item = feed.cases.find((entry) => entry.url === candidate.url)!;
    const attempts = (item.ingest.attempts ?? 0) + 1;
    console.log(`\n[${attempts}/${MAX_ATTEMPTS}] ${item.title}\n${item.url}`);

    try {
      if (workingStories.some((story) => story.xPostUrl === item.url || story.sourceUrl === item.url)) {
        item.ingest = { status: "published", attempts, reason: "already present in Discover" };
        console.log("already published");
        await saveFeed(feed);
        continue;
      }

      const story = await getStory(item, workingStories);
      assertStorySafe(story, workingStories);

      ingested.push(story);
      workingStories.push(story);
      await saveIngested(ingested);

      item.ingest = { status: "published", attempts, reason: "direct GitHub Actions commit" };
      await saveFeed(feed);
      console.log(`published locally: ${story.slug}`);
    } catch (error) {
      const failure = parseFailure(error);
      item.ingest = markSkipped(failure.code, failure.reason, attempts);
      await saveFeed(feed);
      console.error(`${item.ingest.status}: ${failure.code} — ${failure.reason}`);
    }
  }

  const states = feed.cases.reduce<Record<string, number>>((acc, item) => {
    acc[item.ingest.status] = (acc[item.ingest.status] ?? 0) + 1;
    return acc;
  }, {});
  console.log("\nSource-feed ingest states:", states);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
