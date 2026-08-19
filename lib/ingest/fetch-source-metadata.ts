export type GenericSourceType = "article" | "newsletter" | "youtube" | "github" | "note";

export type GenericSourceMetadata = {
  authorName: string;
  publishedAt: string;
  pageTitle?: string;
  siteName: string;
  dateFromSource: boolean;
};

const USER_AGENT = "UseGrokBot-source-ingest/1.0 (+https://usegrokbot.com)";

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isoDay(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

function escaped(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function metaContent(html: string, key: string) {
  const name = escaped(key);
  const attrs = `(?:name|property|itemprop)=["']${name}["']`;
  const patterns = [
    new RegExp(`<meta[^>]+${attrs}[^>]+content="([^"]*)"[^>]*>`, "i"),
    new RegExp(`<meta[^>]+${attrs}[^>]+content='([^']*)'[^>]*>`, "i"),
    new RegExp(`<meta[^>]+content="([^"]*)"[^>]+${attrs}[^>]*>`, "i"),
    new RegExp(`<meta[^>]+content='([^']*)'[^>]+${attrs}[^>]*>`, "i"),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeHtml(match[1]);
  }
  return null;
}

function htmlTitle(html: string) {
  return (
    metaContent(html, "og:title") ||
    metaContent(html, "twitter:title") ||
    decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "") ||
    undefined
  );
}

function jsonLdAuthor(html: string) {
  const object = html.match(/"author"\s*:\s*\{[\s\S]{0,800}?"name"\s*:\s*"([^"]+)"/i)?.[1];
  const array = html.match(/"author"\s*:\s*\[[\s\S]{0,800}?"name"\s*:\s*"([^"]+)"/i)?.[1];
  return decodeHtml(object || array || "") || null;
}

function dateFromHtml(html: string) {
  const values = [
    metaContent(html, "article:published_time"),
    metaContent(html, "datePublished"),
    metaContent(html, "date"),
    metaContent(html, "pubdate"),
    html.match(/"datePublished"\s*:\s*"([^"]+)"/i)?.[1],
    html.match(/"publishDate"\s*:\s*"([^"]+)"/i)?.[1],
    html.match(/"uploadDate"\s*:\s*"([^"]+)"/i)?.[1],
  ];
  for (const value of values) {
    const day = isoDay(value);
    if (day) return day;
  }
  return null;
}

function authorFromHtml(html: string) {
  return (
    metaContent(html, "author") ||
    metaContent(html, "article:author") ||
    jsonLdAuthor(html) ||
    null
  );
}

function inferAuthorFromIndexTitle(title: string) {
  const colon = title.indexOf(":");
  if (colon <= 0 || colon > 50) return null;
  const candidate = title.slice(0, colon).trim();
  return candidate && candidate.length <= 50 ? candidate : null;
}

function siteNameFromUrl(url: string, type: GenericSourceType) {
  if (type === "youtube") return "YouTube";
  if (type === "github") return "GitHub";
  if (type === "note") return "note";
  const host = new URL(url).hostname.replace(/^www\./, "");
  return host;
}

async function fetchHtml(url: string) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/html,application/xhtml+xml",
    },
    signal: AbortSignal.timeout(15_000),
  });
  if (response.status === 404 || response.status === 410) {
    throw new Error(`source_unreadable:${response.status}`);
  }
  if (!response.ok) return null;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) return null;
  return response.text();
}

async function youtubeMetadata(url: string, indexTitle: string): Promise<GenericSourceMetadata> {
  let authorName = inferAuthorFromIndexTitle(indexTitle) || "YouTube creator";
  let pageTitle: string | undefined;

  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`,
      { headers: { "User-Agent": USER_AGENT }, signal: AbortSignal.timeout(10_000) },
    );
    if (response.ok) {
      const data = (await response.json()) as { author_name?: string; title?: string };
      authorName = data.author_name?.trim() || authorName;
      pageTitle = data.title?.trim() || undefined;
    }
  } catch {
    // The Field Cases index still gives us a source URL and CC0 summary.
  }

  let publishedAt: string | null = null;
  try {
    const html = await fetchHtml(url);
    if (html) {
      publishedAt = dateFromHtml(html);
      pageTitle = pageTitle || htmlTitle(html);
    }
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("source_unreadable:")) throw error;
  }

  return {
    authorName,
    pageTitle,
    publishedAt: publishedAt ?? new Date().toISOString().slice(0, 10),
    siteName: "YouTube",
    dateFromSource: Boolean(publishedAt),
  };
}

async function githubMetadata(url: string, indexTitle: string): Promise<GenericSourceMetadata> {
  const parsed = new URL(url);
  const parts = parsed.pathname.split("/").filter(Boolean);
  const owner = parts[0] || inferAuthorFromIndexTitle(indexTitle) || "GitHub contributor";
  const repo = parts[1];
  if (!repo) {
    return {
      authorName: owner,
      publishedAt: new Date().toISOString().slice(0, 10),
      siteName: "GitHub",
      dateFromSource: false,
    };
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { "User-Agent": USER_AGENT, Accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(10_000),
    });
    if (response.status === 404) throw new Error("source_unreadable:404");
    if (response.ok) {
      const data = (await response.json()) as {
        owner?: { login?: string };
        created_at?: string;
        full_name?: string;
      };
      const day = isoDay(data.created_at);
      return {
        authorName: data.owner?.login || owner,
        pageTitle: data.full_name,
        publishedAt: day ?? new Date().toISOString().slice(0, 10),
        siteName: "GitHub",
        dateFromSource: Boolean(day),
      };
    }
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("source_unreadable:")) throw error;
  }

  return {
    authorName: owner,
    publishedAt: new Date().toISOString().slice(0, 10),
    siteName: "GitHub",
    dateFromSource: false,
  };
}

export async function fetchGenericSourceMetadata(
  url: string,
  type: GenericSourceType,
  indexTitle: string,
): Promise<GenericSourceMetadata> {
  if (type === "youtube") return youtubeMetadata(url, indexTitle);
  if (type === "github") return githubMetadata(url, indexTitle);

  const fallbackAuthor = inferAuthorFromIndexTitle(indexTitle);
  const fallbackSite = siteNameFromUrl(url, type);

  try {
    const html = await fetchHtml(url);
    if (html) {
      const siteName = metaContent(html, "og:site_name") || fallbackSite;
      const publishedAt = dateFromHtml(html);
      return {
        authorName: authorFromHtml(html) || fallbackAuthor || siteName,
        pageTitle: htmlTitle(html),
        publishedAt: publishedAt ?? new Date().toISOString().slice(0, 10),
        siteName,
        dateFromSource: Boolean(publishedAt),
      };
    }
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("source_unreadable:")) throw error;
  }

  return {
    authorName: fallbackAuthor || fallbackSite,
    publishedAt: new Date().toISOString().slice(0, 10),
    siteName: fallbackSite,
    dateFromSource: false,
  };
}
