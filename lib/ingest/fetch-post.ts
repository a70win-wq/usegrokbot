import { parseXUrl } from "./x-url";

export type FetchedPost = {
  url: string;
  id: string;
  handle: string;
  authorName: string;
  text: string;
  quotedText?: string;
  publishedAt: string;
  sourceText: string;
};

function isoDay(value: string | number) {
  const date = typeof value === "number" ? new Date(value * 1000) : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

function stripHtml(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

async function fromFxTwitter(id: string): Promise<FetchedPost | null> {
  const response = await fetch(`https://api.fxtwitter.com/status/${id}`, {
    headers: { "User-Agent": "usegrokbot.com" },
  });
  if (!response.ok) return null;
  const data = (await response.json()) as {
    tweet?: {
      url?: string;
      text?: string;
      created_at?: string;
      created_timestamp?: number;
      author?: { screen_name?: string; name?: string };
      quote?: { text?: string; author?: { screen_name?: string; name?: string } };
    };
  };
  const tweet = data.tweet;
  if (!tweet?.text || !tweet.author?.screen_name || !tweet.author.name) return null;
  const publishedAt = tweet.created_timestamp
    ? isoDay(tweet.created_timestamp)
    : tweet.created_at
      ? isoDay(tweet.created_at)
      : null;
  if (!publishedAt) return null;
  const quoted = tweet.quote?.text
    ? `${tweet.quote.author?.name ?? ""} @${tweet.quote.author?.screen_name ?? ""}: ${tweet.quote.text}`.trim()
    : undefined;
  const text = tweet.text.trim();
  return {
    url: tweet.url ?? `https://x.com/${tweet.author.screen_name}/status/${id}`,
    id,
    handle: tweet.author.screen_name,
    authorName: tweet.author.name,
    text,
    quotedText: quoted,
    publishedAt,
    sourceText: quoted ? `${text}\n\n${quoted}` : text,
  };
}

async function fromOEmbed(url: string, id: string): Promise<FetchedPost | null> {
  const response = await fetch(
    `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}&omit_script=true`,
    { headers: { "User-Agent": "usegrokbot.com" } },
  );
  if (!response.ok) return null;
  const data = (await response.json()) as {
    author_name?: string;
    author_url?: string;
    html?: string;
  };
  const text = data.html ? stripHtml(data.html) : "";
  const handle = data.author_url?.split("/").filter(Boolean).pop();
  if (!data.author_name || !handle || text.length < 8) return null;
  return {
    url,
    id,
    handle,
    authorName: data.author_name,
    text,
    publishedAt: new Date().toISOString().slice(0, 10),
    sourceText: text,
  };
}

export async function fetchXPost(rawUrl: string): Promise<FetchedPost> {
  const parsed = parseXUrl(rawUrl);
  if (!parsed) throw new Error("invalid_x_url");
  const fx = await fromFxTwitter(parsed.id);
  if (fx) return fx;
  const embed = await fromOEmbed(parsed.url, parsed.id);
  if (embed) return embed;
  throw new Error("source_unreadable");
}
