"use client";

import { UseCaseList } from "@/components/UseCaseList";
import { moreScenarios, scenarios, topScenarios } from "@/data/scenarios";
import { useI18n } from "@/lib/i18n";

export function UseCasesView() {
  const { t } = useI18n();
  const rest = moreScenarios();

  return (
    <div className="mx-auto max-w-[800px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">
        {t("useCases.allTitle")}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-mute">
        {t("useCases.allBody", { n: scenarios.length })}
      </p>
      <p className="mt-3 text-[13px] text-faint">{t("useCases.count", { n: scenarios.length })}</p>
      <div className="mt-10">
        <UseCaseList items={topScenarios()} />
      </div>
      {rest.length ? (
        <section className="mt-16">
          <h2 className="text-[24px] font-medium tracking-tight text-ink">{t("useCases.moreTitle")}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-mute">{t("useCases.moreBody")}</p>
          <div className="mt-8">
            <UseCaseList items={rest} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
