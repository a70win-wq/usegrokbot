import type { UseCase } from "./types";

export type TrustStatus = "official" | "library" | "community";

export type Verification = {
  status: TrustStatus;
  lastVerified: string;
  source?: {
    label: string;
    url: string;
  };
};

export const LAST_REVIEWED = "2026-08-19";

const XAI_INTRO = {
  label: "xAI: Introducing Grok Bot",
  url: "https://x.ai/news/introducing-grok-bot",
} as const;

const official: Record<string, string> = {
  "lead-researcher": "Sales outbound",
  "prospect-research": "Sales outbound",
  "follow-up-email-writer": "Sales outbound",
  "lost-lead-re-engagement": "Account follow-up",
  "lead-qualification": "Pipeline ops",
  "daily-sales-brief": "Pipeline ops",
  "crm-updater": "Account health / CRM",
  "candidate-researcher": "Talent Scout",
  "ad-monitor": "Paid Media",
  "expense-report-organizer": "Expense Manager",
  "product-researcher": "Product Performance",
  "bug-reproduction-assistant": "Bug Reproduction",
  "daily-work-brief": "Chief of Staff",
  "inbox-organizer": "Inbox management",
  "invoice-follow-up": "Invoice processing",
  "new-employee-onboarding": "Office operations",
  "support-email-assistant": "Customer support queue",
  "github-issue-researcher": "Engineering",
};

export function verificationFor(slug: string): Verification {
  const job = official[slug];
  if (job) {
    return {
      status: "official",
      lastVerified: LAST_REVIEWED,
      source: { label: `xAI: ${job}`, url: XAI_INTRO.url },
    };
  }
  return { status: "library", lastVerified: LAST_REVIEWED };
}

export function isOfficial(useCase: UseCase) {
  return verificationFor(useCase.slug).status === "official";
}

export function formatVerifiedDate(isoDate: string, locale: string) {
  const date = new Date(`${isoDate}T00:00:00`);
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
