export const officialCategories = [
  "general",
  "sales",
  "marketing",
  "customer-success",
  "recruiting",
  "operations-finance",
  "product",
  "engineering",
  "life",
] as const;

export type OfficialCategory = (typeof officialCategories)[number];

export type OfficialGuide = {
  owns: string;
  connect: string;
  startWith: string;
};

export type OfficialUseCase = {
  slug: string;
  title: string;
  category: OfficialCategory;
  role: string;
  guide?: OfficialGuide;
};

export const OFFICIAL_SOURCE_URL = "https://x.ai/bot/use-cases";
export const OFFICIAL_DOCS_URL = "https://docs.x.ai/grok-bot/use-cases";

const officialGuides: Record<string, OfficialGuide> = {
  "chief-of-staff": {
    owns: "a source-linked digest of what changed and what needs attention.",
    connect: "Slack, email, calendar, meeting notes, and planning documents.",
    startWith:
      "Review activity since yesterday across my approved channels, inbox, calendar, and meeting notes. Return only items that map to the priorities in this document. For each item, include the source, why it matters, the proposed next step, and whether I owe a decision. Do not send messages or change meetings.",
  },
  "sales-outbound": {
    owns: "account research, contact prioritization, and review-ready outreach.",
    connect:
      "customer relationship management (CRM), product-intent sources, company websites, email, and professional networks as permitted by their terms.",
    startWith:
      "Research the 25 accounts in this CRM view. Score them against our ideal customer profile (ICP) and recent intent, identify up to three relevant contacts per account, and draft email and LinkedIn outreach in the style examples attached. Skip anyone already in an active sequence. Return a review list; do not send or enroll anyone.",
  },
  "paid-media": {
    owns: "campaign monitoring and budget recommendations.",
    connect: "advertising platforms, analytics, budget spreadsheet, and Slack.",
    startWith:
      "Pull current spend and performance by campaign. Compare it with the monthly budget and target customer acquisition cost (CAC), then recommend reallocations with the supporting numbers. Draft a Slack update for the growth team. Do not change budgets or send the message.",
  },
  "account-health": {
    owns: "risk and expansion signals across a customer portfolio.",
    connect: "CRM, product usage, support, billing, and customer-success notes.",
    startWith:
      "Review the accounts in this portfolio. Combine recent usage, support escalations, renewal timing, and stakeholder activity into a ranked watch list. For each account, include the evidence, why it matters, and a suggested next step. Do not contact customers or edit the CRM.",
  },
  "talent-scout": {
    owns: "sourcing, candidate research, outreach drafts, and scheduling preparation.",
    connect: "applicant tracking system (ATS), approved sourcing tools, email, and calendar.",
    startWith:
      "For this role description, find 20 potential candidates who meet the must-have criteria. Exclude anyone already in our ATS, explain the evidence for each match, and draft personalized outreach in my voice. Do not contact anyone.",
  },
  "expense-manager": {
    owns: "weekly expense reconciliation and missing-information follow-up.",
    connect: "expense system, email, shared drive, and finance spreadsheets.",
    startWith:
      "Build this week's expense summary from the expense system and attached policy. Match receipts from the finance inbox, flag missing categories or policy exceptions, and draft one follow-up per owner. Return the summary and drafts; do not send messages or change reimbursements.",
  },
  "bug-reproduction": {
    owns: "turning reports into reliable reproduction packs.",
    connect: "issue tracker, staging environment, browser, and network tools.",
    startWith:
      "Read this bug report and reproduce it in staging using a fresh test account. Return exact steps, expected and actual behavior, screenshots, browser and OS details, relevant console or network notes, and a minimal test case if possible. Do not use production customer data.",
  },
  "product-performance": {
    owns: "targeted performance investigations with evidence.",
    connect: "observability, analytics, incident tooling, and source-control links.",
    startWith:
      "Investigate the checkout latency increase since yesterday's release. Review dashboards, traces, and flamegraphs; identify the highest-confidence hotspot; and return a short write-up with screenshots and direct links. Separate facts from hypotheses. Do not change alerts or production settings.",
  },
};

function caseOf(
  slug: string,
  title: string,
  category: OfficialCategory,
  role: string,
): OfficialUseCase {
  const guide = officialGuides[slug];
  return guide ? { slug, title, category, role, guide } : { slug, title, category, role };
}

