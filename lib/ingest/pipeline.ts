import { discoverStories, type DiscoverStory } from "@/data/discover";
import { extractCase } from "./extract";
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
};

export type IngestResult =
  | { status: "published"; slug: string; url: string; prUrl: string }
  | { status: "queued"; slug: string; prUrl: string }
  | { status: "extracted"; story: DiscoverStory; confidence: number }
  | { status: "skipped"; code: string; reason: string };

export async function ingestUseCase(input: IngestInput): Promise<IngestResult> {
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
  try {
    extracted = await extractCase(post, { prompt: input.prompt, notes: input.notes });
  } catch {
    const result = { status: "skipped" as const, code: "extract_failed", reason: "Could not parse this post." };
    await fileIngestError({ url: post.url, code: result.code, reason: result.reason });
    return result;
  }

  const checked = validateExtractedCase(post, extracted, { prompt: input.prompt }, discoverStories);
  if (!checked.ok) {
    await fileIngestError({ url: post.url, code: checked.code, reason: checked.reason });
    return { status: "skipped", code: checked.code, reason: checked.reason };
  }

  const slug = makeStorySlug(post.handle, checked.extracted.title, existingStoryKeys().slugs);
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
