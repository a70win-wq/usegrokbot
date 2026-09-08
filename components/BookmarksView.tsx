"use client";

import { useState, type KeyboardEvent } from "react";
import { ExternalLink, Play, Star } from "lucide-react";
import { YouTubeVideoDialog } from "@/components/YouTubeVideoDialog";
import { youtubeVideoId } from "@/lib/youtube";
import { ArticleRow } from "@/components/ArticleRow";
import { PinnedArticleBlock } from "@/components/PinnedArticleBlock";
import { splitChineseTeachingArticles } from "@/lib/articles";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import {
  bookmarkSources,
  bookmarkUiCopy,
  type BookmarkSource,
  type LocalizedBookmarkItem,
} from "@/data/bookmarks";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";
import type { RankedStory } from "@/lib/x-metrics";
import type { YouTubeViewMap } from "@/lib/youtube-views";
import type { GithubResourceStarMap } from "@/lib/github-resource-stars";

export function BookmarksView({
  github,
  githubStars,
  youtube,
  youtubeViews,
  chineseArticles,
  englishArticles,
  japaneseArticles,
}: {
  github: LocalizedBookmarkItem[];
  githubStars: GithubResourceStarMap;
  youtube: LocalizedBookmarkItem[];
  youtubeViews: YouTubeViewMap;
  chineseArticles: RankedStory[];
  englishArticles: RankedStory[];
  japaneseArticles: RankedStory[];
}) {
  const { locale } = useI18n();
  const copy = bookmarkUiCopy[locale];
  const [source, setSource] = useState<BookmarkSource>("github");
  function countForSource(item: BookmarkSource) {
    return item === "github"
      ? github.length
      : item === "youtube"
        ? youtube.length
        : chineseArticles.length +
          englishArticles.length +
          japaneseArticles.length;
  }

  function selectSource(next: BookmarkSource) {
    setSource(next);
  }

  function moveWithKeyboard(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (![
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ].includes(event.key)) {
      return;
    }
    event.preventDefault();
    const last = bookmarkSources.length - 1;
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? last
          : event.key === "ArrowRight"
            ? (index + 1) % bookmarkSources.length
            : (index - 1 + bookmarkSources.length) % bookmarkSources.length;
    const next = bookmarkSources[nextIndex];
    selectSource(next);
    document.getElementById(`bookmark-tab-${next}`)?.focus();
  }

  return (
    <div
      className="mx-auto max-w-[1240px] px-5 py-6 md:px-8 md:py-8"
      data-bookmarks-page
      data-bookmark-source={source}
    >
      <header className="mb-5">
        <h1 className="ui-page-title text-[30px] md:text-[36px]">{copy.title}</h1>
      </header>

      <nav aria-label={copy.navLabel}>
        <div className="grid grid-cols-3 border-b border-line" role="tablist">
          {bookmarkSources.map((item, index) => {
            const active = source === item;
            return (
              <button
                key={item}
                id={`bookmark-tab-${item}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`bookmark-panel-${item}`}
                tabIndex={active ? 0 : -1}
                onClick={() => selectSource(item)}
                onKeyDown={(event) => moveWithKeyboard(event, index)}
                className={cn(
                  "relative flex min-h-12 min-w-0 items-center justify-center rounded-t-xl px-2 py-3 text-center text-[15px] leading-5 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent sm:px-4 sm:text-base",
                  active ? "bg-accent-soft font-medium text-accent" : "text-mute hover:bg-elevated hover:text-ink",
                )}
              >
                <span className="min-w-0 text-balance">{copy.sourceCards[item].title}</span>
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 -bottom-px h-0.5 origin-center rounded-full bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </button>
            );
          })}
        </div>
      </nav>

      {bookmarkSources.map((panelSource) => {
        const active = source === panelSource;
        const panelCopy = copy.sourceCards[panelSource];
        const panelCount = countForSource(panelSource);
        return (
          <section
            key={panelSource}
            id={`bookmark-panel-${panelSource}`}
            role="tabpanel"
            aria-labelledby={`bookmark-tab-${panelSource}`}
            hidden={!active}
            className={cn("py-4", panelSource === "x" && "mx-auto w-full max-w-[936px]")}
          >
            {active ? (
              <>
                <h2 className="sr-only">{panelCopy.title}</h2>
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="ui-body text-mute">{panelCopy.body}</p>
                  {panelSource !== "x" ? (
                    <p className="ui-count font-medium text-mute" aria-live="polite">
                      {copy.count.replace("{n}", String(panelCount))}
                    </p>
                  ) : null}
                </div>

                {panelSource === "github" ? (
                  <BookmarkGrid items={github} source="github" stars={githubStars} />
                ) : panelSource === "youtube" ? (
                  <BookmarkGrid items={youtube} source="youtube" views={youtubeViews} />
                ) : (
                  <XArticleLists
                    locale={locale}
                    japanese={japaneseArticles}
                    chinese={chineseArticles}
                    english={englishArticles}
                  />
                )}
              </>
            ) : null}
          </section>
        );
      })}

    </div>
  );
}

function BookmarkGrid({
  items,
  source,
  stars,
  views,
}: {
  items: LocalizedBookmarkItem[];
  source: "github" | "youtube";
  stars?: GithubResourceStarMap;
  views?: YouTubeViewMap;
}) {
  const { locale } = useI18n();
  const copy = bookmarkUiCopy[locale];
  const action = source === "github" ? copy.openGithub : copy.openYoutube;
  const [playing, setPlaying] = useState<{ video: LocalizedBookmarkItem; videoId: string; trigger: HTMLButtonElement } | null>(null);

  return (
    <>
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const videoId = source === "youtube" ? youtubeVideoId(item.url) : null;
        const viewStats = videoId ? views?.[videoId] : null;
        return (
        <li key={item.id}>
          <article data-resource-id={item.id} className="spring-lift flex h-full min-w-0 flex-col rounded-2xl border border-line bg-card p-4 hover:border-line-strong sm:p-5">
            <h3 className="ui-card-title text-ink">
              {item.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
              {source === "github" ? (
                <span
                  data-github-stars={stars?.[item.url]?.count ?? "unavailable"}
                  title={stars?.[item.url] ? copy.starsCheckedAt.replace("{date}", new Date(stars[item.url]!.checkedAt).toISOString().slice(0, 10)) : undefined}
                  className="inline-flex items-center gap-1.5 text-base font-medium text-ink tabular-nums"
                >
                  <Star aria-hidden className="size-4 text-accent" strokeWidth={1.75} />
                  {stars?.[item.url] ? (
                    <>
                      {`${new Intl.NumberFormat(locale).format(stars[item.url]!.count)} `}
                      <span className="ui-meta font-normal text-mute">{copy.starsLabel}</span>
                    </>
                  ) : <span className="ui-meta text-mute">{copy.starsUnavailable}</span>}
                </span>
              ) : (
                <span
                  data-youtube-views={viewStats?.count ?? "unavailable"}
                  title={viewStats ? copy.youtubeCheckedAt.replace("{date}", new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(viewStats.checkedAt))) : undefined}
                  className="inline-flex flex-wrap items-baseline gap-x-1.5 text-base font-medium text-ink tabular-nums"
                >
                  {viewStats ? <>
                    {new Intl.NumberFormat(locale).format(viewStats.count)}
                    <span className="ui-meta font-normal text-mute">{copy.youtubeViewsLabel}</span>
                  </> : <span className="ui-meta text-mute">{copy.youtubeViewsUnavailable}</span>}
                </span>
              )}
              <span className="ui-meta text-mute">
                {copy.language[item.language]}
              </span>
            </div>
            <p className="ui-body mt-2 leading-relaxed text-mute">{item.description}</p>

            <div className="mt-3">
              {item.xAuthor ? (
                <a
                  href={`https://x.com/${item.xAuthor.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.xAuthor.name}, @${item.xAuthor.handle}, X`}
                  className="group flex min-h-11 max-w-full items-center gap-2 rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <AuthorAvatar
                    name={item.xAuthor.name}
                    handle={item.xAuthor.handle}
                    size={40}
                  />
                  <span className="min-w-0">
                    <span className="block text-[15px] font-medium wrap-break-word text-ink transition-colors group-hover:text-accent">
                      {item.xAuthor.name}
                    </span>
                    <span className="ui-meta mt-0.5 block text-mute transition-colors group-hover:text-accent">
                      @{item.xAuthor.handle}
                      <span className="sr-only"> X</span>
                    </span>
                  </span>
                </a>
              ) : (
                <p className="ui-meta min-w-0 wrap-break-word text-mute">
                  {copy.by} {item.author}
                </p>
              )}
            </div>

            <div className="mt-auto pt-3">
              {videoId ? (
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-label={`${copy.playYoutube}: ${item.title}`}
                  onClick={(event) => setPlaying({ video: item, videoId, trigger: event.currentTarget })}
                  className="ui-button-secondary w-full"
                >
                  <Play aria-hidden className="size-4" strokeWidth={1.75} />
                  <span>{copy.playYoutube}</span>
                </button>
              ) : (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="ui-button-secondary w-full"
              >
                <span>{action}</span>
                <ExternalLink aria-hidden className="size-4" strokeWidth={1.75} />
              </a>
              )}
            </div>
          </article>
        </li>
        );
      })}
    </ul>
    {playing ? <YouTubeVideoDialog video={playing.video} videoId={playing.videoId} returnFocusTo={playing.trigger} onClose={() => setPlaying(null)} /> : null}
    </>
  );
}

