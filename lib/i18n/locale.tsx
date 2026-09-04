"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { messages, type Messages } from "./messages";
import {
  DEFAULT_URL_LOCALE,
  LOCALE_COOKIE,
  absoluteUrl,
  htmlLang,
  localeToUrl,
  urlLocaleFromPath,
  urlToLocale,
  withLocale,
  type UrlLocale,
} from "./paths";
import { STORAGE_KEY, type Locale } from "./types";

type Vars = Record<string, string | number>;

type I18nValue = {
  locale: Locale;
  urlLocale: UrlLocale;
  setLocale: (locale: Locale) => void;
  localizeHref: (path: string) => string;
  absoluteHref: (path: string) => string;
  t: (path: string, vars?: Vars) => string;
  list: (path: string) => readonly string[];
  messages: Messages;
};

const I18nContext = createContext<I18nValue | null>(null);

function lookup(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, source);
}

function interpolate(template: string, vars?: Vars) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] === undefined ? `{${key}}` : String(vars[key]),
  );
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const urlLocale = urlLocaleFromPath(pathname) ?? DEFAULT_URL_LOCALE;
  const locale = urlToLocale[urlLocale];

  useEffect(() => {
    document.documentElement.lang = htmlLang[urlLocale];
    document.cookie = `${LOCALE_COOKIE}=${urlLocale}; path=/; max-age=31536000; samesite=lax`;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale, urlLocale]);

  const setLocale = useCallback(
    (next: Locale) => {
      const nextUrl = localeToUrl[next];
      window.localStorage.setItem(STORAGE_KEY, next);
      document.cookie = `${LOCALE_COOKIE}=${nextUrl}; path=/; max-age=31536000; samesite=lax`;
      router.push(withLocale(`${pathname}${window.location.search}`, nextUrl));
    },
    [pathname, router],
  );

  const value = useMemo<I18nValue>(() => {
    const pack = messages[locale];
    return {
      locale,
      urlLocale,
      setLocale,
      localizeHref: (path) => withLocale(path, urlLocale),
      absoluteHref: (path) => absoluteUrl(path, urlLocale),
      messages: pack,
      t(path, vars) {
        const found = lookup(pack, path);
        if (typeof found === "string") return interpolate(found, vars);
        const fallback = lookup(messages.en, path);
        return typeof fallback === "string" ? interpolate(fallback, vars) : path;
      },
      list(path) {
        const found = lookup(pack, path);
        if (Array.isArray(found)) return found as readonly string[];
        const fallback = lookup(messages.en, path);
        return Array.isArray(fallback) ? (fallback as readonly string[]) : [];
      },
    };
  }, [locale, setLocale, urlLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used within LocaleProvider");
  return value;
}
