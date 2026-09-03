import type {
  BotTeam,
  BotTeamCategory,
  BotTeamCategorySlug,
  BotTeamRoleId,
} from "@/data/bot-teams";
import { getDiscoverStory } from "@/data/discover";
import { localizeDiscoverStory } from "./discover";
import type { Locale } from "./types";

export type LocalizedBotTeamCategory = BotTeamCategory & {
  title: string;
  description: string;
};

export type LocalizedBotTeamRole = {
  id: string;
  roleId: BotTeamRoleId;
  name: string;
  action: string;
  handoff: string;
  count: number;
};

export type LocalizedBotTeam = Omit<BotTeam, "title" | "roles"> & {
  title: string;
  summary: string;
  outcome: string;
  audience: string;
  setupPrompt: string;
  roles: readonly LocalizedBotTeamRole[];
};

export type BotTeamsPageCopy = {
  eyebrow: string;
  title: string;
  body: string;
  count: (teams: number, categories: number, sources: number, posts: number) => string;
  filterLabel: string;
  allFilter: string;
  featuredFilter: string;
  chooseTitle: string;
  chooseBody: string;
  showing: (count: number) => string;
  oneBotTitle: string;
  oneBotBody: string;
  teamTitle: string;
  teamBody: string;
  bots: (count: number) => string;
  evidence: (count: number) => string;
  verifiedSetup: string;
  officialExample: string;
  namedRoles: (named: number, total: number) => string;
  open: string;
  guideEyebrow: string;
  guideTitle: string;
  guideBody: string;
  guideSteps: readonly { title: string; body: string }[];
  guideLink: string;
  teamEyebrow: string;
  outcomeLabel: string;
  audienceLabel: string;
  workflowTitle: string;
  workflowBody: string;
  handoffLabel: string;
  templatesTitle: string;
  templatesBody: string;
  templateOpen: string;
  setupTitle: string;
  setupBody: string;
  examplesTitle: string;
  examplesBody: string;
  otherTitle: string;
  allTeams: string;
};

type RoleCopy = { name: string; action: string };

const enRoles: Record<BotTeamRoleId, RoleCopy> = {
  coordinator: { name: "Coordinator Bot", action: "Routes the goal, keeps the shared context, and only interrupts you for a decision." },
  manager: { name: "Manager Bot", action: "Owns one area, keeps its queue clear, and reports the few facts the team needs." },
  researcher: { name: "Research Bot", action: "Finds relevant material, keeps the source, and marks anything it cannot verify." },
  writer: { name: "Writer Bot", action: "Turns checked material into a draft that follows the requested voice and format." },
  editor: { name: "Editor Bot", action: "Cuts weak lines, checks structure, and returns a tighter version without publishing it." },
  designer: { name: "Design Bot", action: "Turns an approved brief into a consistent visual, page, or creative pack." },
  publisher: { name: "Publisher Bot", action: "Prepares the final package and schedule, then waits at the publishing gate." },
  scheduler: { name: "Scheduler Bot", action: "Owns timing and keeps approved items in the right order." },
  analyst: { name: "Analysis Bot", action: "Compares the evidence, explains what changed, and highlights the next decision." },
  auditor: { name: "Audit Bot", action: "Challenges claims, scopes, numbers, and anything that does not agree." },
  archivist: { name: "Archive Bot", action: "Keeps durable context, decisions, and source material easy for the team to find again." },
  operations: { name: "Operations Bot", action: "Keeps recurring admin, follow-ups, and exceptions moving in one visible queue." },
  finance: { name: "Finance Bot", action: "Checks money records and prepares a clear exception list without moving funds." },
  support: { name: "Support Bot", action: "Sorts customer questions, drafts answers, and escalates anything sensitive." },
  inbox: { name: "Inbox Bot", action: "Finds the right messages, prepares drafts, and keeps risky actions behind approval." },
  calendar: { name: "Calendar Bot", action: "Finds clashes, prepares reminders, and leaves booking changes for approval." },
  community: { name: "Community Bot", action: "Monitors replies and requests, then separates useful conversations from noise." },
  social: { name: "Social Bot", action: "Finds timely ideas and prepares channel-ready drafts without posting them early." },
  marketing: { name: "Marketing Bot", action: "Connects the audience, message, channel, and success measure into one plan." },
  seo: { name: "SEO Bot", action: "Finds search gaps, prepares fixes, and keeps the evidence behind every recommendation." },
  ads: { name: "Ads Bot", action: "Reviews campaigns and prepares recommendations without changing live spend." },
  "account-research": { name: "Account Research Bot", action: "Finds the right company, person, and a sourced reason to contact them." },
  outreach: { name: "Outreach Bot", action: "Drafts a short, relevant message and hands it to a review queue." },
  crm: { name: "CRM Bot", action: "Removes duplicates, records replies, and keeps the next step visible." },
  recruiter: { name: "Recruiting Bot", action: "Finds candidates for one clear lane and keeps the match evidence attached." },
  "product-manager": { name: "Product Manager Bot", action: "Turns the need into a small spec with a clear result and acceptance checks." },
  "engineering-manager": { name: "Engineering Manager Bot", action: "Splits a build into owned parts and keeps dependencies in order." },
  engineer: { name: "Engineer Bot", action: "Builds and tests one owned part, then returns a small change with evidence." },
  devops: { name: "Delivery Bot", action: "Prepares the preview or release package and stops before production changes." },
  reviewer: { name: "Review Bot", action: "Checks an output it did not create and sends weak work back with a reason." },
  qa: { name: "QA Bot", action: "Reproduces issues, runs the checks, and records what passed or failed." },
  data: { name: "Data Bot", action: "Pulls the named numbers, keeps definitions stable, and returns a compact table." },
  security: { name: "Safety Bot", action: "Looks for dangerous conditions and blocks action when the evidence is not safe." },
  risk: { name: "Risk Bot", action: "Applies hard limits and can reject an idea before any irreversible step." },
  execution: { name: "Execution Bot", action: "Prepares the final action only after every required check has passed." },
  credit: { name: "Credit Bot", action: "Reviews a flagged order and prepares the evidence needed for a decision." },
  inventory: { name: "Inventory Bot", action: "Checks stock, incoming units, and whether demand can be fulfilled." },
  returns: { name: "Returns Bot", action: "Separates product problems from traffic problems and shows the return pattern." },
  shopping: { name: "Shopping Bot", action: "Compares real options and prices, then waits before buying." },
  travel: { name: "Travel Bot", action: "Compares routes or stays against the stated dates, budget, and constraints." },
  family: { name: "Family Bot", action: "Keeps household needs, plans, and open questions together without acting early." },
  teacher: { name: "Teaching Bot", action: "Turns checked material into a clear lesson, practice set, or preparation guide." },
  specialist: { name: "Specialist Bot", action: "Brings one narrow area of expertise into the shared result." },
};

