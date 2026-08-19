import type { UseCase } from "../types";

export const salesUseCases: UseCase[] = [
  {
    slug: "lead-researcher",
    title: "Lead Researcher",
    shortDescription:
      "Find and summarize potential customers before your sales team contacts them.",
    description:
      "Give Grok Bot a market, city or customer type. It looks for companies that fit, writes a short profile for each one, and drops the list into a sheet you can work from.",
    problem: "I spend hours hunting for companies before I can even start outreach.",
    category: "sales",
    tags: ["leads", "prospecting", "outreach", "research"],
    apps: ["browser", "google-sheets"],
    difficulty: "easy",
    schedule: "daily",
    setupTime: "5 min",
    featured: true,
    popular: true,
    copies: 18420,
    createdAt: "2026-03-12",
    icon: "UserSearch",
    steps: [
      "Looks for companies that match the customer type you describe",
      "Opens public pages such as the website, about page and recent news",
      "Writes a short profile: what they do, who they serve, why they might care",
      "Adds a suggested first-line opener for each company",
      "Drops the list into a sheet or a short briefing",
    ],
    targetUsers: [
      "salespeople",
      "founders doing their own outreach",
      "SDRs",
      "agency owners",
    ],
    related: ["prospect-research", "lead-qualification", "daily-sales-brief"],
    exampleOutput: {
      title: "10 leads for mid-market logistics software",
      items: [
        {
          name: "Northline Freight",
          status: "alert",
          summary:
            "Regional trucking company, 180 staff, just posted a warehouse supervisor role and mentioned delayed dock scheduling in a local interview.",
          why: "They are growing operations and already feel the scheduling pain your product solves.",
          action: "Lead with dock turnaround, not a generic automation pitch.",
        },
        {
          name: "Harbor Path Logistics",
          status: "watch",
          summary:
            "3PL with a dated website. Case study on their site is from 2022. No mention of a TMS.",
          why: "Likely still running on spreadsheets.",
          action: "Ask how they plan weekly capacity today.",
        },
        {
          name: "Cedar Route",
          status: "ok",
          summary: "Fits the size, but already lists a competitor on their integrations page.",
          action: "Skip unless you have a clear displacement story.",
        },
      ],
    },
    prompt: `You are my Lead Research Bot.

Find companies I could reasonably sell to and give me a short, honest briefing on each one.

Target customer:
- Industry: [industry]
- Company size: [size]
- Location: [location]
- Problem they likely have: [problem]

For every company:
1. Confirm they look like a real fit, not a stretch.
2. Use only public information: website, about page, careers, news, LinkedIn company page.
3. Ignore fluff and marketing slogans.
4. Explain why they might need us in one sentence a salesperson can say out loud.
5. Suggest the first thing I should mention.

Return 8–12 companies in this format:

Company:
Website:
What they do:
Why they might care:
Suggested opener:
Confidence: high / medium / low

If you cannot find enough good fits, say so and explain what to loosen.`,
  },
  {
    slug: "prospect-research",
    title: "Prospect Research",
    shortDescription:
      "Build a one-page brief on a company before you get on the call.",
    description:
      "Paste a company name. Grok Bot reads the public story — product, people, news, hiring — and hands you a one-page brief you can scan in two minutes.",
    problem: "I go into calls knowing only what is on the website homepage.",
    category: "sales",
    tags: ["prospects", "account research", "meetings"],
    apps: ["browser", "linkedin", "notion"],
    difficulty: "easy",
    schedule: "one-time",
    setupTime: "3 min",
    featured: false,
    popular: true,
    copies: 12110,
    createdAt: "2026-03-18",
    icon: "Building2",
    steps: [
      "Opens the company website, news and careers pages",
      "Notes what they sell, who they sell to and any recent change",
      "Looks up the people joining the call if you share names",
      "Flags risks, such as a recent funding miss or a competitor already in place",
      "Writes a one-page brief with 3 talking points",
    ],
    targetUsers: ["account executives", "founders", "customer success managers"],
    related: ["lead-researcher", "sales-meeting-prep", "company-researcher"],
    exampleOutput: {
      title: "Brief: Brightwell Analytics",
      items: [
        {
          name: "What they do",
          status: "ok",
          summary:
            "Sells inventory forecasting to mid-market retailers. New self-serve plan launched last month.",
        },
        {
          name: "Why this call matters",
          status: "alert",
          summary:
            "They hired two ops managers in six weeks. That usually means the current process is straining.",
          why: "Your opener should be about onboarding speed, not another feature list.",
        },
        {
          name: "Watch-out",
          status: "watch",
          summary: "A case study on their site already mentions a competing analytics vendor.",
          action: "Ask what they still do by hand after that tool.",
        },
      ],
    },
    prompt: `You are my Prospect Research Bot.

I will give you one company. Prepare me for a sales conversation in under two minutes of reading.

Company: [company]
People on the call: [names and titles if known]
What we sell: [our product]
Why we booked this: [reason]

Research only public sources. Then return:

1. Company in 3 sentences
2. Who they sell to
3. What seems to be changing right now
4. Likely pain that matches what we do
5. Three talking points I can use
6. Two questions I should ask
7. Anything I should not assume
8. One risk or competitor to be aware of

Keep it plain. No buzzwords. If something is unclear, say it is unclear.`,
  },
  {
    slug: "lead-qualification",
    title: "Lead Qualification",
    shortDescription:
      "Score a list of leads so you spend time on the ones worth calling.",
    description:
      "Point Grok Bot at a sheet of names. It checks each one against your ideal customer and marks them as worth a call, worth a nurture email, or not a fit.",
    problem: "My list is long and I cannot tell who is actually worth a call.",
    category: "sales",
    tags: ["qualification", "scoring", "crm", "lists"],
    apps: ["google-sheets", "salesforce", "browser"],
    difficulty: "medium",
    schedule: "daily",
    setupTime: "8 min",
    featured: false,
    popular: false,
    copies: 7340,
    createdAt: "2026-04-02",
    icon: "ClipboardCheck",
    steps: [
      "Reads your list of companies or contacts",
      "Checks public signals: size, industry, hiring, tech, news",
      "Scores each lead against the customer profile you provided",
      "Writes a one-line reason for the score",
      "Sorts the list into call today, nurture, or skip",
    ],
    targetUsers: ["SDR managers", "sales teams", "founders"],
    related: ["lead-researcher", "crm-updater", "lost-lead-re-engagement"],
    exampleOutput: {
      title: "Monday qualification pass — 24 leads",
      items: [
        {
          name: "Call today · 6 leads",
          status: "alert",
          summary: "Clear industry fit plus a buying signal such as hiring or a new location.",
        },
        {
          name: "Nurture · 11 leads",
          status: "watch",
          summary: "Right market, no urgent signal. Save for a later sequence.",
        },
        {
          name: "Skip · 7 leads",
          status: "ok",
          summary: "Too small, already a competitor customer, or not in-market.",
        },
      ],
    },
    prompt: `You are my Lead Qualification Bot.

Score every lead against our ideal customer. Be strict. A maybe is not a yes.

Ideal customer:
- Industry: [industry]
- Size: [size]
- Must-have signals: [signals]
- Disqualifiers: [disqualifiers]

For each lead I provide:
1. Decide: Call today / Nurture / Skip
2. Give a score from 1–5
3. Name the strongest signal
4. Name the biggest risk
5. Suggest the next action in one line

Format:

Lead:
Decision:
Score:
Signal:
Risk:
Next action:

Do not invent facts. If you cannot verify something, mark it unknown.`,
  },
  {
    slug: "sales-meeting-prep",
    title: "Sales Meeting Prep",
    shortDescription:
      "Walk into every sales meeting with a one-page plan.",
    description:
      "Grok Bot looks at the company, the people and the last emails, then writes a short plan: goal, talking points, questions and a suggested close.",
    problem: "I prepare for meetings in the five minutes before they start.",
    category: "sales",
    tags: ["meetings", "prep", "calls", "agenda"],
    apps: ["google-calendar", "browser", "notion"],
    difficulty: "easy",
    schedule: "daily",
    setupTime: "4 min",
    featured: true,
    popular: true,
    copies: 15680,
    createdAt: "2026-04-09",
    icon: "CalendarClock",
    steps: [
      "Reads who is on the meeting and what the company does",
      "Checks recent public news and any notes you paste in",
      "Sets a clear goal for the call",
      "Writes talking points and questions in the order you should use them",
      "Adds a suggested close and a fallback if they stall",
    ],
    targetUsers: ["account executives", "sales managers", "founders"],
    related: ["prospect-research", "meeting-prep-assistant", "follow-up-email-writer"],
    exampleOutput: {
      title: "Prep: Northline Freight · Tuesday 10:00",
      items: [
        {
          name: "Goal",
          status: "ok",
          summary: "Leave with a 30-minute working session on their dock schedule, not another intro call.",
        },
        {
          name: "Open with this",
          status: "alert",
          summary:
            "They posted two warehouse roles last week. Ask how new hires learn the current board process.",
        },
        {
          name: "If they stall",
          status: "watch",
          summary: "Offer a 15-minute teardown of one real dock day instead of a product tour.",
        },
      ],
    },
    prompt: `You are my Sales Meeting Prep Bot.

Prepare a one-page plan I can read on the way to the call.

Meeting:
- Company: [company]
- People: [names, titles]
- Length: [minutes]
- Stage: intro / demo / follow-up / close
- What we sell: [product]
- Notes from last contact: [notes]

Return:
1. Goal for this meeting, in one sentence
2. What I should assume I already know
3. 4 talking points, in order
4. 4 questions, in order
5. A suggested close
6. A fallback if they are not ready
7. Things I should not do

Keep it short enough to read in two minutes.`,
  },
  {
    slug: "crm-updater",
    title: "CRM Updater",
    shortDescription:
      "Turn messy call notes into clean CRM fields and next steps.",
    description:
      "Paste your scribbles after a call. Grok Bot writes a clean summary, suggested CRM fields and a next task you can copy into Salesforce or HubSpot.",
    problem: "Call notes sit in my inbox and never make it into the CRM.",
    category: "sales",
    tags: ["crm", "notes", "follow-up", "admin"],
    apps: ["salesforce", "hubspot", "gmail"],
    difficulty: "easy",
    schedule: "daily",
    setupTime: "3 min",
    featured: false,
    popular: false,
    copies: 6920,
    createdAt: "2026-04-21",
    icon: "NotebookPen",
    steps: [
      "Reads the raw notes or email you paste",
      "Pulls out the facts: people, dates, objections, next step",
      "Writes a CRM-ready summary",
      "Suggests fields such as stage, amount and close date only when they are stated",
      "Drafts the next task in one line",
    ],
    targetUsers: ["salespeople", "sales ops", "account managers"],
    related: ["follow-up-email-writer", "lead-qualification", "weekly-report-generator"],
    exampleOutput: {
      title: "CRM note · Harbor Path · 19 Aug",
      items: [
        {
          name: "Summary",
          status: "ok",
          summary:
            "Ops director is interested in a 20-dock pilot. Budget owner is the CFO, not on the call. They want a one-page security note before a second meeting.",
        },
        {
          name: "Suggested fields",
          status: "watch",
          summary: "Stage: Evaluation. Next step: send security note by Friday. Close date: unknown.",
        },
        {
          name: "Task",
          status: "alert",
          summary: "Send one-page security overview and propose two times next week.",
        },
      ],
    },
    prompt: `You are my CRM Updater Bot.

Turn raw notes into something I can paste into a CRM without editing.

Raw notes:
[paste]

If you have them:
- Current stage: [stage]
- CRM: Salesforce / HubSpot / other

Return:
1. Clean summary (5–8 lines)
2. People mentioned and their role
3. Commitments they made
4. Commitments I made
5. Objections
6. Suggested CRM fields — only if the notes support them
7. Next task, due date if mentioned
8. A one-line activity log entry

Never invent a deal size, close date or stage change.`,
  },
  {
    slug: "follow-up-email-writer",
    title: "Follow-up Email Writer",
    shortDescription:
      "Write a clear follow-up after a call, demo or unanswered email.",
    description:
      "Tell Grok Bot what happened. It drafts a short follow-up that sounds like a person, with a single ask and a subject line you can send.",
    problem: "My follow-ups are either too long or I forget to send them.",
    category: "sales",
    tags: ["email", "follow-up", "outreach", "writing"],
    apps: ["gmail"],
    difficulty: "easy",
    schedule: "one-time",
    setupTime: "2 min",
    featured: true,
    popular: true,
    copies: 20140,
    createdAt: "2026-05-03",
    icon: "Mail",
    steps: [
      "Reads what happened on the last call or email",
      "Picks one purpose for the follow-up",
      "Writes a short email with one ask",
      "Offers a subject line and a shorter bump version",
      "Keeps the tone polite and specific",
    ],
    targetUsers: ["salespeople", "founders", "account managers"],
    related: ["lost-lead-re-engagement", "sales-meeting-prep", "support-email-assistant"],
    exampleOutput: {
      title: "Follow-up after Tuesday’s dock demo",
      items: [
        {
          name: "Subject",
          status: "ok",
          summary: "The 15-minute dock teardown we talked about",
        },
        {
          name: "Email",
          status: "ok",
          summary:
            "Thanks for walking through Tuesday’s backlog. Attached is the one-page view of a single dock day. If useful, I can do the same for Thursday’s shift — does Friday 10:00 still work?",
        },
        {
          name: "Bump, 4 days later",
          status: "watch",
          summary: "Still happy to do the Thursday teardown if the timing is better next week.",
        },
      ],
    },
    prompt: `You are my Follow-up Email Writer.

Write emails people will actually answer.

Context:
- Who I am writing to: [name, title, company]
- What just happened: [call / demo / no reply / event]
- What I want them to do: [one ask]
- Tone: plain, warm, short
- Facts I must include: [facts]

Rules:
- 80–130 words
- One ask
- No “just circling back” unless this is a bump
- No fake urgency
- No stack of links

Return:
1. Subject line
2. Email
3. A shorter bump I can send 4 days later
4. A note on why this version should work`,
  },
  {
    slug: "lost-lead-re-engagement",
    title: "Lost Lead Re-engagement",
    shortDescription:
      "Write a honest note to leads that went quiet months ago.",
    description:
      "Give Grok Bot a stale lead and why they disappeared. It drafts a re-engagement note that offers a reason to talk again, without sounding desperate.",
    problem: "Old leads sit in the CRM and I never have a good reason to write.",
    category: "sales",
    tags: ["win-back", "email", "crm", "reactivation"],
    apps: ["gmail", "salesforce", "hubspot"],
    difficulty: "medium",
    schedule: "weekly",
    setupTime: "5 min",
    featured: false,
    popular: false,
    copies: 4180,
    createdAt: "2026-05-18",
    icon: "RefreshCcw",
    steps: [
      "Reads why the lead went quiet",
      "Looks for a real reason to write again — a product change, a new result, or a relevant event",
      "Drafts a short note with a single low-pressure ask",
      "Flags leads that should be left alone",
      "Adds a second touch you can send two weeks later",
    ],
    targetUsers: ["salespeople", "founders", "customer success"],
    related: ["follow-up-email-writer", "lead-qualification", "crm-updater"],
    exampleOutput: {
      title: "Re-engagement · 14 stale deals",
      items: [
        {
          name: "Worth writing · 5",
          status: "alert",
          summary: "They went quiet after pricing, and you now have a smaller starter plan.",
        },
        {
          name: "Wait · 6",
          status: "watch",
          summary: "No new reason to write. Leave them for the next quarterly pass.",
        },
        {
          name: "Leave alone · 3",
          status: "ok",
          summary: "They chose a competitor last month or asked not to be contacted.",
        },
      ],
    },
    prompt: `You are my Lost Lead Re-engagement Bot.

Help me write to people who went quiet. Only write when there is a real reason.

For each lead:
- Company / person: [name]
- Why they went quiet: [reason]
- When we last spoke: [date]
- Anything new we can honestly offer: [update]

Decide:
1. Write now / Wait / Leave alone
2. The reason to write, if any
3. Email (90 words max, one ask)
4. A second touch for two weeks later

If there is no honest reason to write, say so.`,
  },
  {
    slug: "daily-sales-brief",
    title: "Daily Sales Brief",
    shortDescription:
      "Start the day with a short picture of pipeline, meetings and follow-ups.",
    description:
      "Each morning Grok Bot turns your meetings, open deals and overdue follow-ups into a one-screen brief you can read with coffee.",
    problem: "I open five tabs before I know what the day actually is.",
    category: "sales",
    tags: ["daily brief", "pipeline", "meetings", "planning"],
    apps: ["slack", "google-calendar", "salesforce"],
    difficulty: "medium",
    schedule: "daily",
    setupTime: "8 min",
    featured: true,
    popular: true,
    copies: 9870,
    createdAt: "2026-06-01",
    icon: "Newspaper",
    steps: [
      "Reads today’s meetings",
      "Lists deals that need a move",
      "Flags overdue follow-ups",
      "Suggests the three actions that matter most this morning",
      "Sends a short briefing to Slack or email",
    ],
    targetUsers: ["salespeople", "sales managers", "founders"],
    related: ["sales-meeting-prep", "crm-updater", "daily-work-brief"],
    exampleOutput: {
      title: "Tuesday sales brief",
      items: [
        {
          name: "Today",
          status: "ok",
          summary: "3 meetings. The 10:00 with Northline is the only one that can move a deal this week.",
        },
        {
          name: "Overdue",
          status: "alert",
          summary: "Harbor Path security note is 2 days late. Send before 9:30.",
        },
        {
          name: "If you only do three things",
          status: "watch",
          summary: "1) Harbor Path note  2) Northline prep  3) Bump the Cedar Route close-date question.",
        },
      ],
    },
    prompt: `You are my Daily Sales Brief Bot.

Every morning, turn my raw inputs into a briefing I can read in two minutes.

Today’s inputs:
- Meetings: [list]
- Open deals / next steps: [list]
- Overdue follow-ups: [list]
- Anything else on my mind: [notes]

Return:
1. The day in 3 sentences
2. Meetings, with one prep note each
3. Deals that need a move today
4. Overdue items
5. The only 3 actions that matter this morning
6. What can wait

Be blunt. Do not pad the list.`,
  },
];
