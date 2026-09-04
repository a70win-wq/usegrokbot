import { URL_LOCALES, absoluteUrl } from "@/lib/i18n/paths";
import { site } from "@/lib/site";

export const INDEXNOW_KEY = "62d6505d7c4e672351306fbb847690dc";

export const INDEXNOW_KEY_LOCATION = `${site.url}/${INDEXNOW_KEY}.txt`;

export const PRIORITY_PATHS = [
  "/",
  "/use-cases",
  "/templates",
  "/community",
  "/articles",
  "/roles",
] as const;

export function indexNowUrls(paths: readonly string[] = PRIORITY_PATHS) {
  return URL_LOCALES.flatMap((locale) => paths.map((path) => absoluteUrl(path, locale)));
}
