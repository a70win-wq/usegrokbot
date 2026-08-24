import type { DiscoverStory } from "./discover";

export const topicSlugs = [
  "email",
  "calendar",
  "stock",
  "finance",
  "shopping",
  "travel",
  "sales",
  "marketing",
  "research",
  "content",
  "notes",
  "coding",
  "hardware",
  "games",
  "support",
  "operations",
  "personal",
] as const;

export type TopicSlug = (typeof topicSlugs)[number];

export type PostTopic = {
  slug: TopicSlug;
  name: string;
  shortName: string;
  description: string;
  icon: string;
};

export const topics: PostTopic[] = [
  {
    slug: "email",
    name: "Email",
    shortName: "Email",
    description: "Inbox, replies, unsubscribes, and mail people handed to a Bot.",
    icon: "Mail",
  },
  {
    slug: "calendar",
    name: "Calendar",
    shortName: "Calendar",
    description: "Meetings, schedules, and calendar management.",
    icon: "Calendar",
  },
  {
    slug: "stock",
    name: "Stock",
    shortName: "Stock",
    description: "Market briefings, brokers, and trading bots.",
    icon: "TrendingUp",
  },
  {
    slug: "finance",
    name: "Finance",
    shortName: "Finance",
    description: "Accounting, invoices, expenses, and money admin.",
    icon: "Wallet",
  },
  {
    slug: "shopping",
    name: "Shopping",
    shortName: "Shopping",
    description: "Deals, restocks, and buying things through a Bot.",
    icon: "ShoppingBag",
  },
  {
    slug: "travel",
    name: "Travel",
    shortName: "Travel",
    description: "Flights, hotels, and trip planning.",
    icon: "Plane",
  },
  {
    slug: "sales",
    name: "Sales",
    shortName: "Sales",
    description: "Leads, outreach, CRM notes, and one-person company selling.",
    icon: "Users",
  },
  {
    slug: "marketing",
    name: "Marketing",
    shortName: "Marketing",
    description: "Reddit threads, competitor watches, and weekly marketing reports.",
    icon: "Megaphone",
  },
  {
    slug: "research",
    name: "Research",
    shortName: "Research",
    description: "Podcasts, briefs, monitors, and other look-it-up jobs.",
    icon: "Search",
  },
  {
    slug: "content",
    name: "Content",
    shortName: "Content",
    description: "YouTube comments, newsletters, clips, and posts.",
    icon: "PenLine",
  },
  {
    slug: "notes",
    name: "Notes",
    shortName: "Notes",
    description: "Obsidian, Notion, wikis, and a second brain.",
    icon: "Notebook",
  },
  {
    slug: "coding",
    name: "Coding",
    shortName: "Coding",
    description: "Bugs, GitHub, WordPress, and builder loops.",
    icon: "Code",
  },
  {
    slug: "hardware",
    name: "Hardware",
    shortName: "Hardware",
    description: "Arduino, ESP32, and devices a Bot can talk to.",
    icon: "Cpu",
  },
  {
    slug: "games",
    name: "Games",
    shortName: "Games",
    description: "Roblox, Three.js, and other games people asked a Bot to build.",
    icon: "Gamepad2",
  },
  {
    slug: "support",
    name: "Support",
    shortName: "Support",
    description: "Helpdesks, refunds, Intercom, and customer replies.",
    icon: "LifeBuoy",
  },
  {
    slug: "operations",
    name: "Operations",
    shortName: "Ops",
    description: "Office work, walkthroughs, and running a desk.",
    icon: "Briefcase",
  },
  {
    slug: "personal",
    name: "Personal",
    shortName: "Personal",
    description: "Home, parents, and everyday life.",
    icon: "ListChecks",
  },
];

export const topicsBySlug = Object.fromEntries(topics.map((topic) => [topic.slug, topic])) as Record<
  TopicSlug,
  PostTopic
>;

export function isTopicSlug(value: string): value is TopicSlug {
  return topicSlugs.includes(value as TopicSlug);
}

