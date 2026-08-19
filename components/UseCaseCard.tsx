"use client";

import { LocaleLink } from "@/components/LocaleLink";
import type { AppSlug, UseCase } from "@/data/types";
import { formatVerifiedDate, verificationFor } from "@/data/verification";
import { categoryFor, localizeUseCase, useI18n } from "@/lib/i18n";
import { AppPills } from "./AppPills";
import { BotFace, botColorFor } from "./BotFace";
import { SaveButton } from "./SaveButton";
import { StatusBadge } from "./StatusBadge";

export function UseCaseCard({
  useCase,
  highlightApp,
}: {
  useCase: UseCase;
  highlightApp?: AppSlug;
}) {
  const { locale, t } = useI18n();
  const item = localizeUseCase(useCase, locale);
  const category = categoryFor(item.category, locale);
  const trust = verificationFor(useCase.slug);
  const localeTag = locale === "en" ? "en" : locale;

  return (
    <article className="spring-lift group relative flex h-full flex-col rounded-2xl border border-line bg-card p-5 hover:border-line-strong">
      <div className="flex items-start justify-between gap-3">
        <BotFace size={28} color={botColorFor(useCase.slug)} />
        <div className="relative z-10 flex items-center gap-1">
          <StatusBadge status={trust.status} label={t(`trust.${trust.status}`)} />
          <SaveButton slug={useCase.slug} title={item.title} />
        </div>
      </div>
      <p className="mt-4 text-[11px] font-medium tracking-[0.08em] text-faint uppercase">{category.name}</p>
      <h3 className="mt-1 text-[16px] leading-snug font-medium tracking-tight text-ink">
        <LocaleLink href={`/use-cases/${useCase.slug}`} className="after:absolute after:inset-0">
          {item.title}
        </LocaleLink>
      </h3>
      <p className="relative mt-2 line-clamp-2 text-[13px] leading-6 text-mute">{item.shortDescription}</p>
      <div className="relative mt-4">
        <AppPills useCase={useCase} highlight={highlightApp} />
      </div>
      <p className="relative mt-3 text-[12px] text-faint">
        {t(`difficulty.${useCase.difficulty}`)} · {t(`schedule.${useCase.schedule}`)} ·{" "}
        {t("meta.setup", { n: useCase.setupTime.replace(" min", "") })}
      </p>
      <div className="relative mt-auto flex items-end justify-between pt-5">
        <span className="text-[13px] text-accent">{t("pages.viewUseCase")}</span>
        <span className="text-[11px] text-faint">
          {t("trust.verified", { date: formatVerifiedDate(trust.lastVerified, localeTag) })}
        </span>
      </div>
    </article>
  );
}
