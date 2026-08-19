"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";
import { categories } from "@/data/categories";
import { useCases } from "@/data/use-cases";
import { cn } from "@/lib/cn";
import { localizeCategory, localizeUseCase, useI18n } from "@/lib/i18n";
import { searchUseCases } from "@/lib/search";

export default function PromptsPage() {
  const { locale, t } = useI18n();
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");

  const groups = [
    { id: "all", label: t("pages.groupAll") },
    { id: "sales", label: localizeCategory(categories.find((item) => item.slug === "sales")!, locale).name },
    { id: "marketing", label: localizeCategory(categories.find((item) => item.slug === "marketing")!, locale).name },
    { id: "research", label: localizeCategory(categories.find((item) => item.slug === "research")!, locale).name },
    { id: "content", label: t("pages.groupWriting") },
    { id: "operations", label: localizeCategory(categories.find((item) => item.slug === "operations")!, locale).shortName },
    { id: "coding", label: localizeCategory(categories.find((item) => item.slug === "coding")!, locale).name },
  ];

  const items = useMemo(() => {
    const localized = useCases.map((item) => localizeUseCase(item, locale));
    const searched = searchUseCases(localized, query, useCases);
    if (group === "all") return searched;
    if (group === "content") return searched.filter((item) => item.category === "content");
    return searched.filter((item) => item.category === group);
  }, [group, query, locale]);

  return (
    <div className="mx-auto max-w-[1120px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">{t("pages.promptsTitle")}</h1>
      <p className="mt-3 max-w-2xl text-base text-mute">{t("pages.promptsBody")}</p>

      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t("search.prompts")}
        className="mt-8 h-12 w-full max-w-xl rounded-full border border-line bg-elevated px-4 text-sm text-ink placeholder:text-faint focus:border-line-strong"
      />

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {groups.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setGroup(item.id)}
            className={cn(
              "h-8 shrink-0 rounded-full border px-3 text-[13px]",
              group === item.id
                ? "border-accent bg-accent-soft text-accent"
                : "border-line text-mute hover:text-ink",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {items.map((item) => {
          const source = useCases.find((useCase) => useCase.slug === item.slug) ?? item;
          return (
            <article key={item.slug} className="spring-lift flex flex-col rounded-[14px] border border-line bg-card p-5 hover:border-line-strong">
              <div className="text-[12px] text-faint">
                {localizeCategory(categories.find((category) => category.slug === item.category)!, locale).name}
              </div>
              <h2 className="mt-2 text-lg font-medium text-ink">
                <Link href={`/use-cases/${item.slug}`}>{item.title}</Link>
              </h2>
              <p className="mt-2 line-clamp-3 font-mono text-[12px] leading-5 text-mute">{source.prompt}</p>
              <div className="mt-4 flex items-center justify-between">
                <Link href={`/use-cases/${item.slug}`} className="text-[13px] text-accent">
                  {t("pages.viewUseCase")}
                </Link>
                <CopyButton text={source.prompt} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
