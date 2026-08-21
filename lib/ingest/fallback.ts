import type { DiscoverCategorySlug, OutcomeSlug } from "@/data/discover";
import type { AppSlug, Difficulty, Schedule } from "@/data/types";
import type { FetchedPost } from "./fetch-post";
import type { ExtractedCase } from "./schema";
import { notesSayElonLiked } from "./validate";

const GROK_SIGNAL = /grok\s*bot|\bgrok\b|@grok|@bot\b/i;

export function sourceHasGrokSignal(text: string) {
  return GROK_SIGNAL.test(text);
}

function clip(value: string, max: number) {
  const trimmed = value.replace(/\s+/g, " ").trim();
  if (trimmed.length <= max) return trimmed;
  const slice = trimmed.slice(0, max - 1);
  const bound = slice.lastIndexOf(" ");
  return `${(bound > 40 ? slice.slice(0, bound) : slice).trim()}...`;
}

function stripUrls(value: string) {
  return value.replace(/https?:\/\/\S+/gi, " ").replace(/\s+/g, " ").trim();
}

function firstSentence(value: string) {
  const clean = stripUrls(value);
  const match = clean.match(/.*?[.!?](?:\s|$)/);
  return (match?.[0] || clean).trim();
}

function guessCategory(text: string): DiscoverCategorySlug {
  const value = text.toLowerCase();
  if (/code|github|pr\b|engineer|developer|databricks|arduino|wordpress|software|api\b/.test(value)) {
    return "coding";
  }
  if (/support|helpdesk|customer[- ]service|refund/.test(value)) return "operations";
  if (/research|brief|scan|reconcil|credit committee|field notes/.test(value)) return "research";
  if (/calendar|reservation|travel|shopping|inbox|email|gmail|personal/.test(value)) return "personal";
  if (/sales|buyer|lead|crm|hubspot|salesforce/.test(value)) return "sales";
  if (/market|seo|campaign|ads\b/.test(value)) return "marketing";
  if (/content|image|write|video|post|podcast/.test(value)) return "content";
  return "operations";
}

function outcomesFor(category: DiscoverCategorySlug): OutcomeSlug[] {
  if (category === "coding") return ["build-software", "automate-work"];
  if (category === "research") return ["research", "save-time"];
  if (category === "sales" || category === "marketing") return ["grow-business", "automate-work"];
  if (category === "content") return ["create-content", "save-time"];
  return ["automate-work", "save-time"];
}

function guessApps(text: string): AppSlug[] {
  const value = text.toLowerCase();
  const apps: AppSlug[] = [];
  const add = (app: AppSlug) => {
    if (!apps.includes(app)) apps.push(app);
  };

  if (/\bgmail\b|inbox/.test(value)) add("gmail");
  if (/google sheets|\bsheets\b/.test(value)) add("google-sheets");
  if (/google calendar|calendar/.test(value)) add("google-calendar");
  if (/\bslack\b/.test(value)) add("slack");
  if (/\bnotion\b/.test(value)) add("notion");
  if (/\bgithub\b/.test(value)) add("github");
  if (/\bsalesforce\b/.test(value)) add("salesforce");
  if (/\bhubspot\b/.test(value)) add("hubspot");
  if (/\blinkedin\b/.test(value)) add("linkedin");
  if (/\breddit\b/.test(value)) add("reddit");
  if (/\byoutube\b/.test(value)) add("youtube");
  if (/\bbrowser\b|website|http/.test(value)) add("browser");
  if (/\bx\b|twitter/.test(value)) add("x");
  return apps.slice(0, 5);
}

function guessSchedule(text: string): Schedule {
  const value = text.toLowerCase();
  if (/always[- ]on|24\/7|continuous/.test(value)) return "always-on";
  if (/daily|every day|morning/.test(value)) return "daily";
  if (/weekly|every week/.test(value)) return "weekly";
  return "one-time";
}

function audienceFor(category: DiscoverCategorySlug) {
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

function titleFrom(post: FetchedPost) {
  const sentence = firstSentence(post.text);
  const cleaned = sentence.replace(/^["“']+|["”']+$/g, "").trim();
  if (cleaned.length >= 8) return clip(cleaned.replace(/[.]+$/, ""), 72);
  return `Grok Bot case from @${post.handle}`;
}

export function fallbackExtract(
  post: FetchedPost,
  extras: { prompt?: string; notes?: string } = {},
): ExtractedCase {
  const haystack = [post.sourceText, extras.prompt ?? "", extras.notes ?? ""].join("\n");
  const relevant = sourceHasGrokSignal(haystack);
  const summary = clip(firstSentence(post.text) || stripUrls(post.text), 220);
  const category = guessCategory(haystack);
  const whoShouldTry = audienceFor(category);
  const apps = guessApps(haystack);

  return {
    relevant,
    relevance: relevant ? 90 : 40,
    reason: relevant ? "Public Grok Bot post with a concrete task." : "Source does not mention Grok Bot.",
    title: titleFrom(post),
    headline: summary,
    whatTheyDid: summary,
    howItWorks:
      "UseGrokBot ingested this public X post. We keep the original permalink and did not re-run this Bot.",
    whyUseful: "A public example of someone handing work to Grok Bot, kept here with attribution.",
    whyItMatters:
      "The original X post is the source. This card is a short curator summary, not a reprint of the thread.",
    whoShouldTry,
    usefulFor: whoShouldTry.join(" / "),
    output: summary,
    category,
    outcomes: outcomesFor(category),
    apps: apps.length ? apps : ["x"],
    difficulty: "medium" satisfies Difficulty,
    schedule: guessSchedule(haystack),
    format: post.isArticle ? "article" : "post",
    elonLiked: notesSayElonLiked(extras.notes) || undefined,
  };
}
