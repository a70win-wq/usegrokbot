import { ingestUseCase } from "../lib/ingest/pipeline";
import { publishStory } from "../lib/ingest/publish";
import { assertStorySafe } from "../lib/ingest/validate";
import { parseXUrl } from "../lib/ingest/x-url";
import { discoverStories, type DiscoverStory } from "../data/discover";
import { site } from "../lib/site";

function readIssue() {
  const title = process.env.ISSUE_TITLE ?? "";
  const body = process.env.ISSUE_BODY ?? "";
  const url =
    parseXUrl(title.replace(/^Ingest use case:\s*/i, "").trim())?.url ??
    body
      .split("\n")
      .map((line) => parseXUrl(line.trim())?.url)
      .find(Boolean);
  const jsonMatch = body.match(/```json\s*([\s\S]*?)```/);
  const story = jsonMatch ? (JSON.parse(jsonMatch[1]) as DiscoverStory) : null;
  const prompt = pickSection(body, "Prompt");
  const notes = pickSection(body, "Notes");
  return { url, story, prompt, notes };
}

function pickSection(body: string, heading: string) {
  const match = body.match(new RegExp(`## ${heading}\\n([\\s\\S]*?)(?:\\n## |$)`));
  const value = match?.[1]?.trim();
  if (!value || value === "Not provided") return undefined;
  return value;
}

async function extractViaSite(xUrl: string, prompt?: string, notes?: string) {
  const response = await fetch(`${site.url}/api/ingest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-ingest-mode": "extract",
    },
    body: JSON.stringify({ xUrl, prompt, notes, phase: "extract" }),
  });
  const data = (await response.json()) as { status: string; story?: DiscoverStory; reason?: string };
  if (data.status !== "extracted" || !data.story) {
    throw new Error(data.reason || "extract_via_site_failed");
  }
  return data.story;
}

async function main() {
  const title = process.env.ISSUE_TITLE ?? "";
  if (!/^Ingest use case:/i.test(title) && !process.env.INGEST_URL) {
    console.log("skip: not an ingest issue");
    return;
  }

  const issue = readIssue();
  const xUrl = process.env.INGEST_URL || issue.url;
  let story = issue.story && issue.story.slug ? issue.story : null;

  if (!story && xUrl) {
    const result = await ingestUseCase({ xUrl, prompt: issue.prompt, notes: issue.notes });
    if (result.status === "published" || result.status === "queued") {
      console.log(result.status, result.prUrl);
      return;
    }
    if (result.status === "extracted") story = result.story;
    if (result.status === "skipped" && result.code === "extract_failed" && xUrl) {
      story = await extractViaSite(xUrl, issue.prompt, issue.notes);
    } else if (result.status === "skipped") {
      throw new Error(`${result.code}: ${result.reason}`);
    }
  }

  if (!story) throw new Error("No X URL or story JSON on this issue.");
  assertStorySafe(
    story,
    discoverStories.filter((item) => item.slug !== story!.slug),
  );
  const published = await publishStory(story);
  console.log(published.merged ? "published" : "queued", published.prUrl);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
