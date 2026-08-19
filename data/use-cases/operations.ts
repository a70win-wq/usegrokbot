import type { UseCase } from "../types";

export const operationsUseCases: UseCase[] = [
  {
    slug: "inbox-organizer",
    title: "Inbox Organizer",
    shortDescription:
      "Sort a crowded inbox into reply, wait, and do not need you.",
    description:
      "Paste a list of subject lines or let Grok Bot work through a dump of emails. It groups them so you answer the right five first.",
    problem: "I open Gmail and spend 20 minutes deciding what matters.",
    category: "operations",
    tags: ["email", "inbox", "priority", "office"],
    apps: ["gmail"],
    difficulty: "easy",
    schedule: "daily",
    setupTime: "3 min",
    featured: true,
    popular: true,
    copies: 17650,
    createdAt: "2026-03-02",
    icon: "Inbox",
    steps: [
      "Reads the emails or subject lines you provide",
      "Splits them into reply now, wait, and ignore",
      "Flags anything with a date or a customer",
      "Drafts a one-line next action for the top items",
      "Leaves newsletters in a pile you can skip",
    ],
    targetUsers: ["office workers", "founders", "exec assistants", "managers"],
    related: ["email-summarizer", "daily-work-brief", "follow-up-email-writer"],
    exampleOutput: {
      title: "Inbox · 62 unread",
      items: [
        {
          name: "Reply now · 5",
          status: "alert",
          summary: "Two customers, one invoice question, one interview confirm, one same-day dock change.",
        },
        {
          name: "Wait · 11",
          status: "watch",
          summary: "Internal threads with no ask. Check after lunch.",
        },
        {
          name: "Skip · 46",
          status: "ok",
          summary: "Newsletters, calendar spam, cc threads that already have an owner.",
        },
      ],
    },
    prompt: `You are my Inbox Organizer.

Help me leave the inbox with a short list.

Emails (subject, from, date, first lines):
[paste]

My job: [role]
People I must not ignore: [list]

Return:
1. Reply now
2. Wait
3. Ignore
4. For “reply now”, a one-line action
5. Anything that looks like a deadline

If an email is unclear, put it in wait and say why.`,
  },
  {
    slug: "email-summarizer",
    title: "Email Summarizer",
    shortDescription:
      "Turn a long email thread into who said what and what you owe.",
    description:
      "Paste a thread. Grok Bot writes a short recap: decisions, open questions and the one thing you need to do.",
    problem: "I get dropped into 30-message threads and cannot see the ask.",
    category: "operations",
    tags: ["email", "summary", "threads"],
    apps: ["gmail", "slack"],
    difficulty: "easy",
    schedule: "one-time",
    setupTime: "2 min",
    featured: false,
    popular: true,
    copies: 15220,
    createdAt: "2026-03-09",
    icon: "Mails",
    steps: [
      "Reads the full thread you paste",
      "Names the people and what each one wants",
      "Lists decisions already made",
      "Lists open questions",
      "Writes the one action that is yours",
    ],
    targetUsers: ["office workers", "managers", "support teams"],
    related: ["inbox-organizer", "meeting-follow-up-assistant", "support-email-assistant"],
    exampleOutput: {
      title: "Thread · Q3 warehouse pilots",
      items: [
        {
          name: "Decided",
          status: "ok",
          summary: "Pilot is Dallas only. Start date 8 September.",
        },
        {
          name: "Still open",
          status: "watch",
          summary: "Who owns Sunday-night scheduling? Two people think it is the other.",
        },
        {
          name: "You owe",
          status: "alert",
          summary: "Send a one-page owner chart by Thursday.",
        },
      ],
    },
    prompt: `You are my Email Summarizer.

Turn a thread into something I can act on.

Thread: [paste]
I am: [name / role]

Return:
1. What this thread is about
2. Decisions already made
3. Open questions
4. Who owes what
5. The one action that is mine
6. A reply I can send if I need to nudge

Quote people lightly. Do not invent a decision.`,
  },
  {
    slug: "meeting-prep-assistant",
    title: "Meeting Prep Assistant",
    shortDescription:
      "Walk into any internal meeting knowing the point and your part.",
    description:
      "Give Grok Bot the invite and a few notes. It writes the goal, what you should say, and what you can ignore.",
    problem: "My calendar is full and I show up to meetings cold.",
    category: "operations",
    tags: ["meetings", "prep", "calendar"],
    apps: ["google-calendar", "notion"],
    difficulty: "easy",
    schedule: "daily",
    setupTime: "3 min",
    featured: false,
    popular: true,
    copies: 9900,
    createdAt: "2026-03-19",
    icon: "CalendarClock",
    steps: [
      "Reads the invite, guests and any notes you paste",
      "Guesses the real goal of the meeting",
      "Writes what you should say or ask",
      "Flags if you might not need to attend",
      "Adds a 60-second version if you are late",
    ],
    targetUsers: ["office workers", "managers", "founders"],
    related: ["sales-meeting-prep", "calendar-organizer", "meeting-follow-up-assistant"],
    exampleOutput: {
      title: "Prep · staffing standup 11:00",
      items: [
        {
          name: "Point",
          status: "ok",
          summary: "Decide who covers Thursday night, not a general staffing chat.",
        },
        {
          name: "Your part",
          status: "alert",
          summary: "Bring last Thursday’s overtime number. That is the only number that will move this.",
        },
        {
          name: "Skip?",
          status: "watch",
          summary: "No. You own the number. Stay for 15 minutes, then leave.",
        },
      ],
    },
    prompt: `You are my Meeting Prep Assistant.

Prepare me in under a minute of reading.

Invite: [title, guests, time, description]
Notes: [paste]
My role in this meeting: [role]

Return:
1. The real point of the meeting
2. What I should say or bring
3. Questions I should ask
4. What I can ignore
5. Whether I can skip or send notes instead
6. A 60-second version if I join late`,
  },
  {
    slug: "meeting-follow-up-assistant",
    title: "Meeting Follow-up Assistant",
    shortDescription:
      "Turn messy meeting notes into owners, dates and a sendable recap.",
    description:
      "Paste notes or a transcript. Grok Bot writes a recap, a list of owners and a short email you can send to the group.",
    problem: "We have meetings and then nobody is sure who owns the next step.",
    category: "operations",
    tags: ["meetings", "notes", "follow-up"],
    apps: ["gmail", "notion", "slack"],
    difficulty: "easy",
    schedule: "one-time",
    setupTime: "3 min",
    featured: false,
    popular: false,
    copies: 8450,
    createdAt: "2026-04-01",
    icon: "ListTodo",
    steps: [
      "Reads your notes or transcript",
      "Lists decisions",
      "Lists actions with an owner and a date when one exists",
      "Marks missing owners instead of inventing them",
      "Drafts a recap email",
    ],
    targetUsers: ["managers", "ops teams", "founders"],
    related: ["meeting-prep-assistant", "email-summarizer", "weekly-report-generator"],
    exampleOutput: {
      title: "Recap · Thursday ops review",
      items: [
        {
          name: "Decided",
          status: "ok",
          summary: "Dallas pilot stays 20 docks. No Houston add this month.",
        },
        {
          name: "Open",
          status: "watch",
          summary: "Sunday-night owner is still unassigned. Do not bury this.",
        },
        {
          name: "Send",
          status: "alert",
          summary: "Recap email is ready. Ask Maya to name an owner by Friday 3pm.",
        },
      ],
    },
    prompt: `You are my Meeting Follow-up Assistant.

Turn notes into owners and a recap.

Notes or transcript: [paste]
Meeting: [name, date]

Return:
1. Decisions
2. Actions — owner, due date, or “owner missing”
3. Open questions
4. A recap email I can send
5. Anything that sounded decided but was not

Never invent an owner or a date.`,
  },
  {
    slug: "daily-work-brief",
    title: "Daily Work Brief",
    shortDescription:
      "Start the day with a short plan based on your calendar and leftovers.",
    description:
      "Grok Bot looks at meetings, unfinished tasks and anything you paste from yesterday, then gives you a realistic plan for today.",
    problem: "I start the day in my inbox instead of with a plan.",
    category: "operations",
    tags: ["planning", "daily", "calendar", "tasks"],
    apps: ["google-calendar", "slack", "notion"],
    difficulty: "easy",
    schedule: "daily",
    setupTime: "4 min",
    featured: true,
    popular: true,
    copies: 11340,
    createdAt: "2026-04-14",
    icon: "Sunrise",
    steps: [
      "Reads today’s calendar",
      "Looks at leftover tasks you paste",
      "Protects time for the one deep thing",
      "Names three outcomes for the day",
      "Tells you what will slip if you are honest",
    ],
    targetUsers: ["office workers", "managers", "founders"],
    related: ["calendar-organizer", "daily-sales-brief", "weekly-report-generator"],
    exampleOutput: {
      title: "Wednesday plan",
      items: [
        {
          name: "Protect 9:00–10:30",
          status: "alert",
          summary: "Write the Dallas owner chart. Everything else can move.",
        },
        {
          name: "Meetings",
          status: "ok",
          summary: "Two are real. The 3:00 can be an email. Decline it.",
        },
        {
          name: "Will slip",
          status: "watch",
          summary: "The blog outline. Move it to Thursday morning.",
        },
      ],
    },
    prompt: `You are my Daily Work Brief Bot.

Make a plan I can finish.

Calendar: [meetings]
Leftover tasks: [list]
Energy / constraints: [travel, deadline, kids pickup]
The one thing that would make today a win: [thing]

Return:
1. The one thing to protect
2. Three outcomes for today
3. Meetings to keep, shorten or decline
4. What will slip
5. A shutdown checklist for 15 minutes before I leave`,
  },
  {
    slug: "weekly-report-generator",
    title: "Weekly Report Generator",
    shortDescription:
      "Turn the week’s notes into a status update people will read.",
    description:
      "Paste bullets from the week. Grok Bot writes a short report: done, stuck, next, and one risk — ready for Slack or email.",
    problem: "Friday updates take an hour and still sound like a task dump.",
    category: "operations",
    tags: ["reporting", "status", "weekly"],
    apps: ["slack", "gmail", "notion"],
    difficulty: "easy",
    schedule: "weekly",
    setupTime: "5 min",
    featured: false,
    popular: false,
    copies: 7780,
    createdAt: "2026-04-29",
    icon: "CalendarRange",
    steps: [
      "Reads your messy weekly notes",
      "Groups them into done, stuck and next",
      "Writes a risk if one exists",
      "Cuts tasks that do not matter to the reader",
      "Outputs a version for Slack and a slightly longer email",
    ],
    targetUsers: ["managers", "ops teams", "agency leads"],
    related: ["marketing-campaign-report", "daily-work-brief", "research-report-builder"],
    exampleOutput: {
      title: "Week 33 · Dallas pilot",
      items: [
        {
          name: "Done",
          status: "ok",
          summary: "Owner chart shipped. Two site visits completed.",
        },
        {
          name: "Stuck",
          status: "alert",
          summary: "Sunday-night owner still unnamed. This will slip the start date.",
        },
        {
          name: "Next",
          status: "watch",
          summary: "Name the owner by Wednesday or move the start by a week.",
        },
      ],
    },
    prompt: `You are my Weekly Report Generator.

Write a status people will read.

Reader: [manager / client / team]
Notes from the week: [paste]
Goal this week was: [goal]

Return:
1. Done
2. Stuck
3. Next
4. One risk
5. Slack version (short)
6. Email version (a bit longer)

No task salad. If something is busywork, leave it out.`,
  },
  {
    slug: "calendar-organizer",
    title: "Calendar Organizer",
    shortDescription:
      "Look at a messy week and suggest what to keep, move or decline.",
    description:
      "Paste your week. Grok Bot finds collisions, meetings without a point, and a better shape for the days you still control.",
    problem: "My calendar fills itself and I never step back.",
    category: "operations",
    tags: ["calendar", "time", "meetings"],
    apps: ["google-calendar"],
    difficulty: "easy",
    schedule: "weekly",
    setupTime: "4 min",
    featured: false,
    popular: false,
    copies: 6540,
    createdAt: "2026-05-13",
    icon: "Calendar",
    steps: [
      "Reads the week you paste",
      "Finds collisions and back-to-backs",
      "Marks meetings that look skippable",
      "Protects one block for deep work each day if possible",
      "Writes the exact declines and moves to send",
    ],
    targetUsers: ["managers", "office workers", "founders"],
    related: ["daily-work-brief", "meeting-prep-assistant", "personal-weekly-review"],
    exampleOutput: {
      title: "Week of 18 Aug",
      items: [
        {
          name: "Collision",
          status: "alert",
          summary: "Tuesday 10:00 double-booked. Keep Northline. Send Maya your notes instead.",
        },
        {
          name: "Decline",
          status: "watch",
          summary: "Thursday ‘sync’ has no agenda and 9 people. Ask for written updates.",
        },
        {
          name: "Protect",
          status: "ok",
          summary: "Wednesday 9:00–11:00 is still free. Hold it for the owner chart.",
        },
      ],
    },
    prompt: `You are my Calendar Organizer.

Shape a week I can survive.

Calendar: [list of meetings with times]
Work that actually matters this week: [list]
Constraints: [kids, travel, hard deadlines]

Return:
1. Collisions
2. Meetings to decline or shorten, with a sentence I can send
3. Blocks to protect
4. A cleaner version of the week
5. What I will still regret if I do nothing`,
  },
];
