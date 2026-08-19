"use client";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SeoGuide } from "@/components/SeoGuide";
import { UseCasesExplorer } from "@/components/UseCasesExplorer";
import { seoForCategory } from "@/data/seo";
import type { Category } from "@/data/types";
import type { UseCase } from "@/data/types";
import { localizeCategory, useI18n } from "@/lib/i18n";

export function CategoryDetailView({ category, items }: { category: Category; items: UseCase[] }) {
  const { locale, t } = useI18n();
  const item = localizeCategory(category, locale);

  return (
    <div className="mx-auto max-w-[1120px] px-5 py-12 md:px-8 md:py-16">
      <Breadcrumbs items={[{ href: "/categories", label: t("nav.categories") }, { label: item.name }]} />
      <h1 className="mt-6 text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">
        {t("pages.categoryHeading", { name: item.name })}
      </h1>
      <p className="mt-3 max-w-2xl text-base text-mute">{item.description}</p>
      <div className="mt-8">
        <UseCasesExplorer items={items} lockedCategory={category.slug} />
      </div>
      {seoForCategory(category.slug) ? <SeoGuide guide={seoForCategory(category.slug)!} /> : null}
    </div>
  );
}
