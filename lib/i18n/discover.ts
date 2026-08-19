import type { DiscoverStory } from "@/data/discover";
import type { Locale } from "./types";

export type DiscoverStoryI18n = {
  title: string;
  headline: string;
  whatTheyDid: string;
  howItWorks: string;
  whyUseful: string;
  whyItMatters: string;
  whoShouldTry: string[];
  usefulFor: string;
  quote?: string;
};

const hant: Record<string, DiscoverStoryI18n> = {
  "clear-email-elon": {
    title: "清走你的電郵",
    headline: "Elon 今日在 X 指 Grok Bot 去做九萬封電郵大掃除",
    whatTheyDid:
      "2026 年 8 月 19 日，Elon 引用 Mike P（@mikepat711）：Grok Bot 正在行兩個 Gmail 帳戶——大約九萬封電郵——刪走 Mike 自己從來不敢動的垃圾。Elon 一句就係產品提示：「Clear your email with @Grok @Bot。」",
    howItWorks:
      "這不是發布示範。一個真人把兩個在用的收件箱交給 Grok Bot，叫它清。Elon 同一個早上轉發。我們保留 Elon 原帖。沒有在這裡重跑那九萬封。",
    whyUseful: "清收件箱係人人都明的 Grok Bot 工作。如果你盯住十年 Gmail 不敢動，這就是今日熱度最高的公開例子。",
    whyItMatters: "今日 Elon 時間線上最熱的 Grok Bot 帖——幾小時幾百萬觀看。工作是 Mike 的；熱度是 Elon 的。兩邊都寫清楚。",
    whoShouldTry: ["收件箱炸掉的人", "創辦人", "營運"],
    usefulFor: "Gmail 浸死的人",
    quote: "Clear your email with @Grok @Bot",
  },
  "week-of-hacks-nate-herk": {
    title: "一週 Grok Bot 技巧",
    headline: "Nate Herk 今日寫了九個 Grok Bot 技巧——Elon 問「What’s ur @Bots？」",
    whatTheyDid:
      "Nate Herk 在 X 發表〈A Week of Grok Bot Lessons in 10 Mins〉：九個把預設 Bot 變成一隊的做法。Elon 同一個早上引用，問大家跑緊咩 Bot。",
    howItWorks:
      "他的做法：Grill Me 技能訪問你、抽出背景；Klaus 做幕僚長，你只同一隻 Bot 傾；專員 Motion、Eyes、Miner、Coffee、Views；共用記憶對私人記憶；Composio 接多啲 app；ClickUp 避免工作消失在聊天；示範一次就教會；例行工作；已登入的瀏覽器設定檔。我們摘要公開文章——沒有重跑 Klaus。",
    whyUseful: "這是今日人在收藏的設定文。如果你已經開咗 Bot，但仍然覺得只係多一個聊天室，由呢度開始。",
    whyItMatters: "Elon 沒有再發一個新流程。他指住這篇。文章是工作；Elon 條問題係點解全時間線都係它。",
    whoShouldTry: ["已經有 Bot 的人", "想砌一小隊的營運", "創作者"],
    usefulFor: "營運 / 創作者",
    quote: "What’s ur @Bots?",
  },
  "household-bots-blake-king": {
    title: "頭 48 小時，唔使識 code",
    headline: "Blake King 零編程試 Grok Bot——Elon 今日轉發",
    whatTheyDid:
      "Blake 接了公開挑戰，跳過 OpenClaw，兩個晚上：駁電郵、叫 Bot 做一份 12 頁家庭預算 PowerPoint、為太太生意開一隊 Bot、再每日收 Tesla 新聞摘要。",
    howItWorks:
      "他話產品會一步步帶你設定。不用寫 code。先電郵，再預算簡報，再一小隊，再早報。Elon 在 2026 年 8 月 19 日轉發。我們沒有重跑他的 Bot。",
    whyUseful: "多數發布帖當你已經識用 agent。這篇是非工程師，講頭幾份真的交得出的工。",
    whyItMatters: "今日它同清收件箱、Nate 的技巧一齊出現在 Elon 時間線。而家討論的就是：人用 Grok Bot 做家庭同小生意的真工作。",
    whoShouldTry: ["非工程師", "家庭", "小生意老闆"],
    usefulFor: "初學者 / 小生意",
    quote:
      "I have zero coding experience. … I set up the bot, linked my email, had it build a full 12-page household budget PowerPoint",
  },
  "grok-bot-launch-bot": {
    title: "Grok Bot 登場",
    headline: "@bot 介紹 Grok Bot：有自己電腦的 AI 隊友",
    whatTheyDid:
      "官方 @bot 帳戶宣布 Grok Bot 進入早期測試：每隻 Bot 有自己的電腦，登入你已在用的工具，有需要批准時才回來找你。",
    howItWorks:
      "這是產品發布帖，不是單一流程。後來官方例子——銷售外展、收件箱、CRM、工程——都掛在這條原文上面。我們保留原帖連結，再用白話講清楚它講什麼。",
    whyUseful: "如果你剛接觸 Grok Bot，先睇呢度，再複製提示詞。",
    whyItMatters: "之後好多 Grok Bot 文章都會指返呢條宣布。短摘要加原帖，快過自己刷回覆。",
    whoShouldTry: ["正在評估 Grok Bot 的人", "決定要不要訂閱的創辦人"],
    usefulFor: "剛接觸 Grok Bot 的人",
    quote: "Introducing Grok Bot, now in early beta. Bots are AI teammates…",
  },
  "overnight-sales-xai": {
    title: "通宵銷售外展",
    headline: "xAI 用 Grok Bot 通宵研究客戶，早上只留待批核的草稿",
    whatTheyDid:
      "一隻銷售外展 Bot 會通宵研究帳戶、按意圖為聯絡人打分，再用每位銷售的語氣草擬電郵同 LinkedIn，早上只留一疊等你批准的草稿。",
    howItWorks: "Bot 趁你睡覺用瀏覽器同現有銷售工具開工。早上你審的是草稿，不是還要自己變成郵件的對話摘要。",
    whyUseful: "適合創辦人同 SDR：站會前管道工作已經做好，但又唔會讓 Bot 未經審批就寄出。",
    whyItMatters: "這是官方旗艦例子。重點係：做完的工作落實到真正的收件箱。",
    whoShouldTry: ["SDR", "自己做外展的創辦人", "銷售主管"],
    usefulFor: "銷售 / 創辦人",
    quote: "researches accounts overnight, scores contacts with intent, drafts email and LinkedIn in each seller’s voice",
  },
  "crm-notes-xai": {
    title: "通話後更新 CRM",
    headline: "xAI 用銷售 Bot 把通話逐字稿寫進 CRM",
    whatTheyDid: "喺 SpaceXAI 入面，一隻銷售 Bot 會用通話逐字稿更新 CRM，並草擬跟進，記錄留在人類本來就會用的工具。",
    howItWorks: "通話後 Bot 讀逐字稿、寫欄位同下一步，放進 CRM。改交易階段或數字仍然要人批准。",
    whyUseful: "CRM 腐爛好靜、好貴。把筆記寫進真正系統，好過摘要留在聊天室。",
    whyItMatters: "xAI 自己講：工作未放到隊友會放的位置，就不算做完。這就是銷售營運版。",
    whoShouldTry: ["客戶經理", "銷售營運", "自己兼 CRM 的創辦人"],
    usefulFor: "銷售營運 / 客戶經理",
    quote: "a sales Bot updating the CRM with call transcript notes and drafting follow-ups",
  },
  "inbox-organizer-xai": {
    title: "收件箱管家",
    headline: "xAI 專用一隻 Bot 管收件箱",
    whatTheyDid: "SpaceXAI 團隊會疊幾隻 Bot：上面一隻幕僚長，下面有專責收件箱的一條線，唔使一隻 Bot 包辦所有事。",
    howItWorks: "一隻 Bot 負責收件箱：分類、草稿、提醒你丟低的對話。另一隻可以坐上面，只在要判斷時拉你入場。",
    whyUseful: "多數人唔需要 12 隻 Bot 的組織圖。佢哋需要一隻令早上 Gmail 細一點的 Bot。",
    whyItMatters: "官方模型是一小隊 Bot，不是一隻萬能代理。收件箱係幾乎人人都明的那條線。",
    whoShouldTry: ["創辦人", "營運", "收件箱等於工作的人"],
    usefulFor: "營運 / 創辦人",
    quote: "A chief of staff sits on top, with a specialist for each lane: inbox management, expenses, recruiting…",
  },
  "expense-manager-xai": {
    title: "開支管家",
    headline: "xAI 把開支交給一隻 Bot，收據就唔好再瞓喺 Gmail",
    whatTheyDid: "官方例子包括開支專員，以及一隻營運 Bot 處理 Gmail 收到的發票，再寫進財務已在用的工具。",
    howItWorks: "Bot 睇收件箱裡的收據同發票、抽出事實、更新試算表或財務工具。睇落像付款的，仍然要你批准。",
    whyUseful: "收據放得耐就難搵。每日掃一次，好過月底先用 Gmail 搜尋翻箱倒籠。",
    whyItMatters: "這是唔性感的官方工作——重點就在這裡。Grok Bot 賣的是沒人想重做的隊友工作。",
    whoShouldTry: ["創辦人", "辦公室主任", "小型財務團隊"],
    usefulFor: "營運 / 財務",
    quote: "an ops Bot seating new hires and processing invoices received in Gmail",
  },
  "bug-reproduction-xai": {
    title: "重現 Bug",
    headline: "xAI 用工程 Bot 在產品介面重現 bug，再入票",
    whatTheyDid: "一隻工程 Bot 會在產品介面重現 bug、入票，再把修復交給除錯 Bot——報告就唔再係一句含糊的 Slack。",
    howItWorks: "有人描述 bug。Bot 打開產品、行一次步驟、寫下見到什麼，再入到團隊已在用的追蹤器。",
    whyUseful: "適合細工程團隊：報告者已經撞過一次的 bug，唔好再花時間重搵。",
    whyItMatters: "官方工程例子不多。這個好具體：重現、入票、交接——不是「幫我寫 code」。",
    whoShouldTry: ["工程師", "QA", "兼做支援的創辦人"],
    usefulFor: "工程 / QA",
    quote: "reproducing a bug in the product UI, filing the ticket, and handing the fix off to a debugging Bot",
  },
  "vendor-negotiation-xai": {
    title: "供應商議價",
    headline: "xAI 話已有人用 Grok Bot 以自己的語氣同供應商談",
    whatTheyDid:
      "Grok Bot 團隊的早期例子（Digital Trends 報道）包括用你自己的語氣直接同供應商談——Bot 草擬同跟進對話，成交仍然要你批准。",
    howItWorks: "你示範自己點寫、肯出幾多。Bot 在你已有的工具跟進供應商對話，未見過的承諾就停。",
    whyUseful: "當談判主要係電郵、而且重複，又想語氣似你，就啱用。",
    whyItMatters: "這是官方團隊例子，不是具名客戶案例。我們留低因為工作好具體——而且涉及錢的郵件，最後一擊仍應係人。",
    whoShouldTry: ["創辦人", "營運主管", "要買軟件或服務的人"],
    usefulFor: "創辦人 / 營運",
    quote: "negotiate with vendors in their voice",
  },
  "store-support-xai": {
    title: "網店客服隊列",
    headline: "xAI 話有人用 Grok Bot 管網店客服",
    whatTheyDid: "Grok Bot 團隊的早期例子包括處理網店顧客支援——分類、草稿、更新，都喺店舖已在用的工具裡做。",
    howItWorks: "Bot 讀新工單或電郵、分組、草擬回覆。發布或退款先留俾你，直到你信呢條線。",
    whyUseful: "適合細店：客服係創辦人半夜回，不是 20 人客服台。",
    whyItMatters: "支援量大，只要最後一擊留俾人，就容易還原。這符合 xAI 講 Bot 應該接的工作。",
    whoShouldTry: ["網店創辦人", "支援主管", "一個人撐場的營運者"],
    usefulFor: "支援 / 創辦人",
    quote: "manage support for their online store",
  },
  "reddit-thread-scout-axel": {
    title: "Reddit 討論串偵察",
    headline: "Axel Schapmann 用 Grok Bot 做 Reddit 行銷——搵值得加入的串，不是洗版",
    whatTheyDid:
      "Axel 寫過用 Grok Bot 做 Reddit 行銷：搵你真係幫到忙的新串，以及仍然排到名的舊串，然後停在評論草稿。",
    howItWorks: "把網站、產品同幾個對手交給 Bot。它搜 Reddit 同 Google，評適合度同洗版風險，留言留俾你自己貼。",
    whyUseful: "搵對的串先係慢的部分。入到對的房間，寫評論就易。",
    whyItMatters: "這是公開的社群文章，不是 xAI 截圖。我們整理成卡片同可複製流程——冇喺度重跑他的 Bot。",
    whoShouldTry: ["創辦人", "市場人員", "獨立開發者"],
    usefulFor: "市場 / 創辦人",
  },
  "travel-concierge-nate": {
    title: "旅行管家",
    headline: "Nate 用 Grok Bot 計劃旅行——他一天內開咗十二隻 Bot，呢個係其中一份工",
    whatTheyDid: "Nate 喺公開評測裡大約八小時開咗一隊 Bot。旅行計劃係其中一份工，仲有運動同聯絡人研究。",
    howItWorks: "你俾日期、預算同限制。Bot 比較公開選項，寫出一日一日的計劃。訂位仍然係你。",
    whyUseful: "旅行研究好快變成 40 個分頁。交返一份短簡報，先係非技術用戶用得上手的版本。",
    whyItMatters: "Nate 的標準係「做完」，不是「叫你做」。旅行係清楚的個人例子——亦提醒 Grok Bot 唔只係銷售工具。",
    whoShouldTry: ["忙的專業人士", "家庭", "討厭 40 個分頁研究的人"],
    usefulFor: "要計劃旅行的人",
    quote: "Others took travel planning, exercise, and contact research.",
  },
  "youtube-comments-remy": {
    title: "YouTube 留言台",
    headline: "Remy 讓內容 Bot 開始回 YouTube 留言",
    whatTheyDid: "Remy 做咗一隻叫 Gordon 的內容 Bot。現場試過之後，Gordon 開始按行程草擬 YouTube 留言回覆——最後一擊仍係 Remy。",
    howItWorks: "把影片或頻道交給 Bot。它把留言分組，用你的語氣寫短回覆。聽落似你的，先由你發布。",
    whyUseful: "有用的問題會被表情蓋過。每日一檯，好過想起先開 YouTube Studio。",
    whyItMatters: "這是具名的人、具名的 Bot、公開寫出來。我們摘要這份工；唔會講我哋重測過 Gordon。",
    whoShouldTry: ["創作者", "教育者", "產品行銷"],
    usefulFor: "創作者 / 內容",
    quote: "I had Gordon … start replying to my YouTube comments.",
  },
  "newsletter-to-social-remy": {
    title: "電子報轉社交",
    headline: "Remy 用內容 Bot 把上週電子報改寫成 X 同 LinkedIn 帖",
    whatTheyDid: "同一隻內容 Bot Gordon，把上週電子報改寫到 X 同 LinkedIn。Remy 話而家自動跑，幾乎唔使再教。",
    howItWorks: "Bot 讀嗰期內容，按平台長度用你的語氣寫帖，留草稿。你先發布。我哋對應的流程會喺發布前停。",
    whyUseful: "內容已經有。稅是改三次格式。呢份工適合交俾 Bot。",
    whyItMatters: "社群例子最好有 Bot 名同產出。這篇兩樣都有。",
    whoShouldTry: ["寫電子報的人", "會發帖的創辦人", "內容主管"],
    usefulFor: "內容 / 創辦人",
    quote: "I had Gordon repurpose last week’s newsletter across X and LinkedIn",
  },
  "monday-marketing-report-jellypod": {
    title: "星期一市場報告",
    headline: "Jellypod 第一個 Grok Bot 市場玩法，係星期一巡一圈儀表板",
    whatTheyDid:
      "Jellypod 的公開指南由你每週已在做的匯報開始：行一次 GA4、廣告、排名同電郵，抄你點名的數字，留一頁簡報。",
    howItWorks: "示範巡迴一次。排星期一早。只有指標越過你設的線，Bot 先吵你。",
    whyUseful: "星期一朝早未知道上週得唔得，已經登入六次。填好的簡報，好過再開一個儀表板。",
    whyItMatters: "這是實務指南，不是病毒截圖。我們留低因為工作悶、每週都做、又容易抄。",
    whoShouldTry: ["市場經理", "創辦人", "代理公司負責人"],
    usefulFor: "市場 / 創辦人",
    quote: "The output is a filled-in summary waiting when you open your laptop, not another dashboard to visit.",
  },
  "competitor-monitor-jellypod": {
    title: "對手監察",
    headline: "Jellypod 寫過每週用 Grok Bot 巡對手網站同廣告庫",
    whatTheyDid:
      "同一篇指南的第二個玩法：教 Bot 每週行一份固定清單——廣告庫、評論站、對手更新——只標出真正變咗的。",
    howItWorks: "你示範清單一次。Bot 記下差額：新承諾、價錢改、評論裡新出現的反對——留題材，不是 40 頁倒出嚟。",
    whyUseful: "適合創辦人同市場團隊：唔想每日人手打開對手網站。",
    whyItMatters: "對手監察係人最先問的例子。這個版本有來源、改錯得返，亦對應完整 UseGrokBot 流程。",
    whoShouldTry: ["創辦人", "市場團隊", "產品行銷"],
    usefulFor: "市場 / 創辦人",
    quote: "Ad libraries, review sites, and competitor changelogs are exactly the shape Grok Bot is built for",
  },
};

