"use client";

import { useState } from "react";
import { DiscoverCard } from "@/components/DiscoverCard";
import { DiscoverFeed, DiscoverFilters, useDiscoverFilterState } from "@/components/DiscoverFeed";
import { JsonLd } from "@/components/JsonLd";
import { LocaleLink } from "@/components/LocaleLink";
import { PopularIntegrations } from "@/components/PopularIntegrations";
import { HeroBot } from "@/components/HeroBot";
import { SearchBar } from "@/components/SearchBar";
import { UseCaseCard } from "@/components/UseCaseCard";
import { discoverStories, getFeaturedDiscoverStories } from "@/data/discover";
import { getPopularUseCases, useCases } from "@/data/use-cases";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

export function HomeView({ initialQuery = "" }: { initialQuery?: string }) {
  const { t, absoluteHref } = useI18n();
  const [query, setQuery] = useState(initialQuery);
  const filters = useDiscoverFilterState();
  const popular = getPopularUseCases(6);
  const featured = getFeaturedDiscoverStories(4);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.name,
          url: absoluteHref("/"),
          description: site.description,
          potentialAction: {
            "@type": "SearchAction",
            target: absoluteHref("/discover?q={search_term_string}"),
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: t("home.title"),
          description: t("home.subtitle"),
          url: absoluteHref("/"),
          numberOfItems: discoverStories.length,
        }}
      />

      <section>
        <div className="mx-auto max-w-[1240px] px-5 pt-20 pb-12 md:px-8 md:pt-[104px] md:pb-16">
          <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
            <div className="min-w-0">
              <p className="text-[13px] font-medium tracking-[0.14em] text-mute uppercase">{t("home.kicker")}</p>
              <h1 className="mt-5 max-w-3xl text-[clamp(32px,8vw,64px)] leading-[1.04] font-medium tracking-[-0.045em] text-ink">
                {t("home.title")}
              </h1>
              <p className="mt-5 max-w-xl text-[17px] leading-7 text-mute">{t("home.subtitle")}</p>
              <div className="mt-8">
                <SearchBar initialQuery={initialQuery} onQueryChange={setQuery} stayOnPage />
              </div>
              <p className="mt-4 text-[12px] text-faint">
                {t("home.proof", { n: useCases.length })}
              </p>
            </div>
            <HeroBot />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pb-12 md:px-8">
        <DiscoverFilters {...filters} showOutcomes={false} />
      </section>

      {featured.length > 0 && filters.tab !== "featured" ? (
        <section className="mx-auto max-w-[1240px] px-5 pb-16 md:px-8">
          <h2 className="text-[24px] font-medium tracking-tight text-ink md:text-[28px]">
            {t("home.featuredTitle")}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-mute">{t("home.featuredBody")}</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((story) => (
              <DiscoverCard key={story.slug} story={story} featured />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1240px] px-5 pb-8 md:px-8">
        <DiscoverFeed query={query} showIntro hideFilters showOutcomes={false} filterState={filters} />
      </section>

      <PopularIntegrations />

      <section className="mx-auto max-w-[1240px] px-5 py-16 md:px-8 md:py-20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-[24px] font-medium tracking-tight text-ink md:text-[28px]">{t("home.buildTitle")}</h2>
            <p className="mt-2 max-w-2xl text-sm text-mute">{t("home.buildBody")}</p>
          </div>
          <LocaleLink href="/use-cases" className="shrink-0 text-sm text-mute hover:text-ink">
            {t("home.viewAll")}
          </LocaleLink>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {popular.map((item) => (
            <UseCaseCard key={item.slug} useCase={item} cta="build" />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-16 md:px-8">
        <div className="rounded-[18px] border border-line bg-elevated px-6 py-12 text-center md:px-12">
          <h2 className="text-[28px] font-medium tracking-tight text-ink">{t("home.submitTitle")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-mute">{t("home.submitBody")}</p>
          <LocaleLink
            href="/submit"
            className="accent-gradient spring-press mt-7 inline-flex h-11 items-center rounded-[10px] px-5 text-sm font-medium"
          >
            {t("home.submitCta")}
          </LocaleLink>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-20 md:px-8">
        <h2 className="text-[24px] font-medium tracking-tight text-ink md:text-[28px]">{t("home.verifyTitle")}</h2>
        <p className="mt-2 max-w-2xl text-sm text-mute">{t("home.verifyBody")}</p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            { title: t("home.verifyOfficialTitle"), body: t("home.verifyOfficialBody") },
            { title: t("home.verifyTestedTitle"), body: t("home.verifyTestedBody") },
            { title: t("home.verifyCommunityTitle"), body: t("home.verifyCommunityBody") },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="text-xl font-medium text-ink">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-mute">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-[13px] text-faint">{t("home.verifyNote")}</p>
      </section>

      <div className="h-16" />
    </>
  );
}
