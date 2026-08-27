import generated from "@/data/discover/zh.json";
import type { DiscoverStory } from "@/data/discover";
import type { DiscoverStoryI18n } from "./discover";
import type { Locale } from "./types";

export type GeneratedStoryCopy = Partial<
  Pick<
    DiscoverStoryI18n,
    | "title"
    | "headline"
    | "body"
    | "whatTheyDid"
    | "howItWorks"
    | "whyUseful"
    | "whyItMatters"
    | "usefulFor"
    | "quote"
    | "result"
    | "output"
  >
> & {
  whoShouldTry?: string[];
};

type GeneratedFile = Record<string, { "zh-Hant"?: GeneratedStoryCopy; "zh-Hans"?: GeneratedStoryCopy }>;

const file = generated as GeneratedFile;

const howItWorks: Record<Exclude<Locale, "en">, Record<string, string>> = {
  "zh-Hant": {
    "UseGrokBot ingested this public X post. We keep the original permalink and did not re-run this Bot.":
      "UseGrokBot 收錄了這則公開 X 貼文。我們保留原帖連結，沒有在這裡重跑這個 Bot。",
    "This public X post is a first-person Grok Bot case. UseGrokBot keeps the original permalink and did not re-run this Bot.":
      "這則公開 X 貼文是第一身 Grok Bot 案例。UseGrokBot 保留原帖連結，沒有在這裡重跑這個 Bot。",
    "Elon Musk reposted or quoted this original Grok Bot post. UseGrokBot keeps the original X permalink and did not re-run this Bot.":
      "Elon Musk 轉發或引用過這則原始 Grok Bot 貼文。UseGrokBot 保留原帖連結，沒有在這裡重跑這個 Bot。",
    "This public X Article / long-form write-up is a Grok Bot case. UseGrokBot keeps the original permalink and did not re-run this Bot.":
      "這篇公開的 X 長文是 Grok Bot 案例。UseGrokBot 保留原帖連結，沒有在這裡重跑這個 Bot。",
    "This public case was surfaced through the awesome-grok-bot Field Cases index. UseGrokBot keeps the original X permalink and did not re-run this Bot.":
      "這個公開案例來自 awesome-grok-bot Field Cases 索引。UseGrokBot 保留原帖連結，沒有在這裡重跑這個 Bot。",
  },
  "zh-Hans": {
    "UseGrokBot ingested this public X post. We keep the original permalink and did not re-run this Bot.":
      "UseGrokBot 收录了这则公开 X 帖子。我们保留原帖链接，没有在这里重跑这个 Bot。",
    "This public X post is a first-person Grok Bot case. UseGrokBot keeps the original permalink and did not re-run this Bot.":
      "这则公开 X 帖子是第一人称 Grok Bot 案例。UseGrokBot 保留原帖链接，没有在这里重跑这个 Bot。",
    "Elon Musk reposted or quoted this original Grok Bot post. UseGrokBot keeps the original X permalink and did not re-run this Bot.":
      "Elon Musk 转发或引用过这则原始 Grok Bot 帖子。UseGrokBot 保留原帖链接，没有在这里重跑这个 Bot。",
    "This public X Article / long-form write-up is a Grok Bot case. UseGrokBot keeps the original permalink and did not re-run this Bot.":
      "这篇公开的 X 长文是 Grok Bot 案例。UseGrokBot 保留原帖链接，没有在这里重跑这个 Bot。",
    "This public case was surfaced through the awesome-grok-bot Field Cases index. UseGrokBot keeps the original X permalink and did not re-run this Bot.":
      "这个公开案例来自 awesome-grok-bot Field Cases 索引。UseGrokBot 保留原帖链接，没有在这里重跑这个 Bot。",
  },
};

const whyUseful: Record<Exclude<Locale, "en">, Record<string, string>> = {
  "zh-Hant": {
    "A public example of someone handing work to Grok Bot, kept here with attribution.":
      "有人把工作交給 Grok Bot 的公開例子，這裡保留出處。",
    "It is a concrete public example of work being handed to Grok Bot, with the original source kept for context.":
      "這是把工作交給 Grok Bot 的具體公開例子，原文連結留在頁上。",
    "It is a public Grok Bot post Elon Musk boosted. The card opens the original author, not Elon's repost.":
      "這是 Elon Musk 推過的公開 Grok Bot 貼文。卡片打開原作者，不是 Elon 的轉發。",
  },
  "zh-Hans": {
    "A public example of someone handing work to Grok Bot, kept here with attribution.":
      "有人把工作交给 Grok Bot 的公开例子，这里保留出处。",
    "It is a concrete public example of work being handed to Grok Bot, with the original source kept for context.":
      "这是把工作交给 Grok Bot 的具体公开例子，原文链接留在页上。",
    "It is a public Grok Bot post Elon Musk boosted. The card opens the original author, not Elon's repost.":
      "这是 Elon Musk 推过的公开 Grok Bot 帖子。卡片打开原作者，不是 Elon 的转发。",
  },
};

