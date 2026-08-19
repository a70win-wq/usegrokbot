import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const README_URL =
  process.env.AWESOME_GROK_BOT_README_URL ||
  "https://raw.githubusercontent.com/RongleCat/awesome-grok-bot/main/README.md";
const DISCOVER_PATH = "data/discover.ts";
const OUTPUT_PATH = "data/source-feeds/awesome-grok-bot-field-cases.json";

function normalizeUrl(value) {
  try {
    const url = new URL(value.trim());
    url.hash = "";
    url.search = "";
    const normalized = url.toString().replace(/\/$/, "");
    return normalized.replace("https://twitter.com/", "https://x.com/");
  } catch {
    return value.trim().replace(/\/$/, "");
  }
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function sourceType(url) {
  const host = new URL(url).hostname.replace(/^www\./, "");
  if (host === "x.com" || host === "twitter.com") return "x";
  if (host === "youtube.com" || host === "youtu.be") return "youtube";
  if (host.endsWith("substack.com")) return "newsletter";
  if (host === "note.com") return "note";
  return "article";
}

function extractFieldCases(markdown) {
  const startMarker = "## Field Cases";
  const start = markdown.indexOf(startMarker);
  if (start < 0) {
    throw new Error("Could not find ## Field Cases in awesome-grok-bot README");
  }

  const afterStart = markdown.slice(start + startMarker.length);
  const nextHeading = afterStart.search(/\n##\s+/);
  const section = nextHeading >= 0 ? afterStart.slice(0, nextHeading) : afterStart;

  const entries = [];
  const linePattern = /^- \[([^\]]+)\]\((https?:\/\/[^)]+)\)\s+-\s+(.+)$/gm;
  let match;
  while ((match = linePattern.exec(section)) !== null) {
    const [, title, url, summary] = match;
    entries.push({ title: title.trim(), url: normalizeUrl(url), summary: summary.trim() });
  }

  if (entries.length === 0) {
    throw new Error("Field Cases section was found, but no entries could be parsed");
  }

  return entries;
}

async function main() {
  const response = await fetch(README_URL, {
    headers: { "User-Agent": "UseGrokBot-source-sync" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch awesome-grok-bot README: ${response.status}`);
  }

  const markdown = await response.text();
  const fieldCases = extractFieldCases(markdown);
  const discoverSource = await readFile(DISCOVER_PATH, "utf8");

  const existingUrls = new Set(
    [...discoverSource.matchAll(/https?:\/\/[^\s\"'`)]+/g)].map((match) => normalizeUrl(match[0])),
  );

  const cases = fieldCases.map((item) => {
    const alreadyInDiscover = existingUrls.has(item.url);
    return {
      id: slugify(item.title),
      title: item.title,
      url: item.url,
      sourceSummary: item.summary,
      sourceType: sourceType(item.url),
      sourceIndex: "RongleCat/awesome-grok-bot#field-cases",
      status: alreadyInDiscover ? "already-ingested" : "candidate",
    };
  });

  const payload = {
    schemaVersion: 1,
    source: {
      name: "awesome-grok-bot Field Cases",
      repository: "https://github.com/RongleCat/awesome-grok-bot",
      rawReadme: README_URL,
      section: "Field Cases",
      sourceListLicense: "CC0-1.0",
      note: "The list metadata is CC0. Linked X posts, articles, videos and other source content retain their own rights. UseGrokBot should summarize the original source and link back rather than copy it wholesale.",
    },
    stats: {
      total: cases.length,
      candidates: cases.filter((item) => item.status === "candidate").length,
      alreadyIngested: cases.filter((item) => item.status === "already-ingested").length,
    },
    cases,
  };

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  const next = `${JSON.stringify(payload, null, 2)}\n`;

  let previous = "";
  try {
    previous = await readFile(OUTPUT_PATH, "utf8");
  } catch {
    // First sync.
  }

  if (previous === next) {
    console.log(
      `No source-feed changes. ${payload.stats.total} Field Cases, ${payload.stats.candidates} candidates.`,
    );
    return;
  }

  await writeFile(OUTPUT_PATH, next, "utf8");
  console.log(
    `Updated ${OUTPUT_PATH}: ${payload.stats.total} Field Cases, ${payload.stats.candidates} candidates, ${payload.stats.alreadyIngested} already ingested.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
