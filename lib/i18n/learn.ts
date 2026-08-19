import type { LearnArticle } from "@/data/learn";
import { getLearnArticle } from "@/data/learn";
import type { Locale } from "./types";

const learnCopy: Record<Exclude<Locale, "en">, Record<string, LearnArticle>> = {
  "zh-Hant": {
    "what-is-grok-bot": {
      slug: "what-is-grok-bot",
      title: "什麼是 Grok Bot？",
      description:
        "用白話解釋 Grok Bot：一個可以一直開工的隊友，會用你的工具、跟住一套流程，把做完的工作交回給你。",
      kicker: "基礎",
      blocks: [
        {
          type: "p",
          text: "Grok Bot 是你可以交真實工作給它的 AI 隊友。不像只有你坐在螢幕前才會回答的對話框，Bot 可以用應用、跟住日常流程，即使你合上筆電它都可以繼續做。",
        },
        {
          type: "p",
          text: "別把它當成「更聰明的搜尋欄」，而是「團隊裡有人每天早上幫你查一個網站、草擬跟進，再把結果放到你已經在用的地方」。",
        },
        { type: "h2", text: "它擅長什麼" },
        {
          type: "ul",
          items: [
            "重複一件你可以用白話描述的工作",
            "閱讀公開頁面、收件箱或名單，整理成短簡報",
            "草擬你仍會親自過目的電郵、報告與摘要",
            "長時間監察一件事——對手、提及、錯誤、排隊中的工作",
          ],
        },
        { type: "h2", text: "它不是什麼" },
        {
          type: "p",
          text: "它不是魔法，也不能代替判斷。Bot 會跟你給的指示走。指示含糊，結果也會含糊。需要人決定的事——改價、法律判斷、向客人道歉——Bot 應該把事實交給你，而不是替你按下去。",
        },
        {
          type: "p",
          text: "UseGrokBot 是獨立指南，與 xAI 並無關係。我們收集人們真正想交給 Bot 的工作，再用非技術人員都能貼上使用的語言寫好指示。",
        },
      ],
    },
    "how-to-use-grok-bot": {
      slug: "how-to-use-grok-bot",
      title: "怎樣使用 Grok Bot",
      description:
        "一條簡單路徑：選一件工作、複製提示詞、告訴 Bot 哪些是你的，先看第一次結果，再放到日程上。",
      kicker: "開始",
      blocks: [
        {
          type: "p",
          text: "你不用先「學會 AI」。你只需要一件煩人、重複、又容易說清楚的工作。這樣就夠。",
        },
        { type: "h2", text: "可運作的路徑" },
        {
          type: "ol",
          items: [
            "在這個網站選一件你已經在人手做的工作。",
            "複製現成的提示詞。",
            "填上空白：你的公司、要監察的網站、結果要送到哪裡。",
            "先看著它跑一次。",
            "任何聽起來不像你的地方都改掉。",
            "然後才放到每日或每週日程。",
          ],
        },
        { type: "h2", text: "給 Bot 一個工作範圍" },
        {
          type: "ul",
          items: [
            "告訴它「完成」長什麼樣子。「一則 12 行的 Slack 訊息」比「讓我知最新情況」好。",
            "告訴它要忽略什麼。你不說，Bot 就會收太多。",
            "告訴它何時停下來問你。批准權在你。",
            "一隻 Bot 做一件工作。「甚麼都做」的 Bot 會亂。",
          ],
        },
        { type: "h2", text: "第一週要覆核" },
        {
          type: "p",
          text: "頭幾次是用來教它。如果對手簡報把改版當成「新聞」，就叫它忽略設計。如果跟進電郵像範本，貼一句你真正寄過的句子，說「再這樣一點」。這個網站的提示詞是起點，不是籠子。",
        },
      ],
    },
    "how-to-create-a-grok-bot": {
      slug: "how-to-create-a-grok-bot",
      title: "怎樣建立一隻 Grok Bot",
      description:
        "為真實工作建立 Bot：幫它取名、只給一件任務、貼上提示詞，再決定多久跑一次。",
      kicker: "設定",
      blocks: [
        {
          type: "p",
          text: "建立 Bot 比較像向新隊友簡報，而不是寫軟件。你說清楚工作、給一個例子，再告訴它何時回來。",
        },
        { type: "h2", text: "按建立之前" },
        {
          type: "ul",
          items: [
            "用同事聽得懂的一句話寫出這份工作。",
            "決定結果要落到哪裡——Slack、電郵、文件，還是你會覆核的名單。",
            "從這個網站拿一段提示詞，或用同一結構自己寫：角色、步驟、格式、要忽略什麼。",
          ],
        },
        { type: "h2", text: "設定時" },
        {
          type: "ol",
          items: [
            "用工作本身取名，不要用性格。「對手監察」比「Buddy」好。",
            "貼上提示詞。用你的公司、網址和語氣填上括號。",
            "只連接這份工作需要的工具。",
            "先跑一次。把輸出讀出來。你不會寄出去的，就改提示詞。",
            "最後才設日程——每日、每週，或只在你要求時。",
          ],
        },
        { type: "h2", text: "有效的提示詞有四部分" },
        {
          type: "ol",
          items: [
            "用一行說明 Bot 是誰。",
            "按人會做的順序寫步驟。",
            "你要回來的確切格式。",
            "要忽略什麼，以及何時說「我不知道」。",
          ],
        },
        {
          type: "p",
          text: "卡住的話，從這個網站的使用案例開始，只改屬於你的部分。這比空白頁快。",
        },
      ],
    },
    "grok-bot-examples": {
      slug: "grok-bot-examples",
      title: "Grok Bot 例子",
      description:
        "具體例子：銷售早晨、對手檢查、收件箱整理、招聘篩選，以及每週現金快照。",
      kicker: "看看",
      blocks: [
        {
          type: "p",
          text: "空談「代理人」沒有幫助。這些是人們已經在做的工作，寫成你可以想像星期二早上那一版。",
        },
        { type: "h2", text: "銷售" },
        {
          type: "p",
          text: "每日銷售簡報 Bot 會看日曆和未跟進的事項，在 8:30 前交出三件行動。潛在客戶研究 Bot 會把像上季成交的公司填進表格——還附上一句你真的說得出口的開場。",
        },
        { type: "h2", text: "市場" },
        {
          type: "p",
          text: "對手監察 Bot 每天早上看四個定價頁，數字有變才寫。評論分析 Bot 讀一週的 G2 留言，把顧客已經在用的句子交給你。",
        },
        { type: "h2", text: "辦公室" },
        {
          type: "p",
          text: "收件箱整理 Bot 把 60 封未讀變成五封回覆。會議跟進 Bot 把筆記變成負責人，並且拒絕虛構沒有人說過的截止日期。",
        },
        { type: "h2", text: "招聘與帳目" },
        {
          type: "p",
          text: "履歷篩選 Bot 按必備條件為一疊履歷評分，並引用它依據的那一行。每週現金快照 Bot 用六行告訴你下星期五會不會緊。",
        },
        {
          type: "p",
          text: "瀏覽資料庫、複製提示詞，這個星期先跑一件工作。就是這個意思。",
        },
      ],
    },
  },
  "zh-Hans": {
    "what-is-grok-bot": {
      slug: "what-is-grok-bot",
      title: "什么是 Grok Bot？",
      description:
        "用白话解释 Grok Bot：一个可以一直开工的队友，会用你的工具、跟着一套流程，把做完的工作交回给你。",
      kicker: "基础",
      blocks: [
        {
          type: "p",
          text: "Grok Bot 是你可以交真实工作给它的 AI 队友。不像只有你坐在屏幕前才会回答的对话框，Bot 可以用应用、跟着日常流程，即使你合上电脑它也可以继续做。",
        },
        {
          type: "p",
          text: "别把它当成「更聪明的搜索栏」，而是「团队里有人每天早上帮你查一个网站、起草跟进，再把结果放到你已经在用的地方」。",
        },
        { type: "h2", text: "它擅长什么" },
        {
          type: "ul",
          items: [
            "重复一件你可以用白话描述的工作",
            "阅读公开页面、收件箱或名单，整理成短简报",
            "起草你仍会亲自过目的邮件、报告与摘要",
            "长时间监察一件事——竞品、提及、错误、排队中的工作",
          ],
        },
        { type: "h2", text: "它不是什么" },
        {
          type: "p",
          text: "它不是魔法，也不能代替判断。Bot 会跟你给的指示走。指示含糊，结果也会含糊。需要人决定的事——改价、法律判断、向客人道歉——Bot 应该把事实交给你，而不是替你按下去。",
        },
        {
          type: "p",
          text: "UseGrokBot 是独立指南，与 xAI 并无关联。我们收集人们真正想交给 Bot 的工作，再用非技术人员都能粘贴使用的语言写好指示。",
        },
      ],
    },
    "how-to-use-grok-bot": {
      slug: "how-to-use-grok-bot",
      title: "怎样使用 Grok Bot",
      description:
        "一条简单路径：选一件工作、复制提示词、告诉 Bot 哪些是你的，先看第一次结果，再放到日程上。",
      kicker: "开始",
      blocks: [
        {
          type: "p",
          text: "你不用先「学会 AI」。你只需要一件烦人、重复、又容易说清楚的工作。这样就够。",
        },
        { type: "h2", text: "可运作的路径" },
        {
          type: "ol",
          items: [
            "在这个网站选一件你已经在人手做的工作。",
            "复制现成的提示词。",
            "填上空白：你的公司、要监控的网站、结果要送到哪里。",
            "先看着它跑一次。",
            "任何听起来不像你的地方都改掉。",
            "然后才放到每日或每周日程。",
          ],
        },
        { type: "h2", text: "给 Bot 一个工作范围" },
        {
          type: "ul",
          items: [
            "告诉它「完成」长什么样子。「一则 12 行的 Slack 消息」比「让我知道最新情况」好。",
            "告诉它要忽略什么。你不说，Bot 就会收太多。",
            "告诉它何时停下来问你。批准权在你。",
            "一只 Bot 做一件工作。「什么都做」的 Bot 会乱。",
          ],
        },
        { type: "h2", text: "第一周要复核" },
        {
          type: "p",
          text: "头几次是用来教它。如果竞品简报把改版当成「新闻」，就叫它忽略设计。如果跟进邮件像模板，贴一句你真正寄过的句子，说「再这样一点」。这个网站的提示词是起点，不是笼子。",
        },
      ],
    },
    "how-to-create-a-grok-bot": {
      slug: "how-to-create-a-grok-bot",
      title: "怎样创建一只 Grok Bot",
      description:
        "为真实工作创建 Bot：帮它取名、只给一件任务、贴上提示词，再决定多久跑一次。",
      kicker: "设置",
      blocks: [
        {
          type: "p",
          text: "创建 Bot 比较像向新队友做简报，而不是写软件。你说清楚工作、给一个例子，再告诉它何时回来。",
        },
        { type: "h2", text: "点创建之前" },
        {
          type: "ul",
          items: [
            "用同事听得懂的一句话写出这份工作。",
            "决定结果要落到哪里——Slack、邮件、文档，还是你会复核的名单。",
            "从这个网站拿一段提示词，或用同一结构自己写：角色、步骤、格式、要忽略什么。",
          ],
        },
        { type: "h2", text: "设置时" },
        {
          type: "ol",
          items: [
            "用工作本身取名，不要用性格。「竞品监控」比「Buddy」好。",
            "贴上提示词。用你的公司、网址和语气填上括号。",
            "只连接这份工作需要的工具。",
            "先跑一次。把输出读出来。你不会寄出去的，就改提示词。",
            "最后才设日程——每日、每周，或只在你要求时。",
          ],
        },
        { type: "h2", text: "有效的提示词有四部分" },
        {
          type: "ol",
          items: [
            "用一行说明 Bot 是谁。",
            "按人会做的顺序写步骤。",
            "你要回来的确切格式。",
            "要忽略什么，以及何时说「我不知道」。",
          ],
        },
        {
          type: "p",
          text: "卡住的话，从这个网站的使用场景开始，只改属于你的部分。这比空白页快。",
        },
      ],
    },
    "grok-bot-examples": {
      slug: "grok-bot-examples",
      title: "Grok Bot 例子",
      description:
        "具体例子：销售早晨、竞品检查、收件箱整理、招聘筛选，以及每周现金快照。",
      kicker: "看看",
      blocks: [
        {
          type: "p",
          text: "空谈「代理人」没有帮助。这些是人们已经在做的工作，写成你可以想象星期二早上的那一版。",
        },
        { type: "h2", text: "销售" },
        {
          type: "p",
          text: "每日销售简报 Bot 会看日历和未跟进的事项，在 8:30 前交出三件行动。潜在客户研究 Bot 会把像上季成交的公司填进表格——还附上一句你真的说得出口的开场。",
        },
        { type: "h2", text: "市场" },
        {
          type: "p",
          text: "竞品监控 Bot 每天早上看四个定价页，数字有变才写。评论分析 Bot 读一周的 G2 留言，把顾客已经在用的句子交给你。",
        },
        { type: "h2", text: "办公室" },
        {
          type: "p",
          text: "收件箱整理 Bot 把 60 封未读变成五封回复。会议跟进 Bot 把笔记变成负责人，并且拒绝虚构没有人说过的截止日期。",
        },
        { type: "h2", text: "招聘与账目" },
        {
          type: "p",
          text: "简历筛选 Bot 按必备条件为一叠简历评分，并引用它依据的那一行。每周现金快照 Bot 用六行告诉你下星期五会不会紧。",
        },
        {
          type: "p",
          text: "浏览资料库、复制提示词，这个星期先跑一件工作。就是这个意思。",
        },
      ],
    },
  },
};

export function localizeLearnArticle(article: LearnArticle, locale: Locale): LearnArticle {
  if (locale === "en") return article;
  return learnCopy[locale][article.slug] ?? article;
}

export function learnArticleFor(slug: string, locale: Locale) {
  const article = getLearnArticle(slug);
  if (!article) return undefined;
  return localizeLearnArticle(article, locale);
}
