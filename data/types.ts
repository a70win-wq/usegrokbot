export const appSlugs = [
  "browser",
  "gmail",
  "google-sheets",
  "google-calendar",
  "slack",
  "notion",
  "github",
  "salesforce",
  "hubspot",
  "linkedin",
  "x",
  "reddit",
  "youtube",
] as const;

export type AppSlug = (typeof appSlugs)[number];

export type Difficulty = "easy" | "medium" | "advanced";
export type Schedule = "one-time" | "daily" | "weekly" | "always-on";

export type App = {
  slug: AppSlug;
  name: string;
  description: string;
  icon: string;
  showOnHome: boolean;
};
