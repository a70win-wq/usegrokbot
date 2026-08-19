export type LearnBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export type LearnArticle = {
  slug: string;
  title: string;
  description: string;
  kicker: string;
  blocks: LearnBlock[];
  verifiedAt?: string;
  sources?: { label: string; url: string }[];
};

export const learnArticles: LearnArticle[] = [
  {
    slug: "what-is-grok-bot",
    title: "What is Grok Bot?",
    description:
      "A plain-language explanation of Grok Bot: an always-on teammate that can use your tools, follow a routine, and bring finished work back to you.",
    kicker: "The basics",
    blocks: [
      {
        type: "p",
        text: "Grok Bot is an AI teammate you can give real work to. Unlike a chat box that only answers when you are sitting in front of it, a Bot can use apps, follow a routine, and keep going even when you close your laptop.",
      },
      {
        type: "p",
        text: "Think of it less as “a smarter search bar” and more as “someone on the team who can check a website every morning, draft the follow-up, and leave the result where you already work.”",
      },
      { type: "h2", text: "What it is good at" },
      {
        type: "ul",
        items: [
          "Repeating a job you can describe in plain language",
          "Reading public pages, inboxes, or lists and turning them into a short brief",
          "Drafting emails, reports and summaries you still review",
          "Watching something over time — competitors, mentions, errors, a queue",
        ],
      },
      { type: "h2", text: "What it is not" },
      {
        type: "p",
        text: "It is not magic, and it is not a replacement for judgement. A Bot will follow the instructions you give it. If those instructions are vague, the work will be vague. If a task needs a human decision — a price change, a legal call, a customer apology — the Bot should bring you the facts, not press the button.",
      },
      {
        type: "p",
        text: "UseGrokBot is an independent guide. We are not affiliated with xAI. Official pages show Bots with their own cloud computer, logins to your apps, routines, and human approvals. We map library jobs to those public examples and say so when we cannot.",
      },
      { type: "h2", text: "Who can use it" },
      {
        type: "p",
        text: "Grok Bot is in early beta. Public materials say it is available on desktop and iOS for SuperGrok Heavy, Cursor Ultra, and Cursor Teams Premium subscribers. Enterprise access is a waitlist. Plans change. Check the official site before you pay.",
      },
      { type: "h2", text: "What it can and cannot do" },
      {
        type: "ul",
        items: [
          "It can sign into tools and finish a job in the real app, not only in a chat window.",
          "It can run on a schedule after you show it the path once.",
          "It should not make legal, money, or customer-apology decisions without you.",
          "A vague prompt still produces vague work.",
        ],
      },
    ],
    verifiedAt: "2026-08-19",
    sources: [
      { label: "Introducing Grok Bot", url: "https://x.ai/news/introducing-grok-bot" },
      { label: "Get started", url: "https://docs.x.ai/grok-bot/get-started" },
    ],
  },
  {
    slug: "how-to-use-grok-bot",
    title: "How to use Grok Bot",
    description:
      "A simple path: pick a job, copy a prompt, tell the Bot what is yours, and review the first result before you put it on a schedule.",
    kicker: "Get started",
    blocks: [
      {
        type: "p",
        text: "You do not need to “learn AI” first. You need a job that is annoying, repeating, and easy to describe. That is enough.",
      },
      { type: "h2", text: "A working path" },
      {
        type: "ol",
        items: [
          "Pick one job from this site — something you already do by hand.",
          "Copy the ready-made prompt.",
          "Fill in the blanks: your company, the sites to watch, where the result should go.",
          "Run it once while you watch.",
          "Change anything that sounds unlike you.",
          "Only then put it on a daily or weekly schedule.",
        ],
      },
      { type: "h2", text: "Give the Bot a box to work in" },
      {
        type: "ul",
        items: [
          "Tell it what “done” looks like. “A 12-line Slack message” is better than “keep me updated”.",
          "Tell it what to ignore. Bots over-include if you do not.",
          "Tell it when to stop and ask you. Approvals belong to you.",
          "Keep one job per Bot. A “do everything” Bot gets messy.",
        ],
      },
      { type: "h2", text: "Review the first week" },
      {
        type: "p",
        text: "The first runs are for teaching. If a competitor brief includes a redesign as “news”, tell it to ignore design. If a follow-up email sounds like a template, paste a sentence you actually sent and say “more like this”. The prompt on this site is a start, not a cage.",
      },
      { type: "h2", text: "How much it costs" },
      {
        type: "p",
        text: "Access is bundled with listed xAI and Cursor plans, not sold as a separate “prompt pack” from this site. We do not reprint prices here because they move. See x.ai/bot for the current list.",
      },
      { type: "h2", text: "How to install" },
      {
        type: "ol",
        items: [
          "Open x.ai/bot or the official Grok Bot docs.",
          "Sign in with a SuperGrok Heavy, Cursor Ultra, or Cursor Teams Premium account.",
          "Install the desktop or iOS app.",
          "Create your first Bot and connect only the tools that job needs.",
        ],
      },
      { type: "h2", text: "Three beginner jobs" },
      {
        type: "ul",
        items: [
          "Competitor Monitor: four URLs, a morning Slack note only when something changed.",
          "Inbox Organizer: drafts, not sends, for one label in Gmail.",
          "Daily Sales Brief: calendar plus leftover follow-ups, three actions before 9:00.",
        ],
      },
      { type: "h2", text: "FAQ" },
      {
        type: "ul",
        items: [
          "Do I need to code? No. You brief a Bot in plain language.",
          "Can it send email alone? It can draft. Approve the first week.",
          "Is UseGrokBot official? No. We link official sources on every Official case.",
        ],
      },
    ],
    verifiedAt: "2026-08-19",
    sources: [
      { label: "Get started", url: "https://docs.x.ai/grok-bot/get-started" },
      { label: "Grok Bot product page", url: "https://x.ai/bot" },
    ],
  },
  {
    slug: "how-to-create-a-grok-bot",
    title: "How to create a Grok Bot",
    description:
      "How to stand up a Bot for a real job: name it, give it one task, paste a prompt, and decide how often it should run.",
    kicker: "Setup",
    blocks: [
      {
        type: "p",
        text: "Creating a Bot is less like writing software and more like briefing a new teammate. You name the job, you show an example, and you say when they should come back.",
      },
      { type: "h2", text: "Before you click create" },
      {
        type: "ul",
        items: [
          "Write the job in one sentence a colleague would understand.",
          "Decide where the result should land — Slack, email, a doc, or a list you review.",
          "Grab a prompt from this site, or write your own with the same shape: role, steps, format, what to ignore.",
        ],
      },
      { type: "h2", text: "When you set it up" },
      {
        type: "ol",
        items: [
          "Give the Bot a name that is the job, not a personality. “Competitor Monitor” beats “Buddy”.",
          "Paste the prompt. Fill the brackets with your company, URLs and tone.",
          "Connect only the tools that job needs.",
          "Run it once. Read the output out loud. If you would not send it, change the prompt.",
          "Set the schedule last — daily, weekly, or only when you ask.",
        ],
      },
      { type: "h2", text: "A prompt that works has four parts" },
      {
        type: "ol",
        items: [
          "Who the Bot is, in one line.",
          "The steps, in the order a person would do them.",
          "The exact format you want back.",
          "What to ignore, and when to say “I don’t know”.",
        ],
      },
      {
        type: "p",
        text: "If you get stuck, start from a use case on this site and only change the parts that are yours. That is faster than a blank page.",
      },
    ],
    verifiedAt: "2026-08-19",
    sources: [{ label: "Get started", url: "https://docs.x.ai/grok-bot/get-started" }],
  },
  {
    slug: "grok-bot-examples",
    title: "Grok Bot examples",
    description:
      "Concrete examples of Grok Bot at work: sales mornings, competitor checks, inbox triage, hiring screens and a weekly cash snapshot.",
    kicker: "See it",
    blocks: [
      {
        type: "p",
        text: "Abstract talk about “agents” does not help. These are jobs people already do, written so you can picture the Tuesday morning version.",
      },
      { type: "h2", text: "Sales" },
      {
        type: "p",
        text: "A Daily Sales Brief Bot reads the calendar and the leftover follow-ups, then sends three actions before 8:30. A Lead Researcher Bot fills a sheet with companies that look like last quarter’s wins — with a first line you can actually say.",
      },
      { type: "h2", text: "Marketing" },
      {
        type: "p",
        text: "A Competitor Monitor Bot visits four pricing pages every morning and only writes when a number moved. A Review Analyzer Bot reads the week’s G2 comments and hands you the phrases customers already use.",
      },
      { type: "h2", text: "The office" },
      {
        type: "p",
        text: "An Inbox Organizer Bot turns 60 unread into five replies. A Meeting Follow-up Bot turns notes into owners, and refuses to invent a due date that nobody said.",
      },
      { type: "h2", text: "Hiring and the books" },
      {
        type: "p",
        text: "A Resume Screener Bot scores a stack against must-haves and quotes the line it used. A Weekly Cash Snapshot Bot tells you whether next Friday is tight, in six lines.",
      },
      {
        type: "p",
        text: "Browse the library, copy a prompt, and run one job this week. That is the whole idea.",
      },
    ],
    verifiedAt: "2026-08-19",
    sources: [{ label: "Introducing Grok Bot", url: "https://x.ai/news/introducing-grok-bot" }],
  },
];

export function getLearnArticle(slug: string) {
  return learnArticles.find((article) => article.slug === slug);
}
