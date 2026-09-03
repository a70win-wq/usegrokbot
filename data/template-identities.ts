import type { Locale } from "@/lib/i18n/types";
import assignmentsFile from "./template-identity-assignments.json";
import storyAssignmentsFile from "./template-identity-story-assignments.json";
import { templates, type BotTemplate } from "./templates";

export type LocalizedText = Record<Locale, string>;

function text(en: string, zhHant: string, zhHans: string): LocalizedText {
  return { en, "zh-Hant": zhHant, "zh-Hans": zhHans };
}

export function localizeText(value: LocalizedText, locale: Locale) {
  return value[locale];
}

export const primaryIdentitySlugs = [
  "engineer",
  "manager",
  "solo-founder",
  "x-creator",
  "video-creator",
  "sales",
  "marketer",
  "recruiter",
  "parent",
  "student",
  "job-seeker",
  "investor",
  "crypto-trader",
  "designer",
  "product-manager",
  "researcher",
  "finance",
  "freelancer",
  "shop-owner",
  "site-owner",
  "assistant",
] as const;

export const moreIdentitySlugs = [
  "renter",
  "traveler",
  "tesla-owner",
  "game-developer",
  "fitness",
  "surfer",
  "comics-reader",
  "fashion-shopper",
] as const;

export const templateIdentitySlugs = [...primaryIdentitySlugs, ...moreIdentitySlugs] as const;

export type PrimaryTemplateIdentitySlug = (typeof primaryIdentitySlugs)[number];
export type TemplateIdentitySlug = (typeof templateIdentitySlugs)[number];
export type IdentityClusterSlug = "creative" | "business" | "personal" | "more";

export type TemplateIdentity = {
  slug: TemplateIdentitySlug;
  cluster: IdentityClusterSlug;
  name: LocalizedText;
  description: LocalizedText;
  focus: readonly LocalizedText[];
  sparse?: boolean;
};

