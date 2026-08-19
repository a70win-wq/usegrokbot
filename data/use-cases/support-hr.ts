import type { UseCase } from "../types";

export const supportHrUseCases: UseCase[] = [
  {
    slug: "support-email-assistant",
    title: "Support Email Assistant",
    shortDescription:
      "Draft a clear, kind reply to a customer email in their language.",
    description:
      "Paste the customer email. Grok Bot writes a reply that answers the question, sets the next step, and does not sound like a template.",
    problem: "Support replies take too long and often miss the actual question.",
    category: "customer-support",
    tags: ["email", "support", "replies", "customers"],
    apps: ["gmail"],
    difficulty: "easy",
    schedule: "one-time",
    setupTime: "2 min",
    featured: true,
    popular: true,
    copies: 14890,
    createdAt: "2026-03-14",
    icon: "Mail",
    steps: [
      "Reads the customer email",
      "Names the real question in one line",
      "Drafts a reply that answers it",
      "Adds the next step and who owns it",
      "Offers a shorter version for busy days",
    ],
    targetUsers: ["support teams", "founders", "account managers"],
    related: ["customer-complaint-analyzer", "faq-research-bot", "email-summarizer"],
    exampleOutput: {
      title: "Reply · stalled onboarding",
      items: [
        {
          name: "Their question",
          status: "ok",
          summary: "Step 3 never finishes on mobile after they upload a site photo.",
        },
        {
          name: "Reply",
          status: "alert",
          summary:
            "We can see the upload fail. Use the desktop link in this email for today. I have asked engineering to treat the mobile bug as this week’s first fix.",
        },
        {
          name: "Do not say",
          status: "watch",
          summary: "Skip “we value your patience”. They want a path, not a slogan.",
        },
      ],
    },
    prompt: `You are my Support Email Assistant.

Write a reply a tired customer will actually read.

Customer email: [paste]
What is true: [facts we know]
What we can offer: [options]
Tone: plain, warm, specific

Return:
1. The real question
2. Reply
3. A shorter version
4. What I should not promise
5. Internal note for the team

No “dear valued customer”. No fake urgency.`,
  },
  {
    slug: "customer-complaint-analyzer",
    title: "Customer Complaint Analyzer",
    shortDescription:
      "Read a pile of complaints and tell you the few problems underneath.",
    description:
      "Paste tickets or emails. Grok Bot groups them into a handful of real problems, with how often they show up and who should own each one.",
    problem: "We treat every ticket as new instead of seeing the pattern.",
    category: "customer-support",
    tags: ["complaints", "tickets", "patterns", "qa"],
    apps: ["gmail", "notion", "google-sheets"],
    difficulty: "medium",
    schedule: "weekly",
    setupTime: "6 min",
    featured: false,
    popular: false,
    copies: 6230,
    createdAt: "2026-03-27",
    icon: "MessageSquareQuote",
    steps: [
      "Reads the tickets or emails you paste",
      "Groups them by the underlying problem",
      "Counts how often each problem appears",
      "Pulls one exact quote per theme",
      "Suggests an owner and a first fix",
    ],
    targetUsers: ["support leads", "product managers", "founders"],
    related: ["feedback-collector", "faq-research-bot", "customer-review-analyzer"],
    exampleOutput: {
      title: "42 tickets · last 7 days",
      items: [
        {
          name: "Mobile upload",
          status: "alert",
          summary: "14 tickets. Same fail at step 3. Quote: “I took the photo three times.”",
          action: "Engineering owns this. Stop asking customers to retry.",
        },
        {
          name: "Sunday lock",
          status: "watch",
          summary: "8 tickets. App freezes the board after 6pm.",
        },
        {
          name: "Billing confusion",
          status: "ok",
          summary: "5 tickets. Seats vs sites. Fix the invoice line, not the product.",
        },
      ],
    },
    prompt: `You are my Customer Complaint Analyzer.

Find the few problems under a pile of tickets.

Tickets: [paste]
Product: [name]

Return:
1. Themes, with counts
2. One exact quote per theme
3. Severity: fix this week / this month / watch
4. Suggested owner
5. What support should stop saying
6. What product should change

Do not invent ticket counts.`,
  },
  {
    slug: "faq-research-bot",
    title: "FAQ Research Bot",
    shortDescription:
      "Build an FAQ from real questions, not from what you wish people asked.",
    description:
      "Point Grok Bot at support mail, reviews and sales calls. It lists the questions people actually ask and drafts answers you can publish.",
    problem: "Our help center answers questions nobody asks.",
    category: "customer-support",
    tags: ["faq", "help center", "questions"],
    apps: ["browser", "notion"],
    alsoUses: ["gmail"],
    difficulty: "easy",
    schedule: "weekly",
    setupTime: "6 min",
    featured: false,
    popular: false,
    copies: 5110,
    createdAt: "2026-04-10",
    icon: "CircleHelp",
    steps: [
      "Reads questions from mail, reviews or call notes",
      "Merges the same question asked different ways",
      "Writes a short answer in plain language",
      "Flags questions you cannot answer yet",
      "Orders them by how often they appear",
    ],
    targetUsers: ["support teams", "product marketers", "founders"],
    related: ["support-email-assistant", "reddit-researcher", "new-employee-onboarding"],
    exampleOutput: {
      title: "FAQ draft · top 8",
      items: [
        {
          name: "Most asked",
          status: "alert",
          summary: "“Can I change a Tuesday booking on Tuesday?” Answer: yes until 90 minutes before the slot.",
        },
        {
          name: "Missing answer",
          status: "watch",
          summary: "People ask if SSO is on the mid plan. You have not decided. Do not publish a guess.",
        },
        {
          name: "Drop",
          status: "ok",
          summary: "“What is a TMS?” — not a customer question. Remove it from the help home.",
        },
      ],
    },
    prompt: `You are my FAQ Research Bot.

Build an FAQ from real questions.

Sources: [paste emails, reviews, call notes]
Product: [name]
Answers I already know: [notes]

Return 10 FAQ items:
- Question in customer language
- Short answer
- Longer answer
- How often it appeared
- Publish / needs a human decision / drop

If you do not know the answer, say so.`,
  },
  {
    slug: "feedback-collector",
    title: "Feedback Collector",
    shortDescription:
      "Turn scattered feedback into a weekly list product can use.",
    description:
      "Paste notes from calls, Slack and reviews. Grok Bot tags each piece, drops duplicates and writes a short brief for the product team.",
    problem: "Feedback lives in five tools and never becomes a list.",
    category: "customer-support",
    tags: ["feedback", "product", "voice of customer"],
    apps: ["slack", "notion", "google-sheets"],
    difficulty: "easy",
    schedule: "weekly",
    setupTime: "5 min",
    featured: false,
    popular: false,
    copies: 4480,
    createdAt: "2026-04-25",
    icon: "MessagesSquare",
    steps: [
      "Reads feedback from the sources you paste",
      "Tags each item: bug, ask, praise, confusion",
      "Merges duplicates",
      "Ranks by how often and how costly",
      "Writes a one-page brief for product",
    ],
    targetUsers: ["product managers", "support leads", "founders"],
    related: ["customer-complaint-analyzer", "customer-review-analyzer", "customer-sentiment-monitor"],
    exampleOutput: {
      title: "Feedback brief · week 33",
      items: [
        {
          name: "Bug",
          status: "alert",
          summary: "Mobile upload, 14 mentions. Already known. Do not log it again — bump it.",
        },
        {
          name: "Ask",
          status: "watch",
          summary: "Printable daily board. 6 mentions, three from paying sites.",
        },
        {
          name: "Praise",
          status: "ok",
          summary: "Sunday-night plan. Keep this in onboarding.",
        },
      ],
    },
    prompt: `You are my Feedback Collector.

Turn scattered notes into a product brief.

Feedback: [paste]
Product: [name]

Return:
1. Bugs
2. Asks
3. Praise
4. Confusion
5. Duplicates you merged
6. The three items product should look at this week

Keep exact customer phrases where you can.`,
  },
  {
    slug: "customer-sentiment-monitor",
    title: "Customer Sentiment Monitor",
    shortDescription:
      "A weekly read on whether customers sound better or worse.",
    description:
      "Grok Bot reads recent tickets, reviews and mentions, then tells you if the mood moved and why — without fake percentages.",
    problem: "We only notice sentiment when someone yells in public.",
    category: "customer-support",
    tags: ["sentiment", "customers", "weekly"],
    apps: ["gmail", "slack", "browser"],
    difficulty: "medium",
    schedule: "weekly",
    setupTime: "6 min",
    featured: false,
    popular: false,
    copies: 3920,
    createdAt: "2026-05-11",
    icon: "Activity",
    steps: [
      "Reads this week’s tickets, reviews and mentions",
      "Compares the tone with last week if you paste it",
      "Names what improved and what got worse",
      "Separates loud accounts from common feeling",
      "Suggests one thing to say and one thing to fix",
    ],
    targetUsers: ["support leads", "founders", "comms"],
    related: ["brand-mention-monitor", "x-sentiment-research", "customer-complaint-analyzer"],
    exampleOutput: {
      title: "Sentiment · week 33",
      items: [
        {
          name: "Mood",
          status: "watch",
          summary: "Slightly worse than last week. Not a crisis. Mobile upload is the whole story.",
        },
        {
          name: "Better",
          status: "ok",
          summary: "Onboarding emails. Fewer “where do I start” tickets.",
        },
        {
          name: "Do",
          status: "alert",
          summary: "Tell customers you are fixing mobile this week. Then fix it.",
        },
      ],
    },
    prompt: `You are my Customer Sentiment Monitor.

Tell me if customers sound better or worse, and why.

This week’s notes: [paste]
Last week’s brief, if any: [paste]

Return:
1. Mood vs last week
2. What improved
3. What got worse
4. Loud vs common
5. One thing to say
6. One thing to fix

No fake percentages.`,
  },
  {
    slug: "candidate-researcher",
    title: "Candidate Researcher",
    shortDescription:
      "Build a fair, public-source brief before you talk to a candidate.",
    description:
      "Give Grok Bot a name and role. It gathers public work, writes a short brief and lists questions — without turning into stalking.",
    problem: "I go into screens knowing only the CV.",
    category: "hr",
    tags: ["hiring", "candidates", "research"],
    apps: ["browser", "linkedin"],
    alsoUses: ["notion"],
    difficulty: "easy",
    schedule: "one-time",
    setupTime: "5 min",
    featured: false,
    popular: true,
    copies: 8670,
    createdAt: "2026-03-21",
    icon: "UserRoundSearch",
    steps: [
      "Reads the CV and public work you point to",
      "Summarizes relevant experience for this role",
      "Lists questions the CV does not answer",
      "Flags gaps without inventing stories",
      "Writes a one-page brief for the interviewer",
    ],
    targetUsers: ["recruiters", "hiring managers", "founders"],
    related: ["resume-screener", "interview-prep-bot", "company-researcher"],
    exampleOutput: {
      title: "Brief · Maya Chen · Ops lead",
      items: [
        {
          name: "Fit",
          status: "ok",
          summary: "Four years running multi-site warehouse teams. Two of those sites look the same size as Dallas.",
        },
        {
          name: "Ask",
          status: "alert",
          summary: "The CV says “cut overtime 18%”. Ask how, and what broke when they did.",
        },
        {
          name: "Do not assume",
          status: "watch",
          summary: "No public writing about software. That is not a no — just ask how they pick tools.",
        },
      ],
    },
    prompt: `You are my Candidate Researcher.

Write a fair brief from public information and the CV.

Role: [role]
CV / notes: [paste]
Public links: [list]

Rules:
- Do not guess protected characteristics
- Do not scrape personal life
- Label anything unverified

Return:
1. Relevant experience
2. Work samples, if any
3. Questions the CV does not answer
4. Risks or gaps
5. A 1-page interviewer brief`,
  },
  {
    slug: "resume-screener",
    title: "Resume Screener",
    shortDescription:
      "Score a stack of CVs against the job, with reasons you can defend.",
    description:
      "Paste the job and a set of CVs. Grok Bot marks yes / maybe / no, explains why, and never invents experience that is not on the page.",
    problem: "Screening 80 CVs by hand is slow and inconsistent.",
    category: "hr",
    tags: ["hiring", "screening", "cv"],
    apps: ["google-sheets", "notion"],
    difficulty: "medium",
    schedule: "one-time",
    setupTime: "8 min",
    featured: false,
    popular: false,
    copies: 7340,
    createdAt: "2026-04-04",
    icon: "ClipboardCheck",
    steps: [
      "Reads the job must-haves you list",
      "Reads each CV",
      "Marks yes / maybe / no with a reason",
      "Quotes the line that justified the score",
      "Sorts the stack so you start with the yeses",
    ],
    targetUsers: ["recruiters", "hiring managers"],
    related: ["candidate-researcher", "interview-prep-bot", "lead-qualification"],
    exampleOutput: {
      title: "Screen · 28 CVs · warehouse lead",
      items: [
        {
          name: "Yes · 6",
          status: "alert",
          summary: "Ran a site of similar size. Dates and team size are on the CV.",
        },
        {
          name: "Maybe · 9",
          status: "watch",
          summary: "Ops experience, but in retail floor not warehouse. Worth a screen.",
        },
        {
          name: "No · 13",
          status: "ok",
          summary: "Missing the must-have: people leadership. Do not advance.",
        },
      ],
    },
    prompt: `You are my Resume Screener.

Be consistent and strict. Do not invent experience.

Job: [title]
Must-haves: [list]
Nice-to-haves: [list]
CVs: [paste]

For each CV:
- Decision: yes / maybe / no
- Reason
- Quote from the CV
- Missing must-have, if any

Then a sorted list. If a CV is too thin to judge, say so.`,
  },
  {
    slug: "interview-prep-bot",
    title: "Interview Prep Bot",
    shortDescription:
      "Build an interview plan with questions that test the work, not vibes.",
    description:
      "Give Grok Bot the role and the candidate brief. It writes a 45-minute plan, questions, and what a good answer sounds like.",
    problem: "Interviews wander and we leave still not knowing if they can do the job.",
    category: "hr",
    tags: ["interviews", "hiring", "questions"],
    apps: ["notion", "google-calendar"],
    difficulty: "easy",
    schedule: "one-time",
    setupTime: "5 min",
    featured: false,
    popular: true,
    copies: 9120,
    createdAt: "2026-04-18",
    icon: "CalendarClock",
    steps: [
      "Reads the role and candidate brief",
      "Builds a timed plan",
      "Writes questions tied to real work",
      "Adds what a strong answer includes",
      "Leaves space for the candidate’s questions",
    ],
    targetUsers: ["hiring managers", "recruiters", "founders"],
    related: ["candidate-researcher", "resume-screener", "sales-meeting-prep"],
    exampleOutput: {
      title: "45-minute plan · Ops lead",
      items: [
        {
          name: "0–8 min",
          status: "ok",
          summary: "Their story of a Tuesday that went wrong. Listen for ownership, not polish.",
        },
        {
          name: "Core question",
          status: "alert",
          summary:
            "“Overtime dropped 18%. Walk me through the week you did that.” A good answer has a tradeoff.",
        },
        {
          name: "Close",
          status: "watch",
          summary: "10 minutes for their questions. If they ask nothing about the team, note it.",
        },
      ],
    },
    prompt: `You are my Interview Prep Bot.

Write a plan that tests the work.

Role: [role]
Must-haves: [list]
Candidate brief: [paste]
Length: [minutes]

Return:
1. Timed plan
2. 8 questions, each with what a strong answer includes
3. Questions to avoid
4. A scorecard the panel can share
5. How to close

No brainteasers. No trick questions.`,
  },
  {
    slug: "new-employee-onboarding",
    title: "New Employee Onboarding",
    shortDescription:
      "Turn a messy first week into a day-by-day plan a new hire can follow.",
    description:
      "Tell Grok Bot the role and what “ready” looks like. It writes a first-week plan, a checklist and the notes you should send before day one.",
    problem: "New hires lose the first week waiting for access and context.",
    category: "hr",
    tags: ["onboarding", "hr", "first week"],
    apps: ["notion", "gmail", "slack"],
    difficulty: "easy",
    schedule: "one-time",
    setupTime: "8 min",
    featured: false,
    popular: false,
    copies: 5810,
    createdAt: "2026-05-07",
    icon: "ListTodo",
    steps: [
      "Reads the role and what ready means",
      "Writes a day-by-day first week",
      "Lists access and intros that must happen before Monday",
      "Drafts a welcome note",
      "Adds a 30-day check-in outline",
    ],
    targetUsers: ["people managers", "HR", "founders"],
    related: ["interview-prep-bot", "faq-research-bot", "daily-work-brief"],
    exampleOutput: {
      title: "Week 1 · Dallas ops lead",
      items: [
        {
          name: "Before Monday",
          status: "alert",
          summary: "Badge, board login, and a 20-minute video of Tuesday’s dock. Otherwise day one is a tour.",
        },
        {
          name: "Tuesday",
          status: "ok",
          summary: "Shadow the 6am board. Do not put them in Slack fire drills yet.",
        },
        {
          name: "Friday",
          status: "watch",
          summary: "They write “what is still confusing”. That list is your week-2 plan.",
        },
      ],
    },
    prompt: `You are my New Employee Onboarding Bot.

Build a first week a human can follow.

Role: [role]
What “ready” looks like: [list]
Team and tools: [list]
Start date: [date]

Return:
1. Before day one checklist
2. Day-by-day week 1
3. People they should meet, and why
4. A welcome note
5. A 30-day check-in
6. What usually gets forgotten

Plain language. No corporate onboarding soup.`,
  },
];
