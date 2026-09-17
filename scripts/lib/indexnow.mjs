import { readFileSync } from "node:fs";
import { isAbsolute, resolve } from "node:path";

export const INDEXNOW_HOST = "usegrokbot.com";
export const INDEXNOW_KEY = "62d6505d7c4e672351306fbb847690dc";
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;
export const INDEXNOW_SITEMAP_URL = `https://${INDEXNOW_HOST}/sitemap.xml`;
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
export const INDEXNOW_MAX_URLS_PER_REQUEST = 10_000;
export const INDEXNOW_TIMEOUT_MS = 20_000;

export class IndexNowError extends Error {
  /**
   * @param {string} message
   * @param {{ cause?: unknown }} [options]
   */
  constructor(message, options) {
    super(message, options);
    this.name = "IndexNowError";
  }
}

/**
 * @param {string[]} argv
 */
export function parseArgs(argv) {
  /** @type {{ dryRun: boolean, sitemap: string | null }} */
  const parsed = { dryRun: false, sitemap: null };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--dry-run") {
      parsed.dryRun = true;
      continue;
    }
    if (arg === "--sitemap") {
      const value = argv[index + 1];
      if (!value || value.startsWith("-")) {
        throw new IndexNowError("Missing value for --sitemap");
      }
      parsed.sitemap = value;
      index += 1;
      continue;
    }
    if (arg.startsWith("--sitemap=")) {
      const value = arg.slice("--sitemap=".length);
      if (!value) {
        throw new IndexNowError("Missing value for --sitemap");
      }
      parsed.sitemap = value;
      continue;
    }
    throw new IndexNowError(`Unknown argument: ${arg}`);
  }

  return parsed;
}

/**
 * @param {string} value
 */
export function decodeXmlText(value) {
  let text = value.trim();
  const cdata = text.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  if (cdata) {
    text = cdata[1];
  }
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

/**
 * Canonical sitemap <loc> values only. Ignores hreflang href attributes.
 * @param {string} xml
 */
export function extractLocElements(xml) {
  const matches = xml.matchAll(/<loc(?:\s[^>]*)?>([\s\S]*?)<\/loc>/gi);
  return [...matches].map((match) => decodeXmlText(match[1])).filter(Boolean);
}

/**
 * @param {string} xml
 * @returns {{ kind: "index" | "urlset", locs: string[] }}
 */
export function parseSitemapDocument(xml) {
  const locs = extractLocElements(xml);
  if (/<sitemapindex[\s>]/i.test(xml)) {
    return { kind: "index", locs };
  }
  return { kind: "urlset", locs };
}

/**
 * @param {string} value
 * @param {string} host
 * @returns {{ ok: true, url: string } | { ok: false, url: string, reason: string }}
 */
export function inspectIndexNowUrl(value, host = INDEXNOW_HOST) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    return { ok: false, url: value, reason: "invalid" };
  }

  if (parsed.protocol !== "https:") {
    return { ok: false, url: value, reason: "not-https" };
  }
  if (parsed.username || parsed.password) {
    return { ok: false, url: value, reason: "invalid" };
  }
  if (parsed.hostname.toLowerCase() !== host.toLowerCase()) {
    return { ok: false, url: value, reason: "cross-host" };
  }
  if (parsed.port && parsed.port !== "443") {
    return { ok: false, url: value, reason: "invalid" };
  }
  if (parsed.search) {
    return { ok: false, url: value, reason: "query" };
  }
  if (parsed.hash) {
    return { ok: false, url: value, reason: "hash" };
  }

  return { ok: true, url: parsed.toString() };
}

/**
 * @param {string[]} urls
 * @param {string} [host]
 */
