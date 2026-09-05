import type { Locale } from "@/lib/i18n/types";

export const bookmarkSources = ["github", "x", "youtube"] as const;

export type BookmarkSource = (typeof bookmarkSources)[number];
export type BookmarkLanguage = "zh" | "en" | "bilingual";

type LocalizedText = Record<Locale, string>;

export type BookmarkXAuthor = {
  name: string;
  handle: string;
};

export type BookmarkItem = {
  id: string;
  source: Exclude<BookmarkSource, "x">;
  url: string;
  author: string;
  xAuthor?: BookmarkXAuthor;
  language: BookmarkLanguage;
  title: LocalizedText;
  description: LocalizedText;
  focus: LocalizedText;
};

export type LocalizedBookmarkItem = Omit<
  BookmarkItem,
  "title" | "description" | "focus"
> & {
  title: string;
  description: string;
  focus: string;
};

export type BookmarkUiCopy = {
  title: string;
  intro: string;
  navLabel: string;
  count: string;
  sourceCards: Record<BookmarkSource, { title: string; body: string }>;
  xChineseTitle: string;
  xEnglishTitle: string;
  xJapaneseTitle: string;
  by: string;
  openGithub: string;
  openYoutube: string;
  viewsLabel: string;
  language: Record<BookmarkLanguage, string>;
  note: string;
};

export const bookmarkUiCopy: Record<Locale, BookmarkUiCopy> = {
  en: {
    title: "Grok Bot Bookmarks",
    intro: "The best GitHub guides, X articles, and YouTube tutorials in one place.",
    navLabel: "Bookmark source",
    count: "{n} bookmarks",
    sourceCards: {
      github: { title: "GitHub", body: "Open books, practical handbooks, and complete playbooks." },
      x: { title: "X Views", body: "Long-form X articles ranked by public view counts." },
      youtube: { title: "YouTube", body: "Setup walkthroughs, demos, and real Grok Bot use cases." },
    },
    xChineseTitle: "Chinese tutorial articles by X views",
    xEnglishTitle: "Top 20 English articles by X views",
    xJapaneseTitle: "Japanese articles by X views",
    by: "By",
    openGithub: "Open on GitHub",
    openYoutube: "Watch on YouTube",
    viewsLabel: "X views",
    language: { zh: "Chinese", en: "English", bilingual: "Chinese + English" },
    note: "The main button on every card opens the original source. GitHub and YouTube links are selected by relevance; X articles are ranked only by public X views.",
  },
  "zh-Hant": {
    title: "Grok Bot 書籤",
    intro: "把值得閱讀的 GitHub 指南、X 長文及 YouTube 教學集中在一頁。",
    navLabel: "書籤來源",
    count: "{n} 個書籤",
    sourceCards: {
      github: { title: "GitHub", body: "開源書籍、實用手冊及完整玩法指南。" },
      x: { title: "X Views", body: "按公開瀏覽次數排列的 X 長文。" },
      youtube: { title: "YouTube", body: "安裝示範、入門影片及真實使用案例。" },
    },
    xChineseTitle: "中文教學文章 X 瀏覽排行",
    xEnglishTitle: "英文文章 X 瀏覽 Top 20",
    xJapaneseTitle: "日文文章 X 瀏覽排行",
    by: "作者",
    openGithub: "在 GitHub 開啟",
    openYoutube: "在 YouTube 觀看",
    viewsLabel: "X 瀏覽",
    language: { zh: "中文", en: "英文", bilingual: "中英雙語" },
    note: "每張卡片的主要按鈕都會開啟原始來源。GitHub 與 YouTube 內容按實用程度精選；X 長文只按公開瀏覽次數排列。",
  },
  "zh-Hans": {
    title: "Grok Bot 书签",
    intro: "把值得阅读的 GitHub 指南、X 长文和 YouTube 教程集中在一页。",
    navLabel: "书签来源",
    count: "{n} 个书签",
    sourceCards: {
      github: { title: "GitHub", body: "开源书籍、实用手册和完整玩法指南。" },
      x: { title: "X Views", body: "按公开浏览次数排列的 X 长文。" },
      youtube: { title: "YouTube", body: "安装演示、入门视频和真实使用案例。" },
    },
    xChineseTitle: "中文教程文章 X 浏览排行",
    xEnglishTitle: "英文文章 X 浏览 Top 20",
    xJapaneseTitle: "日文文章 X 浏览排行",
    by: "作者",
    openGithub: "在 GitHub 打开",
    openYoutube: "在 YouTube 观看",
    viewsLabel: "X 浏览",
    language: { zh: "中文", en: "英文", bilingual: "中英双语" },
    note: "每张卡片的主要按钮都会打开原始来源。GitHub 和 YouTube 内容按实用程度精选；X 长文只按公开浏览次数排列。",
  },
  ja: {
    title: "Grok Bot ブックマーク",
    intro: "役立つ GitHub ガイド、X の長文、YouTube の使い方を、このページにまとめています。",
    navLabel: "ブックマークの出典",
    count: "{n} 件のブックマーク",
    sourceCards: {
      github: { title: "GitHub", body: "公開されている本、実践ハンドブック、一通りの進め方。" },
      x: { title: "X 閲覧", body: "公開の閲覧数で並べた X の長文。" },
      youtube: { title: "YouTube", body: "初期設定、実演、実際の使い方の動画。" },
    },
    xChineseTitle: "中国語チュートリアル（X 閲覧数順）",
    xEnglishTitle: "英語記事の X 閲覧数 上位20件",
    xJapaneseTitle: "日本語記事の X 閲覧数順",
    by: "作者",
    openGithub: "GitHub で開く",
    openYoutube: "YouTube で見る",
    viewsLabel: "X 閲覧",
    language: { zh: "中国語", en: "英語", bilingual: "中国語と英語" },
    note: "各カードの主なボタンは、元の出典を開きます。GitHub と YouTube は役立つものを選んでいます。X の長文は、公開の閲覧数だけで並べています。",
  },
};

