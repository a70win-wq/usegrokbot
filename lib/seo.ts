import type { Metadata } from "next";
import { messages } from "@/lib/i18n/messages";
import {
  URL_LOCALES,
  absoluteUrl,
  languageAlternates,
  ogLocale,
  parseUrlLocale,
  urlToLocale,
  type UrlLocale,
} from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/types";
import { site } from "./site";

function messageAt(locale: Locale, path: string, vars?: Record<string, string | number>) {
  const found = path.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, messages[locale]);
  if (typeof found !== "string") return path;
  if (!vars) return found;
  return found.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] === undefined ? `{${key}}` : String(vars[key]),
  );
}

export function pageMeta({
  title,
  description,
  path,
  urlLocale,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  urlLocale: string | UrlLocale;
  index?: boolean;
}): Metadata {
  const locale = parseUrlLocale(urlLocale);
  const url = absoluteUrl(path, locale);
  return {
    title,
    description,
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: URL_LOCALES.filter((item) => item !== locale).map((item) => ogLocale[item]),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function translateMeta(urlLocale: string, key: string, vars?: Record<string, string | number>) {
  return messageAt(urlToLocale[parseUrlLocale(urlLocale)], key, vars);
}

export function messageMeta(
  urlLocale: string,
  {
    path,
    title,
    description,
    vars,
    index,
  }: {
    path: string;
    title: string;
    description: string;
    vars?: Record<string, string | number>;
    index?: boolean;
  },
): Metadata {
  const parsed = parseUrlLocale(urlLocale);
  const locale = urlToLocale[parsed];
  return pageMeta({
    title: messageAt(locale, title, vars),
    description: messageAt(locale, description, vars),
    path,
    urlLocale: parsed,
    index,
  });
}

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