function XArticleLists({
  locale,
  japanese,
  chinese,
  english,
}: {
  locale: Locale;
  japanese: RankedStory[];
  chinese: RankedStory[];
  english: RankedStory[];
}) {
  const copy = bookmarkUiCopy[locale];
  const japaneseSection = { key: "japanese", title: copy.xJapaneseTitle, items: japanese };
  const englishSection = { key: "english", title: copy.xEnglishTitle, items: english };
  const chineseSection = { key: "chinese", title: copy.xChineseTitle, items: chinese };
  const sections =
    locale === "ja"
      ? [japaneseSection, chineseSection, englishSection]
      : locale === "en"
        ? [englishSection, chineseSection, japaneseSection]
        : [chineseSection, englishSection, japaneseSection];

  return (
    <div className="w-full">
      {sections.map((section, sectionIndex) => {
        const chinese =
          section.key === "chinese" ? splitChineseTeachingArticles(section.items) : null;
        const rankedItems = chinese?.ranked ?? section.items;
        const pinnedItem = chinese?.pinned;

        return (
          <section data-article-language={section.key} className={sectionIndex === 0 ? "" : "mt-8"} key={section.key}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-[22px] leading-snug font-medium text-ink md:text-2xl">
                {section.title}
              </h3>
              <p className="ui-count font-medium text-mute">
                {copy.count.replace("{n}", String(section.items.length))}
              </p>
            </div>
            {pinnedItem ? (
              <PinnedArticleBlock
                item={pinnedItem}
                locale={locale}
                viewsLabel={copy.viewsLabel}
                label={copy.pinnedLabel}
                presentation="homepage"
                headingId="bookmarks-chinese-pinned"
              />
            ) : null}
            <ol className="mt-3 divide-y divide-line border-y border-line">
              {rankedItems.map((item, index) => (
                <ArticleRow
                  key={`${section.key}-${item.story.slug}`}
                  item={item}
                  locale={locale}
                  viewsLabel={copy.viewsLabel}
                  rank={index + 1}
                  presentation="homepage"
                />
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
