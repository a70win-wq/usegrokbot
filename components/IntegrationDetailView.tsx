"use client";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiscoverCard } from "@/components/DiscoverCard";
import { NamedIcon } from "@/components/icons";
import type { DiscoverStory } from "@/data/discover";
import type { App } from "@/data/types";
import { localizeApp, useI18n } from "@/lib/i18n";

export function IntegrationDetailView({
  app,
  stories,
}: {
  app: App;
  stories: DiscoverStory[];
}) {
  const { locale, t } = useI18n();
  const item = localizeApp(app, locale);

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
      <Breadcrumbs items={[{ href: "/categories", label: t("nav.categories") }, { label: item.name }]} />
      <div className="mt-6 flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-[12px] bg-accent-soft text-accent">
          <NamedIcon name={app.icon} className="size-5" />
        </div>
        <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">
          {t("pages.integrationHeading", { name: item.name })}
        </h1>
      </div>
      <p className="mt-3 max-w-2xl text-base text-mute">
        {t("pages.integrationBody", { name: item.name })}
      </p>
      <p className="mt-3 text-[13px] text-faint">{t("count.posts", { n: stories.length })}</p>
      {stories.length ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {stories.map((story) => (
            <DiscoverCard key={story.slug} story={story} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-sm text-mute">{t("discover.empty")}</p>
      )}
    </div>
  );
}