const hantRoles: Record<BotTeamRoleId, RoleCopy> = {
  coordinator: { name: "統籌 Bot", action: "分配目標、保留共同背景，只在需要你決定時通知你。" },
  manager: { name: "主管 Bot", action: "負責一個範圍，整理進度，再回報團隊真正需要的重點。" },
  researcher: { name: "研究 Bot", action: "尋找相關資料、保留來源，無法核實的內容會清楚標示。" },
  writer: { name: "寫作 Bot", action: "把核對過的資料整理成符合語氣和格式的草稿。" },
  editor: { name: "編輯 Bot", action: "刪去薄弱內容、檢查結構，再交回更精簡的版本。" },
  designer: { name: "設計 Bot", action: "把已確認的簡介製作成一致的視覺、頁面或素材包。" },
  publisher: { name: "發布 Bot", action: "準備最後版本和時間，發布前停下來等你批准。" },
  scheduler: { name: "排程 Bot", action: "管理時間，並把已批准的內容放到正確順序。" },
  analyst: { name: "分析 Bot", action: "比較證據、說明變化，再標出下一個需要決定的事項。" },
  auditor: { name: "核對 Bot", action: "檢查說法、範圍和數字，找出互相矛盾的內容。" },
  archivist: { name: "歸檔 Bot", action: "保存長期背景、決定和來源，讓其他 Bot 可以再次找到。" },
  operations: { name: "營運 Bot", action: "把例行行政、跟進和例外事項集中到清楚的清單。" },
  finance: { name: "財務 Bot", action: "核對金錢紀錄並整理例外，不會自行移動資金。" },
  support: { name: "客服 Bot", action: "分類客戶問題、起草回覆，敏感內容會交給你處理。" },
  inbox: { name: "收件匣 Bot", action: "找出重要訊息、準備草稿，危險操作會留待批准。" },
  calendar: { name: "行事曆 Bot", action: "找出時間衝突、準備提醒，變更預約前會先詢問。" },
  community: { name: "社群 Bot", action: "查看回覆與請求，把有用對話和雜訊分開。" },
  social: { name: "社群內容 Bot", action: "尋找及時題材並準備各平台草稿，不會提早發布。" },
  marketing: { name: "行銷 Bot", action: "把受眾、訊息、渠道和衡量方式整理成一個計畫。" },
  seo: { name: "SEO Bot", action: "找出搜尋缺口、準備改善方法，並保留每項建議的證據。" },
  ads: { name: "廣告 Bot", action: "檢查活動並準備建議，不會自行改動真實預算。" },
  "account-research": { name: "客戶研究 Bot", action: "找出合適公司、聯絡人，以及有來源的聯絡原因。" },
  outreach: { name: "外展 Bot", action: "起草簡短而相關的訊息，再放入待審清單。" },
  crm: { name: "CRM Bot", action: "移除重複資料、記錄回覆，並清楚保留下個步驟。" },
  recruiter: { name: "招募 Bot", action: "為一個清楚範圍尋找人選，並保留匹配證據。" },
  "product-manager": { name: "產品經理 Bot", action: "把需要整理成小型規格、清楚結果和驗收條件。" },
  "engineering-manager": { name: "工程經理 Bot", action: "把製作內容拆成有人負責的小部分，並安排先後次序。" },
  engineer: { name: "工程 Bot", action: "製作並測試一個清楚部分，再連同證據交回小型修改。" },
  devops: { name: "交付 Bot", action: "準備預覽或發布包，修改正式環境前會停下來。" },
  reviewer: { name: "審核 Bot", action: "檢查不是自己製作的內容，並把薄弱部分連同原因退回。" },
  qa: { name: "QA Bot", action: "重現問題、執行檢查，再記錄通過或失敗的內容。" },
  data: { name: "數據 Bot", action: "取得指定數字、保持定義一致，再交回精簡表格。" },
  security: { name: "安全 Bot", action: "尋找危險情況，證據不足時會阻止下一步。" },
  risk: { name: "風險 Bot", action: "套用明確限制，在任何不可還原步驟前可以拒絕方案。" },
  execution: { name: "執行 Bot", action: "所有必要檢查通過後，才會準備最後操作。" },
  credit: { name: "信貸 Bot", action: "檢查被標記的訂單，並準備決定所需的證據。" },
  inventory: { name: "庫存 Bot", action: "檢查存貨、來貨和需求是否能夠供應。" },
  returns: { name: "退貨 Bot", action: "分開產品問題和流量問題，並顯示退貨模式。" },
  shopping: { name: "購物 Bot", action: "比較真實選項和價格，購買前會等待批准。" },
  travel: { name: "旅行 Bot", action: "依照日期、預算和限制比較路線或住宿。" },
  family: { name: "家庭 Bot", action: "集中家庭需要、計畫和未決問題，不會提早採取行動。" },
  teacher: { name: "教學 Bot", action: "把核對過的資料整理成清楚課程、練習或準備指南。" },
  specialist: { name: "專才 Bot", action: "把一個明確範圍的專業意見加入共同結果。" },
};

