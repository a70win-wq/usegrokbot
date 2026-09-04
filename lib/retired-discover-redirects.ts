import redirectData from "@/data/discover/retired-redirects.json";

export const retiredDiscoverRedirects = redirectData as Readonly<Record<string, string>>;

const discoverPath = /^\/(?:(?:en|zh-hk|zh-cn)\/)?discover\/([^/]+)\/?$/;

export function retiredDiscoverDestination(pathname: string) {
  const match = pathname.match(discoverPath);
  if (!match) return undefined;
  return retiredDiscoverRedirects[match[1]];
}
