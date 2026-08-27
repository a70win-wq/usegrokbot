import { officialUseCases } from "./official-use-cases";
import { getDiscoverStory } from "./discover";
import type { TopicSlug } from "./topics";
import type { AppSlug } from "./types";

export const TOP_SCENARIO_COUNT = 10;

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
    apps: ["slack", "google-calendar"],
    officialRoles: ["chief-of-staff", "daily-briefing-writer", "executive-assistant"],
    exampleSlugs: ["week-of-hacks-nate-herk", "ceo-desk-teslaconomics", "five-bots-peter-yang"],
  },
  {
    slug: "coding",
    rank: 3,
    title: "Build and debug software",
    short: "Coding",
    oneLiner: "A clickable prototype from a spec — or a bug reproduced in staging, not a vague Slack message.",
    does: "Describe a small tool and it writes on its computer, then returns a screenshot plus a live URL. Or hand it a bug report and it walks the same path in staging, captures the failure, and files a ticket.",
    who: "Engineers, QA, and founders who are also support.",
    startWith:
      "From this spec, build a small working tool or app on your computer. Return a screenshot, a live URL, and the files. If a bug blocks you, reproduce it in staging with a fresh test account and attach exact steps plus screenshots. Do not deploy to production, spend money, or use customer data.",
    topic: "coding",
    apps: ["github", "browser"],
    officialRoles: ["prototype-builder", "bug-reproduction", "product-performance"],
    exampleSlugs: ["bug-reproduction-xai", "agent-loops-alex-finn"],
  },
  {
    slug: "meetings",
    rank: 4,
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
    exampleSlugs: ["crm-notes-xai"],
  },
  {
    slug: "content",
    rank: 5,
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
    slug: "sales",
    rank: 6,
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
    slug: "research",
    rank: 7,
    title: "Research and summarize",
    short: "Research",
    oneLiner: "Turn a podcast, a pile of links, or a question into a one-page brief with sources.",
    does: "The Bot reads the sources you name, pulls the thesis and takeaways, and keeps timestamps or URLs on every claim. It does not invent quotes or numbers.",
    who: "Investors, operators, and anyone who listens more than they have time to.",
    startWith:
      "Summarize these sources into a one-page brief: the thesis, five takeaways, and what I should do next. Link timestamps or URLs. Separate facts from opinions. Do not invent quotes.",
    topic: "research",
    apps: ["browser", "youtube"],
    officialRoles: [],
    exampleSlugs: ["podcast-summarizer-gavin-baker", "lennybot-lenny-rachitsky"],
  },
  {
    slug: "shopping",
    rank: 8,
    title: "Shop and watch prices",
    short: "Shopping",
    oneLiner: "Watch products, compare prices, and fill a review cart. You still place the order.",
    does: "The Bot checks the stores you name, compares options against your budget and rules, and parks a cart or a restock alert. It does not pay until you confirm.",
    who: "Anyone who loses an evening to tabs of the same product.",
    startWith:
      "Watch these products and stores. When the price drops below my limit or a matching item is back in stock, add it to a review cart with the price and link. Do not place the order until I confirm.",
    topic: "shopping",
    apps: ["browser"],
    officialRoles: [],
    exampleSlugs: [
      "teslaconomics-i-just-created-the-worlds-best-amazon-cart-grok",
      "clothes-resale-scotty-beam",
    ],
  },
  {
    slug: "expenses",
    rank: 9,
    title: "Track expenses and invoices",
    short: "Expenses",
    oneLiner: "Weekly summary from receipts and invoices, missing categories flagged, follow-ups drafted.",
    does: "The Bot matches receipts and invoices from the finance inbox to your expense system, flags policy exceptions, and drafts one follow-up per owner. Payments and reimbursements stay behind your approval.",
    who: "Founders, office managers, and small finance teams.",
    startWith:
      "Build this week's expense summary from the expense system and attached policy. Match receipts and invoices from the finance inbox, flag missing categories or policy exceptions, and draft one follow-up per owner. Return the summary and drafts; do not send messages or change reimbursements.",
    topic: "finance",
    apps: ["gmail", "google-sheets"],
    officialRoles: ["expense-manager", "invoice-coordinator"],
    exampleSlugs: ["expense-manager-xai"],
  },
  {
    slug: "recruiting",
    rank: 10,
    title: "Source candidates and draft outreach",
    short: "Recruiting",
    oneLiner: "Find people who meet the bar, skip anyone already in the ATS, and leave outreach for you to send.",
    does: "The Bot reads the role, searches approved sources, explains why each person matches, and drafts outreach in your voice. Contacting anyone stays behind your approval.",
    who: "Founders hiring themselves, recruiters, and hiring managers.",
    startWith:
      "For this role description, find 15 people who meet the must-haves. Skip anyone already in our ATS. Explain the match and draft outreach in my voice. Do not contact anyone.",
    topic: "operations",
    apps: ["gmail", "linkedin"],
    officialRoles: ["talent-scout", "hiring-screener"],
    exampleSlugs: ["gbankssmith-grok-bot-isnt-another-chatbot"],
  },
  {
    slug: "support",
    rank: 11,
    title: "Triage support and refunds",
    short: "Support",
    oneLiner: "Draft routine replies, flag refunds and angry threads, and wait for you before anything goes out.",
    does: "The Bot watches the support inbox on a cadence, drafts replies for the easy ones, and surfaces refunds, legal, or escalations. It does not send or issue money on its own.",
    who: "Shop owners, support leads, and founders who are also the helpdesk.",
    startWith:
      "Review the support inbox since yesterday. Draft replies for routine questions. Flag anything that looks like a refund, legal, or an angry customer. Do not send or issue refunds until I approve.",
    topic: "support",
    apps: ["gmail"],
    officialRoles: ["ticket-triage-specialist"],
    exampleSlugs: ["support-refunds-gergely-orosz", "store-support-xai"],
  },
  {
    slug: "hardware",
    rank: 12,
    title: "Talk to devices at home",
    short: "Hardware",
    oneLiner: "Run a job on a mower, Arduino, or vacuum you already connected — and stop if it looks unsafe.",
    does: "The Bot uses the device path you already set up, runs the job, and comes back with logs or a photo. It does not flash firmware or spend money you have not approved.",
    who: "People with a device they can already reach, not a first-time wiring project.",
    startWith:
      "Talk to this device the way we already connected it. Run the job I describe (start, status, dock or stop), then show me a log or photo of what it did. Stop if anything looks unsafe. Do not change firmware, flash anything, or spend money.",
    topic: "hardware",
    apps: ["browser"],
    officialRoles: [],
    exampleSlugs: [
      "remote-mower-sawyer-merritt",
      "kettlebelldan-i-asked-grok-bot-to-connect-to-my-arduino-device",
    ],
  },
  {
    slug: "notes",
    rank: 13,
    title: "File notes in my vault",
    short: "Notes",
    oneLiner: "Drop today's notes into Obsidian or Notion with the folder and tag rules you already use.",
    does: "The Bot files, links, and tags using your existing vault rules. It does not delete pages or rewrite ones you have not marked.",
    who: "Anyone whose second brain is a pile of captures they never file.",
    startWith:
      "File today's notes into my vault using the existing folder and tag rules. Link related pages. Do not delete notes or rewrite pages I have not marked.",
    topic: "notes",
    apps: ["notion"],
    officialRoles: [],
    exampleSlugs: ["av1dlive-grok-bot-obsidian-is-basically-superhuman-mode"],
  },
  {
    slug: "stock",
    rank: 14,
    title: "Morning market brief",
    short: "Markets",
    oneLiner: "A short brief on your tickers — overnight news and what changed. It does not trade.",
    does: "The Bot reads public market news and your watchlist, then writes a morning note. Facts stay separate from opinions. It does not place trades.",
    who: "People who already have a watchlist and do not want another chat full of tips.",
    startWith:
      "Each market morning, send a short brief on the tickers in this list: overnight news, unusual volume, and what changed vs yesterday. Separate facts from opinions. Do not place trades.",
    topic: "stock",
    apps: ["browser"],
    officialRoles: [],
    exampleSlugs: ["milesdeutscher-i-tested-grok-bot-extensively-over-the-past-coup"],
  },
  {
    slug: "life",
    rank: 15,
    title: "Hunt apartments",
    short: "Housing",
    oneLiner: "Shortlist listings that match your filters and draft tour requests. Nothing goes to a landlord until you say so.",
    does: "The Bot hunts listings that match your filters, explains why each one fits, and drafts tour requests. You approve every email and application. It does not clean your inbox or book travel.",
    who: "Anyone moving, or watching listings they do not have time to refresh.",
    startWith:
      "Find apartments that match this list: neighborhood, monthly budget, bedrooms, move-in date, and must-haves. Shortlist 8 listings with rent, why they fit, and the listing link. Draft tour-request emails for the ones I mark. Do not email landlords or submit applications until I approve.",
    topic: "personal",
    apps: ["browser", "gmail"],
    officialRoles: ["apartment-scout"],
    exampleSlugs: ["alangnative-testing-grok-bot-ios-with-a-local-rental-listing"],
  },
  {
    slug: "family",
    rank: 16,
    title: "A Bot my parents can use",
    short: "Family",
    oneLiner: "A simple Bot they can talk to — no plugins, no setup maze.",
    does: "The Bot answers day-to-day questions in their language and helps with reminders you approve. It never asks them to install tools.",
    who: "Adult children setting up a Bot for parents, and anyone who will not touch plugins.",
    startWith:
      "Set up a simple Bot my parents can talk to in their language. It should answer day-to-day questions and help with calendar reminders I approve. Do not ask them to install plugins, send messages, or spend money.",
    topic: "personal",
    apps: ["browser"],
    officialRoles: [],
    exampleSlugs: ["parents-bot-yunta-tsai"],
  },
  {
    slug: "travel",
    rank: 17,
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
    slug: "competitors",
    rank: 18,
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
    slug: "games",
    rank: 19,
    title: "Build a small game",
    short: "Games",
    oneLiner: "From a description to a playable scene, a screenshot, and a way to try it.",
    does: "The Bot writes a small playable thing on its computer and comes back with a screenshot plus files or a URL. Publishing stays behind you.",
    who: "People who want to try a game idea without opening an engine first.",
    startWith:
      "Build a small playable scene from this description. Come back with a screenshot, a way to play it, and the files. Do not publish or spend money until I confirm.",
    topic: "games",
    apps: ["browser"],
    officialRoles: ["prototype-builder", "playtest-operator"],
    exampleSlugs: ["3d-game-roundtable-space"],
  },
  {
    slug: "decks",
    rank: 20,
    title: "Build the deck",
    short: "Decks",
    oneLiner: "An on-brand slide deck from an outline, left as an editable link.",
    does: "The Bot uses your master template and the outline you attach, then returns an editable link. It does not send the deck to anyone.",
    who: "Anyone who still starts from a blank slide the night before.",
    startWith:
      "Build a 10-slide deck from this outline and our master template. Keep it on-brand and leave an editable link. Do not send it to anyone.",
    topic: "operations",
    apps: ["browser"],
    officialRoles: ["presentation-designer", "deck-updater"],
    exampleSlugs: ["household-bots-blake-king"],
  },
  {
    slug: "vendor",
    rank: 21,
    title: "Run vendor portals",
    short: "Vendors",
    oneLiner: "Seats and renewals on portals with no clean API — exceptions only.",
    does: "The Bot clicks the same vendor path each week and comes back with seat counts, renewal dates, and exceptions. Paying or changing seats stays behind you.",
    who: "Ops and finance people who live in portals.",
    startWith:
      "Open this vendor portal, pull the current seats and renewal dates, and list exceptions only. Draft the renewal note. Do not change seats or pay until I approve.",
    topic: "operations",
    apps: ["browser"],
    officialRoles: ["vendor-portal-operator", "contract-desk", "security-questionnaire-filler"],
    exampleSlugs: ["vendor-negotiation-xai"],
  },
  {
    slug: "subscriptions",
    rank: 22,
    title: "Cancel forgotten subscriptions",
    short: "Subscriptions",
    oneLiner: "A keep / review / cancel list from receipts and newsletters. Unsubscribe only what you mark.",
    does: "The Bot collates subscription and newsletter mail, suggests what to kill, and drafts the unsubscribe steps. It does not cancel anything until you approve.",
    who: "Anyone paying for tools they forgot they had.",
    startWith:
      "From my mail, list subscriptions and newsletters from the last 90 days. Group them into keep, review, and likely cancel. Draft unsubscribe steps for the ones I mark. Do not unsubscribe until I approve.",
    topic: "email",
    apps: ["gmail"],
    officialRoles: ["subscription-cleaner"],
    exampleSlugs: ["pfista-grok-bots-ive-made-so-far-email-newsletter-unsub"],
  },
  {
    slug: "seo",
    rank: 23,
    title: "SEO and AEO audit",
    short: "SEO",
    oneLiner: "Keywords, technical issues, and competitor movement in one plan. No invented rankings.",
    does: "The Bot checks the site and named competitors, then returns whether you are gaining or losing ground and what to fix first. It does not edit the live site.",
    who: "Marketers and founders who need a plan, not another dashboard.",
    startWith:
      "Audit this site for SEO and AEO. Check the top 20 keywords, technical issues, and competitor pages named in this document. Return whether we are gaining or losing ground, the issues to fix first, and a 7-day plan. Do not change the live site.",
    topic: "marketing",
    apps: ["browser"],
    officialRoles: ["seo-aeo-auditor"],
    exampleSlugs: ["bloggersarvesh-grok-bot-case-from-bloggersarvesh"],
  },
  {
    slug: "product",
    rank: 24,
    title: "Cluster product feedback",
    short: "Product",
    oneLiner: "Scattered feedback into a ranked list, with evidence, for you to route.",
    does: "The Bot collects feedback from connected sources, clusters it, and drafts routing recommendations. It does not file tickets or message customers.",
    who: "Product managers and founders who keep losing 'who asked for this.'",
    startWith:
      "Collect product feedback from these connected sources for the last 14 days. Cluster by theme, weigh evidence and urgency, and draft a routing list for approval. Do not file tickets or message customers.",
    topic: "operations",
    apps: ["slack", "browser"],
    officialRoles: ["product-feedback-analyst", "feature-request-tracker"],
    exampleSlugs: ["n2parko-cos-em-five-eng-ics-databricks-pm"],
  },
];

export const scenarioSlugs = scenarios.map((item) => item.slug);

export function isScenarioSlug(value: string): boolean {
  return scenarios.some((item) => item.slug === value);
}

export function getScenario(slug: string) {
  return scenarios.find((item) => item.slug === slug);
}

export function topScenarios() {
  return scenarios.filter((item) => item.rank <= TOP_SCENARIO_COUNT);
}

export function moreScenarios() {
  return scenarios.filter((item) => item.rank > TOP_SCENARIO_COUNT);
}

export function rankLabel(rank: number) {
  return String(rank).padStart(2, "0");
}

const officialSlugs = new Set(officialUseCases.map((item) => item.slug));

if (scenarios.length !== 24) {
  throw new Error(`Expected 24 scenarios, got ${scenarios.length}`);
}

const ranks = scenarios.map((item) => item.rank);
if (new Set(ranks).size !== scenarios.length || ranks.some((rank) => rank < 1 || rank > scenarios.length)) {
  throw new Error("Scenarios must be ranked 1–n with unique ranks");
}

if (topScenarios().length !== TOP_SCENARIO_COUNT) {
  throw new Error(`Expected ${TOP_SCENARIO_COUNT} top scenarios`);
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
