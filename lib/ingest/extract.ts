import { generateText, Output } from "ai";
import type { FetchedPost } from "./fetch-post";
import { extractSchema, type ExtractedCase } from "./schema";

const MODEL = process.env.INGEST_MODEL ?? "openai/gpt-5.4";

export async function extractCase(
  post: FetchedPost,
  extras: { prompt?: string; notes?: string },
): Promise<ExtractedCase> {
  const { output } = await generateText({
    model: MODEL,
    output: Output.object({ schema: extractSchema }),
    prompt: [
      "You are ingesting a public X post for UseGrokBot, a Grok Bot discovery hub.",
      "Write a short curated case in English. UseGrokBot is the curator, not the original author.",
      "The author name and @handle are already known. Do not invent a different author or handle.",
      "Only mark relevant=true if the post is a real Grok Bot / @bot / @Grok agent workflow, demo, or result.",
      "If it is generic AI talk, a joke, news with no workflow, or spam, set relevant=false and relevance below 50.",
      "Do not invent result numbers. A result field may only repeat a number that already appears in SOURCE TEXT.",
      "If there is no number in the source, leave result empty and fill output with a qualitative outcome.",
      "quote, if present, must be a short substring of SOURCE TEXT.",
      "howItWorks must say we did not re-run this Bot.",
      "Keep each text field to 1-3 sentences. No hype.",
      "",
      `AUTHOR: ${post.authorName} @${post.handle}`,
      `DATE: ${post.publishedAt}`,
      `URL: ${post.url}`,
      extras.prompt ? `SUBMITTER PROMPT:\n${extras.prompt}` : "",
      extras.notes ? `SUBMITTER NOTES:\n${extras.notes}` : "",
      "",
      "SOURCE TEXT:",
      post.sourceText,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (!output) throw new Error("extract_failed");
  return output;
}
