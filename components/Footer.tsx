"use client";

import { useI18n } from "@/lib/i18n";
import { BotFace, botColorFor } from "./BotFace";
import { GetGrokBot } from "./GetGrokBot";
import { GitHubStar } from "./GitHubStar";
import { LocaleLink } from "./LocaleLink";

export function Footer({ stars }: { stars?: number | null }) {
  const { t } = useI18n();

  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-[1240px] flex-col px-5 py-12 md:px-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-mute">
          <LocaleLink href="/" className="flex items-center gap-2 text-ink">
            <BotFace size={18} color={botColorFor("usegrokbot")} />
            UseGrokBot
          </LocaleLink>
          <LocaleLink href="/" className="hover:text-ink">
            {t("nav.discover")}
          </LocaleLink>
          <LocaleLink href="/categories" className="hover:text-ink">
            {t("nav.categories")}
          </LocaleLink>
          <LocaleLink href="/learn" className="hover:text-ink">
            {t("nav.learn")}
          </LocaleLink>
          <LocaleLink href="/submit" className="hover:text-ink">
            {t("nav.submitShort")}
          </LocaleLink>
          <GetGrokBot variant="link" />
          <GitHubStar stars={stars} label="always" />
        </div>
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-faint">
          <a href="https://github.com/jeremy-prt/bloub" className="hover:text-mute" rel="noreferrer">
            {t("bot.credit")}
          </a>
          <a href="https://github.com/Alain00/blobatar" className="hover:text-mute" rel="noreferrer">
            Community blobs powered by Blobatar
          </a>
        </div>
      </div>
    </footer>
  );
}
