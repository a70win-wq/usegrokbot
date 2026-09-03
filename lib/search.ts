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

export function homeDiscoverPath({
  query,
  topic,
  app,
}: {
  query?: string;
  topic?: string;
  app?: string;
} = {}) {
  const params = new URLSearchParams();
  const nextQuery = query?.trim();
  const nextTopic = topic?.trim();
  const nextApp = app?.trim();

  if (nextQuery) params.set("q", nextQuery);
  if (nextTopic) params.set("topic", nextTopic);
  if (nextApp) params.set("app", nextApp);

  const search = params.toString();
  return search ? `/?${search}` : "/";
}

export function topicResultsPath(topic: string) {
  return homeDiscoverPath({ topic });
}

export function appResultsPath(app: string) {
  return homeDiscoverPath({ app });
}

export function searchResultsPath(value: string) {
  return homeDiscoverPath({ query: value });
}

export const SEARCH_UI_ENABLED = true;