export function filterCanonicalUrls(urls, host = INDEXNOW_HOST) {
  /** @type {string[]} */
  const accepted = [];
  /** @type {Array<{ url: string, reason: string }>} */
  const rejected = [];
  const seen = new Set();

  for (const value of urls) {
    const inspected = inspectIndexNowUrl(value, host);
    if (!inspected.ok) {
      rejected.push({ url: inspected.url, reason: inspected.reason });
      continue;
    }
    if (seen.has(inspected.url)) {
      continue;
    }
    seen.add(inspected.url);
    accepted.push(inspected.url);
  }

  return { accepted, rejected };
}

/**
 * @template T
 * @param {T[]} items
 * @param {number} size
 */
export function chunk(items, size = INDEXNOW_MAX_URLS_PER_REQUEST) {
  if (size <= 0) {
    throw new IndexNowError("Batch size must be greater than 0");
  }
  if (size > INDEXNOW_MAX_URLS_PER_REQUEST) {
    throw new IndexNowError(`Batch size cannot exceed ${INDEXNOW_MAX_URLS_PER_REQUEST}`);
  }
  /** @type {T[][]} */
  const batches = [];
  for (let index = 0; index < items.length; index += size) {
    batches.push(items.slice(index, index + size));
  }
  return batches;
}

/**
 * @param {number} status
 */
export function classifyIndexNowStatus(status) {
  if (status === 200) {
    return { ok: true, state: "submitted" };
  }
  if (status === 202) {
    return { ok: true, state: "key_validation_pending" };
  }
  if (status === 429) {
    return { ok: false, state: "rate_limited" };
  }
  if (status === 400) {
    return { ok: false, state: "bad_request" };
  }
  if (status === 403) {
    return { ok: false, state: "forbidden_key" };
  }
  if (status === 422) {
    return { ok: false, state: "unprocessable" };
  }
  return { ok: false, state: "unexpected_status" };
}

/**
 * @param {{
 *   host?: string,
 *   key?: string,
 *   keyLocation?: string,
 *   urlList: string[],
 * }} input
 */
export function buildIndexNowPayload(input) {
  return {
    host: input.host ?? INDEXNOW_HOST,
    key: input.key ?? INDEXNOW_KEY,
    keyLocation: input.keyLocation ?? INDEXNOW_KEY_LOCATION,
    urlList: input.urlList,
  };
}

/**
 * @param {{
 *   fetchImpl?: typeof fetch,
 *   url: string,
 *   method?: string,
 *   headers?: Record<string, string>,
 *   body?: string,
 *   timeoutMs?: number,
 * }} input
 */
