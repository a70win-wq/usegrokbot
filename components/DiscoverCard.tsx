"use client";

import { AppNamePills } from "@/components/AppPills";
import { LocaleLink } from "@/components/LocaleLink";
import { StatusBadge } from "@/components/StatusBadge";
import type { DiscoverStory } from "@/data/discover";
import { formatRelativeTime } from "@/lib/format";
import { localizeDiscoverStory, useI18n } from "@/lib/i18n";

export function DiscoverCard({ story }: { story: DiscoverStory }) {
  const { locale, t } = useI18n();
  const item = localizeDiscoverStory(story, locale);
  const sourceLabel = story.source === "official" ? t("discover.officialBadge") : t("discover.communityBadge");
  const originalHref = story.xPostUrl ?? story.sourceUrl;
  const originalLabel = story.xPostUrl ? t("discover.viewOriginalX") : t("discover.viewOriginal");

  return (
    <article className="spring-lift group relative flex h-full flex-col rounded-[16px] border border-line bg-card p-5 shadow-[0_1px_2px_rgb(0_0_0/0.04)] hover:border-line-strong hover:shadow-[0_10px_28px_rgb(0_0_0/0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-medium text-ink">
            {item.authorName}
            {story.handle ? <span className="ml-1 font-normal text-mute">@{story.handle}</span> : null}
          </p>
          <p className="mt-0.5 text-[12px] text-faint">{formatRelativeTime(story.publishedAt, locale)}</p>
        </div>
        <StatusBadge status={story.source} label={sourceLabel} />
      </div>

      <p className="mt-4 text-[11px] font-medium tracking-[0.08em] text-faint uppercase">
        {t(`discover.cat${capitalize(story.category)}`)}
      </p>
      <h3 className="mt-1 text-[16px] leading-snug font-medium tracking-tight text-ink">
        <LocaleLink href={`/discover/${story.slug}`} className="after:absolute after:inset-0">
          {item.title}
        </LocaleLink>
      </h3>
      <p className="relative mt-1 text-[13px] leading-6 text-ink/80">{item.headline}</p>
      <p className="relative mt-3 line-clamp-3 text-[13px] leading-6 text-mute">{item.whatTheyDid}</p>

      <p className="relative mt-4 text-[12px] leading-5 text-mute">
        <span className="text-faint">{t("discover.usefulFor")}: </span>
        {item.usefulFor}
      </p>

      <div className="relative mt-3">
        <AppNamePills apps={story.apps} />
      </div>

      <div className="relative z-10 mt-auto flex flex-col gap-2 pt-5 text-[13px]">
        <a
          href={originalHref}
          target="_blank"
          rel="noreferrer"
          className="text-mute hover:text-ink"
        >
          {originalLabel} ↗
        </a>
        {story.relatedUseCase ? (
          <LocaleLink href={`/use-cases/${story.relatedUseCase}`} className="text-accent">
            {t("discover.buildWorkflow")} →
          </LocaleLink>
        ) : (
          <LocaleLink href={`/discover/${story.slug}`} className="text-accent">
            {t("discover.moreStories")} →
          </LocaleLink>
        )}
      </div>
    </article>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
