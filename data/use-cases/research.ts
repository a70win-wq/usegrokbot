import type { UseCase } from "../types";

export const researchUseCases: UseCase[] = [
  {
    slug: "daily-ai-news-brief",
    title: "Daily AI News Brief",
    shortDescription:
      "A short morning note on AI news that actually affects your work.",
    description:
      "Grok Bot reads the day’s AI news, drops the hype, and sends you a few items with why they matter to your company — not a 40-link roundup.",
    problem: "AI news is loud and I still miss the two things that affect us.",
    category: "research",
    tags: ["ai", "news", "briefing", "daily"],
    apps: ["browser", "slack", "x"],
    difficulty: "easy",
    schedule: "daily",
    setupTime: "4 min",
    featured: true,
    popular: true,
    copies: 19840,
    createdAt: "2026-02-08",
    icon: "Cpu",
    steps: [
      "Reads the day’s AI news and major posts",
      "Keeps items that change a product, price, law or workflow",
      "Drops recaps of recaps",
      "Explains why each item matters to your work",
      "Sends a briefing you can read in three minutes",
    ],
    targetUsers: ["founders", "product managers", "researchers", "operators"],
    related: ["industry-news-monitor", "product-researcher", "daily-work-brief"],
    exampleOutput: {
      title: "AI brief · 19 August",
      items: [
        {
          name: "Worth your time",
          status: "alert",
          summary:
            "A major model dropped the price of long-document review by about half. Your contract review pilot just got cheaper.",
        },
        {
          name: "Watch",
          status: "watch",
          summary: "Two EU clients asked about training-data clauses again. No law changed today.",
        },
        {
          name: "Ignore",
          status: "ok",
          summary: "Another “agents will replace your team” essay. No product news inside.",
        },
      ],
    },
    prompt: `You are my Daily AI News Brief Bot.

Filter the day’s AI news for a busy person who runs a real company.

My company: [company]
What we do: [what]
What I care about: [use cases, vendors, risks]
What I do not care about: fundraising recaps, personality drama

Return at most 6 items:
- Headline
- What actually happened
- Why it matters to us
- Action: read / watch / ignore

Then a 4-line “if you read nothing else”.`,
  },
  {
    slug: "industry-news-monitor",
    title: "Industry News Monitor",
    shortDescription:
      "Follow your industry without living in 15 newsletters.",
    description:
      "Name your industry and a few sources. Grok Bot checks them on a schedule and sends only the stories that change customers, pricing or regulation.",
    problem: "I subscribe to everything and still feel behind.",
    category: "research",
    tags: ["news", "industry", "monitoring"],
    apps: ["browser", "slack"],
    difficulty: "easy",
    schedule: "daily",
    setupTime: "5 min",
    featured: false,
    popular: true,
    copies: 8760,
    createdAt: "2026-02-26",
    icon: "Newspaper",
    steps: [
      "Checks the publications and sites you name",
      "Keeps stories that change customers, money or rules",
      "Skips recycled opinion",
      "Adds one line on what you might do",
      "Sends a short industry brief",
    ],
    targetUsers: ["founders", "strategy teams", "marketers", "operators"],
    related: ["daily-ai-news-brief", "competitor-monitor", "market-research-bot"],
    exampleOutput: {
      title: "Freight & warehousing · Tuesday",
      items: [
        {
          name: "Customer change",
          status: "alert",
          summary: "A large grocer is moving to 30-minute dock slots in the Midwest.",
        },
        {
          name: "Regulation",
          status: "watch",
          summary: "A state bill on warehouse quotas advanced. Not law yet.",
        },
        {
          name: "Noise",
          status: "ok",
          summary: "Three ‘future of logistics’ op-eds. Nothing new.",
        },
      ],
    },
    prompt: `You are my Industry News Monitor.

Watch this industry and report only what changes the work.

Industry: [industry]
Must-check sources: [list]
Customers I sell to: [list]
Ignore: [list]

Each run, return:
1. Stories that change customers
2. Stories that change money or pricing
3. Stories that change rules
4. What I can ignore
5. One thing we should talk about internally

Max 8 stories. Plain language.`,
  },
  {
    slug: "company-researcher",
    title: "Company Researcher",
    shortDescription:
      "Build a clear picture of any company from public information.",
    description:
      "Give Grok Bot a company name. It gathers what they sell, who they serve, recent news and open questions — useful for sales, hiring or partnership.",
    problem: "Every company lookup turns into 20 tabs and no notes.",
    category: "research",
    tags: ["companies", "due diligence", "profiles"],
    apps: ["browser", "linkedin"],
    alsoUses: ["notion"],
    difficulty: "easy",
    schedule: "one-time",
    setupTime: "4 min",
    featured: false,
    popular: true,
    copies: 14320,
    createdAt: "2026-03-11",
    icon: "Building2",
    steps: [
      "Reads the website, news and careers pages",
      "Writes what they sell and who they sell to",
      "Notes recent changes and open jobs",
      "Lists what is still unknown",
      "Saves a one-page profile",
    ],
    targetUsers: ["salespeople", "recruiters", "founders", "researchers"],
    related: ["prospect-research", "product-researcher", "candidate-researcher"],
    exampleOutput: {
      title: "Profile · Fieldkit",
      items: [
        {
          name: "What they are",
          status: "ok",
          summary: "Sells handheld inventory scanners and a light software layer to mid-size 3PLs.",
        },
        {
          name: "Change",
          status: "watch",
          summary: "Hired a VP of self-serve in May. Careers page now lists three solutions engineers.",
        },
        {
          name: "Unknown",
          status: "alert",
          summary: "No public pricing. No clear whether software is required with hardware.",
        },
      ],
    },
    prompt: `You are my Company Researcher.

Build a one-page public profile.

Company: [name]
Why I care: sales / hiring / partnership / investment / other
Questions I already have: [list]

Return:
1. What they sell
2. Who they sell to
3. How they seem to make money
4. What changed in the last year
5. People who matter, if public
6. Risks or oddities
7. What you could not verify

No fluff. Label guesses as guesses.`,
  },
  {
    slug: "product-researcher",
    title: "Product Researcher",
    shortDescription:
      "Compare a product to alternatives and say who it is actually for.",
    description:
      "Point Grok Bot at a product and two or three alternatives. It reads public pages and reviews, then tells you the real differences in plain language.",
    problem: "Product pages all claim the same thing and I cannot tell them apart.",
    category: "research",
    tags: ["products", "comparison", "reviews"],
    apps: ["browser", "notion"],
    difficulty: "medium",
    schedule: "one-time",
    setupTime: "6 min",
    featured: false,
    popular: false,
    copies: 7940,
    createdAt: "2026-03-25",
    icon: "Boxes",
    steps: [
      "Reads product pages, docs and reviews",
      "Lists what each product actually does",
      "Names the buyer each one seems built for",
      "Calls out hidden limits and pricing traps",
      "Recommends a pick for your situation, or a tie",
    ],
    targetUsers: ["product managers", "founders", "buyers", "marketers"],
    related: ["company-researcher", "competitor-price-monitor", "market-research-bot"],
    exampleOutput: {
      title: "Compare · three dock apps",
      items: [
        {
          name: "Fieldkit",
          status: "ok",
          summary: "Best if you already bought their scanners. Software alone is thin.",
        },
        {
          name: "Northstar",
          status: "watch",
          summary: "Strong reporting. Weak on same-day changes. Reviews mention a 24-hour lock.",
        },
        {
          name: "Pick for you",
          status: "alert",
          summary: "If same-day rebooking matters, Northstar is the wrong leader. Keep looking.",
        },
      ],
    },
    prompt: `You are my Product Researcher.

Compare products for a real buying decision.

We need the product to: [job]
Constraints: [budget, team size, must-haves]
Products to compare: [list]

For each product:
- What it actually does
- Who it is for
- Limits or traps
- Pricing if public
- Review themes

Then:
- Best fit for us, or “none of these”
- What I should still try in a demo
- Questions to ask the vendor`,
  },
  {
    slug: "market-research-bot",
    title: "Market Research Bot",
    shortDescription:
      "Turn a fuzzy market question into a structured, sourced brief.",
    description:
      "Ask a market question. Grok Bot gathers public signals, separates fact from opinion, and writes a brief you can share with a team.",
    problem: "Market research either costs a fortune or is a pile of tabs.",
    category: "research",
    tags: ["market", "strategy", "briefing"],
    apps: ["browser", "notion", "google-sheets"],
    difficulty: "medium",
    schedule: "one-time",
    setupTime: "10 min",
    featured: false,
    popular: false,
    copies: 6120,
    createdAt: "2026-04-08",
    icon: "Map",
    steps: [
      "Restates your question so it can be answered",
      "Gathers public reports, news and competitor pages",
      "Separates hard numbers from opinions",
      "Lists what is still unknown",
      "Writes a brief a non-researcher can use",
    ],
    targetUsers: ["founders", "strategy teams", "product managers"],
    related: ["research-report-builder", "industry-news-monitor", "product-researcher"],
    exampleOutput: {
      title: "Is mid-market dock software crowded?",
      items: [
        {
          name: "Answer so far",
          status: "watch",
          summary: "Crowded at the top of funnel. Thin for 10–40 dock sites that need same-day changes.",
        },
        {
          name: "Evidence",
          status: "ok",
          summary: "12 vendors. 9 show enterprise case studies only. Reviews for smaller sites are sparse.",
        },
        {
          name: "Unknown",
          status: "alert",
          summary: "No reliable number for how many 10–40 dock sites still run on sheets.",
        },
      ],
    },
    prompt: `You are my Market Research Bot.

Answer a market question with public information and clear gaps.

Question: [question]
Why we need it: [decision]
Geography: [region]
Time box: a brief, not a thesis

Return:
1. The question restated
2. Short answer
3. Evidence, with sources
4. Opinions dressed up as facts
5. Unknowns
6. What we should do next to decide

If you cannot answer it from public sources, say so early.`,
  },
  {
    slug: "reddit-researcher",
    title: "Reddit Researcher",
    shortDescription:
      "Find how real people describe a problem, in their own words.",
    description:
      "Grok Bot searches relevant subreddits for the job you care about, pulls repeated complaints and phrases, and turns them into language you can use.",
    problem: "Our copy sounds like us. Customers do not talk that way.",
    category: "research",
    tags: ["reddit", "customers", "language", "insights"],
    apps: ["reddit", "notion"],
    difficulty: "easy",
    schedule: "weekly",
    setupTime: "5 min",
    featured: true,
    popular: true,
    copies: 12870,
    createdAt: "2026-04-16",
    icon: "MessagesSquare",
    steps: [
      "Searches the subreddits you name",
      "Finds threads where people describe the job to be done",
      "Keeps repeated phrases and stories",
      "Drops jokes and off-topic fights",
      "Hands you language and product clues",
    ],
    targetUsers: ["marketers", "product managers", "founders", "researchers"],
    related: ["customer-review-analyzer", "faq-research-bot", "x-sentiment-research"],
    exampleOutput: {
      title: "r/warehouse + r/logistics · dock pain",
      items: [
        {
          name: "Phrase to steal",
          status: "alert",
          summary: "“The board is a suggestion.” Appeared in 6 threads.",
        },
        {
          name: "Job to be done",
          status: "ok",
          summary: "People want one name on the hook when a truck is late. Not another dashboard.",
        },
        {
          name: "Product clue",
          status: "watch",
          summary: "Several posters print the schedule because the app locks after 6pm.",
        },
      ],
    },
    prompt: `You are my Reddit Researcher.

Find how real people talk about a problem.

Problem / job: [job]
Subreddits: [list]
What I will use this for: copy / product / support

Return:
1. Repeated phrases — exact words
2. Stories that show the job
3. Workarounds people already use
4. Complaints about existing tools
5. What I should not take too seriously
6. 5 lines of copy in their language

Do not invent usernames or quotes.`,
  },
  {
    slug: "x-sentiment-research",
    title: "X Sentiment Research",
    shortDescription:
      "See what people currently feel about a brand, topic or launch.",
    description:
      "Grok Bot samples recent posts, groups them into praise, confusion and anger, and tells you whether the mood is shifting.",
    problem: "A few loud posts make it hard to tell what people actually think.",
    category: "research",
    tags: ["x", "sentiment", "brand", "launch"],
    apps: ["x", "slack"],
    difficulty: "medium",
    schedule: "daily",
    setupTime: "5 min",
    featured: false,
    popular: false,
    copies: 5380,
    createdAt: "2026-05-06",
    icon: "Activity",
    steps: [
      "Samples recent posts about the topic you name",
      "Groups them into praise, confusion, anger and jokes",
      "Notes whether a few accounts are driving the noise",
      "Flags a shift from the last run if you paste it",
      "Suggests whether to reply, wait or brief leadership",
    ],
    targetUsers: ["comms teams", "founders", "marketers"],
    related: ["brand-mention-monitor", "customer-sentiment-monitor", "x-content-researcher"],
    exampleOutput: {
      title: "Sentiment · new pricing page",
      items: [
        {
          name: "Mood",
          status: "watch",
          summary: "More confusion than anger. People cannot tell if seats are included.",
        },
        {
          name: "Loud vs common",
          status: "ok",
          summary: "Two big accounts dunked. Most replies are ‘does this include SSO?’",
        },
        {
          name: "Do this",
          status: "alert",
          summary: "Add one sentence on seats to the pricing page today. Do not write a thread.",
        },
      ],
    },
    prompt: `You are my X Sentiment Research Bot.

Tell me what people currently feel. Do not be swayed by the loudest account.

Topic or brand: [topic]
Time window: last 24 hours / 7 days
Last run, if any: [paste]

Return:
1. Overall mood
2. Praise / confusion / anger, with example posts
3. Whether a few accounts are driving it
4. What changed since last time
5. Action: reply / fix the product page / wait / brief leadership

No fake percentages.`,
  },
  {
    slug: "research-report-builder",
    title: "Research Report Builder",
    shortDescription:
      "Turn a folder of notes and links into a report someone can use.",
    description:
      "Paste your messy research. Grok Bot structures it into findings, evidence, gaps and recommendations — ready to share.",
    problem: "I do the research and then dread writing it up.",
    category: "research",
    tags: ["reports", "writing", "synthesis"],
    apps: ["notion", "google-sheets"],
    difficulty: "medium",
    schedule: "one-time",
    setupTime: "8 min",
    featured: false,
    popular: false,
    copies: 4670,
    createdAt: "2026-05-24",
    icon: "FileText",
    steps: [
      "Reads your notes, quotes and links",
      "Groups them into a few findings",
      "Attaches evidence under each finding",
      "Lists gaps and weak spots",
      "Writes recommendations a decision-maker can act on",
    ],
    targetUsers: ["researchers", "consultants", "product managers", "students"],
    related: ["blog-research-assistant", "market-research-bot", "weekly-report-generator"],
    exampleOutput: {
      title: "Report · same-day dock changes",
      items: [
        {
          name: "Finding 1",
          status: "ok",
          summary: "Teams that allow same-day changes still print a paper fallback after 4pm.",
        },
        {
          name: "Weak spot",
          status: "watch",
          summary: "Only four interviews. Do not present this as a market study.",
        },
        {
          name: "Do next",
          status: "alert",
          summary: "Watch two sites on a Tuesday afternoon before you promise same-day in sales.",
        },
      ],
    },
    prompt: `You are my Research Report Builder.

Turn messy notes into a report a busy person can use.

Question: [question]
Audience: [who will read this]
Notes, quotes, links: [paste]

Return:
1. Title
2. Answer in 5 lines
3. Findings, each with evidence
4. Gaps and weak spots
5. Recommendations
6. What should not be claimed yet

Keep my quotes. Do not polish them into marketing.`,
  },
];
