import type { Locale } from "@/lib/i18n/types";

export function setupMinutes(setupTime: string) {
  return setupTime.replace(" min", "");
}

export function formatStarCount(count: number) {
  if (count < 1000) return String(count);
  if (count < 10_000) return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  if (count < 1_000_000) return `${Math.round(count / 1000)}k`;
  return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}m`;
}

export function formatRelativeTime(isoDate: string, locale: Locale, now = new Date()) {
  const date = new Date(isoDate.includes("T") ? isoDate : `${isoDate}T12:00:00Z`);
  const diffMs = date.getTime() - now.getTime();
  const localeTag = locale === "en" ? "en" : locale;
  const rtf = new Intl.RelativeTimeFormat(localeTag, { numeric: "auto" });
  const minutes = Math.round(diffMs / 60_000);
  const abs = Math.abs(minutes);
  if (abs < 60) return rtf.format(minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return rtf.format(hours, "hour");
  const days = Math.round(hours / 24);
  if (Math.abs(days) < 30) return rtf.format(days, "day");
  const months = Math.round(days / 30);
  if (Math.abs(months) < 12) return rtf.format(months, "month");
  return rtf.format(Math.round(days / 365), "year");
}

export function formatStoryDate(isoDate: string, locale: Locale) {
  const date = new Date(`${isoDate}T00:00:00`);
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatCardDate(isoDate: string, locale: Locale, now = new Date()) {
  const exact = formatStoryDate(isoDate, locale);
  const date = new Date(isoDate.includes("T") ? isoDate : `${isoDate}T12:00:00Z`);
  const days = Math.abs((now.getTime() - date.getTime()) / 86_400_000);
  if (days >= 30) return exact;
  return `${formatRelativeTime(isoDate, locale, now)} · ${exact}`;
}

export function sameCopy(a?: string, b?: string) {
  if (!a || !b) return false;
  const normalize = (value: string) =>
    value.toLowerCase().replace(/[.\s]+$/g, "").replace(/\s+/g, " ").trim();
  const left = normalize(a);
  const right = normalize(b);
  return left === right || left.startsWith(right) || right.startsWith(left);
}
