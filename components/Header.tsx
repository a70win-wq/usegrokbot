"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import { stripLocalePrefix } from "@/lib/i18n/paths";
import { BotFace, botColorFor } from "./BotFace";
import { LanguageSwitch } from "./LanguageSwitch";
import { LocaleLink } from "./LocaleLink";
import { useSaved } from "./saved";

export function Header() {
  const pathname = usePathname();
  const path = stripLocalePrefix(pathname);
  const { slugs } = useSaved();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const nav = [
    { href: "/use-cases", label: t("nav.useCases") },
    { href: "/prompts", label: t("nav.prompts") },
    { href: "/categories", label: t("nav.categories") },
    { href: "/apps", label: t("nav.apps") },
    { href: "/learn", label: t("nav.learn") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-[1120px] items-center justify-between px-5 md:px-8">
        <LocaleLink href="/" className="flex items-center gap-2 text-[15px] font-medium tracking-tight text-ink">
          <BotFace size={18} color={botColorFor("usegrokbot")} />
          UseGrokBot
        </LocaleLink>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = path === item.href || path.startsWith(`${item.href}/`);
            return (
              <LocaleLink
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-[13px] text-mute transition hover:text-ink",
                  active && "text-ink",
                )}
              >
                {item.label}
              </LocaleLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitch />
          <LocaleLink
            href="/saved"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-[13px] text-mute hover:text-ink"
          >
            <Heart className="size-3.5" strokeWidth={1.75} />
            <span className="hidden sm:inline">{t("nav.saved")}</span>
            {slugs.length > 0 ? <span className="font-mono text-[11px] text-faint">{slugs.length}</span> : null}
          </LocaleLink>
          <LocaleLink
            href="/submit"
            className="hidden h-9 items-center rounded-lg border border-line px-3 text-[13px] text-mute hover:border-line-strong hover:text-ink sm:inline-flex"
          >
            {t("nav.submit")}
          </LocaleLink>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg text-mute lg:hidden"
            aria-expanded={open}
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-elevated px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <LocaleLink
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-sm text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </LocaleLink>
            ))}
            <LocaleLink href="/submit" className="rounded-lg px-3 py-3 text-sm text-ink" onClick={() => setOpen(false)}>
              {t("nav.submit")}
            </LocaleLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