const identityDefinitions: readonly TemplateIdentity[] = [
  {
    slug: "engineer",
    cluster: "business",
    name: text("Engineer", "工程師", "工程师"),
    description: text(
      "Ships code, reviews PRs, and coordinates coding agents.",
      "寫程式、審查 PR，也調度 coding agents。",
      "写代码、审查 PR，也调度 coding agents。",
    ),
    focus: [
      text("Ship an app", "寫程式上線", "写代码上线"),
      text("Review PRs", "審查 PR", "审查 PR"),
      text("Coordinate coding agents", "調度 coding agents", "调度 coding agents"),
    ],
  },
  {
    slug: "manager",
    cluster: "business",
    name: text("Manager", "主管", "主管"),
    description: text(
      "Routes a roster of bots and handles decisions that need a person.",
      "調度一整組 bot，只處理需要由人決定的事情。",
      "调度一整组 bot，只处理需要由人决定的事情。",
    ),
    focus: [
      text("Route requests", "分派事情", "分派事情"),
      text("Follow progress", "查看進度", "查看进度"),
      text("Handle decisions", "處理決定", "处理决定"),
    ],
  },
  {
    slug: "solo-founder",
    cluster: "business",
    name: text("Independent founder", "獨立創業者", "独立创业者"),
    description: text(
      "One person holding the company, from product to fundraising.",
      "一個人撐著公司，產品和募資都要管理。",
      "一个人撑着公司，产品和融资都要管理。",
    ),
    focus: [
      text("Build the product", "建立產品", "建立产品"),
      text("Prepare a pitch", "準備募資簡報", "准备融资演示"),
      text("Run the company", "管理公司日常", "管理公司日常"),
    ],
  },
  {
    slug: "x-creator",
    cluster: "creative",
    name: text("X creator", "X 博主", "X 博主"),
    description: text(
      "Posts, follows a beat, and understands fans. Drafts only.",
      "發帖、追蹤關注題目、了解粉絲。只提供草稿，不代為發布。",
      "发帖、追踪关注题目、了解粉丝。只提供草稿，不代为发布。",
    ),
    focus: [
      text("Rewrite a draft", "改稿", "改稿"),
      text("Watch a beat", "追蹤關注題目", "追踪关注题目"),
      text("See who engaged", "看誰真正互動", "看谁真正互动"),
      text("Cut clips", "剪片", "剪片"),
    ],
  },
  {
    slug: "video-creator",
    cluster: "creative",
    name: text("Video creator", "影片創作者", "视频创作者"),
    description: text(
      "Makes podcasts, YouTube videos, and short clips.",
      "製作 podcast、YouTube 和短影片。",
      "制作 podcast、YouTube 和短视频。",
    ),
    focus: [
      text("Find an angle", "找題材", "找题材"),
      text("Cut short clips", "剪短片", "剪短片"),
      text("Review the final cut", "檢查成片", "检查成片"),
    ],
  },
  {
    slug: "sales",
    cluster: "business",
    name: text("Sales", "銷售", "销售"),
    description: text(
      "Accounts, call follow-up, and negotiation. Drafts only.",
      "管理客戶、會後跟進和談條件。只提供草稿。",
      "管理客户、会后跟进和谈条件。只提供草稿。",
    ),
    focus: [
      text("Research accounts", "研究客戶", "研究客户"),
      text("Follow up after calls", "會後跟進", "会后跟进"),
      text("Negotiate terms", "談條件", "谈条件"),
    ],
  },
  {
    slug: "marketer",
    cluster: "business",
    name: text("Marketer", "行銷人員", "营销人员"),
    description: text(
      "Site, competitors, SEO, AEO, and brand copy.",
      "管理網站、競爭者、SEO、AEO 和品牌文案。",
      "管理网站、竞争者、SEO、AEO 和品牌文案。",
    ),
    focus: [
      text("Watch competitors", "查看競爭者", "查看竞争者"),
      text("Improve brand copy", "改善品牌文案", "改善品牌文案"),
      text("Check search visibility", "檢查搜尋能見度", "检查搜索可见度"),
    ],
  },
  {
    slug: "recruiter",
    cluster: "business",
    name: text("Recruiter", "招聘人員", "招聘人员"),
    description: text(
      "Talent maps, invitation review, and roles hiding in the inbox.",
      "整理人才地圖、邀請，以及收件匣裡的職缺。",
      "整理人才地图、邀请，以及收件箱里的职位。",
    ),
    focus: [
      text("Map a company", "整理人才地圖", "整理人才地图"),
      text("Review invitations", "整理邀請", "整理邀请"),
      text("Match people to roles", "配對人才與職缺", "匹配人才与职位"),
    ],
  },
  {
    slug: "parent",
    cluster: "personal",
    name: text("Parent", "家長", "家长"),
    description: text(
      "School, family calendar, and plans involving the children.",
      "管理學校事項、家庭行事曆和孩子的行程。",
      "管理学校事项、家庭日历和孩子的行程。",
    ),
    focus: [
      text("School and calendar", "學校與行事曆", "学校与日历"),
      text("Homework and grades", "功課與成績", "功课与成绩"),
      text("Plan a family day", "安排家庭行程", "安排家庭行程"),
    ],
  },
  {
    slug: "student",
    cluster: "personal",
    name: text("Student", "學生", "学生"),
    description: text(
      "Keeps up with Canvas, learns difficult topics, and prepares for interviews.",
      "查看 Canvas、學懂困難內容，也準備面試。",
      "查看 Canvas、弄懂困难内容，也准备面试。",
    ),
    focus: [
      text("Track deadlines", "查看限期", "查看期限"),
      text("Understand a topic", "學懂課題", "弄懂课题"),
      text("Prepare for interviews", "準備面試", "准备面试"),
    ],
  },
  {
    slug: "job-seeker",
    cluster: "personal",
    name: text("Job seeker", "求職者", "求职者"),
    description: text(
      "Turns a resume into proof, watches freelance boards, and prepares for interviews.",
      "把履歷變成作品集、查看接案平台，也準備面試。",
      "把简历变成作品集、查看接案平台，也准备面试。",
    ),
    focus: [
      text("Build a portfolio", "建立作品集", "建立作品集"),
      text("Watch freelance boards", "查看接案平台", "查看接案平台"),
      text("Prepare for interviews", "準備面試", "准备面试"),
    ],
  },
  {
    slug: "investor",
    cluster: "personal",
    name: text("Investor", "投資者", "投资者"),
    description: text(
      "Paper trading, yield checks, and research before a decision.",
      "進行模擬交易、核對收益率，也在決定前研究。",
      "进行模拟交易、核对收益率，也在决定前研究。",
    ),
    focus: [
      text("Paper trade", "模擬交易", "模拟交易"),
      text("Check yield", "核對收益率", "核对收益率"),
      text("Research a position", "研究投資項目", "研究投资项目"),
    ],
  },
  {
    slug: "crypto-trader",
    cluster: "personal",
    name: text("Crypto trader", "加密貨幣交易者", "加密货币交易者"),
    description: text(
      "Wallets, x402, and on-chain activity.",
      "管理錢包、x402，以及鏈上活動。",
      "管理钱包、x402，以及链上活动。",
    ),
    focus: [
      text("Check a wallet", "查看錢包", "查看钱包"),
      text("Use x402", "使用 x402", "使用 x402"),
      text("Read on-chain activity", "查看鏈上活動", "查看链上活动"),
    ],
  },
  {
    slug: "designer",
    cluster: "creative",
    name: text("Designer", "設計師", "设计师"),
    description: text(
      "Visual systems, illustration, and game art.",
      "建立視覺系統、插畫和遊戲美術。",
      "建立视觉系统、插画和游戏美术。",
    ),
    focus: [
      text("Build a visual system", "建立視覺系統", "建立视觉系统"),
      text("Make an illustration", "製作插畫", "制作插画"),
      text("Create game art", "製作遊戲美術", "制作游戏美术"),
    ],
  },
  {
    slug: "product-manager",
    cluster: "business",
    name: text("Product manager", "產品經理", "产品经理"),
    description: text(
      "Metrics, decks, decisions, and 1:1 preparation.",
      "查看指標、製作簡報、記錄決定，也準備 1:1。",
      "查看指标、制作演示、记录决定，也准备 1:1。",
    ),
    focus: [
      text("Read metrics", "查看指標", "查看指标"),
      text("Build a deck", "製作簡報", "制作演示"),
      text("Prepare a 1:1", "準備 1:1", "准备 1:1"),
    ],
  },
  {
    slug: "researcher",
    cluster: "business",
    name: text("Researcher", "研究員", "研究员"),
    description: text(
      "Sourced briefs, archives, and lab watches.",
      "製作有出處的簡報、整理檔案，也追蹤實驗室消息。",
      "制作有出处的简报、整理档案，也跟踪实验室消息。",
    ),
    focus: [
      text("Write a sourced brief", "製作有出處的簡報", "制作有出处的简报"),
      text("Build an archive", "整理研究檔案", "整理研究档案"),
      text("Watch a field", "追蹤研究領域", "跟踪研究领域"),
    ],
  },
  {
    slug: "finance",
    cluster: "business",
    name: text("Finance", "財務人員", "财务人员"),
    description: text(
      "Invoices, refunds, cards, and subscriptions that should stop.",
      "處理發票、退款、信用卡，以及應停止的訂閱。",
      "处理发票、退款、信用卡，以及应停止的订阅。",
    ),
    focus: [
      text("Check invoices", "核對發票", "核对发票"),
      text("Find refunds", "找回退款", "找回退款"),
      text("Review cards and subscriptions", "檢查信用卡與訂閱", "检查信用卡与订阅"),
    ],
  },
  {
    slug: "freelancer",
    cluster: "business",
    name: text("Freelancer", "自由工作者", "自由职业者"),
    description: text(
      "Freelance boards, prospecting, and first-contact drafts.",
      "查看接案平台、尋找客戶，也準備首次聯絡草稿。",
      "查看接案平台、寻找客户，也准备首次联系草稿。",
    ),
    focus: [
      text("Watch freelance boards", "查看接案平台", "查看接案平台"),
      text("Find prospects", "尋找客戶", "寻找客户"),
      text("Draft first contact", "準備首次聯絡", "准备首次联系"),
    ],
  },
  {
    slug: "shop-owner",
    cluster: "business",
    name: text("Shop owner", "店主", "店主"),
    description: text(
      "Back office for a trade, construction, or laser shop.",
      "管理工程行、營造公司或雷射店的後台。",
      "管理工程店、建筑公司或激光店的后台。",
    ),
    focus: [
      text("Handle bookings", "處理預約", "处理预约"),
      text("Prepare estimates", "準備報價", "准备报价"),
      text("Keep the schedule moving", "管理日程", "管理日程"),
    ],
  },
  {
    slug: "site-owner",
    cluster: "creative",
    name: text("Site operator", "網站經營者", "网站经营者"),
    description: text(
      "Keeps a site, newsletter, and audit moving.",
      "管理網站、電子報，也定期檢查網站。",
      "管理网站、电子报，也定期检查网站。",
    ),
    focus: [
      text("Maintain the site", "維護網站", "维护网站"),
      text("Publish a newsletter", "製作電子報", "制作电子报"),
      text("Audit the site", "檢查網站", "检查网站"),
    ],
  },
  {
    slug: "assistant",
    cluster: "business",
    name: text("Executive assistant", "行政助理", "行政助理"),
    description: text(
      "Inbox, calendar, and triage. Never sends for you.",
      "整理收件匣、行事曆和分流。從不代為寄出。",
      "整理收件箱、日历和分流。从不代为发出。",
    ),
    focus: [
      text("Triage the inbox", "整理收件匣", "整理收件箱"),
      text("Protect the calendar", "管理行事曆", "管理日历"),
      text("Prepare follow-up", "準備跟進", "准备跟进"),
    ],
  },
  {
    slug: "renter",
    cluster: "more",
    name: text("Renter", "租屋者", "租房者"),
    description: text(
      "Looks for a rental that matches clear rules.",
      "按照清楚條件尋找租盤。",
      "按照清楚条件寻找租房。",
    ),
    focus: [text("Watch new listings", "查看新租盤", "查看新房源")],
    sparse: true,
  },
  {
    slug: "traveler",
    cluster: "more",
    name: text("Traveler", "旅行者", "旅行者"),
    description: text(
      "Compares flights, tickets, and a practical itinerary.",
      "比較機票、門票和實際行程。",
      "比较机票、门票和实际行程。",
    ),
    focus: [text("Compare a trip", "比較行程", "比较行程")],
    sparse: true,
  },
  {
    slug: "tesla-owner",
    cluster: "more",
    name: text("Tesla owner", "特斯拉車主", "特斯拉车主"),
    description: text(
      "Controls charging, climate, locks, and navigation.",
      "管理充電、空調、車鎖和導航。",
      "管理充电、空调、车锁和导航。",
    ),
    focus: [text("Control the car", "管理車輛", "管理车辆")],
    sparse: true,
  },
  {
    slug: "game-developer",
    cluster: "more",
    name: text("Game developer", "遊戲開發者", "游戏开发者"),
    description: text(
      "Creates game art and small playable scenes.",
      "製作遊戲美術和小型可玩場景。",
      "制作游戏美术和小型可玩场景。",
    ),
    focus: [text("Make game art", "製作遊戲美術", "制作游戏美术")],
    sparse: true,
  },
  {
    slug: "fitness",
    cluster: "more",
    name: text("Fitness", "健身者", "健身者"),
    description: text(
      "Plans training and food around personal constraints.",
      "按照個人身體條件安排訓練與飲食。",
      "按照个人身体条件安排训练与饮食。",
    ),
    focus: [text("Plan training", "安排訓練", "安排训练")],
    sparse: true,
  },
  {
    slug: "surfer",
    cluster: "more",
    name: text("Surfer", "衝浪者", "冲浪者"),
    description: text(
      "Reads surf reports and helps choose where to go.",
      "查看浪況，協助決定去哪裡。",
      "查看浪况，协助决定去哪里。",
    ),
    focus: [text("Check the surf", "查看浪況", "查看浪况")],
    sparse: true,
  },
  {
    slug: "comics-reader",
    cluster: "more",
    name: text("Comics reader", "漫畫讀者", "漫画读者"),
    description: text(
      "Builds a weekly reading list and summary.",
      "整理每週書單和漫畫摘要。",
      "整理每周书单和漫画摘要。",
    ),
    focus: [text("Plan this week's reading", "整理本週書單", "整理本周书单")],
    sparse: true,
  },
  {
    slug: "fashion-shopper",
    cluster: "more",
    name: text("Fashion shopper", "時尚消費者", "时尚消费者"),
    description: text(
      "Finds secondhand pieces and plans daily outfits.",
      "尋找二手精品，也安排每日穿搭。",
      "寻找二手精品，也安排每日穿搭。",
    ),
    focus: [text("Find an outfit", "尋找穿搭", "寻找穿搭")],
    sparse: true,
  },
];

