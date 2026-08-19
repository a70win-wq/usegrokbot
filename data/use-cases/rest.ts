import type { UseCase } from "../types";

export const restUseCases: UseCase[] = [
  {
    slug: "github-issue-researcher",
    title: "GitHub Issue Researcher",
    shortDescription:
      "Read a pile of GitHub issues and tell you what is actually on fire.",
    description:
      "Point Grok Bot at a repo or paste issues. It groups them, finds duplicates and writes a short brief a non-engineer can follow.",
    problem: "The issue list is long and I cannot see the real problems.",
    category: "coding",
    tags: ["github", "issues", "bugs", "triage"],
    apps: ["github", "slack"],
    difficulty: "medium",
    schedule: "daily",
    setupTime: "6 min",
    featured: true,
    popular: true,
    copies: 10440,
    createdAt: "2026-03-06",
    icon: "FolderGit2",
    steps: [
      "Reads open issues you paste or describe",
      "Groups them by the underlying bug",
      "Marks likely duplicates",
      "Names the ones users feel every day",
      "Writes a triage brief for the next standup",
    ],
    targetUsers: ["engineering leads", "founders", "support-facing developers"],
    related: ["bug-reproduction-assistant", "error-monitor", "pr-reviewer"],
    exampleOutput: {
      title: "Issue brief · 61 open",
      items: [
        {
          name: "On fire",
          status: "alert",
          summary: "Mobile upload at step 3. 11 issues, 4 look like duplicates of #482.",
        },
        {
          name: "Quiet but costly",
          status: "watch",
          summary: "Board lock after 6pm. Only 3 issues, all from paying sites.",
        },
        {
          name: "Later",
          status: "ok",
          summary: "Dark-mode polish. Leave it.",
        },
      ],
    },
    prompt: `You are my GitHub Issue Researcher.

Triage issues for a busy team.

Repo / issues: [paste]
Product context: [what users feel]

Return:
1. Groups, with likely duplicates
2. What users feel every day
3. What can wait
4. Questions to ask before coding
5. A standup brief in 8 lines

Do not invent issue numbers.`,
  },
  {
    slug: "bug-reproduction-assistant",
    title: "Bug Reproduction Assistant",
    shortDescription:
      "Turn a vague bug report into steps someone can actually follow.",
    description:
      "Paste the report. Grok Bot writes clear reproduce steps, what to capture, and what extra question to ask the reporter.",
    problem: "Bug tickets say “it doesn’t work” and then sit for days.",
    category: "coding",
    tags: ["bugs", "qa", "repro"],
    apps: ["github", "browser"],
    difficulty: "easy",
    schedule: "one-time",
    setupTime: "4 min",
    featured: false,
    popular: true,
    copies: 8810,
    createdAt: "2026-03-17",
    icon: "Bug",
    steps: [
      "Reads the bug report",
      "Writes numbered steps to reproduce",
      "Lists what is still missing",
      "Suggests one question for the reporter",
      "Names the most likely place to look, without guessing a fix",
    ],
    targetUsers: ["developers", "QA", "support engineers"],
    related: ["github-issue-researcher", "website-qa-bot", "error-monitor"],
    exampleOutput: {
      title: "Repro · mobile upload",
      items: [
        {
          name: "Steps",
          status: "ok",
          summary: "iPhone, Safari, site photo over 8MB, step 3 of onboarding. Fails after the spinner.",
        },
        {
          name: "Missing",
          status: "watch",
          summary: "iOS version and whether Wi‑Fi or LTE. Ask before you deep-dive.",
        },
        {
          name: "Look first",
          status: "alert",
          summary: "The client resize step. Desktop works because it never hits that path.",
        },
      ],
    },
    prompt: `You are my Bug Reproduction Assistant.

Turn a vague report into steps.

Report: [paste]
Product / platform: [notes]

Return:
1. Numbered reproduce steps
2. Expected vs actual
3. Missing info
4. One question for the reporter
5. Where I should look first
6. What I should not assume

If it cannot be reproduced from this report, say so.`,
  },
  {
    slug: "pr-reviewer",
    title: "PR Reviewer",
    shortDescription:
      "Read a pull request like a careful teammate and leave useful comments.",
    description:
      "Paste a diff or PR description. Grok Bot lists risks, missing tests and questions — not a style-nit parade.",
    problem: "Reviews are either rubber stamps or 40 nits about commas.",
    category: "coding",
    tags: ["github", "pull requests", "review"],
    apps: ["github"],
    difficulty: "medium",
    schedule: "one-time",
    setupTime: "5 min",
    featured: false,
    popular: false,
    copies: 7690,
    createdAt: "2026-06-12",
    icon: "GitPullRequest",
    steps: [
      "Reads the PR description and diff",
      "Restates what the change is for",
      "Lists real risks",
      "Asks questions instead of inventing intent",
      "Suggests tests that are actually missing",
    ],
    targetUsers: ["developers", "tech leads"],
    related: ["github-issue-researcher", "bug-reproduction-assistant", "error-monitor"],
    exampleOutput: {
      title: "Review · resize on upload",
      items: [
        {
          name: "Intent",
          status: "ok",
          summary: "Shrink site photos on device before step 3. Good.",
        },
        {
          name: "Risk",
          status: "alert",
          summary: "HEIC on older iPhones. No test. This is how the last bug started.",
        },
        {
          name: "Ask",
          status: "watch",
          summary: "What happens when resize fails? The PR only shows the happy path.",
        },
      ],
    },
    prompt: `You are my PR Reviewer.

Review like a careful teammate.

PR description: [paste]
Diff: [paste]
What this area of the product does: [context]

Return:
1. What the PR is for
2. Risks
3. Missing tests
4. Questions
5. Nits, if any, in a short list
6. Approve / request changes / need more context

Do not rewrite the code unless asked.`,
  },
  {
    slug: "website-qa-bot",
    title: "Website QA Bot",
    shortDescription:
      "Click through a site like a new user and write down what is broken or confusing.",
    description:
      "Give Grok Bot a URL and a job to complete. It walks the flow and reports broken bits, confusing copy and missing states.",
    problem: "We ship pages and only notice problems when a customer emails.",
    category: "coding",
    tags: ["qa", "website", "ux"],
    apps: ["browser", "github"],
    difficulty: "easy",
    schedule: "one-time",
    setupTime: "6 min",
    featured: false,
    popular: false,
    copies: 6540,
    createdAt: "2026-06-18",
    icon: "Globe",
    steps: [
      "Opens the pages you name",
      "Tries to complete the job as a new user",
      "Notes broken links, dead buttons and confusing copy",
      "Checks empty and error states if they exist",
      "Writes a QA note you can file",
    ],
    targetUsers: ["developers", "designers", "founders"],
    related: ["bug-reproduction-assistant", "error-monitor", "pr-reviewer"],
    exampleOutput: {
      title: "QA · /onboarding step 3",
      items: [
        {
          name: "Broken",
          status: "alert",
          summary: "“Use desktop instead” link 404s on mobile Safari.",
        },
        {
          name: "Confusing",
          status: "watch",
          summary: "The button says Continue while a spinner is already running. People tap twice.",
        },
        {
          name: "Missing",
          status: "ok",
          summary: "No empty state if the photo library permission is denied.",
        },
      ],
    },
    prompt: `You are my Website QA Bot.

Act like a new user trying to finish one job.

URL / flow: [pages]
Job to complete: [job]
Devices to imagine: [mobile / desktop]

Return:
1. Broken
2. Confusing
3. Missing states
4. Copy that should change
5. What is fine
6. A ticket-ready summary

Be specific. Quote the button labels you saw.`,
  },
  {
    slug: "error-monitor",
    title: "Error Monitor",
    shortDescription:
      "Read error logs and tell you which ones users felt today.",
    description:
      "Paste a log dump or a Sentry-style list. Grok Bot groups errors, guesses user impact and writes a morning note for the team.",
    problem: "The error inbox is noisy and the important ones hide.",
    category: "coding",
    tags: ["errors", "monitoring", "logs"],
    apps: ["github", "slack"],
    difficulty: "medium",
    schedule: "daily",
    setupTime: "6 min",
    featured: false,
    popular: false,
    copies: 4980,
    createdAt: "2026-06-22",
    icon: "ShieldAlert",
    steps: [
      "Reads the errors you paste",
      "Groups repeats",
      "Marks which ones a user would feel",
      "Compares with yesterday if you paste it",
      "Writes a short morning note",
    ],
    targetUsers: ["developers", "on-call", "engineering leads"],
    related: ["github-issue-researcher", "bug-reproduction-assistant", "website-qa-bot"],
    exampleOutput: {
      title: "Errors · last 24h",
      items: [
        {
          name: "Users felt this",
          status: "alert",
          summary: "upload.resize HEIC fail, 86 events, 19 users, all on iOS 17.",
        },
        {
          name: "Noise",
          status: "ok",
          summary: "A crawler hitting /api/old. Ignore.",
        },
        {
          name: "New",
          status: "watch",
          summary: "calendar.sync timeout appeared at 02:10. 4 events. Watch today.",
        },
      ],
    },
    prompt: `You are my Error Monitor.

Find the errors a user felt.

Logs / events: [paste]
Yesterday’s brief, if any: [paste]

Return:
1. Errors users felt
2. Noise to ignore
3. New since yesterday
4. What to do this morning
5. What to watch

Do not invent stack traces.`,
  },
  {
    slug: "expense-report-organizer",
    title: "Expense Report Organizer",
    shortDescription:
      "Turn a pile of receipts into a clean expense list ready to submit.",
    description:
      "Paste receipts or a card export. Grok Bot groups them, flags missing fields and writes a list your finance person will accept.",
    problem: "Expense reports sit in my photos app until someone chases me.",
    category: "finance",
    tags: ["expenses", "receipts", "finance"],
    apps: ["gmail", "google-sheets"],
    difficulty: "easy",
    schedule: "weekly",
    setupTime: "5 min",
    featured: false,
    popular: false,
    copies: 6720,
    createdAt: "2026-04-07",
    icon: "Receipt",
    steps: [
      "Reads receipts or card lines you paste",
      "Groups them by trip or category",
      "Flags missing merchants, dates or amounts",
      "Marks personal charges to pull out",
      "Writes a submit-ready list",
    ],
    targetUsers: ["office workers", "founders", "managers"],
    related: ["invoice-follow-up", "weekly-cash-snapshot", "weekly-report-generator"],
    exampleOutput: {
      title: "Expenses · Chicago trip",
      items: [
        {
          name: "Ready",
          status: "ok",
          summary: "8 lines. Hotels and taxis are complete.",
        },
        {
          name: "Missing",
          status: "alert",
          summary: "Thursday dinner has no receipt. Amount $64. Ask finance if a card line is enough.",
        },
        {
          name: "Pull out",
          status: "watch",
          summary: "Airport bookstore looks personal. Do not submit it.",
        },
      ],
    },
    prompt: `You are my Expense Report Organizer.

Make a list finance will accept.

Receipts / card lines: [paste]
Policy notes: [what is allowed]
Trip or month: [name]

Return:
1. Clean list — date, merchant, amount, category
2. Missing fields
3. Items to pull out
4. A short note to finance
5. Total

Do not invent amounts.`,
  },
  {
    slug: "invoice-follow-up",
    title: "Invoice Follow-up",
    shortDescription:
      "Write a polite, specific note about an unpaid invoice.",
    description:
      "Give Grok Bot the invoice and the relationship. It drafts a first note and a firmer second note that still sounds like a person.",
    problem: "Chasing invoices feels awkward so I wait too long.",
    category: "finance",
    tags: ["invoices", "follow-up", "email"],
    apps: ["gmail", "google-sheets"],
    difficulty: "easy",
    schedule: "weekly",
    setupTime: "3 min",
    featured: false,
    popular: false,
    copies: 5590,
    createdAt: "2026-04-23",
    icon: "DollarSign",
    steps: [
      "Reads the invoice details",
      "Writes a first follow-up with the facts",
      "Writes a firmer second note",
      "Suggests when to send each",
      "Keeps the relationship intact",
    ],
    targetUsers: ["founders", "freelancers", "finance coordinators"],
    related: ["follow-up-email-writer", "expense-report-organizer", "weekly-cash-snapshot"],
    exampleOutput: {
      title: "Invoice 1842 · Harbor Path · 18 days",
      items: [
        {
          name: "Send today",
          status: "alert",
          summary:
            "Short note with invoice number, amount, and the original PDF. Ask if AP needs a PO.",
        },
        {
          name: "If silence",
          status: "watch",
          summary: "Day 25: one paragraph, cc the person who signed the SOW.",
        },
        {
          name: "Do not",
          status: "ok",
          summary: "No fake late fees. They were not in the contract.",
        },
      ],
    },
    prompt: `You are my Invoice Follow-up Bot.

Write notes that get paid without burning the relationship.

Invoice: [number, amount, date, terms]
Who I am writing to: [name]
Relationship: [new / long / tense]
What I already sent: [notes]

Return:
1. First follow-up
2. Second follow-up
3. When to send each
4. What not to say
5. A one-line internal reminder`,
  },
  {
    slug: "weekly-cash-snapshot",
    title: "Weekly Cash Snapshot",
    shortDescription:
      "Turn account numbers into a one-screen picture of the week’s cash.",
    description:
      "Paste balances and upcoming bills. Grok Bot writes what came in, what goes out, and whether next week is tight.",
    problem: "I only look at the bank when something feels wrong.",
    category: "finance",
    tags: ["cash", "weekly", "finance"],
    apps: ["google-sheets", "slack"],
    difficulty: "easy",
    schedule: "weekly",
    setupTime: "5 min",
    featured: false,
    popular: false,
    copies: 4870,
    createdAt: "2026-05-16",
    icon: "Wallet",
    steps: [
      "Reads balances and upcoming bills you paste",
      "Lists money in and money out",
      "Flags anything that makes next week tight",
      "Writes a snapshot for Slack",
      "Names one decision, if there is one",
    ],
    targetUsers: ["founders", "ops leads", "small finance teams"],
    related: ["expense-report-organizer", "invoice-follow-up", "weekly-report-generator"],
    exampleOutput: {
      title: "Cash · week 33",
      items: [
        {
          name: "In",
          status: "ok",
          summary: "Two invoices cleared. $41,200.",
        },
        {
          name: "Out",
          status: "watch",
          summary: "Payroll Friday and the Dallas travel card. $28,400.",
        },
        {
          name: "Tight?",
          status: "alert",
          summary: "No. But invoice 1842 slipping another week would make week 35 tight. Chase it Monday.",
        },
      ],
    },
    prompt: `You are my Weekly Cash Snapshot Bot.

Make a picture a founder can read in one minute.

Balances: [paste]
Money in this week: [list]
Money out this week: [list]
Upcoming: [list]

Return:
1. Snapshot in 5 lines
2. In
3. Out
4. Is next week tight?
5. One decision
6. Slack version

No forecasts you cannot support.`,
  },
  {
    slug: "personal-weekly-review",
    title: "Personal Weekly Review",
    shortDescription:
      "Close the week with a short review and a realistic next-week plan.",
    description:
      "Paste what happened. Grok Bot writes what mattered, what to drop, and three outcomes for next week.",
    problem: "Weeks end and I cannot remember what I actually did.",
    category: "productivity",
    tags: ["review", "planning", "weekly"],
    apps: ["notion", "google-calendar"],
    difficulty: "easy",
    schedule: "weekly",
    setupTime: "5 min",
    featured: false,
    popular: true,
    copies: 9340,
    createdAt: "2026-04-12",
    icon: "ListChecks",
    steps: [
      "Reads your notes, calendar and leftovers",
      "Names what actually moved",
      "Lists what to drop",
      "Writes three outcomes for next week",
      "Suggests one rest or reset",
    ],
    targetUsers: ["office workers", "founders", "managers"],
    related: ["daily-work-brief", "calendar-organizer", "focus-block-planner"],
    exampleOutput: {
      title: "Week 33 review",
      items: [
        {
          name: "Moved",
          status: "ok",
          summary: "Dallas owner chart. Two site visits. That is the week.",
        },
        {
          name: "Drop",
          status: "watch",
          summary: "The blog outline. It waited three Fridays. Kill it or schedule it Monday 9:00.",
        },
        {
          name: "Next week",
          status: "alert",
          summary: "1) Name the Sunday owner  2) Chase invoice 1842  3) Decline the Thursday all-hands if there is no agenda.",
        },
      ],
    },
    prompt: `You are my Personal Weekly Review Bot.

Help me close the week honestly.

Notes: [paste]
Calendar: [paste]
How I feel: [optional]

Return:
1. What actually moved
2. What was busywork
3. What to drop
4. Three outcomes for next week
5. One thing to rest or reset
6. A Monday morning first step`,
  },
  {
    slug: "focus-block-planner",
    title: "Focus Block Planner",
    shortDescription:
      "Protect two hours for the work that needs a closed door.",
    description:
      "Tell Grok Bot the deep work and the week you have. It finds the least-bad blocks and writes the declines you need to send.",
    problem: "Deep work always loses to the next meeting.",
    category: "productivity",
    tags: ["focus", "calendar", "deep work"],
    apps: ["google-calendar"],
    difficulty: "easy",
    schedule: "weekly",
    setupTime: "4 min",
    featured: false,
    popular: false,
    copies: 7010,
    createdAt: "2026-05-04",
    icon: "Timer",
    steps: [
      "Reads the week and the deep work you name",
      "Finds two-hour blocks that are still free",
      "Suggests what to decline to make one if needed",
      "Writes the calendar title and a do-not-disturb note",
      "Adds a shutdown rule so the block actually ends",
    ],
    targetUsers: ["makers", "managers", "founders"],
    related: ["calendar-organizer", "daily-work-brief", "personal-weekly-review"],
    exampleOutput: {
      title: "Focus blocks · week 34",
      items: [
        {
          name: "Take these",
          status: "alert",
          summary: "Tuesday 9:00–11:00 and Thursday 8:30–10:30. Both still empty.",
        },
        {
          name: "If needed",
          status: "watch",
          summary: "Move the Wednesday standup to a written update. That frees 9:30–10:00.",
        },
        {
          name: "Title",
          status: "ok",
          summary: "“Dallas owner chart — do not book.” Not “busy”.",
        },
      ],
    },
    prompt: `You are my Focus Block Planner.

Protect time for one piece of deep work.

Deep work: [thing]
Week: [calendar]
Constraints: [kids, time zones, hard meetings]

Return:
1. Best blocks
2. What to decline, with a sentence
3. Calendar title
4. How to start the block
5. How to end it
6. What to do if the week is already full`,
  },
  {
    slug: "personal-research-digest",
    title: "Personal Research Digest",
    shortDescription:
      "A short digest of the tabs and papers you meant to read.",
    description:
      "Paste links or notes. Grok Bot writes a digest with what to read, what to skim and what to drop — tied to the project you care about.",
    problem: "My read-later list is where articles go to die.",
    category: "productivity",
    tags: ["reading", "research", "digest"],
    apps: ["browser", "notion"],
    difficulty: "easy",
    schedule: "weekly",
    setupTime: "5 min",
    featured: false,
    popular: false,
    copies: 5280,
    createdAt: "2026-05-20",
    icon: "Library",
    steps: [
      "Reads the links or notes you paste",
      "Ties each one to the project you name",
      "Marks read / skim / drop",
      "Writes a three-item digest",
      "Saves one quote worth keeping",
    ],
    targetUsers: ["researchers", "founders", "operators"],
    related: ["daily-ai-news-brief", "blog-research-assistant", "personal-weekly-review"],
    exampleOutput: {
      title: "Digest · dock software reading list",
      items: [
        {
          name: "Read",
          status: "alert",
          summary: "The 2025 3PL ops survey. It has the only same-day change numbers you have.",
        },
        {
          name: "Skim",
          status: "watch",
          summary: "Vendor white paper. Pages 2 and 7 only.",
        },
        {
          name: "Drop",
          status: "ok",
          summary: "Three “future of warehousing” essays. No numbers.",
        },
      ],
    },
    prompt: `You are my Personal Research Digest Bot.

Triage my reading list against one project.

Project: [project]
Links / notes: [paste]
Time I have: [minutes]

Return:
1. Read
2. Skim — which part
3. Drop
4. A 3-item digest
5. One quote or number to keep
6. What I still need that is not in this list`,
  },
  {
    slug: "competitor-social-monitor",
    title: "Competitor Social Monitor",
    shortDescription:
      "See what competitors posted this week and whether anyone cared.",
    description:
      "Grok Bot checks competitor pages on LinkedIn, X and YouTube, then reports what they shipped, what landed and what you can ignore.",
    problem: "I only notice competitor posts when someone forwards them.",
    category: "marketing",
    tags: ["competitors", "social", "linkedin", "x"],
    apps: ["linkedin", "x", "youtube", "slack"],
    difficulty: "easy",
    schedule: "weekly",
    setupTime: "5 min",
    featured: false,
    popular: false,
    copies: 6140,
    createdAt: "2026-03-05",
    icon: "Radio",
    steps: [
      "Checks competitor profiles you name",
      "Lists posts, videos and big threads from the week",
      "Notes what got real replies",
      "Ignores empty engagement bait",
      "Suggests one thing to learn, not copy",
    ],
    targetUsers: ["marketers", "founders", "social teams"],
    related: ["competitor-monitor", "ad-monitor", "x-content-researcher"],
    exampleOutput: {
      title: "Social · 4 competitors · week 33",
      items: [
        {
          name: "Landed",
          status: "alert",
          summary: "Northstar posted a raw Tuesday board photo. Replies asked how they staff Sundays.",
        },
        {
          name: "Noise",
          status: "ok",
          summary: "Two “excited to announce” posts. No comments worth reading.",
        },
        {
          name: "Learn",
          status: "watch",
          summary: "Artifacts beat announcements. Post a real board, not a product shot.",
        },
      ],
    },
    prompt: `You are my Competitor Social Monitor.

Report what competitors posted and whether it mattered.

Competitors and profiles: [list]
Window: last 7 days

Return:
1. Posts that landed, and why
2. Posts to ignore
3. Offers or launches
4. One thing we should learn
5. One thing we should not copy
6. A 6-line Slack brief`,
  },
];
