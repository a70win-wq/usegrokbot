import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  INDEXNOW_ENDPOINT,
  INDEXNOW_HOST,
  INDEXNOW_KEY,
  INDEXNOW_KEY_LOCATION,
  INDEXNOW_MAX_URLS_PER_REQUEST,
  INDEXNOW_SITEMAP_URL,
  classifyIndexNowStatus,
  collectCanonicalPageUrls,
  extractLocElements,
  filterCanonicalUrls,
  inspectIndexNowUrl,
  parseArgs,
  parseSitemapDocument,
  runSubmitIndexNow,
} from "./indexnow.mjs";

const KEY = INDEXNOW_KEY;

function urlEntry(loc, extraHrefs = []) {
  const links = extraHrefs
    .map((href) => `    <xhtml:link rel="alternate" hreflang="ja" href="${href}" />`)
    .join("\n");
  return `  <url>\n    <loc>${loc}</loc>\n${links}\n  </url>`;
}

function urlset(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`;
}

function mockFetch(routes) {
  /** @type {Array<{ method: string, url: string, body?: string }>} */
  const calls = [];
  const fetchImpl = async (url, init = {}) => {
    const method = String(init.method ?? "GET").toUpperCase();
    calls.push({ method, url: String(url), body: init.body });
    const route = routes[`${method} ${url}`] ?? routes[String(url)];
    if (!route) {
      throw new Error(`Unexpected fetch ${method} ${url}`);
    }
    if (route.delayMs) {
      await new Promise((resolve, reject) => {
        const timer = setTimeout(resolve, route.delayMs);
        init.signal?.addEventListener("abort", () => {
          clearTimeout(timer);
          reject(Object.assign(new Error("aborted"), { name: "AbortError" }));
        });
      });
    }
    return {
      status: route.status ?? 200,
      text: async () => route.body ?? "",
    };
  };
  fetchImpl.calls = calls;
  return fetchImpl;
}

test("parseArgs accepts dry-run and sitemap flags", () => {
  assert.deepEqual(parseArgs(["--dry-run"]), { dryRun: true, sitemap: null });
  assert.deepEqual(parseArgs(["--sitemap", "./sitemap.xml", "--dry-run"]), {
    dryRun: true,
    sitemap: "./sitemap.xml",
  });
  assert.deepEqual(parseArgs(["--sitemap=https://usegrokbot.com/sitemap.xml"]), {
    dryRun: false,
    sitemap: "https://usegrokbot.com/sitemap.xml",
  });
  assert.throws(() => parseArgs(["--live"]), /Unknown argument/);
});

test("extractLocElements ignores hreflang href attributes", () => {
  const xml = urlset([
    urlEntry("https://usegrokbot.com/en", ["https://usegrokbot.com/ja", "https://usegrokbot.com/zh-hk"]),
  ]);
  assert.deepEqual(extractLocElements(xml), ["https://usegrokbot.com/en"]);
});

test("inspectIndexNowUrl rejects cross-host, query, hash, and invalid URLs", () => {
  assert.equal(inspectIndexNowUrl("https://usegrokbot.com/en").ok, true);
  assert.equal(inspectIndexNowUrl("https://www.usegrokbot.com/en").reason, "cross-host");
  assert.equal(inspectIndexNowUrl("https://example.com/en").reason, "cross-host");
  assert.equal(inspectIndexNowUrl("http://usegrokbot.com/en").reason, "not-https");
  assert.equal(inspectIndexNowUrl("https://usegrokbot.com/en?utm=1").reason, "query");
  assert.equal(inspectIndexNowUrl("https://usegrokbot.com/en#top").reason, "hash");
  assert.equal(inspectIndexNowUrl("not a url").reason, "invalid");
});

test("filterCanonicalUrls keeps unique production pages and drops the rest", () => {
  const filtered = filterCanonicalUrls([
    "https://usegrokbot.com/en",
    "https://usegrokbot.com/en",
    "https://usegrokbot.com/ja?ref=1",
    "https://usegrokbot.com/zh-cn#x",
    "https://bing.com/indexnow",
  ]);
  assert.deepEqual(filtered.accepted, ["https://usegrokbot.com/en"]);
  assert.deepEqual(
    filtered.rejected.map((item) => item.reason),
    ["query", "hash", "cross-host"],
  );
});

test("620 loc entries stay 620 after hreflang noise", async () => {
  const entries = [];
  for (let index = 0; index < 620; index += 1) {
    const loc = `https://usegrokbot.com/en/page-${index}`;
    entries.push(urlEntry(loc, ["https://usegrokbot.com/ja/page-" + index, "https://example.com/other"]));
  }
  const xml = urlset(entries);
  const urls = await collectCanonicalPageUrls({ xml });
  assert.equal(extractLocElements(xml).length, 620);
  assert.equal(urls.accepted.length, 620);
  assert.equal(urls.rejected.length, 0);
});

