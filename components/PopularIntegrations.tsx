"use client";

import { AppCard } from "@/components/AppCard";
import { LocaleLink } from "@/components/LocaleLink";
import { appsBySlug, popularIntegrationSlugs } from "@/data/apps";
import { getUseCasesByApp } from "@/data/use-cases";
import { localizeApp, useI18n } from "@/lib/i18n";

export function PopularIntegrations() {
  const { locale, t } = useI18n();

  return (
    <section className="mx-auto max-w-[1240px] px-5 py-16 md:px-8 md:py-20">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-[24px] font-medium tracking-tight text-ink md:text-[28px]">
            {t("home.integrationsTitle")}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-mute">{t("home.integrationsBody")}</p>
        </div>
        <LocaleLink href="/integrations" className="shrink-0 text-sm text-mute hover:text-ink">
          {t("home.viewAll")}
        </LocaleLink>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {popularIntegrationSlugs.map((slug) => {
          const app = appsBySlug[slug];
          return (
            <AppCard key={slug} app={localizeApp(app, locale)} count={getUseCasesByApp(slug).length} />
          );
        })}
      </div>
    </section>
  );
}
