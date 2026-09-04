"use client";

import { useState, type KeyboardEvent } from "react";
import { ExternalLink, FolderGit2, Play } from "lucide-react";
import { ArticleRow } from "@/components/ArticleRow";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import {
  bookmarkSources,
  bookmarkUiCopy,
  type BookmarkSource,
  type LocalizedBookmarkItem,
} from "@/data/bookmarks";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import type { RankedStory } from "@/lib/x-metrics";

export function BookmarksView({
  github,
  youtube,
  chineseArticles,
  englishArticles,
}: {
  github: LocalizedBookmarkItem[];
  youtube: LocalizedBookmarkItem[];
  chineseArticles: RankedStory[];
  englishArticles: RankedStory[];
}) {
  const { locale } = useI18n();
  const copy = bookmarkUiCopy[locale];
  const [source, setSource] = useState<BookmarkSource>("github");
  function countForSource(item: BookmarkSource) {
    return item === "github"
      ? github.length
      : item === "youtube"
        ? youtube.length
        : chineseArticles.length + englishArticles.length;
  }
  const visibleCount = countForSource(source);

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
      className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16"
      data-bookmarks-page
      data-bookmark-source={source}
    >
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
                  "relative flex min-h-[72px] min-w-0 items-center justify-center px-2 py-3 text-center text-base leading-5 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent sm:min-h-20 sm:px-4 sm:text-lg",
                  active ? "font-medium text-ink" : "text-mute hover:bg-elevated hover:text-ink",
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

      <header className="border-b border-line pb-8 pt-10 md:pt-12">
        <p className="font-mono text-xs text-faint">
          {copy.count.replace("{n}", String(visibleCount))}
        </p>
        <h1 className="mt-3 text-[clamp(32px,5vw,48px)] font-medium tracking-[-0.035em] text-ink">
          {copy.title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-mute">{copy.intro}</p>
      </header>

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
            className="py-10 md:py-12"
          >
            {active ? (
              <>
                <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-medium tracking-tight text-ink">
                      {panelCopy.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-[15px] leading-6 text-mute">
                      {panelCopy.body}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-faint" aria-live="polite">
                    {copy.count.replace("{n}", String(panelCount))}
                  </p>
                </div>

                {panelSource === "github" ? (
                  <BookmarkGrid items={github} source="github" />
                ) : panelSource === "youtube" ? (
                  <BookmarkGrid items={youtube} source="youtube" />
                ) : (
                  <XArticleLists
                    locale={locale}
                    chinese={chineseArticles}
                    english={englishArticles}
                  />
                )}
              </>
            ) : null}
          </section>
        );
      })}

      <p className="border-t border-line pt-6 text-sm leading-6 text-mute">{copy.note}</p>
    </div>
  );
}

function BookmarkGrid({
  items,
  source,
}: {
  items: LocalizedBookmarkItem[];
  source: "github" | "youtube";
}) {
  const { locale } = useI18n();
  const copy = bookmarkUiCopy[locale];
  const Icon = source === "github" ? FolderGit2 : Play;
  const action = source === "github" ? copy.openGithub : copy.openYoutube;

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
      {items.map((item) => (
        <li key={item.id}>
          <article className="spring-lift flex h-full min-w-0 flex-col rounded-2xl border border-line bg-card p-5 hover:border-line-strong">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
                <Icon aria-hidden className="size-5" strokeWidth={1.75} />
              </span>
              <span className="rounded-full border border-line px-2.5 py-1 text-[12px] text-mute">
                {copy.language[item.language]}
              </span>
            </div>

            <h3 className="mt-5 text-[18px] font-medium leading-6 tracking-tight wrap-break-word text-ink">
              {item.title}
            </h3>
            <p className="mt-2 text-[14px] leading-6 text-mute">{item.description}</p>

            <div className="mt-5">
              <span className="inline-flex rounded-full bg-elevated px-2.5 py-1 text-[12px] text-mute">
                {item.focus}
              </span>
              {item.xAuthor ? (
                <a
                  href={`https://x.com/${item.xAuthor.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.xAuthor.name}, @${item.xAuthor.handle}, X`}
                  className="group mt-4 flex min-h-11 max-w-full items-center gap-3 rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <AuthorAvatar
                    name={item.xAuthor.name}
                    handle={item.xAuthor.handle}
                    size={40}
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-medium text-ink transition-colors group-hover:text-accent">
                      {item.xAuthor.name}
                    </span>
                    <span className="block truncate text-[12px] text-faint transition-colors group-hover:text-accent">
                      @{item.xAuthor.handle}
                      <span className="sr-only"> X</span>
                    </span>
                  </span>
                </a>
              ) : (
                <p className="mt-4 flex min-h-11 min-w-0 items-center truncate text-[12px] text-faint">
                  {copy.by} {item.author}
                </p>
              )}
            </div>

            <div className="mt-auto pt-6">
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="spring-press inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] border border-line px-4 text-[15px] font-medium text-ink transition-colors hover:border-line-strong hover:bg-accent-soft hover:text-accent"
              >
                <span>{action}</span>
                <ExternalLink aria-hidden className="size-4" strokeWidth={1.75} />
              </a>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

function XArticleLists({
  locale,
  chinese,
  english,
}: {
  locale: "en" | "zh-Hant" | "zh-Hans";
  chinese: RankedStory[];
  english: RankedStory[];
}) {
  const copy = bookmarkUiCopy[locale];
  const sections =
    locale === "en"
      ? [
          { key: "english", title: copy.xEnglishTitle, items: english },
          { key: "chinese", title: copy.xChineseTitle, items: chinese },
        ]
      : [
          { key: "chinese", title: copy.xChineseTitle, items: chinese },
          { key: "english", title: copy.xEnglishTitle, items: english },
        ];

  return (
    <div className="max-w-[860px]">
      {sections.map((section, sectionIndex) => (
        <section className={sectionIndex === 0 ? "" : "mt-14"} key={section.key}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-xl font-medium tracking-tight text-ink md:text-2xl">
              {section.title}
            </h3>
            <p className="font-mono text-xs text-faint">
              {copy.count.replace("{n}", String(section.items.length))}
            </p>
          </div>
          <ol className="mt-5 divide-y divide-line border-y border-line">
            {section.items.map((item, index) => (
              <ArticleRow
                key={`${section.key}-${item.story.slug}`}
                item={item}
                locale={locale}
                viewsLabel={copy.viewsLabel}
                rank={index + 1}
              />
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
