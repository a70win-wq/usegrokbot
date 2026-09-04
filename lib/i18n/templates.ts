import catalogFile from "@/data/templates-i18n.json";
import jaCatalogFile from "@/data/templates-i18n-ja.json";
import type { TemplateCopy } from "@/data/templates";
import type { ChineseLocale, Locale } from "./types";

export type TemplateI18n = {
  title: string;
  oneLiner: string;
  body: string;
};

const catalog = catalogFile as Record<ChineseLocale, Record<string, TemplateI18n>>;
const jaCatalog = jaCatalogFile as Record<string, TemplateI18n>;

export function localizeTemplateCopy(
  id: string,
  locale: Locale,
  fallback: TemplateCopy & { body?: string },
): TemplateCopy & { body: string } {
  const english = {
    title: fallback.title,
    oneLiner: fallback.oneLiner,
    body: fallback.body ?? fallback.oneLiner,
  };

  if (locale === "en") return english;

  if (locale === "ja") {
    const localized = jaCatalog[id];
    if (!localized) return english;
    return {
      title: localized.title || english.title,
      oneLiner: localized.oneLiner,
      body: localized.body || english.body || localized.oneLiner,
    };
  }

  const localized = catalog[locale]?.[id];
  if (!localized) return english;
  return {
    title: localized.title,
    oneLiner: localized.oneLiner,
    body: localized.body || fallback.body || localized.oneLiner,
  };
}
