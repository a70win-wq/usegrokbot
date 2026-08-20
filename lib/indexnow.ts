import { URL_LOCALES, absoluteUrl } from "@/lib/i18n/paths";
import { site } from "@/lib/site";

export const INDEXNOW_KEY = "62d6505d7c4e672351306fbb847690dc";

export const INDEXNOW_KEY_LOCATION = `${site.url}/${INDEXNOW_KEY}.txt`;

export const PRIORITY_PATHS = [
  "/",
  "/categories",
  "/categories/email",
  "/categories/sales",
  "/categories/marketing",
  "/categories/research",
  "/categories/content",
  "/categories/coding",
  "/categories/operations",
  "/categories/personal",
  "/learn/what-is-grok-bot",
] as const;

export function indexNowUrls(paths: readonly string[] = PRIORITY_PATHS) {
  return URL_LOCALES.flatMap((locale) => paths.map((path) => absoluteUrl(path, locale)));
}