export const officialUseCases: readonly OfficialUseCase[] = [
  caseOf(
    "chief-of-staff",
    "Chief of Staff",
    "general",
    "Your always-on assistant. Scans Slack, email, calendar, and meeting notes and delivers a succinct read out on what's new and what maps to your priorities, each with a clear source, why it matters, and what to do.",
  ),
  caseOf(
    "daily-briefing-writer",
    "Daily Briefing Writer",
    "general",
    "Start the day with high quality inputs instead of noise. Delivers a tight daily brief of only the stories that matter to you.",
  ),
  caseOf(
    "executive-assistant",
    "Executive Assistant",
    "general",
    "Stay oriented without living in channels. Delivers a morning briefing, plus an automatic catch-up summary whenever you join a new room, so you're never lost in a thread you just entered.",
  ),
  caseOf(
    "inbox-manager",
    "Inbox Manager",
    "general",
    "Keep email usable. Triages your inbox into clear categories, surfaces urgent and blocked threads, and drafts replies and cleanup. Every send stays behind your approval.",
  ),
  caseOf(
    "presentation-designer",
    "Presentation Designer",
    "general",
    "Build on-brand decks without starting from a blank slide. Uses your master template and brand system and delivers an editable link ready to refine and present.",
  ),
  caseOf(
    "status-report-writer",
    "Status Report Writer",
    "general",
    "Own the to-do so nothing slips. Pulls open action items from docs, meetings, and Slack into one living list and a morning digest.",
  ),

  caseOf(
    "account-research-specialist",
    "Account Research Specialist",
    "sales",
    "Tier accounts before you touch them. Pulls Salesforce + live signals, scores fit and warmth, and builds a shareable research pack per account.",
  ),
  caseOf(
    "crm-operations-manager",
    "CRM Operations Manager",
    "sales",
    "Keep the pipeline clean. Handles CRM and org-chart hygiene before and after meetings so records stay current without a manual pass.",
  ),
  caseOf(
    "deal-desk-coordinator",
    "Deal Desk Coordinator",
    "sales",
    "Draft contextual internal deal notes from past emails, Salesforce, and calls, then submit in Salesforce once you approve.",
  ),
  caseOf(
    "deck-updater",
    "Deck Updater",
    "sales",
    "Leave the room with the slide already moving. Updates your deck from discovery notes mid-call or right after, with next steps baked in.",
  ),
  caseOf(
    "meeting-prep-buddy",
    "Meeting Prep Buddy",
    "sales",
    "Walk into every meeting ready. Builds prep packs from calendar, notes, CRM, Gong, and Slack: who's in the room, last touch, open threads, and a suggested agenda.",
  ),
  caseOf(
    "pipeline-analyst",
    "Pipeline Analyst",
    "sales",
    "Walk into pipe with a clean view. Scrubs Salesforce + sheets, flags stalls and commit risk, and drops a Monday scoreboard.",
  ),
  caseOf(
    "prospecting-plan-builder",
    "Prospecting Plan Builder",
    "sales",
    "Build the week's book of work. Seeds contacts, enriches email/mobile, and writes a ready-to-work tracker so outbound starts from a list.",
  ),
  caseOf(
    "renewal-desk-operator",
    "Renewal Desk Operator",
    "sales",
    "Walk into every renewal already briefed. Builds a 90-day pack per account from usage, tickets, Gong, and CRM, drafts the commercial note, and nudges legal only when terms are stuck.",
  ),
  caseOf(
    "sales-call-coach",
    "Sales Call Coach",
    "sales",
    "Leave every call with homework. Reviews Gong calls and leaves timestamped coaching on discovery, objections, and executive presence, plus a call score.",
  ),
  caseOf(
    "sales-outbound",
    "Sales Outbound",
    "sales",
    "Hand off research and outbound. Researches accounts overnight, scores contacts with intent, drafts email and LinkedIn in your voice, and leaves a review list for you to approve.",
  ),

  caseOf(
    "community-operations-manager",
    "Community Operations Manager",
    "marketing",
    "Keep the ambassador loop moving. Screens apps, triages DMs across channels, and drafts nurture on a cadence so community isn't a full-time chase.",
  ),
  caseOf(
    "compelling-events-monitor",
    "Compelling Events Monitor",
    "marketing",
    "Engage when there's a real reason. Watches leadership posts for awards, launches, and hiring signals, then sends a short digest of posts to engage with with comments or quote reposts in your voice.",
  ),
  caseOf(
    "competitive-intelligence-analyst",
    "Competitive Intelligence Analyst",
    "marketing",
    "See the landscape shift in meaningful ways. Monitors overnight for new launches and audits your site for fatigued creatives and stale messaging. Surfaces only important shifts that gain traction and suggest changes for you to make.",
  ),
  caseOf(
    "event-guest-screener",
    "Event Guest Screener",
    "marketing",
    "Fill the room with the right people. Scores event applicants against your ICP and batch-approves strong fits in the invite tool.",
  ),
  caseOf(
    "internal-communications-manager",
    "Internal Communications Manager",
    "marketing",
    "Draft clear, on-voice copy from your real context, matched to each audience and channel. Review-only so it never sends on its own.",
  ),
  caseOf(
    "linkedin-campaign-manager",
    "LinkedIn Campaign Manager",
    "marketing",
    "Own lead-gen funnel consistency across ads, forms, follow-up, and UTMs. Drafts campaigns for approval and keeps every offer and handoff clean.",
  ),
  caseOf(
    "marketing-calendar-owner",
    "Marketing Calendar Owner",
    "marketing",
    "Keep regional and global content, launch, and events calendars in sync. Pulls from Notion and keeps webinars and campaigns current without a weekly chase.",
  ),
  caseOf(
    "merch-fulfillment-operator",
    "Merch Fulfillment Operator",
    "marketing",
    "Send merch to the right prospects. Runs outreach, watches the redemption form, pings you to approve/reject submission in chat, and sends your swag vendor a daily order form so they know when and where to dispatch swag.",
  ),
  caseOf(
    "newsletter-writer",
    "Newsletter Writer",
    "marketing",
    "Ship monthly marketing and product updates on time. Pulls what's new from launches, wins, and your calendar, writes the issue in your voice, and parks it for review so marketing can edit once and send.",
  ),
  caseOf(
    "paid-media",
    "Paid Media",
    "marketing",
    "Pulls live channel and campaign data, Slacks a recommended reallocation against your monthly budget, and holds for your approval before making adjustments.",
  ),
  caseOf(
    "paid-media-creative-strategist",
    "Paid Media Creative Strategist",
    "marketing",
    "Spot early creative winners before they're obvious. Writes a sharp why-it-works hypothesis and proposes the next test. No invented metrics.",
  ),
  caseOf(
    "seo-aeo-auditor",
    "SEO / AEO Auditor",
    "marketing",
    "Track keyword, technical, AI-prompt, and competitor movement in one place. Surfaces whether you're gaining or losing ground, flags site issues that need a fix, and returns an optimization plan you can act on.",
  ),
  caseOf(
    "social-media-manager",
    "Social Media Manager",
    "marketing",
    "Post in your voice without living in drafts. Studies your real history, drafts when something noteworthy ships, parks posts for you to publish, and keeps the queue moving.",
  ),

  caseOf(
    "account-health",
    "Account Health",
    "customer-success",
    "See risk and expansion before the QBR. Reads usage and signals across your book and turns portfolio noise into a clear watch list.",
  ),
  caseOf(
    "account-manager",
    "Account Manager",
    "customer-success",
    "Keep every key account warm without rebuilding context each time. Preps every call from transcripts, notes, CRM, and Slack, drafts follow-ups, and keeps next steps current.",
  ),
  caseOf(
    "enablement-fulfillment-specialist",
    "Enablement Fulfillment Specialist",
    "customer-success",
    'Answer "send me the recordings" without digging. Finds Zoom assets, builds one-pagers, uploads to Drive, and drafts the reply with links.',
  ),
  caseOf(
    "ticket-triage-specialist",
    "Ticket Triage Specialist",
    "customer-success",
    "Clear the queue without living in it. Watches support on a cadence, drafts replies only, and stays quiet when it's clean.",
  ),

  caseOf(
    "calendar-coordinator",
    "Calendar Coordinator",
    "recruiting",
    "Get people in the same room. Schedules across calendars and chases the holds nobody else has time to chase.",
  ),
  caseOf(
    "hiring-screener",
    "Hiring Screener",
    "recruiting",
    "Interview the strong ones, not the whole pile. Scores applications or work samples against a defined bar and hands off an ATS-ready review.",
  ),
  caseOf(
    "onboarding-manager",
    "Onboarding Manager",
    "recruiting",
    "Give new hires a path, not a pile of links. Builds the checklist, pulls the right docs, answers day-one questions, and routes each ask to whoever can unblock it.",
  ),
  caseOf(
    "talent-scout",
    "Talent Scout",
    "recruiting",
    "Keep recruiting moving while you sleep. Runs screen-to-offer: sources, drafts outreach in your voice, skips people already in the ATS, and handles scheduling once you approve.",
  ),

  caseOf(
    "contract-desk",
    "Contract Desk",
    "operations-finance",
    "See the week of paper at a glance. Summarizes by stage and owner, pulls key terms, and flags blocked reviews.",
  ),
  caseOf(
    "expense-manager",
    "Expense Manager",
    "operations-finance",
    "Stay on top of the money. Builds the weekly summary from your expense manager and sheets, logs new receipts from email, and nudges owners on missing categories before review.",
  ),
  caseOf(
    "invoice-coordinator",
    "Invoice Coordinator",
    "operations-finance",
    "Stop invoices from sitting. Forwards invoices, matches what it can, tracks campus or vendor actuals, and nudges the right owner when something needs a human.",
  ),
  caseOf(
    "security-questionnaire-filler",
    "Security Questionnaire Filler",
    "operations-finance",
    "Speed through vendor security portals. Logs into the questionnaire site, pulls answers from your trust center and past RFPs, drafts every field, and parks the submit for you.",
  ),
  caseOf(
    "vendor-portal-operator",
    "Vendor Portal Operator",
    "operations-finance",
    "Run renewals, seats, and procurement on portals with no clean API. Clicks the same path every week and comes back with exceptions only.",
  ),

  caseOf(
    "beta-adoption-watcher",
    "Beta Adoption Watcher",
    "product",
    "See who's actually trying the new feature. Monitors usage and surfaces which customers are in, so the team can follow up.",
  ),
  caseOf(
    "call-faq-miner",
    "Call FAQ Miner",
    "product",
    "Keep enablement current from real calls. Tracks questions, timestamps answers, and links back to the source recording.",
  ),
  caseOf(
    "docs-auditor",
    "Docs Auditor",
    "product",
    "Catch docs that are out of date with the product. Diffs help center and internal notes against what shipped last week, flags stale pages, and drafts the rewrite.",
  ),
  caseOf(
    "feature-request-tracker",
    "Feature Request Tracker",
    "product",
    'Never lose "who asked for this." Mines Slack and calls into a living list tied to customers, so the spec has a real demand trail.',
  ),
  caseOf(
    "product-feedback-analyst",
    "Product Feedback Analyst",
    "product",
    "Turn scattered product signal into a prioritized view. Collects and clusters feedback from connected sources, weighs evidence and urgency, and drafts routing recommendations for approval.",
  ),

  caseOf(
    "bug-reproduction",
    "Bug Reproduction",
    "engineering",
    "Give engineers reports they can trust. Catches the thread, clicks the same path in staging, captures the failure, and drops a repro pack (steps, screenshots, network notes).",
  ),
  caseOf(
    "cloud-agent-orchestrator",
    "Cloud Agent Orchestrator",
    "engineering",
    "Keep many cloud agent runs moving without babysitting each one. Kicks off runs, monitors, chases what's stuck, and summarizes the report.",
  ),
  caseOf(
    "playtest-operator",
    "Playtest Operator",
    "engineering",
    "Brute-force test the product path when APIs aren't enough. Drives the UI on a computer, captures failures, and returns a tight findings pack.",
  ),
  caseOf(
    "product-performance",
    "Product Performance",
    "engineering",
    "Get a clear view of the metrics that matter. Logs into observability tools, walks the flamegraphs, and comes back with hotspots plus a short writeup with screenshots.",
  ),
  caseOf(
    "prototype-builder",
    "Prototype Builder",
    "engineering",
    "Go from ask to something clickable fast. Writes on its computer and comes back with a screenshot plus a live URL.",
  ),

  caseOf(
    "apartment-scout",
    "Apartment Scout",
    "life",
    "Book tours with a shortlist of eligible apartments as soon as they go on the market. Filters listings, emails to book tour times, and applies for the ones you pick.",
  ),
  caseOf(
    "personal-site-builder",
    "Personal Site Builder",
    "life",
    "Scaffold a personal site from a description, untangle domain issues, and leave you with a live starting point.",
  ),
  caseOf(
    "subscription-cleaner",
    "Subscription Cleaner",
    "life",
    "Cut the noise you forgot about. Collates receipt and newsletter mail, suggests what to kill, and unsubscribes what you approve.",
  ),
  caseOf(
    "travel-coordinator",
    "Travel Coordinator",
    "life",
    "Hold the best option before it expires. Compares flights and hotels to your rules, confirms before booking, and drops itinerary plus calendar.",
  ),
];

export const officialGuideCount = officialUseCases.filter((item) => item.guide).length;

if (officialUseCases.length !== 56) {
  throw new Error(`Expected 56 official use cases, got ${officialUseCases.length}`);
}

if (officialGuideCount !== 8) {
  throw new Error(`Expected 8 official first tasks, got ${officialGuideCount}`);
}
