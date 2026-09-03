"use client";

import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { LocaleLink } from "@/components/LocaleLink";
import { CensusNumber } from "@/components/PostCensus";
import { TemplateList } from "@/components/TemplateList";
import {
  templateCategorySlugs,
  templates,
  templatesForCategory,
  type TemplateCategorySlug,
} from "@/data/templates";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";

export function TemplatesView({
  showIdentityBrowse = false,
  browseLabel,
}: {
  showIdentityBrowse?: boolean;
  browseLabel?: string;
} = {}) {
  const { t } = useI18n();
  const [category, setCategory] = useState<TemplateCategorySlug | "all">("all");
  const items = useMemo(() => templatesForCategory(category), [category]);

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
      {showIdentityBrowse && browseLabel ? (
        <LocaleLink
          href="/templates"
          className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-[10px] text-sm font-medium text-mute hover:text-ink"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {browseLabel}
        </LocaleLink>
      ) : null}
      <h1 className="flex flex-wrap items-baseline gap-x-3 text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">
        <span>{t("templates.allTitle")}</span>
        <CensusNumber accessible total={items.length} className="text-[1em] leading-none" />
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-mute">
        {t("templates.allBody", { n: items.length })}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Chip active={category === "all"} onClick={() => setCategory("all")} label={t("templates.catAll")} />
        {templateCategorySlugs.map((item) => (
          <Chip
            key={item}
            active={category === item}
            onClick={() => setCategory(item)}
            label={t(`templates.cat${item.charAt(0).toUpperCase()}${item.slice(1)}`)}
          />
        ))}
      </div>
      <div className="mt-10">
        <TemplateList key={category} items={items} />
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
        "inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-[13px] transition",
        active ? "border-accent text-ink" : "border-line text-mute hover:border-line-strong hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}
