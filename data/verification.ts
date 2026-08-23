export const LAST_REVIEWED = "2026-08-19";

export function formatVerifiedDate(isoDate: string, locale: string) {
  const date = new Date(`${isoDate}T00:00:00`);
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
