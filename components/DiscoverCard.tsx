"use client";

import { AppNamePills } from "@/components/AppPills";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { LocaleLink } from "@/components/LocaleLink";
import { SketchUnderline } from "@/components/SketchUnderline";
import type { DiscoverStory } from "@/data/discover";
import { topicsForStory } from "@/data/topics";
import { LAST_REVIEWED, formatVerifiedDate } from "@/data/verification";
import { cn } from "@/lib/cn";
import { formatCardDate } from "@/lib/format";
import { localizeDiscoverStory, useI18n } from "@/lib/i18n";
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
  const localeTag = locale === "en" ? "en" : locale;
  const checked = formatVerifiedDate(LAST_REVIEWED, localeTag);
  const labels = topicsForStory(story);
  const views = metricForStory(story)?.views;
  const viewsLabel =
    typeof views === "number" && views > 0
      ? t("discover.xViews", { n: formatViewCount(views, locale) })
      : null;

  return (
    <article
      className={cn(
        "spring-lift group relative flex h-full flex-col rounded-2xl border border-line bg-card p-5 hover:border-line-strong",
        featured && "featured-glow",
      )}
    >
      {featured ? (
        <p className="text-[11px] font-medium tracking-[0.12em] text-accent uppercase">{t("discover.featured")}</p>
      ) : null}

      <div className={cn("flex min-w-0 items-center gap-3", featured && "mt-3")}>
        <AuthorAvatar name={item.authorName} handle={story.handle} size={featured ? 48 : 40} />
        <div className="min-w-0">
          <p className="truncate text-[13px] font-medium text-ink">
            {item.authorName}
            {story.handle ? <span className="ml-1 font-normal text-mute">@{story.handle}</span> : null}
          </p>
          <p className="mt-0.5 text-[12px] text-faint">
            {formatCardDate(story.publishedAt, locale)}
            {viewsLabel ? ` · ${viewsLabel}` : null}
          </p>
        </div>
      </div>
      <h3
        className={cn(
          "mt-1 font-medium tracking-tight text-ink",
          featured ? "text-[22px] leading-snug md:text-[26px]" : "text-[16px] leading-snug",
        )}
      >
        <a href={originalHref} target="_blank" rel="noreferrer" className="after:absolute after:inset-0">
          {featured ? item.headline : item.title}
        </a>
      </h3>
      <p className={cn("relative mt-2 text-[13px] leading-6 text-mute", featured ? "line-clamp-4" : "line-clamp-3")}>
        {featured ? item.whatTheyDid : item.headline}
      </p>

      {item.result || item.output ? (
        <div className="relative mt-4 rounded-[12px] border border-line bg-elevated px-3 py-3">
          <p className="text-[10px] font-medium tracking-[0.1em] text-faint uppercase">
            {item.result ? t("discover.result") : t("discover.output")}
          </p>
          <p className="mt-1 text-[13px] leading-5 text-ink">
            <SketchUnderline active={featured}>{item.result ?? item.output}</SketchUnderline>
          </p>
        </div>
      ) : null}

      <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
        {labels.map((topic) => (
          <LocaleLink
            key={topic.slug}
            href={`/categories/${topic.slug}`}
            className="rounded-full border border-line px-2.5 py-0.5 text-[11px] font-medium text-mute hover:border-line-strong hover:text-ink"
          >
            {t(`discover.cat${topic.slug.charAt(0).toUpperCase()}${topic.slug.slice(1)}`)}
          </LocaleLink>
        ))}
      </div>

      <div className="relative mt-3">
        <AppNamePills apps={story.apps} />
      </div>
      <p className="relative mt-3 text-[11px] text-faint">{t("discover.lastVerified", { date: checked })}</p>

      <div className="relative z-10 mt-auto pt-5">
        <a
          href={originalHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-[10px] border border-line px-4 text-[13px] text-mute hover:border-line-strong hover:text-ink sm:h-9"
        >
          {originalLabel} ↗
        </a>
      </div>
    </article>
  );
}
