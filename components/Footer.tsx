"use client";

import { useI18n } from "@/lib/i18n";
import { BotFace, botColorFor } from "./BotFace";
import { LocaleLink } from "./LocaleLink";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-[1240px] flex-col px-5 py-12 md:px-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-mute">
          <LocaleLink href="/" className="flex items-center gap-2 text-ink">
            <BotFace size={18} color={botColorFor("usegrokbot")} />
            UseGrokBot
          </LocaleLink>
          <LocaleLink href="/discover" className="hover:text-ink">
            {t("nav.discover")}
          </LocaleLink>
          <LocaleLink href="/use-cases" className="hover:text-ink">
            {t("nav.useCases")}
          </LocaleLink>
          <LocaleLink href="/categories" className="hover:text-ink">
            {t("nav.categories")}
          </LocaleLink>
          <LocaleLink href="/apps" className="hover:text-ink">
            {t("nav.apps")}
          </LocaleLink>
          <LocaleLink href="/prompts" className="hover:text-ink">
            {t("nav.prompts")}
          </LocaleLink>
          <LocaleLink href="/learn" className="hover:text-ink">
            {t("nav.learn")}
          </LocaleLink>
          <LocaleLink href="/submit" className="hover:text-ink">
            {t("nav.submitShort")}
          </LocaleLink>
        </div>
      </div>
    </footer>
  );
}
