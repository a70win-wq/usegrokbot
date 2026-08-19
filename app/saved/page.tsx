"use client";

import Link from "next/link";
import { UseCaseCard } from "@/components/UseCaseCard";
import { useSaved } from "@/components/saved";
import { getUseCase } from "@/data/use-cases";
import { useI18n } from "@/lib/i18n";

export default function SavedPage() {
  const { slugs, ready } = useSaved();
  const { t } = useI18n();
  const items = slugs.map((slug) => getUseCase(slug)).filter(Boolean);

  return (
    <div className="mx-auto max-w-[1120px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">{t("pages.savedTitle")}</h1>
      <p className="mt-3 text-base text-mute">{t("pages.savedBody")}</p>
      {!ready ? (
        <p className="mt-10 text-sm text-faint">{t("pages.savedLoading")}</p>
      ) : items.length === 0 ? (
        <div className="mt-12 rounded-[14px] border border-line bg-card px-6 py-16 text-center">
          <p className="text-ink">{t("pages.savedEmpty")}</p>
          <Link
            href="/use-cases"
            className="accent-gradient mt-6 inline-flex h-11 items-center rounded-[10px] px-5 text-sm font-medium text-inverse"
          >
            {t("pages.explore")}
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (item ? <UseCaseCard key={item.slug} useCase={item} /> : null))}
        </div>
      )}
    </div>
  );
}