export const identityClusters = [
  {
    slug: "creative" as const,
    name: text("Create and media", "創作與媒體", "创作与媒体"),
    description: text(
      "For publishing, visual work, video, and the sites around it.",
      "適合內容、視覺、影片，以及管理網站的人。",
      "适合内容、视觉、视频，以及管理网站的人。",
    ),
  },
  {
    slug: "business" as const,
    name: text("Company and business", "公司與生意", "公司与生意"),
    description: text(
      "For building, selling, researching, coordinating, and keeping a business moving.",
      "適合建立產品、銷售、研究、協調，以及管理生意的人。",
      "适合建立产品、销售、研究、协调，以及管理生意的人。",
    ),
  },
  {
    slug: "personal" as const,
    name: text("Personal and family", "個人與家庭", "个人与家庭"),
    description: text(
      "For learning, family planning, job search, and personal investing.",
      "適合學習、家庭安排、求職和個人投資。",
      "适合学习、家庭安排、求职和个人投资。",
    ),
  },
] as const;

export const templateIdentityUiCopy = {
  en: {
    title: "Who are you?",
    intro: "Choose an identity first, then see what these bots can help you do.",
    allTemplates: "Browse all {n} templates",
    templateCount: "{n} templates",
    openIdentity: "See templates",
    moreTitle: "More specific identities",
    moreBody:
      "These narrower identities have only a few public templates, so they live here instead of pretending every category is equally full.",
    whyTitle: "Why start with identity?",
    whyBody:
      "You already know who you are. Pick that first, then choose what you need help with. Home and life are situations, not identities, so they are not first-level categories.",
    back: "All identities",
    question: "What do you want a bot to help with right now?",
    found: "{n} public templates for {name}",
    tryFirst: "Templates for this identity",
    tryFirstBody: "Open only the template you want.",
    more: "More for this identity",
    sparse:
      "Only {n} public template is available here right now. We will not fill the page with unrelated results.",
    sparsePlural:
      "Only {n} public templates are available here right now. We will not fill the page with unrelated results.",
    empty: "No public template fits this identity yet.",
    emptyBody: "The identity stays visible, but we will not invent results or borrow unrelated templates.",
    seeAll: "See the complete catalog",
    catalogTitle: "All templates",
  },
  "zh-Hant": {
    title: "你是誰？",
    intro: "先選身分，再看這些 bot 能幫你做什麼。",
    allTemplates: "查看全部 {n} 個模板",
    templateCount: "{n} 個模板",
    openIdentity: "查看模板",
    moreTitle: "更多特定身分",
    moreBody: "以下身分的範圍較窄，目前公開模板不多，因此集中放在這裡。",
    whyTitle: "為什麼先選身分？",
    whyBody:
      "你已經知道自己是誰。先選身分，再選現在需要哪一種協助。「家庭／生活」是場境，不是身分，所以不會成為第一層分類。",
    back: "全部身分",
    question: "現在想先讓 bot 幫你做什麼？",
    found: "找到適合「{name}」的 {n} 個公開模板",
    tryFirst: "適合這個身分的模板",
    tryFirstBody: "只打開你需要的模板。",
    more: "更多適合這個身分的模板",
    sparse: "目前只有 {n} 個公開模板。我們不會用不相關內容填滿這一頁。",
    sparsePlural: "目前只有 {n} 個公開模板。我們不會用不相關內容填滿這一頁。",
    empty: "目前還沒有適合這個身分的公開模板。",
    emptyBody: "身分會保留，但我們不會假造結果，也不會借用不相關模板。",
    seeAll: "查看完整目錄",
    catalogTitle: "全部模板",
  },
  "zh-Hans": {
    title: "你是谁？",
    intro: "先选身份，再看这些 bot 能帮你做什么。",
    allTemplates: "查看全部 {n} 个模板",
    templateCount: "{n} 个模板",
    openIdentity: "查看模板",
    moreTitle: "更多特定身份",
    moreBody: "以下身份的范围较窄，目前公开模板不多，因此集中放在这里。",
    whyTitle: "为什么先选身份？",
    whyBody:
      "你已经知道自己是谁。先选身份，再选现在需要哪一种帮助。“家庭／生活”是场景，不是身份，所以不会成为第一层分类。",
    back: "全部身份",
    question: "现在想先让 bot 帮你做什么？",
    found: "找到适合“{name}”的 {n} 个公开模板",
    tryFirst: "适合这个身份的模板",
    tryFirstBody: "只打开你需要的模板。",
    more: "更多适合这个身份的模板",
    sparse: "目前只有 {n} 个公开模板。我们不会用不相关内容填满这一页。",
    sparsePlural: "目前只有 {n} 个公开模板。我们不会用不相关内容填满这一页。",
    empty: "目前还没有适合这个身份的公开模板。",
    emptyBody: "身份会保留，但我们不会假造结果，也不会借用不相关模板。",
    seeAll: "查看完整目录",
    catalogTitle: "全部模板",
  },
} as const;

