import type { Locale } from "@/lib/i18n/types";

export const bookmarkSources = ["github", "x", "youtube"] as const;

export type BookmarkSource = (typeof bookmarkSources)[number];
export type BookmarkLanguage = "zh" | "en" | "bilingual" | "multilingual";

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
  pinnedLabel: string;
  by: string;
  openGithub: string;
  openYoutube: string;
  playYoutube: string;
  closeVideo: string;
  starsLabel: string;
  starsUnavailable: string;
  starsCheckedAt: string;
  viewsLabel: string;
  youtubeViewsLabel: string;
  youtubeViewsUnavailable: string;
  youtubeCheckedAt: string;
  language: Record<BookmarkLanguage, string>;
  note: string;
};

export const bookmarkUiCopy: Record<Locale, BookmarkUiCopy> = {
  en: {
    title: "Grok Bot Articles",
    intro: "Community projects, guides, and tutorials.",
    navLabel: "Article source",
    count: "{n} items",
    sourceCards: {
      github: { title: "GitHub", body: "Community projects, resource collections, and guides." },
      x: { title: "X Articles", body: "Ranked by public X views." },
      youtube: { title: "YouTube", body: "Walkthroughs, demos, and real use cases." },
    },
    xChineseTitle: "Chinese Articles",
    xEnglishTitle: "English Articles",
    xJapaneseTitle: "Japanese Articles",
    pinnedLabel: "Pinned",
    by: "By",
    openGithub: "Open on GitHub",
    openYoutube: "Watch on YouTube",
    playYoutube: "Play video",
    closeVideo: "Close video",
    starsLabel: "GitHub stars",
    starsUnavailable: "Stars unavailable",
    starsCheckedAt: "Last checked: {date}",
    viewsLabel: "X views",
    youtubeViewsLabel: "views",
    youtubeViewsUnavailable: "Views unavailable",
    youtubeCheckedAt: "Checked {date}",
    language: { zh: "Chinese", en: "English", bilingual: "Chinese + English", multilingual: "Chinese / English / Japanese" },
    note: "GitHub and YouTube are curated selections; X articles are ranked by views.",
  },
  "zh-Hant": {
    title: "Grok Bot 文章",
    intro: "社群項目、指南及教學。",
    navLabel: "文章來源",
    count: "{n} 項",
    sourceCards: {
      github: { title: "GitHub", body: "社群項目、資源合集及指南。" },
      x: { title: "X 文章", body: "按公開 X 瀏覽次數排列。" },
      youtube: { title: "YouTube", body: "示範、入門影片及真實案例。" },
    },
    xChineseTitle: "中文文章",
    xEnglishTitle: "英文文章",
    xJapaneseTitle: "日文文章",
    pinnedLabel: "置頂",
    by: "作者",
    openGithub: "在 GitHub 開啟",
    openYoutube: "在 YouTube 觀看",
    playYoutube: "播放影片",
    closeVideo: "關閉影片",
    starsLabel: "GitHub 星數",
    starsUnavailable: "暫無星數",
    starsCheckedAt: "最後核對：{date}",
    viewsLabel: "X 瀏覽",
    youtubeViewsLabel: "次觀看",
    youtubeViewsUnavailable: "暫無觀看次數",
    youtubeCheckedAt: "核對日期：{date}",
    language: { zh: "中文", en: "英文", bilingual: "中英雙語", multilingual: "中英日語" },
    note: "GitHub 與 YouTube 內容經過精選；X 文章按瀏覽次數排列。",
  },
  "zh-Hans": {
    title: "Grok Bot 文章",
    intro: "社区项目、指南和教程。",
    navLabel: "文章来源",
    count: "{n} 项",
    sourceCards: {
      github: { title: "GitHub", body: "社区项目、资源合集和指南。" },
      x: { title: "X 文章", body: "按公开 X 浏览次数排列。" },
      youtube: { title: "YouTube", body: "演示、入门视频和真实案例。" },
    },
    xChineseTitle: "中文文章",
    xEnglishTitle: "英文文章",
    xJapaneseTitle: "日文文章",
    pinnedLabel: "置顶",
    by: "作者",
    openGithub: "在 GitHub 打开",
    openYoutube: "在 YouTube 观看",
    playYoutube: "播放视频",
    closeVideo: "关闭视频",
    starsLabel: "GitHub 星数",
    starsUnavailable: "暂无星数",
    starsCheckedAt: "最后核对：{date}",
    viewsLabel: "X 浏览",
    youtubeViewsLabel: "次观看",
    youtubeViewsUnavailable: "暂无观看次数",
    youtubeCheckedAt: "核对日期：{date}",
    language: { zh: "中文", en: "英文", bilingual: "中英双语", multilingual: "中英日语" },
    note: "GitHub 和 YouTube 内容经过精选；X 文章按浏览次数排列。",
  },
  ja: {
    title: "Grok Bot 記事",
    intro: "コミュニティのプロジェクト、ガイド、解説動画。",
    navLabel: "記事の出典",
    count: "{n} 件",
    sourceCards: {
      github: { title: "GitHub", body: "コミュニティのプロジェクト、リソース集、ガイド。" },
      x: { title: "X 記事", body: "公開の X 閲覧数順。" },
      youtube: { title: "YouTube", body: "初期設定、実演、実際の活用例。" },
    },
    xChineseTitle: "中国語の記事",
    xEnglishTitle: "英語の記事",
    xJapaneseTitle: "日本語の記事",
    pinnedLabel: "ピン留め",
    by: "作者",
    openGithub: "GitHub で開く",
    openYoutube: "YouTube で見る",
    playYoutube: "動画を再生",
    closeVideo: "動画を閉じる",
    starsLabel: "GitHub スター数",
    starsUnavailable: "スター数を取得できません",
    starsCheckedAt: "最終確認：{date}",
    viewsLabel: "X 閲覧",
    youtubeViewsLabel: "回視聴",
    youtubeViewsUnavailable: "再生回数を取得できません",
    youtubeCheckedAt: "確認日：{date}",
    language: { zh: "中国語", en: "英語", bilingual: "中国語と英語", multilingual: "中国語・英語・日本語" },
    note: "GitHub と YouTube は厳選した内容、X 記事は閲覧数順です。",
  },
};

