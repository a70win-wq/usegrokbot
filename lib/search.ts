import { searchDiscoverStories } from "@/data/discover";

export { searchDiscoverStories };

export function withSearchQuery(pathname: string, currentSearch: string, value: string) {
  const params = new URLSearchParams(currentSearch);
  const query = value.trim();

  if (query) params.set("q", query);
  else params.delete("q");

  const search = params.toString();
  return search ? `${pathname}?${search}` : pathname;
}

export function searchResultsPath(value: string) {
  return withSearchQuery("/", "", value);
}

export const SEARCH_UI_ENABLED = true;
