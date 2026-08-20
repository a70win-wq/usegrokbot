"use client";

import { AppCard } from "@/components/AppCard";
import { apps } from "@/data/apps";
import { getDiscoverStoriesByApp } from "@/data/discover";
import { localizeApp, useI18n } from "@/lib/i18n";

export default function IntegrationsPage() {
  const { locale, t } = useI18n();

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">
        {t("pages.integrationsTitle")}
      </h1>
      <p className="mt-3 max-w-2xl text-base text-mute">{t("pages.integrationsBody")}</p>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => (
          <AppCard key={app.slug} app={localizeApp(app, locale)} count={getDiscoverStoriesByApp(app.slug).length} />
        ))}
      </div>
    </div>
  );
}
