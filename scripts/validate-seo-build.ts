import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import sitemap from "../app/sitemap";
import { languageAlternates, URL_LOCALES } from "../lib/i18n/paths";
import { site } from "../lib/site";

function attributes(tag: string): Record<string, string> {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1].toLowerCase(), match[2]]));
}

function htmlFor(path: string) {
  return readFileSync(join(process.cwd(), ".next/server/app", `${path}.html`), "utf8");
}

const entries = sitemap();
const urls = new Set(entries.map((entry) => entry.url));
assert.equal(urls.size, entries.length, "Sitemap must not contain duplicate URLs");

for (const entry of entries) {
  const url = new URL(entry.url);
  assert.equal(url.origin, site.url);
  assert.equal(url.search + url.hash, "");
  const html = htmlFor(url.pathname);
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const meta = (key: string) => metas.find((item) => item.name === key || item.property === key)?.content;
  const canonicals = links.filter((item) => item.rel === "canonical");
  assert.deepEqual(canonicals.map((item) => item.href), [entry.url], `${url.pathname}: canonical`);
  assert.ok(meta("description")?.trim(), `${url.pathname}: description`);
  assert.ok(/<title>[^<]+<\/title>/.test(html), `${url.pathname}: title`);
  assert.ok(!/\bnoindex\b/.test(meta("robots") ?? ""), `${url.pathname}: indexable`);
  assert.equal(meta("og:url"), entry.url, `${url.pathname}: sharing URL`);
  assert.ok(meta("og:title")?.trim(), `${url.pathname}: sharing title`);
  assert.ok(meta("og:description")?.trim(), `${url.pathname}: sharing description`);
  assert.equal(new URL(meta("og:image") ?? "").origin, site.url, `${url.pathname}: production sharing image`);
  const path = url.pathname.replace(/^\/(en|zh-hk|zh-cn|ja)(?=\/|$)/, "") || "/";
  for (const [language, alternate] of Object.entries(languageAlternates(path))) {
    assert.ok(urls.has(alternate), `${url.pathname}: alternate must be indexable`);
    assert.ok(links.some((link) => link.hreflang === language && link.href === alternate), `${url.pathname}: ${language} alternate`);
    assert.equal(Object.entries(entry.alternates?.languages ?? {}).find(([key]) => key === language)?.[1], alternate);
  }
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const data = JSON.parse(json);
    if (data.dateModified && data.datePublished) {
      assert.ok(Date.parse(data.dateModified) >= Date.parse(data.datePublished), `${url.pathname}: modification precedes publication`);
    }
    if (data["@type"] === "WebSite") {
      assert.equal(data.url, site.url, "Website identity must use the domain root");
      assert.equal(data["@id"], `${site.url}/#website`);
    }
  }
}

for (const locale of URL_LOCALES) {
  const html = htmlFor(`/${locale}/grok-4-7`);
  assert.match(html, /<meta name="robots" content="noindex, nofollow/);
  assert.ok(!urls.has(`${site.url}/${locale}/grok-4-7`));
}

const xml = readFileSync(".next/server/app/sitemap.xml.body", "utf8");
assert.equal([...xml.matchAll(/<loc>/g)].length, entries.length);
assert.ok(!xml.includes("<lastmod>"), "Do not invent page modification dates from source posts");
const robots = readFileSync(".next/server/app/robots.txt.body", "utf8");
assert.ok(robots.includes(`Sitemap: ${site.url}/sitemap.xml`));
assert.ok(!/^Disallow: \/$/m.test(robots), "Search engines must be allowed to crawl the site");
console.log(`SEO verified in built HTML: ${entries.length} canonical pages, language alternates, descriptions, sharing metadata, structured data, sitemap, and intentional exclusions.`);
