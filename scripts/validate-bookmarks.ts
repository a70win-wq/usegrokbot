import {
  bookmarkSources,
  bookmarksForLocale,
  githubBookmarks,
  youtubeBookmarks,
  type BookmarkItem,
} from "../data/bookmarks";
import sitemap from "../app/sitemap";
import { URL_LOCALES, absoluteUrl } from "../lib/i18n/paths";
import type { Locale } from "../lib/i18n/types";

const errors: string[] = [];
const items = [...githubBookmarks, ...youtubeBookmarks];
const locales: Locale[] = ["en", "zh-Hant", "zh-Hans"];
const xHandlePattern = /^[A-Za-z0-9_]{1,15}$/;
const verifiedXAuthors = new Map([
  ["grok-bot-orange-book", "KinGao476942"],
  ["grokbot-for-gtm", "brandon_ai"],
  ["grok-ship", "kunchenguid"],
  ["grok-bot-second-brain", "makneidinger"],
  ["grok-bot-concepts", "nateherk"],
]);

function check(condition: unknown, message: string) {
  if (!condition) errors.push(message);
}

function expectedHostname(item: BookmarkItem) {
  return item.source === "github" ? "github.com" : "www.youtube.com";
}

check(bookmarkSources.join(",") === "github,x,youtube", "Bookmark tabs changed unexpectedly");
check(githubBookmarks.length >= 2, "GitHub must include both Chinese and English guides");
check(youtubeBookmarks.length >= 2, "YouTube must include both Chinese and English tutorials");
check(new Set(items.map((item) => item.id)).size === items.length, "Bookmark IDs must be unique");
check(new Set(items.map((item) => item.url)).size === items.length, "Bookmark URLs must be unique");

const sitemapUrls = new Set(sitemap().map((entry) => entry.url));
for (const urlLocale of URL_LOCALES) {
  check(
    sitemapUrls.has(absoluteUrl("/bookmarks", urlLocale)),
    `Sitemap is missing the ${urlLocale} bookmarks page`,
  );
}

for (const item of items) {
  const url = new URL(item.url);
  check(url.protocol === "https:", `${item.id} must use HTTPS`);
  check(url.hostname === expectedHostname(item), `${item.id} has the wrong source hostname`);
  check(Boolean(item.author.trim()), `${item.id} is missing an author`);
  if (item.xAuthor) {
    check(Boolean(item.xAuthor.name.trim()), `${item.id} is missing an X author name`);
    check(
      xHandlePattern.test(item.xAuthor.handle),
      `${item.id} has an invalid X author handle`,
    );
  }
  check(Boolean(item.focus.en.trim()), `${item.id} is missing a focus`);
  for (const locale of locales) {
    check(Boolean(item.title[locale].trim()), `${item.id} is missing a ${locale} title`);
    check(
      Boolean(item.description[locale].trim()),
      `${item.id} is missing a ${locale} description`,
    );
  }
  if (item.source === "github") {
    check(url.pathname.split("/").filter(Boolean).length === 2, `${item.id} is not a repository URL`);
  } else {
    check(Boolean(url.searchParams.get("v")), `${item.id} is not a YouTube video URL`);
  }
}

check(
  items.filter((item) => item.xAuthor).length === verifiedXAuthors.size,
  "Only verified bookmark authors may have an X profile",
);
for (const [id, handle] of verifiedXAuthors) {
  check(
    items.find((item) => item.id === id)?.xAuthor?.handle === handle,
    `${id} must link to its verified X account`,
  );
}

for (const sourceItems of [githubBookmarks, youtubeBookmarks]) {
  check(sourceItems.some((item) => item.language === "zh"), "Source is missing Chinese content");
  check(sourceItems.some((item) => item.language === "en"), "Source is missing English content");
  check(
    bookmarksForLocale(sourceItems, "en")[0]?.language === "en",
    "English pages must show English content first",
  );
  check(
    bookmarksForLocale(sourceItems, "zh-Hant")[0]?.language === "zh",
    "Chinese pages must show Chinese content first",
  );
}

if (errors.length) {
  console.error(`Bookmark validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Validated ${githubBookmarks.length} GitHub guides and ${youtubeBookmarks.length} YouTube tutorials in three locales.`,
);
