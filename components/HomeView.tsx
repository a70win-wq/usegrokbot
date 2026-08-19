"use client";

import { useState } from "react";
import { DiscoverFeed } from "@/components/DiscoverFeed";
import { JsonLd } from "@/components/JsonLd";
import { LocaleLink } from "@/components/LocaleLink";
import { SearchBar } from "@/components/SearchBar";
import { UseCaseCard } from "@/components/UseCaseCard";
import { discoverStories } from "@/data/discover";
import { getPopularUseCases, useCases } from "@/data/use-cases";
import { isOfficial } from "@/data/verification";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

export function HomeView({ initialQuery = "" }: { initialQuery?: string }) {
  const { t, absoluteHref } = useI18n();
  const [query, setQuery] = useState(initialQuery);
  const popular = getPopularUseCases(6);
  const officialCount = useCases.filter(isOfficial).length;

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
          <p className="text-[14px] text-mute">{t("home.kicker")}</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(32px,8vw,64px)] leading-[1.04] font-medium tracking-[-0.045em] text-ink">
            {t("home.title")}
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-7 text-mute">{t("home.subtitle")}</p>
          <div className="mt-8">
            <SearchBar initialQuery={initialQuery} onQueryChange={setQuery} stayOnPage />
          </div>
          <p className="mt-4 text-[12px] text-faint">
            {t("home.officialCount", { n: officialCount })}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pb-8 md:px-8">
        <DiscoverFeed query={query} />
      </section>

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
            <UseCaseCard key={item.slug} useCase={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-20 md:px-8">
        <h2 className="text-[28px] font-medium tracking-tight text-ink">{t("home.how")}</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            { n: "1", title: t("home.step1Title"), body: t("home.step1Body") },
            { n: "2", title: t("home.step2Title"), body: t("home.step2Body") },
            { n: "3", title: t("home.step3Title"), body: t("home.step3Body") },
          ].map((step) => (
            <div key={step.n}>
              <span className="flex size-8 items-center justify-center rounded-full bg-accent-soft text-[13px] font-medium text-accent">
                {step.n}
              </span>
              <h3 className="mt-4 text-xl font-medium text-ink">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-mute">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pt-6 pb-24 md:px-8">
        <div className="rounded-[18px] border border-line bg-elevated px-6 py-12 text-center md:px-12">
          <h2 className="text-[28px] font-medium tracking-tight text-ink">{t("home.ctaTitle")}</h2>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LocaleLink
              href="/use-cases"
              className="accent-gradient spring-press inline-flex h-11 items-center rounded-[10px] px-5 text-sm font-medium text-inverse"
            >
              {t("home.browse")}
            </LocaleLink>
            <LocaleLink
              href="/submit"
              className="spring-press inline-flex h-11 items-center rounded-[10px] border border-line px-5 text-sm text-ink"
            >
              {t("home.submit")}
            </LocaleLink>
          </div>
        </div>
      </section>
    </>
  );
}
