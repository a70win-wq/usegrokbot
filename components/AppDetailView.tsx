"use client";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { UseCasesExplorer } from "@/components/UseCasesExplorer";
import type { App, UseCase } from "@/data/types";
import { localizeApp, useI18n } from "@/lib/i18n";

export function AppDetailView({ app, items }: { app: App; items: UseCase[] }) {
  const { locale, t } = useI18n();
  const item = localizeApp(app, locale);

  return (
    <div className="mx-auto max-w-[1120px] px-5 py-12 md:px-8 md:py-16">
      <Breadcrumbs items={[{ href: "/apps", label: t("nav.apps") }, { label: item.name }]} />
      <h1 className="mt-6 text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">
        {t("pages.appHeading", { name: item.name })}
      </h1>
      <p className="mt-3 max-w-2xl text-base text-mute">{item.description}</p>
      <div className="mt-8">
        <UseCasesExplorer items={items} lockedApp={app.slug} />
      </div>
    </div>
  );
}