const hans: Record<string, DiscoverStoryI18n> = {
  "clear-email-elon": {
    title: "清掉你的邮件",
    headline: "Elon 今天在 X 指 Grok Bot 去做九万封邮件大扫除",
    whatTheyDid:
      "2026 年 8 月 19 日，Elon 引用 Mike P（@mikepat711）：Grok Bot 正在走两个 Gmail 账户——大约九万封邮件——删掉 Mike 自己从来不敢动的垃圾。Elon 一句话就是产品提示：「Clear your email with @Grok @Bot。」",
    howItWorks:
      "这不是发布演示。一个真人把两个正在用的收件箱交给 Grok Bot，叫它清。Elon 同一个早上转发。我们保留 Elon 原帖。没有在这里重跑那九万封。",
    whyUseful: "清理收件箱是人人都懂的 Grok Bot 工作。如果你盯着十年 Gmail 不敢动，这就是今天热度最高的公开例子。",
    whyItMatters: "今天 Elon 时间线上最热的 Grok Bot 帖——几小时几百万观看。工作是 Mike 的；热度是 Elon 的。两边都写清楚。",
    whoShouldTry: ["收件箱炸掉的人", "创始人", "运营"],
    usefulFor: "被 Gmail 淹没的人",
    quote: "Clear your email with @Grok @Bot",
  },
  "week-of-hacks-nate-herk": {
    title: "一周 Grok Bot 技巧",
    headline: "Nate Herk 今天写了九个 Grok Bot 技巧——Elon 问「What’s ur @Bots？」",
    whatTheyDid:
      "Nate Herk 在 X 发表〈A Week of Grok Bot Lessons in 10 Mins〉：九个把默认 Bot 变成一队的做法。Elon 同一个早上引用，问大家在跑什么 Bot。",
    howItWorks:
      "他的做法：Grill Me 技能采访你、抽出背景；Klaus 做幕僚长，你只跟一只 Bot 聊；专员 Motion、Eyes、Miner、Coffee、Views；共享记忆对私人记忆；Composio 接更多 app；ClickUp 避免工作消失在聊天；示范一次就教会；例行工作；已登录的浏览器配置。我们摘要公开文章——没有重跑 Klaus。",
    whyUseful: "这是今天人们在收藏的设置文。如果你已经开了 Bot，但仍然觉得只是多一个聊天室，从这里开始。",
    whyItMatters: "Elon 没有再发一个新流程。他指着这篇。文章是工作；Elon 那句问就是它出现在每条时间线的原因。",
    whoShouldTry: ["已经有 Bot 的人", "想组一小队的运营", "创作者"],
    usefulFor: "运营 / 创作者",
    quote: "What’s ur @Bots?",
  },
  "household-bots-blake-king": {
    title: "头 48 小时，不用会 code",
    headline: "Blake King 零编程试 Grok Bot——Elon 今天转发",
    whatTheyDid:
      "Blake 接了公开挑战，跳过 OpenClaw，两个晚上：接邮件、让 Bot 做一份 12 页家庭预算 PowerPoint、为太太生意开一队 Bot、再每天收 Tesla 新闻摘要。",
    howItWorks:
      "他说产品会一步步带你设置。不用写 code。先邮件，再预算幻灯片，再一小队，再早报。Elon 在 2026 年 8 月 19 日转发。我们没有重跑他的 Bot。",
    whyUseful: "多数发布帖当你已经会用 agent。这篇是非工程师，讲头几份真正交得出的活。",
    whyItMatters: "今天它和清收件箱、Nate 的技巧一起出现在 Elon 时间线。现在讨论的就是：人用 Grok Bot 做家庭和小生意的真工作。",
    whoShouldTry: ["非工程师", "家庭", "小生意老板"],
    usefulFor: "初学者 / 小生意",
    quote:
      "I have zero coding experience. … I set up the bot, linked my email, had it build a full 12-page household budget PowerPoint",
  },
  "grok-bot-launch-bot": {
    title: "Grok Bot 上线",
    headline: "@bot 介绍 Grok Bot：拥有自己电脑的 AI 队友",
    whatTheyDid:
      "官方 @bot 账号宣布 Grok Bot 进入早期测试：每只 Bot 有自己的电脑，登录你已经在用的工具，需要批准时才回来找你。",
    howItWorks:
      "这是产品发布帖，不是单一流程。后来的官方例子——销售外展、收件箱、CRM、工程——都挂在这条原文上。我们保留原帖链接，再用白话讲清楚它在说什么。",
    whyUseful: "如果你刚接触 Grok Bot，先看这里，再复制提示词。",
    whyItMatters: "之后很多 Grok Bot 文章都会指回这条宣布。短摘要加原帖，快过自己刷回复。",
    whoShouldTry: ["正在评估 Grok Bot 的人", "决定要不要订阅的创始人"],
    usefulFor: "刚接触 Grok Bot 的人",
    quote: "Introducing Grok Bot, now in early beta. Bots are AI teammates…",
  },
  "overnight-sales-xai": {
    title: "通宵销售外展",
    headline: "xAI 用 Grok Bot 通宵研究客户，早上只留待审批的草稿",
    whatTheyDid:
      "一只销售外展 Bot 会通宵研究账户、按意向给联系人打分，再用每位销售的语气起草邮件和 LinkedIn，早上只留一叠等你批准的草稿。",
    howItWorks: "Bot 趁你睡觉用浏览器和现有销售工具开工。早上你审的是草稿，不是还要自己变成邮件的对话摘要。",
    whyUseful: "适合创始人和 SDR：站会前管道工作已经做好，但又不会让 Bot 未经审批就寄出。",
    whyItMatters: "这是官方旗舰例子。重点是：做完的工作落到真正的收件箱。",
    whoShouldTry: ["SDR", "自己做外展的创始人", "销售主管"],
    usefulFor: "销售 / 创始人",
    quote: "researches accounts overnight, scores contacts with intent, drafts email and LinkedIn in each seller’s voice",
  },
  "crm-notes-xai": {
    title: "通话后更新 CRM",
    headline: "xAI 用销售 Bot 把通话逐字稿写进 CRM",
    whatTheyDid: "在 SpaceXAI 内部，一只销售 Bot 会用通话逐字稿更新 CRM，并起草跟进，记录留在人类本来就会用的工具里。",
    howItWorks: "通话后 Bot 读逐字稿、写字段和下一步，放进 CRM。改交易阶段或数字仍然要人批准。",
    whyUseful: "CRM 腐烂很安静、也很贵。把笔记写进真正的系统，好过摘要留在聊天室。",
    whyItMatters: "xAI 自己说：工作还没放到队友会放的位置，就不算做完。这就是销售运营版。",
    whoShouldTry: ["客户经理", "销售运营", "自己兼 CRM 的创始人"],
    usefulFor: "销售运营 / 客户经理",
    quote: "a sales Bot updating the CRM with call transcript notes and drafting follow-ups",
  },
  "inbox-organizer-xai": {
    title: "收件箱管家",
    headline: "xAI 专用一只 Bot 管收件箱",
    whatTheyDid: "SpaceXAI 团队会叠几只 Bot：上面一只幕僚长，下面有专责收件箱的一条线，不必一只 Bot 包办所有事。",
    howItWorks: "一只 Bot 负责收件箱：分类、草稿、提醒你丢掉的对话。另一只可以坐在上面，只在要判断时拉你进场。",
    whyUseful: "多数人不需要 12 只 Bot 的组织图。他们需要一只让早上 Gmail 小一点的 Bot。",
    whyItMatters: "官方模型是一小队 Bot，不是一只万能代理。收件箱是几乎人人都懂的那条线。",
    whoShouldTry: ["创始人", "运营", "收件箱等于工作的人"],
    usefulFor: "运营 / 创始人",
    quote: "A chief of staff sits on top, with a specialist for each lane: inbox management, expenses, recruiting…",
  },
  "expense-manager-xai": {
    title: "开支管家",
    headline: "xAI 把开支交给一只 Bot，收据就不要再躺在 Gmail",
    whatTheyDid: "官方例子包括开支专员，以及一只运营 Bot 处理 Gmail 收到的发票，再写进财务已经在用的工具。",
    howItWorks: "Bot 看收件箱里的收据和发票、抽出事实、更新表格或财务工具。看起来像付款的，仍然要你批准。",
    whyUseful: "收据放久了就难找。每天扫一次，好过月底再用 Gmail 搜索翻箱倒柜。",
    whyItMatters: "这是不性感的官方工作——重点就在这里。Grok Bot 卖的是没人想重做的队友工作。",
    whoShouldTry: ["创始人", "办公室主任", "小型财务团队"],
    usefulFor: "运营 / 财务",
    quote: "an ops Bot seating new hires and processing invoices received in Gmail",
  },
  "bug-reproduction-xai": {
    title: "复现 Bug",
    headline: "xAI 用工程 Bot 在产品界面复现 bug，再提单",
    whatTheyDid: "一只工程 Bot 会在产品界面复现 bug、提单，再把修复交给调试 Bot——报告就不再是一句含糊的 Slack。",
    howItWorks: "有人描述 bug。Bot 打开产品、走一遍步骤、写下看到了什么，再提到团队已经在用的跟踪器。",
    whyUseful: "适合小工程团队：报告者已经撞过一次的 bug，不要再花时间重找。",
    whyItMatters: "官方工程例子不多。这个很具体：复现、提单、交接——不是「帮我写代码」。",
    whoShouldTry: ["工程师", "QA", "兼做支持的创始人"],
    usefulFor: "工程 / QA",
    quote: "reproducing a bug in the product UI, filing the ticket, and handing the fix off to a debugging Bot",
  },
  "vendor-negotiation-xai": {
    title: "供应商议价",
    headline: "xAI 说已有人用 Grok Bot 以自己的语气和供应商谈",
    whatTheyDid:
      "Grok Bot 团队的早期例子（Digital Trends 报道）包括用你自己的语气直接和供应商谈——Bot 起草并跟进对话，成交仍然要你批准。",
    howItWorks: "你示范自己怎么写、肯出多少。Bot 在你已有的工具跟进供应商对话，没见过的承诺就停。",
    whyUseful: "当谈判主要是邮件、而且重复，又想语气像你，就合适。",
    whyItMatters: "这是官方团队例子，不是具名客户案例。我们留下是因为工作很具体——而且涉及钱的邮件，最后一下仍应是人。",
    whoShouldTry: ["创始人", "运营主管", "要买软件或服务的人"],
    usefulFor: "创始人 / 运营",
    quote: "negotiate with vendors in their voice",
  },
  "store-support-xai": {
    title: "网店客服队列",
    headline: "xAI 说有人用 Grok Bot 管网店客服",
    whatTheyDid: "Grok Bot 团队的早期例子包括处理网店顾客支持——分类、草稿、更新，都在店铺已经在用的工具里做。",
    howItWorks: "Bot 读新工单或邮件、分组、起草回复。发布或退款先留给你，直到你信任这条线。",
    whyUseful: "适合小店：客服是创始人半夜回，不是 20 人客服台。",
    whyItMatters: "支持量大，只要最后一下留给人，就容易还原。这符合 xAI 讲 Bot 应该接的工作。",
    whoShouldTry: ["网店创始人", "支持主管", "一个人撑场的运营者"],
    usefulFor: "支持 / 创始人",
    quote: "manage support for their online store",
  },
  "reddit-thread-scout-axel": {
    title: "Reddit 帖子侦察",
    headline: "Axel Schapmann 用 Grok Bot 做 Reddit 营销——找值得加入的帖，不是刷屏",
    whatTheyDid:
      "Axel 写过用 Grok Bot 做 Reddit 营销：找你真能帮上忙的新帖，以及仍然排得上名的旧帖，然后停在评论草稿。",
    howItWorks: "把网站、产品和几个竞品交给 Bot。它搜 Reddit 和 Google，评匹配度和刷屏风险，留言留给你自己发。",
    whyUseful: "找到对的帖才是慢的部分。进对房间，写评论就容易。",
    whyItMatters: "这是公开的社群文章，不是 xAI 截图。我们整理成卡片和可复制流程——没有在这里重跑他的 Bot。",
    whoShouldTry: ["创始人", "市场人员", "独立开发者"],
    usefulFor: "市场 / 创始人",
  },
  "travel-concierge-nate": {
    title: "旅行管家",
    headline: "Nate 用 Grok Bot 计划旅行——他一天内开了十二只 Bot，这是其中一份工",
    whatTheyDid: "Nate 在公开评测里大约八小时开了一队 Bot。旅行计划是其中一份工，还有运动和联系人研究。",
    howItWorks: "你给日期、预算和限制。Bot 比较公开选项，写出一天一天的计划。下单仍然是你。",
    whyUseful: "旅行研究很快变成 40 个标签页。交回一份短简报，才是非技术用户用得上的版本。",
    whyItMatters: "Nate 的标准是「做完」，不是「叫你做」。旅行是清楚的个人例子——也提醒 Grok Bot 不只是销售工具。",
    whoShouldTry: ["忙的专业人士", "家庭", "讨厌 40 个标签页研究的人"],
    usefulFor: "要计划旅行的人",
    quote: "Others took travel planning, exercise, and contact research.",
  },
  "youtube-comments-remy": {
    title: "YouTube 评论台",
    headline: "Remy 让内容 Bot 开始回 YouTube 评论",
    whatTheyDid: "Remy 做了一只叫 Gordon 的内容 Bot。现场试过之后，Gordon 开始按行程起草 YouTube 评论回复——最后一下仍是 Remy。",
    howItWorks: "把视频或频道交给 Bot。它把评论分组，用你的语气写短回复。听起来像你的，才由你发布。",
    whyUseful: "有用的问题会被表情盖过。每天一桌，好过想起才打开 YouTube Studio。",
    whyItMatters: "这是具名的人、具名的 Bot、公开写出来。我们摘要这份工作；不会说我们重测过 Gordon。",
    whoShouldTry: ["创作者", "教育者", "产品营销"],
    usefulFor: "创作者 / 内容",
    quote: "I had Gordon … start replying to my YouTube comments.",
  },
  "newsletter-to-social-remy": {
    title: "通讯转社交",
    headline: "Remy 用内容 Bot 把上周通讯改写成 X 和 LinkedIn 帖",
    whatTheyDid: "同一只内容 Bot Gordon，把上周通讯改写到 X 和 LinkedIn。Remy 说现在自动跑，几乎不用再教。",
    howItWorks: "Bot 读那期内容，按平台长度用你的语气写帖，留草稿。你再发布。我们对应的流程会在发布前停。",
    whyUseful: "内容已经有了。税是改三次格式。这份工作适合交给 Bot。",
    whyItMatters: "社群例子最好有 Bot 名和产出。这篇两样都有。",
    whoShouldTry: ["写通讯的人", "会发帖的创始人", "内容主管"],
    usefulFor: "内容 / 创始人",
    quote: "I had Gordon repurpose last week’s newsletter across X and LinkedIn",
  },
  "monday-marketing-report-jellypod": {
    title: "星期一市场报告",
    headline: "Jellypod 第一个 Grok Bot 市场玩法，是星期一巡一圈仪表盘",
    whatTheyDid:
      "Jellypod 的公开指南从你每周已经在做的汇报开始：走一遍 GA4、广告、排名和邮件，抄你点名的数字，留一页简报。",
    howItWorks: "示范巡回一次。排星期一早。只有指标越过你设的线，Bot 才吵你。",
    whyUseful: "星期一早上还不知道上周行不行，已经登录六次。填好的简报，好过再开一个仪表盘。",
    whyItMatters: "这是实务指南，不是病毒截图。我们留下是因为工作闷、每周都做、又容易抄。",
    whoShouldTry: ["市场经理", "创始人", "代理公司负责人"],
    usefulFor: "市场 / 创始人",
    quote: "The output is a filled-in summary waiting when you open your laptop, not another dashboard to visit.",
  },
  "competitor-monitor-jellypod": {
    title: "竞品监控",
    headline: "Jellypod 写过每周用 Grok Bot 巡竞品网站和广告库",
    whatTheyDid:
      "同一篇指南的第二个玩法：教 Bot 每周走一份固定清单——广告库、评论站、竞品更新——只标出真正变了的。",
    howItWorks: "你示范清单一次。Bot 记下差额：新承诺、价格改、评论里新出现的反对——留题材，不是倒出 40 页。",
    whyUseful: "适合创始人和市场团队：不想每天人手打开竞品网站。",
    whyItMatters: "竞品监控是人们最先问的例子。这个版本有来源、改错回得去，也对应完整 UseGrokBot 流程。",
    whoShouldTry: ["创始人", "市场团队", "产品营销"],
    usefulFor: "市场 / 创始人",
    quote: "Ad libraries, review sites, and competitor changelogs are exactly the shape Grok Bot is built for",
  },
};

export function localizeDiscoverStory(story: DiscoverStory, locale: Locale): DiscoverStory {
  if (locale === "en") return story;
  const copy = (locale === "zh-Hant" ? hant : hans)[story.slug];
  if (!copy) return story;
  return { ...story, ...copy };
}

export function getDiscoverStoryI18n(slug: string, locale: Locale): DiscoverStoryI18n | undefined {
  if (locale === "zh-Hant") return hant[slug];
  if (locale === "zh-Hans") return hans[slug];
  return undefined;
}

