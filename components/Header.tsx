"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Languages, Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import { stripLocalePrefix } from "@/lib/i18n/paths";
import { BotFace, botColorFor } from "./BotFace";
import { GetGrokBot } from "./GetGrokBot";
import { LanguageSwitch } from "./LanguageSwitch";
import { LocaleLink } from "./LocaleLink";
import { SEARCH_UI_ENABLED } from "@/lib/search";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";

type NavItem = {
  href: string;
  label: string;
  match?: (current: string) => boolean;
};

function isNavItemActive(item: NavItem, current: string) {
  return item.match
    ? item.match(current)
    : current === item.href || current.startsWith(`${item.href}/`);
}

export function Header() {
  const pathname = usePathname();
  const path = stripLocalePrefix(pathname);
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const nav: NavItem[] = [
    {
      href: "/",
      label: t("nav.discover"),
      match: (current: string) => current === "/" || current.startsWith("/discover"),
    },
    {
      href: "/use-cases",
      label: t("nav.useCases"),
      match: (current: string) => current.startsWith("/use-cases"),
    },
    {
      href: "/templates",
      label: t("nav.templates"),
      match: (current: string) => current.startsWith("/templates"),
    },
    {
      href: "/roles",
      label: t("nav.official"),
      match: (current: string) => current.startsWith("/roles"),
    },
    {
      href: "/categories",
      label: t("nav.categories"),
      match: (current: string) => current.startsWith("/categories"),
    },
    {
      href: "/rankings",
      label: t("nav.rankings"),
      match: (current: string) => current.startsWith("/rankings"),
    },
    {
      href: "/articles",
      label: t("nav.articles"),
      match: (current: string) => current.startsWith("/articles"),
    },
    { href: "/submit", label: t("nav.submitShort") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-[1240px] items-center justify-between px-5 md:px-8">
        <LocaleLink href="/" className="flex items-center gap-2 text-[15px] font-medium tracking-tight text-ink">
          <BotFace size={18} color={botColorFor("usegrokbot")} />
          UseGrokBot
        </LocaleLink>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = isNavItemActive(item, path);
            return (
              <LocaleLink
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
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
          {SEARCH_UI_ENABLED ? <HeaderSearch /> : null}
          <GetGrokBot />
          <ThemeToggle />
          <div className="hidden xl:block">
            <LanguageSwitch />
          </div>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg text-mute xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-navigation"
          className="border-t border-line bg-elevated px-5 py-4 shadow-[var(--shadow-menu)] xl:hidden"
        >
          <nav aria-label={t("nav.menuLabel")}>
            <div className="grid grid-cols-2 gap-x-6">
              {[
                { label: t("nav.exploreGroup"), items: nav.slice(0, 4), start: 1 },
                { label: t("nav.moreGroup"), items: nav.slice(4, 7), start: 5 },
              ].map((group) => (
                <div key={group.label} className="min-w-0">
                  <p className="mb-1 px-1 text-[11px] font-medium tracking-[0.12em] text-faint uppercase">
                    {group.label}
                  </p>
                  <ul className="border-t border-line">
                    {group.items.map((item, index) => {
                      const active = isNavItemActive(item, path);
                      return (
                        <li key={item.href} className="border-b border-line">
                          <LocaleLink
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex min-h-11 items-center gap-2 px-1 text-[14px] transition-colors hover:text-accent",
                              active ? "font-medium text-accent" : "text-ink",
                            )}
                            onClick={() => setOpen(false)}
                          >
                            <span
                              aria-hidden="true"
                              className={cn(
                                "w-5 shrink-0 text-[10px] tabular-nums",
                                active ? "text-accent" : "text-faint",
                              )}
                            >
                              {String(group.start + index).padStart(2, "0")}
                            </span>
                            <span className="min-w-0">{item.label}</span>
                            {active ? (
                              <span aria-hidden="true" className="ml-auto size-1.5 shrink-0 rounded-full bg-accent" />
                            ) : null}
                          </LocaleLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <LocaleLink
                href="/submit"
                aria-current={path.startsWith("/submit") ? "page" : undefined}
                className="flex h-11 min-w-0 flex-1 items-center justify-between rounded-[10px] border border-line bg-card px-4 text-[13px] font-medium text-ink transition-colors hover:border-line-strong"
                onClick={() => setOpen(false)}
              >
                <span>{t("nav.submit")}</span>
                <ArrowRight aria-hidden="true" className="size-3.5 shrink-0 text-mute" strokeWidth={1.75} />
              </LocaleLink>
              <GetGrokBot
                variant="outline"
                className="min-w-0 flex-1 justify-center bg-card px-3 text-[13px]"
              />
            </div>
          </nav>

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3">
            <span className="inline-flex items-center gap-1.5 text-[12px] text-mute">
              <Languages aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
              {t("lang.label")}
            </span>
            <LanguageSwitch variant="menu" onSelect={() => setOpen(false)} />
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
          <SearchBar variant="inline" autoFocus />
        </div>
      ) : null}
    </div>
  );
}
