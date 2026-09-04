import {
  articleExternalUrl,
  looksLikeXArticleUrl,
  xArticleIdFromUrl,
  type DiscoverStory,
} from "../data/discover";
import {
  chineseTutorialArticleUrls,
  chineseTutorialArticles,
} from "../data/chinese-tutorial-articles";
import { storyContentLanguage, type ArticleContentLanguage } from "../lib/article-language";
import {
  articleLibraryStories,
  chineseTeachingArticlesByViews,
  latestArticleStories,
  topArticleStoriesByViews,
} from "../lib/articles";
import type { Locale } from "../lib/i18n/types";
import metricsFile from "../data/discover/x-metrics.json";
import { tweetIdFromUrl } from "../lib/ingest/x-url";
import {
  metricForStory,
  rankArticleStories,
  type RankedStory,
  type XMetricsFile,
} from "../lib/x-metrics";

type TutorialStory = DiscoverStory & { articleUrl?: string };

const LOCALES: Locale[] = ["zh-Hant", "zh-Hans", "en", "ja"];
const TOP_LIMIT = 5;
const LATEST_LIMIT = 10;
const errors: string[] = [];
const metrics = metricsFile as XMetricsFile;

function check(condition: unknown, message: string) {
  if (!condition) errors.push(message);
}

function isStatusUrl(url?: string) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    if (!/^(www\.)?(x\.com|twitter\.com)$/i.test(parsed.hostname)) return false;
    return /\/(?:status|statuses)\//i.test(parsed.pathname);
  } catch {
    return /(?:x\.com|twitter\.com)\/[^\s]+\/status(?:es)?\//i.test(url);
  }
}

function isArticleClickUrl(url?: string) {
  if (!url || isStatusUrl(url) || !looksLikeXArticleUrl(url)) return false;
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    const articleAt = parts.findIndex((part) => part.toLowerCase() === "article");
    return articleAt >= 0 && /^\d+$/.test(parts[articleAt + 1] ?? "");
  } catch {
    return false;
  }
}

function clickUrl(story: TutorialStory) {
  return articleExternalUrl(story) || story.articleUrl || story.sourceUrl || story.xPostUrl || "";
}

function viewsForStory(story: TutorialStory) {
  const fromProduct = metricForStory(story)?.views;
  if (typeof fromProduct === "number" && fromProduct > 0) return fromProduct;
  const ids = [
    tweetIdFromUrl(story.xPostUrl ?? ""),
    tweetIdFromUrl(story.sourceUrl ?? ""),
    xArticleIdFromUrl(story.articleUrl),
    xArticleIdFromUrl(story.sourceUrl),
    xArticleIdFromUrl(story.xPostUrl),
  ].filter((id): id is string => Boolean(id));
  for (const id of ids) {
    const views = metrics.posts[id]?.views;
    if (typeof views === "number") return views;
  }
  return 0;
}

function languagePriority(language: ArticleContentLanguage, locale: Locale) {
  const isChinese = language === "zh-Hant" || language === "zh-Hans";
  if (locale === "en") {
    if (language === "en") return 0;
    if (isChinese) return 1;
    if (language === "ja") return 2;
    return 3;
  }
  if (locale === "ja") {
    if (language === "ja") return 0;
    if (language === "en") return 1;
    if (isChinese) return 2;
    return 3;
  }
  if (isChinese) return 0;
  if (language === "en") return 1;
  if (language === "ja") return 2;
  return 3;
}

function isPreferredLanguage(story: DiscoverStory, locale: Locale) {
  const language = storyContentLanguage(story);
  if (locale === "en") return language === "en";
  if (locale === "ja") return language === "ja";
  return language === "zh-Hant" || language === "zh-Hans";
}

function slugList(items: RankedStory[]) {
  return items.map((item) => item.story.slug);
}

function uniqueStories(stories: DiscoverStory[]) {
  const seen = new Set<string>();
  const unique: DiscoverStory[] = [];
  for (const story of stories) {
    if (seen.has(story.slug)) continue;
    seen.add(story.slug);
    unique.push(story);
  }
  return unique;
}

function rankingPool() {
  return uniqueStories(articleLibraryStories());
}

