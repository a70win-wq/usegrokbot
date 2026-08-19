import type { UseCase } from "../types";

export const publicDemoUseCases: UseCase[] = [
  {
    slug: "reddit-thread-scout",
    title: "Reddit Thread Scout",
    shortDescription:
      "Find fresh Reddit threads to join, plus older threads that already rank on Google.",
    description:
      "Give Grok Bot your site and a few competitors. It hunts new conversations you can help, and older threads that still show up in search — then stops at a draft comment for you to post.",
    problem: "Writing the comment is easy. Finding the right thread takes the afternoon.",
    category: "marketing",
    tags: ["reddit", "marketing", "seo", "community"],
    apps: ["reddit", "browser"],
    difficulty: "medium",
    schedule: "daily",
    setupTime: "8 min",
    featured: true,
    popular: true,
    copies: 240,
    createdAt: "2026-08-19",
    icon: "MessagesSquare",
    steps: [
      "Reads your site, offer, and competitor names",
      "Searches Reddit for new threads where you can actually help",
      "Finds older threads that still rank in Google for your terms",
      "Scores each thread: fit, freshness, risk of sounding like spam",
      "Drafts one comment per keep. You post it.",
    ],
    targetUsers: ["founders", "marketers", "indie hackers"],
    related: ["reddit-researcher", "brand-mention-monitor", "seo-researcher"],
    exampleOutput: {
      title: "Reddit scout · warehouse software",
      items: [
        {
          name: "Join today",
          status: "alert",
          summary: "r/logistics · 4h · someone asked how docks stay on time when the TMS locks at 6pm.",
          action: "Answer with the workaround, not a pitch. Link only if they ask.",
        },
        {
          name: "Old thread, still ranks",
          status: "watch",
          summary: "2024 r/smallbusiness post about “yard vs dock software” is result #3 for the query.",
        },
        {
          name: "Skip",
          status: "ok",
          summary: "A hiring thread. Helpful people already answered. A product mention would look like ads.",
        },
      ],
    },
    prompt: `You are my Reddit Thread Scout.

Find threads I can help, not threads I can spam.

My site: [url]
What we do: [one sentence]
Competitors: [names]
Subreddits I already know: [list]
Topics I must not pitch in: [list]

Do two searches:
1. Fresh threads from the last 72 hours where someone has a real problem we understand.
2. Older threads that still appear in Google for my main terms.

For each keep:
- Subreddit and title
- Link
- Fresh / ranking
- Why I belong in the thread
- Spam risk: low / medium / high
- A comment draft in my voice. Help first. No “check out my startup” unless they asked for tools.

Return at most 8 keeps. If the well is dry, say so.

Never post. Never invent usernames or quotes.`,
  },
  {
    slug: "travel-concierge",
    title: "Travel Concierge",
    shortDescription:
      "Turn a trip idea into dates, options, and a day-by-day plan you still approve.",
    description:
      "Tell Grok Bot the city, dates, budget and constraints. It compares public flight and stay options, builds a walking-friendly itinerary, and stops before it books anything.",
    problem: "Trip research becomes 40 tabs and I still have not booked the hotel.",
    category: "productivity",
    tags: ["travel", "planning", "itinerary", "research"],
    apps: ["browser", "google-calendar"],
    difficulty: "easy",
    schedule: "one-time",
    setupTime: "10 min",
    featured: true,
    popular: true,
    copies: 180,
    createdAt: "2026-08-18",
    icon: "Calendar",
    steps: [
      "Reads your dates, budget, and hard constraints",
      "Checks public flight and stay options",
      "Builds a day-by-day plan that is walkable",
      "Flags visa, weather, or booking risks",
      "Hands you a short brief. You book.",
    ],
    targetUsers: ["busy professionals", "families", "founders"],
    related: ["meeting-prep-assistant", "personal-research-digest", "calendar-organizer"],
    exampleOutput: {
      title: "Kyoto · 3 nights · mid-range",
      items: [
        {
          name: "Stay",
          status: "alert",
          summary: "Two hotels near Gion under the budget. One has a cancellation window until Thursday.",
          action: "Book the cancellable one first.",
        },
        {
          name: "Days",
          status: "ok",
          summary: "Day 1 east, day 2 Fushimi + south, day 3 Arashiyama. No zigzag across the city.",
        },
        {
          name: "Watch",
          status: "watch",
          summary: "Saturday shrine crowds. Move Fushimi to Friday if the flight lands before 2pm.",
        },
      ],
    },
    prompt: `You are my Travel Concierge.

Research the trip. Do not book.

Destination: [city]
Dates: [dates]
People: [who]
Budget: [amount and currency]
Must do: [list]
Must avoid: [list]
Home airport: [code]

Return:
1. Two stay options with area, why, and cancellation
2. One flight shape (not a fake price if you cannot see a live fare)
3. A day-by-day plan that does not zigzag
4. Reservations I should make vs walk-up
5. Risks: weather, closures, visas, long transfers
6. A packing and money note in 5 lines

If a price or seat is stale, say “check live”. Never invent a confirmation number.`,
  },
  {
    slug: "youtube-comment-desk",
    title: "YouTube Comment Desk",
    shortDescription:
      "Sort new YouTube comments and draft replies in your voice. You hit post.",
    description:
      "Point Grok Bot at a video or channel. It groups comments into questions, praise, bugs and spam, then writes short replies you can paste — it does not publish them.",
    problem: "Comments pile up and the useful questions disappear under emoji.",
    category: "content",
    tags: ["youtube", "comments", "community", "support"],
    apps: ["youtube"],
    difficulty: "easy",
    schedule: "daily",
    setupTime: "6 min",
    featured: true,
    popular: false,
    copies: 150,
    createdAt: "2026-08-17",
    icon: "Play",
    steps: [
      "Opens the video or channel comments you name",
      "Groups them: question, praise, bug, spam",
      "Flags anything that needs a human today",
      "Drafts a short reply in your voice",
      "Stops. You post the ones that sound like you.",
    ],
    targetUsers: ["creators", "educators", "product marketers"],
    related: ["youtube-idea-researcher", "support-email-assistant", "inbox-organizer"],
    exampleOutput: {
      title: "Comments · dock planning video",
      items: [
        {
          name: "Reply today · 4",
          status: "alert",
          summary: "Three people asked how the board works after 6pm. One found a timestamp bug.",
        },
        {
          name: "Nice, no reply",
          status: "ok",
          summary: "Praise with no question. A heart is enough.",
        },
        {
          name: "Skip",
          status: "watch",
          summary: "Two crypto spam comments. Hide them. Do not argue.",
        },
      ],
    },
    prompt: `You are my YouTube Comment Desk.

Triage comments. Draft replies. Do not post.

Video or channel: [url]
My voice: [short, dry / warm / technical]
Things I will not argue about: [list]
Product facts I can state: [list]

Return:
1. Reply today — question or bug
2. Nice — no reply needed
3. Hide — spam or bait
4. For “reply today”, a 1–3 sentence draft
5. Any product clue I should keep

Never invent that I will build a feature. Never ask them to like and subscribe.`,
  },
  {
    slug: "x-viral-scout",
    title: "X Viral Scout",
    shortDescription:
      "Catch posts taking off in your niche before the quote-tweet pile arrives.",
    description:
      "Grok Bot watches X for posts that are accelerating — not just already famous — and tells you whether to quote, reply, or leave them alone.",
    problem: "I only see a post after everyone in my industry has already piled on.",
    category: "content",
    tags: ["x", "viral", "distribution", "monitoring"],
    apps: ["x", "browser"],
    difficulty: "medium",
    schedule: "daily",
    setupTime: "6 min",
    featured: true,
    popular: false,
    copies: 130,
    createdAt: "2026-08-16",
    icon: "Flame",
    steps: [
      "Scans your niche, accounts, and keywords",
      "Looks for posts whose replies and reposts are still climbing",
      "Explains why this one is moving",
      "Says quote, reply, or skip",
      "Drafts one line if you have a real point. You post.",
    ],
    targetUsers: ["founders", "creators", "marketers"],
    related: ["x-content-researcher", "viral-content-researcher", "trending-topic-finder"],
    exampleOutput: {
      title: "X scout · AI agents",
      items: [
        {
          name: "Quote",
          status: "alert",
          summary: "A practitioner said agents fail on login walls. Still climbing. You have a dock-ops story that fits.",
        },
        {
          name: "Skip",
          status: "ok",
          summary: "A big account dunking on pricing. The pile-on is the post. You add nothing.",
        },
        {
          name: "Watch",
          status: "watch",
          summary: "A demo video at 200 reposts. Wait 2 hours. If it is still moving, reply with one screenshot.",
        },
      ],
    },
    prompt: `You are my X Viral Scout.

Find posts that are taking off, not posts that already won.

Niche: [niche]
Accounts I care about: [list]
Keywords: [list]
My point of view: [one sentence]
I will not pile onto: [list]

For each keep (max 6):
- Link
- Why it is moving now
- Quote / reply / skip
- If quote or reply, one sentence I can actually stand behind
- Risk of looking late

Do not invent metrics. If you cannot see counts, say so.
Never post.`,
  },
  {
    slug: "monday-marketing-report",
    title: "Monday Marketing Report",
    shortDescription:
      "Walk the dashboards you already open on Monday and leave a one-page brief.",
    description:
      "Show Grok Bot the GA4, ads, and email tabs you click every week. It copies the numbers you named, writes a short brief, and only pings you when a metric crosses a line.",
    problem: "Monday morning is six logins before I know if last week worked.",
    category: "marketing",
    tags: ["reporting", "analytics", "ads", "weekly"],
    apps: ["browser", "slack"],
    difficulty: "medium",
    schedule: "weekly",
    setupTime: "10 min",
    featured: true,
    popular: true,
    copies: 210,
    createdAt: "2026-08-15",
    icon: "BarChart",
    steps: [
      "Opens the dashboards you already use",
      "Copies only the metrics you named",
      "Compares them to last week",
      "Writes a one-page brief",
      "Pings you only if a number crossed your line",
    ],
    targetUsers: ["marketing managers", "founders", "agency leads"],
    related: ["marketing-campaign-report", "ad-monitor", "weekly-report-generator"],
    exampleOutput: {
      title: "Week of 11 Aug",
      items: [
        {
          name: "Ping",
          status: "alert",
          summary: "Paid CPA 38% worse than last week. One campaign ate the budget after Thursday.",
          action: "Pause that campaign before the standup.",
        },
        {
          name: "Fine",
          status: "ok",
          summary: "Organic sessions flat. Newsletter click-through in the normal band.",
        },
        {
          name: "Watch",
          status: "watch",
          summary: "Brand search up, non-brand down. Could be a ranking wobble, not a content win.",
        },
      ],
    },
    prompt: `You are my Monday Marketing Report Bot.

Collect numbers. Do not publish. Do not change bids.

Dashboards I will show you (or URLs I can open):
[GA4 / ads / email / rank tracker]

Metrics to copy:
[list]

Ping me only if:
[thresholds]

Return a one-page brief:
1. What moved
2. What did not
3. One thing to do today
4. One thing that can wait
5. Anything you could not see because a login or a chart failed

If a number looks wrong, say “check live” instead of guessing.`,
  },
];
