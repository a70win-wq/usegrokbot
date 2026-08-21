import type { DiscoverStory } from "./discover";

export const topicSlugs = [
  "email",
  "sales",
  "marketing",
  "research",
  "content",
  "coding",
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
    description: "Inbox, Gmail, replies, refunds, and support mail people handed to a Bot.",
    icon: "Mail",
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
    slug: "coding",
    name: "Coding",
    shortName: "Coding",
    description: "Bugs, GitHub, WordPress, Arduino, and builder loops.",
    icon: "Code",
  },
  {
    slug: "operations",
    name: "Operations",
    shortName: "Ops",
    description: "Office work, expenses, walkthroughs, and running a desk.",
    icon: "Briefcase",
  },
  {
    slug: "personal",
    name: "Personal",
    shortName: "Personal",
    description: "Home, calendar, travel, parents, and everyday life.",
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

export function isEmailStory(story: DiscoverStory) {
  if (story.apps.includes("gmail")) return true;
  const hay = [story.slug, story.title, story.headline, story.relatedUseCase ?? ""].join(" ");
  return /email|gmail|refund/i.test(hay);
}

export function storyMatchesTopic(story: DiscoverStory, slug: TopicSlug) {
  if (slug === "email") return isEmailStory(story);
  return story.category === slug;
}

export function topicsForStory(story: DiscoverStory) {
  return topics.filter((topic) => storyMatchesTopic(story, topic.slug));
}

export const topicCopy: Record<"zh-Hant" | "zh-Hans", Record<TopicSlug, string>> = {
  "zh-Hant": {
    email: "收件箱、Gmail、回覆、退款、支持郵件。",
    sales: "找客戶、外展、CRM、一人公司賣東西。",
    marketing: "Reddit、競品監控、每週市場報告。",
    research: "播客、簡報、監控和其他查資料工作。",
    content: "YouTube 評論、newsletter、短視頻和帖子。",
    coding: "Bug、GitHub、WordPress、Arduino、builder loops。",
    operations: "辦公室、開支、設置教程、打理一張桌子。",
    personal: "家裡、日曆、旅行、父母、日常。",
  },
  "zh-Hans": {
    email: "收件箱、Gmail、回复、退款、支持邮件。",
    sales: "找客户、外展、CRM、一人公司卖东西。",
    marketing: "Reddit、竞品监控、每周市场报告。",
    research: "播客、简报、监控和其他查资料工作。",
    content: "YouTube 评论、newsletter、短视频和帖子。",
    coding: "Bug、GitHub、WordPress、Arduino、builder loops。",
    operations: "办公室、开支、设置教程、打理一张桌子。",
    personal: "家里、日历、旅行、父母、日常。",
  },
};

export function topicDescription(topic: PostTopic, locale: string) {
  if (locale === "zh-Hant" || locale === "zh-Hans") return topicCopy[locale][topic.slug];
  return topic.description;
}
