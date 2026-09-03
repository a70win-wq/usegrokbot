"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryCard } from "@/components/CategoryCard";
import { DiscoverFeed, DiscoverFilters, useDiscoverFilterState } from "@/components/DiscoverFeed";
import { LocaleLink } from "@/components/LocaleLink";
import { GitHubStar } from "@/components/GitHubStar";
import { HeroBot } from "@/components/HeroBot";
import { PostCensus } from "@/components/PostCensus";
import { SearchBar } from "@/components/SearchBar";
import { TemplateList } from "@/components/TemplateList";
import { discoverStories, storiesForTopic } from "@/data/discover";
import { starterTemplates, templates } from "@/data/templates";
import { topics } from "@/data/topics";
import { useI18n } from "@/lib/i18n";
import { SEARCH_UI_ENABLED, withSearchQuery } from "@/lib/search";

export function HomeView({
  stars,
}: {
  stars?: number | null;
}) {
  return (
    <Suspense fallback={<HomeViewContent initialQuery="" stars={stars} syncUrl={false} />}>
      <HomeViewFromUrl stars={stars} />
    </Suspense>
  );
}

function HomeViewFromUrl({ stars }: { stars?: number | null }) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q")?.trim() ?? "";

  return <HomeViewContent initialQuery={initialQuery} stars={stars} syncUrl />;
}

function HomeViewContent({
  initialQuery,
  stars,
  syncUrl,
}: {
  initialQuery: string;
  stars?: number | null;
  syncUrl: boolean;
}) {
  const { t } = useI18n();
  const [queryState, setQueryState] = useState(() => ({ source: initialQuery, value: initialQuery }));
  const query =
    queryState.source === initialQuery || queryState.value.trim() === initialQuery
      ? queryState.value
      : initialQuery;
  const filters = useDiscoverFilterState();
  const featured = useMemo(() => starterTemplates(), []);

  function updateQuery(value: string) {
    setQueryState({ source: initialQuery, value });
    if (!syncUrl) return;
    window.history.replaceState(
      null,
      "",
      withSearchQuery(window.location.pathname, window.location.search, value),
    );
  }

  return (
    <>
      <section>
        <div className="mx-auto max-w-[1240px] px-5 pt-20 pb-12 md:px-8 md:pt-[104px] md:pb-16">
          <div className="flex flex-col md:grid md:grid-cols-[minmax(0,1fr)_auto] md:grid-rows-[auto_auto] md:items-start md:gap-x-12">
            <div className="order-2 flex items-center gap-3 md:col-span-2 md:row-start-1">
              <p className="whitespace-nowrap text-[13px] font-medium tracking-[0.08em] text-mute uppercase sm:tracking-[0.14em]">
                {t("home.kicker")}
              </p>
              <GitHubStar stars={stars} className="h-7 shrink-0 px-2.5" />
            </div>
            <div className="order-3 mt-5 min-w-0 md:col-start-1 md:row-start-2">
              <h1 className="max-w-3xl text-[clamp(32px,8vw,64px)] leading-[1.04] font-medium tracking-[-0.045em] text-ink">
                {t("home.title")}
              </h1>
              <PostCensus total={discoverStories.length} />
              {SEARCH_UI_ENABLED ? (
                <div className="mt-8">
                  <SearchBar
                    initialQuery={initialQuery}
                    onQueryChange={updateQuery}
                    stayOnPage
                  />
                </div>
              ) : null}
            </div>
            <div className="order-1 mx-auto mb-5 md:col-start-2 md:row-start-2 md:mx-0 md:mb-0">
              <HeroBot />
            </div>
          </div>
        </div>
      </section>

      {query.trim() ? (
        <section id="search-results" className="mx-auto max-w-[1240px] px-5 pb-16 md:px-8 md:pb-20">
          <DiscoverFeed
            query={query}
            showIntro
            hideFilters
            showOutcomes={false}
          />
        </section>
      ) : (
        <>
          <section className="mx-auto max-w-[1240px] px-5 pb-16 md:px-8 md:pb-20">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-[32px] font-medium tracking-tight text-ink">
                  {t("templates.homeTitle")}
                </h2>
              </div>
              <LocaleLink href="/templates/all" className="shrink-0 text-base font-medium text-mute hover:text-ink">
                {t("templates.viewAll", { n: templates.length })}
              </LocaleLink>
            </div>
            <div className="mt-10">
              <TemplateList items={featured} pager={false} heading="h3" />
            </div>
          </section>

          <section className="mx-auto max-w-[1240px] px-5 pb-12 md:px-8">
            <DiscoverFilters {...filters} showOutcomes={false} />
          </section>

          <section className="mx-auto max-w-[1240px] px-5 pb-8 md:px-8">
            <DiscoverFeed query="" showIntro hideFilters showOutcomes={false} filterState={filters} />
          </section>
        </>
      )}

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
