"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import { stripLocalePrefix } from "@/lib/i18n/paths";
import { BotFace, botColorFor } from "./BotFace";
import { LanguageSwitch } from "./LanguageSwitch";
import { LocaleLink } from "./LocaleLink";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import { useSaved } from "./saved";

export function Header() {
  const pathname = usePathname();
  const path = stripLocalePrefix(pathname);
  const { slugs } = useSaved();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const nav = [
    {
      href: "/",
      label: t("nav.discover"),
      match: (current: string) => current === "/" || current.startsWith("/discover"),
    },
    { href: "/use-cases", label: t("nav.workflows") },
    {
      href: "/integrations",
      label: t("nav.integrations"),
      match: (current: string) => current.startsWith("/integrations") || current.startsWith("/apps"),
    },
    { href: "/submit", label: t("nav.submitShort") },
    { href: "/learn/what-is-grok-bot", label: t("nav.about"), match: (current: string) => current.startsWith("/learn") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-[1240px] items-center justify-between px-5 md:px-8">
        <LocaleLink href="/" className="flex items-center gap-2 text-[15px] font-medium tracking-tight text-ink">
          <BotFace size={18} color={botColorFor("usegrokbot")} />
          UseGrokBot
        </LocaleLink>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = "match" in item && item.match
              ? item.match(path)
              : path === item.href || path.startsWith(`${item.href}/`);
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
          <HeaderSearch />
          <ThemeToggle />
          <div className="hidden lg:block">
            <LanguageSwitch />
          </div>
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
            <LocaleLink href="/saved" className="rounded-lg px-3 py-3 text-sm text-ink" onClick={() => setOpen(false)}>
              {t("nav.saved")}
              {slugs.length > 0 ? <span className="ml-2 font-mono text-[11px] text-faint">{slugs.length}</span> : null}
            </LocaleLink>
          </nav>
          <div className="mt-4">
            <LanguageSwitch />
          </div>
        </div>
      ) : null}
    </header>
  );
}

function HeaderSearch() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(event: MouseEvent) {
      if (!boxRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={boxRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-label={t("search.label")}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-9 items-center justify-center rounded-lg text-mute hover:text-ink"
      >
        <Search className="size-3.5" strokeWidth={1.75} />
      </button>
      {open ? (
        <div className="absolute top-[calc(100%+8px)] right-0 z-50 w-[min(calc(100vw-2rem),20rem)]">
          <SearchBar variant="inline" destination="discover" autoFocus />
        </div>
      ) : null}
    </div>
  );
}
