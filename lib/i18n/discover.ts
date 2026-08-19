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
  result?: string;
  output?: string;
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
    result: "九萬封電郵 · 兩個 Gmail",
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
    result: "九個技巧 · 一隻幕僚長",
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
    result: "12 頁預算簡報 · 48 小時，唔使 code",
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
    output: "早期測試宣布",
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
    result: "通宵研究 · 早上只留待批核草稿",
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
    output: "結構化 CRM 更新",
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
    output: "已分類的收件箱",
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
    output: "從 Gmail 入帳收據",
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
    output: "重現 bug 並入票",
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
    output: "用你語氣寫的供應商對話",
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
    output: "客服隊列草稿",
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
    output: "討論串清單 + 評論草稿",
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
    output: "一日一日的行程簡報",
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
    output: "YouTube 回覆草稿",
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
    output: "X 同 LinkedIn 草稿",
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
    output: "一頁星期一簡報",
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
    output: "每週對手差額",
  },
  "one-person-company-rahul": {
    title: "一人公司",
    headline: "Rahul 寫了怎樣用 Grok Bot 跑一人公司——由找客到每週匯報",
    whatTheyDid:
      "2026 年 8 月 19 日，Rahul（@sairahul1）在 X 發表文章〈How To Build a One-Person Company Using Grok Bot〉。開頭就是一人公司的負荷——找客、寫外展、做圖、回覆、數一星期——再用 Bot 系統接手這些線。",
    howItWorks:
      "他講設定、插件、每隻 Bot 一份章程、示範一次就變成例行工作，以及六個起步角色（幕僚長、Scout、Quill、Forge、Guide、Ledger）。我們摘要公開文章——沒有重跑他的公司棧。附近一條流傳的 Elon 連結其實引用了另一篇 Grok Bot 帖，所以我們保留 Rahul 原文。",
    whyUseful: "這是今日人在打開的長文：「一工一隻 Bot」。如果你就是整間公司，由呢度開始。",
    whyItMatters: "今日 X 上最熱的社群 Grok Bot 指南。是打法，不是客戶截圖。我們保留 Rahul 原帖。",
    whoShouldTry: ["一人創辦人", "自己就係整間公司的營運", "已經在付 Grok Bot 的人"],
    usefulFor: "一人創辦人 / 營運",
    quote: "You find the leads. Write the outreach. Make the images. Answer the replies. Count the week.",
    result: "六隻起步 Bot · 一人公司",
  },
  "clothes-resale-scotty-beam": {
    title: "賣掉未着過的衫",
    headline: "SCOTTY BEAM 寫 Cursor 同事把妹妹未着過的衫交給 Grok Bot",
    whatTheyDid:
      "2026 年 8 月 18 日，SCOTTY BEAM（@ScottyBeamIO）寫有 Cursor 的人把妹妹不再着的一堆衫交給 Grok Bot。賣掉要影相、上架、寫描述、回買家、議價——所以一直拖。那堆衫就交給 Bot。",
    howItWorks:
      "Scotty 話 Bot 睇相、認衫、寫 listing，再同買家議價。他亦指自己較長的文章，比較 Grok Bot、Hermes、OpenClaw，以及自動化 X 內容。賣衫是 Cursor 那個人的工；比較文是 Scotty 自己的。兩邊都沒有在這裡重跑。",
    whyUseful: "一堆衫就是人人都明的工：拖住的麻煩，一句「賣掉這些」。",
    whyItMatters: "這是轉述別人的 Bot，加上 Scotty 自己的長文。兩邊都寫清楚。",
    whoShouldTry: ["堆住二手貨的人", "一人營運", "拖住上架的人"],
    usefulFor: "二手 / 一人營運",
    quote: "You can just say: “Sell these”. And let it figure out the rest.",
    result: "影相、上架、回買家、議價",
  },
  "3d-game-roundtable-space": {
    title: "3D 遊戲，再自己上載",
    headline: "0xMarioNawfal 寫 Grok @bot 砌咗 3D 遊戲、自己打、再把影片上載去 X",
    whatTheyDid:
      "2026 年 8 月 19 日，0xMarioNawfal（@RoundtableSpace）寫 Grok @bot 可以砌成隻 3D 遊戲、自己錄屏自動玩、剪片，再上載去 X——全部自己做。附件片段來自 Dan（@Daniel_Farinax）。",
    howItWorks: "Mario 轉發一段公開錄影。我們保留他原帖。沒有重跑那隻遊戲，也沒有重做上載。",
    whyUseful: "這是人會指住的電腦用工：不是聊天答案——係砌好的遊戲，再加一條交得出的 X 影片。",
    whyItMatters: "即日社群轉發一份具體 Bot 工。片段是 Dan 的；帖是 Mario 的。兩邊都寫清楚。",
    whoShouldTry: ["建造者", "做遊戲的人", "想 Bot 交出片段的創作者"],
    usefulFor: "建造者 / 創作者",
    quote: "It knows how to screen record, auto-play the game, edit the video, and upload the video all by itself",
    result: "3D 遊戲 · 錄、剪、上載去 X",
  },
  "five-bots-peter-yang": {
    title: "五隻實用 Bot",
    headline: "Peter Yang 出了五隻 Grok Bot 教學——顧問、YouTube、X、收件箱、旅行",
    whatTheyDid:
      "2026 年 8 月 17 日，Peter Yang（@petergyang）發教學：五隻有用的 Bot——一隻顧問負責開同管其他 Bot、YouTube 研究找出局片、X 偵察找病毒同搞笑帖、「數碼 Marie Kondo」清收件箱同忘記的訂閱、再加旅行禮賓。",
    howItWorks:
      "他亦試過 Gamer Bot 玩經典遊戲，並問 Grok Bot 能不能取代 ChatGPT 做日常主力。我們摘要公開帖——沒有重跑他那五隻。",
    whyUseful: "五份有名的工，不是空泛「試試 agent」。想砌第一隊，抄這張名單。",
    whyItMatters: "這週人在收藏的實用設定教學。社群文；我們保留 Peter 原帖。",
    whoShouldTry: ["剛砌第一隊 Bot 的人", "創作者", "營運"],
    usefulFor: "營運 / 創作者",
    quote: "Here's my new tutorial where I show you how to set up 5 useful bots",
    result: "五隻 Bot · 顧問加專員",
  },
  "ultimate-guide-miles-deutscher": {
    title: "Grok Bot 完全指南",
    headline: "Miles Deutscher 發表〈Grok Bot: The Ultimate Guide〉——設定、插件、他那五隻",
    whatTheyDid:
      "2026 年 8 月 18 日，Miles Deutscher（@milesdeutscher）發長文：Grok Bot 是什麼、怎樣設定、插件，以及他實際在跑的五隻——Alex 找 YouTube 出局片、Sandra 睇樓盤、Jonathan 睇投資組合、Lucy 分 Slack、Oscar 做雜務。",
    howItWorks:
      "他話由發布就開始試。文章就是工——設定、用例、插件，同老實的價錢。我們沒有重跑 Alex 或 Sandra。",
    whyUseful: "如果你想抄一張公開的枱——有名的 Bot、提示詞、插件——這篇是長讀。",
    whyItMatters: "這週另一篇人在打開的 Grok Bot 長文。社群；我們保留 Miles 原帖。",
    whoShouldTry: ["已經有 Bot 的人", "想砌一小隊的營運", "創作者"],
    usefulFor: "營運 / 創作者",
    quote: "Grok Bot is the most powerful AI agent I've ever used.",
    result: "五隻有名的 Bot · 設定加插件",
  },
  "bot-team-tips-ben-lang": {
    title: "@bot 團隊貼士",
    headline: "Ben Lang 收集了 @bot 團隊在傳的 Grok Bot 專業貼士",
    whatTheyDid:
      "2026 年 8 月 18 日，Ben Lang（@benln）發了他從 @bot 團隊收集的清單：同一個插件駁多個帳戶、一隻幕僚長加幾個專員、釘住常用 agent、用 Notion 記未做完的工、示範一次教會，仲有更多。",
    howItWorks:
      "他簡介寫緊 Building SpaceXAI，via Cursor team。帖仍然是個人帳戶收集團隊貼士——不是 @bot 或 @xai 原文——所以我們維持社群標籤，保留他原帖。",
    whyUseful: "短、抄得走的設定習慣。如果你的 Bot 仍然只係多一個聊天室，先做幕僚長，再加一頁 Notion「仲有咩未做」。",
    whyItMatters: "這是公開轉述的團隊貼士，不是 UseGrokBot 重測。沒有標官方，也沒有標已測試。",
    whoShouldTry: ["已經有 Bot 的人", "想砌一小隊的營運"],
    usefulFor: "營運",
    quote: "One Chief of Staff plus a few specialists beats one mega-chat",
    result: "十二條貼士 · 幕僚長加專員",
  },
  "ceo-desk-teslaconomics": {
    title: "六隻 Bot 加一個 CEO",
    headline: "Teslaconomics 跑六隻 Grok Bot，再加一隻「CEO」在上面調度",
    whatTheyDid:
      "2026 年 8 月 14 日，Teslaconomics（@Teslaconomics）寫他已經有六隻 Grok Bot，各做一工——提醒、圖像同影片、估公司、分析影片、幫手發帖——再在上面放一隻 CEO Bot，他只同一個收件箱傾。",
    howItWorks:
      "先專員，再幕僚長式 CEO 分派工作、交返一個包裹。他公開了第一條訊息同三個例行（早、午、晚）。我們沒有重跑他的枱。",
    whyUseful: "沒有 CEO，你就係各組群聊的中間人。這是公開可複製的做法：讓一隻 Bot 做收件箱。",
    whyItMatters: "有名的人、有名的名單、公開提示詞。社群——我們沒有重測 CEO。",
    whoShouldTry: ["已經跑多過一隻 Bot 的人", "營運", "創作者"],
    usefulFor: "營運 / 創作者",
    quote: "With a CEO you text one inbox like a person.",
    result: "六個專員 · 一隻 CEO Bot",
  },
  "agent-loops-alex-finn": {
    title: "最好的循環",
    headline: "Alex Finn 讓一隻 Grok Bot 叫另一隻每五分鐘循環做同一份工",
    whatTheyDid:
      "2026 年 8 月 16 日，Alex Finn（@AlexFinn）寫 Grok Bot 天生適合循環：主 agent 叫另一隻每五分鐘循環一份工，再監察它。他話有一隻調度 Bot 看住工程 Bot 二十四小時，每三十分鐘想一個改進方法。",
    howItWorks:
      "他對比單一 Bot 用 /loop 自己看自己。多一隻 Bot 就是另一個上下文做判斷。我們摘要公開帖——沒有重跑他那二十四小時循環。",
    whyUseful: "如果你想工作自己繼續，又唔想自己睇住 /loop，這就是兩隻 Bot 的版本。",
    whyItMatters: "有人公開在跑的具體循環做法。社群；我們沒有重測工程循環。",
    whoShouldTry: ["建造者", "工程師", "要跑長工的研究"],
    usefulFor: "建造者 / 工程",
    quote:
      "All you do is tell your main agent to tell another agent to loop on a task every 5 minutes, and monitor it while it goes",
    result: "五分鐘循環 · 調度加專員",
  },
  "grok-bot-walkthrough-alex-finn": {
    title: "設定走查",
    headline: "Alex Finn 發了 Grok Bot 設定影片——用例同插件",
    whatTheyDid:
      "2026 年 8 月 18 日，Alex Finn（@AlexFinn）發了另一篇，唔係嗰條五分鐘循環：一條影片講點樣設定 Grok Bot、用例、插件，同設定啱先會好用。他話係一隊可以日夜開工的 agent。",
    howItWorks: "這是公開設定走查，不是客戶截圖。我們保留 Alex 原帖。沒有重跑他的枱，也沒有重剪影片。",
    whyUseful: "如果你想一條片由設定開始——不是另一條五分鐘循環——這就是人在睇的那條。",
    whyItMatters: "這週最受注意的社群 Grok Bot 設定片。同循環卡係另一條帖。社群；沒有標已測試。",
    whoShouldTry: ["剛開第一隻 Bot 的人", "營運", "創作者"],
    usefulFor: "營運 / 創作者",
    quote: "In this video I cover setting up Grok Bot, use cases, plugins, and what makes Grok Bot so good",
    result: "影片走查 · 設定、用例、插件",
  },
  "firstmate-kun-chen": {
    title: "Firstmate，一個收件箱",
    headline: "Kun Chen 公開可複製的 Firstmate 提示——你只同一隻 Grok Bot 傾",
    whatTheyDid:
      "2026 年 8 月 18 日，Kun Chen（@kunchenguid）發了一個 Firstmate Bot 系統提示：開一隻、把 github.com/kunchenguid/firstmate 的 GROK_BOT.md 貼進描述，之後只同這隻傾。它開、分派、協調其他 Bot。",
    howItWorks:
      "他話 Firstmate 是他在其他 harness 已用的幕僚長做法，而家變成一段短 Grok Bot 描述。我們沒有重跑 Firstmate。",
    whyUseful: "如果你唔想十二個聊天室，這是公開提示：一隻 Bot 去請同調度其餘的。",
    whyItMatters: "有 repo、有提示、有名的人。社群——我們沒有重測 Firstmate。",
    whoShouldTry: ["已經有 Bot 的人", "想要一個收件箱的營運"],
    usefulFor: "營運",
    quote: "the only agent you talk to. it creates, delegates, juggles, and continuously improves other bots for you",
    result: "一隻 Firstmate · 可複製提示",
  },
  "calendar-booking-yunta-tsai": {
    title: "睇日曆，再訂位",
    headline: "Yun-Ta Tsai 用中英夾雜對 Grok Bot 講：搵仲未訂的預約，邊行去車邊訂",
    whatTheyDid:
      "2026 年 8 月 12 日，Yun-Ta Tsai（@yunta_tsai）寫 Grok Bot 行過他的日曆，搵出事前仲要預訂、但他未做的事，揀最好的時間，再在網站上走預訂流程。他喺停車場行去車嗰陣，用中英夾雜同它講。",
    howItWorks: "先語音、再掃日曆，然後 Bot 去預訂網站開工。我們保留 Yun-Ta 原帖。沒有重跑那次預訂。",
    whyUseful: "這是人會指住的個人營運工：不是聊天摘要——係日曆上仲要訂的位，行去車已經處理。",
    whyItMatters: "Grok Bot 登場那週的公開電腦用例子。社群；沒有標已測試。",
    whoShouldTry: ["忙的專業人士", "日曆上仲有未訂預約的人", "想講、唔想打字的人"],
    usefulFor: "個人 / 營運",
    quote:
      "While I was walking in the parking lot before getting to my cars, I was talking to it in mixed Chinese and English.",
    result: "掃日曆 · 在網站上預訂",
  },
  "parents-bot-yunta-tsai": {
    title: "俾父母的第一隻 Bot",
    headline: "Yun-Ta Tsai 為父母開了第一隻 Grok Bot——話它識中文，唔使行插件迷宮",
    whatTheyDid:
      "2026 年 8 月 19 日，Yun-Ta Tsai（@yunta_tsai）寫 Grok Bot 係他會推薦俾年長父母的第一個 AI 產品。他們已經識聊天。唔想跳技能、插件、MCP。想問完就有人做完。他引用自己先前那條：俾父母的第一隻 Bot，標了「乖兒子」。",
    howItWorks:
      "跟進帖係論點：自然、順、中文好，年長的人可以自己做完多數事，唔使靠人。我們保留這條原帖。沒有幫他父母開 Bot。",
    whyUseful: "如果用家係永遠唔會設定 MCP 的父母，這就是公開的「問就得」例子。",
    whyItMatters: "同日曆訂位係同一個人。另一份工：俾唔使學技術棧的人用的 Bot。",
    whoShouldTry: ["幫父母開 Bot 的子女", "唔會碰插件的人", "講中文的家庭"],
    usefulFor: "個人 / 家庭",
    quote: "Grok @bot is probably the first AI product I would recommend for senior parents.",
    result: "俾父母的第一隻 Bot · 中文",
  },
  "eight-use-cases-eric-zakariasson": {
    title: "這週八個用例",
    headline: "eric zakariasson 發了這週八份 Grok Bot 工——第一份係發訊息指揮吸塵機械人",
    whatTheyDid:
      "2026 年 8 月 19 日，eric zakariasson（@ericzakariasson）發了一串：這週八個好有趣的 Grok Bot 用例。第一個係把 Bot 駁去吸塵機械人，再發訊息叫 Grok 去邊度清潔——引用 Yun-Ta Tsai 駁 Matic 那條。",
    howItWorks:
      "其餘指向其他公開工：過 Google「我不是機械人」、整部 Mac 當成人工作間、3D 遊戲、水喉公司辦公室主任、追從未退款的商戶、招聘加清剩餘訂閱、以及五盤生意的夜更。我們摘要 Eric 的匯總——八份都沒有重跑。",
    whyUseful: "一串、八份具體工。想睇這週人實際發過咩，由呢度開始。",
    whyItMatters: "這是社群匯總，不是 Eric 自己的吸塵機。吸塵工是 Yun-Ta 的；名單是 Eric 的。兩邊都寫清楚。",
    whoShouldTry: ["在收集第一份工的人", "營運", "想掃這週公開例子的人"],
    usefulFor: "營運",
    quote: "here are 8 really interesting grok bot use cases from this week!",
    result: "八份公開工 · 由吸塵機械人開始",
  },
  "three-employees-scotty-beam": {
    title: "Gustavo、Walter、Jesse",
    headline: "SCOTTY BEAM 寫了三隻有名的 Grok Bot 員工——Gustavo 管 Notion，Walter 管 DocuSign，Jesse 管 ManyChat",
    whatTheyDid:
      "2026 年 8 月 18 日，SCOTTY BEAM（@ScottyBeamIO）寫有人教 Grok Bot 跑生意：自己做一次，讓 Bot 睇住。三隻有名的員工：Gustavo 管營運（Notion 客戶中心、入職表格、第一次通話前準備）；Walter 管銷售（協議經 DocuSign，跟到客戶簽同付款）；Jesse 管線索（ManyChat 私訊寫進 Notion，有人問價錢就即刻通知）。",
    howItWorks:
      "Scotty 話它們共用一部雲端電腦同登入。這條帖同賣未着過的衫係另一條。我們保留這條原帖。沒有重跑 Gustavo、Walter 或 Jesse。",
    whyUseful: "有名的工、有名的工具。想砌第一隊銷售營運，抄這三條線。",
    whyItMatters: "熱度一般，枱好具體。社群轉述別人的團隊——我們留 Scotty 原帖，唔會發明創辦人係邊個。",
    whoShouldTry: ["一人營運", "細銷售團隊", "想用示範教會 Bot 的人"],
    usefulFor: "營運 / 銷售",
    quote: "he performed each task while the bot watched, then told it to do the same thing.",
    result: "Gustavo · Walter · Jesse",
  },
  "math-explainer-yunta-tsai": {
    title: "俾仔女的數學片",
    headline: "Yun-Ta Tsai 叫 Grok Bot 做數學講解片——用 Grok 語音 API 講得興高采烈",
    whatTheyDid:
      "2026 年 8 月 16 日，Yun-Ta Tsai（@yunta_tsai）寫仔女卡住點把數字拆成冪次和，他又搵唔到好的講解。於是叫 Grok Bot 做一條。Bot 把想法做出嚟等他審——仲用 Grok 語音 API 做了開朗的旁白。",
    howItWorks: "他話可以把擱住的想法丟俾 Bot，它會做出嚟等你審。我們保留原帖同附件影片。沒有重做那條講解。",
    whyUseful: "一條教學片就係你會拖的工。交出去，再審成品。",
    whyItMatters: "有名的人、有名的工、有附件影片。社群；沒有標已測試。",
    whoShouldTry: ["父母", "老師", "要一條一次性講解的創作者"],
    usefulFor: "內容 / 個人",
    quote: "I asked the @bot to make one. It even made a cheerful voice using the @grok voice API.",
    result: "數學講解片 · Grok 語音 API",
  },
  "teach-a-task-eric-zakariasson": {
    title: "示範一次就教會",
    headline: "eric zakariasson 示範點教 Grok Bot 一份工——撳 +、錄瀏覽器，Bot 再做一次",
    whatTheyDid:
      "2026 年 8 月 13 日，eric zakariasson（@ericzakariasson）發了短教學：聊天室撳 +，錄自己在瀏覽器點做，Bot 睇住就可以再做。他話多數工它自己做得完——當它卡住先用呢招。",
    howItWorks:
      "這是帶片段的功能走查，不是客戶截圖。他簡介寫緊 tinkering @spacexai；帖仍然是個人帳戶，所以我們維持社群標籤。",
    whyUseful: "Bot 一路撳錯路徑，示範一次快過改提示詞。",
    whyItMatters: "有具體步驟，不是預告。社群；沒有標官方，也沒有標已測試。",
    whoShouldTry: ["Bot 一路行錯路的人", "想教會例行工作的營運", "非工程師"],
    usefulFor: "營運",
    quote:
      "hit + in the chat and record yourself doing it in the browser. the bot watches, then it can do it again.",
    result: "錄一次 · Bot 再行同一條路",
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
    result: "九万封邮件 · 两个 Gmail",
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
    result: "九个技巧 · 一只幕僚长",
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
    result: "12 页预算幻灯片 · 48 小时，不用 code",
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
    output: "早期测试宣布",
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
    result: "通宵研究 · 早上只留待审批草稿",
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
    output: "结构化 CRM 更新",
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
    output: "已分类的收件箱",
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
    output: "从 Gmail 入账收据",
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
    output: "复现 bug 并提单",
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
    output: "用你语气写的供应商对话",
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
    output: "客服队列草稿",
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
    output: "帖子清单 + 评论草稿",
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
    output: "一天一天的行程简报",
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
    output: "YouTube 回复草稿",
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
    output: "X 和 LinkedIn 草稿",
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
    output: "一页星期一简报",
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
    output: "每周竞品差额",
  },
  "one-person-company-rahul": {
    title: "一人公司",
    headline: "Rahul 写了怎样用 Grok Bot 跑一人公司——从找客到每周汇报",
    whatTheyDid:
      "2026 年 8 月 19 日，Rahul（@sairahul1）在 X 发表文章〈How To Build a One-Person Company Using Grok Bot〉。开头就是一人公司的负荷——找客、写外展、做图、回复、数一星期——再用 Bot 系统接手这些线。",
    howItWorks:
      "他讲设置、插件、每只 Bot 一份章程、示范一次就变成例行工作，以及六个起步角色（幕僚长、Scout、Quill、Forge、Guide、Ledger）。我们摘要公开文章——没有重跑他的公司栈。附近一条流传的 Elon 链接其实引用了另一篇 Grok Bot 帖，所以我们保留 Rahul 原文。",
    whyUseful: "这是今天人们在打开的长文：「一工一只 Bot」。如果你就是整间公司，从这里开始。",
    whyItMatters: "今天 X 上最热的社区 Grok Bot 指南。是打法，不是客户截图。我们保留 Rahul 原帖。",
    whoShouldTry: ["一人创始人", "自己就是整间公司的运营", "已经在付 Grok Bot 的人"],
    usefulFor: "一人创始人 / 运营",
    quote: "You find the leads. Write the outreach. Make the images. Answer the replies. Count the week.",
    result: "六只起步 Bot · 一人公司",
  },
  "clothes-resale-scotty-beam": {
    title: "卖掉没穿过的衣服",
    headline: "SCOTTY BEAM 写 Cursor 同事把妹妹没穿过的衣服交给 Grok Bot",
    whatTheyDid:
      "2026 年 8 月 18 日，SCOTTY BEAM（@ScottyBeamIO）写有 Cursor 的人把妹妹不再穿的一堆衣服交给 Grok Bot。卖掉要拍照、上架、写描述、回买家、议价——所以一直拖。那堆衣服就交给 Bot。",
    howItWorks:
      "Scotty 说 Bot 看照片、认衣服、写 listing，再和买家议价。他也指向自己较长的文章，比较 Grok Bot、Hermes、OpenClaw，以及自动化 X 内容。卖衣服是 Cursor 那个人的工；比较文是 Scotty 自己的。两边都没有在这里重跑。",
    whyUseful: "一堆衣服就是人人都懂的工：拖着的麻烦，一句「卖掉这些」。",
    whyItMatters: "这是转述别人的 Bot，加上 Scotty 自己的长文。两边都写清楚。",
    whoShouldTry: ["堆着二手货的人", "一人运营", "拖着上架的人"],
    usefulFor: "二手 / 一人运营",
    quote: "You can just say: “Sell these”. And let it figure out the rest.",
    result: "拍照、上架、回买家、议价",
  },
  "3d-game-roundtable-space": {
    title: "3D 游戏，再自己上传",
    headline: "0xMarioNawfal 写 Grok @bot 做了 3D 游戏、自己打、再把视频上传到 X",
    whatTheyDid:
      "2026 年 8 月 19 日，0xMarioNawfal（@RoundtableSpace）写 Grok @bot 可以做成整个 3D 游戏、自己录屏自动玩、剪片，再上传到 X——全部自己做。附件片段来自 Dan（@Daniel_Farinax）。",
    howItWorks: "Mario 转发一段公开录像。我们保留他原帖。没有重跑那只游戏，也没有重做上传。",
    whyUseful: "这是人们会指着的电脑用工：不是聊天答案——是做好的游戏，再加一条交得出的 X 视频。",
    whyItMatters: "当日社区转发一份具体 Bot 工。片段是 Dan 的；帖是 Mario 的。两边都写清楚。",
    whoShouldTry: ["建造者", "做游戏的人", "想 Bot 交出片段的创作者"],
    usefulFor: "建造者 / 创作者",
    quote: "It knows how to screen record, auto-play the game, edit the video, and upload the video all by itself",
    result: "3D 游戏 · 录、剪、上传到 X",
  },
  "five-bots-peter-yang": {
    title: "五只实用 Bot",
    headline: "Peter Yang 出了五只 Grok Bot 教程——顾问、YouTube、X、收件箱、旅行",
    whatTheyDid:
      "2026 年 8 月 17 日，Peter Yang（@petergyang）发教程：五只有用的 Bot——一只顾问负责开和管理其他 Bot、YouTube 研究找出局片、X 侦察找病毒和搞笑帖、「数码 Marie Kondo」清收件箱和忘记的订阅、再加上旅行礼宾。",
    howItWorks:
      "他也试过 Gamer Bot 玩经典游戏，并问 Grok Bot 能不能取代 ChatGPT 做日常主力。我们摘要公开帖——没有重跑他那五只。",
    whyUseful: "五份有名的工，不是空泛「试试 agent」。想砌第一队，抄这张名单。",
    whyItMatters: "这周人们在收藏的实用设置教程。社区文；我们保留 Peter 原帖。",
    whoShouldTry: ["刚砌第一队 Bot 的人", "创作者", "运营"],
    usefulFor: "运营 / 创作者",
    quote: "Here's my new tutorial where I show you how to set up 5 useful bots",
    result: "五只 Bot · 顾问加专员",
  },
  "ultimate-guide-miles-deutscher": {
    title: "Grok Bot 完全指南",
    headline: "Miles Deutscher 发表〈Grok Bot: The Ultimate Guide〉——设置、插件、他那五只",
    whatTheyDid:
      "2026 年 8 月 18 日，Miles Deutscher（@milesdeutscher）发长文：Grok Bot 是什么、怎样设置、插件，以及他实际在跑的五只——Alex 找 YouTube 出局片、Sandra 看楼盘、Jonathan 看投资组合、Lucy 分 Slack、Oscar 做杂务。",
    howItWorks:
      "他说从发布就开始试。文章就是工——设置、用例、插件，和老实的价钱。我们没有重跑 Alex 或 Sandra。",
    whyUseful: "如果你想抄一张公开的桌——有名的 Bot、提示词、插件——这篇是长读。",
    whyItMatters: "这周另一篇人们在打开的 Grok Bot 长文。社区；我们保留 Miles 原帖。",
    whoShouldTry: ["已经有 Bot 的人", "想砌一小队的运营", "创作者"],
    usefulFor: "运营 / 创作者",
    quote: "Grok Bot is the most powerful AI agent I've ever used.",
    result: "五只有名的 Bot · 设置加插件",
  },
  "bot-team-tips-ben-lang": {
    title: "@bot 团队提示",
    headline: "Ben Lang 收集了 @bot 团队在传的 Grok Bot 专业提示",
    whatTheyDid:
      "2026 年 8 月 18 日，Ben Lang（@benln）发了他从 @bot 团队收集的清单：同一个插件接多个账户、一只幕僚长加几个专员、钉住常用 agent、用 Notion 记没做完的工、示范一次教会，还有更多。",
    howItWorks:
      "他简介写着 Building SpaceXAI，via Cursor team。帖仍然是个人账户收集团队提示——不是 @bot 或 @xai 原文——所以我们维持社区标签，保留他原帖。",
    whyUseful: "短、抄得走的设置习惯。如果你的 Bot 仍然只是多一个聊天室，先做幕僚长，再加一页 Notion「还有什么没做」。",
    whyItMatters: "这是公开转述的团队提示，不是 UseGrokBot 重测。没有标官方，也没有标已测试。",
    whoShouldTry: ["已经有 Bot 的人", "想砌一小队的运营"],
    usefulFor: "运营",
    quote: "One Chief of Staff plus a few specialists beats one mega-chat",
    result: "十二条提示 · 幕僚长加专员",
  },
  "ceo-desk-teslaconomics": {
    title: "六只 Bot 加一个 CEO",
    headline: "Teslaconomics 跑六只 Grok Bot，再加一只「CEO」在上面调度",
    whatTheyDid:
      "2026 年 8 月 14 日，Teslaconomics（@Teslaconomics）写他已经有六只 Grok Bot，各做一工——提醒、图像和视频、估公司、分析视频、帮忙发帖——再在上面放一只 CEO Bot，他只跟一个收件箱聊。",
    howItWorks:
      "先专员，再幕僚长式 CEO 分派工作、交回一个包裹。他公开了第一条消息和三个例行（早、午、晚）。我们没有重跑他的桌。",
    whyUseful: "没有 CEO，你就是各组群聊的中间人。这是公开可复制的做法：让一只 Bot 做收件箱。",
    whyItMatters: "有名的人、有名的名单、公开提示词。社区——我们没有重测 CEO。",
    whoShouldTry: ["已经跑超过一只 Bot 的人", "运营", "创作者"],
    usefulFor: "运营 / 创作者",
    quote: "With a CEO you text one inbox like a person.",
    result: "六个专员 · 一只 CEO Bot",
  },
  "agent-loops-alex-finn": {
    title: "最好的循环",
    headline: "Alex Finn 让一只 Grok Bot 叫另一只每五分钟循环做同一份工",
    whatTheyDid:
      "2026 年 8 月 16 日，Alex Finn（@AlexFinn）写 Grok Bot 天生适合循环：主 agent 叫另一只每五分钟循环一份工，再监察它。他说有一只调度 Bot 看着工程 Bot 二十四小时，每三十分钟想一个改进方法。",
    howItWorks:
      "他对比单一 Bot 用 /loop 自己看自己。多一只 Bot 就是另一个上下文做判断。我们摘要公开帖——没有重跑他那二十四小时循环。",
    whyUseful: "如果你想工作自己继续，又不想自己盯着 /loop，这就是两只 Bot 的版本。",
    whyItMatters: "有人公开在跑的具体循环做法。社区；我们没有重测工程循环。",
    whoShouldTry: ["建造者", "工程师", "要跑长工的研究"],
    usefulFor: "建造者 / 工程",
    quote:
      "All you do is tell your main agent to tell another agent to loop on a task every 5 minutes, and monitor it while it goes",
    result: "五分钟循环 · 调度加专员",
  },
  "grok-bot-walkthrough-alex-finn": {
    title: "设置走查",
    headline: "Alex Finn 发了 Grok Bot 设置视频——用例和插件",
    whatTheyDid:
      "2026 年 8 月 18 日，Alex Finn（@AlexFinn）发了另一篇，不是那条五分钟循环：一条视频讲怎样设置 Grok Bot、用例、插件，以及设置对了才会好用。他说是一队可以日夜开工的 agent。",
    howItWorks: "这是公开设置走查，不是客户截图。我们保留 Alex 原帖。没有重跑他的桌，也没有重剪视频。",
    whyUseful: "如果你想一条片从设置开始——不是另一条五分钟循环——这就是人们在看的那条。",
    whyItMatters: "这周最受注意的社区 Grok Bot 设置片。和循环卡是另一条帖。社区；没有标已测试。",
    whoShouldTry: ["刚开第一只 Bot 的人", "运营", "创作者"],
    usefulFor: "运营 / 创作者",
    quote: "In this video I cover setting up Grok Bot, use cases, plugins, and what makes Grok Bot so good",
    result: "视频走查 · 设置、用例、插件",
  },
  "firstmate-kun-chen": {
    title: "Firstmate，一个收件箱",
    headline: "Kun Chen 公开可复制的 Firstmate 提示——你只跟一只 Grok Bot 聊",
    whatTheyDid:
      "2026 年 8 月 18 日，Kun Chen（@kunchenguid）发了一个 Firstmate Bot 系统提示：开一只、把 github.com/kunchenguid/firstmate 的 GROK_BOT.md 贴进描述，之后只跟这只聊。它开、分派、协调其他 Bot。",
    howItWorks:
      "他说 Firstmate 是他在其他 harness 已用的幕僚长做法，现在变成一段短 Grok Bot 描述。我们没有重跑 Firstmate。",
    whyUseful: "如果你不想十二个聊天室，这是公开提示：一只 Bot 去请和调度其余的。",
    whyItMatters: "有 repo、有提示、有名的人。社区——我们没有重测 Firstmate。",
    whoShouldTry: ["已经有 Bot 的人", "想要一个收件箱的运营"],
    usefulFor: "运营",
    quote: "the only agent you talk to. it creates, delegates, juggles, and continuously improves other bots for you",
    result: "一只 Firstmate · 可复制提示",
  },
  "calendar-booking-yunta-tsai": {
    title: "看日历，再订位",
    headline: "Yun-Ta Tsai 用中英夹杂对 Grok Bot 说：找还没订的预约，边走向车边订",
    whatTheyDid:
      "2026 年 8 月 12 日，Yun-Ta Tsai（@yunta_tsai）写 Grok Bot 走完他的日历，找出事前还要预订、但他没做的事，选最好的时间，再在网站上走预订流程。他在停车场走向车的时候，用中英夹杂和它说。",
    howItWorks: "先语音、再扫日历，然后 Bot 去预订网站开工。我们保留 Yun-Ta 原帖。没有重跑那次预订。",
    whyUseful: "这是人们会指着的个人运营工：不是聊天摘要——是日历上还要订的位，走向车就已经处理。",
    whyItMatters: "Grok Bot 上线那周的公开电脑用例子。社区；没有标已测试。",
    whoShouldTry: ["忙的专业人士", "日历上还有未订预约的人", "想说、不想打字的人"],
    usefulFor: "个人 / 运营",
    quote:
      "While I was walking in the parking lot before getting to my cars, I was talking to it in mixed Chinese and English.",
    result: "扫日历 · 在网站上预订",
  },
  "parents-bot-yunta-tsai": {
    title: "给父母的第一只 Bot",
    headline: "Yun-Ta Tsai 为父母开了第一只 Grok Bot——说它会中文，不用走插件迷宫",
    whatTheyDid:
      "2026 年 8 月 19 日，Yun-Ta Tsai（@yunta_tsai）写 Grok Bot 是他会推荐给年长父母的第一个 AI 产品。他们已经会聊天。不想跳技能、插件、MCP。想问完就有人做完。他引用自己先前那条：给父母的第一只 Bot，标了「乖兒子」。",
    howItWorks:
      "跟进帖是论点：自然、顺、中文好，年长的人可以自己做完多数事，不用靠人。我们保留这条原帖。没有帮他父母开 Bot。",
    whyUseful: "如果用户是永远不会配置 MCP 的父母，这就是公开的「问就行」例子。",
    whyItMatters: "和日历订位是同一个人。另一份工：给不用学技术栈的人用的 Bot。",
    whoShouldTry: ["帮父母开 Bot 的子女", "不会碰插件的人", "讲中文的家庭"],
    usefulFor: "个人 / 家庭",
    quote: "Grok @bot is probably the first AI product I would recommend for senior parents.",
    result: "给父母的第一只 Bot · 中文",
  },
  "eight-use-cases-eric-zakariasson": {
    title: "这周八个用例",
    headline: "eric zakariasson 发了这周八份 Grok Bot 工——第一份是发消息指挥吸尘机器人",
    whatTheyDid:
      "2026 年 8 月 19 日，eric zakariasson（@ericzakariasson）发了一串：这周八个很有趣的 Grok Bot 用例。第一个是把 Bot 接到吸尘机器人，再发消息叫 Grok 去哪里清洁——引用 Yun-Ta Tsai 接 Matic 那条。",
    howItWorks:
      "其余指向其他公开工：过 Google「我不是机器人」、整台 Mac 当成人工作间、3D 游戏、水管公司办公室主任、追从未退款的商户、招聘加清剩余订阅、以及五盘生意的夜班。我们摘要 Eric 的汇总——八份都没有重跑。",
    whyUseful: "一串、八份具体工。想看这周人实际发过什么，从这里开始。",
    whyItMatters: "这是社区汇总，不是 Eric 自己的吸尘器。吸尘工是 Yun-Ta 的；名单是 Eric 的。两边都写清楚。",
    whoShouldTry: ["在收集第一份工的人", "运营", "想扫这周公开例子的人"],
    usefulFor: "运营",
    quote: "here are 8 really interesting grok bot use cases from this week!",
    result: "八份公开工 · 从吸尘机器人开始",
  },
  "three-employees-scotty-beam": {
    title: "Gustavo、Walter、Jesse",
    headline: "SCOTTY BEAM 写了三只有名的 Grok Bot 员工——Gustavo 管 Notion，Walter 管 DocuSign，Jesse 管 ManyChat",
    whatTheyDid:
      "2026 年 8 月 18 日，SCOTTY BEAM（@ScottyBeamIO）写有人教 Grok Bot 跑生意：自己做一次，让 Bot 看着。三只有名的员工：Gustavo 管运营（Notion 客户中心、入职表格、第一次通话前准备）；Walter 管销售（协议经 DocuSign，跟到客户签和付款）；Jesse 管线索（ManyChat 私信写进 Notion，有人问价钱就立刻通知）。",
    howItWorks:
      "Scotty 说它们共用一台云端电脑和登录。这条帖和卖没穿过的衣服是另一条。我们保留这条原帖。没有重跑 Gustavo、Walter 或 Jesse。",
    whyUseful: "有名的工、有名的工具。想砌第一队销售运营，抄这三条线。",
    whyItMatters: "热度一般，桌很具体。社区转述别人的团队——我们留 Scotty 原帖，不会发明创始人是谁。",
    whoShouldTry: ["一人运营", "小销售团队", "想用示范教会 Bot 的人"],
    usefulFor: "运营 / 销售",
    quote: "he performed each task while the bot watched, then told it to do the same thing.",
    result: "Gustavo · Walter · Jesse",
  },
  "math-explainer-yunta-tsai": {
    title: "给孩子的数学片",
    headline: "Yun-Ta Tsai 让 Grok Bot 做数学讲解片——用 Grok 语音 API 讲得兴高采烈",
    whatTheyDid:
      "2026 年 8 月 16 日，Yun-Ta Tsai（@yunta_tsai）写孩子卡住怎么把数字拆成幂次和，他又找不到好的讲解。于是让 Grok Bot 做一条。Bot 把想法做出来等他审——还用 Grok 语音 API 做了开朗的旁白。",
    howItWorks: "他说可以把搁着的想法丢给 Bot，它会做出来等你审。我们保留原帖和附件视频。没有重做那条讲解。",
    whyUseful: "一条教学片就是你会拖的工。交出去，再审成品。",
    whyItMatters: "有名的人、有名的工、有附件视频。社区；没有标已测试。",
    whoShouldTry: ["父母", "老师", "要一条一次性讲解的创作者"],
    usefulFor: "内容 / 个人",
    quote: "I asked the @bot to make one. It even made a cheerful voice using the @grok voice API.",
    result: "数学讲解片 · Grok 语音 API",
  },
  "teach-a-task-eric-zakariasson": {
    title: "示范一次就教会",
    headline: "eric zakariasson 示范怎么教 Grok Bot 一份工——点 +、录浏览器，Bot 再做一次",
    whatTheyDid:
      "2026 年 8 月 13 日，eric zakariasson（@ericzakariasson）发了短教程：聊天室点 +，录自己在浏览器怎么做，Bot 看着就可以再做。他说多数工它自己做得完——当它卡住再用这招。",
    howItWorks:
      "这是带片段的功能走查，不是客户截图。他简介写着 tinkering @spacexai；帖仍然是个人账户，所以我们维持社区标签。",
    whyUseful: "Bot 一路点错路径，示范一次快过改提示词。",
    whyItMatters: "有具体步骤，不是预告。社区；没有标官方，也没有标已测试。",
    whoShouldTry: ["Bot 一路走错路的人", "想教会例行工作的运营", "非工程师"],
    usefulFor: "运营",
    quote:
      "hit + in the chat and record yourself doing it in the browser. the bot watches, then it can do it again.",
    result: "录一次 · Bot 再走同一条路",
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

