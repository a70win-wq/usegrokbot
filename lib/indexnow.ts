import { URL_LOCALES, absoluteUrl } from "@/lib/i18n/paths";
import { site } from "@/lib/site";

export const INDEXNOW_KEY = "62d6505d7c4e672351306fbb847690dc";

export const INDEXNOW_KEY_LOCATION = `${site.url}/${INDEXNOW_KEY}.txt`;

export const PRIORITY_PATHS = [
  "/",
  "/discover",
  "/discover/clear-email-elon",
  "/discover/week-of-hacks-nate-herk",
  "/discover/household-bots-blake-king",
  "/discover/overnight-sales-xai",
  "/discover/grok-bot-launch-bot",
  "/discover/travel-concierge-nate",
  "/integrations",
  "/integrations/gmail",
  "/integrations/slack",
  "/integrations/google-sheets",
  "/integrations/github",
  "/use-cases",
  "/use-cases/competitor-monitor",
  "/use-cases/lead-researcher",
  "/use-cases/daily-ai-news-brief",
  "/use-cases/inbox-organizer",
  "/use-cases/reddit-thread-scout",
  "/use-cases/travel-concierge",
  "/use-cases/youtube-comment-desk",
  "/use-cases/x-viral-scout",
  "/use-cases/monday-marketing-report",
  "/categories/sales",
  "/categories/marketing",
  "/categories/research",
  "/learn/what-is-grok-bot",
] as const;

export function indexNowUrls(paths: readonly string[] = PRIORITY_PATHS) {
  return URL_LOCALES.flatMap((locale) => paths.map((path) => absoluteUrl(path, locale)));
}
