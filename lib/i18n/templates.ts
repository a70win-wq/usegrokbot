import catalogFile from "@/data/templates-i18n.json";
import type { TemplateCopy } from "@/data/templates";
import type { Locale } from "./types";

export type TemplateI18n = {
  title: string;
  oneLiner: string;
  body: string;
};

const catalog = catalogFile as Record<Exclude<Locale, "en">, Record<string, TemplateI18n>>;

export function localizeTemplateCopy(
  id: string,
  locale: Locale,
  fallback: TemplateCopy & { body?: string },
): TemplateCopy & { body: string } {
  if (locale === "en") {
    return { title: fallback.title, oneLiner: fallback.oneLiner, body: fallback.body ?? fallback.oneLiner };
  }
  const localized = catalog[locale]?.[id];
  if (!localized) {
    return { title: fallback.title, oneLiner: fallback.oneLiner, body: fallback.body ?? fallback.oneLiner };
  }
  return {
    title: localized.title,
    oneLiner: localized.oneLiner,
    body: localized.body || fallback.body || localized.oneLiner,
  };
}
