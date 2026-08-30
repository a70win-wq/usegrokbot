import { metricForPostUrl, metricForStory } from "@/lib/x-metrics";
import { discoverStories, type DiscoverStory } from "./discover";
import catalogFile from "./templates-catalog.json";

export const TOP_TEMPLATE_COUNT = 10;

export const templateCategorySlugs = ["website"] as const;
export type TemplateCategorySlug = (typeof templateCategorySlugs)[number];

const BOT_URL = /https?:\/\/(?:www\.)?x\.ai\/bot\/([A-Za-z0-9_-]+)(?:\?[^\s)<"'\]>]*)?/gi;
const PAGE_SLUGS = new Set(["use-cases", "onboarding", "download", "templates"]);

export type BotTemplate = {
  id: string;
  templateUrl: string;
  storySlug: string;
  publishedAt: string;
  authorName: string;
  handle?: string;
  xPostUrl?: string;
  rank: number;
  category?: TemplateCategorySlug;
};

export type TemplateCopy = {
  title: string;
  oneLiner: string;
};

export type TemplateCatalogEntry = {
  id: string;
  title: string;
  oneLiner: string;
  body: string;
  templateUrl: string;
  authorName: string;
  handle?: string;
  xPostUrl?: string;
  publishedAt: string;
  category?: TemplateCategorySlug;
};

const catalog = catalogFile as TemplateCatalogEntry[];
const catalogById = new Map(catalog.map((item) => [item.id, item]));

export function catalogEntry(id: string) {
  return catalogById.get(id);
}

type TemplateLink = {
  id: string;
  url: string;
};

type StoryCopy = Pick<DiscoverStory, "title" | "headline"> &
  Partial<Pick<DiscoverStory, "body" | "whatTheyDid">>;

function storyText(story: StoryCopy) {
  return [story.title, story.headline, story.body, story.whatTheyDid].filter(Boolean).join("\n");
}

function collectLinks(text: string): TemplateLink[] {
  const seen = new Set<string>();
  const links: TemplateLink[] = [];
  for (const match of text.matchAll(BOT_URL)) {
    const id = match[1];
    if (PAGE_SLUGS.has(id.toLowerCase()) || seen.has(id)) continue;
    seen.add(id);
    const raw = match[0].replace(/[),.;]+$/, "");
    const url = raw.startsWith("http") ? raw : `https://${raw}`;
    links.push({ id, url });
  }
  return links;
}

function tidyName(raw: string) {
  return raw
    .replace(/@bot/gi, "")
    .replace(/@grok/gi, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .replace(/^[-*◆•\d.)\s]+/, "")
    .replace(/[:：.!?…👇]+$/g, "")
    .trim();
}

function looksLikeName(name: string) {
  if (name.length < 2 || name.length > 48) return false;
  if (/链接|下載|下载|👇|@|（|）|\(/.test(name)) return false;
  if (
    /^(try it|clone it|download|here|link|template|bot template|grok bot template|the template|direct link|now anyone can use this template|add it|do anything)$/i.test(
      name,
    )
  ) {
    return false;
  }
  if (
    /^(i |if |so |here|this |for |the one|first thing|you can|let me|check out|wanna |wake up|add |do |try |basically |the bot is called)/i.test(
      name,
    )
  ) {
    return false;
  }
  const words = name.split(" ").filter(Boolean);
  if (words.length > 6) return false;
  return true;
}

function nameFromLabeledLine(line: string): string | null {
  const withoutUrl = line.replace(BOT_URL, "").trim();
  const labeled = withoutUrl.match(/^(?:[-*◆•]|\d+[.)])?\s*(.+?)[:：]\s*$/);
  if (!labeled) return null;
  const candidate = tidyName(labeled[1]);
  return looksLikeName(candidate) ? candidate : null;
}

function nameBesideLink(text: string, id: string): string | null {
  const lines = text.split(/\n+/);
  const index = lines.findIndex((line) => line.includes(`x.ai/bot/${id}`));
  if (index < 0) return null;
  const onLine = nameFromLabeledLine(lines[index]);
  if (onLine) return onLine;
  if (index > 0) {
    const previous = nameFromLabeledLine(`${lines[index - 1].replace(/[:：]\s*$/, "")}:`);
    if (previous) return previous;
  }
  return null;
}