const categoryCopy: Record<"en" | "zh-Hant", Record<BotTeamCategorySlug, { title: string; description: string }>> = {
  en: {
    operations: { title: "Operations", description: "Chiefs of staff, company rosters, briefs, and fleet care." },
    content: { title: "Content", description: "Teams that research, write, edit, design, and prepare publishing." },
    marketing: { title: "Marketing", description: "Growth, social, launch, agency, and SEO team setups." },
    sales: { title: "Sales", description: "Prospecting, outreach, CRM, recruiting, and follow-up teams." },
    engineering: { title: "Engineering", description: "Product, coding, review, QA, and delivery teams." },
    research: { title: "Research", description: "Source checking, analysis rooms, and overnight intelligence desks." },
    commerce: { title: "Commerce", description: "Ecommerce, finance review, order checks, and risk-gated desks." },
    personal: { title: "Personal", description: "Household, family, travel, study, and personal office teams." },
  },
  "zh-Hant": {
    operations: { title: "營運管理", description: "幕僚長、公司編制、每日簡報和 Bot 艦隊維護。" },
    content: { title: "內容製作", description: "由研究、寫作、編輯、設計到準備發布的團隊。" },
    marketing: { title: "行銷與成長", description: "社群、產品發布、代理公司和 SEO 組隊方式。" },
    sales: { title: "銷售", description: "潛在客戶、外展、CRM、招募和跟進團隊。" },
    engineering: { title: "產品與工程", description: "產品、程式、審核、QA 和交付團隊。" },
    research: { title: "研究與情報", description: "來源核對、協作分析和夜間情報團隊。" },
    commerce: { title: "商務與交易", description: "電商、財務核對、訂單檢查和風險把關團隊。" },
    personal: { title: "個人與家庭", description: "家庭、旅行、學習和個人事務團隊。" },
  },
};