type TemplateScenarioDefinition = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  templateIds: readonly string[];
};

const scenarioDefinitions: Partial<
  Record<TemplateIdentitySlug, readonly TemplateScenarioDefinition[]>
> = {
  "x-creator": [
    {
      slug: "start",
      title: text("Start with your own X", "先從自己的 X 開始", "先从自己的 X 开始"),
      description: text(
        "Understand your beat, rewrite a draft, and see who really engaged. Nothing publishes for you.",
        "了解你關注的題目、改好草稿，也看誰真正互動。所有內容都不會代你發布。",
        "了解你关注的题目、改好草稿，也看谁真正互动。所有内容都不会代你发布。",
      ),
      templateIds: [
        "GkX6X536UK2MlbkfGLQnb",
        "JZAccYtlRFvDSU2CnMnkZ",
        "HU7XArfGhUgLnzVcr7neB",
      ],
    },
    {
      slug: "video",
      title: text("Then add video", "然後處理影片", "然后处理视频"),
      description: text(
        "Find a filmable angle, cut clips, and prepare supporting visuals.",
        "找可拍的題材、剪出短片，也準備配圖。",
        "找可拍的题材、剪出短片，也准备配图。",
      ),
      templateIds: [
        "ozEfaAFJMDGoB-ysym8_V",
        "Vk0cnF2c364QxNv-Xip1M",
        "bjsbaj_a2ds2pQY1YiXqE",
        "y3uTGY5hkl6iTmE-ZAX02",
        "9y2GcFkKMAUhYlMxRUS0X",
      ],
    },
    {
      slug: "research",
      title: text("Then listen wider", "然後查看更多討論", "然后查看更多讨论"),
      description: text(
        "See what people have said recently and how your audience changed.",
        "查看大家最近談了什麼，以及你的讀者有什麼變化。",
        "查看大家最近谈了什么，以及你的读者有什么变化。",
      ),
      templateIds: [
        "ANv3NrqPfRcS9PdXku7h8",
        "12Gbp1lPVsfTVAHPXKd3B",
        "XzEATGwJNRvgsCLlcD9ox",
      ],
    },
  ],
  parent: [
    {
      slug: "school",
      title: text("School and calendar", "學校與行事曆", "学校与日历"),
      description: text(
        "Keep family plans, school items, homework, and grades from slipping through.",
        "整理家庭行程、學校事項、功課和成績，減少遺漏。",
        "整理家庭行程、学校事项、功课和成绩，减少遗漏。",
      ),
      templateIds: ["uY_7s1TZILVzUeJ9lLOx9", "Mm_WhYXIjZ3xDNf3s3p91"],
    },
    {
      slug: "family-day",
      title: text("Family days and memories", "家庭行程與回憶", "家庭行程与回忆"),
      description: text(
        "Plan a day around what the children want and gather the photos afterwards.",
        "安排孩子想玩的行程，也把家庭或活動照片整理好。",
        "安排孩子想玩的行程，也把家庭或活动照片整理好。",
      ),
      templateIds: ["izE8-5f78ykATd43I5ROC", "qL6Dww98g_OGhwqDmgvJK"],
    },
  ],
  engineer: [
    {
      slug: "ship",
      title: text("Build and ship", "建立並交付程式", "建立并交付程序"),
      description: text(
        "Take an app from a clear specification to something a person can review.",
        "按照清楚規格建立應用，再交給人檢查。",
        "按照清楚规格建立应用，再交给人检查。",
      ),
      templateIds: ["sQDD87Gp6VLT0m99tFpzu", "8dB3XPIA8XIopvQUIC73P", "e16tva1g3ZyYI1MgN-DDS"],
    },
    {
      slug: "review",
      title: text("Review and diagnose", "審查與找出問題", "审查与找出问题"),
      description: text(
        "Review risk first, remove proven dead code, and see what changed before a failure.",
        "先看風險、清除已證實沒有用途的程式，也找出故障前的變化。",
        "先看风险、清除已证实没有用途的代码，也找出故障前的变化。",
      ),
      templateIds: ["rt629UEZFtE4Wz0A_0c37", "oH3eR4YWtsljcz0W4HUBp", "rBnJhXhks-_7n1zhZCN3E"],
    },
    {
      slug: "agents",
      title: text("Coordinate coding agents", "調度 coding agents", "调度 coding agents"),
      description: text(
        "Keep coding agents aimed at a checkable goal and keep their tools current.",
        "讓 coding agents 對準可以檢查的目標，也保持本機工具更新。",
        "让 coding agents 对准可以检查的目标，也保持本机工具更新。",
      ),
      templateIds: ["Ub3T7usX-c6yRQibQq83P", "oq-mYZXM23ShlY7UbJWeB", "z4r7D8iILsTQDf7r7DwKR"],
    },
  ],
};

