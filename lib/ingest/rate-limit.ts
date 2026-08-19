const WINDOW_MS = 60 * 60 * 1000;
const MAX = 8;
const hits = new Map<string, number[]>();

export function rateLimit(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  if (recent.length >= MAX) return false;
  recent.push(now);
  hits.set(key, recent);
  return true;
}
