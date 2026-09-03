export const verifiedUseCaseCategories = [
  "everyday-life",
  "business-admin",
  "content-communication",
  "research-career",
  "product-engineering",
  "bot-team-management",
] as const;

export type VerifiedUseCaseCategorySlug = (typeof verifiedUseCaseCategories)[number];
export type VerifiedUseCaseEvidence = "prompt" | "setup";
export type VerifiedUseCaseStructure = "single" | "team";

export type LocalizedUseCaseText = {
  en: string;
  zhHant: string;
};

export type VerifiedUseCaseRole = {
  name: string;
  purpose: LocalizedUseCaseText;
};

export type VerifiedUseCase = {
  slug: string;
  rank: number;
  title: LocalizedUseCaseText;
  category: VerifiedUseCaseCategorySlug;
  evidence: VerifiedUseCaseEvidence;
  structure: VerifiedUseCaseStructure;
  primarySourceSlug: string;
  supportingSourceSlugs: readonly string[];
  setupSteps?: readonly LocalizedUseCaseText[];
  teamRoles?: readonly VerifiedUseCaseRole[];
};

export const verifiedUseCases: readonly VerifiedUseCase[] = [
  {
    slug: "shared-bot-wiki",
    rank: 1,
    title: {
      en: "Keep a living wiki for every Bot",
      zhHant: "幫每隻 Bot 建一本活的筆記庫",
    },
    category: "bot-team-management",
    evidence: "setup",
    structure: "team",
    primarySourceSlug: "av1dlive-grok-bot-obsidian-is-basically-superhuman-mode",
    supportingSourceSlugs: [
      "webjuice-ie-we-put-grok-bot-and-hermes-on-one-obsidian-brain",
      "paulkxai-obsidian-grok-bot-is-a-strong-pairing-for-persis",
      "savel007-i-built-a-second-brain-on-grok-bot",
    ],
    setupSteps: [
      {
        en: "Create one Obsidian vault on the Chief of Staff computer, with Home.md as the entrance.",
        zhHant: "在幕僚長的電腦建立一個 Obsidian vault，並以 Home.md 作入口。",
      },
      {
        en: "Create Hunt folders for incoming sources, Ship folders for outputs, plus Wiki and Maps folders.",
        zhHant: "為來源建立 Hunt 資料夾，為產出建立 Ship 資料夾，再加入 Wiki 和 Maps。",
      },
      {
        en: "Give every note a date and folder before anything else happens.",
        zhHant: "每一則筆記先加日期並放進指定資料夾。",
      },
      {
        en: "Keep full files in the assigned folders; return only a short digest in chat.",
        zhHant: "完整檔案留在指定資料夾；對話只接收短摘要。",
      },
      {
        en: "Run the published daily schedule and keep decisions in Wiki/Decisions.",
        zhHant: "按作者公開的每日時間表運行，並把決定存進 Wiki/Decisions。",
      },
      {
        en: "Nothing in the vault may post, pay, or send; the final approval stays human.",
        zhHant: "筆記庫內任何內容都不可自行發布、付款或寄出；最後批准留給人。",
      },
    ],
    teamRoles: [
      {
        name: "Chief of Staff",
        purpose: {
          en: "Owns the vault, the wiki, and the daily note.",
          zhHant: "管理筆記庫、wiki 和每日筆記。",
        },
      },
      {
        name: "Scouts",
        purpose: {
          en: "File research into Hunt without filling the chat.",
          zhHant: "把研究資料存進 Hunt，不把對話塞滿。",
        },
      },
      {
        name: "Performance",
        purpose: {
          en: "Writes performance notes to twitter/live-score.",
          zhHant: "把表現紀錄寫進 twitter/live-score。",
        },
      },
      {
        name: "Staff Engineer",
        purpose: {
          en: "Writes build records into builds/.",
          zhHant: "把建造成果寫進 builds/。",
        },
      },
    ],
  },
  {
    slug: "lease-pdf-review",
    rank: 2,
    title: {
      en: "Fill and sign a PDF, then wait",
      zhHant: "先填好並簽名 PDF，等你看過才寄出",
    },
    category: "everyday-life",
    evidence: "prompt",
    structure: "single",
    primarySourceSlug: "mikepat711-grok-bot-use-case-my-leasing-office-emailed-me-a",
    supportingSourceSlugs: ["pricefoulger-i-am-a-roofing-contractor-and-this-is-how-i-used"],
  },
  {
    slug: "digital-clutter-cleanup",
    rank: 3,
    title: {
      en: "Tidy email, files, and paid subscriptions",
      zhHant: "先整理電郵、檔案和付費訂閱，等你批准才改",
    },
    category: "everyday-life",
    evidence: "prompt",
    structure: "single",
    primarySourceSlug: "petergyang-i-hate-digital-clutter-so-i-set-up-a-marie-kondo",
    supportingSourceSlugs: [
      "scheemunai-newsletter-detox",
      "imranye-grok-bot-passes-the-can-you-clean-up-my-email-an",
      "pfista-grok-bots-ive-made-so-far-email-newsletter-unsub",
      "clear-email-elon",
    ],
  },
  {
    slug: "bot-team-watcher",
    rank: 4,
    title: {
      en: "Watch the rest of your Bots",
      zhHant: "默默看其他 Bot，只把改進建議交給你",
    },
    category: "bot-team-management",
    evidence: "prompt",
    structure: "single",
    primarySourceSlug: "kintsugijin-my-favorite-unusual-grok-bot-i-created-for-grok",
    supportingSourceSlugs: [
      "gippp69-grok-bot-a-second-auditor-bot-is-basically-a-tin",
      "yrzhe-top-grok-bot-agent-grok-bot",
    ],
  },
  {
    slug: "live-page-qa",
    rank: 5,
    title: {
      en: "Open a live webpage and return a QA report",
      zhHant: "自己打開網頁檢查，再交出問題報告",
    },
    category: "product-engineering",
    evidence: "setup",
    structure: "single",
    primarySourceSlug: "chadholder-jumped-into-grok-bot-and-created-an-ai-qa-engine",
    supportingSourceSlugs: [
      "bug-reproduction-xai",
      "harrytandy-cursors-lauren-tan-i-wanted-to-figure-out-how-wo",
    ],
    setupSteps: [
      {
        en: "Give the Bot the live webpage you want reviewed.",
        zhHant: "把要檢查的真實網頁交給 Bot。",
      },
      {
        en: "Let it open the page in its cloud computer and browse the experience itself.",
        zhHant: "讓它在雲端電腦自行打開並瀏覽整個頁面。",
      },
      {
        en: "Ask for one report covering SEO, accessibility, forms, UX, and content consistency.",
        zhHant: "請它用一份報告列出 SEO、無障礙、表單、UX 和內容一致性的問題。",
      },
    ],
  },
  {
    slug: "amazon-cart-builder",
    rank: 6,
    title: {
      en: "Fill your Amazon cart, never check out",
      zhHant: "把常買的東西放進 Amazon 購物車，結帳留給你",
    },
    category: "everyday-life",
    evidence: "prompt",
    structure: "single",
    primarySourceSlug: "teslaconomics-i-just-created-the-worlds-best-amazon-cart-grok",
    supportingSourceSlugs: [
      "sanjeed-i-just-got-my-grok-bot-to-research-and-place-order",
      "joenapieralamd-yesterday-i-set-up-bot-to-do-my-online-grocery-s",
    ],
  },
  {
    slug: "home-chef",
    rank: 7,
    title: {
      en: "Turn a dish into a shopping list and cooking steps",
      zhHant: "說一道菜和人數，就得到採買清單和烹調步驟",
    },
    category: "everyday-life",
    evidence: "prompt",
    structure: "single",
    primarySourceSlug: "teslaconomics-i-just-made-the-worlds-best-chef-grok-bot",
    supportingSourceSlugs: ["joenapieralamd-yesterday-i-set-up-bot-to-do-my-online-grocery-s"],
  },
  {
    slug: "photo-reminder-board",
    rank: 8,
    title: {
      en: "Keep a reminder board with its photos",
      zhHant: "用對話記下提醒，連照片一起在鬧鐘時交回",
    },
    category: "everyday-life",
    evidence: "prompt",
    structure: "single",
    primarySourceSlug: "teslaconomics-i-just-created-the-worlds-best-grok-bot-reminder",
    supportingSourceSlugs: [
      "damonchen-i-have-a-reminder-bot-on-grok-bot-it-might-be-th",
      "damonchen-my-simple-reminder-bot",
    ],
  },
  {
    slug: "x-following-cleanup",
    rank: 9,
    title: {
      en: "Sort X follows before you unfollow",
      zhHant: "先把 X 追蹤名單分類，等你批准才取消追蹤",
    },
    category: "content-communication",
    evidence: "prompt",
    structure: "single",
    primarySourceSlug: "kloss-xyz-600-yr-is-too-pricey-for-social-analytics-circle",
    supportingSourceSlugs: ["musaabhq-grok-bot-bot-helped-me-unfollow-inactive-account"],
  },
  {
    slug: "rent-payment-check",
    rank: 10,
    title: {
      en: "Check rent deposits against the lease",
      zhHant: "對照租約和銀行入帳，看房租有沒有遲、短、漏",
    },
    category: "business-admin",
    evidence: "prompt",
    structure: "single",
    primarySourceSlug: "teslaconomics-my-mind-is-honestly-blown-by-what-i-just-got-my",
    supportingSourceSlugs: [
      "therentalpro-i-just-built-a-complete-ai-rent-tracking-system",
      "ceo-desk-teslaconomics",
    ],
  },
  {
    slug: "best-tools-outreach",
    rank: 11,
    title: {
      en: "Find best-tools pages and draft outreach",
      zhHant: "找出已在排名的工具榜，起草合作信，先不寄出",
    },
    category: "content-communication",
    evidence: "prompt",
    structure: "single",
    primarySourceSlug: "virgilerietsch-heres-a-cool-bot-use-case-i-asked-grok-bot-to-fi",
    supportingSourceSlugs: [],
  },
  {
    slug: "army-pubs-research",
    rank: 12,
    title: {
      en: "Answer only from official Army publications",
      zhHant: "只准查官方條文，並標出條號、頁碼和矛盾之處",
    },
    category: "research-career",
    evidence: "setup",
    structure: "single",
    primarySourceSlug: "eodhappycaptain-i-just-created-my-first-ai-agent-with-bot-and-it",
    supportingSourceSlugs: [],
    setupSteps: [
      {
        en: "Limit the Bot to Army Pubs, the official Army regulations repository.",
        zhHant: "把 Bot 的資料來源限制在官方 Army Pubs。",
      },
      {
        en: "Require the regulation, page, paragraph, and line for every answer.",
        zhHant: "每個答案都要列出條文、頁碼、段落和行數。",
      },
      {
        en: "Require it to flag any regulation that contradicts the answer.",
        zhHant: "如有其他條文互相矛盾，必須一併標出。",
      },
      {
        en: "Double-check the cited lines yourself.",
        zhHant: "最後由你核對它引用的原文。",
      },
    ],
  },
  {
    slug: "job-feed-watcher",
    rank: 13,
    title: {
      en: "Watch a job feed and archive new listings",
      zhHant: "定時查看職缺資訊流，有新的才存檔並通知你",
    },
    category: "research-career",
    evidence: "setup",
    structure: "single",
    primarySourceSlug: "techking-007-for-all-the-designers-editors-agency-owners-obse",
    supportingSourceSlugs: [],
    setupSteps: [
      {
        en: "Check the public Contra feed every six hours.",
        zhHant: "每六小時查看一次 Contra 公開資訊流。",
      },
      {
        en: "Archive each listing in Notion before it disappears from the free feed.",
        zhHant: "在免費資訊流消失前，把每個職缺存進 Notion。",
      },
      {
        en: "Email only when a listing is new or has just closed.",
        zhHant: "只有職缺新增或剛關閉時才寄出通知。",
      },
    ],
  },
  {
    slug: "draft-only-communications",
    rank: 14,
    title: {
      en: "Draft every message, send nothing",
      zhHant: "先寫好要發的文字，沒有你點頭就不寄、不發",
    },
    category: "content-communication",
    evidence: "prompt",
    structure: "single",
    primarySourceSlug: "teslastars-voici-herme-s-mon-cinquie-me-grok-bot-en-charge",
    supportingSourceSlugs: [
      "anushkaa1407-grok-bot-for-socials-is-really-good-i-set-up-4-a",
      "newsletter-to-social-remy",
    ],
  },
  {
    slug: "side-by-side-video",
    rank: 15,
    title: {
      en: "Make one publishable video from two clips",
      zhHant: "把兩段素材做成一段可發布影片",
    },
    category: "content-communication",
    evidence: "setup",
    structure: "single",
    primarySourceSlug: "spessforce1701-the-special-part-about-this-post-is-that-i-gave",
    supportingSourceSlugs: [
      "xfreeze-made-a-best-video-editor-bot-for-you-give-it-you",
      "bstarr119-grok-bot-video-editing-skill-let-me-know-if-youd",
      "farzyness-heres-my-youtube-shorts-auto-clipper-grok-bot-wh",
    ],
    setupSteps: [
      {
        en: "Give the Bot links to two videos on X.",
        zhHant: "把 X 上兩段影片的連結交給 Bot。",
      },
      {
        en: "Ask it to place the videos side by side in one clip.",
        zhHant: "請它把兩段影片並排剪成一條影片。",
      },
      {
        en: "Ask it to add captions to the finished clip.",
        zhHant: "請它為完成的影片加入字幕。",
      },
    ],
  },
  {
    slug: "bug-to-pull-request",
    rank: 16,
    title: {
      en: "Turn a bug into a pull request",
      zhHant: "你說哪裡壞了，它請雲端工程 Bot 改好並交出 pull request",
    },
    category: "product-engineering",
    evidence: "setup",
    structure: "team",
    primarySourceSlug: "rustamatuev-built-a-patch-engineer-on-grok-bot-after-poteto",
    supportingSourceSlugs: [
      "ksredelinghuys-grok-bot-being-able-to-call-cursor-ai-cloud-agen",
      "poteto-this-is-a-huge-release",
      "harrytandy-cursors-lauren-tan-i-wanted-to-figure-out-how-wo",
    ],
    setupSteps: [
      {
        en: "Connect the repository and Cursor Cloud Agent to the Patch Engineer.",
        zhHant: "把程式庫和 Cursor Cloud Agent 連接到 Patch Engineer。",
      },
      {
        en: "Describe the bug, where it appears, and the result you expect.",
        zhHant: "說明問題、出現位置和你期望的結果。",
      },
      {
        en: "Keep every code change in the cloud branch, never on your Mac or inside chat.",
        zhHant: "所有修改只可留在雲端分支，不可打開你的 Mac，也不可在對話內改程式。",
      },
      {
        en: "You read the diff and decide whether to merge it.",
        zhHant: "你查看修改內容，再決定是否合併。",
      },
    ],
    teamRoles: [
      {
        name: "Patch Engineer",
        purpose: {
          en: "Turns the report into a bounded request and hands it to the cloud agent.",
          zhHant: "把問題整理成清楚範圍，再交給雲端 agent。",
        },
      },
      {
        name: "Cursor Cloud Agent",
        purpose: {
          en: "Patches and tests the cloud branch, then opens a pull request.",
          zhHant: "在雲端分支修改及測試，然後建立 pull request。",
        },
      },
    ],
  },
  {
    slug: "credit-card-benefits-audit",
    rank: 17,
    title: {
      en: "Audit spending against cards you already have",
      zhHant: "檢查消費有沒有刷錯卡，以及年費權益有沒有浪費",
    },
    category: "business-admin",
    evidence: "setup",
    structure: "team",
    primarySourceSlug: "chuckcook-i-asked-grok-bot-to-audit-my-credit-cards",
    supportingSourceSlugs: [
      "congressdj-todays-simple-grok-bot-task-go-in-and-lower-my-a",
      "xskiffman-im-thoroughly-impressed-with-the-new-grok-bot",
    ],
    setupSteps: [
      {
        en: "Use Captain as the only Bot that talks to you.",
        zhHant: "只讓 Captain 直接和你對話。",
      },
      {
        en: "Use read-only Plaid data and never show account numbers.",
        zhHant: "Plaid 只可讀取資料，而且不可顯示帳號。",
      },
      {
        en: "Use only the official Chase and Amex pages for current benefits.",
        zhHant: "最新權益只可採用 Chase 和 Amex 官方頁面。",
      },
      {
        en: "Run monthly and return one list of mismatched spending and unused benefits.",
        zhHant: "每月運行一次，只交出刷錯卡和未使用權益的清單。",
      },
      {
        en: "Never post or apply for a new card without approval.",
        zhHant: "沒有批准，不可發布內容或申請新卡。",
      },
    ],
    teamRoles: [
      {
        name: "Captain",
        purpose: {
          en: "Combines the spending and benefits findings into one monthly recap.",
          zhHant: "把消費和權益結果合成一份每月總結。",
        },
      },
      {
        name: "Spendy",
        purpose: {
          en: "Reads the posted transactions through Plaid.",
          zhHant: "經 Plaid 讀取已入帳交易。",
        },
      },
      {
        name: "Researchy",
        purpose: {
          en: "Checks current card benefits on the official pages.",
          zhHant: "在官方頁面核對最新信用卡權益。",
        },
      },
    ],
  },
  {
    slug: "money-leak-recovery",
    rank: 18,
    title: {
      en: "Find money leaks, then wait for approval",
      zhHant: "找出正在流失的錢，寫好草稿，等你批准才行動",
    },
    category: "business-admin",
    evidence: "setup",
    structure: "team",
    primarySourceSlug: "0xfuckpoverty-day-1-of-14",
    supportingSourceSlugs: [
      "0xfuckpoverty-day-2-of-14",
      "0xfuckpoverty-elons-grok-bot-runs-a-six-person-back-office-for",
      "support-refunds-gergely-orosz",
    ],
    setupSteps: [
      {
        en: "Create one shared evidence table for receipts, charges, amounts, dates, and source links.",
        zhHant: "用同一份證據表記錄收據、交易、金額、日期和來源連結。",
      },
      {
        en: "Pass an item forward only after the previous evidence field is complete.",
        zhHant: "上一項證據齊全後，才可把項目交給下一隻 Bot。",
      },
      {
        en: "Run the review overnight, but block sending, cancelling, disputes, and card access.",
        zhHant: "晚上自動核對，但不可寄出、取消、提出爭議或接觸信用卡。",
      },
      {
        en: "Make every final decision from one approval queue.",
        zhHant: "所有最後決定都由你在同一份批准清單處理。",
      },
    ],
    teamRoles: [
      { name: "SWEEP", purpose: { en: "Reads receipts, invoices, and confirmations.", zhHant: "讀取收據、發票和確認信。" } },
      { name: "MATCH", purpose: { en: "Links each item to its statement charge.", zhHant: "把每一項對回帳單交易。" } },
      { name: "PRICE", purpose: { en: "Decides whether an item is worth pursuing.", zhHant: "判斷每一項是否值得追討。" } },
      { name: "DRAFT", purpose: { en: "Writes the cancellation, follow-up, or claim.", zhHant: "起草取消、追討或索償內容。" } },
      { name: "VETO", purpose: { en: "Rejects anything without proof and takes no action.", zhHant: "淘汰沒有證據的項目，而且不會自行行動。" } },
      { name: "CHIEF", purpose: { en: "Puts approved evidence into one review queue.", zhHant: "把通過核對的項目放進一個審核清單。" } },
    ],
  },
  {
    slug: "local-contractor-quotes",
    rank: 19,
    title: {
      en: "Find contractors who serve your address",
      zhHant: "找到真正服務你所在地的承辦商",
    },
    category: "everyday-life",
    evidence: "setup",
    structure: "single",
    primarySourceSlug: "antoniourbinajr-i-didnt-shop-gutters-this-afternoon",
    supportingSourceSlugs: ["calendar-booking-yunta-tsai"],
    setupSteps: [
      {
        en: "Sign in to Thumbtack yourself.",
        zhHant: "先由你親自登入 Thumbtack。",
      },
      {
        en: "Let the Bot find contractors who actually serve your ZIP code.",
        zhHant: "讓 Bot 找出真正服務你郵遞區號的承辦商。",
      },
      {
        en: "Let it write the request, then wait for your approval.",
        zhHant: "讓它寫好詢問內容，再等你批准。",
      },
      {
        en: "Send only after you press yes.",
        zhHant: "只有你按下同意後才寄出。",
      },
    ],
  },
  {
    slug: "bookmarks-to-post",
    rank: 20,
    title: {
      en: "Turn today's bookmarks into one post",
      zhHant: "每天整理當天收藏，寫成一則可以直接複製去發的貼文",
    },
    category: "content-communication",
    evidence: "setup",
    structure: "single",
    primarySourceSlug: "iamtonyzhu-x-2",
    supportingSourceSlugs: ["ryan-staley1-i-had-140-bookmarks-from-the-last-30-days"],
    setupSteps: [
      {
        en: "Scan only the new X bookmarks from that day.",
        zhHant: "每天只查看當天新增的 X 收藏。",
      },
      {
        en: "Group them by topic and choose the strongest thread.",
        zhHant: "按主題分類，再挑出最值得發的一條主線。",
      },
      {
        en: "Draft one post using the fixed hook, numbers, counterpoint, and next-action format.",
        zhHant: "按固定格式寫成一則貼文，包括開頭、數字、反直覺觀點和下一步。",
      },
      {
        en: "Keep every original link with the draft.",
        zhHant: "草稿必須保留每個原始連結。",
      },
      {
        en: "You still decide what deserves publishing.",
        zhHant: "最後仍由你決定哪一則值得發布。",
      },
    ],
  },
  {
    slug: "bulk-patent-pdfs",
    rank: 21,
    title: {
      en: "Download a patent library as PDFs",
      zhHant: "把大量專利逐筆存成 PDF，再交給你歸檔",
    },
    category: "research-career",
    evidence: "setup",
    structure: "single",
    primarySourceSlug: "jackprescottx-i-tasked-grok-bot-with-pulling-a-pdf-of-every-pl",
    supportingSourceSlugs: [],
    setupSteps: [
      {
        en: "Ask for every patent tied to the company, going back to the chosen year.",
        zhHant: "指定公司和年份，要求找出該公司自那年起的全部專利。",
      },
      {
        en: "Let the Bot pull each filing and convert it into an individual PDF.",
        zhHant: "讓 Bot 逐筆下載並轉成獨立 PDF。",
      },
      {
        en: "Drag the finished files into your own archive.",
        zhHant: "把完成的檔案拖進你自己的資料庫。",
      },
    ],
  },
  {
    slug: "github-canary",
    rank: 22,
    title: {
      en: "Watch public repositories before the announcement",
      zhHant: "盯公開程式庫的提交，在公司發稿前先看出變化",
    },
    category: "product-engineering",
    evidence: "setup",
    structure: "team",
    primarySourceSlug: "dunik-7-every-company-announces-on-github-before-it-anno",
    supportingSourceSlugs: ["competitor-monitor-jellypod"],
    setupSteps: [
      {
        en: "Choose the public repositories and define which changes count as a signal.",
        zhHant: "選定公開程式庫，並列明哪些變化才算重要訊號。",
      },
      {
        en: "Use a fixed six-stage handoff and do not let any commit skip a stage.",
        zhHant: "所有提交都要依固定六步交接，不可跳過任何角色。",
      },
      {
        en: "Reject any claim that lacks a file path, diff, and commit SHA.",
        zhHant: "缺少檔案路徑、diff 或 commit SHA 的說法一律不可採用。",
      },
      {
        en: "Keep delivery blocked until you decide whether the alert should be sent.",
        zhHant: "提示是否寄出，只可由你最後決定。",
      },
    ],
    teamRoles: [
      { name: "WATCH", purpose: { en: "Syncs the repository mirror when a new push appears.", zhHant: "出現新 push 時同步程式庫副本。" } },
      { name: "DIFF", purpose: { en: "Reads what changed in the code.", zhHant: "查看程式實際改了什麼。" } },
      { name: "CROSS", purpose: { en: "Connects a change to people and related repositories.", zhHant: "把變化連到相關人物和其他程式庫。" } },
      { name: "CLOCK", purpose: { en: "Compares the change with past release timing.", zhHant: "拿這次變化和過往發布時間比較。" } },
      { name: "SCRIBE", purpose: { en: "Packages the evidence so every claim can be traced.", zhHant: "整理證據，讓每項說法都可以追查。" } },
      { name: "EDITOR", purpose: { en: "Turns approved evidence into a concise alert.", zhHant: "把已核對的證據寫成簡短提示。" } },
    ],
  },
  {
    slug: "weekly-receipt-reconciliation",
    rank: 23,
    title: {
      en: "Match this week's charges to receipts",
      zhHant: "把本週刷卡和收據對上，只交出需要你看的交易",
    },
    category: "business-admin",
    evidence: "prompt",
    structure: "single",
    primarySourceSlug: "siyabuilt-i-automated-basically-all-of-my-companys-finance",
    supportingSourceSlugs: ["expense-manager-xai"],
  },
  {
    slug: "family-sports-calendar",
    rank: 24,
    title: {
      en: "Prevent conflicts between both kids' games",
      zhHant: "避免兩個孩子的比賽撞期",
    },
    category: "everyday-life",
    evidence: "setup",
    structure: "single",
    primarySourceSlug: "tslashareholder-okay-i-found-a-good-use-for-grok-bot-that-didnt",
    supportingSourceSlugs: [
      "jonbbc-techgeek-for-any-of-those-that-are-preparing-for-their-ki",
      "parents-bot-yunta-tsai",
      "melissawasser-grok-bot-use-case-for-all-the-philly-wives-out-t",
    ],
    setupSteps: [
      {
        en: "Give the Bot both children's game schedules.",
        zhHant: "把兩個孩子的比賽時間表交給 Bot。",
      },
      {
        en: "Add how long your family usually needs to leave the house and warm up.",
        zhHant: "加入全家出門和賽前熱身所需時間。",
      },
      {
        en: "Put every game and leave-by time into the calendar, then flag conflicts and missed time.",
        zhHant: "把比賽和最遲出門時間放進行事曆，再標出撞期和會錯過的部分。",
      },
      {
        en: "Check again on Wednesday and the day before each game for changes.",
        zhHant: "每場比賽前的星期三和前一天再檢查有沒有變動。",
      },
    ],
  },
  {
    slug: "resume-interview-prep",
    rank: 25,
    title: {
      en: "Manage a job search with five specialized Bots",
      zhHant: "用五隻 Bot 管理求職進度",
    },
    category: "research-career",
    evidence: "setup",
    structure: "team",
    primarySourceSlug: "y3510x-i-didnt-just-use-ai-to-apply-to-jobs",
    supportingSourceSlugs: [
      "aminetx-grok-searched-my-gmail-for-the-re-sume-i-sent-to",
      "bryce-porter9-using-bot-and-grok-to-apply-to-tesla-again",
    ],
    setupSteps: [
      {
        en: "Use Notion as the source of truth for every opportunity.",
        zhHant: "以 Notion 作為所有求職機會的唯一資料來源。",
      },
      {
        en: "Create separate Bots for queue, review, application, resume, and status.",
        zhHant: "為名單、審核、申請、履歷和進度建立獨立 Bot。",
      },
      {
        en: "Write explicit failure rules and keep the process as a closed learning loop.",
        zhHant: "寫清楚失敗時怎樣處理，並讓整個流程可以持續改進。",
      },
      {
        en: "At the interview stage, retrieve the exact submitted resume from Gmail and compare it with the job posting.",
        zhHant: "進入面試階段後，從 Gmail 找回已寄出的履歷，再與職缺逐項對照。",
      },
      {
        en: "Create personalized interview notes and mock questions from that comparison.",
        zhHant: "根據對照結果製作個人化面試重點和模擬問題。",
      },
    ],
    teamRoles: [
      { name: "Queue", purpose: { en: "Keeps the opportunity list and next step current.", zhHant: "更新機會名單和下一步。" } },
      { name: "Review", purpose: { en: "Checks fit before an application moves forward.", zhHant: "申請前先核對職缺是否合適。" } },
      { name: "Apply", purpose: { en: "Prepares the application for your approval.", zhHant: "整理申請內容，交給你確認。" } },
      { name: "Resume", purpose: { en: "Links the exact submitted resume to each employer.", zhHant: "把已寄出的履歷連到對應公司。" } },
      { name: "Status", purpose: { en: "Updates the current stage of every application.", zhHant: "更新每項申請的目前進度。" } },
    ],
  },
  {
    slug: "lenny-archive-advisor",
    rank: 26,
    title: {
      en: "Ask Lenny's archive a product question",
      zhHant: "直接問 Lenny 的節目和電子報存檔",
    },
    category: "research-career",
    evidence: "prompt",
    structure: "single",
    primarySourceSlug: "lennybot-lenny-rachitsky",
    supportingSourceSlugs: [],
  },
  {
    slug: "remote-mower",
    rank: 27,
    title: {
      en: "Start and dock a mower from far away",
      zhHant: "在遠處啟動割草機器人，再叫它回充電座",
    },
    category: "everyday-life",
    evidence: "setup",
    structure: "single",
    primarySourceSlug: "remote-mower-sawyer-merritt",
    supportingSourceSlugs: ["household-bots-blake-king"],
    setupSteps: [
      {
        en: "Ask an Engineer Bot to connect to the Navimow robotic mower.",
        zhHant: "請 Engineer Bot 連接 Navimow 割草機器人。",
      },
      {
        en: "Let it complete the connection setup, which the source says took about two minutes.",
        zhHant: "讓它完成連接設定；來源表示大約用了兩分鐘。",
      },
      {
        en: "Send a start command from away from home.",
        zhHant: "在離家時發出開始割草指令。",
      },
      {
        en: "Send the mower back to its dock when finished.",
        zhHant: "完成後叫割草機回到充電座。",
      },
    ],
  },
  {
    slug: "founder-org-chart",
    rank: 28,
    title: {
      en: "Run a founder org chart with a morning standup",
      zhHant: "用組織圖分派 Bot，每天早上開站會",
    },
    category: "bot-team-management",
    evidence: "setup",
    structure: "team",
    primarySourceSlug: "ridark-eth-i-gave-elon-musks-new-grok-bot-an-org-chart-inst",
    supportingSourceSlugs: [
      "alexfinn-you-need-to-do-this-with-grok-bot-probably-my-fa",
      "mustafaergisi-daily-scrum-in-one-grok-bot-room",
      "one-person-company-rahul",
      "five-bots-peter-yang",
      "nykdotdev-one-bot",
      "debs-obrien-i-have-a-new-chief-of-staff-in-bot-i-simply-put",
    ],
    setupSteps: [
      {
        en: "Make Atlas, the Chief of Staff, the only Bot that talks to you directly.",
        zhHant: "把幕僚長 Atlas 設成唯一直接和你對話的 Bot。",
      },
      {
        en: "Use one group chat per outcome, with Atlas in every group.",
        zhHant: "每個目標使用一個群組對話，Atlas 必須在每個群組內。",
      },
      {
        en: "End every charter with a clear list of actions that require approval.",
        zhHant: "每份角色規則最後都要列明哪些操作必須先批准。",
      },
      {
        en: "Demonstrate the complete flow once on screen instead of describing it only in text.",
        zhHant: "在畫面完整示範一次流程，不要只用文字描述。",
      },
      {
        en: "In the daily standup, cover yesterday, this week's goal, current progress, and one move for today.",
        zhHant: "每日站會只談昨天完成了什麼、本週目標、目前進度，以及今天的一個行動。",
      },
      {
        en: "End with each executive offering feedback and help to the others.",
        zhHant: "最後由每位主管提出意見，並說明可以怎樣幫助其他主管。",
      },
    ],
    teamRoles: [
      { name: "Atlas", purpose: { en: "Splits outcomes, delegates, and keeps the approval queue.", zhHant: "拆分目標、分派各 Bot，並集中批准清單。" } },
      { name: "Scout", purpose: { en: "Finds verified prospects and keeps the source.", zhHant: "找出已核對的潛在客戶，並保留來源。" } },
      { name: "Quill", purpose: { en: "Turns the week's learning into draft content.", zhHant: "把每週所得寫成內容草稿。" } },
      { name: "Pitch", purpose: { en: "Writes short outreach drafts for approved prospects.", zhHant: "為已確認的潛在客戶起草簡短聯絡內容。" } },
      { name: "Vault", purpose: { en: "Sorts the inbox and routes each item.", zhHant: "整理收件匣，並把每項內容分到正確位置。" } },
      { name: "Ledger", purpose: { en: "Reports what moved and the next number to watch.", zhHant: "報告有什麼變化，以及下一個要看的數字。" } },
    ],
  },
];

const bySlug = new Map(verifiedUseCases.map((item) => [item.slug, item]));

export function getVerifiedUseCase(slug: string) {
  return bySlug.get(slug);
}