test("sitemap index uses child urlset loc values, not the index loc itself", async () => {
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>https://usegrokbot.com/sitemap-0.xml</loc></sitemap>\n</sitemapindex>\n`;
  const childXml = urlset([urlEntry("https://usegrokbot.com/en/articles")]);
  const fetchImpl = mockFetch({
    "GET https://usegrokbot.com/sitemap-0.xml": { body: childXml },
  });
  const urls = await collectCanonicalPageUrls({ xml: indexXml, fetchImpl });
  assert.deepEqual(urls.accepted, ["https://usegrokbot.com/en/articles"]);
  assert.equal(parseSitemapDocument(indexXml).kind, "index");
});

test("classifyIndexNowStatus treats 200/202 as success and 429 as failure", () => {
  assert.deepEqual(classifyIndexNowStatus(200), { ok: true, state: "submitted" });
  assert.deepEqual(classifyIndexNowStatus(202), { ok: true, state: "key_validation_pending" });
  assert.equal(classifyIndexNowStatus(429).ok, false);
  assert.equal(classifyIndexNowStatus(403).ok, false);
  assert.equal(classifyIndexNowStatus(500).ok, false);
});

test("dry-run reads the live sitemap URL, verifies the key, and never POSTs", async () => {
  const xml = urlset([urlEntry("https://usegrokbot.com/en"), urlEntry("https://usegrokbot.com/ja")]);
  const fetchImpl = mockFetch({
    [`GET ${INDEXNOW_SITEMAP_URL}`]: { body: xml },
    [`GET ${INDEXNOW_KEY_LOCATION}`]: { body: `${KEY}\n` },
  });

  const result = await runSubmitIndexNow({ argv: ["--dry-run"], fetchImpl });

  assert.equal(result.dryRun, true);
  assert.equal(result.posted, false);
  assert.equal(result.sitemap.value, INDEXNOW_SITEMAP_URL);
  assert.deepEqual(result.accepted, ["https://usegrokbot.com/en", "https://usegrokbot.com/ja"]);
  assert.equal(result.endpoint, INDEXNOW_ENDPOINT);
  assert.equal(result.endpoint.includes("bing.com"), false);
  assert.deepEqual(
    fetchImpl.calls.map((call) => `${call.method} ${call.url}`),
    [`GET ${INDEXNOW_SITEMAP_URL}`, `GET ${INDEXNOW_KEY_LOCATION}`],
  );
});

test("optional --sitemap file is used instead of fetching the live sitemap", async () => {
  const directory = mkdtempSync(join(tmpdir(), "indexnow-"));
  const filePath = join(directory, "sitemap.xml");
  writeFileSync(
    filePath,
    urlset([urlEntry("https://usegrokbot.com/zh-cn/community")]),
    "utf8",
  );
  const fetchImpl = mockFetch({
    [`GET ${INDEXNOW_KEY_LOCATION}`]: { body: KEY },
  });

  const result = await runSubmitIndexNow({
    argv: ["--dry-run", "--sitemap", filePath],
    fetchImpl,
  });

  assert.equal(result.sitemap.kind, "file");
  assert.deepEqual(result.accepted, ["https://usegrokbot.com/zh-cn/community"]);
  assert.equal(fetchImpl.calls.some((call) => call.method === "POST"), false);
  assert.equal(
    fetchImpl.calls.some((call) => call.url === INDEXNOW_SITEMAP_URL),
    false,
  );
});

