"use client";

import { CensusNumber } from "@/components/PostCensus";
import { TemplateList } from "@/components/TemplateList";
import { templates } from "@/data/templates";
import { useI18n } from "@/lib/i18n";

export function TemplatesView() {
  const { t } = useI18n();

  if (!templates.length) {
    return (
      <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
        <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">
          {t("templates.allTitle")}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-mute">{t("templates.empty")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="flex flex-wrap items-baseline gap-x-3 text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">
        <span>{t("templates.allTitle")}</span>
        <CensusNumber accessible total={templates.length} className="text-[1em] leading-none" />
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-mute">
        {t("templates.allBody", { n: templates.length })}
      </p>
      <div className="mt-10">
        <TemplateList />
      </div>
    </div>
  );
}