export function topicMessageKey(slug: TopicSlug) {
  return `discover.cat${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
}

function storyText(story: DiscoverStory) {
  return [story.slug, story.title, story.headline, story.body, story.whatTheyDid].filter(Boolean).join("\n");
}

export function isEmailStory(story: DiscoverStory) {
  if (story.apps.includes("gmail")) return true;
  return /\b(email|gmail|inbox|outlook|unsubscribe)\b/i.test(storyText(story));
}

const topicMatchers: Partial<Record<TopicSlug, (story: DiscoverStory) => boolean>> = {
  email: isEmailStory,
  calendar: (story) =>
    story.apps.includes("google-calendar") ||
    /\b(calendar|calendly|cal\.com|日程|日曆|日历)\b/i.test(storyText(story)),
  stock: (story) =>
    /\b(stock trading|stock market|stock broker|trading bot|broker api|nasdaq|equities)\b/i.test(
      storyText(story),
    ),
  finance: (story) =>
    /\b(accounting|bookkeep|invoice|expense|payroll|tax return|stripe|mercury)\b/i.test(storyText(story)),
  shopping: (story) => /\b(amazon|shop for|shopping|grocery|buy deals)\b/i.test(storyText(story)),
  travel: (story) => /\b(flight|hotel|airbnb|itinerary|travel plan|book travel)\b/i.test(storyText(story)),
  notes: (story) =>
    story.apps.includes("notion") ||
    /\b(obsidian|notion|second brain|knowledge base)\b/i.test(storyText(story)),
  hardware: (story) => /\b(arduino|esp32|raspberry|iot|home assistant)\b/i.test(storyText(story)),
  games: (story) => /\b(roblox|unity|three\.js|video game|game jam|mini game)\b/i.test(storyText(story)),
  support: (story) =>
    /\b(customer support|helpdesk|zendesk|intercom|refund)\b/i.test(storyText(story)),
};

export function storyMatchesTopic(story: DiscoverStory, slug: TopicSlug) {
  const match = topicMatchers[slug];
  if (match) return match(story);
  return story.category === slug;
}

export function topicsForStory(story: DiscoverStory) {
  return topics.filter((topic) => storyMatchesTopic(story, topic.slug));
}

export const topicCopy: Record<"zh-Hant" | "zh-Hans", Record<TopicSlug, string>> = {
  "zh-Hant": {
    email: "收件箱、回覆、退訂、郵件工作。",
    calendar: "會議、行程、日曆。",
    stock: "行情簡報、券商、交易 Bot。",
    finance: "會計、發票、開支、管錢。",
    shopping: "優惠、補貨、代買。",
    travel: "機票、酒店、行程。",
    sales: "找客戶、外展、CRM、一人公司賣東西。",
    marketing: "Reddit、競品監控、每週市場報告。",
    research: "播客、簡報、監控和其他查資料工作。",
    content: "YouTube 評論、newsletter、短視頻和帖子。",
    notes: "Obsidian、Notion、wiki、第二大腦。",
    coding: "Bug、GitHub、WordPress、builder loops。",
    hardware: "Arduino、ESP32、同 Bot 對接的裝置。",
    games: "Roblox、Three.js、叫 Bot 做的遊戲。",
    support: "客服、退款、Intercom、helpdesk。",
    operations: "辦公室、設置教程、打理一張桌子。",
    personal: "家裡、父母、日常。",
  },
  "zh-Hans": {
    email: "收件箱、回复、退订、邮件工作。",
    calendar: "会议、行程、日历。",
    stock: "行情简报、券商、交易 Bot。",
    finance: "会计、发票、开支、管钱。",
    shopping: "优惠、补货、代买。",
    travel: "机票、酒店、行程。",
    sales: "找客户、外展、CRM、一人公司卖东西。",
    marketing: "Reddit、竞品监控、每周市场报告。",
    research: "播客、简报、监控和其他查资料工作。",
    content: "YouTube 评论、newsletter、短视频和帖子。",
    notes: "Obsidian、Notion、wiki、第二大脑。",
    coding: "Bug、GitHub、WordPress、builder loops。",
    hardware: "Arduino、ESP32、同 Bot 对接的装置。",
    games: "Roblox、Three.js、叫 Bot 做的游戏。",
    support: "客服、退款、Intercom、helpdesk。",
    operations: "办公室、设置教程、打理一张桌子。",
    personal: "家里、父母、日常。",
  },
};

export function topicDescription(topic: PostTopic, locale: string) {
  if (locale === "zh-Hant" || locale === "zh-Hans") return topicCopy[locale][topic.slug];
  return topic.description;
}