const whyItMatters: Record<Exclude<Locale, "en">, Record<string, string>> = {
  "zh-Hant": {
    "The original X post is the source. This card is a short curator summary, not a reprint of the thread.":
      "原始 X 貼文才是來源。這張卡是簡短整理，不是把整串貼文重印一次。",
    "The linked X post remains the original author's source. This card only restates what is already public and does not add claims we did not see.":
      "連結的 X 貼文仍是原作者來源。這張卡只重述已經公開的內容，不會加上我們沒看到的說法。",
    "The Elon liked filter only includes original posts from a Grok Bot search of Elon reposts and quotes. No authors, handles, or results were invented.":
      "「Elon 讚過」只收 Grok Bot 搜尋 Elon 轉發與引用時對到的原帖。沒有杜撰作者、帳號或結果。",
    "The source-index summary is CC0, while the linked X post remains the original author's source. This fallback deliberately avoids adding claims that are not supported by the source.":
      "索引摘要是 CC0；連結的 X 貼文仍是原作者來源。這份後備整理刻意不加來源沒有的說法。",
  },
  "zh-Hans": {
    "The original X post is the source. This card is a short curator summary, not a reprint of the thread.":
      "原始 X 帖子才是来源。这张卡是简短整理，不是把整串帖子重印一次。",
    "The linked X post remains the original author's source. This card only restates what is already public and does not add claims we did not see.":
      "链接的 X 帖子仍是原作者来源。这张卡只重述已经公开的内容，不会加上我们没看到的说法。",
    "The Elon liked filter only includes original posts from a Grok Bot search of Elon reposts and quotes. No authors, handles, or results were invented.":
      "「Elon 赞过」只收 Grok Bot 搜索 Elon 转发与引用时对到的原帖。没有杜撰作者、账号或结果。",
    "The source-index summary is CC0, while the linked X post remains the original author's source. This fallback deliberately avoids adding claims that are not supported by the source.":
      "索引摘要是 CC0；链接的 X 帖子仍是原作者来源。这份后备整理刻意不加来源没有的说法。",
  },
};

const usefulFor: Record<Exclude<Locale, "en">, Record<string, string>> = {
  "zh-Hant": {
    "Operators / Grok Bot users": "營運 / Grok Bot 使用者",
    "Developers / Engineering teams": "開發者 / 工程團隊",
    "People exploring personal automation / Grok Bot users": "個人自動化 / Grok Bot 使用者",
    "Researchers / Operators": "研究 / 營運",
    "Creators / Content teams": "創作者 / 內容團隊",
    "Marketers / Founders": "行銷 / 創辦人",
    "Sales teams / Founders": "銷售 / 創辦人",
  },
  "zh-Hans": {
    "Operators / Grok Bot users": "运营 / Grok Bot 用户",
    "Developers / Engineering teams": "开发者 / 工程团队",
    "People exploring personal automation / Grok Bot users": "个人自动化 / Grok Bot 用户",
    "Researchers / Operators": "研究 / 运营",
    "Creators / Content teams": "创作者 / 内容团队",
    "Marketers / Founders": "营销 / 创始人",
    "Sales teams / Founders": "销售 / 创始人",
  },
};

const who: Record<Exclude<Locale, "en">, Record<string, string>> = {
  "zh-Hant": {
    Operators: "營運人員",
    "Grok Bot users": "Grok Bot 使用者",
    Developers: "開發者",
    "Engineering teams": "工程團隊",
    "People exploring personal automation": "想做個人自動化的人",
    Researchers: "研究人員",
    Creators: "創作者",
    "Content teams": "內容團隊",
    Marketers: "行銷人員",
    Founders: "創辦人",
    "Sales teams": "銷售團隊",
  },
  "zh-Hans": {
    Operators: "运营人员",
    "Grok Bot users": "Grok Bot 用户",
    Developers: "开发者",
    "Engineering teams": "工程团队",
    "People exploring personal automation": "想做个人自动化的人",
    Researchers: "研究人员",
    Creators: "创作者",
    "Content teams": "内容团队",
    Marketers: "营销人员",
    Founders: "创始人",
    "Sales teams": "销售团队",
  },
};

export function generatedCopyFor(slug: string, locale: Exclude<Locale, "en">): GeneratedStoryCopy | undefined {
  return file[slug]?.[locale];
}

export function applyDiscoverTemplates(story: DiscoverStory, locale: Exclude<Locale, "en">): Partial<DiscoverStory> {
  const next: Partial<DiscoverStory> = {};
  const how = howItWorks[locale][story.howItWorks];
  if (how) next.howItWorks = how;
  const useful = whyUseful[locale][story.whyUseful];
  if (useful) next.whyUseful = useful;
  const matters = whyItMatters[locale][story.whyItMatters];
  if (matters) next.whyItMatters = matters;
  const forWhom = usefulFor[locale][story.usefulFor];
  if (forWhom) next.usefulFor = forWhom;
  const people = story.whoShouldTry.map((item) => who[locale][item] ?? item);
  if (people.some((item, index) => item !== story.whoShouldTry[index])) next.whoShouldTry = people;
  return next;
}
