"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Languages, Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n/locale";
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const nav: NavItem[] = [
    {
      href: "/templates",
      label: t("nav.templates"),
      match: (current: string) => current.startsWith("/templates"),
    },
    {
      href: "/use-cases",
      label: t("nav.useCases"),
      match: (current: string) => current.startsWith("/use-cases"),
    },
    {
      href: "/bookmarks",
      label: t("nav.bookmarks"),
      match: (current: string) => current.startsWith("/bookmarks"),
    },
    { href: "/submit", label: t("nav.submitShort") },
  ];
  const menuItems = nav.filter((item) => item.href !== "/submit");

  function closeMenu(returnFocus = false) {
    setOpen(false);
    if (returnFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  }

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeMenu(true);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-xl">
      <div className="relative z-20 mx-auto flex h-14 max-w-[1240px] items-center justify-between px-5 md:px-8">
        <LocaleLink
          href="/"
          className="flex items-center gap-2.5 text-[16px] font-medium tracking-tight text-ink"
        >
          <BotFace size={20} color={botColorFor("usegrokbot")} />
          UseGrokBot
        </LocaleLink>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-[11px] border border-line bg-elevated/70 p-1 xl:flex"
          aria-label={t("nav.menuLabel")}
        >
          {nav.map((item) => {
            const active = isNavItemActive(item, path);
            return (
              <LocaleLink
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 items-center rounded-lg px-3.5 text-[15px] font-medium text-mute transition-colors hover:bg-card hover:text-ink",
                  active && "bg-accent-soft text-accent",
                )}
              >
                {item.label}
              </LocaleLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          {SEARCH_UI_ENABLED ? <HeaderSearch onOpen={() => setOpen(false)} /> : null}
          <div className="hidden xl:block">
            <GetGrokBot className="h-10 px-3 text-[15px]" />
          </div>
          <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-line xl:block" />
          <ThemeToggle />
          <div className="hidden xl:block">
            <LanguageSwitch />
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-[10px] text-mute transition-colors hover:bg-elevated hover:text-ink xl:hidden"
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
        <>
          <button
            type="button"
            aria-label={t("nav.closeMenu")}
            className="absolute inset-x-0 top-full z-0 h-[calc(100dvh-3.5rem)] bg-black/20 backdrop-blur-[1px] xl:hidden"
            onClick={() => closeMenu(true)}
          />
          <div
            id="mobile-navigation"
            className="absolute inset-x-0 top-full z-10 max-h-[calc(100dvh-3.5rem)] overflow-x-hidden overflow-y-auto border-b border-line bg-canvas px-5 py-4 shadow-[var(--shadow-menu)] xl:hidden"
          >
            <div className="mx-auto max-w-[1176px]">
              <nav aria-label={t("nav.menuLabel")}>
                <ul className="space-y-1">
                  {menuItems.map((item) => {
                    const active = isNavItemActive(item, path);
                    return (
                      <li key={item.href}>
                        <LocaleLink
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex min-h-12 items-center justify-between rounded-[10px] px-4 text-[15px] font-medium transition-colors hover:bg-elevated hover:text-ink",
                            active ? "bg-accent-soft text-accent" : "text-ink",
                          )}
                          onClick={() => closeMenu()}
                        >
                          <span>{item.label}</span>
                          <ArrowRight
                            aria-hidden="true"
                            className={cn("size-4", active ? "text-accent" : "text-faint")}
                            strokeWidth={1.75}
                          />
                        </LocaleLink>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-4 grid gap-2">
                  <LocaleLink
                    href="/submit"
                    aria-current={path.startsWith("/submit") ? "page" : undefined}
                    className={cn(
                      "flex min-h-12 items-center justify-between rounded-[10px] border border-line bg-card px-4 text-[15px] font-medium text-ink transition-colors hover:border-line-strong",
                      path.startsWith("/submit") && "border-accent/40 bg-accent-soft text-accent",
                    )}
                    onClick={() => closeMenu()}
                  >
                    <span>{t("nav.submit")}</span>
                    <ArrowRight aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />
                  </LocaleLink>
                  <GetGrokBot
                    variant="outline"
                    className="min-h-12 w-full justify-between bg-card px-4 text-[15px]"
                  />
                </div>
              </nav>

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
                <span className="inline-flex items-center gap-2 text-[15px] text-mute">
                  <Languages aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  {t("lang.label")}
                </span>
                <LanguageSwitch variant="menu" onSelect={() => closeMenu()} />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}

function HeaderSearch({ onOpen }: { onOpen?: () => void }) {
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
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) onOpen?.();
        }}
        className="inline-flex size-11 items-center justify-center rounded-[10px] text-mute transition-colors hover:bg-elevated hover:text-ink xl:size-10"
      >
        <Search className="size-4" strokeWidth={1.75} />
      </button>
      {open ? (
        <div className="fixed inset-x-5 top-[4.25rem] z-50 xl:absolute xl:inset-x-auto xl:top-[calc(100%+8px)] xl:right-0 xl:w-80">
          <SearchBar variant="inline" autoFocus />
        </div>
      ) : null}
    </div>
  );
}
