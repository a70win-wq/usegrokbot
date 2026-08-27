"use client";

import { UseCaseList } from "@/components/UseCaseList";
import { scenarios } from "@/data/scenarios";
import { useI18n } from "@/lib/i18n";

export function UseCasesView() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-[800px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">
        {t("useCases.title")}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-mute">{t("useCases.body")}</p>
      <p className="mt-3 text-[13px] text-faint">{t("useCases.count", { n: scenarios.length })}</p>
      <div className="mt-10">
        <UseCaseList />
      </div>
    </div>
  );
}
