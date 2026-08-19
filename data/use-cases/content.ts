import type { UseCase } from "../types";

export const contentUseCases: UseCase[] = [
  {
    slug: "trending-topic-finder",
    title: "Trending Topic Finder",
    shortDescription:
      "Find topics people are talking about this week that you can still write about in time.",
    description:
      "Grok Bot scans news, X and Reddit in your niche and returns a short list of topics that are heating up — with an angle you can publish this week.",
    problem: "By the time I notice a trend, everyone else has already posted.",
    category: "content",
    tags: ["trends", "ideas", "news", "planning"],
    apps: ["browser", "x", "reddit"],
    difficulty: "easy",
    schedule: "daily",
    setupTime: "4 min",
    featured: true,
    popular: true,
    copies: 16790,
    createdAt: "2026-03-08",
    icon: "TrendingUp",
    steps: [
      "Looks at news, X and Reddit in the niche you name",
      "Drops topics that are already over-covered",
      "Keeps topics that are rising and still have a gap",
      "Gives you an angle, a title and who it is for",
      "Tells you if you should write today or wait",
    ],
    targetUsers: ["creators", "content marketers", "newsletter writers"],
    related: ["x-content-researcher", "viral-content-researcher", "newsletter-creator"],
    exampleOutput: {
      title: "Topics to write this week",
      items: [
        {
          name: "Write today",
          status: "alert",
          summary:
            "Three warehouse newsletters mentioned ‘no-show carriers’ after a port delay. Almost no how-to posts yet.",
        },
        {
          name: "Maybe Thursday",
          status: "watch",
          summary: "A new scheduling feature from a big TMS. Wait for the docs before commenting.",
        },
        {
          name: "Skip",
          status: "ok",
          summary: "Another ‘AI will replace dispatchers’ take. Saturated.",
        },
      ],
    },
    prompt: `You are my Trending Topic Finder.

Find topics in my niche that I can still write about in time.

Niche: [niche]
Audience: [audience]
Places I publish: [blog / LinkedIn / X / newsletter]
Topics I already covered: [list]

Return 8 topics:
- Topic
- Why it is moving now
- How crowded it is
- Angle only I should take
- Format: post / thread / newsletter / long article
- Write today / this week / skip

Be picky. I need fewer, better ideas.`,
  },
  {
    slug: "x-content-researcher",
    title: "X Content Researcher",
    shortDescription:
      "See which posts in your space are getting real replies, not just likes.",
    description:
      "Grok Bot looks at recent posts from people you care about, notes what sparked conversation, and suggests three posts you could write in your own voice.",
    problem: "I scroll X for ideas and leave with none I want to publish.",
    category: "content",
    tags: ["x", "twitter", "social", "ideas"],
    apps: ["x", "notion"],
    difficulty: "easy",
    schedule: "daily",
    setupTime: "4 min",
    featured: false,
    popular: true,
    copies: 9420,
    createdAt: "2026-03-16",
    icon: "Radio",
    steps: [
      "Reads recent posts from accounts or topics you name",
      "Ignores empty engagement bait",
      "Keeps posts that earned real replies",
      "Explains why they worked in one line",
      "Drafts three original post ideas in your voice",
    ],
    targetUsers: ["creators", "founders", "marketers"],
    related: ["linkedin-post-researcher", "trending-topic-finder", "x-sentiment-research"],
    exampleOutput: {
      title: "X research · ops tools",
      items: [
        {
          name: "What worked",
          status: "ok",
          summary: "A founder posted the exact Slack message they send after a missed SLA. 80 replies.",
        },
        {
          name: "Why",
          status: "watch",
          summary: "People reply to artifacts, not opinions.",
        },
        {
          name: "Your version",
          status: "alert",
          summary: "Post the actual Sunday-night checklist you send warehouse leads. No lesson attached.",
        },
      ],
    },
    prompt: `You are my X Content Researcher.

Find posts in my space that earned real conversation, then help me write original ones.

Accounts or topics to watch: [list]
My voice: [plain / sharp / warm / expert]
I do not want to: [bait, dunking, etc.]

Return:
1. 6 posts that worked, with why, in one line each
2. Patterns you see
3. 3 original post ideas I could publish
4. A first draft for the best one
5. What I should not copy

Do not invent metrics.`,
  },
  {
    slug: "linkedin-post-researcher",
    title: "LinkedIn Post Researcher",
    shortDescription:
      "Find LinkedIn posts in your industry that people actually comment on.",
    description:
      "Grok Bot reviews posts from people like your buyers, pulls the structures that work, and drafts a post you can publish without sounding like a guru.",
    problem: "Most LinkedIn advice sounds the same and I do not want to post that.",
    category: "content",
    tags: ["linkedin", "social", "b2b", "writing"],
    apps: ["linkedin", "notion"],
    difficulty: "easy",
    schedule: "weekly",
    setupTime: "5 min",
    featured: false,
    popular: true,
    copies: 10880,
    createdAt: "2026-03-30",
    icon: "Contact",
    steps: [
      "Looks at recent posts from buyers and peers you name",
      "Notes hooks, story shapes and comments",
      "Throws out carousels of recycled advice",
      "Drafts one post from a real story you provide",
      "Gives a shorter version for a busy day",
    ],
    targetUsers: ["B2B marketers", "founders", "consultants"],
    related: ["x-content-researcher", "content-repurposing-bot", "newsletter-creator"],
    exampleOutput: {
      title: "LinkedIn brief · warehouse software",
      items: [
        {
          name: "Structure that worked",
          status: "ok",
          summary: "One mistake, the cost in hours, what they changed. No lesson slide.",
        },
        {
          name: "Avoid",
          status: "watch",
          summary: "“5 lessons from scaling ops” posts. Comments are empty.",
        },
        {
          name: "Draft hook",
          status: "alert",
          summary: "We lost a customer because a truck sat 47 minutes and nobody owned the board.",
        },
      ],
    },
    prompt: `You are my LinkedIn Post Researcher.

Help me post like a person who does the work, not a thought-leader bot.

People or companies to watch: [list]
My audience: [audience]
A real story I can tell: [story]

Return:
1. 5 posts worth studying, and why
2. Structures to steal (not sentences)
3. One full draft from my story
4. A shorter alternate
5. A first comment I should add under my own post

No “delighted to share”. No emoji walls.`,
  },
  {
    slug: "youtube-idea-researcher",
    title: "YouTube Idea Researcher",
    shortDescription:
      "Find video ideas from what already works on YouTube in your niche.",
    description:
      "Grok Bot looks at titles, comments and upload patterns, then gives you ideas with a title, thumbnail promise and why someone would click.",
    problem: "I know I should be on YouTube and I do not know which video to make first.",
    category: "content",
    tags: ["youtube", "video", "ideas", "titles"],
    apps: ["youtube", "notion"],
    difficulty: "easy",
    schedule: "weekly",
    setupTime: "6 min",
    featured: false,
    popular: false,
    copies: 7210,
    createdAt: "2026-04-06",
    icon: "Play",
    steps: [
      "Looks at recent videos in your niche",
      "Reads titles and the complaints in comments",
      "Finds questions the big videos did not answer",
      "Suggests 6 video ideas with a title and promise",
      "Picks the one you should film first",
    ],
    targetUsers: ["creators", "educators", "product marketers"],
    related: ["trending-topic-finder", "viral-content-researcher", "blog-research-assistant"],
    exampleOutput: {
      title: "Video ideas · warehouse ops",
      items: [
        {
          name: "Film first",
          status: "alert",
          summary:
            "Title: “I planned a 20-dock Tuesday on a whiteboard.” Comments on big TMS videos keep asking for a real walkthrough.",
        },
        {
          name: "Later",
          status: "watch",
          summary: "A calm teardown of a competitor’s new scheduling UI. Wait until you have footage.",
        },
        {
          name: "Skip",
          status: "ok",
          summary: "“Top 10 warehouse tools.” Crowded and empty.",
        },
      ],
    },
    prompt: `You are my YouTube Idea Researcher.

Find video ideas I can film, not a list of generic titles.

Niche: [niche]
My face / no face: [style]
Length I can make: [minutes]
Channels to study: [list]

Return 6 ideas:
- Title
- Thumbnail promise in 5 words
- Why someone clicks
- What the comments on similar videos still want
- Difficulty to film
- Film first / later / skip

Then write a 6-section outline for the “film first” idea.`,
  },
  {
    slug: "newsletter-creator",
    title: "Newsletter Creator",
    shortDescription:
      "Turn the week’s notes and links into a newsletter people finish.",
    description:
      "Paste your messy notes. Grok Bot writes a short issue with one point of view, a few links and a closer — not a link dump.",
    problem: "My newsletter is a pile of links I would not read myself.",
    category: "content",
    tags: ["newsletter", "writing", "email"],
    apps: ["gmail", "notion", "browser"],
    difficulty: "easy",
    schedule: "weekly",
    setupTime: "6 min",
    featured: true,
    popular: true,
    copies: 11960,
    createdAt: "2026-04-19",
    icon: "Mail",
    steps: [
      "Reads your notes, links and half-finished thoughts",
      "Picks one idea the issue is about",
      "Writes a short opening a human would send",
      "Keeps only the links that earn their place",
      "Adds a subject line and a preview line",
    ],
    targetUsers: ["creators", "founders", "marketers"],
    related: ["content-repurposing-bot", "trending-topic-finder", "blog-research-assistant"],
    exampleOutput: {
      title: "Issue draft · “The board nobody owns”",
      items: [
        {
          name: "Subject",
          status: "ok",
          summary: "The dock board had 4 owners. That was the problem.",
        },
        {
          name: "Shape",
          status: "watch",
          summary: "One story, two links, one question. 450 words.",
        },
        {
          name: "Cut",
          status: "alert",
          summary: "Dropped the AI-tools roundup. It did not belong in this issue.",
        },
      ],
    },
    prompt: `You are my Newsletter Creator.

Write an issue people finish.

Audience: [audience]
Cadence: weekly
My notes and links: [paste]
Voice: [plain / warm / pointed]

Rules:
- One idea per issue
- 400–700 words
- At most 5 links
- No “here are 12 things I read”

Return:
1. Subject line
2. Preview text
3. Full issue
4. What you cut and why
5. A question I can ask readers at the end`,
  },
  {
    slug: "blog-research-assistant",
    title: "Blog Research Assistant",
    shortDescription:
      "Do the reading for an article and hand you an outline with sources.",
    description:
      "Give Grok Bot a title or question. It gathers the useful public sources, notes disagreements, and builds an outline you can write from.",
    problem: "Research for one article eats a whole afternoon.",
    category: "content",
    tags: ["blog", "research", "outlines", "sources"],
    apps: ["browser", "notion"],
    difficulty: "medium",
    schedule: "one-time",
    setupTime: "6 min",
    featured: false,
    popular: false,
    copies: 6840,
    createdAt: "2026-05-02",
    icon: "Library",
    steps: [
      "Searches for the best public pages on your question",
      "Keeps sources that add a fact or a disagreement",
      "Drops SEO clones of each other",
      "Writes an outline with the holes you still need to fill",
      "Lists claims that need a primary source",
    ],
    targetUsers: ["writers", "content marketers", "researchers"],
    related: ["seo-researcher", "research-report-builder", "newsletter-creator"],
    exampleOutput: {
      title: "Research pack · dock no-shows",
      items: [
        {
          name: "What is known",
          status: "ok",
          summary: "Industry pieces put no-show rates between 8% and 20%. None share a method.",
        },
        {
          name: "Disagreement",
          status: "watch",
          summary: "Vendors blame carriers. Carriers blame 2-hour windows.",
        },
        {
          name: "Hole to fill",
          status: "alert",
          summary: "You still need one real number from a customer before you publish.",
        },
      ],
    },
    prompt: `You are my Blog Research Assistant.

Do the reading. Do not write the article yet.

Question or working title: [title]
Audience: [audience]
Must-include sources if I have them: [list]

Return:
1. 8 useful sources with one-line notes
2. What everyone repeats
3. Where sources disagree
4. Claims that need a primary source
5. A writing outline
6. What I should still ask a real customer

If sources are thin, say the article should not be written yet.`,
  },
  {
    slug: "content-repurposing-bot",
    title: "Content Repurposing Bot",
    shortDescription:
      "Turn one good piece into a week of smaller posts without sounding canned.",
    description:
      "Paste a blog post, talk or newsletter. Grok Bot cuts it into a LinkedIn post, an X thread, an email blurb and a short video outline.",
    problem: "I publish once and then the idea dies.",
    category: "content",
    tags: ["repurposing", "social", "newsletter", "video"],
    apps: ["linkedin", "x"],
    alsoUses: ["notion"],
    difficulty: "easy",
    schedule: "one-time",
    setupTime: "4 min",
    featured: false,
    popular: true,
    copies: 10110,
    createdAt: "2026-05-21",
    icon: "Layers",
    steps: [
      "Reads the original piece",
      "Finds the one idea that can travel",
      "Writes a LinkedIn post, an X version and an email blurb",
      "Sketches a 45-second video",
      "Keeps your examples. Does not invent new ones",
    ],
    targetUsers: ["creators", "marketers", "founders"],
    related: ["newsletter-creator", "linkedin-post-researcher", "x-content-researcher"],
    exampleOutput: {
      title: "From the “nobody owns the board” essay",
      items: [
        {
          name: "LinkedIn",
          status: "ok",
          summary: "The 47-minute truck story, then the one-owner rule.",
        },
        {
          name: "X",
          status: "watch",
          summary: "6-line thread. Last line is the rule, not a CTA.",
        },
        {
          name: "Video",
          status: "alert",
          summary: "Film the actual board. 45 seconds. No sit-down talking head.",
        },
      ],
    },
    prompt: `You are my Content Repurposing Bot.

Turn one piece into smaller pieces that still sound like me.

Original: [paste]
Voice notes: [how I talk]
Channels: LinkedIn, X, email, short video

Return:
1. The one idea that should travel
2. LinkedIn post
3. X thread or single post
4. Email blurb
5. 45-second video outline
6. Lines you refused to reuse because they only work in the original

Do not invent new case studies.`,
  },
  {
    slug: "viral-content-researcher",
    title: "Viral Content Researcher",
    shortDescription:
      "Study posts that spread in your niche and extract the pattern — not a copy.",
    description:
      "Grok Bot looks at recent breakout posts or videos, names the pattern, and suggests an original piece that could travel for the same reason.",
    problem: "I see viral posts and I cannot tell why they worked.",
    category: "content",
    tags: ["viral", "patterns", "social", "ideas"],
    apps: ["browser", "x", "youtube", "linkedin"],
    difficulty: "medium",
    schedule: "weekly",
    setupTime: "7 min",
    featured: false,
    popular: false,
    copies: 5590,
    createdAt: "2026-06-04",
    icon: "Sparkles",
    steps: [
      "Looks at recent breakout posts or videos you name",
      "Separates luck from a repeatable pattern",
      "Names the emotion, the artifact and the timing",
      "Suggests an original idea that uses the pattern",
      "Warns you when something is not worth chasing",
    ],
    targetUsers: ["creators", "social teams", "founders"],
    related: ["trending-topic-finder", "x-content-researcher", "youtube-idea-researcher"],
    exampleOutput: {
      title: "Pattern watch · ops creators",
      items: [
        {
          name: "Pattern",
          status: "ok",
          summary: "Show the broken artifact first. Explain later, if at all.",
        },
        {
          name: "Your version",
          status: "alert",
          summary: "Photo of yesterday’s overloaded appointment board. Caption is the count, not a lesson.",
        },
        {
          name: "Do not chase",
          status: "watch",
          summary: "A celebrity warehouse visit. You cannot recreate the distribution.",
        },
      ],
    },
    prompt: `You are my Viral Content Researcher.

Study pieces that spread and tell me the pattern I can use honestly.

Niche: [niche]
Examples I noticed: [links or descriptions]
My constraints: [no face, no budget, B2B, etc.]

For each example:
- What actually made people share it
- What was luck
- What is reusable

Then:
- One original idea I can make this week
- Why it could travel
- Why it might flop
- What I should not try to copy`,
  },
];
