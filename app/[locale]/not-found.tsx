"use client";

import { BlobatarAvatar } from "@/components/BlobatarAvatar";
import { LocaleLink } from "@/components/LocaleLink";
import { useI18n } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-[640px] px-5 py-24 text-center">
      <BlobatarAvatar name="usegrokbot-lost-bot" size={104} expression="sad" className="mx-auto mb-6" />
      <h1 className="text-3xl font-medium tracking-tight text-ink">{t("pages.notFoundTitle")}</h1>
      <p className="mt-3 text-mute">{t("pages.notFoundBody")}</p>
      <LocaleLink
        href="/use-cases"
        className="accent-gradient mt-8 inline-flex h-11 items-center rounded-[10px] px-5 text-sm font-medium text-inverse"
      >
        {t("pages.explore")}
      </LocaleLink>
    </div>
  );
}
