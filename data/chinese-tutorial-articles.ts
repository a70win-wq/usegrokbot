import type { DiscoverStory } from "./discover";

type TutorialArticleInput = Pick<
  DiscoverStory,
  | "slug"
  | "title"
  | "localizedArticleTitles"
  | "authorName"
  | "handle"
  | "publishedAt"
  | "xPostUrl"
  | "articleUrl"
  | "category"
  | "outcomes"
  | "difficulty"
>;

function tutorialArticle(input: TutorialArticleInput): DiscoverStory {
  const articleUrl = input.articleUrl ?? input.xPostUrl;
  if (!articleUrl) {
    throw new Error(`Missing article URL for ${input.slug}`);
  }

  return {
    ...input,
    headline: input.title,
    body: `${input.title} ${articleUrl}`,
    whatTheyDid: "Published a step-by-step Chinese tutorial for using Grok Bot.",
    howItWorks: "Open the original X Article to follow the author's instructions.",
    whyUseful: "A Chinese-language guide with practical steps for people learning Grok Bot.",
    whyItMatters: "It adds a directly sourced Chinese tutorial to the article library.",
    whoShouldTry: ["Chinese-speaking Grok Bot users", "Beginners"],
    usefulFor: "Chinese-speaking Grok Bot users",
    apps: ["browser", "x"],
    schedule: "one-time",
    source: "community",
    sourceUrl: articleUrl,
    sourceLabel: `${input.authorName} on X`,
    format: "article",
    contentLanguage: "zh-Hans",
  };
}

/**
 * Chinese Grok Bot tutorials verified through Grok X Search on 2026-09-04.
 *
 * These records are intentionally article-only. They are merged into the
 * Articles surfaces without increasing the Discover catalogue inventory.
 */