export const githubBookmarks: readonly BookmarkItem[] = [
  {
    id: "awesome-grokbot-kydlikebtc",
    source: "github",
    url: "https://github.com/kydlikebtc/awesome-grokbot",
    author: "kydlikebtc",
    language: "bilingual",
    title: { en: "awesome-grokbot", "zh-Hant": "awesome-grokbot", "zh-Hans": "awesome-grokbot", ja: "awesome-grokbot" },
    description: {
      en: "A searchable Chinese and English catalog of public Bots you can preview and add to your account.",
      "zh-Hant": "可搜尋的中英雙語 Bot 目錄，讓你預覽公開設定，再加入自己的帳號。",
      "zh-Hans": "可搜索的中英双语 Bot 目录，让你预览公开设置，再添加到自己的账号。",
      ja: "公開 Bot を検索し、設定を確認して自分のアカウントに追加できる中英のカタログ。",
    },
    focus: { en: "Bot directory", "zh-Hant": "Bot 目錄", "zh-Hans": "Bot 目录", ja: "Bot カタログ" },
  },
  {
    id: "botdirectory-ai",
    source: "github",
    url: "https://github.com/elie222/botdirectory.ai",
    author: "elie222",
    language: "en",
    title: { en: "botdirectory.ai", "zh-Hant": "botdirectory.ai", "zh-Hans": "botdirectory.ai", ja: "botdirectory.ai" },
    description: {
      en: "A community directory of Bot prompts you can copy into Grok Bot or other AI assistants.",
      "zh-Hant": "社群整理的 Bot 提示詞目錄，可複製到 Grok Bot 或其他 AI 助手使用。",
      "zh-Hans": "社区整理的 Bot 提示词目录，可复制到 Grok Bot 或其他 AI 助手使用。",
      ja: "Grok Bot やほかの AI アシスタントにコピーして使える、コミュニティのプロンプト集。",
    },
    focus: { en: "Prompt collection", "zh-Hant": "提示詞合集", "zh-Hans": "提示词合集", ja: "プロンプト集" },
  },
  {
    id: "grok-bot-cli",
    source: "github",
    url: "https://github.com/ScriptedAlchemy/grok-bot-cli",
    author: "ScriptedAlchemy",
    language: "en",
    title: { en: "grok-bot-cli", "zh-Hant": "grok-bot-cli", "zh-Hans": "grok-bot-cli", ja: "grok-bot-cli" },
    description: {
      en: "A command-line tool for creating and updating Bots, sending messages, and reading conversations.",
      "zh-Hant": "供熟悉指令的人使用，可建立及更新 Bot、傳送訊息和查看對話。",
      "zh-Hans": "供熟悉命令的人使用，可创建和更新 Bot、发送消息和查看对话。",
      ja: "コマンドで Bot の作成・更新、メッセージの送信、会話の確認ができるツール。",
    },
    focus: { en: "Command-line tool", "zh-Hant": "指令工具", "zh-Hans": "命令行工具", ja: "コマンドラインツール" },
  },
  {
    id: "awesome-grok-bot",
    source: "github",
    url: "https://github.com/RongleCat/awesome-grok-bot",
    author: "RongleCat",
    language: "multilingual",
    title: { en: "Awesome Grok Bot", "zh-Hant": "Awesome Grok Bot", "zh-Hans": "Awesome Grok Bot", ja: "Awesome Grok Bot" },
    description: {
      en: "Grok Bot guides, tools, templates, and community examples in Chinese, English, and Japanese.",
      "zh-Hant": "整理 Grok Bot 指南、工具、模板及社群案例，提供中文、英文及日文。",
      "zh-Hans": "整理 Grok Bot 指南、工具、模板和社区案例，提供中文、英文和日文。",
      ja: "Grok Bot のガイド、ツール、テンプレート、活用例を集めた、日本語・中国語・英語のリソース集。",
    },
    focus: { en: "Resource collection", "zh-Hant": "資源合集", "zh-Hans": "资源合集", ja: "リソース集" },
  },
  {
    id: "grok-bot-orange-book",
    source: "github",
    url: "https://github.com/KinGao294/grok-bot-orange-book",
    author: "KinGao294",
    xAuthor: { name: "Kin", handle: "KinGao476942" },
    language: "zh",
    title: { en: "Grok Bot Orange Book", "zh-Hant": "Grok Bot 橙皮書", "zh-Hans": "Grok Bot 橙皮书", ja: "Grok Bot オレンジブック" },
    description: {
      en: "A Chinese guide from first setup to Bot Teams, routines, and saving usage.",
      "zh-Hant": "由第一次設定開始，逐步介紹 Bot 團隊、例行事項及節省用量的方法。",
      "zh-Hans": "从第一次设置开始，逐步介绍 Bot 团队、例行事项和节省用量的方法。",
      ja: "最初の設定から、Bot チーム、ルーチン、使用量の節約までを順に説明する中国語ガイド。",
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
      "zh-Hant": "較進階的營運手冊，教你安排多隻 Bot 並建立清楚的交接方法。",
      "zh-Hans": "较进阶的运营手册，教你安排多只 Bot 并建立清楚的交接方法。",
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
      "zh-Hant": "十步中文手冊，整理角色、批准界線、例行事項及團隊檢討方法。",
      "zh-Hans": "十步中文手册，整理角色、批准界线、例行事项和团队复盘方法。",
      ja: "役割、承認の範囲、ルーチン、チームでの振り返りを10の手順でまとめた中国語ハンドブック。",
    },
    focus: { en: "Team guide", "zh-Hant": "團隊指南", "zh-Hans": "团队指南", ja: "チームガイド" },
  },
  {
    id: "learn-grok-bot",
    source: "github",
    url: "https://github.com/yuanyijie/learn-grok-bot",
    author: "yuanyijie",
    language: "bilingual",
    title: { en: "Learn Grok Bot", "zh-Hant": "Learn Grok Bot", "zh-Hans": "Learn Grok Bot", ja: "Learn Grok Bot" },
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
    title: { en: "The Grokbot Field Guide", "zh-Hant": "The Grokbot Field Guide", "zh-Hans": "The Grokbot Field Guide", ja: "The Grokbot Field Guide" },
    description: {
      en: "Eight use cases explained with setup steps and prompts you can adapt.",
      "zh-Hant": "把八個使用案例拆成設定步驟，並提供可以改寫的提示詞。",
      "zh-Hans": "把八个使用案例拆成设置步骤，并提供可以改写的提示词。",
      ja: "8つの活用例を設定手順に分け、自分用に直せるプロンプトも載っています。",
    },
    focus: { en: "Use cases", "zh-Hant": "使用案例", "zh-Hans": "使用案例", ja: "活用例" },
  },
  {
    id: "grok-bot-delegation",
    source: "github",
    url: "https://github.com/agent-skills-lab/grok-bot-delegation",
    author: "agent-skills-lab",
    language: "en",
    title: { en: "Grok Bot Delegation", "zh-Hant": "Grok Bot Delegation", "zh-Hans": "Grok Bot Delegation", ja: "Grok Bot Delegation" },
    description: {
      en: "A Claude Code skill for briefing Grok Bot, defining roles, and keeping human approval steps.",
      "zh-Hant": "供 Claude Code 使用的技能，協助你向 Grok Bot 說明需求、設定角色及保留人工批准。",
      "zh-Hans": "供 Claude Code 使用的技能，帮助你向 Grok Bot 说明需求、设置角色和保留人工批准。",
      ja: "Grok Bot への依頼、役割分担、人による承認手順を整える Claude Code 用スキル。",
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
    title: { en: "Grok Bot for GTM", "zh-Hant": "Grok Bot for GTM", "zh-Hans": "Grok Bot for GTM", ja: "Grok Bot for GTM" },
    description: {
      en: "A complete outbound sales playbook with setup, research, review, and approval steps.",
      "zh-Hant": "完整的外展銷售指南，包含設定、研究、檢查及批准步驟。",
      "zh-Hans": "完整的外展销售指南，包含设置、研究、检查和批准步骤。",
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
    title: { en: "grokbot.run Handbook", "zh-Hant": "grokbot.run Handbook", "zh-Hans": "grokbot.run Handbook", ja: "grokbot.run Handbook" },
    description: {
      en: "Source code for the unofficial grokbot.run handbook, with setup guides and troubleshooting.",
      "zh-Hant": "非官方 grokbot.run 手冊的網站原始碼，包含設定指南及疑難排解內容。",
      "zh-Hans": "非官方 grokbot.run 手册的网站源码，包含设置指南和故障排查内容。",
      ja: "設定ガイドやトラブル対処をまとめた、非公式ハンドブック grokbot.run のサイトのソースコード。",
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
    title: { en: "Grok Ship", "zh-Hant": "Grok Ship", "zh-Hans": "Grok Ship", ja: "Grok Ship" },
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
    title: { en: "Five Grok Bots, One Vault", "zh-Hant": "Five Grok Bots, One Vault", "zh-Hans": "Five Grok Bots, One Vault", ja: "Five Grok Bots, One Vault" },
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
    title: { en: "Introducing Grok Bot", "zh-Hant": "Introducing Grok Bot", "zh-Hans": "Introducing Grok Bot", ja: "Introducing Grok Bot" },
    description: {
      en: "The official product introduction and the clearest short overview of what Grok Bot can do.",
      "zh-Hant": "官方產品介紹，快速了解 Grok Bot 可以幫你做什麼。",
      "zh-Hans": "官方产品介绍，快速了解 Grok Bot 可以帮你做什么。",
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
    title: { en: "Getting started with Grok Bot", "zh-Hant": "Getting started with Grok Bot", "zh-Hans": "Getting started with Grok Bot", ja: "Getting started with Grok Bot" },
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
    title: { en: "Templates in Grok Bot", "zh-Hant": "Templates in Grok Bot", "zh-Hans": "Templates in Grok Bot", ja: "Templates in Grok Bot" },
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
      "zh-Hant": "Every Grok Bot Concept Explained for Normal People",
      "zh-Hans": "Every Grok Bot Concept Explained for Normal People",
      ja: "Every Grok Bot Concept Explained for Normal People",
    },
    description: {
      en: "A plain-language explanation of Bots, computers, connections, routines, and approvals.",
      "zh-Hant": "用淺白的話介紹 Bot、電腦、連接、例行事項及批准。",
      "zh-Hans": "用浅白的话介绍 Bot、电脑、连接、例行事项和批准。",
      ja: "Bot、パソコン、接続、ルーチン、承認を、わかりやすい言葉で説明します。",
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
      "zh-Hant": "I tried every tip from the Grok Bot team: First time setup demo",
      "zh-Hans": "I tried every tip from the Grok Bot team: First time setup demo",
      ja: "I tried every tip from the Grok Bot team: First time setup demo",
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
      "zh-Hant": "11 Grok Bot Use Cases That Feel Like Cheating",
      "zh-Hans": "11 Grok Bot Use Cases That Feel Like Cheating",
      ja: "11 Grok Bot Use Cases That Feel Like Cheating",
    },
    description: {
      en: "Eleven practical examples showing different ways a Bot can help with everyday tasks.",
      "zh-Hant": "十一個實際例子，展示 Bot 可以怎樣協助處理日常事情。",
      "zh-Hans": "十一个实际例子，展示 Bot 可以怎样协助处理日常事情。",
      ja: "日常の用事を Bot がどう手伝えるかを示す、11 の活用例。",
    },
    focus: { en: "Use cases", "zh-Hant": "使用案例", "zh-Hans": "使用案例", ja: "活用例" },
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
  if (locale === "ja" && language === "multilingual") return -1;
  if (locale === "en" || locale === "ja") {
    if (language === "en") return 0;
    if (language === "bilingual" || language === "multilingual") return 1;
    return 2;
  }
  if (language === "zh") return 0;
  if (language === "bilingual" || language === "multilingual") return 1;
  return 2;
}

export function bookmarksForLocale(items: readonly BookmarkItem[], locale: Locale) {
  return [...items].sort(
    (a, b) => languagePriority(a.language, locale) - languagePriority(b.language, locale),
  );
}
