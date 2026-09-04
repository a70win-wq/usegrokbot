"use client";

import { useMemo, useState } from "react";
import { CensusNumber } from "@/components/PostCensus";
import { TemplateList } from "@/components/TemplateList";
import { TemplatesModeNav } from "@/components/TemplatesModeNav";
import {
  templateCategorySlugs,
  templates,
  templatesForFilters,
  type TemplateCategorySlug,
} from "@/data/templates";
import {
  interpolateTemplateHubCopy,
  templateHubUiCopy,
  type TemplateTypeFilter,
} from "@/data/template-types";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";

export function TemplatesView() {
  const { locale, t, urlLocale } = useI18n();
  const copy = templateHubUiCopy[locale];
  const [category, setCategory] = useState<TemplateCategorySlug | "all">("all");
  const [templateType, setTemplateType] = useState<TemplateTypeFilter>("all");
  const [hasFiltered, setHasFiltered] = useState(false);
  const items = useMemo(
    () => templatesForFilters(category, templateType),
    [category, templateType],
  );
  const isFiltered = category !== "all" || templateType !== "all";
  const description = isFiltered
    ? interpolateTemplateHubCopy(copy.filteredBody, { n: items.length })
    : t("templates.allBody", { n: items.length });

  function selectTemplateType(next: TemplateTypeFilter) {
    if (next === templateType) return;
    setHasFiltered(true);
    setTemplateType(next);
  }

  function selectCategory(next: TemplateCategorySlug | "all") {
    if (next === category) return;
    setHasFiltered(true);
    setCategory(next);
  }

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
      <TemplatesModeNav active="all" locale={locale} urlLocale={urlLocale} />

      <h1 className="flex flex-wrap items-baseline gap-x-3 pt-10 text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink md:pt-12">
        <span>{t("templates.allTitle")}</span>
        <CensusNumber accessible total={items.length} className="text-[1em] leading-none" />
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-mute">{description}</p>

      <div className="mt-7 space-y-5">
        <fieldset className="w-full min-w-0">
          <legend className="mb-2 text-xs font-medium text-faint">{copy.typeLabel}</legend>
          <div className="flex flex-wrap gap-2">
            <Chip
              active={templateType === "all"}
              onClick={() => selectTemplateType("all")}
              label={copy.typeAll}
            />
            <Chip
              active={templateType === "single"}
              onClick={() => selectTemplateType("single")}
              label={copy.typeSingle}
            />
            <Chip
              active={templateType === "team"}
              onClick={() => selectTemplateType("team")}
              label={copy.typeTeam}
            />
          </div>
        </fieldset>

        <fieldset className="w-full min-w-0">
          <legend className="mb-2 text-xs font-medium text-faint">{t("filters.category")}</legend>
          <div className="flex flex-wrap gap-2">
            <Chip
              active={category === "all"}
              onClick={() => selectCategory("all")}
              label={t("templates.catAll")}
            />
            {templateCategorySlugs.map((item) => (
              <Chip
                key={item}
                active={category === item}
                onClick={() => selectCategory(item)}
                label={t(`templates.cat${item.charAt(0).toUpperCase()}${item.slice(1)}`)}
              />
            ))}
          </div>
        </fieldset>
      </div>

      <div
        key={`${templateType}:${category}`}
        className={cn("mt-10", hasFiltered && "template-results-reveal")}
      >
        {items.length ? (
          <TemplateList items={items} />
        ) : (
          <p className="rounded-2xl border border-line bg-card p-6 text-[15px] leading-6 text-mute">
            {copy.filterEmpty}
          </p>
        )}
      </div>
    </div>
  );
}

function Chip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-[15px] font-medium transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
        active
          ? "border-accent bg-accent-soft text-accent"
          : "border-line text-mute hover:border-line-strong hover:bg-elevated hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}