export const chineseTutorialArticles: DiscoverStory[] = [
  tutorialArticle({
    slug: "zh-tutorial-jinchenma-from-beginner-to-advanced",
    title: "万字长文｜Grok Bot 从入门到精通",
    localizedArticleTitles: {
      en: "Grok Bot from beginner to advanced — a complete guide",
      "zh-Hant": "萬字長文｜Grok Bot 從入門到精通",
      "zh-Hans": "万字长文｜Grok Bot 从入门到精通",
      ja: "Grok Bot 入門から応用までの完全ガイド",
    },
    authorName: "金尘马",
    handle: "jinchenma_ai",
    publishedAt: "2026-09-02",
    xPostUrl: "https://x.com/jinchenma_ai/status/2094984812251746424",
    articleUrl: "https://x.com/i/article/2094984278723710976",
    category: "operations",
    outcomes: ["save-time", "automate-work"],
    difficulty: "medium",
  }),
  tutorialArticle({
    slug: "zh-tutorial-maiyang-beginner-to-advanced",
    title: "Grok Bot 门槛又又又降了！Grok Bot 到底可以做什么，从入门到进阶",
    localizedArticleTitles: {
      en: "What Grok Bot can help you do, from beginner to advanced",
      "zh-Hant": "Grok Bot 門檻又降低了！它能幫你做什麼：從入門到進階",
      "zh-Hans": "Grok Bot 门槛又降低了！它能帮你做什么：从入门到进阶",
      ja: "Grok Bot でできること：入門から応用まで",
    },
    authorName: "Mai Yang",
    handle: "MaiYangAI",
    publishedAt: "2026-08-21",
    xPostUrl: "https://x.com/MaiYangAI/status/2090919833366040919",
    articleUrl: "https://x.com/i/article/2090891274962497536",
    category: "operations",
    outcomes: ["save-time", "automate-work"],
    difficulty: "medium",
  }),
  tutorialArticle({
    slug: "zh-tutorial-xiaomo-zero-to-one",
    title: "Grok Bot 从 0 到 1｜用云电脑和插件，搭一个能干活的 X 助手",
    localizedArticleTitles: {
      en: "Grok Bot from 0 to 1: build an X assistant with a cloud computer and plugins",
      "zh-Hant": "Grok Bot 從 0 到 1：用雲端電腦與外掛建立 X 助手",
      "zh-Hans": "Grok Bot 从 0 到 1：用云电脑和插件建立 X 助手",
      ja: "Grok Bot 0から1：クラウドPCとプラグインで X アシスタントを作る",
    },
    authorName: "小墨同学",
    handle: "xiaomovps",
    publishedAt: "2026-09-01",
    xPostUrl: "https://x.com/xiaomovps/status/2094596141765857596",
    articleUrl: "https://x.com/i/article/2094456665219514368",
    category: "coding",
    outcomes: ["build-software", "automate-work"],
    difficulty: "medium",
  }),
  tutorialArticle({
    slug: "zh-tutorial-langeai-ssh-server",
    title: "用 SSH 连上 Grok Bot 服务器, 保姆级教程",
    localizedArticleTitles: {
      en: "Connect to a Grok Bot server with SSH: a step-by-step guide",
      "zh-Hant": "用 SSH 連接 Grok Bot 伺服器：完整入門教學",
      "zh-Hans": "用 SSH 连接 Grok Bot 服务器：完整入门教程",
      ja: "SSH で Grok Bot サーバーにつなぐ手順",
    },
    authorName: "蓝哥AI",
    handle: "0xlangeai",
    publishedAt: "2026-08-28",
    xPostUrl: "https://x.com/0xlangeai/status/2093192039051489662",
    articleUrl: "https://x.com/i/article/2093179299704733696",
    category: "coding",
    outcomes: ["build-software", "save-time"],
    difficulty: "medium",
  }),
  tutorialArticle({
    slug: "zh-tutorial-su-content-team-translation",
    title: "【全文中译】被马斯克转发过的「如何用 Grok bot Agent 搭建一只内容团队」",
    localizedArticleTitles: {
      en: "Full Chinese translation: build a content team with Grok Bot agents",
      "zh-Hant": "【全文中譯】用 Grok Bot Agent 組建內容團隊",
      "zh-Hans": "【全文中译】用 Grok Bot Agent 搭建内容团队",
      ja: "中国語全訳：Grok Bot Agent でコンテンツチームを作る",
    },
    authorName: "Su",
    handle: "Sukiea1008",
    publishedAt: "2026-09-02",
    xPostUrl: "https://x.com/Sukiea1008/status/2095130333536739825",
    articleUrl: "https://x.com/i/article/2095085611111813120",
    category: "content",
    outcomes: ["create-content", "automate-work"],
    difficulty: "medium",
  }),
  tutorialArticle({
    slug: "zh-tutorial-koda-why-learn-grok-bot",
    title: "为什么你一定要学 Grok Bot？",
    localizedArticleTitles: {
      en: "Why learn Grok Bot?",
      "zh-Hant": "為什麼你應該學習 Grok Bot？",
      "zh-Hans": "为什么你应该学习 Grok Bot？",
      ja: "なぜ Grok Bot を学ぶのか？",
    },
    authorName: "Koda",
    handle: "wadezone",
    publishedAt: "2026-09-02",
    xPostUrl: "https://x.com/wadezone/status/2095085633689804853",
    articleUrl: "https://x.com/i/article/2095079546806542336",
    category: "operations",
    outcomes: ["save-time", "automate-work"],
    difficulty: "easy",
  }),
  tutorialArticle({
    slug: "zh-tutorial-boyan-content-flow",
    title: "Grok bot 实测分享，工作流训练优化实录，如何打造云端小红书、公众号工作流？",
    localizedArticleTitles: {
      en: "Train and improve a Grok Bot content-creation flow",
      "zh-Hant": "Grok Bot 實測：訓練與優化小紅書、微信公眾號內容流程",
      "zh-Hans": "Grok Bot 实测：训练与优化小红书、微信公众号内容流程",
      ja: "Grok Bot のコンテンツ制作フローを育てて改善する",
    },
    authorName: "伯岩",
    handle: "yvchengshanren",
    publishedAt: "2026-08-28",
    xPostUrl: "https://x.com/yvchengshanren/status/2093266571582218333",
    articleUrl: "https://x.com/i/article/2093264021172760576",
    category: "content",
    outcomes: ["create-content", "automate-work"],
    difficulty: "medium",
  }),
  tutorialArticle({
    slug: "zh-tutorial-momo-complete-beginner-guide",
    title: "万字长文｜Grok Bot 保姆级教程，给 AI 一台电脑以后，它真的开始上班了",
    localizedArticleTitles: {
      en: "A complete beginner guide to Grok Bot",
      "zh-Hant": "萬字長文｜Grok Bot 入門教學：給 AI 一台電腦後，它可以開始執行任務",
      "zh-Hans": "万字长文｜Grok Bot 入门教程：给 AI 一台电脑后，它可以开始执行任务",
      ja: "初めての Grok Bot 完全ガイド",
    },
    authorName: "momoai沫沫🫧",
    handle: "momoai_daily",
    publishedAt: "2026-08-29",
    xPostUrl: "https://x.com/momoai_daily/status/2093638747430797784",
    articleUrl: "https://x.com/i/article/2093628575425732608",
    category: "operations",
    outcomes: ["save-time", "automate-work"],
    difficulty: "easy",
  }),
  tutorialArticle({
    slug: "zh-tutorial-lixinbao-beginner-guide",
    title: "别把它当聊天机器人：Grok Bot 小白入门",
    localizedArticleTitles: {
      en: "Do not treat it as a chatbot: a Grok Bot beginner guide",
      "zh-Hant": "不要把它當聊天機器人：Grok Bot 初學者入門",
      "zh-Hans": "不要把它当聊天机器人：Grok Bot 初学者入门",
      ja: "チャットボットではない：Grok Bot 初心者ガイド",
    },
    authorName: "李新寶",
    handle: "lixinbao_X",
    publishedAt: "2026-09-02",
    xPostUrl: "https://x.com/lixinbao_X/status/2095161320794726472",
    articleUrl: "https://x.com/i/article/2095156622771531777",
    category: "operations",
    outcomes: ["save-time", "automate-work"],
    difficulty: "easy",
  }),
  tutorialArticle({
    slug: "zh-tutorial-tony-25-concepts",
    title: "给新手看的 Grok Bot 25 个功能概念手册",
    localizedArticleTitles: {
      en: "A beginner handbook to 25 Grok Bot concepts",
      "zh-Hant": "給初學者的 Grok Bot 25 個功能概念手冊",
      "zh-Hans": "给初学者的 Grok Bot 25 个功能概念手册",
      ja: "初心者向け Grok Bot 25の基本概念",
    },
    authorName: "Tony出海",
    handle: "iamtonyzhu",
    publishedAt: "2026-09-02",
    xPostUrl: "https://x.com/iamtonyzhu/status/2095087061045051620",
    articleUrl: "https://x.com/i/article/2095065330834186240",
    category: "operations",
    outcomes: ["save-time", "automate-work"],
    difficulty: "easy",
  }),
  tutorialArticle({
    slug: "zh-tutorial-wanweilab-complete-start",
    title: "马斯克的 Grok Bot 怎么领？给小白的完整上手教程",
    localizedArticleTitles: {
      en: "How to get started with Grok Bot: a complete beginner guide",
      "zh-Hant": "如何取得 Grok Bot？給初學者的完整入門教學",
      "zh-Hans": "如何获取 Grok Bot？给初学者的完整入门教程",
      ja: "Grok Bot の始め方：初心者向け完全ガイド",
    },
    authorName: "万维Lab",
    handle: "allenwan911",
    publishedAt: "2026-08-15",
    xPostUrl: "https://x.com/allenwan911/status/2088576108673532408",
    articleUrl: "https://x.com/i/article/2088564434604359680",
    category: "operations",
    outcomes: ["save-time", "automate-work"],
    difficulty: "easy",
  }),
];

export const chineseTutorialArticleUrls = chineseTutorialArticles.map(
  (story) => story.articleUrl as string,
);