function namedFromStory(text: string): string | null {
  const patterns: Array<[RegExp, string | number]> = [
    [/\bits name is\s+([A-Z][\w'’.-]*)/i, 1],
    [/\bthe bot is called\s+([A-Z][\w'’.-]*(?:\s+[A-Z][\w'’.-]*){0,3})/i, 1],
    [/\bMeet\s+([A-Z][\w'’.-]*)\b/, 1],
    [/\bIntroducing:?\s+([A-Z][\w'’.-]*(?:\s+[A-Z][\w'’.-]*){0,3})/, 1],
    [/\bhire\s+([A-Z][\w'’.-]+)/i, 1],
    [/\bI created Clipper\b/, "Clipper"],
    [/\bI created a Home Robots template\b/, "Home Robots"],
    [/\bCheck out ([A-Z][\w'’.-]*(?:\s+[A-Z][\w'’.-]*){0,3})\b/, 1],
    [/\bI made a PR Reviewer\b/, "PR Reviewer"],
    [/\bI made a CMO\b/, "CMO"],
    [/\bI made a Monad Grok Bot template\b/i, "Monad"],
    [/\bI made a (.+?) template\b/i, 1],
    [/\bHere's my (.+?) Grok Bot\b/i, 1],
    [/\bMy personal (.+?) Grok Bot\b/i, 1],
    [/\b(?:try my )?Dr Eggbot\b/i, "Dr Eggbot"],
    [/\bPitch Deck Coach:/, "Pitch Deck Coach"],
    [/\bHelidon Engineer\b/, "Helidon Engineer"],
    [/\btrad @bot\b/i, "Trad"],
    [/\bgardener Grok/i, "Gardener"],
    [/旅行手配エージェント/, "旅行手配エージェント"],
    [/赛博小晚/, "赛博小晚"],
    [/\bHuman Copywriter @bot\b/i, "Human Copywriter"],
    [/\bvideo editor @bot\b/i, "Video editor"],
    [/\bComic Week Brief\b/, "Comic Week Brief"],
    [/\bGrok Bot Template for any topics/, "Topic feed"],
    [/\bI created a workflow to help users search through third-party platforms/, "Subscription cleaner"],
    [/\ba bot that builds a live topic feed/, "Live topic feed"],
    [/\bSo I made LinkedIn Desk/, "LinkedIn Desk"],
    [/\bx402 book shop/i, "x402 book shop"],
    [/\brevenue enablement bot template/i, "Revenue Enablement"],
    [/\bads manager\/operator/i, "Ads manager"],
    [/\bagent pm for running an agentic software factory/i, "Agent PM"],
    [/\bEnterprise Crew/, "Enterprise Crew"],
    [/\bmath videos like this one/, "Math videos"],
    [/\bDisney World trip/, "Disney World wait times"],
    [/\bcontra\.com/, "Contra job watcher"],
    [/\bfree_bots_lol/, "free_bots_lol"],
    [/\breminder bot/i, "Reminder"],
    [/\bKirk to load out the crew/, "Kirk"],
  ];

  for (const [pattern, capture] of patterns) {
    const match = text.match(pattern);
    if (!match) continue;
    const name = typeof capture === "string" ? capture : tidyName(match[capture] ?? "");
    if (looksLikeName(name)) return name;
  }
  return null;
}

function fallbackTitle(story: Pick<DiscoverStory, "title" | "headline">) {
  const source = (story.title || story.headline || "Grok Bot template").replace(/\s+/g, " ").trim();
  const clipped = source.length > 72 ? `${source.slice(0, 69).trim()}…` : source;
  return clipped;
}

function clip(text: string, max = 180) {
  const compact = text.replace(/\s+/g, " ").trim();
  if (compact.length <= max) return compact;
  return `${compact.slice(0, max - 1).trim()}…`;
}

export function templateCopy(template: BotTemplate, story: StoryCopy): TemplateCopy {
  const cat = catalogById.get(template.id);
  const text = storyText(story);
  const links = collectLinks(text);
  const parsedTitle =
    nameBesideLink(text, template.id) ||
    (links.length === 1 ? namedFromStory(text) : null) ||
    fallbackTitle(story);
  const title = cat?.title || parsedTitle;
  const headline = (story.headline || "").replace(/\s+/g, " ").trim();
  const oneLiner = cat?.oneLiner
    ? clip(cat.oneLiner)
    : headline && headline.toLowerCase() !== title.toLowerCase()
      ? clip(headline)
      : clip(story.body || story.whatTheyDid || headline || title);
  return { title, oneLiner };
}

function viewsForTemplate(item: Omit<BotTemplate, "rank">) {
  if (item.storySlug) {
    const story = discoverStories.find((entry) => entry.slug === item.storySlug);
    const views = story ? metricForStory(story)?.views ?? 0 : 0;
    if (views) return views;
  }
  return metricForPostUrl(item.xPostUrl)?.views ?? 0;
}

function templatesFromStories(stories: readonly DiscoverStory[]): Omit<BotTemplate, "rank">[] {
  const seen = new Set<string>();
  const collected: Omit<BotTemplate, "rank">[] = [];

  for (const story of stories) {
    const links = collectLinks(storyText(story));
    for (const link of links) {
      if (seen.has(link.id)) continue;
      seen.add(link.id);
      collected.push({
        id: link.id,
        templateUrl: link.url,
        storySlug: story.slug,
        publishedAt: story.publishedAt,
        authorName: story.authorName,
        handle: story.handle,
        xPostUrl: story.xPostUrl ?? story.sourceUrl,
      });
    }
  }

  return collected;
}

function templatesFromCatalog(): Omit<BotTemplate, "rank">[] {
  return catalog.map((item) => ({
    id: item.id,
    templateUrl: item.templateUrl,
    storySlug: "",
    publishedAt: item.publishedAt,
    authorName: item.authorName,
    handle: item.handle,
    xPostUrl: item.xPostUrl,
    category: item.category,
  }));
}

export function mergeTemplates(): BotTemplate[] {
  const byId = new Map<string, Omit<BotTemplate, "rank">>();

  for (const item of templatesFromCatalog()) byId.set(item.id, item);

  for (const item of templatesFromStories(discoverStories)) {
    const existing = byId.get(item.id);
    if (!existing) {
      byId.set(item.id, item);
      continue;
    }
    byId.set(item.id, {
      ...existing,
      storySlug: item.storySlug || existing.storySlug,
      publishedAt: item.publishedAt || existing.publishedAt,
      authorName: item.authorName || existing.authorName,
      handle: item.handle || existing.handle,
      xPostUrl: item.xPostUrl || existing.xPostUrl,
      templateUrl: item.templateUrl || existing.templateUrl,
      category: existing.category || item.category,
    });
  }

  return [...byId.values()]
    .sort((a, b) => {
      const byViews = viewsForTemplate(b) - viewsForTemplate(a);
      if (byViews) return byViews;
      const byDate = b.publishedAt.localeCompare(a.publishedAt);
      if (byDate) return byDate;
      return a.id.localeCompare(b.id);
    })
    .map((item, index) => ({ ...item, rank: index + 1 }));
}

export const templates: readonly BotTemplate[] = mergeTemplates();

export function templatesForCategory(slug: TemplateCategorySlug | "all") {
  const source = slug === "all" ? templates : templates.filter((item) => item.category === slug);
  return source.map((item, index) => ({ ...item, rank: index + 1 }));
}

export function getTemplateStory(template: BotTemplate) {
  if (!template.storySlug) return undefined;
  return discoverStories.find((story) => story.slug === template.storySlug);
}

export function topTemplates() {
  return templates.filter((item) => item.rank <= TOP_TEMPLATE_COUNT);
}

/** First ten a new Grok user should try — zero extra hardware, one-tap add. */
export const STARTER_TEMPLATE_IDS = [
  "_2vi1lOY4oiBaJDA3S8l1", // Spark
  "93gOz3op1UQdBdbekQFLK", // Dr Eggbot
  "3U6zxtPa1b8GbWheaIr4J", // Chef
  "dHd69sBvMG2o3lJa__T7K", // Newsletter Cleanup
  "gCWYD009F66A3XDEYdZgf", // Bounty Hunter
  "uY_7s1TZILVzUeJ9lLOx9", // Tradbot
  "Do4CujP_kqnnc1KYnpOfI", // Video editor
  "JZAccYtlRFvDSU2CnMnkZ", // Human Copywriter
  "ozEfaAFJMDGoB-ysym8_V", // Clipper
  "0VC1XzREXRFGe0hVo-JEG", // Be Happier
] as const;

export function starterTemplates() {
  const byId = new Map(templates.map((item) => [item.id, item]));
  const picked: BotTemplate[] = [];
  const seen = new Set<string>();

  for (const id of STARTER_TEMPLATE_IDS) {
    const item = byId.get(id);
    if (!item || seen.has(id)) continue;
    seen.add(id);
    picked.push(item);
  }

  if (picked.length < TOP_TEMPLATE_COUNT) {
    for (const item of templates) {
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      picked.push(item);
      if (picked.length >= TOP_TEMPLATE_COUNT) break;
    }
  }

  return picked.slice(0, TOP_TEMPLATE_COUNT).map((item, index) => ({ ...item, rank: index + 1 }));
}

export function moreTemplates() {
  return templates.filter((item) => item.rank > TOP_TEMPLATE_COUNT);
}

export function rankLabel(rank: number) {
  return String(rank).padStart(2, "0");
}
