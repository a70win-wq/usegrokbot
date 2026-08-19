"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-[640px] px-5 py-24 text-center">
      <h1 className="text-3xl font-medium tracking-tight text-ink">{t("pages.notFoundTitle")}</h1>
      <p className="mt-3 text-mute">{t("pages.notFoundBody")}</p>
      <Link
        href="/use-cases"
        className="accent-gradient mt-8 inline-flex h-11 items-center rounded-[10px] px-5 text-sm font-medium text-inverse"
      >
        {t("pages.explore")}
      </Link>
    </div>
  );
}
