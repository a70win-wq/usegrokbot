"use client";

import { AppCard } from "@/components/AppCard";
import { apps } from "@/data/apps";
import { getUseCasesByApp } from "@/data/use-cases";
import { localizeApp, useI18n } from "@/lib/i18n";

export default function AppsPage() {
  const { locale, t } = useI18n();

  return (
    <div className="mx-auto max-w-[1120px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">{t("pages.appsTitle")}</h1>
      <p className="mt-3 max-w-2xl text-base text-mute">{t("pages.appsBody")}</p>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => (
          <AppCard key={app.slug} app={localizeApp(app, locale)} count={getUseCasesByApp(app.slug).length} />
        ))}
      </div>
    </div>
  );
}
