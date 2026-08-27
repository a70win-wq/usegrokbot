import { officialUseCases } from "./official-use-cases";
import { getDiscoverStory } from "./discover";
import type { TopicSlug } from "./topics";
import type { AppSlug } from "./types";

export type Scenario = {
  slug: string;
  rank: number;
  title: string;
  short: string;
  oneLiner: string;
  does: string;
  who: string;
  startWith: string;
  topic: TopicSlug;
  apps: AppSlug[];
  officialRoles: readonly string[];
  exampleSlugs: readonly string[];
};

export const scenarios: readonly Scenario[] = [
  {
    slug: "inbox",
    rank: 1,
    title: "Clean up my inbox",
    short: "Inbox",
    oneLiner: "Triage Gmail, draft replies, and archive junk. Every send waits for you.",
    does: "The Bot reads the inbox you connect, groups mail into urgent / waiting / junk, and drafts replies in your voice. It does not hunt subscriptions or book anything. Nothing leaves the account until you approve it.",
    who: "Anyone staring at a wrecked Gmail, plus founders whose inbox is the job.",
    startWith:
      "Review my inbox from the last 7 days. Group threads into urgent, waiting on me, waiting on someone else, and junk. For urgent threads, draft a reply in my voice. For junk, list what you would archive. Return the plan; do not send or delete until I approve.",
    topic: "email",
    apps: ["gmail"],
    officialRoles: ["inbox-manager"],
    exampleSlugs: ["clear-email-elon", "inbox-organizer-xai"],
  },
  {
    slug: "briefing",
    rank: 2,
    title: "Brief me every morning",
    short: "Morning brief",
    oneLiner: "A short readout of what changed overnight — only what maps to your priorities.",
    does: "The Bot scans the channels you approve — Slack, calendar, meeting notes — and writes a morning brief: what's new, why it matters, and what needs a decision. Each item keeps a source link. It does not clean your inbox.",
    who: "Founders, operators, and anyone who wakes up already behind.",
    startWith:
      "Write this morning's brief from my approved Slack channels, calendar, and meeting notes since yesterday. Only include items that map to the priorities in this document. For each item: the source, why it matters, the proposed next step, and whether I owe a decision. Do not triage email, draft replies, send messages, or change meetings.",
    topic: "operations",
    apps: ["gmail", "slack", "google-calendar"],
    officialRoles: ["chief-of-staff", "daily-briefing-writer", "executive-assistant"],
    exampleSlugs: ["week-of-hacks-nate-herk", "ceo-desk-teslaconomics", "five-bots-peter-yang"],
  },
  {
    slug: "meetings",
    rank: 3,
    title: "Prep me for meetings",
    short: "Meetings",
    oneLiner: "Walk in knowing who's in the room, last touch, and a suggested agenda.",
    does: "Before each meeting, the Bot builds a prep pack from calendar, mail, CRM, and notes: attendees, last conversation, open threads, and a suggested agenda. After the call it can draft the follow-up — still behind your approval.",
    who: "Sales, account managers, and anyone with a calendar they did not design.",
    startWith:
      "For my next three calendar meetings, build a prep pack each: who is in the room, last touch, open email or Slack threads, and a suggested agenda. Use only sources I have connected. Do not message attendees or change the calendar.",
    topic: "calendar",
    apps: ["google-calendar", "gmail", "slack"],
    officialRoles: ["meeting-prep-buddy", "calendar-coordinator"],
    exampleSlugs: ["calendar-booking-yunta-tsai", "crm-notes-xai"],
  },
  {
    slug: "sales",
    rank: 4,
    title: "Find customers and draft outreach",
    short: "Sales",
    oneLiner: "Research accounts overnight, score contacts, and leave drafts for you to send.",
    does: "The Bot works a list of accounts against your ideal customer profile, finds relevant contacts, and drafts email and LinkedIn in your voice. Morning is a review pile — not a chat you still have to turn into mail.",
    who: "Founders doing their own outbound, SDRs, and one-person companies.",
    startWith:
      "Research the 25 accounts in this CRM view. Score them against our ideal customer profile and recent intent, identify up to three relevant contacts per account, and draft email and LinkedIn outreach in the style examples attached. Skip anyone already in an active sequence. Return a review list; do not send or enroll anyone.",
    topic: "sales",
    apps: ["gmail", "linkedin", "salesforce"],
    officialRoles: ["sales-outbound", "account-research-specialist", "prospecting-plan-builder"],
    exampleSlugs: ["overnight-sales-xai", "one-person-company-rahul", "crm-notes-xai"],
  },
  {
    slug: "competitors",
    rank: 5,
    title: "Watch competitors overnight",
    short: "Competitors",
    oneLiner: "Overnight shifts that actually matter — launches, messaging, and what to do next.",
    does: "The Bot monitors competitor sites, posts, and ads on a cadence, then writes a short digest of only the changes that gained traction. It can suggest copy or page updates. It does not invent metrics.",
    who: "Marketers, founders, and anyone who cannot afford to miss a launch.",
    startWith:
      "Overnight, check these competitor sites and public channels. Report only launches, positioning changes, or creatives that gained traction. For each, include the source, why it matters, and one suggested change I could make. Do not post or edit my site.",
    topic: "marketing",
    apps: ["browser", "x", "reddit"],
    officialRoles: ["competitive-intelligence-analyst", "compelling-events-monitor"],
    exampleSlugs: ["competitor-monitor-jellypod", "monday-marketing-report-jellypod", "reddit-thread-scout-axel"],
  },
  {
    slug: "content",
    rank: 6,
    title: "Write and post in my voice",
    short: "Content",
    oneLiner: "Draft newsletters, social posts, and replies from what actually shipped — then wait for you to publish.",
    does: "The Bot studies your real posting history, pulls what's new from launches and your calendar, and parks drafts in your voice. It can also turn a newsletter into social posts or mine YouTube comments for replies. It never publishes on its own.",
    who: "Creators, marketers, and founders who are also the content team.",
    startWith:
      "Read my last 20 posts and this week's launches or calendar events. Draft three posts in my voice about what actually shipped. Park them for review. Do not publish.",
    topic: "content",
    apps: ["x", "youtube"],
    officialRoles: ["social-media-manager", "newsletter-writer"],
    exampleSlugs: ["youtube-comments-remy", "newsletter-to-social-remy", "lennybot-lenny-rachitsky"],
  },
  {
    slug: "coding",
    rank: 7,
    title: "Build and debug software",
    short: "Coding",
    oneLiner: "Reproduce bugs, file tickets, and come back with a clickable prototype — not a vague Slack message.",
    does: "Hand it a bug report and it walks the same path in staging, captures the failure, and files a ticket. Or describe a small tool and it writes on its computer and returns a screenshot plus a live URL.",
    who: "Engineers, QA, and founders who are also support.",
    startWith:
      "Read this bug report and reproduce it in staging using a fresh test account. Return exact steps, expected and actual behavior, screenshots, browser and OS details, relevant console or network notes, and a minimal test case if possible. Do not use production customer data.",
    topic: "coding",
    apps: ["github", "browser"],
    officialRoles: ["bug-reproduction", "prototype-builder", "product-performance"],
    exampleSlugs: ["bug-reproduction-xai", "firstmate-kun-chen", "3d-game-roundtable-space"],
  },
  {
    slug: "travel",
    rank: 8,
    title: "Book travel",
    short: "Travel",
    oneLiner: "Compare flights and hotels to your rules, hold the best option, and drop the itinerary on your calendar.",
    does: "The Bot searches against your dates, budget, and constraints, confirms with you before booking, then files the itinerary and calendar holds. You approve the purchase.",
    who: "Anyone who loses an afternoon to tabs of flights.",
    startWith:
      "Find flights and hotels for these dates and this budget. Rank options against my constraints (nonstop preferred, aisle, hotel walking distance to the venue). Return a shortlist with prices and links. Do not book until I confirm.",
    topic: "travel",
    apps: ["browser", "gmail", "google-calendar"],
    officialRoles: ["travel-coordinator"],
    exampleSlugs: ["travel-concierge-nate"],
  },
  {
    slug: "expenses",
    rank: 9,
    title: "Track expenses and invoices",
    short: "Expenses",
    oneLiner: "Weekly summary from receipts in Gmail, missing categories flagged, follow-ups drafted.",
    does: "The Bot matches receipts from the finance inbox to your expense system, flags policy exceptions, and drafts one follow-up per owner. Payments and reimbursements stay behind your approval.",
    who: "Founders, office managers, and small finance teams.",
    startWith:
      "Build this week's expense summary from the expense system and attached policy. Match receipts from the finance inbox, flag missing categories or policy exceptions, and draft one follow-up per owner. Return the summary and drafts; do not send messages or change reimbursements.",
    topic: "finance",
    apps: ["gmail", "google-sheets"],
    officialRoles: ["expense-manager", "invoice-coordinator"],
    exampleSlugs: ["expense-manager-xai", "household-bots-blake-king"],
  },
  {
    slug: "life",
    rank: 10,
    title: "Handle life admin",
    short: "Life admin",
    oneLiner: "Shortlist apartments, book tours, and run household errands — not another inbox pass.",
    does: "The Bot hunts listings that match your filters, drafts tour requests, and helps with household jobs like a budget deck or a Bot for your parents. You approve every email, application, and booking.",
    who: "Anyone moving, helping family, or whose household admin is a second job.",
    startWith:
      "Find apartments that match this list: neighborhood, monthly budget, bedrooms, move-in date, and must-haves. Shortlist 8 listings with rent, why they fit, and the listing link. Draft tour-request emails for the ones I mark. Do not email landlords or submit applications until I approve.",
    topic: "personal",
    apps: ["browser", "gmail"],
    officialRoles: ["apartment-scout"],
    exampleSlugs: ["parents-bot-yunta-tsai", "household-bots-blake-king", "clothes-resale-scotty-beam"],
  },
];