const validIdentitySlugs = new Set<string>(templateIdentitySlugs);
const rawAssignments = assignmentsFile as Record<string, readonly string[]>;
const rawStoryAssignments = storyAssignmentsFile as Record<string, readonly string[]>;

for (const [id, slugs] of Object.entries({ ...rawAssignments, ...rawStoryAssignments })) {
  if (slugs.length > 2) throw new Error("Template " + id + " has more than two identities.");
  for (const slug of slugs) {
    if (!validIdentitySlugs.has(slug)) {
      throw new Error("Template " + id + " has an unknown identity: " + slug);
    }
  }
}

const identityBySlug = new Map(identityDefinitions.map((identity) => [identity.slug, identity]));

if (identityBySlug.size !== templateIdentitySlugs.length) {
  throw new Error("Template identity definitions must have unique slugs.");
}

for (const slug of templateIdentitySlugs) {
  if (!identityBySlug.has(slug)) throw new Error("Missing template identity: " + slug);
}

export function isTemplateIdentitySlug(value: string): value is TemplateIdentitySlug {
  return validIdentitySlugs.has(value);
}

export function getTemplateIdentity(slug: string) {
  return isTemplateIdentitySlug(slug) ? identityBySlug.get(slug) : undefined;
}

export function templateIdentitiesForCluster(cluster: Exclude<IdentityClusterSlug, "more">) {
  return identityDefinitions.filter((identity) => identity.cluster === cluster);
}