const teamOutcomeCopy: Record<string, { en: string; "zh-Hant": string }> = {
  "founder-org-chart": { en: "Assign through one chief instead of doing every lane yourself.", "zh-Hant": "你只吩咐幕僚長，其餘專才分頭做。" },
  "executive-standup-team": { en: "Each executive drops one fact; the manager writes the daily plan.", "zh-Hant": "各主管交一件事實，再寫當日計畫。" },
  "one-person-company-team": { en: "Split research, writing, outreach, support, and finance into owned lanes.", "zh-Hant": "一人公司各條線都有專才。" },
  "agency-operations-fleet": { en: "One coordinator runs specialist seats; you keep send, spend, and merge.", "zh-Hant": "統籌調度專才，寄出與花費仍由你批。" },
  "daily-revenue-brief-team": { en: "Chief requests yesterday's revenue brief; Builder returns a clean email.", "zh-Hant": "幕僚長要營收簡報，建造者交電郵。" },
  "bot-fleet-care-team": { en: "Archive files, trim bloated bots, and recommend weekly fleet improvements.", "zh-Hant": "整理檔案、精簡 Bot，每週提出改善。" },
  "seven-bot-content-team": { en: "Research, write, design, time, and publish through one chief of staff.", "zh-Hant": "研究到發布都由幕僚長分派。" },
  "creator-dev-studio": { en: "One master routes web, shorts, articles, scripts, ideas, and coding.", "zh-Hant": "一個總管分派網頁、短片、文稿與程式。" },
  "viral-content-factory": { en: "Trend finds the gap; idea, writer, and editor wait at your gate.", "zh-Hant": "找熱點、寫草稿，發布前等你批准。" },
  "author-publishing-staff": { en: "Keep lore, edit manuscripts, and prepare query packages without re-explaining.", "zh-Hant": "記住世界觀，整理稿件與投稿資料。" },
  "pinterest-content-team": { en: "Research trending pins, draft on-brand assets, and export a scheduler CSV.", "zh-Hant": "研究熱門 Pin，產出可批次上傳檔。" },
  "training-material-room": { en: "Designer, teacher, and specialist draft training together in one room.", "zh-Hant": "設計、教學與專才同房製作教材。" },
  "growth-engine-team": { en: "Split content, scheduling, engagement, and reporting under one orchestrator.", "zh-Hant": "內容、排程、互動與報告分開負責。" },
  "social-content-queue": { en: "Morning scout scores ideas, then a draft and lead magnet wait.", "zh-Hant": "晨間找題材，草稿與資料包等你看。" },
  "product-launch-team": { en: "One brief becomes a campaign after weak angles are killed.", "zh-Hant": "一份簡介過關後，才交出可批活動。" },
  "full-marketing-agency": { en: "Strategy, creative, media, data, tech, and PR report to one chief.", "zh-Hant": "策略到公關都向一位幕僚長匯報。" },
  "growth-deal-desk": { en: "X intel and growth feed a deal desk that unsticks follow-ups.", "zh-Hant": "情報與成長交給成交團隊，繼續跟進。" },
  "seo-company-team": { en: "Scout the SERP gap, draft, audit claims, then ship last.", "zh-Hant": "找搜尋缺口、寫稿、核對後才發布。" },
  "chief-crm-team": { en: "R2 runs calendar and mail; Lando runs outbound with R2.", "zh-Hant": "幕僚長管日程郵件，CRM 管外展。" },
  "newsletter-sales-team": { en: "Recover inbound sponsors, price slots, and draft outreach for your send.", "zh-Hant": "找回贊助、定價，草稿等你寄出。" },
  "recruiting-desk": { en: "Source candidates, draft first-touches, and queue screens for humans.", "zh-Hant": "找人選、起草聯絡，面試留給人。" },
  "outbound-sales-department": { en: "Find intent, research accounts, and draft outreach that waits overnight.", "zh-Hant": "找意向、研究客戶，外展草稿等待審核。" },
  "commission-sales-floor": { en: "Lead, outreach, conversation, handoff, and commission stay in one loop.", "zh-Hant": "線索到成交與佣金都在同一循環。" },
  "product-engineering-org": { en: "Chief, eng manager, five engineers, data, and PM hand work through PRs.", "zh-Hant": "主管拆需求，工程與產品用 PR 交接。" },
  "cto-specialist-team": { en: "Hand the repo to a CTO bot; PR, backend, and login report up.", "zh-Hant": "把程式庫交給 CTO，專才自行匯報。" },
  "website-build-relay": { en: "Design, write, code, then DevOps deploys the finished site.", "zh-Hant": "設計、寫文、開發後，再交給上線。" },
  "repo-fleet-team": { en: "One lead assigns repo bots; QA checks the finished changes.", "zh-Hant": "各程式庫有專才，完成後由 QA 檢查。" },
  "overnight-software-team": { en: "Overnight, bots build, review, and preview; nothing irreversible ships.", "zh-Hant": "夜間建造與預覽，不可還原的操作先停。" },
  "dual-review-engineering-team": { en: "Parallel builds pass rule and taste checks before a merge owner.", "zh-Hant": "平行建造，規則與品味都過才合併。" },
  "overnight-bugfix-team": { en: "Reproduce the bug, file it, then a debugging bot prepares the fix.", "zh-Hant": "重現並開單，除錯 Bot 準備修正。" },
  "gis-planning-team": { en: "Chief, zoning, and utilities persist real layers onto ArcGIS maps.", "zh-Hant": "把分區與公用設施做成真實地圖層。" },
  "six-agent-architecture": { en: "Helm routes signal through research, build, independent review, then relay.", "zh-Hant": "從訊號研究、建造到獨立審核再交出。" },
  "evidence-pipeline-team": { en: "Gather, check sources, analyse, compile, then Reed returns the report.", "zh-Hant": "蒐集、核對來源、分析後編成報告。" },
  "research-audit-team": { en: "Research chief gathers sources; auditor checks claims and conflicting numbers.", "zh-Hant": "研究主管找資料，核對員查矛盾數字。" },
  "market-news-desk": { en: "Watch, transcribe, extract, kill fakes, then send one checked line.", "zh-Hant": "監看新聞、剔除假訊，只送核對過的一行。" },
  "market-coverage-team": { en: "Overnight filings, earnings, insider, flow, and macro land as one brief.", "zh-Hant": "夜間覆蓋財報與資金，清晨交一份簡報。" },
  "collaborative-analysis-room": { en: "Leader, researcher, analyst, and reviewer challenge evidence in one group.", "zh-Hant": "研究與分析在同一房間互相質疑。" },
  "math-review-panel": { en: "Subject experts check the math before the explainer video is edited.", "zh-Hant": "數學專才核對論證後，再改解說影片。" },
  "netsuite-credit-team": { en: "Order chief flags a NetSuite order; credit reviews it without you.", "zh-Hant": "訂單主管把問題單交給信貸審查。" },
  "five-agent-trading-desk": { en: "Scan, size, and fund-check a trade; exec acts only after risk.", "zh-Hant": "掃描、風控、資金核對後才可執行。" },
  "risk-gated-trading-floor": { en: "Search, risk, whale, and rug checks can reject before any buy.", "zh-Hant": "搜尋與風控可否決，購買前先阻擋。" },
  "finance-recovery-team": { en: "Sweep receipts, match charges, draft claims; veto can kill the send.", "zh-Hant": "對收據找漏帳，否決權可擋住寄出。" },
  "ecommerce-operations-team": { en: "One morning screen for money, ads, stock, returns, and the decision.", "zh-Hant": "早會一屏看資金、廣告、庫存與退貨。" },
  "household-manager-team": { en: "Calendar, shopping, research, and briefings route through one household chief.", "zh-Hant": "行程、購物與研究都交給家庭總管。" },
  "family-office-team": { en: "House, finance, portfolio, family time, and news report to one manager.", "zh-Hant": "房屋、財務、家庭與新聞向總管匯報。" },
  "travel-debate-team": { en: "Route and stay scouts debate options; booking still waits for you.", "zh-Hant": "路線與住宿互相辯論，預約仍等你。" },
  "job-application-team": { en: "Find the résumé, score the posting, and prepare interview questions.", "zh-Hant": "找出履歷、對職位打分，並準備面試。" },
  "personal-client-office": { en: "Clean newsletters, triage DMs, draft support, and summarize the day.", "zh-Hant": "清理訂閱與私訊，並交當日客戶摘要。" },
  "personal-finance-board": { en: "Advisor, tax, and retirement pause for approval before touching accounts.", "zh-Hant": "財務、稅務與退休建議，動帳前先問你。" },
};

