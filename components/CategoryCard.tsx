"use client";

import { LocaleLink } from "@/components/LocaleLink";
import type { Category } from "@/data/types";
import { localizeCategory, useI18n } from "@/lib/i18n";
import { BotFace, botColorFor } from "./BotFace";

export function CategoryCard({ category, count }: { category: Category; count: number }) {
  const { locale, t } = useI18n();
  const item = localizeCategory(category, locale);

  return (
    <LocaleLink
      href={`/categories/${category.slug}`}
      className="spring-lift rounded-[14px] border border-line bg-card p-5 hover:border-line-strong hover:bg-card-hover"
    >
      <BotFace size={28} color={botColorFor(category.slug)} paper="var(--card)" />
      <h3 className="mt-4 text-[16px] font-medium text-ink">{item.name}</h3>
      <p className="mt-2 text-sm leading-6 text-mute">{item.description}</p>
      <p className="mt-3 text-[12px] text-faint">{t("count.useCases", { n: count })}</p>
    </LocaleLink>
  );
}
