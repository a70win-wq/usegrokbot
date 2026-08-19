import ingestedStories from "./discover/ingested.json";
import { appSearchText } from "./apps";
import type { AppSlug, Difficulty, Schedule } from "./types";
import { getUseCase } from "./use-cases";

export const discoverCategorySlugs = [
  "sales",
  "marketing",
  "research",
  "content",
  "coding",
  "operations",
  "personal",
] as const;

export type DiscoverCategorySlug = (typeof discoverCategorySlugs)[number];

export const outcomeSlugs = [
  "make-money",
  "grow-business",
  "save-time",
  "research",
  "create-content",
  "automate-work",
  "build-software",
] as const;

export type OutcomeSlug = (typeof outcomeSlugs)[number];

export type DiscoverSourceKind = "official" | "community";

export type DiscoverTab = "trending" | "latest" | "featured" | "official" | "tested" | "community";

export const discoverTabs: DiscoverTab[] = [
  "trending",
  "latest",
  "featured",
  "official",
  "tested",
  "community",
];

export function isDiscoverTab(value: string | undefined): value is DiscoverTab {
  return Boolean(value && (discoverTabs as string[]).includes(value));
}

export type DiscoverStory = {
  slug: string;
  title: string;
  headline: string;
  whatTheyDid: string;
  howItWorks: string;
  whyUseful: string;
  whyItMatters: string;
  whoShouldTry: string[];
  usefulFor: string;
  quote?: string;
  result?: string;
  output?: string;
  category: DiscoverCategorySlug;
  outcomes: OutcomeSlug[];
  apps: AppSlug[];
  difficulty: Difficulty;
  schedule: Schedule;
  source: DiscoverSourceKind;
  authorName: string;
  handle?: string;
  publishedAt: string;
  xPostUrl?: string;
  sourceUrl: string;
  sourceLabel: string;
  relatedUseCase?: string;
  trending?: boolean;
  featured?: boolean;
  tested?: boolean;
};

const XAI_INTRO = "https://x.ai/news/introducing-grok-bot";
const BOT_LAUNCH = "https://x.com/bot/status/2087224798078517251";
const ELON_INBOX = "https://x.com/elonmusk/status/2089950078429782061";
const NATE_HERK_HACKS = "https://x.com/nateherk/status/2089917020087210160";
const BLAKE_KING_BOTS = "https://x.com/BlakeKing777/status/2089881822884692399";
const RAHUL_COMPANY = "https://x.com/sairahul1/status/2089995692874068433";
const SCOTTY_CLOTHES = "https://x.com/ScottyBeamIO/status/2089747957545410816";
const PETER_YANG_FIVE = "https://x.com/petergyang/status/2089401696946634801";
const MILES_GUIDE = "https://x.com/milesdeutscher/status/2089800752156025272";
const BEN_LANG_TIPS = "https://x.com/benln/status/2089699901567340808";
const TESLACONOMICS_CEO = "https://x.com/Teslaconomics/status/2088355513482596607";
const ALEX_FINN_LOOPS = "https://x.com/AlexFinn/status/2089038594690408891";
const KUN_FIRSTMATE = "https://x.com/kunchenguid/status/2089792928092963234";
const DIGITAL_TRENDS =
  "https://www.digitaltrends.com/computing/grok-bot-wants-to-take-work-off-your-plate-not-just-answer-your-queries/";
const NATE = "https://natesnewsletter.substack.com/p/grok-bot-review";
const REMY = "https://aiwithremy.beehiiv.com/p/what-i-m-actually-using-grok-bot-for";
const JELLYPOD = "https://www.jellypod.com/workflows/how-to-use-grok-bot-for-marketing";
const AXEL =
  "https://www.linkedin.com/posts/axel-schapmann_how-to-use-grok-bot-for-reddit-marketing-activity-7494004829774688256-L40s";