const pageCopy: Record<"en" | "zh-Hant", BotTeamsPageCopy> = {
  en: {
    eyebrow: "REAL MULTI-BOT SETUPS",
    title: "Grok Bot Teams",
    body: "Browse multi-Bot setups mapped to their public sources.",
    count: (teams, _categories, sources, posts) => `${teams} teams · ${sources} sources · ${posts.toLocaleString("en-US")} posts reviewed`,
    filterLabel: "Filter Bot Teams",
    allFilter: "All teams",
    featuredFilter: "Featured",
    chooseTitle: "All Bot Teams",
    chooseBody: "Start with the outcome, inspect the roles and handoffs, then open the original posts before you build it.",
    showing: (count) => `${count} teams shown`,
    oneBotTitle: "Templates = one Bot",
    oneBotBody: "Choose one helper for one clear purpose.",
    teamTitle: "Bot Teams = Bots working together",
    teamBody: "Choose a repeatable setup with clear roles, handoffs, and a human approval gate.",
    bots: (count) => `${count} Bots`,
    evidence: (count) => `${count} ${count === 1 ? "source" : "sources"}`,
    verifiedSetup: "Public setup",
    officialExample: "Includes official example",
    namedRoles: (named, total) => named === total ? `${named} roles shown` : `${named} named roles shown · ${total} Bots in source`,
    open: "View team",
    guideEyebrow: "START SMALL",
    guideTitle: "When to add another Bot",
    guideBody: "One Bot is enough for one stable outcome. Add a specialist when a separate lane repeats, then use a group when the handoff must stay visible.",
    guideSteps: [
      { title: "Start with one owner", body: "Give one Bot the result, source rules, and approval boundary." },
      { title: "Split a repeated lane", body: "Add a specialist only when one part keeps needing its own context." },
      { title: "Make the handoff visible", body: "Use a shared group, keep the source attached, and stop before irreversible actions." },
    ],
    guideLink: "Read the official Bot guide",
    teamEyebrow: "BOT TEAM",
    outcomeLabel: "Outcome",
    audienceLabel: "Best for",
    workflowTitle: "Roles & handoffs",
    workflowBody: "The role names come from the public setup when the source named them. The total Bot count follows the source post.",
    handoffLabel: "Handoff",
    templatesTitle: "Matching Templates",
    templatesBody: "Only real Templates already listed on UseGrokBot are linked here.",
    templateOpen: "Open Template",
    setupTitle: "Copy setup",
    setupBody: "Use this as a safe starting point, then replace the examples with your own rules and approved tools.",
    examplesTitle: "Source posts",
    examplesBody: "Read the original posts, authors, dates, and available view counts before copying the setup.",
    otherTitle: "More teams in this category",
    allTeams: "See all Bot Teams",
  },
  "zh-Hant": {
    eyebrow: "真實多 BOT 組隊",
    title: "Grok Bot 團隊",
    body: "瀏覽多 Bot 組隊方法，並直接查看公開來源。",
    count: (teams, _categories, sources, posts) => `${teams} 隊 · ${sources} 篇來源 · 已查看 ${posts.toLocaleString("zh-Hant-HK")} 篇貼文`,
    filterLabel: "篩選 Bot 團隊",
    allFilter: "全部團隊",
    featuredFilter: "精選",
    chooseTitle: "全部 Bot 團隊",
    chooseBody: "先看成果，再看角色和交接方式，建立前可以打開原貼文核對。",
    showing: (count) => `顯示 ${count} 隊`,
    oneBotTitle: "Templates = 一個 Bot",
    oneBotBody: "為一個清楚目的選擇一個幫手。",
    teamTitle: "Bot Teams = 多個 Bot 協作",
    teamBody: "選擇一套有清楚角色、交接方式和人工批准關卡的組隊方法。",
    bots: (count) => `${count} 個 Bot`,
    evidence: (count) => `${count} 篇來源`,
    verifiedSetup: "公開組隊案例",
    officialExample: "包含官方例子",
    namedRoles: (named, total) => named === total ? `顯示 ${named} 個角色` : `顯示 ${named} 個具名角色 · 來源共有 ${total} 個 Bot`,
    open: "查看團隊",
    guideEyebrow: "從小隊開始",
    guideTitle: "何時加入下一個 Bot",
    guideBody: "一個穩定成果可先交給一個 Bot。當某個部分不斷重複，才加入專才；需要看清交接時，再使用群組。",
    guideSteps: [
      { title: "先選一位負責者", body: "把成果、來源規則和批准界線交給一個 Bot。" },
      { title: "拆出重複部分", body: "只有某個部分經常需要獨立背景時，才加入專才。" },
      { title: "讓交接可以看見", body: "使用共同群組、保留來源，任何不可還原操作前都要停下來。" },
    ],
    guideLink: "閱讀官方 Bot 指南",
    teamEyebrow: "BOT 團隊",
    outcomeLabel: "成果",
    audienceLabel: "適合",
    workflowTitle: "角色與交接",
    workflowBody: "如果公開來源有寫角色名稱，這裡會保留原名；Bot 總數以來源貼文為準。",
    handoffLabel: "交接",
    templatesTitle: "相符 Templates",
    templatesBody: "這裡只會連結 UseGrokBot 已經收錄的真實 Templates。",
    templateOpen: "打開 Template",
    setupTitle: "複製組隊方法",
    setupBody: "先把它當成安全起點，再換成你的規則和已批准工具。",
    examplesTitle: "來源貼文",
    examplesBody: "複製前，可以查看原貼文、作者、日期和已有觀看數據。",
    otherTitle: "同分類的其他團隊",
    allTeams: "查看全部 Bot 團隊",
  },
};

