import type { Locale } from "./types";

export type UseCaseI18n = {
  title: string;
  shortDescription: string;
  description: string;
  steps: string[];
  targetUsers: string[];
};

const hant: Record<string, UseCaseI18n> = {
  "lead-researcher": {
    title: "潛在客戶研究員",
    shortDescription: "在銷售團隊聯絡之前，先找出並摘要潛在顧客。",
    description:
      "給 Grok Bot 一個市場、城市或顧客類型。它會找出符合的公司、寫出簡短檔案，再把名單放到你可以繼續跟進的表格。",
    steps: [
      "找出符合你描述的顧客類型的公司",
      "打開公開頁面，例如網站、關於我們與近期新聞",
      "寫出簡短檔案：他們做什麼、服務誰、為什麼會在意",
      "為每間公司加上建議的第一句開場",
      "把名單放到表格或短簡報",
    ],
    targetUsers: ["銷售人員", "自己做開發的創辦人", "SDR", "代理公司負責人"],
  },
  "prospect-research": {
    title: "對象研究",
    shortDescription: "在上電話之前，先做好一頁公司簡報。",
    description:
      "貼上公司名稱。Grok Bot 會讀公開資料——產品、人物、新聞、招聘——交給你兩分鐘就能掃完的一頁簡報。",
    steps: [
      "打開公司網站、新聞與招聘頁",
      "記下他們賣什麼、賣給誰，以及最近的變化",
      "如果你提供姓名，會查一下與會者",
      "標出風險，例如融資失利或對手已經進駐",
      "寫出帶 3 個談話重點的一頁簡報",
    ],
    targetUsers: ["客戶經理", "創辦人", "客戶成功經理"],
  },
  "lead-qualification": {
    title: "潛在客戶評分",
    shortDescription: "幫名單打分，把時間花在值得打電話的對象。",
    description:
      "把一份名單交給 Grok Bot。它會對照你的理想顧客，標出值得致電、值得培養，或完全不適合。",
    steps: [
      "讀你提供的公司或聯絡人名單",
      "查看公開訊號：規模、行業、招聘、技術、新聞",
      "按你給的顧客檔案為每個對象打分",
      "用一行寫出分數原因",
      "分成今天打、之後培養，或略過",
    ],
    targetUsers: ["SDR 主管", "銷售團隊", "創辦人"],
  },
  "sales-meeting-prep": {
    title: "銷售會議準備",
    shortDescription: "每次銷售會議都帶著一頁計劃進場。",
    description:
      "Grok Bot 會看公司、人物與最近電郵，寫出短計劃：目標、談話重點、問題，以及建議的收結。",
    steps: [
      "讀會議出席者與公司在做什麼",
      "查看近期公開新聞與你貼上的筆記",
      "為這通電話定一個清楚目標",
      "按使用順序寫出談話重點與問題",
      "加上建議收結，以及對方卡住時的備案",
    ],
    targetUsers: ["客戶經理", "銷售主管", "創辦人"],
  },
  "crm-updater": {
    title: "CRM 更新助手",
    shortDescription: "把凌亂的通話筆記變成乾淨的 CRM 欄位與下一步。",
    description:
      "通話後貼上你的潦草筆記。Grok Bot 會寫出清楚摘要、建議的 CRM 欄位，以及可以複製到 Salesforce 或 HubSpot 的下一項任務。",
    steps: [
      "讀你貼上的原始筆記或電郵",
      "抽出事實：人物、日期、異議、下一步",
      "寫出可放入 CRM 的摘要",
      "只有對方明確說過，才建議階段、金額與成交日",
      "用一行草擬下一項任務",
    ],
    targetUsers: ["銷售人員", "銷售營運", "客戶經理"],
  },
  "follow-up-email-writer": {
    title: "跟進電郵撰寫",
    shortDescription: "在通話、示範或未回覆的電郵之後，寫一封清楚的跟進。",
    description:
      "告訴 Grok Bot 發生了什麼。它會草擬聽起來像人的短跟進，只有一個請求，以及你可以寄出的主旨。",
    steps: [
      "讀上次通話或電郵發生了什麼",
      "為這封跟進選定一個目的",
      "寫一封只有一個請求的短電郵",
      "提供主旨，以及更短的再提醒版本",
      "語氣保持禮貌而具體",
    ],
    targetUsers: ["銷售人員", "創辦人", "客戶經理"],
  },
  "lost-lead-re-engagement": {
    title: "沉睡客戶再啟動",
    shortDescription: "給幾個月沒消息的對象，寫一封誠實的短信。",
    description:
      "告訴 Grok Bot 這個沉睡對象，以及他們為什麼消失。它會草擬再聯絡的短信，給一個再談的理由，而不會聽起來很急。",
    steps: [
      "讀對方為什麼安靜下來",
      "找一個真正再寫的理由——產品變化、新結果，或相關事件",
      "草擬只有一個低壓力請求的短信",
      "標出應該放下的對象",
      "加上兩週後可再寄的第二次接觸",
    ],
    targetUsers: ["銷售人員", "創辦人", "客戶成功"],
  },
  "daily-sales-brief": {
    title: "每日銷售簡報",
    shortDescription: "用一張短畫面開始一天：管道、會議與待跟進。",
    description:
      "每天早上，Grok Bot 會把會議、未完成交易與過期跟進，變成你可以配咖啡看完的一屏簡報。",
    steps: [
      "讀當天會議與未完成交易",
      "標出過期或卡住的跟進",
      "排出今天最該做的三件事",
      "寫出一屏可讀的早晨簡報",
      "略過沒有行動的噪音",
    ],
    targetUsers: ["銷售人員", "銷售主管", "創辦人"],
  },
  "competitor-monitor": {
    title: "對手監察",
    shortDescription: "自動檢查對手網站，有重要變化才告訴你。",
    description:
      "告訴 Grok Bot 要看哪些頁面。它會定期檢查，只在定價、產品或訊息真的變了才寫簡報。",
    steps: [
      "打開你指定的對手頁面",
      "對照上次看到的內容",
      "只記下真正重要的變化",
      "忽略設計改版與無關改動",
      "寫出可採取行動的短簡報",
    ],
    targetUsers: ["市場人員", "創辦人", "產品經理"],
  },
  "competitor-price-monitor": {
    title: "對手價格監察",
    shortDescription: "盯著對手定價頁，標出真正的價格或方案變化。",
    description:
      "Grok Bot 會重訪定價頁，比較方案與價格，只在數字或限制真的變了才通知你。",
    steps: [
      "打開對手定價頁",
      "記下方案、價格與限制",
      "與上次紀錄比較",
      "標出真實變化，忽略版面改動",
      "寫出給市場或銷售看的短筆記",
    ],
    targetUsers: ["市場人員", "銷售主管", "創辦人"],
  },
  "ad-monitor": {
    title: "廣告監察",
    shortDescription: "看看對手這週在廣告裡說什麼。",
    description:
      "Grok Bot 會查看對手公開廣告，整理他們強調的承諾、優惠與受眾，寫成一週掃描。",
    steps: [
      "找出對手正在投放的公開廣告",
      "記下承諾、優惠與語氣",
      "標出重複出現的主題",
      "忽略一次性的噪音",
      "寫出市場團隊能用的週報",
    ],
    targetUsers: ["市場人員", "成長團隊", "創辦人"],
  },
  "seo-researcher": {
    title: "SEO 研究員",
    shortDescription: "找出你實際有機會贏的搜尋題材，而不是虛榮關鍵字。",
    description:
      "給 Grok Bot 一個主題。它會找出人們真的在搜、而你又寫得贏的題材，並說明為什麼。",
    steps: [
      "讀你想覆蓋的主題",
      "找出人們實際會搜的問題",
      "略過太大、不可能贏的關鍵字",
      "建議這個月值得做的頁面",
      "附上為什麼現在值得寫",
    ],
    targetUsers: ["內容人員", "市場人員", "創辦人"],
  },
  "keyword-researcher": {
    title: "關鍵字研究員",
    shortDescription: "把凌亂主題變成人們真的會打的短語清單。",
    description:
      "貼上一個模糊題目。Grok Bot 會整理成短語清單，分開要寫的、要避開的，以及可以組成一頁的。",
    steps: [
      "讀你給的凌亂主題",
      "列出人們真的會輸入的短語",
      "分成頁面主題與支援短語",
      "丟掉虛榮或太寬的詞",
      "交出可執行的短清單",
    ],
    targetUsers: ["內容人員", "SEO", "市場人員"],
  },
  "brand-mention-monitor": {
    title: "品牌提及監察",
    shortDescription: "捕捉人們在談你——或改談對手——的時候。",
    description:
      "Grok Bot 會查看公開對話，標出提及你或對手的內容，並告訴你哪些值得回覆。",
    steps: [
      "搜尋品牌、產品與對手名稱",
      "讀近期公開提及",
      "標出需要回覆或跟進的",
      "分開讚、投訴與對手比較",
      "寫出過去 24 小時的短摘要",
    ],
    targetUsers: ["市場人員", "社群團隊", "創辦人"],
  },
  "marketing-campaign-report": {
    title: "市場活動報告",
    shortDescription: "把活動數字變成主管看得完的一頁故事。",
    description:
      "貼上活動數據。Grok Bot 會寫出發生了什麼、為什麼重要，以及下一週該改什麼。",
    steps: [
      "讀你貼上的活動數字",
      "找出真正移動了的指標",
      "用白話解釋原因",
      "標出該停、該加碼或該測試的",
      "寫出一頁週報",
    ],
    targetUsers: ["市場人員", "成長團隊", "創辦人"],
  },
  "customer-review-analyzer": {
    title: "顧客評論分析",
    shortDescription: "讀一堆評論，告訴你人們愛什麼、恨什麼、一直重複什麼。",
    description:
      "把評論貼給 Grok Bot。它會抽出重複句子、真正痛點，以及你可以在網站或產品裡使用的用語。",
    steps: [
      "讀你貼上的評論",
      "分出喜歡、抱怨與重複句子",
      "標出真正的產品問題",
      "抽出顧客已經在用的說法",
      "寫出市場與產品都能用的摘要",
    ],
    targetUsers: ["市場人員", "產品經理", "創辦人"],
  },
  "trending-topic-finder": {
    title: "熱門題材發現",
    shortDescription: "找出這週人們在談、而你還趕得及寫的題材。",
    description:
      "Grok Bot 會掃過公開討論，找出還有時間寫、又與你領域相關的題材，而不是已經過氣的熱點。",
    steps: [
      "查看你領域的近期公開討論",
      "找出正在上升、尚未寫爛的題材",
      "略過已經過氣的熱點",
      "建議你這週還寫得及的題目",
      "附上為什麼現在值得寫",
    ],
    targetUsers: ["內容創作者", "市場人員", "創辦人"],
  },
  "x-content-researcher": {
    title: "X 內容研究員",
    shortDescription: "看看你領域裡哪些貼文得到真正回覆，而不只是讚。",
    description:
      "Grok Bot 會研究 X 上的貼文，找出引發對話的內容，並抽出你可以再用的角度——不是照抄。",
    steps: [
      "查看你領域的近期貼文",
      "分開真正回覆與空洞互動",
      "抽出有效的角度與開場",
      "標出不要照抄的部分",
      "寫出可執行的內容簡報",
    ],
    targetUsers: ["內容創作者", "市場人員", "創辦人"],
  },
  "linkedin-post-researcher": {
    title: "LinkedIn 貼文研究員",
    shortDescription: "找出你行業裡人們真的會留言的 LinkedIn 貼文。",
    description:
      "Grok Bot 會讀 LinkedIn 上的公開貼文，找出引發評論的內容，並整理成你可以寫的角度。",
    steps: [
      "查看行業裡的公開 LinkedIn 貼文",
      "記下真正有評論的",
      "抽出主題與語氣",
      "略過空洞的宣布文",
      "寫出可寫的貼文簡報",
    ],
    targetUsers: ["內容創作者", "B2B 市場", "創辦人"],
  },
  "youtube-idea-researcher": {
    title: "YouTube 題材研究員",
    shortDescription: "從你領域已經有效的影片裡，找出還能拍的題材。",
    description:
      "Grok Bot 會看相關 YouTube 影片，找出人們在看與問什麼，再建議你還能拍的題目。",
    steps: [
      "查看你領域表現好的影片",
      "記下標題、角度與觀眾問題",
      "找出還沒被拍透的空隙",
      "建議幾個可執行的影片題目",
      "附上為什麼這個題目站得住",
    ],
    targetUsers: ["內容創作者", "市場人員", "創辦人"],
  },
  "newsletter-creator": {
    title: "電子報撰寫",
    shortDescription: "把一週的筆記與連結，寫成人們會看完的電子報。",
    description:
      "貼上筆記、連結或草稿。Grok Bot 會寫出有觀點、有結構、讀得完的一期電子報。",
    steps: [
      "讀你這週的筆記與連結",
      "選一個清楚主題",
      "寫出有開頭、重點與收結的草稿",
      "刪掉聽起來像彙整信的部分",
      "交出可寄出的草稿",
    ],
    targetUsers: ["內容創作者", "創辦人", "市場人員"],
  },
  "blog-research-assistant": {
    title: "文章研究助手",
    shortDescription: "先幫你做閱讀，再交出帶來源的大綱。",
    description:
      "給 Grok Bot 一個題目。它會做閱讀、整理重點與來源，交給你可以直接開寫的大綱。",
    steps: [
      "讀你指定的題目與來源",
      "抽出可用的論點與證據",
      "標出缺口與弱處",
      "寫出帶來源的大綱",
      "建議一個清楚的文章角度",
    ],
    targetUsers: ["內容創作者", "研究員", "市場人員"],
  },
  "content-repurposing-bot": {
    title: "內容再利用",
    shortDescription: "把一篇好內容拆成一週的小貼文，而且聽起來不像罐頭。",
    description:
      "貼上一篇長文。Grok Bot 會抽出可獨立成立的重點，改寫成貼文、短句與後續題材。",
    steps: [
      "讀你貼上的原文",
      "抽出可獨立成立的重點",
      "改寫成不同長度的版本",
      "避免聽起來像同一段複製貼上",
      "排出一週的發布清單",
    ],
    targetUsers: ["內容創作者", "市場人員", "創辦人"],
  },
  "viral-content-researcher": {
    title: "爆款內容研究員",
    shortDescription: "研究你領域傳開的貼文，抽出規律——不是照抄。",
    description:
      "Grok Bot 會看傳開的內容，解釋為什麼有效，並建議你可以誠實使用的規律。",
    steps: [
      "查看你領域傳開的貼文",
      "分開規律與一次性運氣",
      "解釋為什麼某些內容會傳",
      "建議可再用的角度",
      "明確標出不要照抄的部分",
    ],
    targetUsers: ["內容創作者", "市場人員", "社群團隊"],
  },
  "daily-ai-news-brief": {
    title: "每日 AI 新聞簡報",
    shortDescription: "一則真正影響你工作的 AI 新聞早晨短信。",
    description:
      "Grok Bot 會讀近期 AI 新聞，只留下與你工作相關的，寫成短晨報，而不是熱點彙整。",
    steps: [
      "讀近期 AI 新聞與公告",
      "只留下與你工作相關的",
      "用白話解釋為什麼重要",
      "略過炒作與重複",
      "寫出可在早晨看完的短信",
    ],
    targetUsers: ["創辦人", "產品經理", "研究人員"],
  },
  "industry-news-monitor": {
    title: "行業新聞監察",
    shortDescription: "不用活在 15 份電子報裡，也能跟上你的行業。",
    description:
      "告訴 Grok Bot 你的行業。它會讀公開新聞，只交出影響你工作的變化。",
    steps: [
      "讀你行業的公開新聞",
      "標出真正的變化，而不只是新聞稿",
      "解釋為什麼與你有關",
      "略過重複報道",
      "寫出短日報或週報",
    ],
    targetUsers: ["創辦人", "策略人員", "市場人員"],
  },
  "company-researcher": {
    title: "公司研究員",
    shortDescription: "用公開資訊，為任何公司畫出清楚圖像。",
    description:
      "貼上公司名稱。Grok Bot 會整理產品、顧客、近期動態與風險，寫成可分享的檔案。",
    steps: [
      "讀網站、新聞與招聘頁",
      "整理他們賣什麼、賣給誰",
      "記下近期變化與訊號",
      "標出風險或未知之處",
      "寫出清楚的公司檔案",
    ],
    targetUsers: ["銷售人員", "投資研究者", "創辦人"],
  },
  "product-researcher": {
    title: "產品研究員",
    shortDescription: "比較產品與替代方案，說清楚它到底適合誰。",
    description:
      "給 Grok Bot 一個產品。它會比較替代方案，寫出它真正適合誰，以及不適合誰。",
    steps: [
      "讀產品與公開替代方案",
      "比較功能、定位與限制",
      "說清楚它真正適合誰",
      "標出不適合的對象",
      "寫出可用的比較簡報",
    ],
    targetUsers: ["產品經理", "買家", "創辦人"],
  },
  "market-research-bot": {
    title: "市場研究 Bot",
    shortDescription: "把模糊的市場問題，變成有結構、有來源的簡報。",
    description:
      "提出一個市場問題。Grok Bot 會整理公開證據，寫出發現、缺口與建議。",
    steps: [
      "讀你提出的市場問題",
      "收集公開證據與例子",
      "整理成幾個發現",
      "標出證據不足的地方",
      "寫出決策者看得懂的簡報",
    ],
    targetUsers: ["創辦人", "產品經理", "策略人員"],
  },
  "reddit-researcher": {
    title: "Reddit 研究員",
    shortDescription: "找出真人怎樣用自己的話說一個問題。",
    description:
      "Grok Bot 會讀相關 subreddit，抽出人們實際使用的句子、抱怨與未滿足需求。",
    steps: [
      "讀你指定的討論串或版面",
      "抽出重複的痛點與用語",
      "分開真實經驗與空談",
      "整理成顧客語言清單",
      "寫出產品或內容能用的摘要",
    ],
    targetUsers: ["產品經理", "市場人員", "研究員"],
  },
  "x-sentiment-research": {
    title: "X 情緒研究",
    shortDescription: "看看人們現在對一個品牌、題目或發布有什麼感覺。",
    description:
      "給 Grok Bot 一個品牌或發布。它會讀近期公開討論，整理情緒、原因與值得注意的聲音。",
    steps: [
      "讀近期公開討論",
      "分開正面、負面與觀望",
      "解釋情緒背後的原因",
      "標出值得跟進的聲音",
      "寫出短情緒簡報",
    ],
    targetUsers: ["市場人員", "品牌團隊", "創辦人"],
  },
  "research-report-builder": {
    title: "研究報告整理",
    shortDescription: "把一堆筆記與連結，變成別人用得上的報告。",
    description:
      "貼上凌亂的研究。Grok Bot 會整理成發現、證據、缺口與建議——可以拿去分享。",
    steps: [
      "讀你的筆記、引文與連結",
      "整理成幾個發現",
      "在每個發現下附上證據",
      "列出缺口與弱處",
      "寫出決策者能採取行動的建議",
    ],
    targetUsers: ["研究員", "顧問", "產品經理", "學生"],
  },
  "inbox-organizer": {
    title: "收件箱整理",
    shortDescription: "把擁擠的收件箱分成回覆、再等，以及不用你處理。",
    description:
      "讓 Grok Bot 看你的收件箱。它會把未讀分成今天回、可以等，以及根本不用你出面。",
    steps: [
      "讀未讀與待處理郵件",
      "分成回覆、等待與略過",
      "標出真正緊急的",
      "為該回的信草擬下一步",
      "交出一張可執行的收件箱畫面",
    ],
    targetUsers: ["辦公室工作者", "創辦人", "主管"],
  },
  "email-summarizer": {
    title: "電郵摘要",
    shortDescription: "把長電郵串變成誰說了什麼、你欠什麼。",
    description:
      "貼上長郵件串。Grok Bot 會寫出決定、未決事項，以及現在輪到誰。",
    steps: [
      "讀整串郵件",
      "記下誰做了什麼決定",
      "列出未完成事項與負責人",
      "標出你欠的回覆",
      "寫出短摘要",
    ],
    targetUsers: ["辦公室工作者", "專案經理", "創辦人"],
  },
  "meeting-prep-assistant": {
    title: "會議準備助手",
    shortDescription: "走進任何內部會議，都知道重點與你的角色。",
    description:
      "告訴 Grok Bot 會議是什麼。它會看議程、筆記與近期郵件，寫出你的角色與該說的話。",
    steps: [
      "讀議程與相關筆記",
      "說清楚這場會議的目的",
      "寫出你該負責的部分",
      "準備兩個好問題",
      "標出你可以略過的部分",
    ],
    targetUsers: ["辦公室工作者", "主管", "創辦人"],
  },
  "meeting-follow-up-assistant": {
    title: "會議跟進助手",
    shortDescription: "把凌亂會議筆記變成負責人、日期與可寄出的回顧。",
    description:
      "貼上筆記。Grok Bot 會寫出決定、負責人與日期，並且不會虛構沒有人說過的期限。",
    steps: [
      "讀會議筆記",
      "列出真正做了的決定",
      "為每項行動寫上負責人",
      "只有說過才寫日期",
      "寫出可寄出的回顧",
    ],
    targetUsers: ["專案經理", "主管", "創辦人"],
  },
  "daily-work-brief": {
    title: "每日工作簡報",
    shortDescription: "根據日曆與未完成事項，用短計劃開始一天。",
    description:
      "每天早上，Grok Bot 會看你的日曆與剩下的工作，寫出務實的一天計劃。",
    steps: [
      "讀日曆與未完成事項",
      "選出今天真正重要的三件事",
      "標出該改期或拒絕的會議",
      "寫出短早晨計劃",
      "留一點緩衝，不要排滿",
    ],
    targetUsers: ["辦公室工作者", "主管", "創辦人"],
  },
  "weekly-report-generator": {
    title: "週報產生器",
    shortDescription: "把一週筆記變成人們真的會看的進度更新。",
    description:
      "貼上這週發生的事。Grok Bot 會寫出進展、阻塞與下一步，短到主管會看完。",
    steps: [
      "讀你這週的筆記與結果",
      "寫出真正推進了的事",
      "標出阻塞與需要的幫助",
      "寫出下一週重點",
      "保持短、可讀、沒有空話",
    ],
    targetUsers: ["專案經理", "團隊負責人", "創辦人"],
  },
  "calendar-organizer": {
    title: "日曆整理",
    shortDescription: "看一週亂帳，建議保留、改期或拒絕什麼。",
    description:
      "把一週日曆交給 Grok Bot。它會建議保護專注時間、該拒絕的會議，以及可以合併的事項。",
    steps: [
      "讀這一週的會議",
      "標出沒有議程或可改書面更新的",
      "建議該拒絕或改期的",
      "找出可保護的專注時段",
      "寫出更乾淨的一週安排",
    ],
    targetUsers: ["主管", "創辦人", "辦公室工作者"],
  },
  "support-email-assistant": {
    title: "支援電郵助手",
    shortDescription: "用顧客的語言，草擬清楚而客氣的回覆。",
    description:
      "貼上顧客電郵。Grok Bot 會寫出回答問題、定下一步、而且不像範本的回覆。",
    steps: [
      "讀顧客電郵",
      "用一行說出真正的問題",
      "草擬回答這個問題的回覆",
      "加上下一步與負責人",
      "提供忙碌日子可用的更短版本",
    ],
    targetUsers: ["支援團隊", "創辦人", "客戶經理"],
  },
  "customer-complaint-analyzer": {
    title: "顧客投訴分析",
    shortDescription: "讀一堆投訴，告訴你底下那幾個真正問題。",
    description:
      "把投訴貼給 Grok Bot。它會歸類、找出重複原因，並寫出產品或支援該先處理的事。",
    steps: [
      "讀投訴與支援信件",
      "按底下問題歸類",
      "標出最常出現的原因",
      "分開一次性事件與系統問題",
      "寫出該先處理的短清單",
    ],
    targetUsers: ["支援主管", "產品經理", "創辦人"],
  },
  "faq-research-bot": {
    title: "FAQ 研究員",
    shortDescription: "用真實問題建立 FAQ，而不是你希望人們問的問題。",
    description:
      "貼上真實問題。Grok Bot 會整理成 FAQ，用顧客的語言回答，並標出你還沒答好的缺口。",
    steps: [
      "讀真實顧客問題",
      "合併重複問題",
      "用清楚語言寫答案",
      "標出你還沒有好答案的問題",
      "交出可發布的 FAQ 草稿",
    ],
    targetUsers: ["支援團隊", "市場人員", "創辦人"],
  },
  "feedback-collector": {
    title: "意見收集",
    shortDescription: "把散落的意見變成產品每週用得上的清單。",
    description:
      "把意見從郵件、聊天與通話裡交給 Grok Bot。它會去重、歸類，寫出產品每週該看的清單。",
    steps: [
      "讀散落的意見",
      "合併重複項目",
      "按主題歸類",
      "標出本週新出現的",
      "寫出產品能用的週清單",
    ],
    targetUsers: ["產品經理", "支援團隊", "創辦人"],
  },
  "customer-sentiment-monitor": {
    title: "顧客情緒監察",
    shortDescription: "每週讀一次：顧客聽起來是更好還是更差。",
    description:
      "Grok Bot 會讀一週的意見與提及，告訴你情緒走向，以及背後那一兩件事。",
    steps: [
      "讀一週的意見與提及",
      "判斷整體情緒",
      "找出驅動變化的那一兩件事",
      "分開大聲少數與廣泛模式",
      "寫出短週報",
    ],
    targetUsers: ["客戶成功", "產品經理", "創辦人"],
  },
  "candidate-researcher": {
    title: "候選人研究",
    shortDescription: "在面談之前，用公開來源做好公平的簡報。",
    description:
      "貼上候選人姓名與職位。Grok Bot 會整理公開資料，寫出公平簡報，並標出不該臆測的地方。",
    steps: [
      "讀公開資料與你提供的履歷",
      "整理與職位相關的經驗",
      "標出值得在面談問的問題",
      "避免私人臆測",
      "寫出一頁公平簡報",
    ],
    targetUsers: ["招聘人員", "用人經理", "創辦人"],
  },
  "resume-screener": {
    title: "履歷篩選",
    shortDescription: "按職位為一疊履歷打分，並寫出你講得清的理由。",
    description:
      "把履歷與必備條件交給 Grok Bot。它會打分、引用依據，並把邊緣個案標出來給你決定。",
    steps: [
      "讀職位必備條件",
      "逐份對照履歷",
      "按必須條件打分",
      "引用它依據的那一行",
      "把邊緣個案交給你決定",
    ],
    targetUsers: ["招聘人員", "用人經理", "創辦人"],
  },
  "interview-prep-bot": {
    title: "面試準備 Bot",
    shortDescription: "做出能測工作本身、而不是測感覺的面試計劃。",
    description:
      "告訴 Grok Bot 這個職位。它會寫出問題、該聽什麼，以及怎樣公平比較候選人。",
    steps: [
      "讀職位與必須條件",
      "寫出測試真實工作的問題",
      "記下每個問題該聽什麼",
      "加入公平比較的方式",
      "交出面試計劃",
    ],
    targetUsers: ["用人經理", "招聘人員", "創辦人"],
  },
  "new-employee-onboarding": {
    title: "新員工入職",
    shortDescription: "把凌亂的第一週，變成新同事跟得住的日程。",
    description:
      "告訴 Grok Bot 這個職位與團隊。它會寫出第一週每天該做什麼、該見誰、怎樣才算上手。",
    steps: [
      "讀職位與團隊現況",
      "排出第一週每天計劃",
      "寫出該見的人與該讀的資料",
      "定義第一週完成的樣子",
      "留下主管檢查的節點",
    ],
    targetUsers: ["用人經理", "人事", "創辦人"],
  },
  "github-issue-researcher": {
    title: "GitHub Issue 研究員",
    shortDescription: "讀一堆 GitHub issues，告訴你現在真正著火的是什麼。",
    description:
      "把 issues 交給 Grok Bot。它會歸類、標重複，並寫出下一次站會能用的分流簡報。",
    steps: [
      "讀你貼上或描述的未解 issues",
      "按底下 bug 歸類",
      "標出可能重複的",
      "點出使用者每天都感覺到的",
      "寫出下一次站會用的分流簡報",
    ],
    targetUsers: ["工程負責人", "創辦人", "面對支援的開發者"],
  },
  "bug-reproduction-assistant": {
    title: "Bug 重現助手",
    shortDescription: "把含糊的 bug 回報，變成別人跟得住的步驟。",
    description:
      "貼上回報。Grok Bot 會寫出清楚重現步驟、該擷取什麼，以及還要問回報者的問題。",
    steps: [
      "讀 bug 回報",
      "寫出可重現的編號步驟",
      "列出仍然缺少的資訊",
      "建議一個問回報者的問題",
      "指出最該先看的地方，但不猜修法",
    ],
    targetUsers: ["開發者", "QA", "支援工程師"],
  },
  "pr-reviewer": {
    title: "PR 審查",
    shortDescription: "像細心的同事一樣讀 pull request，留下有用的意見。",
    description:
      "貼上 diff 或 PR 說明。Grok Bot 會列出風險、缺少的測試與問題——不是一堆標點挑剔。",
    steps: [
      "讀 PR 說明與 diff",
      "重述這次改動是為了什麼",
      "列出真正的風險",
      "用問題代替臆測意圖",
      "建議實際缺少的測試",
    ],
    targetUsers: ["開發者", "技術負責人"],
  },
  "website-qa-bot": {
    title: "網站 QA Bot",
    shortDescription: "像新使用者一樣點過網站，記下壞掉或令人困惑的地方。",
    description:
      "給 Grok Bot 一個網址與要完成的任務。它會走流程，回報壞掉的部分、含糊文案與缺少的狀態。",
    steps: [
      "打開你指定的頁面",
      "像新使用者一樣試著完成任務",
      "記下壞掉的連結、失效按鈕與含糊文案",
      "檢查空白與錯誤狀態是否存在",
      "寫出可立案的 QA 筆記",
    ],
    targetUsers: ["開發者", "設計師", "創辦人"],
  },
  "error-monitor": {
    title: "錯誤監察",
    shortDescription: "讀錯誤日誌，告訴你今天哪些是使用者真正感覺到的。",
    description:
      "貼上日誌或 Sentry 式清單。Grok Bot 會歸類錯誤、估計使用者影響，並寫出給團隊的早晨短信。",
    steps: [
      "讀你貼上的錯誤",
      "把重複的歸在一起",
      "標出使用者會感覺到的",
      "如果你貼了昨天的資料，就做比較",
      "寫出短早晨短信",
    ],
    targetUsers: ["開發者", "on-call", "工程負責人"],
  },
  "expense-report-organizer": {
    title: "報銷整理",
    shortDescription: "把一堆收據變成可提交的清楚報銷清單。",
    description:
      "貼上收據或卡帳單。Grok Bot 會歸類、標出缺漏，寫出財務會接受的清單。",
    steps: [
      "讀你貼上的收據或卡帳單",
      "按旅程或類別歸類",
      "標出缺少商戶、日期或金額的",
      "標出要抽走的私人消費",
      "寫出可提交的清單",
    ],
    targetUsers: ["辦公室工作者", "創辦人", "主管"],
  },
  "invoice-follow-up": {
    title: "發票跟進",
    shortDescription: "為未付發票寫一封禮貌而具體的短信。",
    description:
      "把發票與關係告訴 Grok Bot。它會草擬第一封，以及仍然像人的較硬第二封。",
    steps: [
      "讀發票細節",
      "用事實寫第一封跟進",
      "再寫較硬的第二封",
      "建議各自何時寄出",
      "保持關係不受損",
    ],
    targetUsers: ["創辦人", "自由工作者", "財務協調"],
  },
  "weekly-cash-snapshot": {
    title: "每週現金快照",
    shortDescription: "把帳戶數字變成一屏的本週現金畫面。",
    description:
      "貼上結餘與即將到期的帳單。Grok Bot 會寫出進帳、出帳，以及下週會不會緊。",
    steps: [
      "讀你貼上的結餘與即將到期帳單",
      "列出進帳與出帳",
      "標出會讓下週變緊的項目",
      "寫出可放到 Slack 的快照",
      "如果有決策，就點出那一個",
    ],
    targetUsers: ["創辦人", "營運負責人", "小型財務團隊"],
  },
  "personal-weekly-review": {
    title: "個人週檢",
    shortDescription: "用短回顧結束一週，並訂出下週務實計劃。",
    description:
      "貼上發生了什麼。Grok Bot 會寫出真正重要的、該放下的，以及下週三個結果。",
    steps: [
      "讀你的筆記、日曆與剩下的事",
      "點出真正推進了的",
      "列出該放下的",
      "寫出下週三個結果",
      "建議一次休息或重置",
    ],
    targetUsers: ["辦公室工作者", "創辦人", "主管"],
  },
  "focus-block-planner": {
    title: "專注時段規劃",
    shortDescription: "為需要關上門的工作，保住兩個小時。",
    description:
      "告訴 Grok Bot 深工作是什麼、這一週長什麼樣子。它會找出最不壞的時段，並寫出你需要寄出的拒絕。",
    steps: [
      "讀這一週與你點名的深工作",
      "找出仍然空著的兩小時時段",
      "如有需要，建議拒絕什麼來騰出一格",
      "寫出日曆標題與勿擾說明",
      "加上結束規則，讓這段時間真的會完",
    ],
    targetUsers: ["創作者", "主管", "創辦人"],
  },
  "personal-research-digest": {
    title: "個人研究摘要",
    shortDescription: "把你打算讀的分頁與論文，收成一則短摘要。",
    description:
      "貼上連結或筆記。Grok Bot 會寫出該精讀、該掃、該丟的清單——對準你在意的專案。",
    steps: [
      "讀你貼上的連結或筆記",
      "把每一項對準你點名的專案",
      "標出精讀／掃讀／丟掉",
      "寫出三項摘要",
      "留下一句值得保存的引文",
    ],
    targetUsers: ["研究員", "創辦人", "營運者"],
  },
  "competitor-social-monitor": {
    title: "對手社交監察",
    shortDescription: "看看對手這週發了什麼，以及有沒有人在意。",
    description:
      "Grok Bot 會查看對手在 LinkedIn、X 與 YouTube 的頁面，報告他們發布了什麼、什麼真正落地，以及你可以忽略什麼。",
    steps: [
      "查看你指定的對手檔案",
      "列出這週的貼文、影片與大型討論",
      "記下真正有回覆的",
      "忽略空洞的互動誘餌",
      "建議一件該學、而不是該抄的事",
    ],
    targetUsers: ["市場人員", "創辦人", "社群團隊"],
  },
  "reddit-thread-scout": {
    title: "Reddit 討論串偵察",
    shortDescription: "找出值得加入的新討論，以及仍然排在 Google 的舊串。",
    description:
      "把網站同對手交給 Grok Bot。它會搵你可以幫手嘅新對話，同仍然出現喺搜尋嘅舊串，然後停喺草稿留言，由你自己貼。",
    steps: [
      "讀你嘅網站、產品同對手名",
      "喺 Reddit 搵 72 小時內你可以真係幫到嘅新串",
      "搵仍然排喺 Google 嘅舊討論",
      "為每條串打分：適唔適合、新唔新、會唔會似垃圾廣告",
      "每條保留串寫一句留言草稿。你自己貼。",
    ],
    targetUsers: ["創辦人", "市場人員", "獨立開發者"],
  },
  "travel-concierge": {
    title: "旅行管家",
    shortDescription: "把行程念頭變成日期、選擇，同你仍然要批准嘅日程。",
    description:
      "告訴 Grok Bot 城市、日期、預算同限制。它會比較公開機票同住宿，寫一份好行嘅日程，訂位之前會停低。",
    steps: [
      "讀你嘅日期、預算同硬限制",
      "查公開機票同住宿選擇",
      "寫一份唔使來回亂走嘅日程",
      "標出簽證、天氣或預訂風險",
      "交一份短簡報。你自己預訂。",
    ],
    targetUsers: ["忙嘅上班族", "家庭", "創辦人"],
  },
  "youtube-comment-desk": {
    title: "YouTube 留言枱",
    shortDescription: "整理新留言，用你嘅語氣起草回覆。你先撳發送。",
    description:
      "指向一條片或頻道。Grok Bot 會把留言分成問題、稱讚、故障同垃圾，再寫短回覆畀你貼——它唔會代你公開。",
    steps: [
      "打開你指定嘅片或頻道留言",
      "分成：問題、稱讚、故障、垃圾",
      "標出今日要人回嘅",
      "用你嘅語氣寫短回覆",
      "停低。聽落似你嘅，先由你貼。",
    ],
    targetUsers: ["創作者", "教育工作者", "產品市場"],
  },
  "x-viral-scout": {
    title: "X 爆文偵察",
    shortDescription: "喺引用堆到之前，捉住你領域正在起飛嘅帖。",
    description:
      "Grok Bot 會睇 X 上加速度緊嘅帖——唔係已經紅完嗰啲——再話你知應該引用、回覆，定係放過。",
    steps: [
      "掃你嘅領域、帳戶同關鍵詞",
      "搵回覆同轉發仍然喺度升嘅帖",
      "解釋點解呢條喺郁",
      "講引用、回覆，定跳過",
      "如果你真係有嘢講，起草一句。你自己貼。",
    ],
    targetUsers: ["創辦人", "創作者", "市場人員"],
  },
  "monday-marketing-report": {
    title: "星期一市場報告",
    shortDescription: "行一次你逢星期一都會開嘅儀表板，留低一頁簡報。",
    description:
      "教 Grok Bot 你每星期撳嘅 GA4、廣告同電郵分頁。它會抄你點名嘅數字、寫短簡報，數字越線先嘈你。",
    steps: [
      "打開你已經用緊嘅儀表板",
      "只抄你點名嘅指標",
      "同上星期比較",
      "寫一頁簡報",
      "數字越線先通知你",
    ],
    targetUsers: ["市場經理", "創辦人", "代理公司負責人"],
  },
};

