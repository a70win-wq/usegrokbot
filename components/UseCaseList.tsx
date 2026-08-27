"use client";

import { LocaleLink } from "@/components/LocaleLink";
import { rankLabel, scenarios } from "@/data/scenarios";
import { cn } from "@/lib/cn";
import { localizeScenario, useI18n } from "@/lib/i18n";

export function UseCaseList({ compact = false }: { compact?: boolean }) {
  const { locale, t } = useI18n();

  return (
    <ol className={cn(compact ? "grid gap-x-12 gap-y-8 sm:grid-cols-2" : "divide-y divide-line border-y border-line")}>
      {scenarios.map((item) => {
        const scenario = localizeScenario(item, locale);
        if (compact) {
          return (
            <li key={item.slug}>
              <LocaleLink
                href={`/use-cases/${item.slug}`}
                className="group flex items-baseline gap-3"
              >
                <span className="w-7 shrink-0 font-mono text-[14px] tabular-nums text-faint group-hover:text-ink">
                  {rankLabel(item.rank)}
                </span>
                <span className="min-w-0">
                  <span className="block text-[20px] font-medium tracking-tight text-ink group-hover:text-accent">
                    {scenario.title}
                  </span>
                  <span className="mt-1.5 block text-[15px] leading-6 text-mute">{scenario.oneLiner}</span>
                </span>
              </LocaleLink>
            </li>
          );
        }

        return (
          <li key={item.slug}>
            <LocaleLink
              href={`/use-cases/${item.slug}`}
              className="group grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline gap-4 py-6 sm:grid-cols-[4rem_minmax(0,1fr)_auto]"
            >
              <span className="font-mono text-[20px] tabular-nums tracking-tight text-faint group-hover:text-ink sm:text-[24px]">
                {rankLabel(item.rank)}
              </span>
              <span className="min-w-0">
                <span className="block text-[18px] font-medium tracking-tight text-ink group-hover:text-accent md:text-[22px]">
                  {scenario.title}
                </span>
                <span className="mt-1.5 block max-w-2xl text-[14px] leading-6 text-mute">{scenario.oneLiner}</span>
              </span>
              <span className="hidden text-[13px] text-faint group-hover:text-ink sm:block" aria-hidden>
                {t("useCases.open")} →
              </span>
            </LocaleLink>
          </li>
        );
      })}
    </ol>
  );
}