function toSimplified(value: string) {
  const pairs = [
    ["與", "与"], ["個", "个"], ["隊", "队"], ["團", "团"], ["協", "协"], ["實", "实"], ["從", "从"],
    ["類", "类"], ["選", "选"], ["這", "这"], ["裡", "里"], ["開", "开"], ["關", "关"], ["給", "给"],
    ["為", "为"], ["員", "员"], ["總", "总"], ["數", "数"], ["據", "据"], ["來", "来"], ["發", "发"],
    ["佈", "布"], ["寫", "写"], ["讓", "让"], ["會", "会"], ["見", "见"], ["還", "还"], ["過", "过"],
    ["將", "将"], ["標", "标"], ["計", "计"], ["劃", "划"], ["時", "时"], ["資", "资"], ["訊", "讯"],
    ["審", "审"], ["歸", "归"], ["檔", "档"], ["護", "护"], ["顧", "顾"], ["問", "问"], ["務", "务"],
    ["庫", "库"], ["風", "风"], ["險", "险"], ["應", "应"], ["購", "购"], ["買", "买"], ["後", "后"],
    ["長", "长"], ["動", "动"], ["復", "复"], ["練", "练"], ["準", "准"], ["備", "备"], ["篩", "筛"],
    ["較", "较"], ["確", "确"], ["認", "认"], ["聲", "声"], ["聯", "联"], ["絡", "络"], ["戶", "户"],
    ["營", "营"], ["銷", "销"], ["產", "产"], ["場", "场"], ["覽", "览"], ["優", "优"], ["繼", "继"],
    ["續", "续"], ["萬", "万"], ["圍", "围"], ["專", "专"], ["業", "业"], ["進", "进"], ["傳", "传"],
    ["統", "统"], ["籌", "筹"], ["匯", "汇"], ["報", "报"], ["異", "异"], ["議", "议"], ["導", "导"],
    ["處", "处"], ["啟", "启"], ["題", "题"], ["觀", "观"], ["測", "测"], ["證", "证"], ["驗", "验"],
    ["創", "创"], ["辦", "办"], ["組", "组"], ["織", "织"], ["圖", "图"], ["貼", "贴"], ["運", "运"],
    ["內", "内"], ["製", "制"], ["餘", "余"], ["頭", "头"], ["調", "调"], ["電", "电"], ["郵", "邮"],
    ["簡", "简"], ["輯", "辑"], ["覺", "觉"], ["學", "学"], ["顯", "显"], ["達", "达"], ["濾", "滤"],
    ["當", "当"], ["際", "际"], ["現", "现"], ["間", "间"], ["經", "经"], ["體", "体"], ["獨", "独"],
    ["層", "层"], ["軟", "软"], ["質", "质"], ["義", "义"], ["術", "术"], ["對", "对"], ["須", "须"],
    ["權", "权"], ["擋", "挡"], ["帳", "账"], ["檢", "检"], ["視", "视"], ["網", "网"], ["頁", "页"],
    ["錯", "错"], ["誤", "误"], ["說", "说"], ["變", "变"], ["節", "节"], ["錄", "录"], ["擬", "拟"],
    ["則", "则"], ["項", "项"], ["樣", "样"], ["離", "离"], ["獲", "获"], ["尋", "寻"], ["觸", "触"],
    ["屬", "属"], ["並", "并"], ["價", "价"], ["徑", "径"], ["殺", "杀"], ["該", "该"], ["輸", "输"],
    ["轉", "转"], ["負", "负"], ["責", "责"], ["線", "线"], ["條", "条"], ["斷", "断"], ["範", "范"],
    ["無", "无"], ["語", "语"], ["氣", "气"], ["刪", "删"], ["減", "减"], ["結", "结"], ["構", "构"],
    ["釋", "释"], ["預", "预"], ["約", "约"], ["監", "监"], ["雜", "杂"], ["記", "记"], ["執", "执"],
    ["環", "环"], ["絕", "绝"], ["驟", "骤"], ["訂", "订"], ["單", "单"], ["貨", "货"], ["課", "课"],
    ["閱", "阅"], ["讀", "读"], ["換", "换"], ["規", "规"], ["領", "领"], ["職", "职"], ["碼", "码"],
    ["決", "决"], ["點", "点"], ["編", "编"], ["設", "设"], ["順", "顺"], ["財", "财"], ["錢", "钱"],
    ["紀", "纪"], ["曆", "历"], ["衝", "冲"], ["詢", "询"], ["請", "请"], ["話", "话"], ["眾", "众"],
    ["畫", "画"], ["廣", "广"], ["適", "适"], ["試", "试"], ["連", "连"], ["敗", "败"], ["況", "况"],
    ["貸", "贷"], ["夠", "够"], ["採", "采"], ["習", "习"], ["艦", "舰"], ["維", "维"], ["潛", "潜"],
    ["費", "费"], ["週", "周"], ["熱", "热"], ["門", "门"], ["贊", "赞"], ["併", "并"], ["區", "区"],
    ["號", "号"], ["蒐", "搜"], ["聞", "闻"], ["蓋", "盖"], ["論", "论"], ["掃", "扫"], ["辯", "辩"],
    ["歷", "历"], ["稅", "税"], ["瀏", "浏"], ["擇", "择"], ["幫", "帮"], ["穩", "稳"], ["稱", "称"],
    ["補", "补"], ["廠", "厂"], ["佇", "伫"], ["雙", "双"], ["討", "讨"],
    ["腳", "脚"], ["鎖", "锁"], ["鉤", "钩"], ["餵", "喂"], ["強", "强"], ["鎮", "镇"],
    ["師", "师"], ["倉", "仓"],
  ] as const;
  const map = new Map<string, string>(pairs);
  return [...value]
    .map((char) => map.get(char) ?? char)
    .join("")
    .replaceAll("营运", "运营")
    .replaceAll("行销与成长", "营销与增长")
    .replaceAll("计画", "计划")
    .replaceAll("贴文", "帖子");
}

