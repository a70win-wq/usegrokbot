"use client";

import { ArrowUpRight } from "lucide-react";
import { sponsors } from "@/data/sponsors";
import { useI18n } from "@/lib/i18n";

export function SponsorStrip() {
  const { t } = useI18n();
  const sponsor = sponsors[0];
  if (!sponsor) return null;

  return (
    <aside aria-label={t("sponsor.label")} className="border-b border-line bg-elevated/50">
      <a
        href={sponsor.href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label={t("sponsor.aria")}
        className="group mx-auto flex h-12 max-w-[1240px] items-center gap-3 px-5 md:px-8"
      >
        <span className="shrink-0 text-[11px] font-medium tracking-[0.12em] text-mute uppercase">
          {t("sponsor.label")}
        </span>
        <span className="hidden h-4 w-px shrink-0 bg-line sm:block" aria-hidden />
        <span className="inline-flex min-w-0 items-center gap-2.5">
          <img
            src={sponsor.logo}
            alt=""
            width={20}
            height={19}
            className="size-5 shrink-0 rounded-[5px] ring-1 ring-line"
          />
          <span className="truncate text-[13px] font-medium text-ink">{t("sponsor.name")}</span>
          <span className="hidden truncate text-[13px] text-mute md:inline">{t("sponsor.tagline")}</span>
        </span>
        <span className="ml-auto inline-flex shrink-0 items-center gap-0.5 text-[12px] text-mute transition group-hover:text-ink">
          <span className="hidden sm:inline">{t("sponsor.cta")}</span>
          <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
        </span>
      </a>
    </aside>
  );
}
