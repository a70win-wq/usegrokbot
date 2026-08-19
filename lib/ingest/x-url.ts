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
