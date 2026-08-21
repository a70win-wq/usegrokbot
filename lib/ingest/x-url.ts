export type ParsedXUrl = {
  url: string;
  id: string;
  handle?: string;
};

export function parseXUrl(raw: string): ParsedXUrl | null {
  try {
    const url = new URL(raw.trim());
    if (!/^(www\.)?(x\.com|twitter\.com)$/i.test(url.hostname)) return null;
    const parts = url.pathname.split("/").filter(Boolean);
    const statusAt = parts.findIndex((part) => part === "status" || part === "statuses");
    const id = statusAt >= 0 ? parts[statusAt + 1] : undefined;
    if (!id || !/^\d+$/.test(id)) return null;
    const handle = parts[0] && parts[0] !== "i" && parts[0] !== "status" ? parts[0].replace(/^@/, "") : undefined;
    return {
      id,
      handle,
      url: `https://x.com/${handle ?? "i"}/status/${id}`,
    };
  } catch {
    return null;
  }
}

export function tweetIdFromUrl(url: string) {
  return parseXUrl(url)?.id;
}

const X_ARTICLE_RE = /https?:\/\/(?:www\.)?(?:x\.com|twitter\.com)\/(?:i\/|[^/\s]+\/)article\/(\d+)/i;

export function xArticleIdFromText(text: string) {
  return text.match(X_ARTICLE_RE)?.[1];
}

export function hasXArticleLink(text: string) {
  return X_ARTICLE_RE.test(text) || /(?:x\.com|twitter\.com)\/(?:i\/)?article\//i.test(text);
}

const X_URL_RE = /https?:\/\/(?:www\.)?(?:x\.com|twitter\.com)\/[^\s<>"'`)\]|]+/gi;

export function collectXUrls(text: string, limit = 15): string[] {
  const found = new Map<string, string>();
  for (const raw of text.match(X_URL_RE) ?? []) {
    const parsed = parseXUrl(raw.replace(/[.,;:!?]+$/, ""));
    if (!parsed || found.has(parsed.id)) continue;
    found.set(parsed.id, parsed.url);
    if (found.size >= limit) break;
  }
  return [...found.values()];
}

export function isIngestIssueTitle(title: string) {
  return /^Ingest (use case|posts|batch):/i.test(title.trim());
}
