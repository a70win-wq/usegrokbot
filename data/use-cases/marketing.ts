import type { UseCase } from "../types";

export const marketingUseCases: UseCase[] = [
  {
    slug: "competitor-monitor",
    title: "Competitor Monitor",
    shortDescription:
      "Automatically check competitor websites and tell you when something important changes.",
    description:
      "Pick a few competitor sites. Grok Bot visits them on a schedule, ignores tiny design tweaks, and sends a short briefing when pricing, product or messaging actually changes.",
    problem: "I find out about competitor changes from a customer, not from my own team.",
    category: "marketing",
    tags: ["competitors", "monitoring", "pricing", "research"],
    apps: ["browser", "slack"],
    difficulty: "easy",
    schedule: "daily",
    setupTime: "5 min",
    featured: true,
    popular: true,
    copies: 22340,
    createdAt: "2026-02-14",
    icon: "Eye",
    steps: [
      "Visits the competitor websites you choose",
      "Checks homepage, pricing, product and news pages",
      "Compares what it sees with the last check",
      "Ignores small design or wording tweaks",
      "Sends a short briefing with what changed and why it may matter",
    ],
    targetUsers: [
      "marketing teams",
      "business owners",
      "founders",
      "sales teams",
      "product managers",
    ],
    related: [
      "competitor-price-monitor",
      "competitor-social-monitor",
      "seo-researcher",
      "industry-news-monitor",
    ],
    exampleOutput: {
      title: "Daily competitor brief",
      items: [
        {
          name: "Competitor A",
          status: "alert",
          summary: "Pricing changed. New plans start at $49/month instead of $39/month.",
          why: "They appear to be moving upmarket.",
          action: "Review whether your current price still looks like the smarter entry point.",
        },
        {
          name: "Competitor B",
          status: "watch",
          summary: "Published three new articles about AI automation on the blog.",
          why: "They are bidding on the same search stories you care about.",
        },
        {
          name: "Competitor C",
          status: "ok",
          summary: "No important changes.",
        },
      ],
    },
    prompt: `You are my Competitor Monitoring Bot.

Your job is to monitor the competitors I provide and give me a concise report whenever something important changes.

Competitors:
[list names and URLs]

Check these areas:
- homepage
- pricing
- product pages
- blog / news
- major announcements

For every check:
1. Visit each competitor.
2. Look for meaningful changes.
3. Ignore minor design or formatting changes.
4. Explain what changed.
5. Explain why the change may matter to my business.
6. Suggest one action I should consider.

Return the result in this format:

Competitor:
Change:
Why it matters:
Recommended action:

If nothing important changed, say:
"No important competitor changes detected."`,
  },
  {
    slug: "competitor-price-monitor",
    title: "Competitor Price Monitor",
    shortDescription:
      "Watch competitor pricing pages and flag real price or plan changes.",
    description:
      "Grok Bot checks the pricing pages you name, records the plan names and prices, and only alerts you when a number or a limit actually moves.",
    problem: "Pricing pages change quietly and I notice weeks later.",
    category: "marketing",
    tags: ["pricing", "competitors", "plans"],
    apps: ["browser", "google-sheets", "slack"],
    difficulty: "easy",
    schedule: "weekly",
    setupTime: "5 min",
    featured: false,
    popular: true,
    copies: 11280,
    createdAt: "2026-02-20",
    icon: "DollarSign",
    steps: [
      "Opens each competitor pricing page",
      "Writes down plan names, prices and key limits",
      "Compares with the last snapshot",
      "Flags new plans, removed plans and price moves",
      "Adds one sentence on what you might do about it",
    ],
    targetUsers: ["founders", "product marketers", "sales leaders"],
    related: ["competitor-monitor", "marketing-campaign-report", "product-researcher"],
    exampleOutput: {
      title: "Weekly price check",
      items: [
        {
          name: "Northstar · Pro plan",
          status: "alert",
          summary: "Pro moved from $79 to $99. Seat limit unchanged.",
          why: "Your Pro equivalent is now $20 cheaper with a similar limit.",
          action: "Tell sales. Do not change your price this week.",
        },
        {
          name: "Lumen",
          status: "watch",
          summary: "Added a $19 starter plan with a 3-project cap.",
        },
        {
          name: "Fieldkit",
          status: "ok",
          summary: "No price or plan changes.",
        },
      ],
    },
    prompt: `You are my Competitor Price Monitor.

Watch pricing pages and report only real commercial changes.

Competitors and pricing URLs:
[list]

Each run:
1. Capture plan name, monthly price, yearly price, and the main limit on each plan.
2. Compare with the previous snapshot I paste below.
3. Report new plans, removed plans, price changes and limit changes.
4. Ignore visual redesigns.
5. Suggest one response, or say “do nothing”.

Previous snapshot:
[paste]

Return a tight table-like list, then a 4-line summary for Slack.`,
  },
  {
    slug: "ad-monitor",
    title: "Ad Monitor",
    shortDescription:
      "See what competitors are saying in their ads this week.",
    description:
      "Grok Bot reviews public ad libraries and landing pages, then summarizes the promises, offers and angles your competitors are running.",
    problem: "I only see competitor ads when they happen to follow me.",
    category: "marketing",
    tags: ["ads", "competitors", "creative", "messaging"],
    apps: ["browser", "notion"],
    difficulty: "medium",
    schedule: "weekly",
    setupTime: "8 min",
    featured: false,
    popular: false,
    copies: 5640,
    createdAt: "2026-03-04",
    icon: "Megaphone",
    steps: [
      "Looks up public ads and the pages they send people to",
      "Groups ads by promise, offer and audience",
      "Notes new angles and tired ones",
      "Pulls lines you could learn from — not copy",
      "Writes a weekly creative brief",
    ],
    targetUsers: ["performance marketers", "agency teams", "founders"],
    related: ["competitor-monitor", "customer-review-analyzer", "viral-content-researcher"],
    exampleOutput: {
      title: "Weekly ad scan · 4 competitors",
      items: [
        {
          name: "New angle",
          status: "alert",
          summary: "Two competitors dropped “AI-powered” and now lead with “done by 9am”.",
          why: "The market is tired of AI claims. Speed is the live promise.",
        },
        {
          name: "Offer",
          status: "watch",
          summary: "Northstar is testing 14-day setup, not a free month.",
        },
        {
          name: "Skip",
          status: "ok",
          summary: "Same stock warehouse footage as last month. Nothing to learn.",
        },
      ],
    },
    prompt: `You are my Ad Monitor Bot.

Summarize what competitors are promising in public ads this week.

Competitors: [list]
Markets / languages: [list]
Where to look: public ad libraries, their landing pages, YouTube pre-roll if relevant

Return:
1. The 3 promises showing up most
2. New offers or guarantees
3. Audiences they seem to be targeting
4. Lines that are working because they are specific
5. Lines that sound like everyone else
6. One idea we should test — original, not a copy

Do not reproduce an ad in full. Describe the idea.`,
  },
  {
    slug: "seo-researcher",
    title: "SEO Researcher",
    shortDescription:
      "Find search topics you can realistically win, not vanity keywords.",
    description:
      "Tell Grok Bot what you sell. It looks at competitor pages and the way people search, then gives you a short list of topics worth writing or improving.",
    problem: "Keyword lists are long, and I still do not know what to publish.",
    category: "marketing",
    tags: ["seo", "keywords", "content", "competitors"],
    apps: ["browser", "google-sheets"],
    difficulty: "medium",
    schedule: "weekly",
    setupTime: "8 min",
    featured: false,
    popular: true,
    copies: 8890,
    createdAt: "2026-03-22",
    icon: "LineChart",
    steps: [
      "Looks at how competitors title and structure their pages",
      "Groups topics by the job the searcher is trying to do",
      "Marks topics that look crowded versus still open",
      "Suggests the page you should write or improve first",
      "Adds a simple outline for that page",
    ],
    targetUsers: ["content marketers", "founders", "SEO specialists"],
    related: ["keyword-researcher", "blog-research-assistant", "competitor-monitor"],
    exampleOutput: {
      title: "Topics worth a page this month",
      items: [
        {
          name: "Write",
          status: "alert",
          summary: "“dock scheduling for mid-size warehouses” — clear job, thin results.",
        },
        {
          name: "Improve",
          status: "watch",
          summary: "Your “what is a TMS” page is generic. Add a 20-dock example.",
        },
        {
          name: "Skip",
          status: "ok",
          summary: "“best logistics software” is a page you will not win this quarter.",
        },
      ],
    },
    prompt: `You are my SEO Research Bot.

Help me pick search topics we can actually win.

We sell: [product]
Ideal reader: [reader]
Competitors: [sites]
Pages we already have: [list]

Do this:
1. List 15 topics grouped by the job to be done, not by keyword stuffing.
2. Mark each as write / improve / skip.
3. Explain why in one line.
4. Pick the single best next page.
5. Give a plain outline for that page.

Avoid made-up search volumes. Talk about difficulty in plain language: crowded / open / long shot.`,
  },
  {
    slug: "keyword-researcher",
    title: "Keyword Researcher",
    shortDescription:
      "Turn a messy topic into a short list of phrases people actually type.",
    description:
      "Give Grok Bot a product or article idea. It produces phrases grouped by intent — learn, compare, buy — and tells you which ones are worth a page.",
    problem: "I start writing before I know the words people use.",
    category: "marketing",
    tags: ["keywords", "seo", "intent", "copy"],
    apps: ["browser", "google-sheets"],
    difficulty: "easy",
    schedule: "one-time",
    setupTime: "4 min",
    featured: false,
    popular: false,
    copies: 7430,
    createdAt: "2026-03-28",
    icon: "KeyRound",
    steps: [
      "Starts from the topic or product you name",
      "Lists the phrases a real person would type",
      "Groups them by learn / compare / buy",
      "Drops the generic phrases everyone already ranks for",
      "Hands you a shortlist for one page or one campaign",
    ],
    targetUsers: ["marketers", "writers", "founders"],
    related: ["seo-researcher", "trending-topic-finder", "blog-research-assistant"],
    exampleOutput: {
      title: "Phrases for a warehouse scheduling page",
      items: [
        {
          name: "Learn",
          status: "ok",
          summary: "what is dock scheduling, dock appointment system",
        },
        {
          name: "Compare",
          status: "watch",
          summary: "dock scheduling vs yard management, spreadsheet vs dock app",
        },
        {
          name: "Buy",
          status: "alert",
          summary: "dock scheduling software for 3PL, warehouse appointment booking tool",
        },
      ],
    },
    prompt: `You are my Keyword Research Bot.

Turn a topic into phrases real people type.

Topic: [topic]
Who is searching: [audience]
We are trying to: learn / compare / buy / all

Return:
1. Learn phrases
2. Compare phrases
3. Buy phrases
4. Phrases to ignore because they are too broad
5. The 5 phrases I should actually use on the page
6. A suggested title and meta description in plain language

No fake monthly volumes.`,
  },
  {
    slug: "brand-mention-monitor",
    title: "Brand Mention Monitor",
    shortDescription:
      "Catch when people talk about you — and when they talk about a competitor instead.",
    description:
      "Grok Bot checks the public web, X and Reddit for your name, product and common misspellings, then sends only the mentions that need a reply or a look.",
    problem: "I find out about a complaint when it is already a week old.",
    category: "marketing",
    tags: ["mentions", "reputation", "social", "alerts"],
    apps: ["browser", "x", "reddit", "slack"],
    difficulty: "easy",
    schedule: "daily",
    setupTime: "5 min",
    featured: false,
    popular: false,
    copies: 6310,
    createdAt: "2026-04-11",
    icon: "Radio",
    steps: [
      "Searches for your brand, product and common misspellings",
      "Checks X, Reddit and a few industry sites",
      "Drops praise that needs no reply",
      "Flags complaints, questions and competitor comparisons",
      "Suggests whether to reply, watch or escalate",
    ],
    targetUsers: ["marketing teams", "community managers", "founders"],
    related: ["customer-sentiment-monitor", "x-sentiment-research", "customer-review-analyzer"],
    exampleOutput: {
      title: "Mentions · last 24 hours",
      items: [
        {
          name: "Reply today",
          status: "alert",
          summary:
            "Reddit thread: a user says onboarding stalled at step 3. 14 upvotes. No staff reply yet.",
        },
        {
          name: "Watch",
          status: "watch",
          summary: "Someone on X compared you to Northstar and preferred their reports.",
        },
        {
          name: "Fine",
          status: "ok",
          summary: "Two quiet thank-you posts. No action needed.",
        },
      ],
    },
    prompt: `You are my Brand Mention Monitor.

Find public mentions that a human should see.

Brand names and misspellings: [list]
Product names: [list]
Places to check: X, Reddit, news, forums I name: [list]

For each mention:
- Where
- Who
- What they said, in one line
- Sentiment: praise / question / complaint / comparison
- Action: reply / watch / escalate / ignore
- Suggested reply only if action is reply

Skip duplicates and bot spam. If nothing matters, say so.`,
  },
  {
    slug: "marketing-campaign-report",
    title: "Marketing Campaign Report",
    shortDescription:
      "Turn campaign numbers into a one-page story a manager can read.",
    description:
      "Paste results from ads, email or a launch. Grok Bot writes what worked, what did not, and what to do next week — without a 20-slide deck.",
    problem: "I have dashboards, but I still have to write the story by hand.",
    category: "marketing",
    tags: ["reporting", "campaigns", "analytics"],
    apps: ["google-sheets", "slack", "notion"],
    difficulty: "easy",
    schedule: "weekly",
    setupTime: "5 min",
    featured: false,
    popular: false,
    copies: 5020,
    createdAt: "2026-04-27",
    icon: "BarChart3",
    steps: [
      "Reads the numbers you paste",
      "Finds the one or two things that actually moved",
      "Explains them in plain language",
      "Calls out what to stop, start or keep",
      "Writes a one-page report you can paste into Slack",
    ],
    targetUsers: ["marketers", "agency teams", "founders"],
    related: ["weekly-report-generator", "ad-monitor", "customer-review-analyzer"],
    exampleOutput: {
      title: "Spring launch · week 2",
      items: [
        {
          name: "What worked",
          status: "ok",
          summary: "The “done by 9am” email drove 41% of demo requests. Ads did not.",
        },
        {
          name: "What to stop",
          status: "alert",
          summary: "Lookalike ads spent $1,200 for 3 signups. Pause today.",
        },
        {
          name: "Next week",
          status: "watch",
          summary: "Turn the email into a landing page headline and shift $800 there.",
        },
      ],
    },
    prompt: `You are my Marketing Campaign Report Bot.

Turn raw results into a one-page story.

Campaign: [name]
Dates: [range]
Goal: [goal]
Numbers: [paste]
Context I already know: [notes]

Return:
1. The story in 5 lines
2. What worked
3. What did not
4. What is unclear
5. Stop / start / keep
6. One chart I do not need because the sentence is enough

No jargon. If the numbers cannot support a claim, do not make it.`,
  },
  {
    slug: "customer-review-analyzer",
    title: "Customer Review Analyzer",
    shortDescription:
      "Read a pile of reviews and tell you what people love, hate and keep repeating.",
    description:
      "Paste App Store, G2, Google or Amazon reviews. Grok Bot groups the themes, pulls real quotes and shows you what to fix or say in marketing.",
    problem: "We have hundreds of reviews and nobody has time to read them.",
    category: "marketing",
    tags: ["reviews", "feedback", "voice of customer", "copy"],
    apps: ["browser", "notion", "google-sheets"],
    difficulty: "easy",
    schedule: "weekly",
    setupTime: "5 min",
    featured: true,
    popular: true,
    copies: 13450,
    createdAt: "2026-05-09",
    icon: "MessageSquareQuote",
    steps: [
      "Reads the reviews you paste or point to",
      "Groups them into a few repeated themes",
      "Keeps real customer language, not rewritten slogans",
      "Separates product issues from marketing claims you should stop making",
      "Hands you quotes you can use and problems you should fix",
    ],
    targetUsers: ["product marketers", "founders", "support leads"],
    related: ["feedback-collector", "customer-sentiment-monitor", "faq-research-bot"],
    exampleOutput: {
      title: "84 reviews · last 60 days",
      items: [
        {
          name: "Love",
          status: "ok",
          summary: "“I set the week on Sunday night and stop thinking about it.” Repeated 19 times.",
        },
        {
          name: "Hate",
          status: "alert",
          summary: "Mobile upload fails on site photos. 11 reviews, last 3 weeks.",
          action: "Do not run the ‘works in the yard’ ad until this is fixed.",
        },
        {
          name: "Language to steal",
          status: "watch",
          summary: "Customers say “Sunday night”, never “weekly planning ritual”.",
        },
      ],
    },
    prompt: `You are my Customer Review Analyzer.

Read reviews and tell me the truth.

Source: [G2 / Google / App Store / Amazon / other]
Product: [name]
Reviews: [paste]

Return:
1. Top 5 themes, with how often they appear
2. Best exact quotes — do not rewrite them
3. Worst exact quotes
4. Claims we should stop making
5. Words customers use that we do not
6. The one product issue to fix first
7. The one line marketing should start using

If the sample is too small, say so.`,
  },
];
