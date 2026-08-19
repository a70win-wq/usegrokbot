"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { messages, type Messages } from "./messages";
import { STORAGE_KEY, localeHtml, type Locale } from "./types";

type Vars = Record<string, string | number>;

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string, vars?: Vars) => string;
  list: (path: string) => readonly string[];
  messages: Messages;
};

const I18nContext = createContext<I18nValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "zh-Hant" || value === "zh-Hans";
}

export function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(stored)) return stored;
  const language = window.navigator.language || "";
  if (/zh[-_](HK|TW|MO|Hant)/i.test(language)) return "zh-Hant";
  if (/^zh/i.test(language)) return "zh-Hans";
  return "en";
}

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
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  useEffect(() => {
    document.documentElement.lang = localeHtml[locale];
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = localeHtml[next];
  }, []);

  const value = useMemo<I18nValue>(() => {
    const pack = messages[locale];
    return {
      locale,
      setLocale,
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
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used within LocaleProvider");
  return value;
}
