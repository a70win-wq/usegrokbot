import { getDiscoverStory, type DiscoverStory } from "@/data/discover";

const promptSourceSlugs = new Set([
  "mikepat711-grok-bot-use-case-my-leasing-office-emailed-me-a",
  "petergyang-i-hate-digital-clutter-so-i-set-up-a-marie-kondo",
  "kintsugijin-my-favorite-unusual-grok-bot-i-created-for-grok",
  "teslaconomics-i-just-created-the-worlds-best-amazon-cart-grok",
  "teslaconomics-i-just-made-the-worlds-best-chef-grok-bot",
  "teslaconomics-i-just-created-the-worlds-best-grok-bot-reminder",
  "kloss-xyz-600-yr-is-too-pricey-for-social-analytics-circle",
  "teslaconomics-my-mind-is-honestly-blown-by-what-i-just-got-my",
  "virgilerietsch-heres-a-cool-bot-use-case-i-asked-grok-bot-to-fi",
  "teslastars-voici-herme-s-mon-cinquie-me-grok-bot-en-charge",
  "siyabuilt-i-automated-basically-all-of-my-companys-finance",
  "lennybot-lenny-rachitsky",
]);

export function getVerifiedUseCaseSource(slug: string) {
  const source = getDiscoverStory(slug);
  if (!source) throw new Error(`Missing verified Use Case source: ${slug}`);
  return source;
}

export function getVerifiedUseCasePrompt(sourceSlug: string) {
  if (!promptSourceSlugs.has(sourceSlug)) return undefined;
  const source = getVerifiedUseCaseSource(sourceSlug);
  const body = source.body ?? source.whatTheyDid;

  switch (sourceSlug) {
    case "mikepat711-grok-bot-use-case-my-leasing-office-emailed-me-a":
      return between(body, "“Can you", "review.”", true);
    case "petergyang-i-hate-digital-clutter-so-i-set-up-a-marie-kondo":
      return between(body, '"You are', 'approval."', true);
    case "kintsugijin-my-favorite-unusual-grok-bot-i-created-for-grok":
      return between(body, "“You are", "Your name is Q.”", true);
    case "teslaconomics-i-just-created-the-worlds-best-amazon-cart-grok":
      return after(body, "---- message for your Cart (copy everything below for your first message) ----");
    case "teslaconomics-i-just-made-the-worlds-best-chef-grok-bot":
      return after(body, "---- message for your Chef (copy everything below for your first message) ----");
    case "teslaconomics-i-just-created-the-worlds-best-grok-bot-reminder":
      return after(body, "---- message for your Remind (copy everything below for your first message) ----");
    case "kloss-xyz-600-yr-is-too-pricey-for-social-analytics-circle":
      return after(body, "here's my process/prompt:");
    case "teslaconomics-my-mind-is-honestly-blown-by-what-i-just-got-my":
      return between(body, "“Break down", "Summarize it at the end.”", true);
    case "virgilerietsch-heres-a-cool-bot-use-case-i-asked-grok-bot-to-fi":
      return after(body, "Here is the prompt :");
    case "teslastars-voici-herme-s-mon-cinquie-me-grok-bot-en-charge":
      return after(body, "Tu es Hermès", true);
    case "siyabuilt-i-automated-basically-all-of-my-companys-finance":
      return between(body, "“Pull this week", "tax decisions.”", true);
    case "lennybot-lenny-rachitsky":
      return after(source.whatTheyDid, "The prompt he published:");
    default:
      return undefined;
  }
}

export function sourceHref(source: DiscoverStory) {
  return source.xPostUrl ?? source.sourceUrl;
}

function after(value: string, marker: string, includeMarker = false) {
  const index = value.indexOf(marker);
  if (index < 0) throw new Error(`Prompt marker not found: ${marker}`);
  return value.slice(includeMarker ? index : index + marker.length).trim();
}

function between(value: string, start: string, end: string, stripOuterQuote = false) {
  const startIndex = value.indexOf(start);
  if (startIndex < 0) throw new Error(`Prompt start not found: ${start}`);
  const endIndex = value.indexOf(end, startIndex + start.length);
  if (endIndex < 0) throw new Error(`Prompt end not found: ${end}`);
  let result = value.slice(startIndex, endIndex + end.length).trim();
  if (stripOuterQuote && (result.startsWith("“") || result.startsWith('"'))) result = result.slice(1);
  if (stripOuterQuote && (result.endsWith("”") || result.endsWith('"'))) result = result.slice(0, -1);
  return result.trim();
}
