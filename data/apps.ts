import type { App, AppSlug } from "./types";

export const apps: App[] = [
  {
    slug: "browser",
    name: "Browser",
    description: "Visit websites, compare pages and collect public information.",
    icon: "Globe",
    showOnHome: false,
  },
  {
    slug: "gmail",
    name: "Gmail",
    description: "Tidy your inbox, draft replies and follow up on email.",
    icon: "Mail",
    showOnHome: true,
  },
  {
    slug: "google-sheets",
    name: "Google Sheets",
    description: "Keep lists, track leads and update simple reports.",
    icon: "Table2",
    showOnHome: true,
  },
  {
    slug: "google-calendar",
    name: "Google Calendar",
    description: "Prepare for meetings and keep your week organized.",
    icon: "Calendar",
    showOnHome: true,
  },
  {
    slug: "slack",
    name: "Slack",
    description: "Send short briefings where your team already works.",
    icon: "Hash",
    showOnHome: true,
  },
  {
    slug: "notion",
    name: "Notion",
    description: "Turn research into pages your team can reuse.",
    icon: "BookOpen",
    showOnHome: true,
  },
  {
    slug: "github",
    name: "GitHub",
    description: "Watch issues, pull requests and repo activity.",
    icon: "FolderGit2",
    showOnHome: true,
  },
  {
    slug: "salesforce",
    name: "Salesforce",
    description: "Keep CRM notes and next steps up to date.",
    icon: "Cloud",
    showOnHome: true,
  },
  {
    slug: "hubspot",
    name: "HubSpot",
    description: "Update contacts, deals and follow-up tasks.",
    icon: "HeartHandshake",
    showOnHome: true,
  },
  {
    slug: "linkedin",
    name: "LinkedIn",
    description: "Research people, companies and post ideas.",
    icon: "Contact",
    showOnHome: true,
  },
  {
    slug: "x",
    name: "X",
    description: "Track conversations, mentions and trending topics.",
    icon: "Radio",
    showOnHome: true,
  },
  {
    slug: "reddit",
    name: "Reddit",
    description: "Find real customer language and emerging questions.",
    icon: "MessagesSquare",
    showOnHome: true,
  },
  {
    slug: "youtube",
    name: "YouTube",
    description: "Collect video ideas, comments and competitor uploads.",
    icon: "Play",
    showOnHome: true,
  },
];

export const appsBySlug = Object.fromEntries(apps.map((app) => [app.slug, app])) as Record<
  App["slug"],
  App
>;

export const homeApps = apps.filter((app) => app.showOnHome);

export const popularIntegrationSlugs: AppSlug[] = [
  "gmail",
  "slack",
  "google-sheets",
  "github",
  "notion",
  "x",
  "google-calendar",
  "salesforce",
];

export function appSearchText(slug: AppSlug) {
  const app = appsBySlug[slug];
  return `${app.slug.replace(/-/g, " ")} ${app.name}`.toLowerCase();
}
