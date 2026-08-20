"use client";

import { LocaleLink } from "@/components/LocaleLink";
import type { App } from "@/data/types";
import { useI18n } from "@/lib/i18n";
import { NamedIcon } from "./icons";

export function AppCard({ app, count }: { app: App; count: number }) {
  const { t } = useI18n();

  return (
    <LocaleLink
      href={`/integrations/${app.slug}`}
      className="spring-lift flex items-center gap-3 rounded-[14px] border border-line bg-card px-4 py-3.5 hover:border-line-strong hover:bg-card-hover"
    >
      <div className="flex size-9 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
        <NamedIcon name={app.icon} className="size-4.5" />
      </div>
      <div>
        <div className="text-sm font-medium text-ink">{app.name}</div>
        <div className="text-[12px] text-faint">{t("count.posts", { n: count })}</div>
      </div>
    </LocaleLink>
  );
}
