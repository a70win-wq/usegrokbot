import { discoverStories, type DiscoverStory } from "@/data/discover";
import { getUseCase } from "@/data/use-cases";
import type { FetchedPost } from "./fetch-post";
import type { ExtractedCase } from "./schema";
import { tweetIdFromUrl } from "./x-url";

const GROK_SIGNAL = /grok\s*bot|\bgrok\b|@grok|@bot\b/i;
const MIN_RELEVANCE = 90;

export type IngestFailure = {
  ok: false;
  code: string;
  reason: string;
};

export type ValidatedStory = {
  ok: true;
  story: DiscoverStory;
  confidence: number;
};

function numbersIn(value: string) {
  return value.match(/\d[\d,]*(?:\.\d+)?/g)?.map((item) => item.replace(/,/g, "")) ?? [];
}

function includesNumber(source: string, number: string) {
  const compact = source.replace(/,/g, "");
  return compact.includes(number);
}

function normalizeQuote(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function canonicalSourceUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    url.hash = "";
    const host = url.hostname.replace(/^www\./, "");
    if (host === "twitter.com" || host === "x.com") {
      url.hostname = "x.com";
      url.search = "";
    } else {
      for (const key of [...url.searchParams.keys()]) {
        if (/^(utm_|ref$|source$|fbclid$|gclid$)/i.test(key)) url.searchParams.delete(key);
      }
    }
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export function existingStoryKeys(stories: DiscoverStory[] = discoverStories) {
  const slugs = new Set(stories.map((item) => item.slug));
  const tweetIds = new Set(
    stories.flatMap((item) => [item.xPostUrl, item.sourceUrl].map((url) => tweetIdFromUrl(url ?? "")).filter(Boolean)),
  );
  return { slugs, tweetIds };
}

export function validateExtractedCase(
  post: FetchedPost,
  extracted: ExtractedCase,
  extras: { prompt?: string } = {},
  stories: DiscoverStory[] = discoverStories,
): IngestFailure | { ok: true; extracted: ExtractedCase; confidence: number } {
  if (!extracted.relevant || extracted.relevance < MIN_RELEVANCE) {
    return { ok: false, code: "not_relevant", reason: extracted.reason || "Not a Grok Bot use case." };
  }
  if (!GROK_SIGNAL.test(post.sourceText) && !GROK_SIGNAL.test(extras.prompt ?? "")) {
    return { ok: false, code: "no_grok_signal", reason: "Source does not mention Grok Bot." };
  }
  if (post.text.trim().length < 12) {
    return { ok: false, code: "too_short", reason: "Post is too short to be a use case." };
  }
  if (extracted.quote && !normalizeQuote(post.sourceText).includes(normalizeQuote(extracted.quote))) {
    return { ok: false, code: "quote_not_in_source", reason: "Quote is not in the original post." };
  }

  let result = extracted.result?.trim() || undefined;
  const output = extracted.output?.trim() || undefined;
  if (result) {
    const unsupported = numbersIn(result).filter((number) => !includesNumber(post.sourceText, number));
    if (unsupported.length) {
      result = undefined;
    }
  }
  if (!result && !output) {
    return { ok: false, code: "missing_outcome", reason: "Need a Result from the source, or an Output." };
  }

  const { tweetIds } = existingStoryKeys(stories);
  if (tweetIds.has(post.id)) {
    return { ok: false, code: "duplicate", reason: "This X post is already on UseGrokBot." };
  }

  return {
    ok: true,
    confidence: extracted.relevance,
    extracted: { ...extracted, result, output: result ? undefined : output },
  };
}

export function toDiscoverStory(
  post: FetchedPost,
  extracted: ExtractedCase,
  slug: string,
): DiscoverStory {
  return {
    slug,
    title: extracted.title.trim(),
    headline: extracted.headline.trim(),
    whatTheyDid: extracted.whatTheyDid.trim(),
    howItWorks: extracted.howItWorks.trim(),
    whyUseful: extracted.whyUseful.trim(),
    whyItMatters: extracted.whyItMatters.trim(),
    whoShouldTry: extracted.whoShouldTry.map((item) => item.trim()).filter(Boolean),
    usefulFor: extracted.usefulFor.trim(),
    quote: extracted.quote?.trim() || undefined,
    result: extracted.result?.trim() || undefined,
    output: extracted.result?.trim() ? undefined : extracted.output?.trim() || undefined,
    category: extracted.category,
    outcomes: extracted.outcomes,
    apps: extracted.apps,
    difficulty: extracted.difficulty,
    schedule: extracted.schedule,
    source: "community",
    authorName: post.authorName,
    handle: post.handle,
    publishedAt: post.publishedAt,
    xPostUrl: post.url,
    sourceUrl: post.url,
    sourceLabel: `${post.authorName} on X`,
  };
}

export function assertStorySafe(story: DiscoverStory, stories: DiscoverStory[] = discoverStories) {
  if (!story.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(story.slug)) {
    throw new Error(`Invalid slug: ${story.slug}`);
  }
  if (stories.some((item) => item.slug === story.slug)) {
    throw new Error(`Duplicate slug: ${story.slug}`);
  }
  if (story.source !== "community") throw new Error("Ingested stories must be community.");
  if (story.tested) throw new Error("Do not mark ingested stories Tested.");
  if (story.featured || story.trending) throw new Error("Do not mark ingested stories Featured or Trending.");
  if (story.relatedUseCase && !getUseCase(story.relatedUseCase)) {
    throw new Error(`Unknown related use case: ${story.relatedUseCase}`);
  }
  if (!story.result && !story.output) throw new Error("Story needs result or output.");

  const sourceUrl = canonicalSourceUrl(story.sourceUrl);
  if (!sourceUrl) throw new Error("Story needs a real HTTP(S) source URL.");

  if (story.xPostUrl) {
    if (!tweetIdFromUrl(story.xPostUrl)) throw new Error("xPostUrl must be a real X permalink.");
  } else if (tweetIdFromUrl(story.sourceUrl)) {
    throw new Error("X sources must set xPostUrl.");
  }

  const duplicateSource = stories.some((item) => {
    const candidates = [item.sourceUrl, item.xPostUrl].filter(Boolean) as string[];
    return candidates.some((candidate) => canonicalSourceUrl(candidate) === sourceUrl);
  });
  if (duplicateSource) throw new Error(`Duplicate source: ${story.sourceUrl}`);
}