test("live submit posts one shared endpoint and accepts HTTP 202", async () => {
  const xml = urlset([urlEntry("https://usegrokbot.com/en")]);
  const fetchImpl = mockFetch({
    [`GET ${INDEXNOW_SITEMAP_URL}`]: { body: xml },
    [`GET ${INDEXNOW_KEY_LOCATION}`]: { body: KEY },
    [`POST ${INDEXNOW_ENDPOINT}`]: { status: 202, body: "" },
  });

  const result = await runSubmitIndexNow({ argv: [], fetchImpl });

  assert.equal(result.posted, true);
  assert.equal(result.responses[0].status, 202);
  assert.equal(result.responses[0].state, "key_validation_pending");
  const posts = fetchImpl.calls.filter((call) => call.method === "POST");
  assert.equal(posts.length, 1);
  assert.equal(posts[0].url, INDEXNOW_ENDPOINT);
  const payload = JSON.parse(String(posts[0].body));
  assert.equal(payload.host, INDEXNOW_HOST);
  assert.equal(payload.key, KEY);
  assert.deepEqual(payload.urlList, ["https://usegrokbot.com/en"]);
});

test("HTTP 429 and mismatched keys fail before or during submit", async () => {
  const xml = urlset([urlEntry("https://usegrokbot.com/en")]);

  await assert.rejects(
    () =>
      runSubmitIndexNow({
        argv: ["--dry-run"],
        fetchImpl: mockFetch({
          [`GET ${INDEXNOW_SITEMAP_URL}`]: { body: xml },
          [`GET ${INDEXNOW_KEY_LOCATION}`]: { body: "wrong-key" },
        }),
      }),
    /does not match the expected key/,
  );

  await assert.rejects(
    () =>
      runSubmitIndexNow({
        argv: [],
        fetchImpl: mockFetch({
          [`GET ${INDEXNOW_SITEMAP_URL}`]: { body: xml },
          [`GET ${INDEXNOW_KEY_LOCATION}`]: { body: KEY },
          [`POST ${INDEXNOW_ENDPOINT}`]: { status: 429, body: "slow down" },
        }),
      }),
    /rate_limited \(HTTP 429\)/,
  );
});

test("timeouts fail the run", async () => {
  const xml = urlset([urlEntry("https://usegrokbot.com/en")]);
  await assert.rejects(
    () =>
      runSubmitIndexNow({
        argv: ["--dry-run"],
        timeoutMs: 20,
        fetchImpl: mockFetch({
          [`GET ${INDEXNOW_SITEMAP_URL}`]: { body: xml, delayMs: 200 },
        }),
      }),
    /timed out/,
  );
});

test("more than 10000 URLs split into batches of at most 10000", async () => {
  const count = INDEXNOW_MAX_URLS_PER_REQUEST + 3;
  const entries = [];
  for (let index = 0; index < count; index += 1) {
    entries.push(urlEntry(`https://usegrokbot.com/en/n-${index}`));
  }
  const fetchImpl = mockFetch({
    [`GET ${INDEXNOW_SITEMAP_URL}`]: { body: urlset(entries) },
    [`GET ${INDEXNOW_KEY_LOCATION}`]: { body: KEY },
    [`POST ${INDEXNOW_ENDPOINT}`]: { status: 200, body: "" },
  });

  const result = await runSubmitIndexNow({ argv: [], fetchImpl });
  assert.deepEqual(result.batches, [INDEXNOW_MAX_URLS_PER_REQUEST, 3]);
  assert.equal(fetchImpl.calls.filter((call) => call.method === "POST").length, 2);
  assert.ok(result.batches.every((size) => size <= INDEXNOW_MAX_URLS_PER_REQUEST));
});
