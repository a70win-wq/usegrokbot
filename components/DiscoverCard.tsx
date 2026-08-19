"use client";

import { AppNamePills } from "@/components/AppPills";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { LocaleLink } from "@/components/LocaleLink";
import { StatusBadge } from "@/components/StatusBadge";
import type { DiscoverStory } from "@/data/discover";
import { LAST_REVIEWED, formatVerifiedDate, type TrustStatus } from "@/data/verification";
import { cn } from "@/lib/cn";
import { formatCardDate } from "@/lib/format";
import { localizeDiscoverStory, useI18n } from "@/lib/i18n";

export function discoverTrust(
  story: DiscoverStory,
  t: (path: string) => string,
): { status: TrustStatus; label: string } {
  if (story.tested) return { status: "tested", label: `🧪 ${t("trust.tested")}` };
  if (story.source === "official") return { status: "official", label: `✅ ${t("discover.officialBadge")}` };
  return { status: "community", label: `👥 ${t("discover.communityBadge")}` };
}

export function DiscoverCard({
  story,
  featured = false,
}: {
  story: DiscoverStory;
  featured?: boolean;
}) {
  const { locale, t } = useI18n();
  const item = localizeDiscoverStory(story, locale);
  const trust = discoverTrust(story, t);
  const originalHref = story.xPostUrl ?? story.sourceUrl;
  const originalLabel = story.xPostUrl ? t("discover.viewOnX") : t("discover.viewOriginal");
  const localeTag = locale === "en" ? "en" : locale;
  const checked = formatVerifiedDate(LAST_REVIEWED, localeTag);
  const checkLabel =
    story.source === "official"
      ? t("discover.verifiedOfficial", { date: checked })
      : t("discover.sourceChecked", { date: checked });
  const buildHref = story.relatedUseCase ? `/use-cases/${story.relatedUseCase}` : `/discover/${story.slug}`;
  const buildLabel = story.relatedUseCase ? t("discover.buildWorkflow") : t("discover.readCase");

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

      <div className={cn("flex items-start justify-between gap-3", featured && "mt-3")}>
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
        <StatusBadge status={trust.status} label={trust.label} />
      </div>

      <p className="mt-4 text-[11px] font-medium tracking-[0.08em] text-faint uppercase">
        {t(`discover.cat${capitalize(story.category)}`)}
      </p>
      <h3
        className={cn(
          "mt-1 font-medium tracking-tight text-ink",
          featured ? "text-[22px] leading-snug md:text-[26px]" : "text-[16px] leading-snug",
        )}
      >
        <LocaleLink href={`/discover/${story.slug}`} className="after:absolute after:inset-0">
          {featured ? item.headline : item.title}
        </LocaleLink>
      </h3>
      <p className={cn("relative mt-2 text-[13px] leading-6 text-mute", featured ? "line-clamp-4" : "line-clamp-3")}>
        {featured ? item.whatTheyDid : item.headline}
      </p>

      {item.result || item.output ? (
        <div className="relative mt-4 rounded-[12px] border border-line bg-elevated px-3 py-3">
          <p className="text-[10px] font-medium tracking-[0.1em] text-faint uppercase">
            {item.result ? t("discover.result") : t("discover.output")}
          </p>
          <p className="mt-1 text-[13px] leading-5 text-ink">{item.result ?? item.output}</p>
        </div>
      ) : null}

      <p className="relative mt-4 text-[12px] leading-5 text-mute">
        <span className="text-faint">{t("discover.usefulFor")}: </span>
        {item.usefulFor}
      </p>

      <div className="relative mt-3">
        <AppNamePills apps={story.apps} />
      </div>
      <p className="relative mt-3 text-[11px] text-faint">{checkLabel}</p>

      <div className="relative z-10 mt-auto flex flex-col gap-2 pt-5 sm:flex-row-reverse sm:items-center sm:justify-end">
        <LocaleLink
          href={buildHref}
          className="accent-gradient spring-press inline-flex h-11 items-center justify-center rounded-[10px] px-4 text-[13px] font-medium sm:h-9"
        >
          {buildLabel} →
        </LocaleLink>
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

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
