import { discoverStories, type DiscoverStory } from "@/data/discover";
import { extractCase } from "./extract";
import { fallbackExtract } from "./fallback";
import { fetchXPost } from "./fetch-post";
import { canPublish, fileIngestError, publishStory } from "./publish";
import { makeStorySlug } from "./slug";
import { existingStoryKeys, toDiscoverStory, validateExtractedCase } from "./validate";
import { parseXUrl } from "./x-url";

export type IngestInput = {
  xUrl: string;
  prompt?: string;
  notes?: string;
  phase?: "full" | "extract";
  catalog?: DiscoverStory[];
};

export type IngestResult =
  | { status: "published"; slug: string; url: string; prUrl: string }
  | { status: "queued"; slug: string; prUrl: string }
  | { status: "extracted"; story: DiscoverStory; confidence: number }
  | { status: "skipped"; code: string; reason: string };

function canExtractWithAi() {
  return Boolean(process.env.AI_GATEWAY_API_KEY);
}

export async function ingestUseCase(input: IngestInput): Promise<IngestResult> {
  const catalog = input.catalog ?? discoverStories;
  const parsed = parseXUrl(input.xUrl);
  if (!parsed) return { status: "skipped", code: "invalid_x_url", reason: "Use a public x.com or twitter.com post URL." };

  let post;
  try {
    post = await fetchXPost(parsed.url);
  } catch {
    const result = { status: "skipped" as const, code: "source_unreadable", reason: "Could not read that X post." };
    await fileIngestError({ url: parsed.url, code: result.code, reason: result.reason });
    return result;
  }

  let extracted;
  if (canExtractWithAi()) {
    try {
      extracted = await extractCase(post, { prompt: input.prompt, notes: input.notes });
    } catch (error) {
      const detail = error instanceof Error ? error.message : "extract_failed";
      console.warn(`AI extract failed for ${post.url}; using source fallback. ${detail}`);
      extracted = fallbackExtract(post, { prompt: input.prompt, notes: input.notes });
    }
  } else {
    extracted = fallbackExtract(post, { prompt: input.prompt, notes: input.notes });
  }

  const checked = validateExtractedCase(post, extracted, { prompt: input.prompt }, catalog);
  if (!checked.ok) {
    await fileIngestError({ url: post.url, code: checked.code, reason: checked.reason });
    return { status: "skipped", code: checked.code, reason: checked.reason };
  }

  const slug = makeStorySlug(post.handle, checked.extracted.title, existingStoryKeys(catalog).slugs);
  const story = toDiscoverStory(post, checked.extracted, slug, { notes: input.notes });

  if (input.phase === "extract") {
    return { status: "extracted", story, confidence: checked.confidence };
  }
  if (!canPublish()) {
    return { status: "extracted", story, confidence: checked.confidence };
  }

  try {
    const published = await publishStory(story);
    if (published.merged) {
      return { status: "published", slug: story.slug, url: `/discover/${story.slug}`, prUrl: published.prUrl };
    }
    return { status: "queued", slug: story.slug, prUrl: published.prUrl };
  } catch (error) {
    const reason = error instanceof Error ? error.message : "publish_failed";
    await fileIngestError({ url: post.url, code: "publish_failed", reason });
    return { status: "skipped", code: "publish_failed", reason: "Parsed, but could not open the ingest pull request." };
  }
}