function forLocale<T>(locale: Locale, en: T, hant: T, simplify: (value: T) => T): T {
  if (locale === "en") return en;
  if (locale === "zh-Hans") return simplify(hant);
  return hant;
}

function roleName(base: RoleCopy, sourceName: string | undefined, count: number) {
  const sameName = sourceName?.toLowerCase() === base.name.replace(/ bot$/i, "").toLowerCase();
  const name = sourceName && !sameName ? `${sourceName} · ${base.name}` : base.name;
  return count > 1 ? `${name} ×${count}` : name;
}

export function localizeBotTeam(team: BotTeam, locale: Locale): LocalizedBotTeam {
  const source = getDiscoverStory(team.exampleSlugs[0]);
  const localizedSource = source ? localizeDiscoverStory(source, locale) : undefined;
  const outcomeCopy = teamOutcomeCopy[team.slug];
  if (!outcomeCopy) throw new Error(`Missing Bot Team outcome copy: ${team.slug}`);
  const rolesForLocale = locale === "en" ? enRoles : hantRoles;
  const leadIndex = Math.max(0, team.roles.findIndex((role) => role.id === "coordinator" || role.id === "manager"));
  const preliminary = team.roles.map((role, index) => {
    const base = rolesForLocale[role.id];
    const count = role.count ?? 1;
    const name = roleName(base, role.sourceName, count);
    const action = role.action
      ? locale === "en"
        ? role.action.en
        : locale === "zh-Hans"
          ? toSimplified(role.action.zhHant)
          : role.action.zhHant
      : base.action;
    return {
      id: `${role.id}-${index}`,
      roleId: role.id,
      name: locale === "zh-Hans" ? toSimplified(name) : name,
      action: locale === "zh-Hans" ? toSimplified(action) : action,
      count,
    };
  });
  const leadName = preliminary[leadIndex]?.name ?? preliminary[0]?.name ?? "Coordinator";
  const roles = preliminary.map((role, index): LocalizedBotTeamRole => {
    const next = preliminary[index + 1]?.name;
    let handoff: string;
    if (locale === "en") {
      handoff = team.pattern === "pipeline"
        ? next ? `Passes the checked result to ${next}.` : "Returns one review pack and waits for human approval."
        : team.pattern === "hub"
          ? index === leadIndex ? "Assigns one clear lane to each specialist and holds the final approval queue." : `Returns the checked result to ${leadName}.`
          : "Shares the evidence in the group so another Bot can challenge or extend it.";
    } else {
      handoff = team.pattern === "pipeline"
        ? next ? `把核對過的結果交給 ${next}。` : "交回一份審核包，等待人工批准。"
        : team.pattern === "hub"
          ? index === leadIndex ? "為每位專才分配清楚範圍，並集中最後批准清單。" : `把核對過的結果交回 ${leadName}。`
          : "在群組分享證據，讓另一個 Bot 可以補充或提出疑問。";
    }
    return { ...role, handoff: locale === "zh-Hans" ? toSimplified(handoff) : handoff };
  });

  const title = locale === "en" ? team.title : locale === "zh-Hans" ? toSimplified(team.titleZhHant) : team.titleZhHant;
  const outcome = locale === "en"
    ? outcomeCopy.en
    : locale === "zh-Hans"
      ? toSimplified(outcomeCopy["zh-Hant"])
      : outcomeCopy["zh-Hant"];
  const summary = outcome;
  const audience = localizedSource?.usefulFor ?? localizedSource?.whoShouldTry?.join(" · ") ?? "Grok Bot users";
  const roleList = roles.map((role) => role.name).join(locale === "en" ? ", " : "、");
  const setupPrompt = locale === "en"
    ? `Build a ${title} with ${team.botCount} Bots. Roles: ${roleList}. Keep sources with every handoff and ask me before any external action.`
    : `建立「${title}」，共 ${team.botCount} 個 Bot。角色：${roleList}。每次交接保留來源；任何對外操作前先詢問我。`;

  return {
    ...team,
    title,
    summary,
    outcome,
    audience,
    setupPrompt: locale === "zh-Hans" ? toSimplified(setupPrompt) : setupPrompt,
    roles,
  };
}

