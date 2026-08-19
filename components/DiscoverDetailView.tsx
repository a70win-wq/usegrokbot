"use client";

import { AppNamePills } from "@/components/AppPills";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiscoverCard } from "@/components/DiscoverCard";
import { JsonLd } from "@/components/JsonLd";
import { LocaleLink } from "@/components/LocaleLink";
import { StatusBadge } from "@/components/StatusBadge";
import { UseCaseCard } from "@/components/UseCaseCard";
import { XPostEmbed } from "@/components/XPostEmbed";
import type { DiscoverStory } from "@/data/discover";
import { getRelatedDiscoverStories, getRelatedUseCase } from "@/data/discover";
import type { UseCase } from "@/data/types";
import { LAST_REVIEWED, formatVerifiedDate } from "@/data/verification";
import { formatStoryDate } from "@/lib/format";
import { localizeDiscoverStory, localizeUseCase, useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

export function DiscoverDetailView({ story }: { story: DiscoverStory }) {
  const { locale, t, absoluteHref } = useI18n();
  const item = localizeDiscoverStory(story, locale);
  const related = getRelatedUseCase(story);
  const relatedTitle = related ? localizeUseCase(related, locale).title : undefined;
  const more = getRelatedDiscoverStories(story, 3);
  const sourceLabel = story.source === "official" ? t("discover.officialBadge") : t("discover.communityBadge");
  const originalHref = story.xPostUrl ?? story.sourceUrl;
  const originalLabel = story.xPostUrl ? t("discover.viewOriginalX") : t("discover.viewOriginal");
  const localeTag = locale === "en" ? "en" : locale;
  const checked = formatVerifiedDate(LAST_REVIEWED, localeTag);
  const checkLabel =
    story.source === "official"
      ? t("discover.verifiedOfficial", { date: checked })
      : t("discover.sourceChecked", { date: checked });
  const sourceAuthorType = story.handle === "xai" || story.handle === "bot" || story.authorName === "xAI" || story.authorName === "Jellypod"
    ? "Organization"
    : "Person";

  return (
    <article className="mx-auto max-w-[800px] px-5 py-10 md:px-8 md:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: item.title,
          description: item.headline,
          datePublished: story.publishedAt,
          dateModified: LAST_REVIEWED,
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          isBasedOn: story.sourceUrl,
          citation: {
            "@type": "CreativeWork",
            name: story.sourceLabel,
            url: story.sourceUrl,
            author: {
              "@type": sourceAuthorType,
              name: story.authorName,
              ...(story.handle ? { url: `https://x.com/${story.handle}` } : {}),
            },
          },
          mainEntityOfPage: absoluteHref(`/discover/${story.slug}`),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: t("nav.discover"), item: absoluteHref("/") },
            { "@type": "ListItem", position: 2, name: item.title },
          ],
        }}
      />

      <Breadcrumbs items={[{ href: "/", label: t("nav.discover") }, { label: item.title }]} />

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <StatusBadge status={story.source} label={sourceLabel} />
        <span className="rounded-full border border-line px-2.5 py-1 text-[12px] text-mute">
          {t(`discover.cat${story.category.charAt(0).toUpperCase()}${story.category.slice(1)}`)}
        </span>
        <span className="text-[12px] text-faint">{formatStoryDate(story.publishedAt, locale)}</span>
        <span className="text-[12px] text-faint">{checkLabel}</span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <AuthorAvatar name={item.authorName} handle={story.handle} />
        <p className="text-[14px] text-mute">
          {item.authorName}
          {story.handle ? <span className="text-faint"> @{story.handle}</span> : null}
        </p>
      </div>
      <h1 className="mt-2 text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">{item.title}</h1>
      <p className="mt-4 text-lg leading-8 text-mute">{item.headline}</p>

      <section className="mt-10">
        <h2 className="text-[13px] font-medium tracking-[0.08em] text-faint uppercase">{t("discover.whatTheyDid")}</h2>
        <p className="mt-3 text-[16px] leading-7 text-ink">{item.whatTheyDid}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-[13px] font-medium tracking-[0.08em] text-faint uppercase">{t("discover.howItWorks")}</h2>
        <p className="mt-3 text-[16px] leading-7 text-ink">{item.howItWorks}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-[13px] font-medium tracking-[0.08em] text-faint uppercase">{t("discover.whyItMatters")}</h2>
        <p className="mt-3 text-[16px] leading-7 text-ink">{item.whyItMatters}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-[13px] font-medium tracking-[0.08em] text-faint uppercase">{t("discover.whyUseful")}</h2>
        <p className="mt-3 text-[16px] leading-7 text-ink">{item.whyUseful}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-[13px] font-medium tracking-[0.08em] text-faint uppercase">{t("discover.whoShouldTry")}</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-[15px] leading-7 text-ink">
          {item.whoShouldTry.map((who) => (
            <li key={who}>{who}</li>
          ))}
        </ul>
      </section>

      {item.quote ? (
        <blockquote className="mt-8 border-l-2 border-line pl-4 text-[15px] leading-7 text-mute">
          “{item.quote}”
        </blockquote>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-2 text-[12px] text-mute">
        {[t(`difficulty.${story.difficulty}`), t(`schedule.${story.schedule}`)].map((chip) => (
          <span key={chip} className="rounded-full border border-line px-2.5 py-1">
            {chip}
          </span>
        ))}
      </div>
      <div className="mt-3">
        <AppNamePills apps={story.apps} />
      </div>

      <p className="mt-6 text-[14px]">
        <a href={originalHref} target="_blank" rel="noreferrer" className="text-accent">
          {originalLabel} ↗
        </a>
        <span className="mt-1 block text-[12px] text-faint">{story.sourceLabel}</span>
      </p>

      {story.xPostUrl ? (
        <section className="mt-12">
          <h2 className="text-[20px] font-medium tracking-tight text-ink">{t("discover.originalPost")}</h2>
          <p className="mt-2 text-[13px] leading-6 text-faint">{t("discover.embedNote")}</p>
          <div className="mt-4">
            <XPostEmbed url={story.xPostUrl} />
          </div>
        </section>
      ) : null}

      {related ? (
        <section className="mt-12 rounded-[16px] border border-line bg-elevated px-5 py-6">
          <h2 className="text-[20px] font-medium tracking-tight text-ink">{t("discover.wantToBuild")}</h2>
          <p className="mt-2 text-sm text-mute">{t("discover.relatedWorkflow")}</p>
          <LocaleLink
            href={`/use-cases/${related.slug}`}
            className="mt-4 inline-flex h-11 items-center rounded-[10px] bg-ink px-4 text-sm font-medium text-inverse"
          >
            {t("discover.viewGuide", { title: relatedTitle ?? related.title })} →
          </LocaleLink>
          <div className="mt-6">
            <UseCaseCard useCase={related as UseCase} />
          </div>
        </section>
      ) : null}

      {more.length ? (
        <section className="mt-16">
          <h2 className="text-[20px] font-medium tracking-tight text-ink">{t("discover.moreStories")}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {more.map((itemStory) => (
              <DiscoverCard key={itemStory.slug} story={itemStory} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
