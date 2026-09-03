export type BotTeamRoleId =
  | "coordinator"
  | "manager"
  | "researcher"
  | "writer"
  | "editor"
  | "designer"
  | "publisher"
  | "scheduler"
  | "analyst"
  | "auditor"
  | "archivist"
  | "operations"
  | "finance"
  | "support"
  | "inbox"
  | "calendar"
  | "community"
  | "social"
  | "marketing"
  | "seo"
  | "ads"
  | "account-research"
  | "outreach"
  | "crm"
  | "recruiter"
  | "product-manager"
  | "engineering-manager"
  | "engineer"
  | "devops"
  | "reviewer"
  | "qa"
  | "data"
  | "security"
  | "risk"
  | "execution"
  | "credit"
  | "inventory"
  | "returns"
  | "shopping"
  | "travel"
  | "family"
  | "teacher"
  | "specialist";

export const botTeamCategorySlugs = [
  "operations",
  "content",
  "marketing",
  "sales",
  "engineering",
  "research",
  "commerce",
  "personal",
] as const;

export type BotTeamCategorySlug = (typeof botTeamCategorySlugs)[number];
export type BotTeamPattern = "hub" | "pipeline" | "room";
export type BotTeamEvidenceType = "real-public-setup" | "official-example";

export type BotTeamCategory = {
  slug: BotTeamCategorySlug;
  rank: number;
};

export type BotTeamRole = {
  id: BotTeamRoleId;
  sourceName?: string;
  count?: number;
  action?: {
    en: string;
    zhHant: string;
  };
};

export type BotTeam = {
  slug: string;
  rank: number;
  category: BotTeamCategorySlug;
  title: string;
  titleZhHant: string;
  botCount: number;
  roles: readonly BotTeamRole[];
  pattern: BotTeamPattern;
  templateIds: readonly string[];
  exampleSlugs: readonly string[];
  featured?: boolean;
  evidenceType: BotTeamEvidenceType;
};

export const botTeamCategories: readonly BotTeamCategory[] = botTeamCategorySlugs.map((slug, index) => ({
  slug,
  rank: index + 1,
}));

const templates = {
  chief: "XjQ-AZTMrGLmQOTeMu3LF",
  botAdvisor: "KZ9xav0Qad1U5QigEn7rh",
  router: "JugVUSPe_wSZg-in69owM",
  research: "Nn0ykGa3vJ6YS7ib7F6yH",
  writer: "JZAccYtlRFvDSU2CnMnkZ",
  socialScout: "bjsbaj_a2ds2pQY1YiXqE",
  designer: "8vjjlI7z5W0HtpRcFQgJ4",
  marketing: "37ZOM10GzlSOQpMjRp7KB",
  seo: "Viv2NbC5skPslV1WH9Fs7",
  siteAudit: "s6JVFYDIDMsCQMBeTcznW",
  prospecting: "fcJJMM58AdXSTBdW3xWyW",
  dispatch: "YkmZEZYBk-BqylyQbM3kq",
  linkedIn: "tQuoQ94ErUfXNJu4xPqZi",
  projects: "FU-Ev6_Ju4lFGWwWRD0GD",
  engineer: "sQDD87Gp6VLT0m99tFpzu",
  prReviewer: "rt629UEZFtE4Wz0A_0c37",
  loops: "Ub3T7usX-c6yRQibQq83P",
  data: "Bu2sEQqu0hEjpbzN_07D3",
  generalManager: "fkM4b8n4RqZTbrq5fw5L_",
  inbox: "yH2UttxbMwMugweZrigHT",
  travel: "m7sSNlYWSxqrsHrMiEnsh",
  shopping: "MGiEdMz0TNxBkvMgUZAbf",
  teacher: "s5JszATSty0w-uDTw_NzK",
  portfolio: "NQQjXITgX9V7WjaDh9Vzb",
  council: "luPJeAxuAjhqO97wU3wm0",
  botCoach: "BrjELcmSwatjRc8DYjtrT",
} as const;

type BotTeamDefinition = Omit<BotTeam, "rank" | "evidenceType"> & {
  evidenceType?: BotTeamEvidenceType;
};