export const githubBookmarks: readonly BookmarkItem[] = [
  {
    id: "grok-bot-orange-book",
    source: "github",
    url: "https://github.com/KinGao294/grok-bot-orange-book",
    author: "KinGao294",
    xAuthor: { name: "Kin", handle: "KinGao476942" },
    language: "zh",
    title: { en: "Grok Bot Orange Book", "zh-Hant": "Grok Bot 橙皮書", "zh-Hans": "Grok Bot 橙皮书", ja: "Grok Bot オレンジブック" },
    description: {
      en: "A Chinese guide from first setup to multi-Bot teams, routines, and saving usage.",
      "zh-Hant": "由第一次設定開始，逐步介紹多 Bot 團隊、例行任務及節省用量的方法。",
      "zh-Hans": "从第一次设置开始，逐步介绍多 Bot 团队、例行任务和节省用量的方法。",
      ja: "最初の設定から、複数 Bot のチーム、ルーチン、使用量の節約までを順に説明する中国語ガイド。",
    },
    focus: { en: "Beginner to advanced", "zh-Hant": "入門至進階", "zh-Hans": "入门至进阶", ja: "入門から応用まで" },
  },
  {
    id: "grok-bot-blue-book",
    source: "github",
    url: "https://github.com/rockyzhuo/grok-bot-blue-book",
    author: "rockyzhuo",
    language: "zh",
    title: { en: "Grok Bot Blue Book", "zh-Hant": "Grok Bot 藍皮書", "zh-Hans": "Grok Bot 蓝皮书", ja: "Grok Bot ブルーブック" },
    description: {
      en: "An advanced operating handbook for coordinating a team of Bots with clear handoffs.",
      "zh-Hant": "較進階的團隊管理手冊，教你安排多隻 Bot 並建立清楚的交接方法。",
      "zh-Hans": "较进阶的团队管理手册，教你安排多只 Bot 并建立清楚的交接方法。",
      ja: "複数の Bot を役割ごとに分け、引き継ぎをはっきりさせる上級向けの運営ハンドブック。",
    },
    focus: { en: "Multi-Bot teams", "zh-Hant": "多 Bot 團隊", "zh-Hans": "多 Bot 团队", ja: "複数 Bot のチーム" },
  },
  {
    id: "grok-bot-agent-handbook",
    source: "github",
    url: "https://github.com/DuckRaiser/grok-bot-agent-handbook",
    author: "DuckRaiser",
    language: "zh",
    title: {
      en: "Grok Bot Agents Practical Handbook",
      "zh-Hant": "Grok Bot Agents 實戰手冊",
      "zh-Hans": "Grok Bot Agents 实战手册",
      ja: "Grok Bot Agents 実践ハンドブック",
    },
    description: {
      en: "A ten-step Chinese handbook about roles, approval boundaries, routines, and team reviews.",
      "zh-Hant": "十步中文手冊，整理角色、批准界線、例行任務及團隊檢討方法。",
      "zh-Hans": "十步中文手册，整理角色、批准界线、例行任务和团队复盘方法。",
      ja: "役割、承認の範囲、ルーチン、チームでの振り返りを10の手順でまとめた中国語ハンドブック。",
    },
    focus: { en: "Team playbook", "zh-Hant": "團隊玩法", "zh-Hans": "团队玩法", ja: "チームの進め方" },
  },
  {
    id: "learn-grok-bot",
    source: "github",
    url: "https://github.com/yuanyijie/learn-grok-bot",
    author: "yuanyijie",
    language: "bilingual",
    title: { en: "Learn Grok Bot", "zh-Hant": "Learn Grok Bot 十六課", "zh-Hans": "Learn Grok Bot 十六课", ja: "Learn Grok Bot 16講" },
    description: {
      en: "A bilingual 16-lesson course explaining how a desktop agent is built and kept safe.",
      "zh-Hant": "中英雙語十六課，介紹桌面 Agent 的結構、安全界線及自動化方法。",
      "zh-Hans": "中英双语十六课，介绍桌面 Agent 的结构、安全界线和自动化方法。",
      ja: "デスクトップ Agent の作り方と安全な使い方を説明する、中国語と英語の16講コース。",
    },
    focus: { en: "Architecture course", "zh-Hant": "架構課程", "zh-Hans": "架构课程", ja: "仕組みの講座" },
  },
  {
    id: "grokbot-field-guide",
    source: "github",
    url: "https://github.com/tal-giladi/grokbot-field-guide",
    author: "tal-giladi",
    language: "en",
    title: { en: "The Grokbot Field Guide", "zh-Hant": "Grok Bot 實作指南", "zh-Hans": "Grok Bot 实作指南", ja: "Grok Bot 実践ガイド" },
    description: {
      en: "Eight use cases explained with setup steps and prompts you can adapt.",
      "zh-Hant": "把八個使用案例拆成設定步驟，並提供可以修改使用的提示詞。",
      "zh-Hans": "把八个使用案例拆成设置步骤，并提供可以修改使用的提示词。",
      ja: "8つの使い方を設定手順に分け、自分用に直せるプロンプトも載っています。",
    },
    focus: { en: "Use cases", "zh-Hant": "使用案例", "zh-Hans": "使用案例", ja: "使い方の例" },
  },
  {
    id: "grok-bot-delegation",
    source: "github",
    url: "https://github.com/agent-skills-lab/grok-bot-delegation",
    author: "agent-skills-lab",
    language: "en",
    title: { en: "Grok Bot Delegation", "zh-Hant": "Grok Bot 委派指南", "zh-Hans": "Grok Bot 委派指南", ja: "Grok Bot 任せ方ガイド" },
    description: {
      en: "A practical guide to defining roles, delegating clearly, and keeping human approval gates.",
      "zh-Hant": "介紹如何設定角色、清楚分配任務，並在重要步驟保留人工批准。",
      "zh-Hans": "介绍如何设置角色、清楚分配任务，并在重要步骤保留人工批准。",
      ja: "役割の決め方、はっきりした任せ方、大切な手順では人が承認する方法を説明する実践ガイド。",
    },
    focus: { en: "Delegation", "zh-Hant": "分配與批准", "zh-Hans": "分配与批准", ja: "役割分担と承認" },
  },
  {
    id: "grokbot-for-gtm",
    source: "github",
    url: "https://github.com/bcharleson/grokbot-for-gtm",
    author: "bcharleson",
    xAuthor: { name: "Brandon Charleson", handle: "brandon_ai" },
    language: "en",
    title: { en: "Grok Bot for GTM", "zh-Hant": "Grok Bot 銷售推廣指南", "zh-Hans": "Grok Bot 销售推广指南", ja: "Grok Bot 営業ガイド" },
    description: {
      en: "A complete outbound sales playbook with setup, research, review, and approval steps.",
      "zh-Hant": "完整的外展銷售玩法，包含設定、研究、檢查及批准步驟。",
      "zh-Hans": "完整的外展销售玩法，包含设置、研究、检查和批准步骤。",
      ja: "設定、調査、確認、承認までを含む、外向け営業の一通りの進め方。",
    },
    focus: { en: "Sales", "zh-Hant": "銷售", "zh-Hans": "销售", ja: "営業" },
  },
  {
    id: "grokbot-run",
    source: "github",
    url: "https://github.com/kibovrwa/grokbot-run",
    author: "kibovrwa",
    language: "en",
    title: { en: "grokbot.run Handbook", "zh-Hant": "grokbot.run 入門手冊", "zh-Hans": "grokbot.run 入门手册", ja: "grokbot.run 入門ハンドブック" },
    description: {
      en: "An unofficial handbook covering setup, the first Bot, shared computers, routines, and troubleshooting.",
      "zh-Hant": "非官方入門手冊，涵蓋設定、第一隻 Bot、共用電腦、例行任務及疑難排解。",
      "zh-Hans": "非官方入门手册，涵盖设置、第一只 Bot、共享电脑、例行任务和故障排查。",
      ja: "設定、最初の Bot、共用パソコン、ルーチン、困ったときの対処までをまとめた非公式ハンドブック。",
    },
    focus: { en: "Getting started", "zh-Hant": "開始使用", "zh-Hans": "开始使用", ja: "はじめに" },
  },
  {
    id: "grok-ship",
    source: "github",
    url: "https://github.com/kunchenguid/grok-ship",
    author: "kunchenguid",
    xAuthor: { name: "Kun Chen", handle: "kunchenguid" },
    language: "en",
    title: { en: "Grok Ship", "zh-Hant": "Grok Ship 開發團隊指南", "zh-Hans": "Grok Ship 开发团队指南", ja: "Grok Ship 開発チームガイド" },
    description: {
      en: "A software-building playbook with one coordinating Bot and focused project Bots.",
      "zh-Hant": "以一隻協調 Bot 配合多隻專注項目的 Bot，協助建立軟件。",
      "zh-Hans": "以一只协调 Bot 配合多只专注项目的 Bot，协助建立软件。",
      ja: "1体のまとめ役 Bot と、担当が分かれた Bot でソフトウェア作りを進める方法。",
    },
    focus: { en: "Software teams", "zh-Hant": "軟件開發", "zh-Hans": "软件开发", ja: "ソフトウェア開発" },
  },
  {
    id: "grok-bot-second-brain",
    source: "github",
    url: "https://github.com/mKay00/grok-bot-second-brain",
    author: "mKay00",
    xAuthor: { name: "Mario Kneidinger", handle: "makneidinger" },
    language: "en",
    title: { en: "Five Grok Bots, One Vault", "zh-Hant": "五隻 Grok Bot，共用一個知識庫", "zh-Hans": "五只 Grok Bot，共用一个知识库", ja: "5体の Grok Bot、1つの知識ベース" },
    description: {
      en: "A complete plan for five Bots to share one organized personal knowledge vault.",
      "zh-Hant": "讓五隻 Bot 共用一個整理清楚的個人知識庫，保留一致記憶。",
      "zh-Hans": "让五只 Bot 共用一个整理清楚的个人知识库，保留一致记忆。",
      ja: "5体の Bot が、整理された1つの個人知識ベースを共有し、同じ記憶を保つ一通りの進め方。",
    },
    focus: { en: "Second brain", "zh-Hant": "個人知識庫", "zh-Hans": "个人知识库", ja: "個人知識ベース" },
  },
];