function expectedRanked(locale: Locale, by: "views" | "date", limit: number) {
  return rankArticleStories(rankingPool(), { locale, by }).slice(0, limit);
}

function assertViewsOrder(items: RankedStory[], label: string) {
  for (let index = 1; index < items.length; index += 1) {
    const previous = items[index - 1];
    const current = items[index];
    const ordered =
      previous.views > current.views ||
      (previous.views === current.views &&
        (previous.story.publishedAt > current.story.publishedAt ||
          (previous.story.publishedAt === current.story.publishedAt &&
            previous.story.slug <= current.story.slug)));
    check(
      ordered,
      label +
        " is not sorted by views descending: " +
        previous.story.slug +
        " (" +
        previous.views +
        ") before " +
        current.story.slug +
        " (" +
        current.views +
        ")",
    );
  }
}

function assertLocalePriorityAndGroupOrder(
  items: RankedStory[],
  locale: Locale,
  by: "views" | "date",
  label: string,
) {
  for (let index = 1; index < items.length; index += 1) {
    const previous = items[index - 1];
    const current = items[index];
    const previousPriority = languagePriority(storyContentLanguage(previous.story), locale);
    const currentPriority = languagePriority(storyContentLanguage(current.story), locale);
    check(
      previousPriority <= currentPriority,
      label +
        " for " +
        locale +
        " lost locale priority: " +
        previous.story.slug +
        " then " +
        current.story.slug,
    );
    if (previousPriority !== currentPriority) continue;
    if (by === "date") {
      check(
        previous.story.publishedAt >= current.story.publishedAt,
        label +
          " for " +
          locale +
          " broke in-group date order: " +
          previous.story.slug +
          " (" +
          previous.story.publishedAt +
          ") before " +
          current.story.slug +
          " (" +
          current.story.publishedAt +
          ")",
      );
    } else {
      check(
        previous.views >= current.views,
        label +
          " for " +
          locale +
          " broke in-group view order: " +
          previous.story.slug +
          " (" +
          previous.views +
          ") before " +
          current.story.slug +
          " (" +
          current.views +
          ")",
      );
    }
  }

  const preferredLabel = locale === "en" ? "English" : locale === "ja" ? "Japanese" : "Chinese";
  const firstOther = items.findIndex((item) => !isPreferredLanguage(item.story, locale));
  let lastPreferred = -1;
  for (let index = items.length - 1; index >= 0; index -= 1) {
    if (isPreferredLanguage(items[index].story, locale)) {
      lastPreferred = index;
      break;
    }
  }
  check(
    firstOther === -1 || lastPreferred === -1 || lastPreferred < firstOther,
    label + " for " + locale + " must put " + preferredLabel + " articles first",
  );
}

