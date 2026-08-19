"use client";

import Link from "next/link";
import { appsBySlug } from "@/data/apps";
import type { UseCase } from "@/data/types";
import { categoryFor, localizeUseCase, useI18n } from "@/lib/i18n";
import { BotFace, botColorFor } from "./BotFace";
import { CopyButton } from "./CopyButton";
import { SaveButton } from "./SaveButton";

export function UseCaseCard({ useCase }: { useCase: UseCase }) {
  const { locale, t } = useI18n();
  const item = localizeUseCase(useCase, locale);
  const category = categoryFor(item.category, locale);

  return (
    <article className="spring-lift group relative flex h-full flex-col rounded-[16px] border border-line bg-card p-5 shadow-[0_1px_2px_rgb(0_0_0/0.04)] hover:border-line-strong hover:shadow-[0_10px_28px_rgb(0_0_0/0.06)]">
      <div className="flex items-center justify-between gap-3">
        <BotFace size={28} color={botColorFor(useCase.slug)} />
        <span className="rounded-full border border-line px-2 py-0.5 text-[11px] text-faint">{category.name}</span>
      </div>
      <h3 className="mt-4 text-[16px] leading-snug font-medium tracking-tight text-ink">
        <Link href={`/use-cases/${useCase.slug}`} className="after:absolute after:inset-0">
          {item.title}
        </Link>
      </h3>
      <p className="relative mt-2 line-clamp-2 text-[13px] leading-6 text-mute">{item.shortDescription}</p>
      <div className="relative mt-4 flex flex-wrap items-center gap-1.5 text-[11px] text-faint">
        {useCase.apps.slice(0, 2).map((app) => (
          <span key={app} className="rounded-full bg-elevated px-2 py-0.5">
            {appsBySlug[app].name}
          </span>
        ))}
        <span className="rounded-full bg-elevated px-2 py-0.5">{t(`difficulty.${useCase.difficulty}`)}</span>
        <span className="rounded-full bg-elevated px-2 py-0.5">{t(`schedule.${useCase.schedule}`)}</span>
      </div>
      <div className="relative z-10 mt-auto flex items-center justify-between pt-5">
        <SaveButton slug={useCase.slug} title={item.title} />
        <CopyButton text={useCase.prompt} />
      </div>
    </article>
  );
}
