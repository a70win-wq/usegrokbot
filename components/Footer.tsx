"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { BotFace, botColorFor } from "./BotFace";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-8 px-5 py-12 md:px-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-mute">
          <Link href="/" className="flex items-center gap-2 text-ink">
            <BotFace size={18} color={botColorFor("usegrokbot")} />
            UseGrokBot
          </Link>
          <Link href="/use-cases" className="hover:text-ink">
            {t("nav.useCases")}
          </Link>
          <Link href="/categories" className="hover:text-ink">
            {t("nav.categories")}
          </Link>
          <Link href="/apps" className="hover:text-ink">
            {t("nav.apps")}
          </Link>
          <Link href="/prompts" className="hover:text-ink">
            {t("nav.prompts")}
          </Link>
          <Link href="/learn" className="hover:text-ink">
            {t("nav.learn")}
          </Link>
          <Link href="/submit" className="hover:text-ink">
            {t("nav.submitShort")}
          </Link>
        </div>
        <p className="max-w-3xl text-[12px] leading-5 text-faint">{t("footer.disclaimer")}</p>
      </div>
    </footer>
  );
}
