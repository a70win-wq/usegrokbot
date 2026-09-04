import redirectData from "@/data/discover/retired-redirects.json";
import { URL_LOCALE_PATTERN } from "@/lib/i18n/paths";

export const retiredDiscoverRedirects = redirectData as Readonly<Record<string, string>>;

const discoverPath = new RegExp(`^/(?:(?:${URL_LOCALE_PATTERN})/)?discover/([^/]+)/?$`);

export function retiredDiscoverDestination(pathname: string) {
  const match = pathname.match(discoverPath);
  if (!match) return undefined;
  return retiredDiscoverRedirects[match[1]];
}