const definitions: readonly BotTeamDefinition[] = [
  {
    slug: "founder-org-chart",
    category: "operations",
    title: "Founder Org Chart",
    titleZhHant: "創辦人組織圖",
    botCount: 8,
    roles: [
      { id: "coordinator", sourceName: "Atlas" },
      { id: "researcher", sourceName: "Scout" },
      { id: "writer", sourceName: "Quill" },
      { id: "outreach", sourceName: "Pitch" },
      { id: "inbox", sourceName: "Vault" },
      { id: "analyst", sourceName: "Ledger" },
    ],
    pattern: "hub",
    templateIds: [templates.chief, templates.research, templates.writer, templates.prospecting],
    exampleSlugs: [
      "ridark-eth-i-gave-elon-musks-new-grok-bot-an-org-chart-inst",
      "week-of-hacks-nate-herk",
      "firstmate-kun-chen",
      "nykdotdev-one-bot",
      "davidnaffis-grok-bot-is-actually-insane",
      "debs-obrien-i-have-a-new-chief-of-staff-in-bot-i-simply-put",
      "austen-maybe-its-just-because-its-new-and-shiny-but-im",
      "alternatejones-if-youre-manually-talking-to-multiple-bots-in-th",
      "brantley-brum-this-is-how-i-setup-my-grok-bot-and-its-been-sup",
      "vitromancer-i-have-a-cracked-team-assembled-in-grok-bot-with",
      "voidvexa-the-way-im-using-grok-bot-as-a-normal-guy-for-pe",
      "kijakubovs86334-im-a-f-cking-genius-i-made-grok-bot-my-chief-of",
      "samisabir-idris-this-is-how-we-use-grok-bot",
      "retrochainer-you-message-one-bot",
    ],
    featured: true,
  },
  {
    slug: "executive-standup-team",
    category: "operations",
    title: "Executive Standup Team",
    titleZhHant: "主管站會團隊",
    botCount: 5,
    roles: [
      {
        id: "coordinator",
        sourceName: "Chief of Staff",
        action: {
          en: "Runs the standup, relays your instructions, and writes the daily plan.",
          zhHant: "主持站會、傳達指示，再寫出當日計畫。",
        },
      },
      {
        id: "manager",
        sourceName: "Content Executive",
        action: {
          en: "Reports the content lane's status and today's next move.",
          zhHant: "回報內容線進度和今天下一步。",
        },
      },
      {
        id: "manager",
        sourceName: "Community Executive",
        action: {
          en: "States the community goal and where it stands this week.",
          zhHant: "說明社群線本週目標和目前狀態。",
        },
      },
      {
        id: "manager",
        sourceName: "SaaS Executive",
        action: {
          en: "Reports yesterday's SaaS result and one move for today.",
          zhHant: "交出 SaaS 線昨天結果和今日行動。",
        },
      },
      {
        id: "analyst",
        sourceName: "Reporter",
        action: {
          en: "Adds one fact to the daily scrum.",
          zhHant: "在每日站會交出一件事實。",
        },
      },
    ],
    pattern: "room",
    templateIds: [templates.chief, templates.router, templates.data],
    exampleSlugs: [
      "mustafaergisi-daily-scrum-in-one-grok-bot-room",
      "mustafaergisi-grok-bot-just-added-a-new-channels-feature-i-tel",
      "alexfinn-you-need-to-do-this-with-grok-bot-probably-my-fa",
    ],
  },
  {
    slug: "one-person-company-team",
    category: "operations",
    title: "One-Person Company Team",
    titleZhHant: "一人公司團隊",
    botCount: 6,
    roles: [
      { id: "researcher", sourceName: "Scout" },
      { id: "writer", sourceName: "Quill" },
      { id: "outreach", sourceName: "Forge" },
      { id: "support", sourceName: "Guide" },
      { id: "finance", sourceName: "Ledger" },
      { id: "coordinator", sourceName: "Chief" },
    ],
    pattern: "hub",
    templateIds: [templates.generalManager, templates.chief, templates.research, templates.writer],
    exampleSlugs: [
      "one-person-company-rahul",
      "karpachoq-holy-sh-t-i-built-a-f-king-company-inside-grok-b",
      "0xfuckpoverty-i-asked-my-grok-bot-what-it-could-reach-with-my",
      "nekt-0-ok-nobody-is-talking-about-this-part-of-grok-bot",
    ],
    featured: true,
  },
  {
    slug: "agency-operations-fleet",
    category: "operations",
    title: "Agency Operations Fleet",
    titleZhHant: "代理公司營運艦隊",
    botCount: 11,
    roles: [
      { id: "coordinator", sourceName: "CEO Coordinator" },
      { id: "auditor" },
      { id: "seo" },
      { id: "ads" },
      { id: "writer", sourceName: "Copy" },
      { id: "social" },
      { id: "designer" },
      { id: "outreach" },
      { id: "researcher" },
    ],
    pattern: "hub",
    templateIds: [templates.chief, templates.marketing, templates.seo, templates.designer],
    exampleSlugs: [
      "webjuice-ie-11-seats-multi-seat-grok-bot-fleet-i-talk-to-coo",
      "zdonuk94-what-grok-bot-can-actually-do-right-now-using-a",
      "abobsterina-grok-bot-is-starting-to-look-less-like-a-chatbot",
      "adiix-official-elon-musk-shipped-grok-bot-as-an-ai-teammate-tha",
    ],
  },
  {
    slug: "daily-revenue-brief-team",
    category: "operations",
    title: "Daily Revenue Brief Team",
    titleZhHant: "每日營收簡報團隊",
    botCount: 2,
    roles: [
      { id: "coordinator", sourceName: "Chief of Staff" },
      { id: "engineer", sourceName: "Builder" },
    ],
    pattern: "pipeline",
    templateIds: [templates.chief, templates.data, templates.engineer],
    exampleSlugs: ["sebastianroehl-seeing-the-bots-in-bot-communicate-and-work-toge"],
  },
  {
    slug: "bot-fleet-care-team",
    category: "operations",
    title: "Bot Fleet Care Team",
    titleZhHant: "Bot 艦隊維護團隊",
    botCount: 3,
    roles: [
      { id: "coordinator", sourceName: "Chief of Staff" },
      { id: "auditor", sourceName: "Overwatch" },
      { id: "archivist", sourceName: "Workspace Keeper" },
    ],
    pattern: "hub",
    templateIds: [templates.botAdvisor, templates.botCoach, templates.chief],
    exampleSlugs: [
      "yrzhe-top-grok-bot-agent-grok-bot",
      "mikepat711-i-have-my-chief-of-staff-grok-bot-running-a-week",
      "henriquemeyerfl-the-grok-bots-grow-in-size-with-chat-history-and",
      "michael-fenech-if-your-grok-bot-routine-outputs-keep-getting-lo",
    ],
  },
  {
    slug: "seven-bot-content-team",
    category: "content",
    title: "7-Bot Content Team",
    titleZhHant: "7 Bot 內容團隊",
    botCount: 7,
    roles: [
      { id: "coordinator", sourceName: "Chief of Staff" },
      { id: "researcher" },
      { id: "writer" },
      { id: "designer", sourceName: "Visualiser" },
      { id: "analyst" },
      { id: "scheduler" },
      { id: "publisher" },
    ],
    pattern: "hub",
    templateIds: [templates.chief, templates.socialScout, templates.writer, templates.designer],
    exampleSlugs: ["scottybeamio-wtf-grok-bot-just-made-ai-agents-available-to-li"],
    featured: true,
  },
  {
    slug: "creator-dev-studio",
    category: "content",
    title: "Creator + Dev Studio",
    titleZhHant: "創作者與開發工作室",
    botCount: 8,
    roles: [
      {
        id: "coordinator",
        sourceName: "Master",
        action: { en: "Orchestrates the whole team.", zhHant: "統籌整隊。" },
      },
      {
        id: "designer",
        sourceName: "Webby",
        action: { en: "Designs the website.", zhHant: "設計網站。" },
      },
      {
        id: "social",
        sourceName: "Shotry",
        action: { en: "Creates short-form content.", zhHant: "製作短影音內容。" },
      },
      {
        id: "writer",
        sourceName: "Writey",
        action: { en: "Writes articles and newsletters.", zhHant: "撰寫文章和電子報。" },
      },
      {
        id: "writer",
        sourceName: "Script",
        action: { en: "Writes YouTube scripts.", zhHant: "撰寫 YouTube 腳本。" },
      },
      {
        id: "researcher",
        sourceName: "Idea",
        action: { en: "Suggests ideas for videos and content.", zhHant: "提供影片和內容題材。" },
      },
      {
        id: "engineer",
        sourceName: "Claude Code",
        action: { en: "Builds through Claude Code.", zhHant: "使用 Claude Code 開發。" },
      },
      {
        id: "engineer",
        sourceName: "Codex",
        action: { en: "Builds through Codex.", zhHant: "使用 Codex 開發。" },
      },
    ],
    pattern: "hub",
    templateIds: [templates.projects, templates.designer, templates.writer, templates.engineer],
    exampleSlugs: ["farzyness-webby-shotry-writey"],
  },
  {
    slug: "viral-content-factory",
    category: "content",
    title: "Viral Content Factory",
    titleZhHant: "爆款內容工廠",
    botCount: 6,
    roles: [
      {
        id: "coordinator",
        sourceName: "Chief",
        action: { en: "Holds every draft until you approve it.", zhHant: "所有草稿都等你批准才放行。" },
      },
      {
        id: "researcher",
        sourceName: "Trend",
        action: { en: "Finds the gap.", zhHant: "找出缺口。" },
      },
      {
        id: "researcher",
        sourceName: "Idea",
        action: { en: "Locks the hook.", zhHant: "鎖定鉤子。" },
      },
      {
        id: "writer",
        action: { en: "Drafts in your voice.", zhHant: "用你的語氣起草。" },
      },
      {
        id: "editor",
        action: { en: "Cuts the weak lines.", zhHant: "刪掉薄弱句子。" },
      },
      {
        id: "analyst",
        sourceName: "Stats",
        action: { en: "Feeds results into the next cycle.", zhHant: "把成效餵回下一輪。" },
      },
    ],
    pattern: "pipeline",
    templateIds: [templates.chief, templates.socialScout, templates.writer, templates.data],
    exampleSlugs: [
      "beamnxw-i-gave-grok-bot-one-simple-job-run-a-viral-conte",
      "beamnxw-thanks-to-elon-musk-and-grok-bot-i-stopped-writi",
    ],
  },
  {
    slug: "author-publishing-staff",
    category: "content",
    title: "Author Publishing Staff",
    titleZhHant: "作者出版團隊",
    botCount: 6,
    roles: [
      { id: "coordinator", sourceName: "Genghis" },
      { id: "editor" },
      { id: "researcher", sourceName: "Spark" },
      { id: "writer", sourceName: "Quill" },
      { id: "archivist" },
      { id: "publisher" },
    ],
    pattern: "hub",
    templateIds: [templates.chief, templates.writer, templates.research, templates.designer],
    exampleSlugs: [
      "izriel100k-i-used-grok-bot-like-a-tiny-publishing-staff",
      "izriel100k-spent-the-day-building-out-a-full-grok-bot-team",
    ],
  },
  {
    slug: "pinterest-content-team",
    category: "content",
    title: "Pinterest Content Team",
    titleZhHant: "Pinterest 內容團隊",
    botCount: 4,
    roles: [
      { id: "coordinator", sourceName: "Chief of Staff" },
      { id: "researcher" },
      { id: "writer", sourceName: "Content Creation" },
      { id: "scheduler" },
    ],
    pattern: "hub",
    templateIds: [templates.chief, templates.research, templates.writer, templates.socialScout],
    exampleSlugs: ["shivamd95-i-just-fully-automated-my-entire-pinterest-workf"],
  },
  {
    slug: "training-material-room",
    category: "content",
    title: "Training Material Room",
    titleZhHant: "教材製作小組",
    botCount: 3,
    roles: [
      { id: "designer", sourceName: "Graphic Designer" },
      { id: "teacher", sourceName: "Instructional Designer" },
      { id: "specialist", sourceName: "Technical SME" },
    ],
    pattern: "room",
    templateIds: [templates.designer, templates.teacher, templates.research],
    exampleSlugs: ["troythoman-grok-bot-is-pretty-cool-at-this-point"],
  },
  {
    slug: "growth-engine-team",
    category: "marketing",
    title: "Growth Engine Team",
    titleZhHant: "成長引擎團隊",
    botCount: 5,
    roles: [
      {
        id: "coordinator",
        sourceName: "Master Orchestrator",
        action: { en: "Assigns each lane and only asks for yes or no.", zhHant: "分配各條線，只在需要批准時找你。" },
      },
      {
        id: "writer",
        sourceName: "Content",
        action: { en: "Prepares growth content.", zhHant: "製作成長內容。" },
      },
      {
        id: "scheduler",
        action: { en: "Keeps the publishing schedule.", zhHant: "安排發布時間。" },
      },
      {
        id: "analyst",
        sourceName: "Engagement",
        action: { en: "Tracks audience engagement.", zhHant: "查看受眾互動。" },
      },
      {
        id: "analyst",
        sourceName: "Reporting",
        action: { en: "Combines results into reports.", zhHant: "把結果整理成報告。" },
      },
    ],
    pattern: "hub",
    templateIds: [templates.marketing, templates.writer, templates.socialScout, templates.data],
    exampleSlugs: ["eyishazyer-second-time-trying-grok-bot-and-im-still-not-ove"],
  },
  {
    slug: "social-content-queue",
    category: "marketing",
    title: "Social Content Queue",
    titleZhHant: "社群內容佇列",
    botCount: 4,
    roles: [
      { id: "researcher", sourceName: "Content Scout" },
      { id: "writer", sourceName: "Content Drafter" },
      { id: "designer", sourceName: "Lead Magnet Builder" },
      { id: "archivist", sourceName: "Content Bank" },
    ],
    pattern: "pipeline",
    templateIds: [templates.socialScout, templates.writer, templates.designer, templates.marketing],
    exampleSlugs: ["anushkaa1407-grok-bot-for-socials-is-really-good-i-set-up-4-a"],
  },
  {
    slug: "product-launch-team",
    category: "marketing",
    title: "8-Agent Product Launch Team",
    titleZhHant: "8 Agent 產品發布團隊",
    botCount: 8,
    roles: [
      {
        id: "researcher",
        sourceName: "Research",
        action: { en: "Maps the market and customer pain.", zhHant: "整理市場與顧客痛點。" },
      },
      {
        id: "analyst",
        sourceName: "Position",
        action: { en: "Finds the strongest angle.", zhHant: "找出最強定位角度。" },
      },
      {
        id: "writer",
        sourceName: "Hooks",
        action: { en: "Generates and ranks messages.", zhHant: "生成並排序訊息。" },
      },
      {
        id: "designer",
        sourceName: "Creative",
        action: { en: "Turns winning ideas into assets.", zhHant: "把入選點子做成素材。" },
      },
      {
        id: "publisher",
        sourceName: "Distribute",
        action: { en: "Chooses where and when the campaign runs.", zhHant: "決定活動在哪裡及何時進行。" },
      },
      {
        id: "analyst",
        sourceName: "Analytics",
        action: { en: "Reads retention and conversion signals.", zhHant: "查看留存與轉換訊號。" },
      },
      {
        id: "reviewer",
        sourceName: "Red Team",
        action: { en: "Rejects weak campaigns before they waste budget.", zhHant: "在浪費預算前淘汰薄弱方案。" },
      },
      {
        id: "coordinator",
        sourceName: "Director",
        action: { en: "Sends the final choice for your approval.", zhHant: "把最終方案交給你批准。" },
      },
    ],
    pattern: "pipeline",
    templateIds: [templates.marketing, templates.research, templates.writer, templates.data],
    exampleSlugs: ["doublenickk-holy-sh-t-i-built-an-entire-product-launch-team"],
    featured: true,
  },
  {
    slug: "full-marketing-agency",
    category: "marketing",
    title: "Full Marketing Agency",
    titleZhHant: "完整行銷代理團隊",
    botCount: 7,
    roles: [
      { id: "coordinator", sourceName: "Chief of Staff" },
      { id: "analyst", sourceName: "Strategy" },
      { id: "designer", sourceName: "Creative" },
      { id: "ads", sourceName: "Media" },
      { id: "data" },
      { id: "engineer", sourceName: "Tech" },
      { id: "community", sourceName: "PR" },
    ],
    pattern: "hub",
    templateIds: [templates.chief, templates.marketing, templates.designer, templates.data],
    exampleSlugs: ["n01ennn-this-is-f-cking-insane"],
  },
  {
    slug: "growth-deal-desk",
    category: "marketing",
    title: "Growth + Deal Desk",
    titleZhHant: "成長與成交團隊",
    botCount: 5,
    roles: [
      { id: "researcher", sourceName: "X Intel" },
      { id: "social", sourceName: "X Growth" },
      { id: "marketing" },
      { id: "crm", sourceName: "Deal Desk" },
      { id: "outreach" },
    ],
    pattern: "room",
    templateIds: [templates.socialScout, templates.marketing, templates.prospecting, templates.linkedIn],
    exampleSlugs: [
      "thekuchh-i-built-this-grok-bot-workflow-in-less-than-10-m",
      "kloss-xyz-heres-my-grok-bot-setup-so-far-chief-of-staff-ru",
    ],
  },
  {
    slug: "seo-company-team",
    category: "marketing",
    title: "6-Agent SEO Company",
    titleZhHant: "6 Agent SEO 團隊",
    botCount: 6,
    roles: [
      { id: "coordinator", sourceName: "Manager" },
      { id: "researcher" },
      { id: "seo" },
      { id: "writer" },
      { id: "auditor" },
      { id: "analyst" },
    ],
    pattern: "pipeline",
    templateIds: [templates.seo, templates.siteAudit, templates.research, templates.writer],
    exampleSlugs: ["deezzex-6-grok-bot-agents-which-run-an-entire-seo-compan"],
  },
  {
    slug: "chief-crm-team",
    category: "sales",
    title: "Chief of Staff + CRM",
    titleZhHant: "幕僚長與 CRM 團隊",
    botCount: 2,
    roles: [
      { id: "coordinator", sourceName: "R2" },
      { id: "crm", sourceName: "Lando" },
    ],
    pattern: "room",
    templateIds: [templates.chief, templates.dispatch, templates.prospecting],
    exampleSlugs: ["ryancarson-bot-is-just-so-damn-good"],
    featured: true,
  },
  {
    slug: "newsletter-sales-team",
    category: "sales",
    title: "Newsletter Sales Team",
    titleZhHant: "電子報銷售團隊",
    botCount: 2,
    roles: [
      { id: "outreach", sourceName: "Sales Agent" },
      { id: "coordinator", sourceName: "Chief of Staff" },
    ],
    pattern: "pipeline",
    templateIds: [templates.prospecting, templates.chief, templates.writer],
    exampleSlugs: ["startupideaspod-grok-bot-is-my-head-of-sales-for-my-newsletter"],
  },
  {
    slug: "recruiting-desk",
    category: "sales",
    title: "5-Agent Recruiting Desk",
    titleZhHant: "5 Agent 招募團隊",
    botCount: 5,
    roles: [
      { id: "recruiter", sourceName: "Rachael" },
      { id: "outreach", sourceName: "Miles" },
      { id: "account-research", sourceName: "Larry" },
      { id: "crm", sourceName: "Vicky" },
      { id: "coordinator", sourceName: "Architect" },
    ],
    pattern: "hub",
    templateIds: [templates.prospecting, templates.linkedIn, templates.projects],
    exampleSlugs: ["richielampani-i-burned-through-half-a-billion-tokens-this-morn"],
  },
  {
    slug: "outbound-sales-department",
    category: "sales",
    title: "Outbound Sales Department",
    titleZhHant: "外展銷售部門",
    botCount: 5,
    roles: [
      { id: "researcher", sourceName: "Signal Hunter" },
      { id: "analyst", sourceName: "ICP Analyst" },
      { id: "account-research", sourceName: "Account Researcher" },
      { id: "outreach", sourceName: "Outreach Operator" },
      { id: "crm" },
    ],
    pattern: "pipeline",
    templateIds: [templates.prospecting, templates.linkedIn, templates.dispatch, templates.data],
    exampleSlugs: ["romanbuildsaas-we-open-sourced-our-entire-outbound-team"],
  },
  {
    slug: "commission-sales-floor",
    category: "sales",
    title: "Commission Sales Floor",
    titleZhHant: "佣金銷售團隊",
    botCount: 7,
    roles: [
      { id: "account-research", sourceName: "Lead" },
      { id: "outreach" },
      { id: "crm", sourceName: "Conversation" },
      { id: "coordinator", sourceName: "Handoff" },
      { id: "finance", sourceName: "Commission" },
    ],
    pattern: "pipeline",
    templateIds: [templates.prospecting, templates.dispatch, templates.data, templates.chief],
    exampleSlugs: [
      "gippp69-grok-bot-closed-3-deals-and-now-the-company-is-s",
      "gippp69-grok-bot-is-starting-to-look-less-like-a-dashboa",
    ],
  },
  {
    slug: "product-engineering-org",
    category: "engineering",
    title: "Product + Engineering Org",
    titleZhHant: "產品與工程團隊",
    botCount: 9,
    roles: [
      { id: "coordinator", sourceName: "Chief of Staff" },
      { id: "engineering-manager" },
      { id: "engineer", count: 5 },
      { id: "data", sourceName: "Data Analyst" },
      { id: "product-manager", sourceName: "PM Pete" },
    ],
    pattern: "hub",
    templateIds: [templates.projects, templates.engineer, templates.data, templates.prReviewer],
    exampleSlugs: ["n2parko-cos-em-five-eng-ics-databricks-pm"],
    featured: true,
  },
  {
    slug: "cto-specialist-team",
    category: "engineering",
    title: "CTO + Specialist Bots",
    titleZhHant: "CTO 與工程專才團隊",
    botCount: 4,
    roles: [
      { id: "engineering-manager", sourceName: "CTO" },
      { id: "reviewer", sourceName: "PR Bot" },
      { id: "engineer", sourceName: "Backend Bot" },
      { id: "security", sourceName: "Login Bot" },
    ],
    pattern: "hub",
    templateIds: [templates.projects, templates.engineer, templates.prReviewer, templates.loops],
    exampleSlugs: ["rayfernando1337-i-turned-grok-bot-into-my-cto"],
  },
  {
    slug: "website-build-relay",
    category: "engineering",
    title: "Website Build Relay",
    titleZhHant: "網站製作接力團隊",
    botCount: 4,
    roles: [
      { id: "designer" },
      { id: "writer" },
      { id: "engineer", sourceName: "Developer" },
      { id: "devops" },
    ],
    pattern: "pipeline",
    templateIds: [templates.designer, templates.writer, templates.engineer, templates.projects],
    exampleSlugs: ["robertbanh-finally-finished-building-well-grok-bot-helped-s"],
  },
  {
    slug: "repo-fleet-team",
    category: "engineering",
    title: "Repo Fleet Team",
    titleZhHant: "程式庫艦隊團隊",
    botCount: 4,
    roles: [
      { id: "coordinator", sourceName: "duyetbot" },
      { id: "engineer", sourceName: "Repo Bots", count: 2 },
      { id: "qa" },
    ],
    pattern: "hub",
    templateIds: [templates.projects, templates.engineer, templates.prReviewer, templates.loops],
    exampleSlugs: ["duyet-i-am-turning-grok-bot-into-a-small-team-where-ea"],
  },
  {
    slug: "overnight-software-team",
    category: "engineering",
    title: "Overnight Software Team",
    titleZhHant: "夜間軟體團隊",
    botCount: 6,
    roles: [
      { id: "researcher", sourceName: "Scout" },
      { id: "coordinator", sourceName: "Chief" },
      { id: "engineer", sourceName: "Forge" },
      { id: "reviewer", sourceName: "Critic" },
      { id: "devops", sourceName: "Ship" },
      { id: "archivist", sourceName: "Ledger" },
    ],
    pattern: "pipeline",
    templateIds: [templates.projects, templates.engineer, templates.prReviewer, templates.loops],
    exampleSlugs: ["88n77n-i-left-grok-bot-with-one-side-project-at-80-six"],
  },
  {
    slug: "dual-review-engineering-team",
    category: "engineering",
    title: "Dual-Review Engineering Team",
    titleZhHant: "雙重審核工程團隊",
    botCount: 8,
    roles: [
      { id: "coordinator", sourceName: "Orchestrator" },
      { id: "engineer", sourceName: "Builders", count: 2 },
      { id: "qa", sourceName: "Rule Verify" },
      { id: "reviewer", sourceName: "Taste Verify" },
      { id: "archivist", sourceName: "Example Keeper" },
      { id: "engineering-manager", sourceName: "Merge Owner" },
      { id: "analyst", sourceName: "Reporter" },
    ],
    pattern: "pipeline",
    templateIds: [templates.projects, templates.engineer, templates.prReviewer, templates.loops],
    exampleSlugs: ["0xjeyx-i-still-do-not-get-why-more-people-are-not-doing"],
  },
  {
    slug: "overnight-bugfix-team",
    category: "engineering",
    title: "Overnight Bugfix Team",
    titleZhHant: "夜間修正 Bug 團隊",
    botCount: 3,
    roles: [
      { id: "coordinator", sourceName: "Chief of Staff" },
      { id: "qa", sourceName: "Bug Reproduction" },
      { id: "engineer", sourceName: "Debugging Bot" },
    ],
    pattern: "pipeline",
    templateIds: [templates.projects, templates.prReviewer, templates.engineer],
    exampleSlugs: [
      "harrytandy-cursors-lauren-tan-i-wanted-to-figure-out-how-wo",
      "bug-reproduction-xai",
    ],
    evidenceType: "official-example",
  },
  {
    slug: "gis-planning-team",
    category: "engineering",
    title: "GIS Planning Team",
    titleZhHant: "GIS 規劃團隊",
    botCount: 3,
    roles: [
      {
        id: "coordinator",
        sourceName: "ChiefBot",
        action: { en: "Requests the town plan and GIS map layers.", zhHant: "提出市鎮規劃和 GIS 地圖層要求。" },
      },
      {
        id: "engineer",
        sourceName: "ZoningBot",
        action: { en: "Creates Title 30 district, FAR, and overlay layers.", zhHant: "建立 Title 30 分區、FAR 與覆蓋圖層。" },
      },
      {
        id: "engineer",
        sourceName: "UtilitiesBot",
        action: { en: "Creates water, sewer, power, and drainage layers.", zhHant: "建立供水、污水、電力與排水圖層。" },
      },
    ],
    pattern: "hub",
    templateIds: [templates.projects, templates.engineer, templates.data],
    exampleSlugs: ["bflood-grok-bot-create-data-and-maps-in-arcgis-online-c"],
  },
  {
    slug: "six-agent-architecture",
    category: "engineering",
    title: "6-Agent Architecture",
    titleZhHant: "6 Agent 系統架構",
    botCount: 6,
    roles: [
      { id: "coordinator", sourceName: "Helm" },
      { id: "researcher", sourceName: "Scout" },
      { id: "archivist", sourceName: "Archive" },
      { id: "engineer", sourceName: "Forge" },
      { id: "reviewer", sourceName: "Sentinel" },
      { id: "publisher", sourceName: "Relay" },
    ],
    pattern: "pipeline",
    templateIds: [templates.projects, templates.research, templates.engineer, templates.prReviewer],
    exampleSlugs: [
      "monokern-grok-bot-architecture-is-now-running-the-same-sy",
      "monokern-after-elon-reposted-my-tweet-about-the-build-i-d",
    ],
  },
  {
    slug: "evidence-pipeline-team",
    category: "research",
    title: "5-Agent Evidence Pipeline",
    titleZhHant: "5 Agent 證據研究團隊",
    botCount: 5,
    roles: [
      { id: "researcher", sourceName: "Slate" },
      { id: "auditor", sourceName: "Barry" },
      { id: "analyst", sourceName: "Cindy" },
      { id: "writer", sourceName: "Build" },
      { id: "reviewer", sourceName: "Reed" },
    ],
    pattern: "pipeline",
    templateIds: [templates.research, templates.data, templates.writer, templates.prReviewer],
    exampleSlugs: ["francescoinweb3-ive-put-together-more-than-just-a-few-agents-in"],
  },
  {
    slug: "research-audit-team",
    category: "research",
    title: "Research Chief + Source Auditor",
    titleZhHant: "研究主管與來源核對團隊",
    botCount: 2,
    roles: [
      { id: "researcher", sourceName: "Research Chief" },
      { id: "auditor", sourceName: "Source Auditor" },
    ],
    pattern: "pipeline",
    templateIds: [templates.research, templates.data, templates.prReviewer],
    exampleSlugs: ["gippp69-grok-bot-a-second-auditor-bot-is-basically-a-tin"],
    featured: true,
  },
  {
    slug: "market-news-desk",
    category: "research",
    title: "Market News Desk",
    titleZhHant: "市場新聞研究團隊",
    botCount: 6,
    roles: [
      { id: "researcher", sourceName: "Watcher" },
      { id: "archivist", sourceName: "Transcriber" },
      { id: "analyst", sourceName: "Extractor" },
      { id: "reviewer", sourceName: "Skeptic" },
      { id: "auditor", sourceName: "Checker" },
      { id: "publisher", sourceName: "Runner" },
    ],
    pattern: "pipeline",
    templateIds: [templates.research, templates.data, templates.prReviewer],
    exampleSlugs: ["savipww-i-let-six-bots-run-my-desk-on-a-dead-sunday-tape"],
  },
  {
    slug: "market-coverage-team",
    category: "research",
    title: "Overnight Market Coverage Team",
    titleZhHant: "夜間市場研究團隊",
    botCount: 7,
    roles: [
      {
        id: "researcher",
        sourceName: "Filings",
        action: { en: "Flags going-concern language and auditor changes in overnight 10-Ks.", zhHant: "查看夜間 10-K，標出持續經營和會計師變更。" },
      },
      {
        id: "researcher",
        sourceName: "Earnings",
        action: { en: "Compares earnings-call tone with the previous quarter.", zhHant: "比較法說會與上季的語氣變化。" },
      },
      {
        id: "researcher",
        sourceName: "Insider",
        action: { en: "Finds same-day Form 4 buys over $1M.", zhHant: "找出當日超過 100 萬美元的 Form 4 買入。" },
      },
      {
        id: "analyst",
        sourceName: "Flow",
        action: { en: "Reads sweeps and 0DTE pressure before the open.", zhHant: "開盤前查看掃單與 0DTE 壓力。" },
      },
      {
        id: "analyst",
        sourceName: "Macro",
        action: { en: "Covers the overnight Asia handover.", zhHant: "夜間接手亞洲市場動態。" },
      },
      {
        id: "risk",
        action: { en: "Caps positions at 3% and rejects exceptions.", zhHant: "限制每個持倉不超過 3%，並拒絕例外。" },
      },
      {
        id: "coordinator",
        sourceName: "Chief",
        action: { en: "Removes one-source flags and emails a ranked 5:30 brief.", zhHant: "移除單一來源警報，再於 5:30 寄出排序簡報。" },
      },
    ],
    pattern: "hub",
    templateIds: [templates.research, templates.data, templates.chief, templates.prReviewer],
    exampleSlugs: [
      "l1vsun-setup-hedge-funds-use-to-cover-3-000-names-a-nig",
      "l1vsun-grok-bot-by-elon-musk-just-gave-me-a-research-fl",
    ],
  },
  {
    slug: "collaborative-analysis-room",
    category: "research",
    title: "Collaborative Analysis Room",
    titleZhHant: "協作分析房間",
    botCount: 4,
    roles: [
      { id: "coordinator", sourceName: "Leader" },
      { id: "researcher" },
      { id: "analyst" },
      { id: "reviewer" },
    ],
    pattern: "room",
    templateIds: [templates.council, templates.research, templates.data, templates.prReviewer],
    exampleSlugs: [
      "jsk333-supergrok-heavy-subscribers-heres-my-latest-jewe",
      "inady-grok-bot-3-1-bot",
      "mywestlord-i-typed-1-prompt-into-grok-bot-and-16-agents-wok",
    ],
  },
  {
    slug: "math-review-panel",
    category: "research",
    title: "Math Review Panel",
    titleZhHant: "數學審核小組",
    botCount: 4,
    roles: [
      {
        id: "coordinator",
        sourceName: "Video Lead",
        action: { en: "Creates the paper explainer video.", zhHant: "製作論文解說影片。" },
      },
      {
        id: "specialist",
        sourceName: "Complex Analysis",
        action: { en: "Checks conformal maps and complex-analysis math.", zhHant: "核對共形映射和複變分析數學。" },
      },
      {
        id: "specialist",
        sourceName: "Geometric Function Theory",
        action: { en: "Checks arguments, graphs, and geometric-function details.", zhHant: "核對論證、圖表和幾何函數細節。" },
      },
      {
        id: "specialist",
        sourceName: "Harmonic Analysis",
        action: { en: "Checks the harmonic-analysis math.", zhHant: "核對調和分析數學。" },
      },
    ],
    pattern: "room",
    templateIds: [templates.teacher, templates.research, templates.council],
    exampleSlugs: ["pi010101-asked-the-grok-bot-to-generate-a-video-explainin"],
  },
  {
    slug: "netsuite-credit-team",
    category: "commerce",
    title: "NetSuite Order + Credit Team",
    titleZhHant: "NetSuite 訂單與信貸團隊",
    botCount: 2,
    roles: [
      { id: "coordinator", sourceName: "Order Chief" },
      { id: "credit", sourceName: "Credit Bot" },
    ],
    pattern: "pipeline",
    templateIds: [templates.generalManager, templates.chief, templates.data],
    exampleSlugs: ["0x-anni-grok-bot-is-the-first-ai-thing-that-changed-what"],
  },
  {
    slug: "five-agent-trading-desk",
    category: "commerce",
    title: "5-Agent Trading Desk",
    titleZhHant: "5 Agent 交易研究團隊",
    botCount: 5,
    roles: [
      { id: "researcher", sourceName: "Alpha" },
      { id: "risk", sourceName: "Risk" },
      { id: "analyst", sourceName: "Trader" },
      { id: "finance", sourceName: "Treas" },
      { id: "execution", sourceName: "Exec" },
    ],
    pattern: "pipeline",
    templateIds: [templates.research, templates.data, templates.prReviewer],
    exampleSlugs: ["francescoinweb3-ive-set-up-a-trading-desk-within-grok-bot-not-a"],
  },
  {
    slug: "risk-gated-trading-floor",
    category: "commerce",
    title: "Risk-Gated Trading Floor",
    titleZhHant: "風險把關交易團隊",
    botCount: 10,
    roles: [
      { id: "coordinator", sourceName: "Head of Desk" },
      { id: "researcher", sourceName: "Search" },
      { id: "risk" },
      { id: "analyst", sourceName: "Whale Tracking" },
      { id: "security", sourceName: "Rug Sentinel" },
      { id: "execution", sourceName: "Sniper" },
      { id: "reviewer", sourceName: "Exit Desk" },
    ],
    pattern: "hub",
    templateIds: [templates.research, templates.data, templates.prReviewer, templates.chief],
    exampleSlugs: [
      "mpxbt-holy-sh-t-i-built-a-whole-f-king-trading-floor-i",
      "ridark-eth-i-still-dont-understand-why-this-setup-hasnt-bec",
      "papa-couch-i-gave-elons-grok-bot-100-built-it-a-five-agent",
      "immortalhowwl-grok-bot-by-elon-musk-is-running-a-six-agent-hed",
      "dcbk2la-hold-on-just-a-minute",
      "scottybeamio-wtf-i-gave-my-grok-bot-one-task-trade-memecoins",
      "hammeredsmithy-bull-desk-webull-trading",
    ],
  },
  {
    slug: "finance-recovery-team",
    category: "commerce",
    title: "Finance Recovery Team",
    titleZhHant: "費用追回團隊",
    botCount: 6,
    roles: [
      { id: "inbox", sourceName: "Sweep" },
      { id: "finance", sourceName: "Match" },
      { id: "analyst", sourceName: "Price" },
      { id: "writer", sourceName: "Draft" },
      { id: "reviewer", sourceName: "Veto" },
      { id: "coordinator", sourceName: "Chief" },
    ],
    pattern: "pipeline",
    templateIds: [templates.inbox, templates.data, templates.writer, templates.chief],
    exampleSlugs: [
      "0xfuckpoverty-day-1-of-14",
      "0xfuckpoverty-elons-grok-bot-runs-a-six-person-back-office-for",
    ],
  },
  {
    slug: "ecommerce-operations-team",
    category: "commerce",
    title: "8-Bot Ecommerce Operations",
    titleZhHant: "8 Bot 電商營運團隊",
    botCount: 8,
    roles: [
      { id: "finance", sourceName: "Money" },
      { id: "ads" },
      { id: "inventory", sourceName: "Stock" },
      { id: "support" },
      { id: "returns" },
      { id: "writer", sourceName: "Email" },
      { id: "security", sourceName: "Fraud" },
      { id: "coordinator", sourceName: "Chief" },
    ],
    pattern: "hub",
    templateIds: [templates.generalManager, templates.marketing, templates.data, templates.chief],
    exampleSlugs: ["gyome1-this-is-completely-ridiculous"],
    featured: true,
  },
  {
    slug: "household-manager-team",
    category: "personal",
    title: "Household Manager Team",
    titleZhHant: "家庭管理團隊",
    botCount: 7,
    roles: [
      { id: "coordinator", sourceName: "Mr. Bossy" },
      { id: "calendar", sourceName: "Mr. Pointy" },
      { id: "community", sourceName: "Mr. Chatty" },
      { id: "shopping", sourceName: "Mr. Shoppy" },
      { id: "researcher", sourceName: "Mr. Sharpy" },
      { id: "specialist", sourceName: "Mr. Curious" },
      { id: "analyst", sourceName: "Mr. Tubey" },
    ],
    pattern: "hub",
    templateIds: [templates.chief, templates.travel, templates.shopping, templates.research],
    exampleSlugs: ["ashwinmatta-grok-bot-is-mind-blowing"],
    featured: true,
  },
  {
    slug: "family-office-team",
    category: "personal",
    title: "Family Office Team",
    titleZhHant: "家庭辦公室團隊",
    botCount: 6,
    roles: [
      { id: "coordinator", sourceName: "Manager" },
      { id: "family", sourceName: "House Bot" },
      { id: "finance", sourceName: "Finance Bot" },
      { id: "analyst", sourceName: "Portfolio Bot" },
      { id: "calendar", sourceName: "Family Bot" },
      { id: "researcher", sourceName: "News Bot" },
    ],
    pattern: "hub",
    templateIds: [templates.chief, templates.data, templates.travel, templates.research],
    exampleSlugs: [
      "lee-wayan-ive-been-using-grok-bot-like-a-cheap-chief-of-st",
      "martin-casado-been-building-out-my-army-of-personal-assistant",
    ],
  },
  {
    slug: "travel-debate-team",
    category: "personal",
    title: "Travel Debate Team",
    titleZhHant: "旅行方案討論團隊",
    botCount: 3,
    roles: [
      {
        id: "travel",
        sourceName: "Route Scout",
        action: { en: "Compares route options.", zhHant: "比較路線選項。" },
      },
      {
        id: "travel",
        sourceName: "Stay Scout",
        action: { en: "Compares stay options.", zhHant: "比較住宿選項。" },
      },
      {
        id: "coordinator",
        sourceName: "Trip Lead",
        action: { en: "Runs the debate and stops before booking.", zhHant: "整合討論，預訂前停下。" },
      },
    ],
    pattern: "room",
    templateIds: [templates.travel, templates.research, templates.chief],
    exampleSlugs: ["gota-bara-twelve-jobs-on-one-roster"],
  },
  {
    slug: "job-application-team",
    category: "personal",
    title: "Job Application Team",
    titleZhHant: "求職準備團隊",
    botCount: 3,
    roles: [
      { id: "inbox", sourceName: "Resume Finder" },
      { id: "reviewer", sourceName: "Fit Reviewer" },
      { id: "teacher", sourceName: "Interview Coach" },
    ],
    pattern: "pipeline",
    templateIds: [templates.inbox, templates.portfolio, templates.teacher],
    exampleSlugs: ["aminetx-grok-searched-my-gmail-for-the-re-sume-i-sent-to"],
  },
  {
    slug: "personal-client-office",
    category: "personal",
    title: "Personal + Client Office",
    titleZhHant: "個人與客戶營運團隊",
    botCount: 6,
    roles: [
      { id: "inbox", sourceName: "Newsletter Cleanup" },
      { id: "community", sourceName: "DM Triage" },
      { id: "social", sourceName: "Follower Monitor" },
      { id: "support", sourceName: "Email Support" },
      { id: "analyst", sourceName: "Daily Summary" },
      { id: "coordinator", sourceName: "Chief of Staff" },
    ],
    pattern: "hub",
    templateIds: [templates.chief, templates.inbox, templates.socialScout, templates.data],
    exampleSlugs: ["pfista-grok-bots-ive-made-so-far-email-newsletter-unsub"],
  },
  {
    slug: "personal-finance-board",
    category: "personal",
    title: "Personal Finance Board",
    titleZhHant: "個人財務顧問團隊",
    botCount: 4,
    roles: [
      { id: "coordinator", sourceName: "Chief of Staff" },
      { id: "finance", sourceName: "Financial Advisor" },
      { id: "auditor", sourceName: "Tax Advisor" },
      { id: "analyst", sourceName: "Retirement Advisor" },
    ],
    pattern: "hub",
    templateIds: [templates.chief, templates.data, templates.prReviewer],
    exampleSlugs: ["xskiffman-im-thoroughly-impressed-with-the-new-grok-bot"],
  },
];

export const botTeams: readonly BotTeam[] = definitions.map((team, index) => ({
  ...team,
  rank: index + 1,
  evidenceType: team.evidenceType ?? "real-public-setup",
}));

export const verifiedBotTeamPostCount = new Set(botTeams.flatMap((team) => team.exampleSlugs)).size;

export function getBotTeam(slug: string) {
  return botTeams.find((team) => team.slug === slug);
}