export function moreTemplateIdentities() {
  return identityDefinitions.filter((identity) => identity.cluster === "more");
}

export function identitySlugsForTemplate(template: BotTemplate): readonly TemplateIdentitySlug[] {
  const explicit = rawAssignments[template.id] ?? rawStoryAssignments[template.id];
  return (explicit ?? []) as readonly TemplateIdentitySlug[];
}

export function templatesForIdentity(slug: TemplateIdentitySlug) {
  return templates.filter((template) => identitySlugsForTemplate(template).includes(slug));
}

export function templateCountForIdentity(slug: TemplateIdentitySlug) {
  return templatesForIdentity(slug).length;
}

export type LocalizedTemplateGroup = {
  slug: string;
  title: string;
  description: string;
  items: readonly BotTemplate[];
};

export function templateGroupsForIdentity(
  slug: TemplateIdentitySlug,
  locale: Locale,
): readonly LocalizedTemplateGroup[] {
  const identityTemplates = templatesForIdentity(slug);
  const definitions = scenarioDefinitions[slug];
  const ui = templateIdentityUiCopy[locale];

  if (!definitions?.length) {
    return identityTemplates.length
      ? [
          {
            slug: "recommended",
            title: ui.tryFirst,
            description: ui.tryFirstBody,
            items: identityTemplates,
          },
        ]
      : [];
  }

  const byId = new Map(identityTemplates.map((item) => [item.id, item]));
  const used = new Set<string>();
  const groups = definitions
    .map((definition) => {
      const items = definition.templateIds
        .map((id) => byId.get(id))
        .filter((item): item is BotTemplate => Boolean(item));
      items.forEach((item) => used.add(item.id));
      return {
        slug: definition.slug,
        title: localizeText(definition.title, locale),
        description: localizeText(definition.description, locale),
        items,
      };
    })
    .filter((group) => group.items.length > 0);

  const remaining = identityTemplates.filter((item) => !used.has(item.id));
  if (remaining.length) {
    groups.push({
      slug: "more",
      title: ui.more,
      description: "",
      items: remaining,
    });
  }

  return groups;
}

export function interpolateIdentityCopy(value: string, vars: Record<string, string | number>) {
  return value.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] === undefined ? "{" + key + "}" : String(vars[key]),
  );
}

export const templateIdentityAssignments = rawAssignments;
export const templateIdentityStoryAssignments = rawStoryAssignments;