const curatedStories: DiscoverStory[] = [
  {
    slug: "clear-email-elon",
    title: "Clear Your Email",
    headline: "Elon pointed Grok Bot at a 90,000-email inbox cleanup — today, on X",
    whatTheyDid:
      "On 19 Aug 2026 Elon quote-tweeted Mike P (@mikepat711): Grok Bot was walking two Gmail accounts — about 90,000 emails — and deleting junk Mike had never dared to touch. Elon’s line was the product tip: “Clear your email with @Grok @Bot.”",
    howItWorks:
      "This is not a launch demo. A real person handed Grok Bot two live inboxes and told it to purge. Elon amplified the job the same morning. We keep Elon’s permalink. We did not re-run the 90,000-email pass.",
    whyUseful:
      "Inbox cleanup is the Grok Bot job people actually understand. If you have been staring at a decade of Gmail, this is the public example getting attention today.",
    whyItMatters:
      "Hottest Grok Bot post on Elon’s timeline today — millions of views in a few hours. The work is Mike’s; the heat is Elon’s. Both stay attributed.",
    whoShouldTry: ["Anyone with a wrecked inbox", "Founders", "Operators"],
    usefulFor: "Anyone drowning in Gmail",
    quote: "Clear your email with @Grok @Bot",
    result: "90,000 emails · two Gmail accounts",
    category: "operations",
    outcomes: ["save-time", "automate-work"],
    apps: ["gmail"],
    difficulty: "easy",
    schedule: "one-time",
    source: "official",
    authorName: "Elon Musk",
    handle: "elonmusk",
    publishedAt: "2026-08-19",
    xPostUrl: ELON_INBOX,
    sourceUrl: ELON_INBOX,
    sourceLabel: "Elon Musk on X",
    relatedUseCase: "inbox-organizer",
    trending: true,
    featured: true,
  },
  {
    slug: "week-of-hacks-nate-herk",
    title: "A Week of Grok Bot Hacks",
    headline: "Nate Herk wrote nine Grok Bot hacks today — Elon asked “What’s ur @Bots?”",
    whatTheyDid:
      "Nate Herk published “A Week of Grok Bot Lessons in 10 Mins” on X: nine hacks for turning a default Bot into a team. Elon quote-tweeted it the same morning and asked people what Bots they run.",
    howItWorks:
      "His stack: a Grill Me skill that interviews you for context; Klaus as chief of staff so you talk to one Bot; specialists (Motion, Eyes, Miner, Coffee, Views); shared vs private memory; Composio for extra apps; ClickUp so work does not vanish in chat; teach-by-demo; routines; a signed-in browser profile. We summarize the public article — we did not re-run Klaus.",
    whyUseful:
      "This is the setup write-up people were bookmarking today. If you already created a Bot and it still feels like one more chat, start here.",
    whyItMatters:
      "Elon did not post a new workflow. He pointed at this one. The article is the job; Elon’s question is why it is on every timeline.",
    whoShouldTry: ["People who already have a Bot", "Operators building a small team", "Creators"],
    usefulFor: "Operators / Creators",
    quote: "What’s ur @Bots?",
    result: "9 hacks · one chief of staff",
    category: "operations",
    outcomes: ["automate-work", "save-time"],
    apps: ["browser", "gmail"],
    difficulty: "medium",
    schedule: "always-on",
    source: "community",
    authorName: "Nate Herk",
    handle: "nateherk",
    publishedAt: "2026-08-19",
    xPostUrl: NATE_HERK_HACKS,
    sourceUrl: NATE_HERK_HACKS,
    sourceLabel: "Nate Herk on X",
    relatedUseCase: "daily-work-brief",
    trending: true,
    featured: true,
  },
  {
    slug: "household-bots-blake-king",
    title: "First 48 Hours, No Code",
    headline: "Blake King tried Grok Bot with zero coding — Elon retweeted it today",
    whatTheyDid:
      "Blake accepted a public challenge, skipped OpenClaw, and in two nights: linked email, had a Bot build a 12-page household budget PowerPoint, stood up a team for his wife’s business, and started daily Tesla news recaps.",
    howItWorks:
      "He says the product walked him through setup. No code. Email first, then a budget deck, then a small team, then a morning recap. Elon retweeted the post on 19 Aug 2026. We did not re-run his Bots.",
    whyUseful:
      "Most launch posts assume you already think in agents. This one is a non-engineer showing the first jobs that actually shipped.",
    whyItMatters:
      "It sat on Elon’s timeline today next to the inbox purge and Nate’s hacks. That is the current conversation: people trying Grok Bot on real household and small-business work.",
    whoShouldTry: ["Non-engineers", "Households", "Small business owners"],
    usefulFor: "Beginners / Small business",
    quote:
      "I have zero coding experience. … I set up the bot, linked my email, had it build a full 12-page household budget PowerPoint",
    result: "12-page budget deck · 48 hours, no code",
    category: "personal",
    outcomes: ["save-time", "automate-work"],
    apps: ["gmail", "browser"],
    difficulty: "easy",
    schedule: "daily",
    source: "community",
    authorName: "Blake King",
    handle: "BlakeKing777",
    publishedAt: "2026-08-19",
    xPostUrl: BLAKE_KING_BOTS,
    sourceUrl: BLAKE_KING_BOTS,
    sourceLabel: "Blake King on X",
    relatedUseCase: "daily-ai-news-brief",
    trending: true,
  },
  {
    slug: "one-person-company-rahul",
    title: "One-Person Company",
    headline: "Rahul wrote how to run a one-person company on Grok Bot — leads through weekly reporting",
    whatTheyDid:
      "On 19 Aug 2026 Rahul (@sairahul1) published an X article: “How To Build a One-Person Company Using Grok Bot.” The open is the solo-founder load — find the leads, write the outreach, make the images, answer the replies, count the week — and a Bot system that takes those lanes.",
    howItWorks:
      "He walks setup, plugins, a charter per Bot, teach-a-task routines, and six starter roles (chief of staff, Scout, Quill, Forge, Guide, Ledger). We summarize the public article — we did not re-run his company stack. A nearby Elon permalink that was circulating for this story quoted a different Grok Bot post, so we keep Rahul’s original.",
    whyUseful:
      "This is the long-form “hire a Bot per job” write-up people were opening today. If you are the whole company, start here.",
    whyItMatters:
      "Hottest community Grok Bot guide on X today. It is a playbook, not a named customer screenshot. We keep Rahul’s permalink.",
    whoShouldTry: ["Solo founders", "Operators who are the whole company", "People already paying for Grok Bot"],
    usefulFor: "Solo founders / Operators",
    quote: "You find the leads. Write the outreach. Make the images. Answer the replies. Count the week.",
    result: "6 starter bots · one-person company",
    category: "sales",
    outcomes: ["make-money", "automate-work"],
    apps: ["browser", "gmail", "linkedin"],
    difficulty: "medium",
    schedule: "always-on",
    source: "community",
    authorName: "Rahul",
    handle: "sairahul1",
    publishedAt: "2026-08-19",
    xPostUrl: RAHUL_COMPANY,
    sourceUrl: RAHUL_COMPANY,
    sourceLabel: "Rahul on X",
    trending: true,
    featured: true,
  },
  {
    slug: "clothes-resale-scotty-beam",
    title: "Resale the Unworn Clothes",
    headline: "SCOTTY BEAM posted a Cursor teammate handing sister’s unworn clothes to Grok Bot",
    whatTheyDid:
      "On 18 Aug 2026 SCOTTY BEAM (@ScottyBeamIO) wrote that someone at Cursor gave Grok Bot a pile of clothes his sister never wore. Selling them meant photos, listings, descriptions, buyer replies, and price talk — so she kept putting it off. The Bot was handed the pile.",
    howItWorks:
      "Scotty says the Bot looked at the photos, identified the items, wrote listings, and started negotiating with buyers. He also pointed at his longer article comparing Grok Bot vs Hermes vs OpenClaw and automating X content. The clothes job is the Cursor person’s; the comparison article is Scotty’s. We did not re-run either.",
    whyUseful:
      "The clothes pile is the job people get: a chore you keep delaying, handed off as “sell these.”",
    whyItMatters:
      "It is a community amplification of someone else’s Bot, plus Scotty’s own write-up. Both stay attributed.",
    whoShouldTry: ["People sitting on a resale pile", "Solo operators", "Anyone delaying a messy listing job"],
    usefulFor: "Resale / Solo operators",
    quote: "You can just say: “Sell these”. And let it figure out the rest.",
    result: "Photos, listings, buyer replies, price talk",
    category: "sales",
    outcomes: ["make-money", "automate-work"],
    apps: ["browser"],
    difficulty: "medium",
    schedule: "one-time",
    source: "community",
    authorName: "SCOTTY BEAM",
    handle: "ScottyBeamIO",
    publishedAt: "2026-08-18",
    xPostUrl: SCOTTY_CLOTHES,
    sourceUrl: SCOTTY_CLOTHES,
    sourceLabel: "SCOTTY BEAM on X",
    trending: true,
  },
  {
    slug: "five-bots-peter-yang",
    title: "Five Practical Bots",
    headline: "Peter Yang published a tutorial for five Grok Bots — advisor, YouTube, X, inbox, trips",
    whatTheyDid:
      "On 17 Aug 2026 Peter Yang (@petergyang) posted a tutorial: five useful Bots — an advisor that creates and manages the others, a YouTube researcher for outlier videos, an X scout for viral and funny posts, a “digital Marie Kondo” for inbox and leftover subscriptions, and a travel concierge.",
    howItWorks:
      "He also tested a Gamer Bot on classic games and asked whether Grok Bot can replace ChatGPT as a daily driver. We summarize the public post — we did not re-run his five Bots.",
    whyUseful:
      "Five named jobs, not a generic “try agents” thread. If you want a first roster, copy the list.",
    whyItMatters:
      "This is the practical-setup tutorial people were bookmarking this week. Community write-up; we keep Peter’s permalink.",
    whoShouldTry: ["People setting up a first Bot team", "Creators", "Operators"],
    usefulFor: "Operators / Creators",
    quote: "Here's my new tutorial where I show you how to set up 5 useful bots",
    result: "5 Bots · advisor + specialists",
    category: "operations",
    outcomes: ["automate-work", "save-time"],
    apps: ["youtube", "x", "gmail", "browser"],
    difficulty: "medium",
    schedule: "always-on",
    source: "community",
    authorName: "Peter Yang",
    handle: "petergyang",
    publishedAt: "2026-08-17",
    xPostUrl: PETER_YANG_FIVE,
    sourceUrl: PETER_YANG_FIVE,
    sourceLabel: "Peter Yang on X",
    trending: true,
  },
  {
    slug: "ultimate-guide-miles-deutscher",
    title: "Grok Bot Ultimate Guide",
    headline: "Miles Deutscher published “Grok Bot: The Ultimate Guide” — setup, plugins, his five-agent desk",
    whatTheyDid:
      "On 18 Aug 2026 Miles Deutscher (@milesdeutscher) posted a long-form guide: what Grok Bot is, how to set it up, plugins, and the five Bots he actually runs — Alex on YouTube outliers, Sandra on listings, Jonathan on portfolio numbers, Lucy on Slack triage, Oscar as a generalist.",
    howItWorks:
      "He says he has been testing since launch. The article is the job — setup, use cases, plugins, and an honest price note. We did not re-run Alex or Sandra.",
    whyUseful:
      "If you want one public desk to copy — named Bots, prompts, and plugins — this is the long read.",
    whyItMatters:
      "This is the other long-form Grok Bot guide people were opening this week. Community; we keep Miles’s permalink.",
    whoShouldTry: ["People who already have a Bot", "Operators building a small team", "Creators"],
    usefulFor: "Operators / Creators",
    quote: "Grok Bot is the most powerful AI agent I've ever used.",
    result: "5 named Bots · setup + plugins",
    category: "operations",
    outcomes: ["automate-work", "save-time"],
    apps: ["browser", "youtube", "slack", "google-sheets"],
    difficulty: "medium",
    schedule: "always-on",
    source: "community",
    authorName: "Miles Deutscher",
    handle: "milesdeutscher",
    publishedAt: "2026-08-18",
    xPostUrl: MILES_GUIDE,
    sourceUrl: MILES_GUIDE,
    sourceLabel: "Miles Deutscher on X",
    trending: true,
  },
  {
    slug: "bot-team-tips-ben-lang",
    title: "Pro Tips From the @bot Team",
    headline: "Ben Lang collected Grok Bot pro tips the @bot team was sharing",
    whatTheyDid:
      "On 18 Aug 2026 Ben Lang (@benln) posted a list he collected from the @bot team: multiple accounts per plugin, one chief of staff plus specialists, pin your favorite agents, keep a Notion page of outstanding work, teach-a-task, and more.",
    howItWorks:
      "His bio says he is building SpaceXAI via the Cursor team. The post is still his personal account collecting team tips — not an @bot or @xai permalink — so we keep the community badge and his original post.",
    whyUseful:
      "Short, copyable setup habits. If your Bot still feels like one more chat, start with chief of staff plus a Notion “what’s left” page.",
    whyItMatters:
      "These are team tips relayed in public, not a UseGrokBot re-test. We did not mark it official or tested.",
    whoShouldTry: ["People who already have a Bot", "Operators building a small team"],
    usefulFor: "Operators",
    quote: "One Chief of Staff plus a few specialists beats one mega-chat",
    result: "12 tips · chief of staff + specialists",
    category: "operations",
    outcomes: ["automate-work", "save-time"],
    apps: ["notion", "gmail"],
    difficulty: "easy",
    schedule: "always-on",
    source: "community",
    authorName: "Ben Lang",
    handle: "benln",
    publishedAt: "2026-08-18",
    xPostUrl: BEN_LANG_TIPS,
    sourceUrl: BEN_LANG_TIPS,
    sourceLabel: "Ben Lang on X",
    relatedUseCase: "daily-work-brief",
  },
  {
    slug: "ceo-desk-teslaconomics",
    title: "Six Bots and a CEO",
    headline: "Teslaconomics runs six Grok Bots plus a master “CEO” that orchestrates them",
    whatTheyDid:
      "On 14 Aug 2026 Teslaconomics (@Teslaconomics) wrote that he already had six Grok Bots with one job each — reminders, images and video, valuing companies, analyzing videos, posts — then put a CEO Bot on top so he texts one inbox.",
    howItWorks:
      "Specialists first, then a chief-of-staff CEO that routes work and returns one package. He published the first message and three routines (morning, midday, evening). We did not re-run his desk.",
    whyUseful:
      "Without a CEO you are the middleman between group chats. This is the public copy-paste for making one Bot the inbox.",
    whyItMatters:
      "Named person, named roster, published prompt. Community — we did not re-test the CEO.",
    whoShouldTry: ["Anyone running more than one Bot", "Operators", "Creators"],
    usefulFor: "Operators / Creators",
    quote: "With a CEO you text one inbox like a person.",
    result: "6 specialists · one CEO Bot",
    category: "operations",
    outcomes: ["automate-work", "save-time"],
    apps: ["browser", "x"],
    difficulty: "medium",
    schedule: "always-on",
    source: "community",
    authorName: "Teslaconomics",
    handle: "Teslaconomics",
    publishedAt: "2026-08-14",
    xPostUrl: TESLACONOMICS_CEO,
    sourceUrl: TESLACONOMICS_CEO,
    sourceLabel: "Teslaconomics on X",
    relatedUseCase: "daily-work-brief",
  },
  {
    slug: "agent-loops-alex-finn",
    title: "Best-in-Class Loops",
    headline: "Alex Finn has one Grok Bot tell another to loop a task every five minutes",
    whatTheyDid:
      "On 16 Aug 2026 Alex Finn (@AlexFinn) wrote that Grok Bot is built for loops: the main agent instructs another to loop a task every five minutes and monitor it. He said an orchestrator watched an engineer Bot for 24 hours and reflected every 30 minutes on one way to improve.",
    howItWorks:
      "He contrasts this with a single Bot /loop watching itself. The extra Bot is a different context making the judgment. We summarize the public post — we did not re-run his 24-hour loop.",
    whyUseful:
      "If you want a job to keep going without you babysitting /loop, this is the two-Bot version.",
    whyItMatters:
      "Concrete loop recipe from someone running it in public. Community; we did not re-test the engineer loop.",
    whoShouldTry: ["Builders", "Engineers", "Researchers running long jobs"],
    usefulFor: "Builders / Engineering",
    quote:
      "All you do is tell your main agent to tell another agent to loop on a task every 5 minutes, and monitor it while it goes",
    result: "5-minute loop · orchestrator + specialist",
    category: "coding",
    outcomes: ["build-software", "automate-work"],
    apps: ["browser", "github"],
    difficulty: "advanced",
    schedule: "always-on",
    source: "community",
    authorName: "Alex Finn",
    handle: "AlexFinn",
    publishedAt: "2026-08-16",
    xPostUrl: ALEX_FINN_LOOPS,
    sourceUrl: ALEX_FINN_LOOPS,
    sourceLabel: "Alex Finn on X",
  },
  {
    slug: "firstmate-kun-chen",
    title: "Firstmate, One Inbox",
    headline: "Kun Chen published a copy-paste Firstmate prompt — the only Grok Bot you talk to",
    whatTheyDid:
      "On 18 Aug 2026 Kun Chen (@kunchenguid) posted a system prompt for a Firstmate Bot: create it, paste GROK_BOT.md from github.com/kunchenguid/firstmate into the description, and talk only to that Bot. It creates, delegates, and coordinates the others.",
    howItWorks:
      "He says Firstmate is a chief-of-staff pattern he already used in other harnesses, now a short Grok Bot description. We did not re-run Firstmate.",
    whyUseful:
      "If you do not want twelve chats, this is a public prompt for one Bot that hires and juggles the rest.",
    whyItMatters:
      "Named repo, named prompt, named person. Community — we did not re-test Firstmate.",
    whoShouldTry: ["People who already have a Bot", "Operators who want one inbox"],
    usefulFor: "Operators",
    quote: "the only agent you talk to. it creates, delegates, juggles, and continuously improves other bots for you",
    result: "One Firstmate · copy-paste prompt",
    category: "operations",
    outcomes: ["automate-work", "save-time"],
    apps: ["browser"],
    difficulty: "medium",
    schedule: "always-on",
    source: "community",
    authorName: "Kun Chen",
    handle: "kunchenguid",
    publishedAt: "2026-08-18",
    xPostUrl: KUN_FIRSTMATE,
    sourceUrl: KUN_FIRSTMATE,
    sourceLabel: "Kun Chen on X",
    relatedUseCase: "daily-work-brief",
  },
  {
    slug: "grok-bot-launch-bot",
    title: "Grok Bot Launch",
    headline: "@bot introduced Grok Bot as AI teammates with their own computer",
    whatTheyDid:
      "The official @bot account announced Grok Bot in early beta: each Bot gets its own computer, signs into the tools you already use, and comes back when something needs approval.",
    howItWorks:
      "This is the launch post, not one workflow. It is the public source later official jobs hang off — sales outbound, inbox, CRM, engineering — so we keep the original permalink and explain the claim in plain English.",
    whyUseful:
      "If you are new to Grok Bot, start here so you know what the product says it does before you copy a prompt.",
    whyItMatters:
      "Most Grok Bot write-ups still point back to this announcement. A short summary plus the original post is faster than scrolling a reply thread.",
    whoShouldTry: ["Anyone evaluating Grok Bot", "Founders deciding whether to subscribe"],
    usefulFor: "Anyone new to Grok Bot",
    quote: "Introducing Grok Bot, now in early beta. Bots are AI teammates…",
    output: "Early beta announcement",
    category: "operations",
    outcomes: ["automate-work"],
    apps: ["browser"],
    difficulty: "easy",
    schedule: "one-time",
    source: "official",
    authorName: "Grok Bot",
    handle: "bot",
    publishedAt: "2026-08-11",
    xPostUrl: BOT_LAUNCH,
    sourceUrl: BOT_LAUNCH,
    sourceLabel: "Official post on X",
    relatedUseCase: "lead-researcher",
  },
  {
    slug: "overnight-sales-xai",
    title: "Overnight Sales Outbound",
    headline: "xAI used Grok Bot to research accounts overnight and leave drafts to approve",
    whatTheyDid:
      "A sales outbound Bot researches accounts overnight, scores contacts with intent, drafts email and LinkedIn in each seller’s voice, and readies an inbox of personalized drafts to approve.",
    howItWorks:
      "The Bot works in the browser and the seller’s existing tools while people sleep. Morning review is a pile of drafts — not a chat summary you still have to turn into mail.",
    whyUseful:
      "Good for founders and SDRs who want pipeline work done before standup, without letting the Bot send mail unreviewed.",
    whyItMatters:
      "This is the flagship official example. It shows the product’s point: finished work lands in the real inbox.",
    whoShouldTry: ["SDRs", "Founders doing their own outbound", "Sales managers"],
    usefulFor: "Sales / Founders",
    quote:
      "researches accounts overnight, scores contacts with intent, drafts email and LinkedIn in each seller’s voice",
    result: "Overnight research · drafts ready to approve",
    category: "sales",
    outcomes: ["make-money", "grow-business"],
    apps: ["browser", "gmail", "linkedin"],
    difficulty: "medium",
    schedule: "daily",
    source: "official",
    authorName: "xAI",
    handle: "xai",
    publishedAt: "2026-08-11",
    sourceUrl: XAI_INTRO,
    sourceLabel: "xAI: Introducing Grok Bot",
    relatedUseCase: "lead-researcher",
    featured: true,
  },
  {
    slug: "crm-notes-xai",
    title: "CRM From Call Notes",
    headline: "xAI used a sales Bot to update the CRM from call transcripts",
    whatTheyDid:
      "Inside SpaceXAI, a sales Bot updates the CRM with call transcript notes and drafts follow-ups so the record lives in the tool a human would use.",
    howItWorks:
      "After a call, the Bot reads the transcript, writes the fields and next step, and puts them in the CRM. People still approve anything that changes a deal stage or a number.",
    whyUseful:
      "CRM rot is quiet and expensive. A Bot that files notes in the real system beats another summary sitting in chat.",
    whyItMatters:
      "xAI’s own pitch is that work is not done until it lands where a teammate would put it. This is that claim in sales ops.",
    whoShouldTry: ["Account executives", "Sales ops", "Founders who are the CRM"],
    usefulFor: "Sales ops / AEs",
    quote: "a sales Bot updating the CRM with call transcript notes and drafting follow-ups",
    output: "Structured CRM update",
    category: "sales",
    outcomes: ["grow-business", "automate-work"],
    apps: ["salesforce", "hubspot", "gmail"],
    difficulty: "medium",
    schedule: "always-on",
    source: "official",
    authorName: "xAI",
    handle: "xai",
    publishedAt: "2026-08-11",
    sourceUrl: XAI_INTRO,
    sourceLabel: "xAI: Introducing Grok Bot",
    relatedUseCase: "crm-updater",
    featured: true,
  },
  {
    slug: "inbox-organizer-xai",
    title: "Inbox Manager",
    headline: "xAI runs a specialist Bot just for inbox management",
    whatTheyDid:
      "Teams inside SpaceXAI stack Bots: a chief of staff on top, with a specialist lane for inbox management so one Bot is not doing every job.",
    howItWorks:
      "One Bot owns the inbox: triage, drafts, and nudges on threads you dropped. Another Bot can sit above it and only pull you in for judgment calls.",
    whyUseful:
      "Most people do not need a 12-Bot org chart. They need one Bot that makes Gmail smaller by morning.",
    whyItMatters:
      "The official model is a small team of Bots, not one mega-agent. Inbox is the lane almost everyone understands.",
    whoShouldTry: ["Founders", "Operators", "Anyone whose inbox is the job"],
    usefulFor: "Operators / Founders",
    quote: "A chief of staff sits on top, with a specialist for each lane: inbox management, expenses, recruiting…",
    output: "Triaged inbox",
    category: "operations",
    outcomes: ["save-time", "automate-work"],
    apps: ["gmail"],
    difficulty: "easy",
    schedule: "daily",
    source: "official",
    authorName: "xAI",
    handle: "xai",
    publishedAt: "2026-08-11",
    sourceUrl: XAI_INTRO,
    sourceLabel: "xAI: Introducing Grok Bot",
    relatedUseCase: "inbox-organizer",
  },
  {
    slug: "expense-manager-xai",
    title: "Expense Manager",
    headline: "xAI gives one Bot the expenses lane so receipts do not sit in Gmail",
    whatTheyDid:
      "Official examples include an expenses specialist, plus an ops Bot that processes invoices received in Gmail and files the work in the tools finance already uses.",
    howItWorks:
      "The Bot watches the inbox for receipts and invoices, extracts the facts, and updates a sheet or finance tool. You approve anything that looks like a payment.",
    whyUseful:
      "Receipts age badly. A daily pass beats a month-end hunt through Gmail search.",
    whyItMatters:
      "This is unglamorous official work — which is the point. Grok Bot is sold as a teammate for jobs nobody wants to redo.",
    whoShouldTry: ["Founders", "Office managers", "Small finance teams"],
    usefulFor: "Ops / Finance",
    quote: "an ops Bot seating new hires and processing invoices received in Gmail",
    output: "Receipts filed from Gmail",
    category: "operations",
    outcomes: ["save-time", "automate-work"],
    apps: ["gmail", "google-sheets"],
    difficulty: "easy",
    schedule: "daily",
    source: "official",
    authorName: "xAI",
    handle: "xai",
    publishedAt: "2026-08-11",
    sourceUrl: XAI_INTRO,
    sourceLabel: "xAI: Introducing Grok Bot",
    relatedUseCase: "expense-report-organizer",
  },
  {
    slug: "bug-reproduction-xai",
    title: "Bug Reproduction",
    headline: "xAI used an engineering Bot to reproduce a bug in the product UI and file the ticket",
    whatTheyDid:
      "An engineering Bot reproduces a bug in the product UI, files the ticket, and hands the fix off to a debugging Bot — so the report is not a vague Slack message.",
    howItWorks:
      "Someone describes the bug. The Bot opens the product, walks the steps, writes what it saw, and files the ticket in the tracker the team already uses.",
    whyUseful:
      "Good for small engineering teams who lose time re-finding bugs that a reporter already hit once.",
    whyItMatters:
      "Official engineering examples are scarce. This one is concrete: reproduce, file, hand off — not “write me some code.”",
    whoShouldTry: ["Engineers", "QA", "Founders who are also support"],
    usefulFor: "Engineering / QA",
    quote: "reproducing a bug in the product UI, filing the ticket, and handing the fix off to a debugging Bot",
    output: "Bug reproduced and ticketed",
    category: "coding",
    outcomes: ["build-software", "save-time"],
    apps: ["browser", "github"],
    difficulty: "medium",
    schedule: "always-on",
    source: "official",
    authorName: "xAI",
    handle: "xai",
    publishedAt: "2026-08-11",
    sourceUrl: XAI_INTRO,
    sourceLabel: "xAI: Introducing Grok Bot",
    relatedUseCase: "bug-reproduction-assistant",
  },
  {
    slug: "vendor-negotiation-xai",
    title: "Vendor Negotiation",
    headline: "xAI says people are already using Grok Bot to negotiate with vendors in their voice",
    whatTheyDid:
      "The Grok Bot team’s early examples, reported by Digital Trends, include negotiating directly with vendors using your own voice — the Bot drafts and works the thread, you still approve the deal.",
    howItWorks:
      "You show the Bot how you write and what you will pay. It works the vendor thread in your tools and stops before a commitment you have not seen.",
    whyUseful:
      "Useful when the negotiation is email-shaped and repetitive, and you want the tone to sound like you.",
    whyItMatters:
      "This is an official-team example, not a named customer case study. We keep it because the job is specific — and because money-moving mail should stay on a human last click.",
    whoShouldTry: ["Founders", "Ops leads", "Anyone who buys software or services"],
    usefulFor: "Founders / Ops",
    quote: "negotiate with vendors in their voice",
    output: "Vendor thread in your voice",
    category: "operations",
    outcomes: ["make-money", "save-time"],
    apps: ["gmail", "browser"],
    difficulty: "advanced",
    schedule: "one-time",
    source: "official",
    authorName: "xAI",
    handle: "xai",
    publishedAt: "2026-08-11",
    sourceUrl: DIGITAL_TRENDS,
    sourceLabel: "Digital Trends, quoting the Grok Bot team",
    relatedUseCase: "follow-up-email-writer",
  },
  {
    slug: "store-support-xai",
    title: "Store Support Queue",
    headline: "xAI says people use Grok Bot to manage support for an online store",
    whatTheyDid:
      "Early examples from the Grok Bot team include handling customer support for an online store — triage, drafts, and updates in the tools the shop already uses.",
    howItWorks:
      "The Bot reads new tickets or mail, groups them, and drafts replies. Publishing or refunds stay on you until you trust the lane.",
    whyUseful:
      "Good for small shops where support is the founder at midnight, not a 20-person desk.",
    whyItMatters:
      "Support is high volume and reversible if you keep the last click. That matches how xAI describes work Bots should take.",
    whoShouldTry: ["Shopify-style founders", "Support leads", "Solo operators"],
    usefulFor: "Support / Founders",
    quote: "manage support for their online store",
    output: "Support queue drafts",
    category: "operations",
    outcomes: ["save-time", "grow-business"],
    apps: ["gmail", "browser"],
    difficulty: "medium",
    schedule: "always-on",
    source: "official",
    authorName: "xAI",
    handle: "xai",
    publishedAt: "2026-08-11",
    sourceUrl: DIGITAL_TRENDS,
    sourceLabel: "Digital Trends, quoting the Grok Bot team",
    relatedUseCase: "support-email-assistant",
  },
  {
    slug: "reddit-thread-scout-axel",
    title: "Reddit Thread Scout",
    headline: "Axel Schapmann used Grok Bot for Reddit marketing — finding threads to join, not spam",
    whatTheyDid:
      "Axel wrote up using Grok Bot for Reddit marketing: hunt fresh threads you can actually help, plus older threads that still rank, then stop at a draft comment.",
    howItWorks:
      "Give the Bot your site, offer, and a few competitors. It searches Reddit and Google, scores fit versus spam risk, and leaves comments for you to post.",
    whyUseful:
      "Finding the thread is the slow part. Writing the comment is easy once you are in the right room.",
    whyItMatters:
      "This is a public community write-up, not an xAI screenshot. We turned the job into a card and a copyable workflow — we did not re-run his Bot here.",
    whoShouldTry: ["Founders", "Marketers", "Indie hackers"],
    usefulFor: "Marketing / Founders",
    output: "Thread list + draft comments",
    category: "marketing",
    outcomes: ["grow-business", "research"],
    apps: ["reddit", "browser"],
    difficulty: "medium",
    schedule: "daily",
    source: "community",
    authorName: "Axel Schapmann",
    publishedAt: "2026-08-19",
    sourceUrl: AXEL,
    sourceLabel: "Axel Schapmann on LinkedIn",
    relatedUseCase: "reddit-thread-scout",
  },
  {
    slug: "travel-concierge-nate",
    title: "Travel Concierge",
    headline: "Nate used Grok Bot for travel planning — one of twelve Bots he stood up in a day",
    whatTheyDid:
      "In a public review, Nate stood up a roster of Bots in about eight hours. Travel planning was one of the jobs, alongside exercise and contact research.",
    howItWorks:
      "You give dates, budget, and constraints. The Bot compares public options and builds a day-by-day plan. Booking stays on you.",
    whyUseful:
      "Trip research becomes 40 tabs. A Bot that returns a short brief is the version a non-technical person can actually use.",
    whyItMatters:
      "Nate’s point is “done,” not “told.” Travel is a clean personal example of that bar — and a reminder that Grok Bot is not only a sales tool.",
    whoShouldTry: ["Busy professionals", "Families", "Anyone who hates 40-tab research"],
    usefulFor: "Anyone planning a trip",
    quote: "Others took travel planning, exercise, and contact research.",
    output: "Day-by-day trip brief",
    category: "personal",
    outcomes: ["save-time", "research"],
    apps: ["browser", "google-calendar"],
    difficulty: "easy",
    schedule: "one-time",
    source: "community",
    authorName: "Nate",
    publishedAt: "2026-08-14",
    sourceUrl: NATE,
    sourceLabel: "Nate’s Newsletter: Grok Bot review",
    relatedUseCase: "travel-concierge",
  },
  {
    slug: "youtube-comments-remy",
    title: "YouTube Comment Desk",
    headline: "Remy had a content Bot start replying to YouTube comments",
    whatTheyDid:
      "Remy built a content Bot named Gordon. After a live test, Gordon started drafting replies to YouTube comments on a schedule — Remy still owns the last click.",
    howItWorks:
      "Point the Bot at a video or channel. It groups comments and writes short replies in your voice. You post the ones that sound like you.",
    whyUseful:
      "Useful questions disappear under emoji. A daily desk beats opening YouTube Studio when you remember.",
    whyItMatters:
      "This is a named person running a named Bot in public. We summarize the job; we do not claim we re-tested Gordon.",
    whoShouldTry: ["Creators", "Educators", "Product marketers"],
    usefulFor: "Creators / Content",
    quote: "I had Gordon … start replying to my YouTube comments.",
    output: "Draft YouTube replies",
    category: "content",
    outcomes: ["create-content", "save-time"],
    apps: ["youtube"],
    difficulty: "easy",
    schedule: "daily",
    source: "community",
    authorName: "Remy",
    publishedAt: "2026-08-15",
    sourceUrl: REMY,
    sourceLabel: "Remy: what I’m actually using Grok Bot for",
    relatedUseCase: "youtube-comment-desk",
  },
  {
    slug: "newsletter-to-social-remy",
    title: "Newsletter to Social",
    headline: "Remy used a content Bot to turn last week’s newsletter into X and LinkedIn posts",
    whatTheyDid:
      "The same content Bot, Gordon, repurposed last week’s newsletter across X and LinkedIn. Remy says it now runs automatically, with little extra training.",
    howItWorks:
      "The Bot reads the issue, writes platform-sized posts in your voice, and leaves drafts. You publish. Our matching workflow stops before posting.",
    whyUseful:
      "The issue already exists. The tax is reformatting it three times. That is a Bot job.",
    whyItMatters:
      "Community examples are more useful when they name the Bot and the output. This one does both.",
    whoShouldTry: ["Newsletter writers", "Founders who post", "Content leads"],
    usefulFor: "Content / Founders",
    quote: "I had Gordon repurpose last week’s newsletter across X and LinkedIn",
    output: "X and LinkedIn drafts",
    category: "content",
    outcomes: ["create-content", "grow-business"],
    apps: ["x", "linkedin"],
    difficulty: "easy",
    schedule: "weekly",
    source: "community",
    authorName: "Remy",
    publishedAt: "2026-08-15",
    sourceUrl: REMY,
    sourceLabel: "Remy: what I’m actually using Grok Bot for",
    relatedUseCase: "content-repurposing-bot",
  },
  {
    slug: "monday-marketing-report-jellypod",
    title: "Monday Marketing Report",
    headline: "Jellypod’s first Grok Bot marketing play is a Monday dashboard circuit",
    whatTheyDid:
      "Jellypod’s public guide starts with the reporting pass you already do: walk GA4, ads, rank tracker, and email, copy the numbers you named, and leave a one-page brief.",
    howItWorks:
      "Demonstrate the circuit once. Schedule it early Monday. The Bot only pings you when a metric crosses a line you set.",
    whyUseful:
      "Monday morning is six logins before you know if last week worked. A filled brief is better than another dashboard.",
    whyItMatters:
      "This is a practitioner guide, not a viral screenshot. We keep it because the job is boring, weekly, and easy to copy.",
    whoShouldTry: ["Marketing managers", "Founders", "Agency leads"],
    usefulFor: "Marketing / Founders",
    quote: "The output is a filled-in summary waiting when you open your laptop, not another dashboard to visit.",
    output: "One-page Monday brief",
    category: "marketing",
    outcomes: ["grow-business", "save-time"],
    apps: ["browser", "slack"],
    difficulty: "medium",
    schedule: "weekly",
    source: "community",
    authorName: "Jellypod",
    publishedAt: "2026-08-16",
    sourceUrl: JELLYPOD,
    sourceLabel: "Jellypod: How to use Grok Bot for marketing",
    relatedUseCase: "monday-marketing-report",
  },
  {
    slug: "competitor-monitor-jellypod",
    title: "Competitor Monitor",
    headline: "Jellypod documented a weekly Grok Bot sweep of competitor sites and ad libraries",
    whatTheyDid:
      "The same guide’s second play: teach a Bot to walk a fixed list of ad libraries, review sites, and competitor changelogs every week, and flag only what changed.",
    howItWorks:
      "You demonstrate the list once. The Bot records deltas — a new claim, a pricing change, a new objection in reviews — and leaves angles, not a 40-page dump.",
    whyUseful:
      "Good for founders and marketing teams who do not want to check competitors by hand every day.",
    whyItMatters:
      "Competitor watch is the example people ask for first. This version is sourced, reversible, and maps to a full UseGrokBot workflow.",
    whoShouldTry: ["Founders", "Marketing teams", "Product marketers"],
    usefulFor: "Marketing / Founders",
    quote: "Ad libraries, review sites, and competitor changelogs are exactly the shape Grok Bot is built for",
    output: "Weekly competitor deltas",
    category: "research",
    outcomes: ["research", "grow-business"],
    apps: ["browser"],
    difficulty: "easy",
    schedule: "weekly",
    source: "community",
    authorName: "Jellypod",
    publishedAt: "2026-08-16",
    sourceUrl: JELLYPOD,
    sourceLabel: "Jellypod: How to use Grok Bot for marketing",
    relatedUseCase: "competitor-monitor",
  },
];

