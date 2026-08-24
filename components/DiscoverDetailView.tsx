"use client";

import { AppNamePills } from "@/components/AppPills";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiscoverCard } from "@/components/DiscoverCard";
import { ExpandablePost } from "@/components/ExpandablePost";
import { JsonLd } from "@/components/JsonLd";
import { XPostEmbed } from "@/components/XPostEmbed";
import type { DiscoverStory } from "@/data/discover";
import { LAST_REVIEWED } from "@/data/verification";
import { formatStoryDate, sameCopy } from "@/lib/format";
import { openExternalUrl } from "@/lib/open-external";
import { localizeDiscoverStory, useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

export function DiscoverDetailView({
  story,
  more,
}: {
  story: DiscoverStory;
  more: DiscoverStory[];
}) {
  const { locale, t, absoluteHref } = useI18n();
  const item = localizeDiscoverStory(story, locale);
  const originalHref = story.xPostUrl ?? story.sourceUrl;
  const originalLabel = story.xPostUrl ? t("discover.viewOriginalX") : t("discover.viewOriginal");
  const trustLabel = story.tested
    ? t("discover.tabTested")
    : story.source === "official"
      ? t("discover.tabOfficial")
      : null;
  const postText = item.body || item.headline;
  const showTitle = Boolean(item.title) && !sameCopy(item.title, postText);
  const showHeadline =
    Boolean(item.headline) && !sameCopy(item.headline, postText) && !sameCopy(item.title, item.headline);
  const outcome = item.result;
  const showOutcome =
    Boolean(outcome) && !sameCopy(outcome, item.title) && !sameCopy(outcome, postText);
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
          isBasedOn: {
            "@type": "CreativeWork",
            name: story.sourceLabel,
            url: story.sourceUrl,
            author: {
              "@type": sourceAuthorType,
              name: story.authorName,
              ...(story.handle ? { url: `https://x.com/${story.handle}` } : {}),
            },
          },
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
        <span className="rounded-full border border-line px-2.5 py-1 text-[12px] text-mute">
          {t(`discover.cat${story.category.charAt(0).toUpperCase()}${story.category.slice(1)}`)}
        </span>
        {trustLabel ? (
          <span className="rounded-full border border-line px-2.5 py-1 text-[12px] text-mute">
            {trustLabel}
          </span>
        ) : null}
        <span className="text-[12px] text-faint">{formatStoryDate(story.publishedAt, locale)}</span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <AuthorAvatar name={item.authorName} handle={story.handle} />
        <p className="text-[14px] text-mute">
          {item.authorName}
          {story.handle ? <span className="text-faint"> @{story.handle}</span> : null}
        </p>
      </div>
      {showTitle ? (
        <h1 className="mt-2 text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">{item.title}</h1>
      ) : (
        <h1 className="sr-only">{item.title}</h1>
      )}
      {showHeadline ? <p className="mt-4 text-lg leading-8 text-mute">{item.headline}</p> : null}
      {postText ? <ExpandablePost text={postText} className="mt-4" /> : null}
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
        <p className="text-faint">
          {story.handle
            ? t("discover.basedOn", { handle: story.handle })
            : t("discover.basedOnNamed", { name: story.authorName })}
        </p>
        <a
          href={originalHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => openExternalUrl(originalHref, event)}
          className="font-medium text-accent hover:underline"
        >
          {originalLabel} ↗
        </a>
      </div>
      {showOutcome ? (
        <div className="mt-6 rounded-[12px] border border-line bg-elevated px-4 py-3">
          <p className="text-[10px] font-medium tracking-[0.1em] text-faint uppercase">
            {item.result ? t("discover.result") : t("discover.output")}
          </p>
          <p className="mt-1 text-[15px] text-ink">{outcome}</p>
        </div>
      ) : null}

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
        <p className="mb-1.5 text-[11px] font-medium tracking-[0.08em] text-faint uppercase">
          {t("discover.integrations")}
        </p>
        <AppNamePills apps={story.apps} />
      </div>

      <div className="mt-8">
        <a
          href={originalHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => openExternalUrl(originalHref, event)}
          className="inline-flex h-11 items-center justify-center rounded-[10px] border border-line px-4 text-sm text-mute hover:border-line-strong hover:text-ink"
        >
          {originalLabel} ↗
        </a>
      </div>
      <p className="mt-2 text-[12px] text-faint">{story.sourceLabel}</p>

      {story.xPostUrl ? (
        <section className="mt-12">
          <h2 className="text-[20px] font-medium tracking-tight text-ink">{t("discover.originalPost")}</h2>
          <p className="mt-2 text-[13px] leading-6 text-faint">{t("discover.embedNote")}</p>
          <div className="mt-4">
            <XPostEmbed url={story.xPostUrl} />
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
