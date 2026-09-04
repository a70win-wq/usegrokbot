import { site } from "../site";
import type { Locale } from "./types";

export const URL_LOCALES = ["en", "zh-hk", "zh-cn", "ja"] as const;

export const URL_LOCALE_PATTERN = URL_LOCALES.join("|");

export type UrlLocale = (typeof URL_LOCALES)[number];

export const DEFAULT_URL_LOCALE: UrlLocale = "en";

export const LOCALE_COOKIE = "usegrokbot-locale";

export const urlToLocale: Record<UrlLocale, Locale> = {
  en: "en",
  "zh-hk": "zh-Hant",
  "zh-cn": "zh-Hans",
  ja: "ja",
};

export const localeToUrl: Record<Locale, UrlLocale> = {
  en: "en",
  "zh-Hant": "zh-hk",
  "zh-Hans": "zh-cn",
  ja: "ja",
};

export const htmlLang: Record<UrlLocale, string> = {
  en: "en",
  "zh-hk": "zh-HK",
  "zh-cn": "zh-CN",
  ja: "ja",
};

export const hreflang: Record<UrlLocale, string> = {
  en: "en",
  "zh-hk": "zh-HK",
  "zh-cn": "zh-CN",
  ja: "ja",
};

export const ogLocale: Record<UrlLocale, string> = {
  en: "en_US",
  "zh-hk": "zh_HK",
  "zh-cn": "zh_CN",
  ja: "ja_JP",
};

const URL_LOCALE_RE = new RegExp("^/(" + URL_LOCALE_PATTERN + ")(?=/|$)");

export function isUrlLocale(value: string): value is UrlLocale {
  return (URL_LOCALES as readonly string[]).includes(value);
}

export function parseUrlLocale(value: string | null | undefined): UrlLocale {
  return value && isUrlLocale(value) ? value : DEFAULT_URL_LOCALE;
}

export function urlLocaleFromPath(pathname: string): UrlLocale | null {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isUrlLocale(first) ? first : null;
}

export function stripLocalePrefix(pathname: string): string {
  const match = pathname.match(URL_LOCALE_RE);
  if (!match) return pathname || "/";
  const rest = pathname.slice(match[0].length);
  return rest || "/";
}

export function withLocale(href: string, urlLocale: UrlLocale): string {
  if (
    !href ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href;
  }

  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  if (withoutHash.startsWith("#") || href === "#") return href;

  const queryIndex = withoutHash.indexOf("?");
  const search = queryIndex >= 0 ? withoutHash.slice(queryIndex) : "";
  const pathname = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const stripped = stripLocalePrefix(normalized);
  const prefixed = stripped === "/" ? `/${urlLocale}` : `/${urlLocale}${stripped}`;
  return `${prefixed}${search}${hash}`;
}

export function absoluteUrl(path: string, urlLocale: UrlLocale): string {
  return `${site.url}${withLocale(path, urlLocale)}`;
}

export function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(URL_LOCALES.map((locale) => [hreflang[locale], absoluteUrl(path, locale)])),
    "x-default": absoluteUrl(path, DEFAULT_URL_LOCALE),
  };
}

export function detectUrlLocaleFromHeader(acceptLanguage: string | null | undefined): UrlLocale {
  const header = acceptLanguage ?? "";
  const ranges = header
    .split(",")
    .map((part, index) => {
      const [rawTag = "", ...parameters] = part.trim().split(";");
      const qParameter = parameters.find((parameter) => parameter.trim().toLowerCase().startsWith("q="));
      const quality = qParameter ? Number.parseFloat(qParameter.split("=")[1] ?? "") : 1;
      return {
        tag: rawTag.trim().replaceAll("_", "-").toLowerCase(),
        quality: Number.isFinite(quality) ? quality : 0,
        index,
      };
    })
    .filter((range) => range.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);

  const firstSupported = ranges.find(({ tag }) =>
    tag === "ja" ||
    tag.startsWith("ja-") ||
    tag === "zh" ||
    tag.startsWith("zh-") ||
    tag === "en" ||
    tag.startsWith("en-"),
  );

  if (firstSupported?.tag === "ja" || firstSupported?.tag.startsWith("ja-")) return "ja";

  // Preserve the existing Chinese-first fallback for non-Japanese visitors.
  if (/zh[-_](HK|TW|MO|Hant)/i.test(header)) return "zh-hk";
  if (/zh/i.test(header)) return "zh-cn";
  return DEFAULT_URL_LOCALE;
}

export function localeFromParams(locale: string): { urlLocale: UrlLocale; locale: Locale } {
  const urlLocale = parseUrlLocale(locale);
  return { urlLocale, locale: urlToLocale[urlLocale] };
}
