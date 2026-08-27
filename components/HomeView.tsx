"use client";

import { useEffect, useState } from "react";
import { CategoryCard } from "@/components/CategoryCard";
import { DiscoverFeed, DiscoverFilters, useDiscoverFilterState } from "@/components/DiscoverFeed";
import { LocaleLink } from "@/components/LocaleLink";
import { GitHubStar } from "@/components/GitHubStar";
import { HeroBot } from "@/components/HeroBot";
import { PostCensus } from "@/components/PostCensus";
import { SearchBar } from "@/components/SearchBar";
import { UseCaseList } from "@/components/UseCaseList";
import { discoverStories, storiesForTopic } from "@/data/discover";
import { scenarios, topScenarios } from "@/data/scenarios";
import { topics } from "@/data/topics";
import { useI18n } from "@/lib/i18n";

export function HomeView({
  initialQuery = "",
  stars,
}: {
  initialQuery?: string;
  stars?: number | null;
}) {
  const { t } = useI18n();
  const [query, setQuery] = useState(initialQuery);
  const filters = useDiscoverFilterState();

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q") ?? "";
    if (q && q !== initialQuery) setQuery(q);
  }, [initialQuery]);

  return (
    <>
      <section>
        <div className="mx-auto max-w-[1240px] px-5 pt-20 pb-12 md:px-8 md:pt-[104px] md:pb-16">
          <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
            <div className="min-w-0">
              <p className="text-[13px] font-medium tracking-[0.14em] text-mute uppercase">
                {t("home.kicker")}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                <LocaleLink
                  href="/how-we-built"
                  className="inline-flex text-[13px] text-ink underline decoration-line underline-offset-[5px] hover:text-accent"
                >
                  {t("nav.built")}
                </LocaleLink>
                <GitHubStar stars={stars} />
              </div>
              <h1 className="mt-5 max-w-3xl text-[clamp(32px,8vw,64px)] leading-[1.04] font-medium tracking-[-0.045em] text-ink">
                {t("home.title")}
              </h1>
              <PostCensus total={discoverStories.length} />
              <div className="mt-8">
                <SearchBar
                  initialQuery={initialQuery}
                  onQueryChange={setQuery}
                  stayOnPage
                />
              </div>
            </div>
            <HeroBot />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pb-16 md:px-8 md:pb-20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-[32px] font-medium tracking-tight text-ink">
              {t("useCases.title")}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-mute">{t("useCases.body")}</p>
          </div>
          <LocaleLink href="/use-cases" className="shrink-0 text-sm text-mute hover:text-ink">
            {t("useCases.viewAll", { n: scenarios.length })}
          </LocaleLink>
        </div>
        <div className="mt-10">
          <UseCaseList compact items={topScenarios()} />
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pb-12 md:px-8">
        <DiscoverFilters {...filters} showOutcomes={false} />
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pb-8 md:px-8">
        <DiscoverFeed query={query} showIntro hideFilters showOutcomes={false} filterState={filters} />
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-16 md:px-8 md:py-20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-[24px] font-medium tracking-tight text-ink md:text-[28px]">
              {t("pages.categoriesTitle")}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-mute">{t("pages.categoriesBody")}</p>
          </div>
          <LocaleLink href="/categories" className="shrink-0 text-sm text-mute hover:text-ink">
            {t("home.viewAll")}
          </LocaleLink>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic) => (
            <CategoryCard key={topic.slug} topic={topic} count={storiesForTopic(topic.slug).length} />
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

      <div className="h-16" />
    </>
  );
}
