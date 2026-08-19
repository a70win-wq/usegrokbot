import type { UseCase } from "./types";

/** `tested` is reserved. Only assign it after UseGrokBot has actually run the Bot. */
export type TrustStatus = "official" | "library" | "community" | "tested";

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

const community: Record<string, { label: string; url: string }> = {
  "reddit-thread-scout": {
    label: "Axel Schapmann: Grok Bot for Reddit marketing",
    url: "https://www.linkedin.com/posts/axel-schapmann_how-to-use-grok-bot-for-reddit-marketing-activity-7494004829774688256-L40s",
  },
  "travel-concierge": {
    label: "Nate’s Newsletter: Grok Bot review",
    url: "https://natesnewsletter.substack.com/p/grok-bot-review",
  },
  "youtube-comment-desk": {
    label: "Remy: what I’m actually using Grok Bot for",
    url: "https://aiwithremy.beehiiv.com/p/what-i-m-actually-using-grok-bot-for",
  },
  "x-viral-scout": {
    label: "Remy: content Bot across X and LinkedIn",
    url: "https://aiwithremy.beehiiv.com/p/what-i-m-actually-using-grok-bot-for",
  },
  "monday-marketing-report": {
    label: "Jellypod: How to use Grok Bot for marketing",
    url: "https://www.jellypod.com/workflows/how-to-use-grok-bot-for-marketing",
  },
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
  const report = community[slug];
  if (report) {
    return {
      status: "community",
      lastVerified: LAST_REVIEWED,
      source: report,
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
