export const locales = ["zh-Hant", "zh-Hans", "en"] as const;

export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  "zh-Hant": "繁",
  "zh-Hans": "简",
  en: "EN",
};

export const localeHtml: Record<Locale, string> = {
  "zh-Hant": "zh-Hant",
  "zh-Hans": "zh-Hans",
  en: "en",
};

export const STORAGE_KEY = "usegrokbot:locale";