const hans: Record<string, UseCaseI18n> = {
  "lead-researcher": {
    title: "潜在客户研究员",
    shortDescription: "在销售团队联系之前，先找出并摘要潜在顾客。",
    description:
      "给 Grok Bot 一个市场、城市或顾客类型。它会找出符合的公司、写出简短档案，再把名单放到你可以继续跟进的表格。",
    steps: [
      "找出符合你描述的顾客类型的公司",
      "打开公开页面，例如网站、关于我们与近期新闻",
      "写出简短档案：他们做什么、服务谁、为什么会在意",
      "为每家公司加上建议的第一句开场",
      "把名单放到表格或短简报",
    ],
    targetUsers: ["销售人员", "自己做开拓的创始人", "SDR", "代理公司负责人"],
  },
  "prospect-research": {
    title: "对象研究",
    shortDescription: "在上电话之前，先做好一页公司简报。",
    description:
      "贴上公司名称。Grok Bot 会读公开资料——产品、人物、新闻、招聘——交给你两分钟就能扫完的一页简报。",
    steps: [
      "打开公司网站、新闻与招聘页",
      "记下他们卖什么、卖给谁，以及最近的变化",
      "如果你提供姓名，会查一下与会者",
      "标出风险，例如融资失利或竞品已经进驻",
      "写出带 3 个谈话重点的一页简报",
    ],
    targetUsers: ["客户经理", "创始人", "客户成功经理"],
  },
  "lead-qualification": {
    title: "潜在客户评分",
    shortDescription: "帮名单打分，把时间花在值得打电话的对象。",
    description:
      "把一份名单交给 Grok Bot。它会对照你的理想顾客，标出值得致电、值得培养，或完全不适合。",
    steps: [
      "读你提供的公司或联系人名单",
      "查看公开信号：规模、行业、招聘、技术、新闻",
      "按你给的顾客档案为每个对象打分",
      "用一行写出分数原因",
      "分成今天打、之后培养，或跳过",
    ],
    targetUsers: ["SDR 主管", "销售团队", "创始人"],
  },
  "sales-meeting-prep": {
    title: "销售会议准备",
    shortDescription: "每次销售会议都带着一页计划进场。",
    description:
      "Grok Bot 会看公司、人物与最近邮件，写出短计划：目标、谈话重点、问题，以及建议的收结。",
    steps: [
      "读会议出席者与公司在做什么",
      "查看近期公开新闻与你贴上的笔记",
      "为这通电话定一个清楚目标",
      "按使用顺序写出谈话重点与问题",
      "加上建议收结，以及对方卡住时的备案",
    ],
    targetUsers: ["客户经理", "销售主管", "创始人"],
  },
  "crm-updater": {
    title: "CRM 更新助手",
    shortDescription: "把凌乱的通话笔记变成干净的 CRM 字段与下一步。",
    description:
      "通话后贴上你的潦草笔记。Grok Bot 会写出清楚摘要、建议的 CRM 字段，以及可以复制到 Salesforce 或 HubSpot 的下一项任务。",
    steps: [
      "读你贴上的原始笔记或邮件",
      "抽出事实：人物、日期、异议、下一步",
      "写出可放入 CRM 的摘要",
      "只有对方明确说过，才建议阶段、金额与成交日",
      "用一行草拟下一项任务",
    ],
    targetUsers: ["销售人员", "销售运营", "客户经理"],
  },
  "follow-up-email-writer": {
    title: "跟进邮件撰写",
    shortDescription: "在通话、演示或未回复的邮件之后，写一封清楚的跟进。",
    description:
      "告诉 Grok Bot 发生了什么。它会草拟听起来像人的短跟进，只有一个请求，以及你可以寄出的主题。",
    steps: [
      "读上次通话或邮件发生了什么",
      "为这封跟进选定一个目的",
      "写一封只有一个请求的短邮件",
      "提供主题，以及更短的再提醒版本",
      "语气保持礼貌而具体",
    ],
    targetUsers: ["销售人员", "创始人", "客户经理"],
  },
  "lost-lead-re-engagement": {
    title: "沉睡客户再启动",
    shortDescription: "给几个月没消息的对象，写一封诚实的短信。",
    description:
      "告诉 Grok Bot 这个沉睡对象，以及他们为什么消失。它会草拟再联系的短信，给一个再谈的理由，而不会听起来很急。",
    steps: [
      "读对方为什么安静下来",
      "找一个真正再写的理由——产品变化、新结果，或相关事件",
      "草拟只有一个低压力请求的短信",
      "标出应该放下的对象",
      "加上两周后可再寄的第二次接触",
    ],
    targetUsers: ["销售人员", "创始人", "客户成功"],
  },
  "daily-sales-brief": {
    title: "每日销售简报",
    shortDescription: "用一张短画面开始一天：管道、会议与待跟进。",
    description:
      "每天早上，Grok Bot 会把会议、未完成交易与过期跟进，变成你可以配咖啡看完的一屏简报。",
    steps: [
      "读当天会议与未完成交易",
      "标出过期或卡住的跟进",
      "排出今天最该做的三件事",
      "写出一屏可读的早晨简报",
      "跳过没有行动的噪音",
    ],
    targetUsers: ["销售人员", "销售主管", "创始人"],
  },
  "competitor-monitor": {
    title: "竞品监控",
    shortDescription: "自动检查竞品网站，有重要变化才告诉你。",
    description:
      "告诉 Grok Bot 要看哪些页面。它会定期检查，只在定价、产品或信息真的变了才写简报。",
    steps: [
      "打开你指定的竞品页面",
      "对照上次看到的内容",
      "只记下真正重要的变化",
      "忽略设计改版与无关改动",
      "写出可采取行动的短简报",
    ],
    targetUsers: ["市场人员", "创始人", "产品经理"],
  },
  "competitor-price-monitor": {
    title: "竞品价格监控",
    shortDescription: "盯着竞品定价页，标出真正的价格或方案变化。",
    description:
      "Grok Bot 会重访定价页，比较方案与价格，只在数字或限制真的变了才通知你。",
    steps: [
      "打开竞品定价页",
      "记下方案、价格与限制",
      "与上次记录比较",
      "标出真实变化，忽略版面改动",
      "写出给市场或销售看的短笔记",
    ],
    targetUsers: ["市场人员", "销售主管", "创始人"],
  },
  "ad-monitor": {
    title: "广告监控",
    shortDescription: "看看竞品这周在广告里说什么。",
    description:
      "Grok Bot 会查看竞品公开广告，整理他们强调的承诺、优惠与受众，写成一周扫描。",
    steps: [
      "找出竞品正在投放的公开广告",
      "记下承诺、优惠与语气",
      "标出重复出现的主题",
      "忽略一次性的噪音",
      "写出市场团队能用的周报",
    ],
    targetUsers: ["市场人员", "增长团队", "创始人"],
  },
  "seo-researcher": {
    title: "SEO 研究员",
    shortDescription: "找出你实际有机会赢的搜索题材，而不是虚荣关键词。",
    description:
      "给 Grok Bot 一个主题。它会找出人们真的在搜、而你又写得赢的题材，并说明为什么。",
    steps: [
      "读你想覆盖的主题",
      "找出人们实际会搜的问题",
      "跳过太大、不可能赢的关键词",
      "建议这个月值得做的页面",
      "附上为什么现在值得写",
    ],
    targetUsers: ["内容人员", "市场人员", "创始人"],
  },
  "keyword-researcher": {
    title: "关键词研究员",
    shortDescription: "把凌乱主题变成人们真的会打的短语清单。",
    description:
      "贴上一个模糊题目。Grok Bot 会整理成短语清单，分开要写的、要避开的，以及可以组成一页的。",
    steps: [
      "读你给的凌乱主题",
      "列出人们真的会输入的短语",
      "分成页面主题与支持短语",
      "丢掉虚荣或太宽的词",
      "交出可执行的短清单",
    ],
    targetUsers: ["内容人员", "SEO", "市场人员"],
  },
  "brand-mention-monitor": {
    title: "品牌提及监控",
    shortDescription: "捕捉人们在谈你——或改谈竞品——的时候。",
    description:
      "Grok Bot 会查看公开对话，标出提及你或竞品的内容，并告诉你哪些值得回复。",
    steps: [
      "搜索品牌、产品与竞品名称",
      "读近期公开提及",
      "标出需要回复或跟进的",
      "分开赞、投诉与竞品比较",
      "写出过去 24 小时的短摘要",
    ],
    targetUsers: ["市场人员", "社区团队", "创始人"],
  },
  "marketing-campaign-report": {
    title: "市场活动报告",
    shortDescription: "把活动数字变成主管看得完的一页故事。",
    description:
      "贴上活动数据。Grok Bot 会写出发生了什么、为什么重要，以及下一周该改什么。",
    steps: [
      "读你贴上的活动数字",
      "找出真正移动了的指标",
      "用白话解释原因",
      "标出该停、该加码或该测试的",
      "写出一页周报",
    ],
    targetUsers: ["市场人员", "增长团队", "创始人"],
  },
  "customer-review-analyzer": {
    title: "顾客评论分析",
    shortDescription: "读一堆评论，告诉你人们爱什么、恨什么、一直重复什么。",
    description:
      "把评论贴给 Grok Bot。它会抽出重复句子、真正痛点，以及你可以在网站或产品里使用的用语。",
    steps: [
      "读你贴上的评论",
      "分出喜欢、抱怨与重复句子",
      "标出真正的产品问题",
      "抽出顾客已经在用的说法",
      "写出市场与产品都能用的摘要",
    ],
    targetUsers: ["市场人员", "产品经理", "创始人"],
  },
  "trending-topic-finder": {
    title: "热门题材发现",
    shortDescription: "找出这周人们在谈、而你还赶得及写的题材。",
    description:
      "Grok Bot 会扫过公开讨论，找出还有时间写、又与你领域相关的题材，而不是已经过气的热点。",
    steps: [
      "查看你领域的近期公开讨论",
      "找出正在上升、尚未写烂的题材",
      "跳过已经过气的热点",
      "建议你这周还写得及的题目",
      "附上为什么现在值得写",
    ],
    targetUsers: ["内容创作者", "市场人员", "创始人"],
  },
  "x-content-researcher": {
    title: "X 内容研究员",
    shortDescription: "看看你领域里哪些帖子得到真正回复，而不只是赞。",
    description:
      "Grok Bot 会研究 X 上的帖子，找出引发对话的内容，并抽出你可以再用的角度——不是照抄。",
    steps: [
      "查看你领域的近期帖子",
      "分开真正回复与空洞互动",
      "抽出有效的角度与开场",
      "标出不要照抄的部分",
      "写出可执行的内容简报",
    ],
    targetUsers: ["内容创作者", "市场人员", "创始人"],
  },
  "linkedin-post-researcher": {
    title: "LinkedIn 帖子研究员",
    shortDescription: "找出你行业里人们真的会留言的 LinkedIn 帖子。",
    description:
      "Grok Bot 会读 LinkedIn 上的公开帖子，找出引发评论的内容，并整理成你可以写的角度。",
    steps: [
      "查看行业里的公开 LinkedIn 帖子",
      "记下真正有评论的",
      "抽出主题与语气",
      "跳过空洞的宣布文",
      "写出可写的帖子简报",
    ],
    targetUsers: ["内容创作者", "B2B 市场", "创始人"],
  },
  "youtube-idea-researcher": {
    title: "YouTube 题材研究员",
    shortDescription: "从你领域已经有效的视频里，找出还能拍的题材。",
    description:
      "Grok Bot 会看相关 YouTube 视频，找出人们在看与问什么，再建议你还能拍的题目。",
    steps: [
      "查看你领域表现好的视频",
      "记下标题、角度与观众问题",
      "找出还没被拍透的空隙",
      "建议几个可执行的视频题目",
      "附上为什么这个题目站得住",
    ],
    targetUsers: ["内容创作者", "市场人员", "创始人"],
  },
  "newsletter-creator": {
    title: "电子报撰写",
    shortDescription: "把一周的笔记与链接，写成人们会看完的电子报。",
    description:
      "贴上笔记、链接或草稿。Grok Bot 会写出有观点、有结构、读得完的一期电子报。",
    steps: [
      "读你这周的笔记与链接",
      "选一个清楚主题",
      "写出有开头、重点与收结的草稿",
      "删掉听起来像汇总信的部分",
      "交出发得出的草稿",
    ],
    targetUsers: ["内容创作者", "创始人", "市场人员"],
  },
  "blog-research-assistant": {
    title: "文章研究助手",
    shortDescription: "先帮你做阅读，再交出带来源的大纲。",
    description:
      "给 Grok Bot 一个题目。它会做阅读、整理重点与来源，交给你可以直接开写的大纲。",
    steps: [
      "读你指定的题目与来源",
      "抽出可用的论点与证据",
      "标出缺口与弱处",
      "写出带来源的大纲",
      "建议一个清楚的文章角度",
    ],
    targetUsers: ["内容创作者", "研究员", "市场人员"],
  },
  "content-repurposing-bot": {
    title: "内容再利用",
    shortDescription: "把一篇好内容拆成一周的小帖子，而且听起来不像罐头。",
    description:
      "贴上一篇长文。Grok Bot 会抽出可独立成立的重点，改写成帖子、短句与后续题材。",
    steps: [
      "读你贴上的原文",
      "抽出可独立成立的重点",
      "改写成不同长度的版本",
      "避免听起来像同一段复制粘贴",
      "排出一周的发布清单",
    ],
    targetUsers: ["内容创作者", "市场人员", "创始人"],
  },
  "viral-content-researcher": {
    title: "爆款内容研究员",
    shortDescription: "研究你领域传开的帖子，抽出规律——不是照抄。",
    description:
      "Grok Bot 会看传开的内容，解释为什么有效，并建议你可以诚实使用的规律。",
    steps: [
      "查看你领域传开的帖子",
      "分开规律与一次性运气",
      "解释为什么某些内容会传",
      "建议可再用的角度",
      "明确标出不要照抄的部分",
    ],
    targetUsers: ["内容创作者", "市场人员", "社区团队"],
  },
  "daily-ai-news-brief": {
    title: "每日 AI 新闻简报",
    shortDescription: "一则真正影响你工作的 AI 新闻早晨短信。",
    description:
      "Grok Bot 会读近期 AI 新闻，只留下与你工作相关的，写成短晨报，而不是热点汇总。",
    steps: [
      "读近期 AI 新闻与公告",
      "只留下与你工作相关的",
      "用白话解释为什么重要",
      "跳过炒作与重复",
      "写出可在早晨看完的短信",
    ],
    targetUsers: ["创始人", "产品经理", "研究人员"],
  },
  "industry-news-monitor": {
    title: "行业新闻监控",
    shortDescription: "不用活在 15 份电子报里，也能跟上你的行业。",
    description:
      "告诉 Grok Bot 你的行业。它会读公开新闻，只交出影响你工作的变化。",
    steps: [
      "读你行业的公开新闻",
      "标出真正的变化，而不只是新闻稿",
      "解释为什么与你有关",
      "跳过重复报道",
      "写出短日报或周报",
    ],
    targetUsers: ["创始人", "策略人员", "市场人员"],
  },
  "company-researcher": {
    title: "公司研究员",
    shortDescription: "用公开信息，为任何公司画出清楚图像。",
    description:
      "贴上公司名称。Grok Bot 会整理产品、顾客、近期动态与风险，写成可分享的档案。",
    steps: [
      "读网站、新闻与招聘页",
      "整理他们卖什么、卖给谁",
      "记下近期变化与信号",
      "标出风险或未知之处",
      "写出清楚的公司档案",
    ],
    targetUsers: ["销售人员", "投资研究者", "创始人"],
  },
  "product-researcher": {
    title: "产品研究员",
    shortDescription: "比较产品与替代方案，说清楚它到底适合谁。",
    description:
      "给 Grok Bot 一个产品。它会比较替代方案，写出它真正适合谁，以及不适合谁。",
    steps: [
      "读产品与公开替代方案",
      "比较功能、定位与限制",
      "说清楚它真正适合谁",
      "标出不适合的对象",
      "写出可用的比较简报",
    ],
    targetUsers: ["产品经理", "买家", "创始人"],
  },
  "market-research-bot": {
    title: "市场研究 Bot",
    shortDescription: "把模糊的市场问题，变成有结构、有来源的简报。",
    description:
      "提出一个市场问题。Grok Bot 会整理公开证据，写出发现、缺口与建议。",
    steps: [
      "读你提出的市场问题",
      "收集公开证据与例子",
      "整理成几个发现",
      "标出证据不足的地方",
      "写出决策者看得懂的简报",
    ],
    targetUsers: ["创始人", "产品经理", "策略人员"],
  },
  "reddit-researcher": {
    title: "Reddit 研究员",
    shortDescription: "找出真人怎样用自己的话说一个问题。",
    description:
      "Grok Bot 会读相关 subreddit，抽出人们实际使用的句子、抱怨与未满足需求。",
    steps: [
      "读你指定的讨论串或版面",
      "抽出重复的痛点与用语",
      "分开真实经验与空谈",
      "整理成顾客语言清单",
      "写出产品或内容能用的摘要",
    ],
    targetUsers: ["产品经理", "市场人员", "研究员"],
  },
  "x-sentiment-research": {
    title: "X 情绪研究",
    shortDescription: "看看人们现在对一个品牌、题目或发布有什么感觉。",
    description:
      "给 Grok Bot 一个品牌或发布。它会读近期公开讨论，整理情绪、原因与值得注意的声音。",
    steps: [
      "读近期公开讨论",
      "分开正面、负面与观望",
      "解释情绪背后的原因",
      "标出值得跟进的声音",
      "写出短情绪简报",
    ],
    targetUsers: ["市场人员", "品牌团队", "创始人"],
  },
  "research-report-builder": {
    title: "研究报告整理",
    shortDescription: "把一堆笔记与链接，变成别人用得上的报告。",
    description:
      "贴上凌乱的研究。Grok Bot 会整理成发现、证据、缺口与建议——可以拿去分享。",
    steps: [
      "读你的笔记、引文与链接",
      "整理成几个发现",
      "在每个发现下附上证据",
      "列出缺口与弱处",
      "写出决策者能采取行动的建议",
    ],
    targetUsers: ["研究员", "顾问", "产品经理", "学生"],
  },
  "inbox-organizer": {
    title: "收件箱整理",
    shortDescription: "把拥挤的收件箱分成回复、再等，以及不用你处理。",
    description:
      "让 Grok Bot 看你的收件箱。它会把未读分成今天回、可以等，以及根本不用你出面。",
    steps: [
      "读未读与待处理邮件",
      "分成回复、等待与跳过",
      "标出真正紧急的",
      "为该回的信草拟下一步",
      "交出一张可执行的收件箱画面",
    ],
    targetUsers: ["办公室工作者", "创始人", "主管"],
  },
  "email-summarizer": {
    title: "邮件摘要",
    shortDescription: "把长邮件串变成谁说了什么、你欠什么。",
    description:
      "贴上长邮件串。Grok Bot 会写出决定、未决事项，以及现在轮到谁。",
    steps: [
      "读整串邮件",
      "记下谁做了什么决定",
      "列出未完成事项与负责人",
      "标出你欠的回复",
      "写出短摘要",
    ],
    targetUsers: ["办公室工作者", "项目经理", "创始人"],
  },
  "meeting-prep-assistant": {
    title: "会议准备助手",
    shortDescription: "走进任何内部会议，都知道重点与你的角色。",
    description:
      "告诉 Grok Bot 会议是什么。它会看议程、笔记与近期邮件，写出你的角色与该说的话。",
    steps: [
      "读议程与相关笔记",
      "说清楚这场会议的目的",
      "写出你该负责的部分",
      "准备两个好问题",
      "标出你可以跳过的部分",
    ],
    targetUsers: ["办公室工作者", "主管", "创始人"],
  },
  "meeting-follow-up-assistant": {
    title: "会议跟进助手",
    shortDescription: "把凌乱会议笔记变成负责人、日期与可寄出的回顾。",
    description:
      "贴上笔记。Grok Bot 会写出决定、负责人与日期，并且不会虚构没有人说过的期限。",
    steps: [
      "读会议笔记",
      "列出真正做了的决定",
      "为每项行动写上负责人",
      "只有说过才写日期",
      "写出可寄出的回顾",
    ],
    targetUsers: ["项目经理", "主管", "创始人"],
  },
  "daily-work-brief": {
    title: "每日工作简报",
    shortDescription: "根据日历与未完成事项，用短计划开始一天。",
    description:
      "每天早上，Grok Bot 会看你的日历与剩下的工作，写出务实的一天计划。",
    steps: [
      "读日历与未完成事项",
      "选出今天真正重要的三件事",
      "标出该改期或拒绝的会议",
      "写出短早晨计划",
      "留一点缓冲，不要排满",
    ],
    targetUsers: ["办公室工作者", "主管", "创始人"],
  },
  "weekly-report-generator": {
    title: "周报生成器",
    shortDescription: "把一周笔记变成人们真的会看的进度更新。",
    description:
      "贴上这周发生的事。Grok Bot 会写出进展、阻塞与下一步，短到主管会看完。",
    steps: [
      "读你这周的笔记与结果",
      "写出真正推进了的事",
      "标出阻塞与需要的帮助",
      "写出下一周重点",
      "保持短、可读、没有空话",
    ],
    targetUsers: ["项目经理", "团队负责人", "创始人"],
  },
  "calendar-organizer": {
    title: "日历整理",
    shortDescription: "看一周乱账，建议保留、改期或拒绝什么。",
    description:
      "把一周日历交给 Grok Bot。它会建议保护专注时间、该拒绝的会议，以及可以合并的事项。",
    steps: [
      "读这一周的会议",
      "标出没有议程或可改书面更新的",
      "建议该拒绝或改期的",
      "找出可保护的专注时段",
      "写出更干净的一周安排",
    ],
    targetUsers: ["主管", "创始人", "办公室工作者"],
  },
  "support-email-assistant": {
    title: "支持邮件助手",
    shortDescription: "用顾客的语言，草拟清楚而客气的回复。",
    description:
      "贴上顾客邮件。Grok Bot 会写出回答问题、定下一步、而且不像模板的回复。",
    steps: [
      "读顾客邮件",
      "用一行说出真正的问题",
      "草拟回答这个问题的回复",
      "加上下一步与负责人",
      "提供忙碌日子可用的更短版本",
    ],
    targetUsers: ["支持团队", "创始人", "客户经理"],
  },
  "customer-complaint-analyzer": {
    title: "顾客投诉分析",
    shortDescription: "读一堆投诉，告诉你底下那几个真正问题。",
    description:
      "把投诉贴给 Grok Bot。它会归类、找出重复原因，并写出产品或支持该先处理的事。",
    steps: [
      "读投诉与支持信件",
      "按底下问题归类",
      "标出最常出现的原因",
      "分开一次性事件与系统问题",
      "写出该先处理的短清单",
    ],
    targetUsers: ["支持主管", "产品经理", "创始人"],
  },
  "faq-research-bot": {
    title: "FAQ 研究员",
    shortDescription: "用真实问题建立 FAQ，而不是你希望人们问的问题。",
    description:
      "贴上真实问题。Grok Bot 会整理成 FAQ，用顾客的语言回答，并标出你还没答好的缺口。",
    steps: [
      "读真实顾客问题",
      "合并重复问题",
      "用清楚语言写答案",
      "标出你还没有好答案的问题",
      "交出可发布的 FAQ 草稿",
    ],
    targetUsers: ["支持团队", "市场人员", "创始人"],
  },
  "feedback-collector": {
    title: "意见收集",
    shortDescription: "把散落的意见变成产品每周用得上的清单。",
    description:
      "把意见从邮件、聊天与通话里交给 Grok Bot。它会去重、归类，写出产品每周该看的清单。",
    steps: [
      "读散落的意见",
      "合并重复项目",
      "按主题归类",
      "标出本周新出现的",
      "写出产品能用的周清单",
    ],
    targetUsers: ["产品经理", "支持团队", "创始人"],
  },
  "customer-sentiment-monitor": {
    title: "顾客情绪监控",
    shortDescription: "每周读一次：顾客听起来是更好还是更差。",
    description:
      "Grok Bot 会读一周的意见与提及，告诉你情绪走向，以及背后那一两件事。",
    steps: [
      "读一周的意见与提及",
      "判断整体情绪",
      "找出驱动变化的那一两件事",
      "分开大声少数与广泛模式",
      "写出短周报",
    ],
    targetUsers: ["客户成功", "产品经理", "创始人"],
  },
  "candidate-researcher": {
    title: "候选人研究",
    shortDescription: "在面谈之前，用公开来源做好公平的简报。",
    description:
      "贴上候选人姓名与职位。Grok Bot 会整理公开资料，写出公平简报，并标出不该臆测的地方。",
    steps: [
      "读公开资料与你提供的简历",
      "整理与职位相关的经验",
      "标出值得在面谈问的问题",
      "避免私人臆测",
      "写出一页公平简报",
    ],
    targetUsers: ["招聘人员", "用人经理", "创始人"],
  },
  "resume-screener": {
    title: "简历筛选",
    shortDescription: "按职位为一叠简历打分，并写出你讲得清的理由。",
    description:
      "把简历与必备条件交给 Grok Bot。它会打分、引用依据，并把边缘个案标出来给你决定。",
    steps: [
      "读职位必备条件",
      "逐份对照简历",
      "按必须条件打分",
      "引用它依据的那一行",
      "把边缘个案交给你决定",
    ],
    targetUsers: ["招聘人员", "用人经理", "创始人"],
  },
  "interview-prep-bot": {
    title: "面试准备 Bot",
    shortDescription: "做出能测工作本身、而不是测感觉的面试计划。",
    description:
      "告诉 Grok Bot 这个职位。它会写出问题、该听什么，以及怎样公平比较候选人。",
    steps: [
      "读职位与必须条件",
      "写出测试真实工作的问题",
      "记下每个问题该听什么",
      "加入公平比较的方式",
      "交出面试计划",
    ],
    targetUsers: ["用人经理", "招聘人员", "创始人"],
  },
  "new-employee-onboarding": {
    title: "新员工入职",
    shortDescription: "把凌乱的第一周，变成新同事跟得住的日程。",
    description:
      "告诉 Grok Bot 这个职位与团队。它会写出第一周每天该做什么、该见谁、怎样才算上手。",
    steps: [
      "读职位与团队现况",
      "排出第一周每天计划",
      "写出该见的人与该读的资料",
      "定义第一周完成的样子",
      "留下主管检查的节点",
    ],
    targetUsers: ["用人经理", "人事", "创始人"],
  },
  "github-issue-researcher": {
    title: "GitHub Issue 研究员",
    shortDescription: "读一堆 GitHub issues，告诉你现在真正着火的是什么。",
    description:
      "把 issues 交给 Grok Bot。它会归类、标重复，并写出下一次站会能用的分流简报。",
    steps: [
      "读你贴上或描述的未解 issues",
      "按底下 bug 归类",
      "标出可能重复的",
      "点出用户每天都感觉到的",
      "写出下一次站会用的分流简报",
    ],
    targetUsers: ["工程负责人", "创始人", "面对支持的开发者"],
  },
  "bug-reproduction-assistant": {
    title: "Bug 复现助手",
    shortDescription: "把含糊的 bug 报告，变成别人跟得住的步骤。",
    description:
      "贴上报告。Grok Bot 会写出清楚复现步骤、该截取什么，以及还要问报告者的问题。",
    steps: [
      "读 bug 报告",
      "写出可复现的编号步骤",
      "列出仍然缺少的信息",
      "建议一个问报告者的问题",
      "指出最该先看的地方，但不猜修法",
    ],
    targetUsers: ["开发者", "QA", "支持工程师"],
  },
  "pr-reviewer": {
    title: "PR 审查",
    shortDescription: "像细心的同事一样读 pull request，留下有用的意见。",
    description:
      "贴上 diff 或 PR 说明。Grok Bot 会列出风险、缺少的测试与问题——不是一堆标点挑剔。",
    steps: [
      "读 PR 说明与 diff",
      "重述这次改动是为了什么",
      "列出真正的风险",
      "用问题代替臆测意图",
      "建议实际缺少的测试",
    ],
    targetUsers: ["开发者", "技术负责人"],
  },
  "website-qa-bot": {
    title: "网站 QA Bot",
    shortDescription: "像新用户一样点过网站，记下坏掉或令人困惑的地方。",
    description:
      "给 Grok Bot 一个网址与要完成的任务。它会走流程，回报坏掉的部分、含糊文案与缺少的状态。",
    steps: [
      "打开你指定的页面",
      "像新用户一样试着完成任务",
      "记下坏掉的链接、失效按钮与含糊文案",
      "检查空白与错误状态是否存在",
      "写出可立案的 QA 笔记",
    ],
    targetUsers: ["开发者", "设计师", "创始人"],
  },
  "error-monitor": {
    title: "错误监控",
    shortDescription: "读错误日志，告诉你今天哪些是用户真正感觉到的。",
    description:
      "贴上日志或 Sentry 式清单。Grok Bot 会归类错误、估计用户影响，并写出给团队的早晨短信。",
    steps: [
      "读你贴上的错误",
      "把重复的归在一起",
      "标出用户会感觉到的",
      "如果你贴了昨天的数据，就做比较",
      "写出短早晨短信",
    ],
    targetUsers: ["开发者", "on-call", "工程负责人"],
  },
  "expense-report-organizer": {
    title: "报销整理",
    shortDescription: "把一堆收据变成可提交的清楚报销清单。",
    description:
      "贴上收据或卡账单。Grok Bot 会归类、标出缺漏，写出财务会接受的清单。",
    steps: [
      "读你贴上的收据或卡账单",
      "按旅程或类别归类",
      "标出缺少商户、日期或金额的",
      "标出要抽走的私人消费",
      "写出可提交的清单",
    ],
    targetUsers: ["办公室工作者", "创始人", "主管"],
  },
  "invoice-follow-up": {
    title: "发票跟进",
    shortDescription: "为未付发票写一封礼貌而具体的短信。",
    description:
      "把发票与关系告诉 Grok Bot。它会草拟第一封，以及仍然像人的较硬第二封。",
    steps: [
      "读发票细节",
      "用事实写第一封跟进",
      "再写较硬的第二封",
      "建议各自何时寄出",
      "保持关系不受损",
    ],
    targetUsers: ["创始人", "自由职业者", "财务协调"],
  },
  "weekly-cash-snapshot": {
    title: "每周现金快照",
    shortDescription: "把账户数字变成一屏的本周现金画面。",
    description:
      "贴上结余与即将到期的账单。Grok Bot 会写出进账、出账，以及下周会不会紧。",
    steps: [
      "读你贴上的结余与即将到期账单",
      "列出进账与出账",
      "标出会让下周变紧的项目",
      "写出可放到 Slack 的快照",
      "如果有决策，就点出那一个",
    ],
    targetUsers: ["创始人", "运营负责人", "小型财务团队"],
  },
  "personal-weekly-review": {
    title: "个人周检",
    shortDescription: "用短回顾结束一周，并订出下周务实计划。",
    description:
      "贴上发生了什么。Grok Bot 会写出真正重要的、该放下的，以及下周三结果。",
    steps: [
      "读你的笔记、日历与剩下的事",
      "点出真正推进了的",
      "列出该放下的",
      "写出下周三结果",
      "建议一次休息或重置",
    ],
    targetUsers: ["办公室工作者", "创始人", "主管"],
  },
  "focus-block-planner": {
    title: "专注时段规划",
    shortDescription: "为需要关上门的工作，保住两个小时。",
    description:
      "告诉 Grok Bot 深工作是什么、这一周长什么样子。它会找出最不坏的时段，并写出你需要寄出的拒绝。",
    steps: [
      "读这一周与你点名的深工作",
      "找出仍然空着的两小时时段",
      "如有需要，建议拒绝什么来腾出一格",
      "写出日历标题与勿扰说明",
      "加上结束规则，让这段时间真的会完",
    ],
    targetUsers: ["创作者", "主管", "创始人"],
  },
  "personal-research-digest": {
    title: "个人研究摘要",
    shortDescription: "把你打算读的标签页与论文，收成一则短摘要。",
    description:
      "贴上链接或笔记。Grok Bot 会写出该精读、该扫、该丢的清单——对准你在意的项目。",
    steps: [
      "读你贴上的链接或笔记",
      "把每一项对准你点名的项目",
      "标出精读／扫读／丢掉",
      "写出三项摘要",
      "留下一句值得保存的引文",
    ],
    targetUsers: ["研究员", "创始人", "运营者"],
  },
  "competitor-social-monitor": {
    title: "竞品社交监控",
    shortDescription: "看看竞品这周发了什么，以及有没有人在意。",
    description:
      "Grok Bot 会查看竞品在 LinkedIn、X 与 YouTube 的页面，报告他们发布了什么、什么真正落地，以及你可以忽略什么。",
    steps: [
      "查看你指定的竞品档案",
      "列出这周的帖子、视频与大型讨论",
      "记下真正有回复的",
      "忽略空洞的互动诱饵",
      "建议一件该学、而不是该抄的事",
    ],
    targetUsers: ["市场人员", "创始人", "社区团队"],
  },
  "reddit-thread-scout": {
    title: "Reddit 帖子侦察",
    shortDescription: "找出值得加入的新讨论，以及仍排在 Google 的旧帖。",
    description:
      "把网站和对手交给 Grok Bot。它会找你能帮上忙的新对话，以及仍出现在搜索里的旧帖，然后停在草稿留言，由你自己发。",
    steps: [
      "读你的网站、产品和对手名",
      "在 Reddit 找 72 小时内你能真正帮到的新帖",
      "找仍排在 Google 的旧讨论",
      "为每条帖打分：合不合适、新不新、会不会像垃圾广告",
      "每条保留帖写一句留言草稿。你自己发。",
    ],
    targetUsers: ["创始人", "市场人员", "独立开发者"],
  },
  "travel-concierge": {
    title: "旅行管家",
    shortDescription: "把行程念头变成日期、选项，和你仍要批准的日程。",
    description:
      "告诉 Grok Bot 城市、日期、预算和限制。它会比较公开机票和住宿，写一份好走的日程，预订之前会停住。",
    steps: [
      "读你的日期、预算和硬限制",
      "查公开机票和住宿选项",
      "写一份不用来回乱走的日程",
      "标出签证、天气或预订风险",
      "交一份短简报。你自己预订。",
    ],
    targetUsers: ["忙的上班族", "家庭", "创始人"],
  },
  "youtube-comment-desk": {
    title: "YouTube 评论台",
    shortDescription: "整理新评论，用你的语气起草回复。你再点发送。",
    description:
      "指向一条视频或频道。Grok Bot 会把评论分成问题、称赞、故障和垃圾，再写短回复给你贴——它不会代你公开。",
    steps: [
      "打开你指定的视频或频道评论",
      "分成：问题、称赞、故障、垃圾",
      "标出今天要人回的",
      "用你的语气写短回复",
      "停下。听起来像你的，再由你发。",
    ],
    targetUsers: ["创作者", "教育工作者", "产品市场"],
  },
  "x-viral-scout": {
    title: "X 爆文侦察",
    shortDescription: "在引用堆到之前，抓住你领域正在起飞的帖。",
    description:
      "Grok Bot 会看 X 上正在加速的帖——不是已经红完的那些——再告诉你该引用、回复，还是放过。",
    steps: [
      "扫你的领域、账号和关键词",
      "找回复和转发仍在升的帖",
      "解释为什么这条在动",
      "说引用、回复，或跳过",
      "如果你真有话要说，起草一句。你自己发。",
    ],
    targetUsers: ["创始人", "创作者", "市场人员"],
  },
  "monday-marketing-report": {
    title: "周一市场报告",
    shortDescription: "走一遍你每周一会开的仪表盘，留下一页简报。",
    description:
      "教 Grok Bot 你每周点的 GA4、广告和邮件标签。它会抄你点名的数字、写短简报，数字越线才叫你。",
    steps: [
      "打开你已经在用的仪表盘",
      "只抄你点名的指标",
      "和上周比较",
      "写一页简报",
      "数字越线才通知你",
    ],
    targetUsers: ["市场经理", "创始人", "代理公司负责人"],
  },
};

export function getUseCaseI18n(slug: string, locale: Locale): UseCaseI18n | null {
  if (locale === "en") return null;
  return (locale === "zh-Hant" ? hant : hans)[slug] ?? null;
}
