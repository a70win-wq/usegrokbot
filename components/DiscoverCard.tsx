"use client";

import { AuthorAvatar } from "@/components/AuthorAvatar";
import { ExpandablePost } from "@/components/ExpandablePost";
import { LocaleLink } from "@/components/LocaleLink";
import { SketchUnderline } from "@/components/SketchUnderline";
import { isElonLiked, shouldIndexDiscoverStory, type DiscoverStory } from "@/data/discover";
import { topicsForStory } from "@/data/topics";
import { cn } from "@/lib/cn";
import { formatCardDate, sameCopy } from "@/lib/format";
import { localizeDiscoverStory, useI18n } from "@/lib/i18n";
import { openExternalUrl } from "@/lib/open-external";
import { topicResultsPath } from "@/lib/search";
import { formatViewCount, metricForStory } from "@/lib/x-metrics";

export function DiscoverCard({
  story,
  featured = false,
}: {
  story: DiscoverStory;
  featured?: boolean;
}) {
  const { locale, t } = useI18n();
  const item = localizeDiscoverStory(story, locale);
  const originalHref = story.xPostUrl ?? story.sourceUrl;
  const originalLabel = story.xPostUrl ? t("discover.viewOnX") : t("discover.viewOriginal");
  const hasInternalDetail = shouldIndexDiscoverStory(story);
  const labels = topicsForStory(story);
  const views = metricForStory(story)?.views;
  const heading = featured ? item.headline : item.title;
  const postText = item.body || item.whatTheyDid || item.headline;
  const showHeading = Boolean(heading) && !sameCopy(heading, postText);
  const outcome = item.result;
  const showOutcome = Boolean(outcome) && !sameCopy(outcome, heading) && !sameCopy(outcome, postText);
  const trustLabel = story.tested
    ? t("discover.tabTested")
    : story.source === "official"
      ? t("discover.tabOfficial")
      : null;

  return (
    <article
      data-story-slug={story.slug}
      data-detail-link={hasInternalDetail ? "internal" : "source"}
      className={cn(
        "spring-lift group relative flex h-full min-w-0 flex-col rounded-2xl border border-line bg-card p-5 hover:border-line-strong",
        featured && "featured-glow",
      )}
    >
      {featured || isElonLiked(story) ? (
        <p className="text-[12px] font-medium tracking-[0.1em] text-accent uppercase">{t("discover.featured")}</p>
      ) : null}

      <div className={cn("flex min-w-0 items-start justify-between gap-3", (featured || isElonLiked(story)) && "mt-3")}>
        <div className="flex min-w-0 items-center gap-3">
          <AuthorAvatar name={item.authorName} handle={story.handle} size={featured ? 48 : 40} />
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-ink">
              {item.authorName}
              {story.handle ? <span className="ml-1 font-normal text-mute">@{story.handle}</span> : null}
            </p>
            <p className="mt-0.5 text-[12px] text-faint">{formatCardDate(story.publishedAt, locale)}</p>
          </div>
        </div>
        {views != null && views > 0 ? (
          <div className="shrink-0 pt-0.5 text-right">
            <p
              className={cn(
                "font-medium tabular-nums tracking-tight text-ink",
                featured ? "text-[22px] leading-none md:text-[26px]" : "text-[18px] leading-none",
              )}
            >
              {formatViewCount(views, locale)}
            </p>
            <p className="mt-1 text-[12px] text-mute">{t("pages.rankingsViews")}</p>
          </div>
        ) : null}
      </div>
      {showHeading ? (
        <h3
          className={cn(
            "mt-2 font-medium tracking-tight text-ink",
            featured ? "text-[22px] leading-snug md:text-[26px]" : "text-[16px] leading-snug",
          )}
        >
          {hasInternalDetail ? (
            <LocaleLink href={`/discover/${story.slug}`}>{heading}</LocaleLink>
          ) : (
            <a
              href={originalHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => openExternalUrl(originalHref, event)}
            >
              {heading}
            </a>
          )}
        </h3>
      ) : (
        <h3 className="sr-only">{item.title}</h3>
      )}
      {postText ? <ExpandablePost text={postText} className="mt-2" /> : null}

      {showOutcome ? (
        <div className="mt-4 rounded-[12px] border border-line bg-elevated px-3 py-3">
          <p className="text-[12px] font-medium tracking-[0.08em] text-faint uppercase">{t("discover.result")}</p>
          <p className="mt-1 text-[13px] leading-5 text-ink">
            <SketchUnderline active={featured}>{outcome}</SketchUnderline>
          </p>
        </div>
      ) : null}

      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {labels.map((topic) => (
          <LocaleLink
            key={topic.slug}
            href={topicResultsPath(topic.slug)}
            className="rounded-full border border-line px-2.5 py-0.5 text-[12px] font-medium text-mute hover:border-line-strong hover:text-ink"
          >
            {t(`discover.cat${topic.slug.charAt(0).toUpperCase()}${topic.slug.slice(1)}`)}
          </LocaleLink>
        ))}
      </div>
      {trustLabel ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] text-faint">
          <span className="rounded-full border border-line px-2 py-0.5 text-mute">{trustLabel}</span>
        </div>
      ) : null}

      <div className="relative z-10 mt-auto pt-5">
        <a
          href={originalHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => openExternalUrl(originalHref, event)}
          className="inline-flex h-11 items-center justify-center rounded-[10px] border border-line px-4 text-[15px] text-mute hover:border-line-strong hover:text-ink"
        >
          {originalLabel} ↗
        </a>
      </div>
    </article>
  );
}
