import type { AppSlug, CategorySlug } from "./types";

export type SeoGuide = {
  heading: string;
  body: string;
  tasksHeading: string;
  tasks: string[];
  setupHeading: string;
  setup: string;
  faq: { q: string; a: string }[];
};

const categoryGuides: Partial<Record<CategorySlug, SeoGuide>> = {
  sales: {
    heading: "How Grok Bot can help with sales",
    body: "A sales Bot is useful when the job repeats: find companies that look like last quarter’s wins, read a public website before a call, turn messy notes into CRM fields, or draft a follow-up you still approve. Official xAI examples already cover overnight outbound, pipeline hygiene and account follow-up. The prompts here stay in that lane. They tell the Bot what “done” looks like, which public pages to use, and when to stop and ask you.",
    tasksHeading: "Popular sales tasks",
    tasks: [
      "Build a short lead list before outreach",
      "Write a one-page brief before a meeting",
      "Update Salesforce or HubSpot after a call",
      "Draft a follow-up email in your voice",
    ],
    setupHeading: "How to set up a sales Bot",
    setup:
      "Pick one job. Copy the prompt. Fill in your industry, city and the tools you actually use. Run it once while you watch. Only then put it on a daily routine. Do not let it send mail or change a deal stage until you have read the first output.",
    faq: [
      {
        q: "Can Grok Bot send sales email for me?",
        a: "It can draft in Gmail or LinkedIn. Sending without a human check is a bad first week. Use approval until the tone matches you.",
      },
      {
        q: "Does it replace a CRM?",
        a: "No. It writes notes and next steps into the CRM you already have.",
      },
    ],
  },
  marketing: {
    heading: "How Grok Bot can help with marketing",
    body: "Marketing Bots earn their keep on watch jobs: competitor pages, prices, ads, reviews and mentions. xAI has shown Paid Media and product-performance style work. You still decide what “important” means. A good prompt says which URLs to open, what to ignore (redesigns, cookie banners) and where the brief should land.",
    tasksHeading: "Popular marketing tasks",
    tasks: [
      "Check competitor sites every morning",
      "Watch pricing pages for a number change",
      "Summarize ads a rival is running",
      "Turn a week of reviews into phrases you can reuse",
    ],
    setupHeading: "How to set up a marketing Bot",
    setup:
      "Give it a short list of URLs, not “the whole internet”. Ask for a brief only when something moved. Slack or a sheet is enough. Read the first three mornings before you trust the alert.",
    faq: [
      {
        q: "Will it invent competitor news?",
        a: "It will if you let it. Tell it to quote the page and skip anything it cannot open.",
      },
    ],
  },
  research: {
    heading: "How Grok Bot can help with research",
    body: "Research Bots turn an hour of tabs into a page you can read. They work well for company briefs, product comparisons, industry news and a daily AI digest. They do not replace primary sources. The useful ones cite the page, mark low confidence, and refuse to pad the report.",
    tasksHeading: "Popular research tasks",
    tasks: [
      "A daily news brief in your industry",
      "A one-page company brief",
      "A product comparison from public pages",
      "A short report from Reddit or X threads",
    ],
    setupHeading: "How to set up a research Bot",
    setup:
      "Name the question, the sources it may use, and the length of the answer. “One page, three sources, say if you cannot find it” beats “do a deep dive”.",
    faq: [
      {
        q: "Can I use this for investment advice?",
        a: "No. These prompts collect public information. They are not financial advice.",
      },
    ],
  },
};

const appGuides: Partial<Record<AppSlug, SeoGuide>> = {
  gmail: {
    heading: "How Grok Bot can help with Gmail",
    body: "Gmail workflows on this site are jobs that actually live in the inbox: tidy unread mail, draft replies, send a newsletter you still approve, chase an invoice, or write a follow-up. Cases that only drop a copy into email are listed under their real tools, such as Salesforce. Official xAI examples include processing invoices that arrive in Gmail and keeping account follow-up warm.",
    tasksHeading: "Popular Gmail tasks",
    tasks: [
      "Turn a full inbox into five replies",
      "Draft a follow-up after a sales call",
      "Chase an unpaid invoice",
      "Write a support reply you can send",
    ],
    setupHeading: "How to set up a Gmail Bot",
    setup:
      "Connect Gmail. Start with drafts, not send. Tell the Bot which labels to ignore. Review the first day of drafts before you let it touch customers.",
    faq: [
      {
        q: "Why is CRM Updater not on this page?",
        a: "That job writes Salesforce or HubSpot fields. Gmail is only a place notes might start. It belongs on the CRM pages.",
      },
    ],
  },
  notion: {
    heading: "How Grok Bot can help with Notion",
    body: "Notion workflows here are jobs that read or write pages as the main output: meeting notes, research reports, hiring docs, onboarding checklists. If a Bot only “could also save a copy in Notion”, it is not listed as a Notion workflow.",
    tasksHeading: "Popular Notion tasks",
    tasks: [
      "Turn meeting notes into owners and next steps",
      "Build a research page from public sources",
      "Keep an onboarding checklist current",
      "File a weekly report the team can reopen",
    ],
    setupHeading: "How to set up a Notion Bot",
    setup:
      "Point it at one database or one parent page. Ask for a heading structure you already use. Do not give it the whole workspace on day one.",
    faq: [
      {
        q: "Can it redesign my workspace?",
        a: "Do not ask it to. Give it one page shape and keep the rest of the workspace yours.",
      },
    ],
  },
};

export function seoForCategory(slug: CategorySlug) {
  return categoryGuides[slug];
}

export function seoForApp(slug: AppSlug) {
  return appGuides[slug];
}
