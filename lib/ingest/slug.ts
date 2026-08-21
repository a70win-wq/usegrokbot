export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)
    .replace(/^-+|-+$/g, "");
}

export function makeStorySlug(handle: string, title: string, existing: Set<string>) {
  const base = [slugify(handle), slugify(title)].filter(Boolean).join("-") || "grok-bot-case";
  let slug = base;
  let n = 2;
  while (existing.has(slug)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}
