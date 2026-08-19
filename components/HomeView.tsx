"use client";

import { LocaleLink } from "@/components/LocaleLink";
import { AppCard } from "@/components/AppCard";
import { BotFace, botColorFor } from "@/components/BotFace";
import { JsonLd } from "@/components/JsonLd";
import { SearchBar } from "@/components/SearchBar";
import { UseCaseCard } from "@/components/UseCaseCard";
import { homeApps } from "@/data/apps";
import { categories, categoriesBySlug } from "@/data/categories";
import { getNewUseCases, getPopularUseCases, getUseCasesByApp, useCases } from "@/data/use-cases";
import { isOfficial } from "@/data/verification";
import { localizeCategory, useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

export function HomeView() {
  const { locale, t, absoluteHref } = useI18n();
  const popular = getPopularUseCases(9);
  const newest = getNewUseCases(6);
  const officialCount = useCases.filter(isOfficial).length;

  const chips = [
    { href: "/use-cases", label: t("home.chipPopular") },
    { href: "/use-cases?status=official", label: t("home.chipVerified") },
    { href: "/categories/sales", label: localizeCategory(categoriesBySlug.sales, locale).shortName },
    { href: "/categories/marketing", label: localizeCategory(categoriesBySlug.marketing, locale).shortName },
    { href: "/categories/research", label: localizeCategory(categoriesBySlug.research, locale).shortName },
  ];

  const intents = [
    { href: "/categories/sales", label: t("home.intentCustomers") },
    { href: "/use-cases?q=research", label: t("home.intentResearch") },
    { href: "/apps/gmail", label: t("home.intentEmail") },
    { href: "/use-cases?q=monitor", label: t("home.intentWatch") },
    { href: "/categories/content", label: t("home.intentContent") },
    { href: "/categories/coding", label: t("home.intentCoding") },
  ];

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
            target: absoluteHref("/use-cases?q={search_term_string}"),
            "query-input": "required name=search_term_string",
          },
        }}
      />

      <section>
        <div className="mx-auto max-w-[1120px] px-5 pt-16 pb-14 md:px-8 md:pt-24 md:pb-16">
          <p className="text-[14px] text-mute">{t("home.kicker")}</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(40px,7vw,72px)] leading-[1.04] font-medium tracking-[-0.045em] text-ink">
            {t("home.title")}
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-7 text-mute">{t("home.subtitle")}</p>
          <div className="mt-8">
            <SearchBar />
          </div>
          <dl className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            {[
              { n: `${useCases.length}+`, label: t("home.statCases") },
              { n: t("home.statCopyValue"), label: t("home.statCopy") },
              { n: t("home.statCodeValue"), label: t("home.statCode") },
            ].map((stat) => (
              <div key={stat.label} className="rounded-[14px] border border-line bg-elevated px-3 py-3">
                <dt className="text-[11px] text-faint">{stat.label}</dt>
                <dd className="mt-1 text-[15px] font-medium tracking-tight text-ink">{stat.n}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[12px] text-faint">
            {t("home.officialCount", { n: officialCount })}
          </p>
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [mask-image:linear-gradient(90deg,#000_92%,transparent)]">
            {chips.map((chip) => (
              <LocaleLink
                key={chip.href}
                href={chip.href}
                className="inline-flex h-8 shrink-0 items-center rounded-full border border-line px-3 text-[13px] text-mute transition hover:border-line-strong hover:text-ink"
              >
                {chip.label}
              </LocaleLink>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 pb-8 md:px-8">
        <h2 className="text-[24px] font-medium tracking-tight text-ink md:text-[28px]">{t("home.intentTitle")}</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {intents.map((intent) => (
            <LocaleLink
              key={intent.href}
              href={intent.href}
              className="spring-lift rounded-[16px] border border-line bg-card px-4 py-4 text-[15px] font-medium text-ink hover:border-line-strong"
            >
              {intent.label}
            </LocaleLink>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 py-16 md:px-8 md:py-20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-[24px] font-medium tracking-tight text-ink md:text-[28px]">{t("home.popular")}</h2>
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

      <section className="mx-auto max-w-[1120px] px-5 py-16 md:px-8">
        <h2 className="text-[28px] font-medium tracking-tight text-ink">{t("home.jobs")}</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => {
            const item = localizeCategory(category, locale);
            return (
              <LocaleLink
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="spring-lift rounded-[16px] border border-line bg-card p-4 hover:border-line-strong"
              >
                <BotFace size={36} color={botColorFor(category.slug)} />
                <div className="mt-3 text-[15px] font-medium text-ink">{item.name}</div>
                <p className="mt-1 text-[13px] leading-5 text-mute">{item.description}</p>
              </LocaleLink>
            );
          })}
        </div>
      </section>

      <section className="bg-elevated">
        <div className="mx-auto max-w-[1120px] px-5 py-16 md:px-8 md:py-20">
          <h2 className="text-[28px] font-medium tracking-tight text-ink">{t("home.tools")}</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {homeApps.map((app) => (
              <AppCard key={app.slug} app={app} count={getUseCasesByApp(app.slug).length} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 py-16 md:px-8 md:py-20">
        <h2 className="text-[28px] font-medium tracking-tight text-ink">{t("home.newest")}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {newest.map((item) => (
            <UseCaseCard key={item.slug} useCase={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 py-16 md:px-8">
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

      <section className="mx-auto max-w-[1120px] px-5 pt-6 pb-24 md:px-8">
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