export const discoverStories: DiscoverStory[] = [
  ...curatedStories,
  ...(ingestedStories as DiscoverStory[]),
];

const bySlug = new Map(discoverStories.map((story) => [story.slug, story]));

export function getDiscoverStory(slug: string) {
  return bySlug.get(slug);
}

export function getFeaturedDiscoverStories(limit = 4) {
  return discoverStories.filter((story) => story.featured).slice(0, limit);
}

export function getRelatedUseCase(story: DiscoverStory) {
  return story.relatedUseCase ? getUseCase(story.relatedUseCase) : undefined;
}

export function getRelatedDiscoverStories(story: DiscoverStory, limit = 3) {
  return discoverStories
    .filter((item) => item.slug !== story.slug)
    .filter((item) => item.category === story.category || item.source === story.source)
    .slice(0, limit);
}

export type DiscoverFilters = {
  query?: string;
  tab?: DiscoverTab;
  category?: DiscoverCategorySlug | "all";
  outcome?: OutcomeSlug | "all";
  app?: AppSlug | "all";
};

function haystack(story: DiscoverStory) {
  return [
    story.title,
    story.headline,
    story.whatTheyDid,
    story.whyUseful,
    story.usefulFor,
    story.authorName,
    story.handle ?? "",
    story.category,
    story.quote ?? "",
    story.result ?? "",
    story.output ?? "",
    ...story.apps,
    ...story.apps.map((app) => appSearchText(app)),
    ...story.outcomes,
    ...story.outcomes.map((item) => item.replace(/-/g, " ")),
    ...story.whoShouldTry,
  ]
    .join(" ")
    .toLowerCase();
}