function main() {
  check(chineseTutorialArticles.length > 0, "Product data export chineseTutorialArticles is empty");
  check(chineseTutorialArticleUrls.length > 0, "Product data export chineseTutorialArticleUrls is empty");
  check(
    chineseTutorialArticleUrls.length === chineseTutorialArticles.length,
    "Chinese tutorial URL count (" +
      chineseTutorialArticleUrls.length +
      ") must match story count (" +
      chineseTutorialArticles.length +
      ")",
  );

  const seenUrls = new Set<string>();
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();
  const catalog = articleLibraryStories();

  for (const [index, story] of chineseTutorialArticles.entries()) {
    const href = clickUrl(story);
    const expectedUrl = chineseTutorialArticleUrls[index];
    const articleId = xArticleIdFromUrl(href);

    check(Boolean(story.slug), "A Chinese tutorial is missing a slug");
    check(!seenSlugs.has(story.slug), "Duplicate Chinese tutorial slug: " + story.slug);
    seenSlugs.add(story.slug);

    check(Boolean(href), "Missing click URL for " + story.slug);
    check(
      isArticleClickUrl(href),
      "Click URL for " + story.slug + " must be /i/article/ or /{handle}/article/, got " + href,
    );
    check(!isStatusUrl(href), "Click URL for " + story.slug + " is a status URL: " + href);
    check(
      expectedUrl === href || expectedUrl === story.articleUrl,
      "chineseTutorialArticleUrls[" +
        index +
        "] (" +
        expectedUrl +
        ") does not match " +
        story.slug +
        " click URL " +
        href,
    );
    check(!seenUrls.has(href), "Duplicate Chinese tutorial URL: " + href);
    seenUrls.add(href);

    check(Boolean(articleId), "Could not read article id from " + href);
    if (articleId) {
      check(!seenIds.has(articleId), "Duplicate Chinese tutorial article id: " + articleId);
      seenIds.add(articleId);
    }

    const catalogMatch = catalog.some((item) => {
      return (
        item.slug === story.slug ||
        xArticleIdFromUrl(clickUrl(item)) === articleId ||
        item.articleUrl === story.articleUrl
      );
    });
    check(
      catalogMatch,
      "Chinese tutorial is not in articleLibraryStories(): " +
        story.slug +
        " (" +
        href +
        "). articleLibraryStories() must include the data export without using a status permalink.",
    );
  }

  const expectedTutorialOrder = rankArticleStories(chineseTutorialArticles, {
    locale: "zh-Hans",
    by: "views",
  });
  const actualTutorialOrder = chineseTeachingArticlesByViews();
  if (actualTutorialOrder.length > 0) {
    check(
      slugList(actualTutorialOrder).join("\n") === slugList(expectedTutorialOrder).join("\n"),
      "Chinese tutorials are not sorted by views descending. Expected " +
        slugList(expectedTutorialOrder).join(", ") +
        " but received " +
        slugList(actualTutorialOrder).join(", "),
    );
  } else {
    assertViewsOrder(
      expectedTutorialOrder.map((item) => ({
        ...item,
        views: viewsForStory(item.story),
      })),
      "Chinese tutorials",
    );
    errors.push(
      "chineseTeachingArticlesByViews() is empty. The Articles library should include chineseTutorialArticleUrls.",
    );
  }
  assertViewsOrder(expectedTutorialOrder, "Chinese tutorials");

  for (const locale of LOCALES) {
    const actualTop = topArticleStoriesByViews(TOP_LIMIT, locale);
    const actualLatest = latestArticleStories(LATEST_LIMIT, locale);
    const goldTop = expectedRanked(locale, "views", TOP_LIMIT);
    const goldLatest = expectedRanked(locale, "date", LATEST_LIMIT);
    const preferredLabel = locale === "en" ? "English" : locale === "ja" ? "Japanese" : "Chinese";

    check(actualTop.length > 0, "Top articles API returned no rows for " + locale);
    check(actualLatest.length > 0, "Latest articles API returned no rows for " + locale);
    check(
      actualTop.length === Math.min(TOP_LIMIT, rankingPool().length),
      locale + " Top5 length is " + actualTop.length,
    );
    check(
      actualLatest.length === Math.min(LATEST_LIMIT, rankingPool().length),
      locale + " Latest length is " + actualLatest.length,
    );
    check(
      slugList(actualTop).join("\n") === slugList(goldTop).join("\n"),
      locale +
        " Top5 should be " +
        preferredLabel +
        "-first, then views. Expected [" +
        slugList(goldTop).join(", ") +
        "] but received [" +
        slugList(actualTop).join(", ") +
        "]",
    );
    check(
      slugList(actualLatest).join("\n") === slugList(goldLatest).join("\n"),
      locale +
        " Latest should be locale-priority then date. Expected [" +
        slugList(goldLatest).join(", ") +
        "] but received [" +
        slugList(actualLatest).join(", ") +
        "]",
    );
    assertLocalePriorityAndGroupOrder(actualTop, locale, "views", "Top5");
    assertLocalePriorityAndGroupOrder(actualLatest, locale, "date", "Latest");
  }

  if (errors.length > 0) {
    throw new Error("Article language validation failed:\n- " + errors.join("\n- "));
  }

  const tutorialViews = expectedTutorialOrder
    .map((item) => item.story.slug + ":" + item.views)
    .join(", ");
  console.log(
    "Validated " +
      chineseTutorialArticles.length +
      " Chinese tutorial article URLs, view-count order, and locale-aware Top" +
      TOP_LIMIT +
      "/Latest" +
      LATEST_LIMIT +
      " ranking.",
  );
  console.log("Chinese tutorials by views: " + tutorialViews);
}

main();
