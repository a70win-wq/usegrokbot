export const locales = ["zh-Hant", "zh-Hans", "en", "ja"] as const;

export type Locale = (typeof locales)[number];
export type ChineseLocale = "zh-Hant" | "zh-Hans";

export const localeLabels: Record<Locale, string> = {
  "zh-Hant": "繁",
  "zh-Hans": "简",
  en: "EN",
  ja: "日",
};

export const localeHtml: Record<Locale, string> = {
  "zh-Hant": "zh-Hant",
  "zh-Hans": "zh-Hans",
  en: "en",
  ja: "ja",
};

export const STORAGE_KEY = "usegrokbot:locale";
