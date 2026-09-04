import type { DiscoverStory } from "@/data/discover";
import { applyDiscoverTemplates, generatedCopyFor } from "./generated-discover";
import type { Locale } from "./types";

export type DiscoverStoryI18n = {
  title: string;
  headline: string;
  body?: string;
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
    title: "清掉你的電子郵件",
    headline: "Elon 今天在 X 把 Grok Bot 指向九萬封電子郵件的收件匣大掃除",
    whatTheyDid:
      "2026 年 8 月 19 日，Elon 引用 Mike P（@mikepat711）：Grok Bot 正在處理兩個 Gmail 帳號——大約九萬封電子郵件——刪掉 Mike 自己從來不敢動的垃圾。Elon 那句話就是產品提示：「用 @Grok @Bot 清掉你的電子郵件。」",
    howItWorks:
      "這不是發布演示。一個真人把兩個正在用的收件匣交給 Grok Bot，叫它清掉。Elon 同一個早上轉發。我們保留 Elon 原貼文。沒有在這裡重跑那九萬封。",
    whyUseful: "清理收件匣是人人都懂的 Grok Bot 工作。如果你盯著十年 Gmail 不敢動，這就是今天最受關注的公開例子。",
    whyItMatters: "今天 Elon 時間軸上最熱的 Grok Bot 貼文——幾小時幾百萬次觀看。工作是 Mike 的；熱度是 Elon 的。兩邊都寫清楚。",
    whoShouldTry: ["收件匣炸掉的人", "創辦人", "營運"],
    usefulFor: "被 Gmail 淹沒的人",
    quote: "用 @Grok @Bot 清掉你的電子郵件",
    result: "九萬封電子郵件 · 兩個 Gmail 帳號",
  },
  "week-of-hacks-nate-herk": {
    title: "一週 Grok Bot 技巧",
    headline: "Nate Herk 今天寫了九個 Grok Bot 技巧——Elon 問「你的 @Bots 是什麼？」",
    whatTheyDid:
      "Nate Herk 在 X 發表〈A Week of Grok Bot Lessons in 10 Mins〉：九個把預設 Bot 變成一隊的做法。Elon 同一個早上引用，問大家在跑什麼 Bot。",
    howItWorks:
      "他的做法：Grill Me 技能採訪你、抽出背景；Klaus 做幕僚長，你只跟一個 Bot 聊；專員 Motion、Eyes、Miner、Coffee、Views；共用記憶對私人記憶；Composio 接更多 app；ClickUp 避免工作消失在聊天；示範一次就教會；例行工作；已登入的瀏覽器設定檔。我們摘要公開文章——沒有重跑 Klaus。",
    whyUseful: "這是今天人們在收藏的設定文。如果你已經開了 Bot，卻仍覺得只是多一個聊天室，從這裡開始。",
    whyItMatters: "Elon 沒有再發一個新工作流程。他指著這篇。文章是工作；Elon 那句問，就是它出現在每條時間軸的原因。",
    whoShouldTry: ["已經有 Bot 的人", "想組一小隊的營運", "創作者"],
    usefulFor: "營運 / 創作者",
    quote: "你的 @Bots 是什麼？",
    result: "九個技巧 · 一個幕僚長",
  },
  "household-bots-blake-king": {
    title: "頭 48 小時，不用會寫程式",
    headline: "Blake King 零程式經驗試 Grok Bot——Elon 今天轉發",
    whatTheyDid:
      "Blake 接了公開挑戰，跳過 OpenClaw，兩個晚上：接上電子郵件、讓 Bot 做一份 12 頁家庭預算 PowerPoint、為太太的生意開一隊 Bot、再每天收 Tesla 新聞摘要。",
    howItWorks:
      "他說產品會一步步帶你設定。不用寫程式。先電子郵件，再預算簡報，再一小隊，再早報。Elon 在 2026 年 8 月 19 日轉發。我們沒有重跑他的 Bot。",
    whyUseful: "多數發布貼文當你已經會用 agent。這篇是非工程師，講頭幾份真正交得出去的工作。",
    whyItMatters: "今天它和清收件匣、Nate 的技巧一起出現在 Elon 時間軸。現在討論的就是：人用 Grok Bot 做家庭和小生意的真工作。",
    whoShouldTry: ["非工程師", "家庭", "小生意老闆"],
    usefulFor: "初學者 / 小生意",
    quote:
      "我完全沒有寫程式的經驗。……我設定好這個 bot、接上我的電子郵件，讓它做出完整的 12 頁家庭預算 PowerPoint",
    result: "12 頁預算簡報 · 48 小時，不用寫程式",
  },
  "grok-bot-launch-bot": {
    title: "Grok Bot 上線",
    headline: "@bot 介紹 Grok Bot：擁有自己電腦的 AI 隊友",
    whatTheyDid:
      "官方 @bot 帳號宣布 Grok Bot 進入早期測試：每個 Bot 有自己的電腦，登入你已經在用的工具，需要批准時才回來找你。",
    howItWorks:
      "這是產品發布貼文，不是單一工作流程。後來的官方例子——銷售外展、收件匣、CRM、工程——都掛在這則原文上。我們保留原貼文連結，再用白話講清楚它在說什麼。",
    whyUseful: "如果你剛接觸 Grok Bot，先看這裡，再複製提示詞。",
    whyItMatters: "之後很多 Grok Bot 文章都會指回這則宣布。短摘要加原貼文，比自己刷回覆更快。",
    whoShouldTry: ["正在評估 Grok Bot 的人", "決定要不要訂閱的創辦人"],
    usefulFor: "剛接觸 Grok Bot 的人",
    quote: "介紹 Grok Bot，現已進入早期測試。Bot 是 AI 隊友……",
    output: "早期測試宣布",
  },
  "overnight-sales-xai": {
    title: "通宵銷售外展",
    headline: "xAI 用 Grok Bot 通宵研究客戶，早上只留待批准的草稿",
    whatTheyDid:
      "一個銷售外展 Bot 會通宵研究帳號、依意向為聯絡人打分，再用每位銷售的語氣起草電子郵件和 LinkedIn，早上只留一疊等你批准的草稿。",
    howItWorks: "Bot 趁你睡覺用瀏覽器和現有銷售工具開工。早上你審的是草稿，不是還要自己變成電子郵件的對話摘要。",
    whyUseful: "適合創辦人和 SDR：站會前管道工作已經做好，但又不會讓 Bot 未經批准就寄出。",
    whyItMatters: "這是官方旗艦例子。重點是：做完的工作落到真正的收件匣。",
    whoShouldTry: ["SDR", "自己做外展的創辦人", "銷售主管"],
    usefulFor: "銷售 / 創辦人",
    quote: "通宵研究帳號、依意向為聯絡人打分，再用每位銷售的語氣起草電子郵件和 LinkedIn",
    result: "通宵研究 · 早上只留待批准草稿",
  },
  "crm-notes-xai": {
    title: "通話後更新 CRM",
    headline: "xAI 用銷售 Bot 把通話逐字稿寫進 CRM",
    whatTheyDid: "在 SpaceXAI 內部，一個銷售 Bot 會用通話逐字稿更新 CRM，並起草跟進，紀錄留在人類本來就會用的工具裡。",
    howItWorks: "通話後 Bot 讀逐字稿、寫欄位和下一步，放進 CRM。改交易階段或數字仍然要人批准。",
    whyUseful: "CRM 腐爛很安靜、也很貴。把筆記寫進真正的系統，勝過摘要留在聊天室。",
    whyItMatters: "xAI 自己說：工作還沒放到隊友會放的位置，就不算做完。這就是銷售營運版。",
    whoShouldTry: ["客戶經理", "銷售營運", "自己兼 CRM 的創辦人"],
    usefulFor: "銷售營運 / 客戶經理",
    quote: "一個銷售 Bot 用通話逐字稿更新 CRM，並起草後續跟進",
    output: "結構化 CRM 更新",
  },
  "inbox-organizer-xai": {
    title: "收件匣管家",
    headline: "xAI 專用一個 Bot 管收件匣",
    whatTheyDid: "SpaceXAI 團隊會疊幾個 Bot：上面一個幕僚長，下面有專責收件匣的一條線，不必一個 Bot 包辦所有事。",
    howItWorks: "一個 Bot 負責收件匣：分類、草稿、提醒你丟掉的對話。另一個可以坐在上面，只在要判斷時拉你進場。",
    whyUseful: "多數人不需要 12 個 Bot 的組織圖。他們需要一個讓早上 Gmail 小一點的 Bot。",
    whyItMatters: "官方模型是一小隊 Bot，不是一個萬能代理。收件匣是幾乎人人都懂的那條線。",
    whoShouldTry: ["創辦人", "營運", "收件匣等於工作的人"],
    usefulFor: "營運 / 創辦人",
    quote: "上面是幕僚長，下面每條線有專員：收件匣管理、開支、招募……",
    output: "已分類的收件匣",
  },
  "expense-manager-xai": {
    title: "開支管家",
    headline: "xAI 把開支交給一個 Bot，收據就不要再躺在 Gmail",
    whatTheyDid: "官方例子包括開支專員，以及一個營運 Bot 處理 Gmail 收到的發票，再寫進財務已經在用的工具。",
    howItWorks: "Bot 看收件匣裡的收據和發票、抽出事實、更新表格或財務工具。看起來像付款的，仍然要你批准。",
    whyUseful: "收據放久了就難找。每天掃一次，勝過月底再用 Gmail 搜尋翻箱倒櫃。",
    whyItMatters: "這是不性感的官方工作——重點就在這裡。Grok Bot 賣的是沒人想重做的隊友工作。",
    whoShouldTry: ["創辦人", "辦公室主任", "小型財務團隊"],
    usefulFor: "營運 / 財務",
    quote: "一個營運 Bot 幫新進人員辦入職，並處理 Gmail 收到的發票",
    output: "從 Gmail 入帳收據",
  },
  "bug-reproduction-xai": {
    title: "重現 Bug",
    headline: "xAI 用工程 Bot 在產品介面重現 bug，再開立工單",
    whatTheyDid: "一個工程 Bot 會在產品介面重現 bug、開立工單，再把修復交給除錯 Bot——報告就不再是一句含糊的 Slack 訊息。",
    howItWorks: "有人描述 bug。Bot 打開產品、走一遍步驟、寫下看到了什麼，再提到團隊已經在用的追蹤器。",
    whyUseful: "適合小工程團隊：報告者已經撞過一次的 bug，不要再花時間重找。",
    whyItMatters: "官方工程例子不多。這個很具體：重現、開立工單、交接——不是「幫我寫程式碼」。",
    whoShouldTry: ["工程師", "QA", "兼做支援的創辦人"],
    usefulFor: "工程 / QA",
    quote: "在產品介面重現 bug、開立工單，再把修復交給除錯 Bot",
    output: "重現 bug 並開立工單",
  },
  "vendor-negotiation-xai": {
    title: "供應商議價",
    headline: "xAI 說已有人用 Grok Bot 以自己的語氣和供應商談",
    whatTheyDid:
      "Grok Bot 團隊的早期例子（Digital Trends 報道）包括用你自己的語氣直接和供應商談——Bot 起草並跟進對話，成交仍然要你批准。",
    howItWorks: "你示範自己怎麼寫、肯出多少。Bot 在你已有的工具跟進供應商對話，沒見過的承諾就停。",
    whyUseful: "當談判主要是電子郵件、而且重複，又想語氣像你，就合適。",
    whyItMatters: "這是官方團隊例子，不是具名客戶案例。我們留下是因為工作很具體——而且涉及錢的電子郵件，最後一下仍應是人。",
    whoShouldTry: ["創辦人", "營運主管", "要買軟體或服務的人"],
    usefulFor: "創辦人 / 營運",
    quote: "用他們自己的語氣和供應商談",
    output: "用你語氣寫的供應商對話",
  },
  "store-support-xai": {
    title: "網店客服佇列",
    headline: "xAI 說有人用 Grok Bot 管網店客服",
    whatTheyDid: "Grok Bot 團隊的早期例子包括處理網店顧客支援——分類、草稿、更新，都在店鋪已經在用的工具裡做。",
    howItWorks: "Bot 讀新工單或電子郵件、分組、起草回覆。發布或退款先留給你，直到你信任這條線。",
    whyUseful: "適合小店：客服是創辦人半夜回，不是 20 人客服台。",
    whyItMatters: "支援量大，只要最後一下留給人，就容易還原。這符合 xAI 講 Bot 應該接的工作。",
    whoShouldTry: ["網店創辦人", "支援主管", "一個人獨力支撐的營運者"],
    usefulFor: "支援 / 創辦人",
    quote: "管理網店的客服支援",
    output: "客服佇列草稿",
  },
  "reddit-thread-scout-axel": {
    title: "Reddit 討論串偵察",
    headline: "Axel Schapmann 用 Grok Bot 做 Reddit 行銷——找值得加入的討論串，不是刷屏",
    whatTheyDid:
      "Axel 寫過用 Grok Bot 做 Reddit 行銷：找你真能幫上忙的新討論串，以及仍然排得上名的舊討論串，然後停在留言草稿。",
    howItWorks: "把網站、產品和幾個競爭對手交給 Bot。它搜尋 Reddit 和 Google，評匹配度和刷屏風險，留言留給你自己發。",
    whyUseful: "找到對的討論串才是慢的部分。進對房間，寫留言就容易。",
    whyItMatters: "這是公開的社群文章，不是 xAI 截圖。我們整理成卡片和可複製工作流程——沒有在這裡重跑他的 Bot。",
    whoShouldTry: ["創辦人", "行銷人員", "獨立開發者"],
    usefulFor: "行銷 / 創辦人",
    output: "討論串清單 + 留言草稿",
  },
  "travel-concierge-nate": {
    title: "旅行管家",
    headline: "Nate 用 Grok Bot 計劃旅行——他一天內開了十二個 Bot，這是其中一份工作",
    whatTheyDid: "Nate 在公開評測裡大約八小時開了一隊 Bot。旅行計劃是其中一份工作，還有運動和聯絡人研究。",
    howItWorks: "你給日期、預算和限制。Bot 比較公開選項，寫出一天一天的計劃。下單仍然是你。",
    whyUseful: "旅行研究很快變成 40 個分頁。交回一份短簡報，才是非技術使用者用得上的版本。",
    whyItMatters: "Nate 的標準是「做完」，不是「叫你做」。旅行是清楚的個人例子——也提醒 Grok Bot 不只是銷售工具。",
    whoShouldTry: ["忙的專業人士", "家庭", "討厭 40 個分頁研究的人"],
    usefulFor: "要計劃旅行的人",
    quote: "其他的負責旅行規劃、運動和聯絡人研究。",
    output: "一天一天的行程簡報",
  },
  "youtube-comments-remy": {
    title: "YouTube 留言台",
    headline: "Remy 讓內容 Bot 開始回 YouTube 留言",
    whatTheyDid: "Remy 做了一個叫 Gordon 的內容 Bot。現場試過之後，Gordon 開始按行程起草 YouTube 留言回覆——最後一下仍是 Remy。",
    howItWorks: "把影片或頻道交給 Bot。它把留言分組，用你的語氣寫短回覆。聽起來像你的，才由你發布。",
    whyUseful: "有用的問題會被表情蓋過。每天處理一輪，勝過想起才打開 YouTube Studio。",
    whyItMatters: "這是具名的人、具名的 Bot、公開寫出來。我們摘要這份工作；不會說我們重測過 Gordon。",
    whoShouldTry: ["創作者", "教育者", "產品行銷"],
    usefulFor: "創作者 / 內容",
    quote: "我讓 Gordon……開始回覆我的 YouTube 留言。",
    output: "YouTube 回覆草稿",
  },
  "newsletter-to-social-remy": {
    title: "電子報轉社交",
    headline: "Remy 用內容 Bot 把上週電子報改寫成 X 和 LinkedIn 貼文",
    whatTheyDid: "同一個內容 Bot Gordon，把上週電子報改寫到 X 和 LinkedIn。Remy 說現在自動跑，幾乎不用再教。",
    howItWorks: "Bot 讀那期內容，按平臺長度用你的語氣寫貼文，留草稿。你再發布。我們對應的工作流程會在發布前停。",
    whyUseful: "內容已經有了。稅是改三次格式。這份工作適合交給 Bot。",
    whyItMatters: "社群例子最好有 Bot 名和產出。這篇兩樣都有。",
    whoShouldTry: ["寫電子報的人", "會發貼文的創辦人", "內容主管"],
    usefulFor: "內容 / 創辦人",
    quote: "我讓 Gordon 把上週電子報改寫到 X 和 LinkedIn",
    output: "X 和 LinkedIn 草稿",
  },
  "monday-marketing-report-jellypod": {
    title: "星期一市場報告",
    headline: "Jellypod 第一個 Grok Bot 行銷做法，是星期一巡一圈儀表板",
    whatTheyDid:
      "Jellypod 的公開指南從你每週已經在做的匯報開始：走一遍 GA4、廣告、排名和電子郵件，抄你點名的數字，留一頁簡報。",
    howItWorks: "示範巡迴一次。排星期一早。只有指標越過你設的線，Bot 才吵你。",
    whyUseful: "星期一早上還不知道上週行不行，已經登入六次。填好的簡報，勝過再開一個儀表板。",
    whyItMatters: "這是實務指南，不是爆紅截圖。我們留下是因為工作悶、每週都做、又容易抄。",
    whoShouldTry: ["行銷經理", "創辦人", "代理公司負責人"],
    usefulFor: "行銷 / 創辦人",
    quote: "產出是一份填好的摘要，打開筆電就在那裡，不是又一個要去看的儀表板。",
    output: "一頁星期一簡報",
  },
  "competitor-monitor-jellypod": {
    title: "競爭對手監控",
    headline: "Jellypod 寫過每週用 Grok Bot 巡競爭對手網站和廣告庫",
    whatTheyDid:
      "同一篇指南的第二個做法：教 Bot 每週走一份固定清單——廣告庫、評論站、競爭對手更新——只標出真正變了的。",
    howItWorks: "你示範清單一次。Bot 記下差異：新承諾、價格改、評論裡新出現的反對——留題材，不是倒出 40 頁。",
    whyUseful: "適合創辦人和行銷團隊：不想每天人手打開競爭對手網站。",
    whyItMatters: "競爭對手監控是人們最先問的例子。這個版本有來源、改錯回得去，也對應完整 UseGrokBot 工作流程。",
    whoShouldTry: ["創辦人", "行銷團隊", "產品行銷"],
    usefulFor: "行銷 / 創辦人",
    quote: "廣告庫、評論網站和競爭對手更新紀錄，正是 Grok Bot 擅長的形狀",
    output: "每週競爭對手差異",
  },
  "one-person-company-rahul": {
    title: "一人公司",
    headline: "Rahul 寫了怎樣用 Grok Bot 跑一人公司——從找客到每週匯報",
    whatTheyDid:
      "2026 年 8 月 19 日，Rahul（@sairahul1）在 X 發表文章〈How To Build a One-Person Company Using Grok Bot〉。開頭就是一人公司的負荷——找客、寫外展、做圖、回覆、盤點一週——再用 Bot 系統接手這些線。",
    howItWorks:
      "他講設定、外掛、每個 Bot 一份章程、示範一次就變成例行工作，以及六個起步角色（幕僚長、Scout、Quill、Forge、Guide、Ledger）。我們摘要公開文章——沒有重跑他的公司棧。附近一則流傳的 Elon 連結其實引用了另一篇 Grok Bot 貼文，所以我們保留 Rahul 原文。",
    whyUseful: "這是今天人們在打開的長文：「一份工作一個 Bot」。如果你就是整間公司，從這裡開始。",
    whyItMatters: "今天 X 上最熱的社群 Grok Bot 指南。是打法，不是客戶截圖。我們保留 Rahul 原貼文。",
    whoShouldTry: ["一人創辦人", "自己就是整間公司的營運", "已經在付 Grok Bot 的人"],
    usefulFor: "一人創辦人 / 營運",
    quote: "你找潛在客戶。寫外展。做圖。回覆。再盤點這一週。",
    result: "六個起步 Bot · 一人公司",
  },
  "podcast-summarizer-gavin-baker": {
    title: "十五秒做出 Podcast 摘要",
    headline: "Gavin Baker 用大約十五秒在 Grok Bot 做了 Podcast 摘要工具——說比舊那套更好",
    whatTheyDid:
      "2026 年 8 月 17 日，Gavin Baker（@GavinSBaker）寫 @bot 是 AI 的另一個 「Claude Code」 moment，個人 AI 用量大概增加了 100 倍。具體的工作：之前有人問他怎麼做 Podcast 摘要工具。在 Grok Bot 裡大約十五秒就做好，而且比他之前用的更好。",
    howItWorks: "這是具名投資人交出的第一份真工作，不是發布演示。我們保留 Gavin 原貼文。沒有重跑他的摘要工具。",
    whyUseful: "每天一堆 Podcast，是投資人和營運已經有的工作。這就是公開例子：交給 Bot，而不是再做一套自己的工具。",
    whyItMatters: "這週最受注意的社群 Grok Bot 使用案例貼文之一。社群；沒有標已測試。",
    whoShouldTry: ["投資人", "聽的比時間多的營運", "一直想做摘要工具的人"],
    usefulFor: "研究 / 營運",
    quote:
      "之前有人問我怎麼做「podcast 摘要工具」——在 Grok Bot 裡大約十五秒就做好，而且比我以前用的更好。",
    result: "Podcast 摘要 · 大約十五秒",
  },
  "clothes-resale-scotty-beam": {
    title: "賣掉沒穿過的衣服",
    headline: "SCOTTY BEAM 寫 Cursor 同事把妹妹沒穿過的衣服交給 Grok Bot",
    whatTheyDid:
      "2026 年 8 月 18 日，SCOTTY BEAM（@ScottyBeamIO）寫有 Cursor 的人把妹妹不再穿的一堆衣服交給 Grok Bot。賣掉要拍照、上架、寫描述、回買家、議價——所以一直拖。那堆衣服就交給 Bot。",
    howItWorks:
      "Scotty 說 Bot 看照片、認衣服、寫商品頁，再和買家議價。他也指向自己較長的文章，比較 Grok Bot、Hermes、OpenClaw，以及自動化 X 內容。賣衣服是 Cursor 那個人的工作；比較文是 Scotty 自己的。兩邊都沒有在這裡重跑。",
    whyUseful: "一堆衣服就是人人都懂的工作：拖著的麻煩，一句「賣掉這些」。",
    whyItMatters: "這是轉述別人的 Bot，加上 Scotty 自己的長文。兩邊都寫清楚。",
    whoShouldTry: ["堆著二手貨的人", "一人營運", "拖著上架的人"],
    usefulFor: "二手 / 一人營運",
    quote: "你只要說：「賣掉這些」。其餘交給它想。",
    result: "拍照、上架、回買家、議價",
  },
  "3d-game-roundtable-space": {
    title: "3D 遊戲，再自己上傳",
    headline: "0xMarioNawfal 寫 Grok @bot 做了 3D 遊戲、自己打、再把影片上傳到 X",
    whatTheyDid:
      "2026 年 8 月 19 日，0xMarioNawfal（@RoundtableSpace）寫 Grok @bot 可以做成整個 3D 遊戲、自己錄螢幕自動玩、剪片，再上傳到 X——全部自己做。附件片段來自 Dan（@Daniel_Farinax）。",
    howItWorks: "Mario 轉發一段公開錄像。我們保留他原貼文。沒有重跑那個遊戲，也沒有重做上傳。",
    whyUseful: "這是人們會指著的電腦用工：不是聊天答案——是做好的遊戲，再加一條交得出去的 X 影片。",
    whyItMatters: "當日社群轉發一份具體 Bot 工作。片段是 Dan 的；貼文是 Mario 的。兩邊都寫清楚。",
    whoShouldTry: ["建造者", "做遊戲的人", "想 Bot 交出片段的創作者"],
    usefulFor: "建造者 / 創作者",
    quote: "它會自己錄螢幕、自動玩遊戲、剪影片，再把影片上傳——全部自己做",
    result: "3D 遊戲 · 錄、剪、上傳到 X",
  },
  "five-bots-peter-yang": {
    title: "五個實用 Bot",
    headline: "Peter Yang 出了五個 Grok Bot 教學——顧問、YouTube、X、收件匣、旅行",
    whatTheyDid:
      "2026 年 8 月 17 日，Peter Yang（@petergyang）發教學：五個有用的 Bot——一個顧問負責開和管理其他 Bot、YouTube 研究找出局片、X 偵察找爆紅和搞笑貼文、「數位 Marie Kondo」清收件匣和忘記的訂閱、再加上旅行禮賓。",
    howItWorks:
      "他也試過 Gamer Bot 玩經典遊戲，並問 Grok Bot 能不能取代 ChatGPT 做日常主力。我們摘要公開貼文——沒有重跑他那五個。",
    whyUseful: "五份有名的工作，不是空泛「試試 agent」。想組第一隊，抄這張名單。",
    whyItMatters: "這週人們在收藏的實用設定教學。社群文；我們保留 Peter 原貼文。",
    whoShouldTry: ["剛組第一隊 Bot 的人", "創作者", "營運"],
    usefulFor: "營運 / 創作者",
    quote: "這是我的新教學，示範怎麼設定 5 個實用 Bot",
    result: "五個 Bot · 顧問加專員",
  },
  "ultimate-guide-miles-deutscher": {
    title: "Grok Bot 完全指南",
    headline: "Miles Deutscher 發表〈Grok Bot: The Ultimate Guide〉——設定、外掛、他那五個",
    whatTheyDid:
      "2026 年 8 月 18 日，Miles Deutscher（@milesdeutscher）發長文：Grok Bot 是什麼、怎樣設定、外掛，以及他實際在跑的五個——Alex 找 YouTube 出局片、Sandra 看樓盤、Jonathan 看投資組合、Lucy 分 Slack、Oscar 做雜務。",
    howItWorks:
      "他說從發布就開始試。文章就是工作——設定、使用案例、外掛，和老實的價錢。我們沒有重跑 Alex 或 Sandra。",
    whyUseful: "如果你想抄一套公開的配置——有名的 Bot、提示詞、外掛——這篇是長讀。",
    whyItMatters: "這週另一篇人們在打開的 Grok Bot 長文。社群；我們保留 Miles 原貼文。",
    whoShouldTry: ["已經有 Bot 的人", "想組一小隊的營運", "創作者"],
    usefulFor: "營運 / 創作者",
    quote: "Grok Bot 是我用過最強力的 AI agent。",
    result: "五個有名的 Bot · 設定加外掛",
  },
  "bot-team-tips-ben-lang": {
    title: "@bot 團隊提示",
    headline: "Ben Lang 收集了 @bot 團隊在傳的 Grok Bot 專業提示",
    whatTheyDid:
      "2026 年 8 月 18 日，Ben Lang（@benln）發了他從 @bot 團隊收集的清單：同一個外掛接多個帳號、一個幕僚長加幾個專員、釘住常用 agent、用 Notion 記沒做完的工作、示範一次教會，還有更多。",
    howItWorks:
      "他簡介寫著 Building SpaceXAI，via Cursor team。貼文仍然是個人帳號收集團隊提示——不是 @bot 或 @xai 原文——所以我們維持社群標籤，保留他原貼文。",
    whyUseful: "短、抄得走的設定習慣。如果你的 Bot 仍然只是多一個聊天室，先做幕僚長，再加一頁 Notion「還有什麼沒做」。",
    whyItMatters: "這是公開轉述的團隊提示，不是 UseGrokBot 重測。沒有標官方，也沒有標已測試。",
    whoShouldTry: ["已經有 Bot 的人", "想組一小隊的營運"],
    usefulFor: "營運",
    quote: "一個幕僚長加上幾個專員，勝過一個超大聊天室",
    result: "十二條提示 · 幕僚長加專員",
  },
  "ceo-desk-teslaconomics": {
    title: "六個 Bot 加一個 CEO",
    headline: "Teslaconomics 跑六個 Grok Bot，再加一個「CEO」在上面調度",
    whatTheyDid:
      "2026 年 8 月 14 日，Teslaconomics（@Teslaconomics）寫他已經有六個 Grok Bot，各做一份工作——提醒、圖像和影片、估公司、分析影片、幫忙發貼文——再在上面放一個 CEO Bot，他只跟一個收件匣聊。",
    howItWorks:
      "先專員，再幕僚長式 CEO 分派工作、交回一個包裹。他公開了第一則訊息和三個例行（早、午、晚）。我們沒有重跑他的配置。",
    whyUseful: "沒有 CEO，你就是各群組聊天室的中間人。這是公開可複製的做法：讓一個 Bot 做收件匣。",
    whyItMatters: "有名的人、有名的名單、公開提示詞。社群——我們沒有重測 CEO。",
    whoShouldTry: ["已經跑超過一個 Bot 的人", "營運", "創作者"],
    usefulFor: "營運 / 創作者",
    quote: "有了 CEO，你就像跟人一樣，只傳訊到一個收件匣。",
    result: "六個專員 · 一個 CEO Bot",
  },
  "agent-loops-alex-finn": {
    title: "最好的迴圈",
    headline: "Alex Finn 讓一個 Grok Bot 叫另一個每五分鐘迴圈做同一份工作",
    whatTheyDid:
      "2026 年 8 月 16 日，Alex Finn（@AlexFinn）寫 Grok Bot 天生適合迴圈：主 agent 叫另一個每五分鐘迴圈一份工作，再監控它。他說有一個調度 Bot 看著工程 Bot 二十四小時，每三十分鐘想一個改進方法。",
    howItWorks:
      "他對比單一 Bot 用 /loop 自己看自己。多一個 Bot 就是另一個上下文做判斷。我們摘要公開貼文——沒有重跑他那二十四小時迴圈。",
    whyUseful: "如果你想工作自己繼續，又不想自己盯著 /loop，這就是兩個 Bot 的版本。",
    whyItMatters: "有人公開在跑的具體迴圈做法。社群；我們沒有重測工程迴圈。",
    whoShouldTry: ["建造者", "工程師", "要跑長任務的研究"],
    usefulFor: "建造者 / 工程",
    quote:
      "你只要叫主 agent 再叫另一個 agent 每五分鐘迴圈同一份任務，並在過程中監控它",
    result: "五分鐘迴圈 · 調度加專員",
  },
  "grok-bot-walkthrough-alex-finn": {
    title: "設定走查",
    headline: "Alex Finn 發了 Grok Bot 設定影片——使用案例和外掛",
    whatTheyDid:
      "2026 年 8 月 18 日，Alex Finn（@AlexFinn）發了另一篇，不是那則五分鐘迴圈：一支影片講怎樣設定 Grok Bot、使用案例、外掛，以及設定對了才會好用。他說是一隊可以日夜開工的 agent。",
    howItWorks: "這是公開設定走查，不是客戶截圖。我們保留 Alex 原貼文。沒有重跑他的配置，也沒有重剪影片。",
    whyUseful: "如果你想一支片從設定開始——不是另一則五分鐘迴圈——這就是人們在看的那支。",
    whyItMatters: "這週最受注意的社群 Grok Bot 設定片。和迴圈卡是另一則貼文。社群；沒有標已測試。",
    whoShouldTry: ["剛開第一個 Bot 的人", "營運", "創作者"],
    usefulFor: "營運 / 創作者",
    quote: "這支影片講 Grok Bot 怎麼設定、使用案例、外掛，以及設定對了為什麼特別好用",
    result: "影片走查 · 設定、使用案例、外掛",
  },
  "firstmate-kun-chen": {
    title: "Firstmate，一個收件匣",
    headline: "Kun Chen 公開可複製的 Firstmate 提示——你只跟一個 Grok Bot 聊",
    whatTheyDid:
      "2026 年 8 月 18 日，Kun Chen（@kunchenguid）發了一個 Firstmate Bot 系統提示：開一個、把 github.com/kunchenguid/firstmate 的 GROK_BOT.md 貼進描述，之後只跟這個聊。它開、分派、協調其他 Bot。",
    howItWorks:
      "他說 Firstmate 是他在其他 harness 已用的幕僚長做法，現在變成一段短 Grok Bot 描述。我們沒有重跑 Firstmate。",
    whyUseful: "如果你不想十二個聊天室，這是公開提示：一個 Bot 去招募並調度其餘的。",
    whyItMatters: "有 repo、有提示、有名的人。社群——我們沒有重測 Firstmate。",
    whoShouldTry: ["已經有 Bot 的人", "想要一個收件匣的營運"],
    usefulFor: "營運",
    quote: "你只跟這一個 agent 聊。它為你建立、分派、調度，並持續改進其他 Bot。",
    result: "一個 Firstmate · 可複製提示",
  },
  "calendar-booking-yunta-tsai": {
    title: "看日曆，再訂位",
    headline: "Yun-Ta Tsai 用中英夾雜對 Grok Bot 說：找還沒訂的預約，邊走向車邊訂",
    whatTheyDid:
      "2026 年 8 月 12 日，Yun-Ta Tsai（@yunta_tsai）寫 Grok Bot 走完他的日曆，找出事前還要預訂、但他沒做的事，選最好的時間，再在網站上走預訂流程。他在停車場走向車的時候，用中英夾雜和它說。",
    howItWorks: "先語音、再掃日曆，然後 Bot 去預訂網站開工。我們保留 Yun-Ta 原貼文。沒有重跑那次預訂。",
    whyUseful: "這是人們會指著的個人營運工作：不是聊天摘要——是日曆上還要訂的位，走向車就已經處理。",
    whyItMatters: "Grok Bot 上線那週的公開電腦用例子。社群；沒有標已測試。",
    whoShouldTry: ["忙的專業人士", "日曆上還有未訂預約的人", "想說、不想打字的人"],
    usefulFor: "個人 / 營運",
    quote:
      "我在停車場走向車的時候，用中英夾雜跟它說話。",
    result: "掃日曆 · 在網站上預訂",
  },
  "parents-bot-yunta-tsai": {
    title: "給父母的第一個 Bot",
    headline: "Yun-Ta Tsai 為父母開了第一個 Grok Bot——說它會中文，不用走外掛迷宮",
    whatTheyDid:
      "2026 年 8 月 19 日，Yun-Ta Tsai（@yunta_tsai）寫 Grok Bot 是他會推薦給年長父母的第一個 AI 產品。他們已經會聊天。不想跳技能、外掛、MCP。想問完就有人做完。他引用自己先前那則：給父母的第一個 Bot，標了「乖兒子」。",
    howItWorks:
      "跟進貼文是論點：自然、順、中文好，年長的人可以自己做完多數事，不用靠人。我們保留這則原貼文。沒有幫他父母開 Bot。",
    whyUseful: "如果使用者是永遠不會設定 MCP 的父母，這就是公開的「問就行」例子。",
    whyItMatters: "和日曆訂位是同一個人。另一份工作：給不用學技術棧的人用的 Bot。",
    whoShouldTry: ["幫父母開 Bot 的子女", "不會碰外掛的人", "講中文的家庭"],
    usefulFor: "個人 / 家庭",
    quote: "Grok @bot 大概是我會推薦給年長父母的第一個 AI 產品。",
    result: "給父母的第一個 Bot · 中文",
  },
  "eight-use-cases-eric-zakariasson": {
    title: "這週八個使用案例",
    headline: "eric zakariasson 發了這週八份 Grok Bot 工作——第一份是發訊息指揮吸塵機器人",
    whatTheyDid:
      "2026 年 8 月 19 日，eric zakariasson（@ericzakariasson）發了一串：這週八個很有趣的 Grok Bot 使用案例。第一個是把 Bot 接到吸塵機器人，再發訊息叫 Grok 去哪裡清潔——引用 Yun-Ta Tsai 接 Matic 那則。",
    howItWorks:
      "其餘指向其他公開工作：過 Google「我不是機器人」、整台 Mac 當成人類工作間、3D 遊戲、水管公司辦公室主任、追從未退款的商戶、招募再加清掉剩餘訂閱、以及五盤生意的夜班。我們摘要 Eric 的彙整——八份都沒有重跑。",
    whyUseful: "一串、八份具體工作。想看這週人實際發過什麼，從這裡開始。",
    whyItMatters: "這是社群彙整，不是 Eric 自己的吸塵器。吸塵工作是 Yun-Ta 的；名單是 Eric 的。兩邊都寫清楚。",
    whoShouldTry: ["在收集第一份工作的人", "營運", "想掃這週公開例子的人"],
    usefulFor: "營運",
    quote: "這週八個很有意思的 grok bot 使用案例！",
    result: "八份公開工作 · 從吸塵機器人開始",
  },
  "three-employees-scotty-beam": {
    title: "Gustavo、Walter、Jesse",
    headline: "SCOTTY BEAM 寫了三個有名的 Grok Bot 員工——Gustavo 管 Notion，Walter 管 DocuSign，Jesse 管 ManyChat",
    whatTheyDid:
      "2026 年 8 月 18 日，SCOTTY BEAM（@ScottyBeamIO）寫有人教 Grok Bot 跑生意：自己做一次，讓 Bot 看著。三個有名的員工：Gustavo 管營運（Notion 客戶中心、入職表格、第一次通話前準備）；Walter 管銷售（協議經 DocuSign，跟到客戶簽署並付款）；Jesse 管線索（ManyChat 私訊寫進 Notion，有人問價錢就立刻通知）。",
    howItWorks:
      "Scotty 說它們共用一台雲端電腦和登入。這則貼文和賣沒穿過的衣服是另一則。我們保留這則原貼文。沒有重跑 Gustavo、Walter 或 Jesse。",
    whyUseful: "有名的工作、有名的工具。想組第一隊銷售營運，抄這三條線。",
    whyItMatters: "熱度一般，配置很具體。社群轉述別人的團隊——我們留 Scotty 原貼文，不會發明創辦人是誰。",
    whoShouldTry: ["一人營運", "小銷售團隊", "想用示範教會 Bot 的人"],
    usefulFor: "營運 / 銷售",
    quote: "他自己先做一次任務，讓 bot 看著，再叫它做同樣的事。",
    result: "Gustavo · Walter · Jesse",
  },
  "math-explainer-yunta-tsai": {
    title: "給孩子的數學片",
    headline: "Yun-Ta Tsai 讓 Grok Bot 做數學講解影片——用 Grok 語音 API 講得興高采烈",
    whatTheyDid:
      "2026 年 8 月 16 日，Yun-Ta Tsai（@yunta_tsai）寫孩子卡住怎麼把數字拆成冪次和，他又找不到好的講解。於是讓 Grok Bot 做一條。Bot 把想法做出來等他審——還用 Grok 語音 API 做了開朗的旁白。",
    howItWorks: "他說可以把擱著的想法丟給 Bot，它會做出來等你審。我們保留原貼文和附件影片。沒有重做那條講解。",
    whyUseful: "一條教學影片就是你會拖的工作。交出去，再審成品。",
    whyItMatters: "有名的人、有名的工作、有附件影片。社群；沒有標已測試。",
    whoShouldTry: ["父母", "老師", "要一條一次性講解的創作者"],
    usefulFor: "內容 / 個人",
    quote: "我請 @bot 做一條。它甚至用 @grok 語音 API 做了開朗的旁白。",
    result: "數學講解影片 · Grok 語音 API",
  },
  "teach-a-task-eric-zakariasson": {
    title: "示範一次就教會",
    headline: "eric zakariasson 示範怎麼教 Grok Bot 一份工作——點 +、錄瀏覽器，Bot 再做一次",
    whatTheyDid:
      "2026 年 8 月 13 日，eric zakariasson（@ericzakariasson）發了短教學：聊天室點 +，錄自己在瀏覽器怎麼做，Bot 看著就可以再做。他說多數工作它自己做得完——當它卡住再用這招。",
    howItWorks:
      "這是帶片段的功能走查，不是客戶截圖。他簡介寫著 tinkering @spacexai；貼文仍然是個人帳號，所以我們維持社群標籤。",
    whyUseful: "Bot 一路點錯路徑，示範一次比改提示詞更快。",
    whyItMatters: "有具體步驟，不是預告。社群；沒有標官方，也沒有標已測試。",
    whoShouldTry: ["Bot 一路走錯路的人", "想教會例行工作的營運", "非工程師"],
    usefulFor: "營運",
    quote:
      "在聊天室點 +，錄下你在瀏覽器裡怎麼做。bot 看著，之後就能再做一次。",
    result: "錄一次 · Bot 再走同一條路",
  },
  "support-refunds-gergely-orosz": {
    title: "客服收件匣，再退款",
    headline: "Gergely Orosz 把 Grok Bot 接到客服電子郵件——再經 Stripe API 做例行退款",
    whatTheyDid:
      "2026 年 8 月 19 日，Gergely Orosz（@GergelyOrosz）寫他把 Grok Bot 接到自己的客服電子郵件。Bot 可以經 API 連 Stripe，做 agentic 操作——例子是例行退款。附件截圖是 Stripe 的 agent 授權畫面：「Agent is now authorised to continue。」",
    howItWorks:
      "客服電子郵件進、Stripe API 出。他讚 Stripe 已經建好這條 agentic 流程。我們保留 Gergely 原貼文。沒有重跑他的收件匣，也沒有代發退款。",
    whyUseful:
      "客服加退款就是開店的人實際在做的工作。這是具名的人，把 Bot 放進真正的收件匣和付款 API，不是空泛「試試 agent」。",
    whyItMatters: "當日社群例子：真正的客服收件匣，真正的 Stripe 授權畫面。社群；沒有標已測試。",
    whoShouldTry: ["自己兼客服的創辦人", "已經在 Stripe 退款的營運", "客服佇列同時也是帳務佇列的人"],
    usefulFor: "支援 / 營運",
    quote:
      "把 Grok Bot 接到我的客服電子郵件……它還能經 API 連 Stripe，做 agentic 操作，例如例行退款。",
    result: "客服收件匣 · Stripe API 退款",
  },
  "remote-mower-sawyer-merritt": {
    title: "遠端開割草機",
    headline: "Sawyer Merritt 設定 Grok Bot，遠端控制五十英里外的自動割草機器人",
    whatTheyDid:
      "2026 年 8 月 19 日，Sawyer Merritt（@SawyerMerritt）寫他把 Grok Bot 設成可以遠端控制五十英里外的自動割草機器人。設定用了兩分鐘。他叫它開始割草，三秒後就動了。然後叫它自己回充電座。他說下一步會接吸塵器，再專用一個 Grok Bot 管所有自動機器人。附件截圖是 Engineer Bot 對話：已連 Navimow X450，再「Start mowing now」和「Go dock」。片段是 Navimow X450 地圖。",
    howItWorks: "聊天進、割草機出。我們保留 Sawyer 原貼文。沒有重跑那次開割或回座。",
    whyUseful: "遠端開和回座就是人人都懂的工作：不是聊天摘要——是五十英里外的機器，叫它割，再叫它回家。",
    whyItMatters: "當日社群例子：具名的人、在用的割草機、Engineer Bot 截圖。社群；沒有標已測試。",
    whoShouldTry: ["有割草機器人的人", "出門了但草地還要割的人", "想用一個 Bot 管家用機器人的人"],
    usefulFor: "個人 / 家庭",
    quote: "我叫它開始割草，三秒後就動了。然後叫它自己回充電座。",
    result: "遠端開割草 · 回座",
  },
  "lennybot-lenny-rachitsky": {
    title: "Lennybot，他自己的檔案庫",
    headline:
      "Lenny Rachitsky 發了用 500 多集 podcast 和電子報訓練的 Grok Bot——當產品、策略、增長、職涯顧問",
    whatTheyDid:
      "2026 年 8 月 19 日，Lenny Rachitsky（@lennysan）發熱門提示：開一個用他 500 多集 podcast 和電子報訓練的 Grok Bot，當成產品／策略／增長／職涯顧問。他列出問題——頭 1,000 個用戶、怎麼升遷、不太明顯的增長點子、PM 面試題、怎麼給難聽的回饋——並說這可能很快變成讀他內容最好的方法。他公開的提示：You're Lennybot. 裝這個自訂 MCP：mcp.lennysdata.com/mcp。用原生 connector 流程，不要本機設定檔。打開授權連結，等他完成電子郵件登入，再開 connector，用搜尋「product-market fit」核對檔案庫。",
    howItWorks:
      "具名的人公開了可複製的 Lennybot 提示加自訂 MCP。我們保留 Lenny 原貼文。沒有重跑 Lennybot，也沒有代他登入。",
    whyUseful:
      "如果你已經在聽 Lenny，想問檔案庫一份工作上的問題，這就是公開設定——不是空泛「試試 agent」。",
    whyItMatters: "當日社群例子，來自具名產品作者。社群；沒有標已測試。",
    whoShouldTry: ["產品經理", "在找頭一批用戶的創辦人", "已經在讀 Lenny 的人"],
    usefulFor: "產品 / 增長",
    quote: "把它當成你的產品／策略／增長／職涯顧問。",
    result: "Lennybot · 500 多集 + 電子報檔案庫",
  },
};