export const scenarioSlugs = scenarios.map((item) => item.slug);

export function isScenarioSlug(value: string): boolean {
  return scenarios.some((item) => item.slug === value);
}

export function getScenario(slug: string) {
  return scenarios.find((item) => item.slug === slug);
}

export function rankLabel(rank: number) {
  return String(rank).padStart(2, "0");
}

const officialSlugs = new Set(officialUseCases.map((item) => item.slug));

if (scenarios.length !== 10) {
  throw new Error(`Expected 10 scenarios, got ${scenarios.length}`);
}

const ranks = scenarios.map((item) => item.rank);
if (new Set(ranks).size !== 10 || ranks.some((rank) => rank < 1 || rank > 10)) {
  throw new Error("Scenarios must be ranked 1–10 with unique ranks");
}

for (const item of scenarios) {
  for (const role of item.officialRoles) {
    if (!officialSlugs.has(role)) {
      throw new Error(`Unknown official role "${role}" on scenario ${item.slug}`);
    }
  }
  if (item.exampleSlugs.length === 0) {
    throw new Error(`Scenario ${item.slug} needs at least one example story`);
  }
  for (const slug of item.exampleSlugs) {
    if (!getDiscoverStory(slug)) {
      throw new Error(`Unknown discover story "${slug}" on scenario ${item.slug}`);
    }
  }
}
