"use client";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiscoverCard } from "@/components/DiscoverCard";
import { LocaleLink } from "@/components/LocaleLink";
import { SeoGuide } from "@/components/SeoGuide";
import { UseCasesExplorer } from "@/components/UseCasesExplorer";
import { NamedIcon } from "@/components/icons";
import { seoForApp } from "@/data/seo";
import type { DiscoverStory } from "@/data/discover";
import type { App, UseCase } from "@/data/types";
import { localizeApp, useI18n } from "@/lib/i18n";

export function IntegrationDetailView({
  app,
  stories,
  items,
}: {
  app: App;
  stories: DiscoverStory[];
  items: UseCase[];
}) {
  const { locale, t } = useI18n();
  const item = localizeApp(app, locale);

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
      <Breadcrumbs items={[{ href: "/integrations", label: t("nav.integrations") }, { label: item.name }]} />
      <div className="mt-6 flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-[12px] bg-accent-soft text-accent">
          <NamedIcon name={app.icon} className="size-5" />
        </div>
        <div>
          <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">
            {t("pages.integrationHeading", { name: item.name })}
          </h1>
        </div>
      </div>
      <p className="mt-3 max-w-2xl text-base text-mute">
        {t("pages.integrationBody", { name: item.name })}
      </p>

      {stories.length ? (
        <section className="mt-10">
          <h2 className="text-[20px] font-medium tracking-tight text-ink">{t("discover.feedTitle")}</h2>
          <p className="mt-2 text-sm text-mute">{t("discover.feedBody")}</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {stories.slice(0, 6).map((story) => (
              <DiscoverCard key={story.slug} story={story} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-12">
        <h2 className="text-[20px] font-medium tracking-tight text-ink">{t("home.buildTitle")}</h2>
        <p className="mt-2 text-sm text-mute">{t("home.buildBody")}</p>
        <div className="mt-6">
          <UseCasesExplorer items={items} lockedApp={app.slug} />
        </div>
        <p className="mt-8 text-sm">
          <LocaleLink href="/use-cases" className="text-accent">
            {t("pages.browseIntegration", { name: item.name })} →
          </LocaleLink>
        </p>
      </section>
      {seoForApp(app.slug) ? <SeoGuide guide={seoForApp(app.slug)!} /> : null}
    </div>
  );
}