export function filterDiscoverStories(filters: DiscoverFilters = {}) {
  const query = filters.query?.trim().toLowerCase() ?? "";
  const words = query.split(/\s+/).filter(Boolean);
  let next = discoverStories;

  if (filters.tab === "official") next = next.filter((item) => item.source === "official");
  if (filters.tab === "community") next = next.filter((item) => item.source === "community");
  if (filters.tab === "tested") next = next.filter((item) => item.tested);
  if (filters.tab === "featured") next = next.filter((item) => item.featured);

  const category = filters.category;
  const outcome = filters.outcome;
  const app = filters.app;
  if (category && category !== "all") {
    next = next.filter((item) => item.category === category);
  }
  if (outcome && outcome !== "all") {
    next = next.filter((item) => item.outcomes.includes(outcome));
  }
  if (app && app !== "all") {
    next = next.filter((item) => item.apps.includes(app));
  }
  if (words.length) {
    next = next.filter((item) => {
      const hay = haystack(item);
      return words.every((word) => hay.includes(word));
    });
  }

  const byDate = (a: DiscoverStory, b: DiscoverStory) => (a.publishedAt < b.publishedAt ? 1 : -1);
  if (filters.tab === "trending") {
    return [...next].sort((a, b) => Number(Boolean(b.trending)) - Number(Boolean(a.trending)) || byDate(a, b));
  }
  return [...next].sort(byDate);
}

export function searchDiscoverStories(query: string, limit = 5) {
  return filterDiscoverStories({ query, tab: "latest" }).slice(0, limit);
}

export function getDiscoverStoriesByApp(app: AppSlug) {
  return discoverStories.filter((item) => item.apps.includes(app));
}

export function getDiscoverStoryForUseCase(slug: string) {
  return discoverStories.find((item) => item.relatedUseCase === slug);
}

export function assertUniqueDiscoverSlugs() {
  if (bySlug.size !== discoverStories.length) {
    throw new Error("Duplicate discover slugs");
  }
}