export function localizeBotTeamCategory(category: BotTeamCategory, locale: Locale): LocalizedBotTeamCategory {
  const item = forLocale(
    locale,
    categoryCopy.en[category.slug],
    categoryCopy["zh-Hant"][category.slug],
    (value) => ({ title: toSimplified(value.title), description: toSimplified(value.description) }),
  );
  return { ...category, ...item };
}

export function botTeamsPageCopy(locale: Locale): BotTeamsPageCopy {
  return forLocale(
    locale,
    pageCopy.en,
    pageCopy["zh-Hant"],
    (value) => ({
      ...value,
      count: (teams, categories, sources, posts) => toSimplified(value.count(teams, categories, sources, posts)),
      eyebrow: toSimplified(value.eyebrow),
      title: toSimplified(value.title),
      body: toSimplified(value.body),
      filterLabel: toSimplified(value.filterLabel),
      allFilter: toSimplified(value.allFilter),
      featuredFilter: toSimplified(value.featuredFilter),
      chooseTitle: toSimplified(value.chooseTitle),
      chooseBody: toSimplified(value.chooseBody),
      showing: (count) => toSimplified(value.showing(count)),
      oneBotTitle: toSimplified(value.oneBotTitle),
      oneBotBody: toSimplified(value.oneBotBody),
      teamTitle: toSimplified(value.teamTitle),
      teamBody: toSimplified(value.teamBody),
      bots: (count) => toSimplified(value.bots(count)),
      evidence: (count) => toSimplified(value.evidence(count)),
      verifiedSetup: toSimplified(value.verifiedSetup),
      officialExample: toSimplified(value.officialExample),
      namedRoles: (named, total) => toSimplified(value.namedRoles(named, total)),
      open: toSimplified(value.open),
      guideEyebrow: toSimplified(value.guideEyebrow),
      guideTitle: toSimplified(value.guideTitle),
      guideBody: toSimplified(value.guideBody),
      guideSteps: value.guideSteps.map((step) => ({ title: toSimplified(step.title), body: toSimplified(step.body) })),
      guideLink: toSimplified(value.guideLink),
      teamEyebrow: toSimplified(value.teamEyebrow),
      outcomeLabel: toSimplified(value.outcomeLabel),
      audienceLabel: toSimplified(value.audienceLabel),
      workflowTitle: toSimplified(value.workflowTitle),
      workflowBody: toSimplified(value.workflowBody),
      handoffLabel: toSimplified(value.handoffLabel),
      templatesTitle: toSimplified(value.templatesTitle),
      templatesBody: toSimplified(value.templatesBody),
      templateOpen: toSimplified(value.templateOpen),
      setupTitle: toSimplified(value.setupTitle),
      setupBody: toSimplified(value.setupBody),
      examplesTitle: toSimplified(value.examplesTitle),
      examplesBody: toSimplified(value.examplesBody),
      otherTitle: toSimplified(value.otherTitle),
      allTeams: toSimplified(value.allTeams),
    }),
  );
}