export async function fetchWithTimeout(input) {
  const fetchImpl = input.fetchImpl ?? globalThis.fetch;
  const timeoutMs = input.timeoutMs ?? INDEXNOW_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(input.url, {
      method: input.method ?? "GET",
      headers: input.headers,
      body: input.body,
      signal: controller.signal,
    });
    const text = await response.text();
    return { status: response.status, text };
  } catch (error) {
    const err = /** @type {{ name?: string, message?: string }} */ (error);
    if (err?.name === "AbortError") {
      throw new IndexNowError(`Request timed out after ${timeoutMs}ms: ${input.url}`, { cause: error });
    }
    throw new IndexNowError(`Request failed: ${input.url}: ${err?.message ?? error}`, { cause: error });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * @param {{
 *   fetchImpl?: typeof fetch,
 *   key?: string,
 *   keyLocation?: string,
 *   timeoutMs?: number,
 * }} [input]
 */
export async function verifyDeployedKey(input = {}) {
  const key = input.key ?? INDEXNOW_KEY;
  const keyLocation = input.keyLocation ?? INDEXNOW_KEY_LOCATION;
  const response = await fetchWithTimeout({
    fetchImpl: input.fetchImpl,
    url: keyLocation,
    timeoutMs: input.timeoutMs,
  });

  if (response.status !== 200) {
    throw new IndexNowError(`IndexNow key file returned HTTP ${response.status}: ${keyLocation}`);
  }

  const deployed = response.text.replace(/^\uFEFF/, "").trim();
  if (deployed !== key) {
    throw new IndexNowError(`IndexNow key file content does not match the expected key: ${keyLocation}`);
  }

  return { keyLocation, key };
}

/**
 * @param {string} sitemap
 * @param {string} [cwd]
 */
export function resolveSitemapSource(sitemap, cwd = process.cwd()) {
  if (/^https?:\/\//i.test(sitemap)) {
    return { kind: /** @type {const} */ ("url"), value: sitemap };
  }
  const filePath = isAbsolute(sitemap) ? sitemap : resolve(cwd, sitemap);
  return { kind: /** @type {const} */ ("file"), value: filePath };
}

/**
 * @param {{
 *   sitemap?: string,
 *   fetchImpl?: typeof fetch,
 *   readFile?: (path: string, encoding: BufferEncoding) => string,
 *   timeoutMs?: number,
 *   cwd?: string,
 * }} [input]
 */
export async function loadSitemapXml(input = {}) {
  const sitemap = input.sitemap ?? INDEXNOW_SITEMAP_URL;
  const source = resolveSitemapSource(sitemap, input.cwd);
  if (source.kind === "file") {
    try {
      const readFile = input.readFile ?? readFileSync;
      return { source, xml: readFile(source.value, "utf8") };
    } catch (error) {
      const err = /** @type {{ message?: string }} */ (error);
      throw new IndexNowError(`Unable to read sitemap file: ${source.value}: ${err?.message ?? error}`, {
        cause: error,
      });
    }
  }

  const response = await fetchWithTimeout({
    fetchImpl: input.fetchImpl,
    url: source.value,
    timeoutMs: input.timeoutMs,
  });
  if (response.status !== 200) {
    throw new IndexNowError(`Sitemap returned HTTP ${response.status}: ${source.value}`);
  }
  return { source, xml: response.text };
}

/**
 * @param {{
 *   xml: string,
 *   host?: string,
 *   fetchImpl?: typeof fetch,
 *   timeoutMs?: number,
 * }} input
 */
export async function collectCanonicalPageUrls(input) {
  const host = input.host ?? INDEXNOW_HOST;
  const document = parseSitemapDocument(input.xml);

  if (document.kind === "urlset") {
    return filterCanonicalUrls(document.locs, host);
  }

  /** @type {string[]} */
  const pageLocs = [];
  for (const child of document.locs) {
    const inspected = inspectIndexNowUrl(child, host);
    if (!inspected.ok) {
      throw new IndexNowError(`Sitemap index loc rejected (${inspected.reason}): ${child}`);
    }
    const childResponse = await fetchWithTimeout({
      fetchImpl: input.fetchImpl,
      url: inspected.url,
      timeoutMs: input.timeoutMs,
    });
    if (childResponse.status !== 200) {
      throw new IndexNowError(`Child sitemap returned HTTP ${childResponse.status}: ${inspected.url}`);
    }
    const childDocument = parseSitemapDocument(childResponse.text);
    if (childDocument.kind === "index") {
      throw new IndexNowError(`Nested sitemap index is not supported: ${inspected.url}`);
    }
    pageLocs.push(...childDocument.locs);
  }

  return filterCanonicalUrls(pageLocs, host);
}

/**
 * @param {{
 *   fetchImpl?: typeof fetch,
 *   endpoint?: string,
 *   payload: { host: string, key: string, keyLocation: string, urlList: string[] },
 *   timeoutMs?: number,
 *   dryRun?: boolean,
 * }} input
 */
export async function submitIndexNowBatch(input) {
  const endpoint = input.endpoint ?? INDEXNOW_ENDPOINT;
  if (input.dryRun) {
    return { endpoint, posted: false, status: null, body: "", state: "dry_run" };
  }

  const response = await fetchWithTimeout({
    fetchImpl: input.fetchImpl,
    url: endpoint,
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(input.payload),
    timeoutMs: input.timeoutMs,
  });
  const classified = classifyIndexNowStatus(response.status);
  if (!classified.ok) {
    throw new IndexNowError(
      `IndexNow ${classified.state} (HTTP ${response.status}) from ${endpoint}: ${response.text.slice(0, 300)}`,
    );
  }

  return {
    endpoint,
    posted: true,
    status: response.status,
    body: response.text,
    state: classified.state,
  };
}

/**
 * @param {{
 *   argv?: string[],
 *   fetchImpl?: typeof fetch,
 *   readFile?: (path: string, encoding: BufferEncoding) => string,
 *   cwd?: string,
 *   timeoutMs?: number,
 *   log?: (message: string) => void,
 * }} [input]
 */
export async function runSubmitIndexNow(input = {}) {
  const args = parseArgs(input.argv ?? []);
  const sitemap = args.sitemap ?? INDEXNOW_SITEMAP_URL;
  const loaded = await loadSitemapXml({
    sitemap,
    fetchImpl: input.fetchImpl,
    readFile: input.readFile,
    timeoutMs: input.timeoutMs,
    cwd: input.cwd,
  });
  const urls = await collectCanonicalPageUrls({
    xml: loaded.xml,
    fetchImpl: input.fetchImpl,
    timeoutMs: input.timeoutMs,
  });

  if (urls.accepted.length === 0) {
    throw new IndexNowError("No canonical production URLs remained after sitemap filtering");
  }

  await verifyDeployedKey({
    fetchImpl: input.fetchImpl,
    timeoutMs: input.timeoutMs,
  });

  const batches = chunk(urls.accepted, INDEXNOW_MAX_URLS_PER_REQUEST);
  /** @type {Array<{ endpoint: string, posted: boolean, status: number | null, body: string, state: string, count: number }>} */
  const responses = [];

  for (const urlList of batches) {
    const payload = buildIndexNowPayload({ urlList });
    const response = await submitIndexNowBatch({
      fetchImpl: input.fetchImpl,
      payload,
      timeoutMs: input.timeoutMs,
      dryRun: args.dryRun,
    });
    responses.push({ ...response, count: urlList.length });
  }

  const result = {
    ok: true,
    dryRun: args.dryRun,
    sitemap: loaded.source,
    endpoint: INDEXNOW_ENDPOINT,
    keyLocation: INDEXNOW_KEY_LOCATION,
    accepted: urls.accepted,
    rejected: urls.rejected,
    batches: batches.map((urlList) => urlList.length),
    responses,
    posted: responses.some((response) => response.posted),
  };

  input.log?.(formatIndexNowSummary(result));
  return result;
}

/**
 * @param {{
 *   dryRun: boolean,
 *   sitemap: { kind: string, value: string },
 *   endpoint: string,
 *   keyLocation: string,
 *   accepted: string[],
 *   rejected: Array<{ url: string, reason: string }>,
 *   batches: number[],
 *   responses: Array<{ posted: boolean, status: number | null, state: string, count: number }>,
 *   posted: boolean,
 * }} result
 */
export function formatIndexNowSummary(result) {
  const lines = [
    result.dryRun ? "IndexNow dry-run" : "IndexNow submit",
    `sitemap: ${result.sitemap.kind} ${result.sitemap.value}`,
    `key: verified ${result.keyLocation}`,
    `accepted: ${result.accepted.length}`,
    `rejected: ${result.rejected.length}`,
    `endpoint: ${result.endpoint}`,
    `posted: ${result.posted ? "yes" : "no"}`,
    `batches: ${result.batches.join(", ")}`,
  ];

  if (result.rejected.length > 0) {
    const preview = result.rejected.slice(0, 20).map((item) => `  ${item.reason} ${item.url}`);
    lines.push("rejected urls:", ...preview);
    if (result.rejected.length > 20) {
      lines.push(`  ... ${result.rejected.length - 20} more`);
    }
  }

  for (const [index, response] of result.responses.entries()) {
    lines.push(
      `batch ${index + 1}: ${response.count} urls, ${response.state}${response.status ? ` HTTP ${response.status}` : ""}`,
    );
  }

  return lines.join("\n");
}
