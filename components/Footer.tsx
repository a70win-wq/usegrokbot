"use client";

import { useI18n } from "@/lib/i18n/locale";
import { BotFace, botColorFor } from "./BotFace";
import { GetGrokBot } from "./GetGrokBot";
import { GitHubStar } from "./GitHubStar";
import { LocaleLink } from "./LocaleLink";

export function Footer({ stars }: { stars?: number | null }) {
  const { t, locale } = useI18n();

  const links = [
    { href: "/", label: t("nav.discover") },
    { href: "/use-cases", label: t("nav.useCases") },
    { href: "/templates", label: t("nav.templates") },
    { href: "/roles", label: t("nav.official") },
    { href: "/community", label: t("trust.community") },
    { href: "/articles", label: t("nav.articles") },
    { href: "/bookmarks", label: t("nav.bookmarks") },
    { href: "/submit", label: t("nav.submitShort") },
  ];

  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto max-w-[1240px] px-5 py-10 md:px-8 md:py-12">
        <LocaleLink href="/" className="inline-flex items-center gap-2 text-[15px] font-medium text-ink">
          <BotFace size={18} color={botColorFor("usegrokbot")} />
          UseGrokBot
        </LocaleLink>

        <nav
          className="mt-5 grid grid-cols-2 gap-x-8 gap-y-1 text-[15px] text-mute sm:flex sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3"
          aria-label="Footer"
        >
          {links.map((item) => (
            <LocaleLink
              key={item.href}
              href={item.href}
              className="flex min-h-10 items-center hover:text-ink sm:min-h-0"
            >
              {item.label}
            </LocaleLink>
          ))}
        </nav>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1 text-[15px] text-mute sm:mt-5">
          <span className="flex min-h-10 items-center sm:min-h-0">
            <GetGrokBot variant="link" />
          </span>
          <span className="flex min-h-10 items-center sm:min-h-0">
            <GitHubStar stars={stars} />
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-[12px] leading-5 text-faint sm:flex-row sm:flex-wrap sm:gap-x-4">
          <a href="https://github.com/jeremy-prt/bloub" className="hover:text-mute" rel="noreferrer">
            {t("bot.credit")}
          </a>
          <a href="https://github.com/Alain00/blobatar" className="hover:text-mute" rel="noreferrer">
            {locale === "ja" ? "コミュニティの Blob は Blobatar を使用" : "Community blobs powered by Blobatar"}
          </a>
        </div>
      </div>
    </footer>
  );
}