export const youtubeBookmarks: readonly BookmarkItem[] = [
  {
    id: "introducing-grok-bot",
    source: "youtube",
    url: "https://www.youtube.com/watch?v=F1_0Lkp16Rc",
    author: "Grok",
    language: "en",
    title: { en: "Introducing Grok Bot", "zh-Hant": "Grok Bot 官方介紹", "zh-Hans": "Grok Bot 官方介绍", ja: "Grok Bot 公式紹介" },
    description: {
      en: "The official product introduction and the clearest short overview of what Grok Bot can do.",
      "zh-Hant": "官方產品介紹，快速了解 Grok Bot 可以幫你完成什麼。",
      "zh-Hans": "官方产品介绍，快速了解 Grok Bot 可以帮你完成什么。",
      ja: "公式の製品紹介。Grok Bot が何を手伝えるかを、短くはっきり説明します。",
    },
    focus: { en: "Official overview", "zh-Hant": "官方介紹", "zh-Hans": "官方介绍", ja: "公式紹介" },
  },
  {
    id: "getting-started-with-grok-bot",
    source: "youtube",
    url: "https://www.youtube.com/watch?v=jwogmXNt7o4",
    author: "Matt Palmer",
    language: "en",
    title: { en: "Getting started with Grok Bot", "zh-Hant": "開始使用 Grok Bot", "zh-Hans": "开始使用 Grok Bot", ja: "Grok Bot のはじめ方" },
    description: {
      en: "A practical walkthrough of first-time setup and the main ideas new users need.",
      "zh-Hant": "逐步示範第一次設定，以及新使用者需要理解的主要功能。",
      "zh-Hans": "逐步演示第一次设置，以及新用户需要理解的主要功能。",
      ja: "初めての設定と、初めて使う人が知っておきたい要点を、手順どおりに見せます。",
    },
    focus: { en: "Beginner setup", "zh-Hant": "新手設定", "zh-Hans": "新手设置", ja: "初心者の設定" },
  },
  {
    id: "templates-in-grok-bot",
    source: "youtube",
    url: "https://www.youtube.com/watch?v=N6BZ06pR7Po",
    author: "Matt Palmer",
    language: "en",
    title: { en: "Templates in Grok Bot", "zh-Hant": "Grok Bot 模板教學", "zh-Hans": "Grok Bot 模板教程", ja: "Grok Bot のテンプレート" },
    description: {
      en: "A focused walkthrough showing how to choose and use Grok Bot templates.",
      "zh-Hant": "集中示範如何選擇及使用 Grok Bot 模板。",
      "zh-Hans": "集中演示如何选择和使用 Grok Bot 模板。",
      ja: "Grok Bot のテンプレートを選び、使う方法に絞った解説。",
    },
    focus: { en: "Templates", "zh-Hant": "模板", "zh-Hans": "模板", ja: "テンプレート" },
  },
  {
    id: "grok-bot-concepts",
    source: "youtube",
    url: "https://www.youtube.com/watch?v=NyfYxpXiw_0",
    author: "Nate Herk | AI Automation",
    xAuthor: { name: "Nate Herk", handle: "nateherk" },
    language: "en",
    title: {
      en: "Every Grok Bot Concept Explained for Normal People",
      "zh-Hant": "用簡單方法解釋 Grok Bot 的主要概念",
      "zh-Hans": "用简单方法解释 Grok Bot 的主要概念",
      ja: "普通の人向けに、Grok Bot の主な考え方を説明",
    },
    description: {
      en: "A plain-language explanation of Bots, computers, connections, routines, and approvals.",
      "zh-Hant": "用簡單說話介紹 Bots、電腦、連接、例行任務及批准。",
      "zh-Hans": "用简单语言介绍 Bots、电脑、连接、例行任务和批准。",
      ja: "Bot、パソコン、接続、ルーチン、承認を、やさしい言葉で説明します。",
    },
    focus: { en: "Core concepts", "zh-Hant": "主要概念", "zh-Hans": "主要概念", ja: "基本の考え方" },
  },
  {
    id: "first-time-setup-demo",
    source: "youtube",
    url: "https://www.youtube.com/watch?v=szDvF-iX2tY",
    author: "Clearmud",
    language: "en",
    title: {
      en: "I tried every tip from the Grok Bot team: First time setup demo",
      "zh-Hant": "第一次設定 Grok Bot：完整示範",
      "zh-Hans": "第一次设置 Grok Bot：完整演示",
      ja: "Grok Bot チームの助言を全部試した：初回設定の実演",
    },
    description: {
      en: "A first-use demo that tests setup advice from the Grok Bot team step by step.",
      "zh-Hant": "按照 Grok Bot 團隊的建議，逐步測試第一次設定流程。",
      "zh-Hans": "按照 Grok Bot 团队的建议，逐步测试第一次设置流程。",
      ja: "Grok Bot チームの設定の助言を、手順どおりに試す初回利用の実演。",
    },
    focus: { en: "First-use demo", "zh-Hant": "首次使用", "zh-Hans": "首次使用", ja: "初回利用" },
  },
  {
    id: "eleven-grok-bot-use-cases",
    source: "youtube",
    url: "https://www.youtube.com/watch?v=5CSXUsljJ_E",
    author: "Matthew Berman",
    language: "en",
    title: {
      en: "11 Grok Bot Use Cases That Feel Like Cheating",
      "zh-Hant": "11 個 Grok Bot 使用案例",
      "zh-Hans": "11 个 Grok Bot 使用案例",
      ja: "Grok Bot の使い方 11 例",
    },
    description: {
      en: "Eleven practical examples showing different ways a Bot can help with everyday tasks.",
      "zh-Hant": "十一個實際例子，展示 Bot 可以怎樣協助處理不同事情。",
      "zh-Hans": "十一个实际例子，展示 Bot 可以怎样协助处理不同事情。",
      ja: "日常の用事を Bot がどう手伝えるかを示す、11 の実例。",
    },
    focus: { en: "Use cases", "zh-Hant": "使用案例", "zh-Hans": "使用案例", ja: "使い方の例" },
  },
  {
    id: "grok-bot-cloud-computer-test",
    source: "youtube",
    url: "https://www.youtube.com/watch?v=foedWQ4iZJI",
    author: "NiceKate AI",
    language: "zh",
    title: {
      en: "Testing the Grok Bot cloud computer",
      "zh-Hant": "實測 Grok Bot 雲端電腦",
      "zh-Hans": "实测 Grok Bot 云电脑",
      ja: "Grok Bot クラウドパソコンを試す",
    },
    description: {
      en: "A Chinese hands-on test of the cloud computer, local models, and automated tools.",
      "zh-Hant": "中文實測雲端電腦、本地模型及自動操作工具。",
      "zh-Hans": "中文实测云电脑、本地模型和自动操作工具。",
      ja: "クラウドパソコン、手元のモデル、自動操作ツールを実際に試した中国語の検証。",
    },
    focus: { en: "Cloud computer", "zh-Hant": "雲端電腦", "zh-Hans": "云电脑", ja: "クラウドパソコン" },
  },
  {
    id: "grok-bot-hands-on-review",
    source: "youtube",
    url: "https://www.youtube.com/watch?v=D6x1PYbxMLg",
    author: "阿石 OMP",
    language: "zh",
    title: {
      en: "Hands-on Grok Bot review",
      "zh-Hant": "實測 Grok Bot：多 Bot 架構與使用方法",
      "zh-Hans": "实测 Grok Bot：多 Bot 架构和使用方法",
      ja: "Grok Bot を実際に試したレビュー：複数 Bot の仕組みと使い方",
    },
    description: {
      en: "A Chinese hands-on review of the multi-Bot design, strengths, and limits.",
      "zh-Hant": "中文實測多 Bot 架構，說明它的用途、優點及限制。",
      "zh-Hans": "中文实测多 Bot 架构，说明它的用途、优点和限制。",
      ja: "複数 Bot の仕組み、向き不向き、限界を実際に試した中国語レビュー。",
    },
    focus: { en: "Hands-on review", "zh-Hant": "實際測試", "zh-Hans": "实际测试", ja: "実際の検証" },
  },
];

export function localizeBookmark(item: BookmarkItem, locale: Locale): LocalizedBookmarkItem {
  return {
    ...item,
    title: item.title[locale],
    description: item.description[locale],
    focus: item.focus[locale],
  };
}

function languagePriority(language: BookmarkLanguage, locale: Locale) {
  if (locale === "en" || locale === "ja") {
    if (language === "en") return 0;
    if (language === "bilingual") return 1;
    return 2;
  }
  if (language === "zh") return 0;
  if (language === "bilingual") return 1;
  return 2;
}

export function bookmarksForLocale(items: readonly BookmarkItem[], locale: Locale) {
  return [...items].sort(
    (a, b) => languagePriority(a.language, locale) - languagePriority(b.language, locale),
  );
}