const hans: Record<string, DiscoverStoryI18n> = {
  "clear-email-elon": {
    title: "清掉你的邮件",
    headline: "Elon 今天在 X 把 Grok Bot 指向九万封邮件的收件箱大扫除",
    whatTheyDid:
      "2026 年 8 月 19 日，Elon 引用 Mike P（@mikepat711）：Grok Bot 正在处理两个 Gmail 账号——大约九万封邮件——删掉 Mike 自己从来不敢动的垃圾。Elon 那句话就是产品提示：「用 @Grok @Bot 清掉你的邮件。」",
    howItWorks:
      "这不是发布演示。一个真人把两个正在用的收件箱交给 Grok Bot，叫它清掉。Elon 同一个早上转发。我们保留 Elon 原帖。没有在这里重跑那九万封。",
    whyUseful: "清理收件箱是人人都懂的 Grok Bot 工作。如果你盯着十年 Gmail 不敢动，这就是今天最受关注的公开例子。",
    whyItMatters: "今天 Elon 时间线上最热的 Grok Bot 帖子——几小时几百万次观看。工作是 Mike 的；热度是 Elon 的。两边都写清楚。",
    whoShouldTry: ["收件箱炸掉的人", "创始人", "运营"],
    usefulFor: "被 Gmail 淹没的人",
    quote: "用 @Grok @Bot 清掉你的邮件",
    result: "九万封邮件 · 两个 Gmail 账号",
  },
  "week-of-hacks-nate-herk": {
    title: "一周 Grok Bot 技巧",
    headline: "Nate Herk 今天写了九个 Grok Bot 技巧——Elon 问「你的 @Bots 是什么？」",
    whatTheyDid:
      "Nate Herk 在 X 发表〈A Week of Grok Bot Lessons in 10 Mins〉：九个把默认 Bot 变成一队的做法。Elon 同一个早上引用，问大家在跑什么 Bot。",
    howItWorks:
      "他的做法：Grill Me 技能采访你、抽出背景；Klaus 做幕僚长，你只跟一个 Bot 聊；专员 Motion、Eyes、Miner、Coffee、Views；共享记忆对私人记忆；Composio 接更多 app；ClickUp 避免工作消失在聊天；示范一次就教会；例行工作；已登录的浏览器配置。我们摘要公开文章——没有重跑 Klaus。",
    whyUseful: "这是今天人们在收藏的设置文。如果你已经开了 Bot，却仍觉得只是多一个聊天室，从这里开始。",
    whyItMatters: "Elon 没有再发一个新工作流。他指着这篇。文章是工作；Elon 那句问，就是它出现在每条时间线的原因。",
    whoShouldTry: ["已经有 Bot 的人", "想组一小队的运营", "创作者"],
    usefulFor: "运营 / 创作者",
    quote: "你的 @Bots 是什么？",
    result: "九个技巧 · 一个幕僚长",
  },
  "household-bots-blake-king": {
    title: "头 48 小时，不用会写代码",
    headline: "Blake King 零代码经验试 Grok Bot——Elon 今天转发",
    whatTheyDid:
      "Blake 接了公开挑战，跳过 OpenClaw，两个晚上：接上邮件、让 Bot 做一份 12 页家庭预算 PowerPoint、为太太的生意开一队 Bot、再每天收 Tesla 新闻摘要。",
    howItWorks:
      "他说产品会一步步带你设置。不用写代码。先邮件，再预算演示文稿，再一小队，再早报。Elon 在 2026 年 8 月 19 日转发。我们没有重跑他的 Bot。",
    whyUseful: "多数发布帖子当你已经会用 agent。这篇是非工程师，讲头几份真正交得出去的工作。",
    whyItMatters: "今天它和清收件箱、Nate 的技巧一起出现在 Elon 时间线。现在讨论的就是：人用 Grok Bot 做家庭和小生意的真工作。",
    whoShouldTry: ["非工程师", "家庭", "小生意老板"],
    usefulFor: "初学者 / 小生意",
    quote:
      "我完全没有写代码的经验。……我设置好这个 bot、接上我的邮件，让它做出完整的 12 页家庭预算 PowerPoint",
    result: "12 页预算演示文稿 · 48 小时，不用写代码",
  },
  "grok-bot-launch-bot": {
    title: "Grok Bot 上线",
    headline: "@bot 介绍 Grok Bot：拥有自己电脑的 AI 队友",
    whatTheyDid:
      "官方 @bot 账号宣布 Grok Bot 进入早期测试：每个 Bot 有自己的电脑，登录你已经在用的工具，需要批准时才回来找你。",
    howItWorks:
      "这是产品发布帖子，不是单一工作流。后来的官方例子——销售外展、收件箱、CRM、工程——都挂在这则原文上。我们保留原帖链接，再用白话讲清楚它在说什么。",
    whyUseful: "如果你刚接触 Grok Bot，先看这里，再复制提示词。",
    whyItMatters: "之后很多 Grok Bot 文章都会指回这则宣布。短摘要加原帖，比自己刷回复更快。",
    whoShouldTry: ["正在评估 Grok Bot 的人", "决定要不要订阅的创始人"],
    usefulFor: "刚接触 Grok Bot 的人",
    quote: "介绍 Grok Bot，现已进入早期测试。Bot 是 AI 队友……",
    output: "早期测试宣布",
  },
  "overnight-sales-xai": {
    title: "通宵销售外展",
    headline: "xAI 用 Grok Bot 通宵研究客户，早上只留待批准的草稿",
    whatTheyDid:
      "一个销售外展 Bot 会通宵研究账号、按意向给联系人打分，再用每位销售的语气起草邮件和 LinkedIn，早上只留一叠等你批准的草稿。",
    howItWorks: "Bot 趁你睡觉用浏览器和现有销售工具开工。早上你审的是草稿，不是还要自己变成邮件的对话摘要。",
    whyUseful: "适合创始人和 SDR：站会前管道工作已经做好，但又不会让 Bot 未经批准就寄出。",
    whyItMatters: "这是官方旗舰例子。重点是：做完的工作落到真正的收件箱。",
    whoShouldTry: ["SDR", "自己做外展的创始人", "销售主管"],
    usefulFor: "销售 / 创始人",
    quote: "通宵研究账号、按意向给联系人打分，再用每位销售的语气起草邮件和 LinkedIn",
    result: "通宵研究 · 早上只留待批准草稿",
  },
  "crm-notes-xai": {
    title: "通话后更新 CRM",
    headline: "xAI 用销售 Bot 把通话逐字稿写进 CRM",
    whatTheyDid: "在 SpaceXAI 内部，一个销售 Bot 会用通话逐字稿更新 CRM，并起草跟进，记录留在人类本来就会用的工具里。",
    howItWorks: "通话后 Bot 读逐字稿、写字段和下一步，放进 CRM。改交易阶段或数字仍然要人批准。",
    whyUseful: "CRM 腐烂很安静、也很贵。把笔记写进真正的系统，胜过摘要留在聊天室。",
    whyItMatters: "xAI 自己说：工作还没放到队友会放的位置，就不算做完。这就是销售运营版。",
    whoShouldTry: ["客户经理", "销售运营", "自己兼 CRM 的创始人"],
    usefulFor: "销售运营 / 客户经理",
    quote: "一个销售 Bot 用通话逐字稿更新 CRM，并起草后续跟进",
    output: "结构化 CRM 更新",
  },
  "inbox-organizer-xai": {
    title: "收件箱管家",
    headline: "xAI 专用一个 Bot 管收件箱",
    whatTheyDid: "SpaceXAI 团队会叠几个 Bot：上面一个幕僚长，下面有专责收件箱的一条线，不必一个 Bot 包办所有事。",
    howItWorks: "一个 Bot 负责收件箱：分类、草稿、提醒你丢掉的对话。另一个可以坐在上面，只在要判断时拉你进场。",
    whyUseful: "多数人不需要 12 个 Bot 的组织图。他们需要一个让早上 Gmail 小一点的 Bot。",
    whyItMatters: "官方模型是一小队 Bot，不是一个万能代理。收件箱是几乎人人都懂的那条线。",
    whoShouldTry: ["创始人", "运营", "收件箱等于工作的人"],
    usefulFor: "运营 / 创始人",
    quote: "上面是幕僚长，下面每条线有专员：收件箱管理、开支、招聘……",
    output: "已分类的收件箱",
  },
  "expense-manager-xai": {
    title: "开支管家",
    headline: "xAI 把开支交给一个 Bot，收据就不要再躺在 Gmail",
    whatTheyDid: "官方例子包括开支专员，以及一个运营 Bot 处理 Gmail 收到的发票，再写进财务已经在用的工具。",
    howItWorks: "Bot 看收件箱里的收据和发票、抽出事实、更新表格或财务工具。看起来像付款的，仍然要你批准。",
    whyUseful: "收据放久了就难找。每天扫一次，胜过月底再用 Gmail 搜索翻箱倒柜。",
    whyItMatters: "这是不性感的官方工作——重点就在这里。Grok Bot 卖的是没人想重做的队友工作。",
    whoShouldTry: ["创始人", "办公室主任", "小型财务团队"],
    usefulFor: "运营 / 财务",
    quote: "一个运营 Bot 帮新员工办入职，并处理 Gmail 收到的发票",
    output: "从 Gmail 入账收据",
  },
  "bug-reproduction-xai": {
    title: "复现 Bug",
    headline: "xAI 用工程 Bot 在产品界面复现 bug，再提单",
    whatTheyDid: "一个工程 Bot 会在产品界面复现 bug、提单，再把修复交给调试 Bot——报告就不再是一句含糊的 Slack 消息。",
    howItWorks: "有人描述 bug。Bot 打开产品、走一遍步骤、写下看到了什么，再提到团队已经在用的跟踪器。",
    whyUseful: "适合小工程团队：报告者已经撞过一次的 bug，不要再花时间重找。",
    whyItMatters: "官方工程例子不多。这个很具体：复现、提单、交接——不是「帮我写代码」。",
    whoShouldTry: ["工程师", "QA", "兼做支持的创始人"],
    usefulFor: "工程 / QA",
    quote: "在产品界面复现 bug、提单，再把修复交给调试 Bot",
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
    quote: "用他们自己的语气和供应商谈",
    output: "用你语气写的供应商对话",
  },
  "store-support-xai": {
    title: "网店客服队列",
    headline: "xAI 说有人用 Grok Bot 管网店客服",
    whatTheyDid: "Grok Bot 团队的早期例子包括处理网店顾客支持——分类、草稿、更新，都在店铺已经在用的工具里做。",
    howItWorks: "Bot 读新工单或邮件、分组、起草回复。发布或退款先留给你，直到你信任这条线。",
    whyUseful: "适合小店：客服是创始人半夜回，不是 20 人客服台。",
    whyItMatters: "支持量大，只要最后一下留给人，就容易还原。这符合 xAI 讲 Bot 应该接的工作。",
    whoShouldTry: ["网店创始人", "支持主管", "一个人独力支撑的运营者"],
    usefulFor: "支持 / 创始人",
    quote: "管理网店的客服支持",
    output: "客服队列草稿",
  },
  "reddit-thread-scout-axel": {
    title: "Reddit 帖子侦察",
    headline: "Axel Schapmann 用 Grok Bot 做 Reddit 营销——找值得加入的帖子，不是刷屏",
    whatTheyDid:
      "Axel 写过用 Grok Bot 做 Reddit 营销：找你真能帮上忙的新帖子，以及仍然排得上名的旧帖子，然后停在评论草稿。",
    howItWorks: "把网站、产品和几个竞品交给 Bot。它搜索 Reddit 和 Google，评匹配度和刷屏风险，留言留给你自己发。",
    whyUseful: "找到对的帖子才是慢的部分。进对房间，写评论就容易。",
    whyItMatters: "这是公开的社区文章，不是 xAI 截图。我们整理成卡片和可复制工作流——没有在这里重跑他的 Bot。",
    whoShouldTry: ["创始人", "营销人员", "独立开发者"],
    usefulFor: "营销 / 创始人",
    output: "帖子清单 + 评论草稿",
  },
  "travel-concierge-nate": {
    title: "旅行管家",
    headline: "Nate 用 Grok Bot 计划旅行——他一天内开了十二个 Bot，这是其中一份工作",
    whatTheyDid: "Nate 在公开评测里大约八小时开了一队 Bot。旅行计划是其中一份工作，还有运动和联系人研究。",
    howItWorks: "你给日期、预算和限制。Bot 比较公开选项，写出一天一天的计划。下单仍然是你。",
    whyUseful: "旅行研究很快变成 40 个标签页。交回一份短简报，才是非技术用户用得上的版本。",
    whyItMatters: "Nate 的标准是「做完」，不是「叫你做」。旅行是清楚的个人例子——也提醒 Grok Bot 不只是销售工具。",
    whoShouldTry: ["忙的专业人士", "家庭", "讨厌 40 个标签页研究的人"],
    usefulFor: "要计划旅行的人",
    quote: "其他的负责旅行规划、运动和联系人研究。",
    output: "一天一天的行程简报",
  },
  "youtube-comments-remy": {
    title: "YouTube 评论台",
    headline: "Remy 让内容 Bot 开始回 YouTube 评论",
    whatTheyDid: "Remy 做了一个叫 Gordon 的内容 Bot。现场试过之后，Gordon 开始按行程起草 YouTube 评论回复——最后一下仍是 Remy。",
    howItWorks: "把视频或频道交给 Bot。它把评论分组，用你的语气写短回复。听起来像你的，才由你发布。",
    whyUseful: "有用的问题会被表情盖过。每天处理一轮，胜过想起才打开 YouTube Studio。",
    whyItMatters: "这是具名的人、具名的 Bot、公开写出来。我们摘要这份工作；不会说我们重测过 Gordon。",
    whoShouldTry: ["创作者", "教育者", "产品营销"],
    usefulFor: "创作者 / 内容",
    quote: "我让 Gordon……开始回复我的 YouTube 评论。",
    output: "YouTube 回复草稿",
  },
  "newsletter-to-social-remy": {
    title: "邮件通讯转社交",
    headline: "Remy 用内容 Bot 把上周邮件通讯改写成 X 和 LinkedIn 帖子",
    whatTheyDid: "同一个内容 Bot Gordon，把上周邮件通讯改写到 X 和 LinkedIn。Remy 说现在自动跑，几乎不用再教。",
    howItWorks: "Bot 读那期内容，按平台长度用你的语气写帖子，留草稿。你再发布。我们对应的工作流会在发布前停。",
    whyUseful: "内容已经有了。税是改三次格式。这份工作适合交给 Bot。",
    whyItMatters: "社区例子最好有 Bot 名和产出。这篇两样都有。",
    whoShouldTry: ["写邮件通讯的人", "会发帖子的创始人", "内容主管"],
    usefulFor: "内容 / 创始人",
    quote: "我让 Gordon 把上周邮件通讯改写到 X 和 LinkedIn",
    output: "X 和 LinkedIn 草稿",
  },
  "monday-marketing-report-jellypod": {
    title: "星期一市场报告",
    headline: "Jellypod 第一个 Grok Bot 营销做法，是星期一巡一圈仪表盘",
    whatTheyDid:
      "Jellypod 的公开指南从你每周已经在做的汇报开始：走一遍 GA4、广告、排名和邮件，抄你点名的数字，留一页简报。",
    howItWorks: "示范巡回一次。排星期一早。只有指标越过你设的线，Bot 才吵你。",
    whyUseful: "星期一早上还不知道上周行不行，已经登录六次。填好的简报，胜过再开一个仪表盘。",
    whyItMatters: "这是实务指南，不是爆款截图。我们留下是因为工作闷、每周都做、又容易抄。",
    whoShouldTry: ["营销经理", "创始人", "代理公司负责人"],
    usefulFor: "营销 / 创始人",
    quote: "产出是一份填好的摘要，打开笔记本就在那里，不是又一个要去看的仪表盘。",
    output: "一页星期一简报",
  },
  "competitor-monitor-jellypod": {
    title: "竞品监控",
    headline: "Jellypod 写过每周用 Grok Bot 巡竞品网站和广告库",
    whatTheyDid:
      "同一篇指南的第二个做法：教 Bot 每周走一份固定清单——广告库、评论站、竞品更新——只标出真正变了的。",
    howItWorks: "你示范清单一次。Bot 记下差异：新承诺、价格改、评论里新出现的反对——留题材，不是倒出 40 页。",
    whyUseful: "适合创始人和营销团队：不想每天人手打开竞品网站。",
    whyItMatters: "竞品监控是人们最先问的例子。这个版本有来源、改错回得去，也对应完整 UseGrokBot 工作流。",
    whoShouldTry: ["创始人", "营销团队", "产品营销"],
    usefulFor: "营销 / 创始人",
    quote: "广告库、评论站和竞品更新日志，正是 Grok Bot 擅长的形状",
    output: "每周竞品差异",
  },
  "one-person-company-rahul": {
    title: "一人公司",
    headline: "Rahul 写了怎样用 Grok Bot 跑一人公司——从找客到每周汇报",
    whatTheyDid:
      "2026 年 8 月 19 日，Rahul（@sairahul1）在 X 发表文章〈How To Build a One-Person Company Using Grok Bot〉。开头就是一人公司的负荷——找客、写外展、做图、回复、盘点一周——再用 Bot 系统接手这些线。",
    howItWorks:
      "他讲设置、插件、每个 Bot 一份章程、示范一次就变成例行工作，以及六个起步角色（幕僚长、Scout、Quill、Forge、Guide、Ledger）。我们摘要公开文章——没有重跑他的公司栈。附近一则流传的 Elon 链接其实引用了另一篇 Grok Bot 帖子，所以我们保留 Rahul 原文。",
    whyUseful: "这是今天人们在打开的长文：「一份工作一个 Bot」。如果你就是整间公司，从这里开始。",
    whyItMatters: "今天 X 上最热的社区 Grok Bot 指南。是打法，不是客户截图。我们保留 Rahul 原帖。",
    whoShouldTry: ["一人创始人", "自己就是整间公司的运营", "已经在付 Grok Bot 的人"],
    usefulFor: "一人创始人 / 运营",
    quote: "你找潜在客户。写外展。做图。回复。再盘点这一周。",
    result: "六个起步 Bot · 一人公司",
  },
  "podcast-summarizer-gavin-baker": {
    title: "十五秒做出 Podcast 摘要",
    headline: "Gavin Baker 用大约十五秒在 Grok Bot 做了 Podcast 摘要工具——说比旧那套更好",
    whatTheyDid:
      "2026 年 8 月 17 日，Gavin Baker（@GavinSBaker）写 @bot 是 AI 的另一个 「Claude Code」 moment，个人 AI 用量大概增加了 100 倍。具体的工作：之前有人问他怎么做 Podcast 摘要工具。在 Grok Bot 里大约十五秒就做好，而且比他之前用的更好。",
    howItWorks: "这是具名投资人交出的第一份真工作，不是发布演示。我们保留 Gavin 原帖。没有重跑他的摘要工具。",
    whyUseful: "每天一堆 Podcast，是投资人和运营已经有的工作。这就是公开例子：交给 Bot，而不是再做一套自己的工具。",
    whyItMatters: "这周最受注意的社区 Grok Bot 使用场景帖子之一。社区；没有标已测试。",
    whoShouldTry: ["投资人", "听的比时间多的运营", "一直想做摘要工具的人"],
    usefulFor: "研究 / 运营",
    quote:
      "之前有人问我怎么做「podcast 摘要工具」——在 Grok Bot 里大约十五秒就做好，而且比我以前用的更好。",
    result: "Podcast 摘要 · 大约十五秒",
  },
  "clothes-resale-scotty-beam": {
    title: "卖掉没穿过的衣服",
    headline: "SCOTTY BEAM 写 Cursor 同事把妹妹没穿过的衣服交给 Grok Bot",
    whatTheyDid:
      "2026 年 8 月 18 日，SCOTTY BEAM（@ScottyBeamIO）写有 Cursor 的人把妹妹不再穿的一堆衣服交给 Grok Bot。卖掉要拍照、上架、写描述、回买家、议价——所以一直拖。那堆衣服就交给 Bot。",
    howItWorks:
      "Scotty 说 Bot 看照片、认衣服、写商品页，再和买家议价。他也指向自己较长的文章，比较 Grok Bot、Hermes、OpenClaw，以及自动化 X 内容。卖衣服是 Cursor 那个人的工作；比较文是 Scotty 自己的。两边都没有在这里重跑。",
    whyUseful: "一堆衣服就是人人都懂的工作：拖着的麻烦，一句「卖掉这些」。",
    whyItMatters: "这是转述别人的 Bot，加上 Scotty 自己的长文。两边都写清楚。",
    whoShouldTry: ["堆着二手货的人", "一人运营", "拖着上架的人"],
    usefulFor: "二手 / 一人运营",
    quote: "你只要说：「卖掉这些」。其余交给它想。",
    result: "拍照、上架、回买家、议价",
  },
  "3d-game-roundtable-space": {
    title: "3D 游戏，再自己上传",
    headline: "0xMarioNawfal 写 Grok @bot 做了 3D 游戏、自己打、再把视频上传到 X",
    whatTheyDid:
      "2026 年 8 月 19 日，0xMarioNawfal（@RoundtableSpace）写 Grok @bot 可以做成整个 3D 游戏、自己录屏自动玩、剪片，再上传到 X——全部自己做。附件片段来自 Dan（@Daniel_Farinax）。",
    howItWorks: "Mario 转发一段公开录像。我们保留他原帖。没有重跑那个游戏，也没有重做上传。",
    whyUseful: "这是人们会指着的电脑用工：不是聊天答案——是做好的游戏，再加一条交得出去的 X 视频。",
    whyItMatters: "当日社区转发一份具体 Bot 工作。片段是 Dan 的；帖子是 Mario 的。两边都写清楚。",
    whoShouldTry: ["建造者", "做游戏的人", "想 Bot 交出片段的创作者"],
    usefulFor: "建造者 / 创作者",
    quote: "它会自己录屏、自动玩游戏、剪视频，再把视频上传——全部自己做",
    result: "3D 游戏 · 录、剪、上传到 X",
  },
  "five-bots-peter-yang": {
    title: "五个实用 Bot",
    headline: "Peter Yang 出了五个 Grok Bot 教程——顾问、YouTube、X、收件箱、旅行",
    whatTheyDid:
      "2026 年 8 月 17 日，Peter Yang（@petergyang）发教程：五个有用的 Bot——一个顾问负责开和管理其他 Bot、YouTube 研究找出局片、X 侦察找爆款和搞笑帖子、「数字 Marie Kondo」清收件箱和忘记的订阅、再加上旅行礼宾。",
    howItWorks:
      "他也试过 Gamer Bot 玩经典游戏，并问 Grok Bot 能不能取代 ChatGPT 做日常主力。我们摘要公开帖子——没有重跑他那五个。",
    whyUseful: "五份有名的工作，不是空泛「试试 agent」。想组第一队，抄这张名单。",
    whyItMatters: "这周人们在收藏的实用设置教程。社区文；我们保留 Peter 原帖。",
    whoShouldTry: ["刚组第一队 Bot 的人", "创作者", "运营"],
    usefulFor: "运营 / 创作者",
    quote: "这是我的新教程，示范怎么设置 5 个实用 Bot",
    result: "五个 Bot · 顾问加专员",
  },
  "ultimate-guide-miles-deutscher": {
    title: "Grok Bot 完全指南",
    headline: "Miles Deutscher 发表〈Grok Bot: The Ultimate Guide〉——设置、插件、他那五个",
    whatTheyDid:
      "2026 年 8 月 18 日，Miles Deutscher（@milesdeutscher）发长文：Grok Bot 是什么、怎样设置、插件，以及他实际在跑的五个——Alex 找 YouTube 出局片、Sandra 看楼盘、Jonathan 看投资组合、Lucy 分 Slack、Oscar 做杂务。",
    howItWorks:
      "他说从发布就开始试。文章就是工作——设置、使用场景、插件，和老实的价钱。我们没有重跑 Alex 或 Sandra。",
    whyUseful: "如果你想抄一套公开的配置——有名的 Bot、提示词、插件——这篇是长读。",
    whyItMatters: "这周另一篇人们在打开的 Grok Bot 长文。社区；我们保留 Miles 原帖。",
    whoShouldTry: ["已经有 Bot 的人", "想组一小队的运营", "创作者"],
    usefulFor: "运营 / 创作者",
    quote: "Grok Bot 是我用过最强大的 AI agent。",
    result: "五个有名的 Bot · 设置加插件",
  },
  "bot-team-tips-ben-lang": {
    title: "@bot 团队提示",
    headline: "Ben Lang 收集了 @bot 团队在传的 Grok Bot 专业提示",
    whatTheyDid:
      "2026 年 8 月 18 日，Ben Lang（@benln）发了他从 @bot 团队收集的清单：同一个插件接多个账号、一个幕僚长加几个专员、钉住常用 agent、用 Notion 记没做完的工作、示范一次教会，还有更多。",
    howItWorks:
      "他简介写着 Building SpaceXAI，via Cursor team。帖子仍然是个人账号收集团队提示——不是 @bot 或 @xai 原文——所以我们维持社区标签，保留他原帖。",
    whyUseful: "短、抄得走的设置习惯。如果你的 Bot 仍然只是多一个聊天室，先做幕僚长，再加一页 Notion「还有什么没做」。",
    whyItMatters: "这是公开转述的团队提示，不是 UseGrokBot 重测。没有标官方，也没有标已测试。",
    whoShouldTry: ["已经有 Bot 的人", "想组一小队的运营"],
    usefulFor: "运营",
    quote: "一个幕僚长加上几个专员，胜过一个超大聊天室",
    result: "十二条提示 · 幕僚长加专员",
  },
  "ceo-desk-teslaconomics": {
    title: "六个 Bot 加一个 CEO",
    headline: "Teslaconomics 跑六个 Grok Bot，再加一个「CEO」在上面调度",
    whatTheyDid:
      "2026 年 8 月 14 日，Teslaconomics（@Teslaconomics）写他已经有六个 Grok Bot，各做一份工作——提醒、图像和视频、估公司、分析视频、帮忙发帖子——再在上面放一个 CEO Bot，他只跟一个收件箱聊。",
    howItWorks:
      "先专员，再幕僚长式 CEO 分派工作、交回一个包裹。他公开了第一条消息和三个例行（早、午、晚）。我们没有重跑他的配置。",
    whyUseful: "没有 CEO，你就是各群聊的中间人。这是公开可复制的做法：让一个 Bot 做收件箱。",
    whyItMatters: "有名的人、有名的名单、公开提示词。社区——我们没有重测 CEO。",
    whoShouldTry: ["已经跑超过一个 Bot 的人", "运营", "创作者"],
    usefulFor: "运营 / 创作者",
    quote: "有了 CEO，你就像跟人一样，只发消息到一个收件箱。",
    result: "六个专员 · 一个 CEO Bot",
  },
  "agent-loops-alex-finn": {
    title: "最好的循环",
    headline: "Alex Finn 让一个 Grok Bot 叫另一个每五分钟循环做同一份工作",
    whatTheyDid:
      "2026 年 8 月 16 日，Alex Finn（@AlexFinn）写 Grok Bot 天生适合循环：主 agent 叫另一个每五分钟循环一份工作，再监控它。他说有一个调度 Bot 看着工程 Bot 二十四小时，每三十分钟想一个改进方法。",
    howItWorks:
      "他对比单一 Bot 用 /loop 自己看自己。多一个 Bot 就是另一个上下文做判断。我们摘要公开帖子——没有重跑他那二十四小时循环。",
    whyUseful: "如果你想工作自己继续，又不想自己盯着 /loop，这就是两个 Bot 的版本。",
    whyItMatters: "有人公开在跑的具体循环做法。社区；我们没有重测工程循环。",
    whoShouldTry: ["建造者", "工程师", "要跑长任务的研究"],
    usefulFor: "建造者 / 工程",
    quote:
      "你只要叫主 agent 再叫另一个 agent 每五分钟循环同一份任务，并在过程中监控它",
    result: "五分钟循环 · 调度加专员",
  },
  "grok-bot-walkthrough-alex-finn": {
    title: "设置走查",
    headline: "Alex Finn 发了 Grok Bot 设置视频——使用场景和插件",
    whatTheyDid:
      "2026 年 8 月 18 日，Alex Finn（@AlexFinn）发了另一篇，不是那则五分钟循环：一条视频讲怎样设置 Grok Bot、使用场景、插件，以及设置对了才会好用。他说是一队可以日夜开工的 agent。",
    howItWorks: "这是公开设置走查，不是客户截图。我们保留 Alex 原帖。没有重跑他的配置，也没有重剪视频。",
    whyUseful: "如果你想一条片从设置开始——不是另一则五分钟循环——这就是人们在看的那条。",
    whyItMatters: "这周最受注意的社区 Grok Bot 设置片。和循环卡是另一则帖子。社区；没有标已测试。",
    whoShouldTry: ["刚开第一个 Bot 的人", "运营", "创作者"],
    usefulFor: "运营 / 创作者",
    quote: "这条视频讲 Grok Bot 怎么设置、使用场景、插件，以及设置对了为什么特别好用",
    result: "视频走查 · 设置、使用场景、插件",
  },
  "firstmate-kun-chen": {
    title: "Firstmate，一个收件箱",
    headline: "Kun Chen 公开可复制的 Firstmate 提示——你只跟一个 Grok Bot 聊",
    whatTheyDid:
      "2026 年 8 月 18 日，Kun Chen（@kunchenguid）发了一个 Firstmate Bot 系统提示：开一个、把 github.com/kunchenguid/firstmate 的 GROK_BOT.md 贴进描述，之后只跟这个聊。它开、分派、协调其他 Bot。",
    howItWorks:
      "他说 Firstmate 是他在其他 harness 已用的幕僚长做法，现在变成一段短 Grok Bot 描述。我们没有重跑 Firstmate。",
    whyUseful: "如果你不想十二个聊天室，这是公开提示：一个 Bot 去招募并调度其余的。",
    whyItMatters: "有 repo、有提示、有名的人。社区——我们没有重测 Firstmate。",
    whoShouldTry: ["已经有 Bot 的人", "想要一个收件箱的运营"],
    usefulFor: "运营",
    quote: "你只跟这一个 agent 聊。它为你创建、分派、调度，并持续改进其他 Bot。",
    result: "一个 Firstmate · 可复制提示",
  },
  "calendar-booking-yunta-tsai": {
    title: "看日历，再订位",
    headline: "Yun-Ta Tsai 用中英夹杂对 Grok Bot 说：找还没订的预约，边走向车边订",
    whatTheyDid:
      "2026 年 8 月 12 日，Yun-Ta Tsai（@yunta_tsai）写 Grok Bot 走完他的日历，找出事前还要预订、但他没做的事，选最好的时间，再在网站上走预订流程。他在停车场走向车的时候，用中英夹杂和它说。",
    howItWorks: "先语音、再扫日历，然后 Bot 去预订网站开工。我们保留 Yun-Ta 原帖。没有重跑那次预订。",
    whyUseful: "这是人们会指着的个人运营工作：不是聊天摘要——是日历上还要订的位，走向车就已经处理。",
    whyItMatters: "Grok Bot 上线那周的公开电脑用例子。社区；没有标已测试。",
    whoShouldTry: ["忙的专业人士", "日历上还有未订预约的人", "想说、不想打字的人"],
    usefulFor: "个人 / 运营",
    quote:
      "我在停车场走向车的时候，用中英夹杂跟它说话。",
    result: "扫日历 · 在网站上预订",
  },
  "parents-bot-yunta-tsai": {
    title: "给父母的第一个 Bot",
    headline: "Yun-Ta Tsai 为父母开了第一个 Grok Bot——说它会中文，不用走插件迷宫",
    whatTheyDid:
      "2026 年 8 月 19 日，Yun-Ta Tsai（@yunta_tsai）写 Grok Bot 是他会推荐给年长父母的第一个 AI 产品。他们已经会聊天。不想跳技能、插件、MCP。想问完就有人做完。他引用自己先前那则：给父母的第一个 Bot，标了「乖兒子」。",
    howItWorks:
      "跟进帖子是论点：自然、顺、中文好，年长的人可以自己做完多数事，不用靠人。我们保留这则原帖。没有帮他父母开 Bot。",
    whyUseful: "如果用户是永远不会配置 MCP 的父母，这就是公开的「问就行」例子。",
    whyItMatters: "和日历订位是同一个人。另一份工作：给不用学技术栈的人用的 Bot。",
    whoShouldTry: ["帮父母开 Bot 的子女", "不会碰插件的人", "讲中文的家庭"],
    usefulFor: "个人 / 家庭",
    quote: "Grok @bot 大概是我会推荐给年长父母的第一个 AI 产品。",
    result: "给父母的第一个 Bot · 中文",
  },
  "eight-use-cases-eric-zakariasson": {
    title: "这周八个使用场景",
    headline: "eric zakariasson 发了这周八份 Grok Bot 工作——第一份是发消息指挥吸尘机器人",
    whatTheyDid:
      "2026 年 8 月 19 日，eric zakariasson（@ericzakariasson）发了一串：这周八个很有趣的 Grok Bot 使用场景。第一个是把 Bot 接到吸尘机器人，再发消息叫 Grok 去哪里清洁——引用 Yun-Ta Tsai 接 Matic 那则。",
    howItWorks:
      "其余指向其他公开工作：过 Google「我不是机器人」、整台 Mac 当成人工作间、3D 游戏、水管公司办公室主任、追从未退款的商户、招聘再加清掉剩余订阅、以及五盘生意的夜班。我们摘要 Eric 的汇总——八份都没有重跑。",
    whyUseful: "一串、八份具体工作。想看这周人实际发过什么，从这里开始。",
    whyItMatters: "这是社区汇总，不是 Eric 自己的吸尘器。吸尘工作是 Yun-Ta 的；名单是 Eric 的。两边都写清楚。",
    whoShouldTry: ["在收集第一份工作的人", "运营", "想扫这周公开例子的人"],
    usefulFor: "运营",
    quote: "这周八个很有意思的 grok bot 使用场景！",
    result: "八份公开工作 · 从吸尘机器人开始",
  },
  "three-employees-scotty-beam": {
    title: "Gustavo、Walter、Jesse",
    headline: "SCOTTY BEAM 写了三个有名的 Grok Bot 员工——Gustavo 管 Notion，Walter 管 DocuSign，Jesse 管 ManyChat",
    whatTheyDid:
      "2026 年 8 月 18 日，SCOTTY BEAM（@ScottyBeamIO）写有人教 Grok Bot 跑生意：自己做一次，让 Bot 看着。三个有名的员工：Gustavo 管运营（Notion 客户中心、入职表格、第一次通话前准备）；Walter 管销售（协议经 DocuSign，跟到客户签署并付款）；Jesse 管线索（ManyChat 私信写进 Notion，有人问价钱就立刻通知）。",
    howItWorks:
      "Scotty 说它们共用一台云端电脑和登录。这则帖子和卖没穿过的衣服是另一则。我们保留这则原帖。没有重跑 Gustavo、Walter 或 Jesse。",
    whyUseful: "有名的工作、有名的工具。想组第一队销售运营，抄这三条线。",
    whyItMatters: "热度一般，配置很具体。社区转述别人的团队——我们留 Scotty 原帖，不会发明创始人是谁。",
    whoShouldTry: ["一人运营", "小销售团队", "想用示范教会 Bot 的人"],
    usefulFor: "运营 / 销售",
    quote: "他自己先做一次任务，让 bot 看着，再叫它做同样的事。",
    result: "Gustavo · Walter · Jesse",
  },
  "math-explainer-yunta-tsai": {
    title: "给孩子的数学片",
    headline: "Yun-Ta Tsai 让 Grok Bot 做数学讲解视频——用 Grok 语音 API 讲得兴高采烈",
    whatTheyDid:
      "2026 年 8 月 16 日，Yun-Ta Tsai（@yunta_tsai）写孩子卡住怎么把数字拆成幂次和，他又找不到好的讲解。于是让 Grok Bot 做一条。Bot 把想法做出来等他审——还用 Grok 语音 API 做了开朗的旁白。",
    howItWorks: "他说可以把搁着的想法丢给 Bot，它会做出来等你审。我们保留原帖和附件视频。没有重做那条讲解。",
    whyUseful: "一条教学视频就是你会拖的工作。交出去，再审成品。",
    whyItMatters: "有名的人、有名的工作、有附件视频。社区；没有标已测试。",
    whoShouldTry: ["父母", "老师", "要一条一次性讲解的创作者"],
    usefulFor: "内容 / 个人",
    quote: "我请 @bot 做一条。它甚至用 @grok 语音 API 做了开朗的旁白。",
    result: "数学讲解视频 · Grok 语音 API",
  },
  "teach-a-task-eric-zakariasson": {
    title: "示范一次就教会",
    headline: "eric zakariasson 示范怎么教 Grok Bot 一份工作——点 +、录浏览器，Bot 再做一次",
    whatTheyDid:
      "2026 年 8 月 13 日，eric zakariasson（@ericzakariasson）发了短教程：聊天室点 +，录自己在浏览器怎么做，Bot 看着就可以再做。他说多数工作它自己做得完——当它卡住再用这招。",
    howItWorks:
      "这是带片段的功能走查，不是客户截图。他简介写着 tinkering @spacexai；帖子仍然是个人账号，所以我们维持社区标签。",
    whyUseful: "Bot 一路点错路径，示范一次比改提示词更快。",
    whyItMatters: "有具体步骤，不是预告。社区；没有标官方，也没有标已测试。",
    whoShouldTry: ["Bot 一路走错路的人", "想教会例行工作的运营", "非工程师"],
    usefulFor: "运营",
    quote:
      "在聊天室点 +，录下你在浏览器里怎么做。bot 看着，之后就能再做一次。",
    result: "录一次 · Bot 再走同一条路",
  },
  "support-refunds-gergely-orosz": {
    title: "客服收件箱，再退款",
    headline: "Gergely Orosz 把 Grok Bot 接到客服邮件——再经 Stripe API 做例行退款",
    whatTheyDid:
      "2026 年 8 月 19 日，Gergely Orosz（@GergelyOrosz）写他把 Grok Bot 接到自己的客服邮件。Bot 可以经 API 连 Stripe，做 agentic 操作——例子是例行退款。附件截图是 Stripe 的 agent 授权画面：「Agent is now authorised to continue。」",
    howItWorks:
      "客服邮件进、Stripe API 出。他赞 Stripe 已经建好这条 agentic 流程。我们保留 Gergely 原帖。没有重跑他的收件箱，也没有代发退款。",
    whyUseful:
      "客服加退款就是开店的人实际在做的工作。这是具名的人，把 Bot 放进真正的收件箱和付款 API，不是空泛「试试 agent」。",
    whyItMatters: "当日社区例子：真正的客服收件箱，真正的 Stripe 授权画面。社区；没有标已测试。",
    whoShouldTry: ["自己兼客服的创始人", "已经在 Stripe 退款的运营", "客服队列同时也是账务队列的人"],
    usefulFor: "支持 / 运营",
    quote:
      "把 Grok Bot 接到我的客服邮件……它还能经 API 连 Stripe，做 agentic 操作，例如例行退款。",
    result: "客服收件箱 · Stripe API 退款",
  },
  "remote-mower-sawyer-merritt": {
    title: "远程开割草机",
    headline: "Sawyer Merritt 设置 Grok Bot，远程控制五十英里外的自动割草机器人",
    whatTheyDid:
      "2026 年 8 月 19 日，Sawyer Merritt（@SawyerMerritt）写他把 Grok Bot 设成可以远程控制五十英里外的自动割草机器人。设置用了两分钟。他叫它开始割草，三秒后就动了。然后叫它自己回充电座。他说下一步会接吸尘器，再专用一个 Grok Bot 管所有自动机器人。附件截图是 Engineer Bot 对话：已连 Navimow X450，再「Start mowing now」和「Go dock」。片段是 Navimow X450 地图。",
    howItWorks: "聊天进、割草机出。我们保留 Sawyer 原帖。没有重跑那次开割或回座。",
    whyUseful: "远程开和回座就是人人都懂的工作：不是聊天摘要——是五十英里外的机器，叫它割，再叫它回家。",
    whyItMatters: "当日社区例子：具名的人、在用的割草机、Engineer Bot 截图。社区；没有标已测试。",
    whoShouldTry: ["有割草机器人的人", "出门了但草地还要割的人", "想用一个 Bot 管家用机器人的人"],
    usefulFor: "个人 / 家庭",
    quote: "我叫它开始割草，三秒后就动了。然后叫它自己回充电座。",
    result: "远程开割草 · 回座",
  },
  "lennybot-lenny-rachitsky": {
    title: "Lennybot，他自己的资料库",
    headline:
      "Lenny Rachitsky 发了用 500 多集 podcast 和邮件通讯训练的 Grok Bot——当产品、策略、增长、职业顾问",
    whatTheyDid:
      "2026 年 8 月 19 日，Lenny Rachitsky（@lennysan）发热门提示：开一个用他 500 多集 podcast 和邮件通讯训练的 Grok Bot，当成产品／策略／增长／职业顾问。他列出问题——头 1,000 个用户、怎么升职、不太明显的增长点子、PM 面试题、怎么给难听的反馈——并说这可能很快变成读他内容最好的方法。他公开的提示：You're Lennybot. 装这个自定义 MCP：mcp.lennysdata.com/mcp。用原生 connector 流程，不要本地配置文件。打开授权链接，等他完成邮件登录，再开 connector，用搜索「product-market fit」核对资料库。",
    howItWorks:
      "具名的人公开了可复制的 Lennybot 提示加自定义 MCP。我们保留 Lenny 原帖。没有重跑 Lennybot，也没有代他登录。",
    whyUseful:
      "如果你已经在听 Lenny，想问资料库一份工作上的问题，这就是公开设置——不是空泛「试试 agent」。",
    whyItMatters: "当日社区例子，来自具名产品作者。社区；没有标已测试。",
    whoShouldTry: ["产品经理", "在找头一批用户的创始人", "已经在读 Lenny 的人"],
    usefulFor: "产品 / 增长",
    quote: "把它当成你的产品／策略／增长／职业顾问。",
    result: "Lennybot · 500 多集 + 邮件通讯资料库",
  },
};

export function localizeDiscoverStory(story: DiscoverStory, locale: Locale): DiscoverStory {
  const articleTitle = story.localizedArticleTitles?.[locale];
  if (locale === "en") return articleTitle ? { ...story, title: articleTitle } : story;
  const curated = (locale === "zh-Hant" ? hant : hans)[story.slug];
  const generated = generatedCopyFor(story.slug, locale);
  const templates = applyDiscoverTemplates(story, locale);
  if (!curated && !generated && Object.keys(templates).length === 0 && !articleTitle) return story;
  return { ...story, ...templates, ...generated, ...curated, ...(articleTitle ? { title: articleTitle } : {}) };
}

export function getDiscoverStoryI18n(slug: string, locale: Locale): DiscoverStoryI18n | undefined {
  if (locale === "zh-Hant") return hant[slug];
  if (locale === "zh-Hans") return hans[slug];
  return undefined;
}
