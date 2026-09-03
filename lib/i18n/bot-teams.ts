import type { BotTeam, BotTeamRoleId } from "@/data/bot-teams";
import type { Locale } from "./types";

export type LocalizedBotTeamRole = {
  id: BotTeamRoleId;
  name: string;
  action: string;
  handoff: string;
};

export type LocalizedBotTeam = BotTeam & {
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
  count: string;
  oneBotTitle: string;
  oneBotBody: string;
  teamTitle: string;
  teamBody: string;
  chooseTitle: string;
  chooseBody: string;
  bots: (count: number) => string;
  evidence: (count: number) => string;
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

type TeamCopy = Omit<LocalizedBotTeam, keyof BotTeam> & {
  roles: readonly LocalizedBotTeamRole[];
};

const enRoles = {
  executive: [
    {
      id: "coordinator",
      name: "Chief of Staff",
      action: "Turns your priorities into a shared queue and assigns each update to one owner.",
      handoff: "Sends messages to the Inbox Bot and meetings to the Calendar Bot.",
    },
    {
      id: "inbox",
      name: "Inbox Bot",
      action: "Sorts new messages, drafts replies, and flags anything that needs your judgment.",
      handoff: "Adds urgent threads and reply drafts to the daily brief.",
    },
    {
      id: "calendar",
      name: "Calendar Bot",
      action: "Finds conflicts and prepares the people, history, and agenda for each meeting.",
      handoff: "Adds meeting packs and schedule changes to the daily brief.",
    },
    {
      id: "briefing",
      name: "Briefing Bot",
      action: "Combines the team's updates into one short, sourced readout.",
      handoff: "Returns one brief with only the decisions that need you.",
    },
  ],
  content: [
    {
      id: "coordinator",
      name: "Content Lead",
      action: "Chooses the goal, keeps the voice consistent, and moves each piece through the team.",
      handoff: "Gives a clear topic and success measure to the Research Bot.",
    },
    {
      id: "researcher",
      name: "Research Bot",
      action: "Finds the angle, source material, and claims worth using.",
      handoff: "Hands a sourced outline to the Writer Bot.",
    },
    {
      id: "writer",
      name: "Writer Bot",
      action: "Turns the outline into a finished draft in your voice.",
      handoff: "Hands approved copy and visual notes to the Visual Bot.",
    },
    {
      id: "visual",
      name: "Visual Bot",
      action: "Builds the image or video package around the approved copy.",
      handoff: "Sends a review-ready content pack to the Publisher Bot.",
    },
    {
      id: "publisher",
      name: "Publisher Bot",
      action: "Checks the schedule and prepares the final post without sending it early.",
      handoff: "Asks you for the final yes before anything is published.",
    },
  ],
  sales: [
    {
      id: "coordinator",
      name: "Sales Lead",
      action: "Sets the ideal customer, offer, exclusions, and approval rules.",
      handoff: "Gives the account list and research rules to the Account Research Bot.",
    },
    {
      id: "account-research",
      name: "Account Research Bot",
      action: "Finds the right companies, people, and a real reason to contact them.",
      handoff: "Hands qualified accounts and source links to the Outreach Bot.",
    },
    {
      id: "outreach",
      name: "Outreach Bot",
      action: "Drafts a short, relevant first message for each qualified person.",
      handoff: "Sends drafts to the CRM Bot as a review queue, not a live campaign.",
    },
    {
      id: "crm",
      name: "CRM Bot",
      action: "Removes duplicates, records replies, and keeps the next step visible.",
      handoff: "Returns one approval list before any message is sent.",
    },
  ],
  product: [
    {
      id: "product-manager",
      name: "Product Manager Bot",
      action: "Turns a customer problem into a small spec with a clear result.",
      handoff: "Gives the spec and acceptance checks to the Engineering Manager Bot.",
    },
    {
      id: "engineering-manager",
      name: "Engineering Manager Bot",
      action: "Splits the spec into owned parts and keeps dependencies in order.",
      handoff: "Assigns each part to the right Builder Bot.",
    },
    {
      id: "builders",
      name: "Builder Bots",
      action: "Build, test, and return small changes with screenshots and notes.",
      handoff: "Hand the completed change and test evidence to the Reviewer Bot.",
    },
    {
      id: "reviewer",
      name: "Reviewer Bot",
      action: "Checks the result against the spec and looks for risk or missing tests.",
      handoff: "Returns one review pack and waits for you before merge or release.",
    },
  ],
  research: [
    {
      id: "coordinator",
      name: "Research Chief",
      action: "Defines the question, date range, source rules, and final format.",
      handoff: "Splits the question into focused searches for the Scout Bots.",
    },
    {
      id: "scouts",
      name: "Scout Bots",
      action: "Search different sources in parallel and save every useful link.",
      handoff: "Give the evidence table to the Analyst Bot.",
    },
    {
      id: "analyst",
      name: "Source Auditor",
      action: "Checks claims, dates, definitions, and numbers that do not agree.",
      handoff: "Passes only supported findings to the Archivist Bot.",
    },
    {
      id: "archivist",
      name: "Research Archivist",
      action: "Turns the checked evidence into a short brief you can find again.",
      handoff: "Returns the brief with sources, gaps, and the next decision.",
    },
  ],
  operations: [
    {
      id: "general-manager",
      name: "General Manager Bot",
      action: "Routes recurring company admin to one clear owner and watches exceptions.",
      handoff: "Sends money questions to Finance and routine follow-ups to Operations.",
    },
    {
      id: "finance",
      name: "Finance Bot",
      action: "Matches invoices and receipts, then flags missing details or policy issues.",
      handoff: "Adds exceptions and draft follow-ups to the shared operations queue.",
    },
    {
      id: "operations",
      name: "Operations Bot",
      action: "Keeps renewals, forms, schedules, and supplier follow-ups moving.",
      handoff: "Passes customer-facing questions to Support and escalations to the manager.",
    },
    {
      id: "support",
      name: "Support Bot",
      action: "Drafts routine replies and separates refunds, legal issues, and angry threads.",
      handoff: "Returns one exception list for human approval.",
    },
  ],
  personal: [
    {
      id: "life-door",
      name: "Life Coordinator",
      action: "Acts as one front door for family plans, errands, and things to remember.",
      handoff: "Routes each request to Calendar, Shopping, or Travel.",
    },
    {
      id: "family-calendar",
      name: "Family Calendar Bot",
      action: "Finds clashes, prepares reminders, and protects family time.",
      handoff: "Adds approved plans and missing details to the family brief.",
    },
    {
      id: "shopping",
      name: "Shopping Bot",
      action: "Compares prices, checks stock, and prepares a cart without buying.",
      handoff: "Returns options with price, source, and what needs approval.",
    },
    {
      id: "travel",
      name: "Travel Bot",
      action: "Compares routes and stays against the family's real rules.",
      handoff: "Returns a shortlist and waits before booking or paying.",
    },
  ],
} satisfies Record<string, readonly LocalizedBotTeamRole[]>;

const copy: Record<Locale, Record<string, TeamCopy>> = {
  en: {
    "executive-team": {
      title: "Executive Team",
      summary: "Turn your inbox, calendar, and open decisions into one calm daily brief.",
      outcome: "A daily plan with priorities, prepared replies, meeting notes, and only the decisions that need you.",
      audience: "Founders and leaders whose day is spread across inboxes, meetings, and team updates.",
      setupPrompt:
        "Build an Executive Team with four clear roles: Chief of Staff, Inbox, Calendar, and Briefing. I will speak to the Chief of Staff. Route new messages to Inbox, meetings to Calendar, and combine their checked updates in one daily brief. Show sources and mark every item that needs my decision. Do not send messages, change meetings, delete anything, or spend money until I approve.",
      roles: enRoles.executive,
    },
    "content-team": {
      title: "Content Team",
      summary: "Move from a sourced idea to a review-ready post without copying between chats.",
      outcome: "A complete content pack with sources, finished copy, visuals, timing, and one final approval gate.",
      audience: "Creators and small teams that need a repeatable publishing rhythm without losing their voice.",
      setupPrompt:
        "Build a Content Team with a Content Lead, Researcher, Writer, Visual, and Publisher. The Content Lead owns the outcome and passes each approved handoff forward. Research must keep source links. Writing must follow my examples. The Publisher may prepare the queue but must ask me before anything goes live. Return the finished copy, visual pack, source list, and planned time together.",
      roles: enRoles.content,
    },
    "sales-team": {
      title: "Sales Team",
      summary: "Research the right accounts, draft relevant outreach, and keep every next step visible.",
      outcome: "A clean review queue of qualified accounts, source-backed contact reasons, draft messages, and CRM next steps.",
      audience: "Founders and small sales teams that need better preparation before sending more messages.",
      setupPrompt:
        "Build a Sales Team with a Sales Lead, Account Researcher, Outreach, and CRM Bot. Start from my ideal customer and exclusion list. Keep a source for every reason to contact someone. Draft one short message per qualified person, remove duplicates, and return everything as a review queue. Do not send, enroll, change CRM records, or book a meeting until I approve.",
      roles: enRoles.sales,
    },
    "product-engineering-team": {
      title: "Product & Engineering Team",
      summary: "Turn a clear product problem into a tested change and one review pack.",
      outcome: "A small implementation with test evidence, screenshots, review notes, and one decision before merge or release.",
      audience: "Product teams and technical founders who want parallel progress without losing review control.",
      setupPrompt:
        "Build a Product and Engineering Team with a Product Manager, Engineering Manager, Builder Bots, and an independent Reviewer. The Product Manager writes a small spec and acceptance checks. The Engineering Manager assigns owned parts. Builders return small changes with tests and screenshots. The Reviewer checks work it did not write. Do not merge, deploy, message users, delete data, or spend money until I approve the final review pack.",
      roles: enRoles.product,
    },
    "research-team": {
      title: "Research Team",
      summary: "Search in parallel, challenge the claims, and return one brief with sources.",
      outcome: "A concise research brief that separates facts from judgment, shows conflicting numbers, and keeps every source.",
      audience: "People making decisions from many sources who need an audit step before the summary.",
      setupPrompt:
        "Build a Research Team with a Research Chief, focused Scouts, a Source Auditor, and an Archivist. Define the question and date range first. Scouts must save links and quote only what the source supports. The Auditor checks definitions, dates, and conflicting numbers before the Archivist writes. Return one short brief with sources, disagreements, unknowns, and the next decision. Do not invent a fact or hide uncertainty.",
      roles: enRoles.research,
    },
    "business-operations-team": {
      title: "Business Operations Team",
      summary: "Keep finance, admin, suppliers, and support moving through one exception queue.",
      outcome: "A weekly operations pack with matched records, drafted follow-ups, open exceptions, and actions waiting for approval.",
      audience: "Small companies where one person still carries finance, admin, and customer follow-up.",
      setupPrompt:
        "Build a Business Operations Team with a General Manager, Finance, Operations, and Support Bot. Give each role one lane and use a shared exception queue. Finance checks invoices and receipts. Operations tracks renewals and follow-ups. Support drafts routine replies and flags refunds or legal issues. The General Manager returns one weekly pack. Do not pay, refund, send, delete, or change a live system until I approve.",
      roles: enRoles.operations,
    },
    "personal-family-team": {
      title: "Personal & Family Team",
      summary: "Coordinate the calendar, errands, shopping, and travel through one trusted helper.",
      outcome: "One family brief with schedule clashes, prepared options, reminders, and nothing booked or bought without approval.",
      audience: "Busy households that want one place for plans while keeping private actions under human control.",
      setupPrompt:
        "Build a Personal and Family Team with a Life Coordinator, Family Calendar, Shopping, and Travel Bot. I will speak to the Life Coordinator. Route each request to one specialist and return a short family brief with sources, prices, dates, and anything missing. Use only the accounts and files I approve. Do not message anyone, book, buy, pay, or change a calendar until I approve.",
      roles: enRoles.personal,
    },
  },
  "zh-Hant": {
    "executive-team": {
      title: "管理者團隊",
      summary: "把收件匣、行事曆和待決定事項整理成一份清楚的每日簡報。",
      outcome: "每天收到一份計畫，包含優先事項、回覆草稿、會議準備，以及真正需要你決定的項目。",
      audience: "適合每天要處理大量訊息、會議和團隊更新的創辦人與管理者。",
      setupPrompt:
        "建立一組管理者 Bot 團隊，分成幕僚長、收件匣、行事曆和簡報四個角色。我只與幕僚長對話。新訊息交給收件匣 Bot，會議交給行事曆 Bot，再由簡報 Bot 合成每日摘要。每項內容都要保留來源，並標明哪些事項需要我決定。未經我批准，不得寄出訊息、變更會議、刪除資料或付款。",
      roles: [
        { id: "coordinator", name: "幕僚長 Bot", action: "把優先事項整理成共用清單，並為每項內容指定一位負責角色。", handoff: "訊息交給收件匣 Bot，會議交給行事曆 Bot。" },
        { id: "inbox", name: "收件匣 Bot", action: "整理新訊息、起草回覆，並標出需要你判斷的內容。", handoff: "把緊急討論和回覆草稿加入每日簡報。" },
        { id: "calendar", name: "行事曆 Bot", action: "找出時間衝突，並準備每場會議的人物、背景和議程。", handoff: "把會議準備和時間變更加入每日簡報。" },
        { id: "briefing", name: "簡報 Bot", action: "把團隊更新合成一份有來源的短摘要。", handoff: "只把真正需要你決定的事項交給你。" },
      ],
    },
    "content-team": {
      title: "內容團隊",
      summary: "由有來源的題目開始，一路交接成可以審核的完整內容。",
      outcome: "一個完整內容包，包含來源、成稿、視覺、發佈時間，以及最後一次人工批准。",
      audience: "適合需要穩定發佈內容，同時希望保留自己語氣的創作者與小團隊。",
      setupPrompt:
        "建立一組內容 Bot 團隊，分成內容主管、研究、寫作、視覺和發佈五個角色。內容主管負責最終結果，並把每個已確認的部分交給下一位。研究必須保留來源，寫作必須參考我的範例。發佈 Bot 可以準備排程，但上線前一定要問我。最後一起交回成稿、視覺檔、來源清單和建議時間。",
      roles: [
        { id: "coordinator", name: "內容主管 Bot", action: "決定目標、保持語氣一致，並推進每一份內容。", handoff: "把清楚的題目和成功標準交給研究 Bot。" },
        { id: "researcher", name: "研究 Bot", action: "找出值得使用的角度、資料和論點。", handoff: "把有來源的大綱交給寫作 Bot。" },
        { id: "writer", name: "寫作 Bot", action: "依照你的語氣，把大綱寫成完整草稿。", handoff: "把已確認的文案和視覺說明交給視覺 Bot。" },
        { id: "visual", name: "視覺 Bot", action: "根據已確認的文案製作圖片或影片。", handoff: "把可審核的內容包交給發佈 Bot。" },
        { id: "publisher", name: "發佈 Bot", action: "檢查時間並準備最後版本，不會提早送出。", handoff: "任何內容上線前，都要先取得你的批准。" },
      ],
    },
    "sales-team": {
      title: "銷售團隊",
      summary: "研究合適的客戶、起草有關聯的訊息，並清楚記錄下一步。",
      outcome: "一份可審核清單，包含合適客戶、聯絡原因與來源、訊息草稿和 CRM 下一步。",
      audience: "適合希望先提高準備品質，再增加聯絡數量的創辦人與小型銷售團隊。",
      setupPrompt:
        "建立一組銷售 Bot 團隊，分成銷售主管、客戶研究、外展和 CRM 四個角色。先依我的理想客戶和排除清單篩選。每個聯絡原因都要保留來源。為每位合適的人起草一則簡短訊息，移除重複資料，再整理成待審清單。未經我批准，不得寄出、加入推廣序列、修改 CRM 或預約會議。",
      roles: [
        { id: "coordinator", name: "銷售主管 Bot", action: "設定理想客戶、方案、排除條件和批准規則。", handoff: "把客戶名單和研究規則交給客戶研究 Bot。" },
        { id: "account-research", name: "客戶研究 Bot", action: "找出合適公司、聯絡人，以及真正值得聯絡的原因。", handoff: "把合格客戶和來源連結交給外展 Bot。" },
        { id: "outreach", name: "外展 Bot", action: "為每位合適的人起草簡短而相關的第一則訊息。", handoff: "把草稿交給 CRM Bot，建立待審清單。" },
        { id: "crm", name: "CRM Bot", action: "移除重複資料、記錄回覆，並清楚保留下一步。", handoff: "寄出任何訊息前，先交回一份批准清單。" },
      ],
    },
    "product-engineering-team": {
      title: "產品與工程團隊",
      summary: "把清楚的產品問題變成已測試的修改和一份審核包。",
      outcome: "一個小型實作，附測試結果、截圖、審核說明，以及合併或發佈前的一次決定。",
      audience: "適合希望同時推進多個部分，又不想失去審核控制的產品團隊與技術創辦人。",
      setupPrompt:
        "建立一組產品與工程 Bot 團隊，分成產品經理、工程經理、開發和獨立審核四個角色。產品經理先寫小型規格和驗收條件。工程經理分配每個部分。開發 Bot 要交回小型修改、測試和截圖。審核 Bot 檢查不是自己寫的內容。未經我批准，不得合併、部署、通知用戶、刪除資料或付款。",
      roles: [
        { id: "product-manager", name: "產品經理 Bot", action: "把客戶問題整理成小型規格和清楚結果。", handoff: "把規格和驗收條件交給工程經理 Bot。" },
        { id: "engineering-manager", name: "工程經理 Bot", action: "把規格拆成有人負責的小部分，並處理先後關係。", handoff: "把每個部分交給合適的開發 Bot。" },
        { id: "builders", name: "開發 Bots", action: "製作、測試，再用截圖和說明交回小型修改。", handoff: "把修改和測試證據交給審核 Bot。" },
        { id: "reviewer", name: "審核 Bot", action: "依規格檢查結果，找出風險或缺少的測試。", handoff: "交回一份審核包，等待你批准合併或發佈。" },
      ],
    },
    "research-team": {
      title: "研究團隊",
      summary: "同時搜尋不同來源、檢查論點，再交回一份有來源的簡報。",
      outcome: "一份精簡研究簡報，分開事實與判斷，列出互相衝突的數字，並保留全部來源。",
      audience: "適合需要從大量資料做決定，而且希望摘要前先有人核對的人。",
      setupPrompt:
        "建立一組研究 Bot 團隊，分成研究主管、資料搜尋、來源核對和歸檔四個角色。先定義問題和日期範圍。搜尋 Bot 必須保存連結，只能引用來源真正支持的內容。來源核對 Bot 要檢查定義、日期和互相衝突的數字，之後才由歸檔 Bot 寫簡報。最後交回來源、分歧、未知事項和下一個決定。不得捏造事實或隱藏不確定性。",
      roles: [
        { id: "coordinator", name: "研究主管 Bot", action: "定義問題、日期範圍、來源規則和交付格式。", handoff: "把問題拆成幾個清楚方向，交給資料搜尋 Bots。" },
        { id: "scouts", name: "資料搜尋 Bots", action: "同時搜尋不同來源，並保存每個有用連結。", handoff: "把證據表交給來源核對 Bot。" },
        { id: "analyst", name: "來源核對 Bot", action: "檢查說法、日期、定義和互相衝突的數字。", handoff: "只把有足夠支持的發現交給歸檔 Bot。" },
        { id: "archivist", name: "研究歸檔 Bot", action: "把核對過的證據整理成容易再次找到的短簡報。", handoff: "交回簡報、來源、缺口和下一個決定。" },
      ],
    },
    "business-operations-team": {
      title: "商務營運團隊",
      summary: "把財務、行政、供應商和客服事項集中到一份例外清單。",
      outcome: "每週收到一份營運包，包含已核對紀錄、跟進草稿、未解決例外和待批准行動。",
      audience: "適合仍由一個人同時處理財務、行政和客戶跟進的小公司。",
      setupPrompt:
        "建立一組商務營運 Bot 團隊，分成總經理、財務、營運和客服四個角色。每個角色只負責一個範圍，並共用一份例外清單。財務核對發票和收據，營運追蹤續約與跟進，客服起草一般回覆並標出退款或法律問題。總經理每週交回一份完整摘要。未經我批准，不得付款、退款、寄出、刪除或修改正式系統。",
      roles: [
        { id: "general-manager", name: "總經理 Bot", action: "把重複行政事項交給一位清楚的負責角色，並留意例外。", handoff: "金錢問題交給財務 Bot，一般跟進交給營運 Bot。" },
        { id: "finance", name: "財務 Bot", action: "核對發票和收據，標出缺少資料或不合規則的地方。", handoff: "把例外和跟進草稿加入共用清單。" },
        { id: "operations", name: "營運 Bot", action: "持續處理續約、表格、時間表和供應商跟進。", handoff: "客戶問題交給客服 Bot，重要例外交給總經理。" },
        { id: "support", name: "客服 Bot", action: "起草一般回覆，分開退款、法律問題和生氣的客戶。", handoff: "交回一份需要人工批准的例外清單。" },
      ],
    },
    "personal-family-team": {
      title: "個人與家庭團隊",
      summary: "透過一位可信任的助手，協調行事曆、日常事項、購物和旅行。",
      outcome: "一份家庭簡報，包含時間衝突、已準備選項和提醒；未經批准，不會預訂或購買。",
      audience: "適合希望集中處理家庭計畫，同時保留私人行動控制權的忙碌家庭。",
      setupPrompt:
        "建立一組個人與家庭 Bot 團隊，分成生活協調、家庭行事曆、購物和旅行四個角色。我只與生活協調 Bot 對話。每項要求只交給一位專門角色，再用短簡報交回來源、價格、日期和缺少資料。只可使用我批准的帳戶和檔案。未經我批准，不得傳訊、預訂、購買、付款或修改行事曆。",
      roles: [
        { id: "life-door", name: "生活協調 Bot", action: "作為家庭計畫、日常事項和提醒的單一入口。", handoff: "把每項要求交給行事曆、購物或旅行 Bot。" },
        { id: "family-calendar", name: "家庭行事曆 Bot", action: "找出時間衝突、準備提醒，並保留家庭時間。", handoff: "把已批准計畫和缺少資料加入家庭簡報。" },
        { id: "shopping", name: "購物 Bot", action: "比較價格、檢查庫存，準備購物車但不會付款。", handoff: "交回選項、價格、來源和需要批准的內容。" },
        { id: "travel", name: "旅行 Bot", action: "依家庭的真正條件比較路線和住宿。", handoff: "交回候選清單，預訂或付款前先等待批准。" },
      ],
    },
  },
  "zh-Hans": {} as Record<string, TeamCopy>,
};

copy["zh-Hans"] = Object.fromEntries(
  Object.entries(copy["zh-Hant"]).map(([slug, team]) => [
    slug,
    {
      ...team,
      title: toSimplified(team.title),
      summary: toSimplified(team.summary),
      outcome: toSimplified(team.outcome),
      audience: toSimplified(team.audience),
      setupPrompt: toSimplified(team.setupPrompt),
      roles: team.roles.map((role) => ({
        ...role,
        name: toSimplified(role.name),
        action: toSimplified(role.action),
        handoff: toSimplified(role.handoff),
      })),
    },
  ]),
);

const pageCopy: Record<Locale, BotTeamsPageCopy> = {
  en: {
    eyebrow: "CURATED FROM REAL GROK BOT SETUPS",
    title: "Grok Bot Teams",
    body: "Choose a real outcome, see which Bots own each part, and follow the handoffs from start to finish.",
    count: "7 practical teams",
    oneBotTitle: "Templates = one Bot",
    oneBotBody: "Add a focused helper for one clear role.",
    teamTitle: "Bot Teams = Bots working together",
    teamBody: "Combine specialists when an outcome needs repeatable handoffs.",
    chooseTitle: "Choose the outcome",
    chooseBody: "Each team is grounded in public Grok Bot setups from X. The source posts are kept on the team page.",
    bots: (count) => `${count} ${count === 1 ? "Bot" : "Bots"}`,
    evidence: (count) => `${count} ${count === 1 ? "real setup" : "real setups"}`,
    open: "See team",
    guideEyebrow: "START SMALL",
    guideTitle: "Add structure only when the outcome needs it.",
    guideBody: "xAI recommends starting with the smallest useful roster, then adding a specialist when a stable role appears.",
    guideSteps: [
      { title: "Start with one Bot", body: "Give one Bot an end-to-end outcome and clear approval rules." },
      { title: "Add a specialist", body: "Create a second Bot when one narrow role keeps repeating." },
      { title: "Use a group chat", body: "Bring Bots together when the handoff should be visible to everyone." },
    ],
    guideLink: "Read xAI's collaboration guide",
    teamEyebrow: "GROK BOT TEAM",
    outcomeLabel: "Outcome",
    audienceLabel: "Best for",
    workflowTitle: "How the team works",
    workflowBody: "The roles are the workflow. Each Bot owns one part and hands a clear result forward.",
    handoffLabel: "Handoff",
    templatesTitle: "Bots you can add",
    templatesBody: "These public templates already exist on x.ai. Add the ones that match your setup, then change their instructions to fit your rules.",
    templateOpen: "Add on x.ai",
    setupTitle: "Copy the team setup",
    setupBody: "Paste this into your coordinator Bot, review the names and connected tools, then build the team one role at a time.",
    examplesTitle: "Real setups from X",
    examplesBody: "Public examples that show multiple Bots working together. We checked the source text but did not re-run these teams.",
    otherTitle: "Other Bot Teams",
    allTeams: "See all Bot Teams",
  },
  "zh-Hant": {
    eyebrow: "根據真實 GROK BOT 設定整理",
    title: "Grok Bot 團隊",
    body: "先選擇想要的結果，再看每隻 Bot 負責什麼，以及它們怎樣由開始一路交接到完成。",
    count: "7 組實用團隊",
    oneBotTitle: "Templates = 一隻 Bot",
    oneBotBody: "加入一位專門處理清楚角色的助手。",
    teamTitle: "Bot Teams = 多隻 Bot 一起完成",
    teamBody: "當結果需要固定交接時，把不同專長的 Bot 組合起來。",
    chooseTitle: "選擇想要的結果",
    chooseBody: "每組團隊都根據 X 上公開的 Grok Bot 設定整理，來源貼文保留在團隊頁面。",
    bots: (count) => `${count} 隻 Bot`,
    evidence: (count) => `${count} 個真實設定`,
    open: "查看團隊",
    guideEyebrow: "由小開始",
    guideTitle: "只在結果需要時，才增加團隊結構。",
    guideBody: "xAI 建議先使用最小而有用的組合，當固定的專門角色出現時，再增加一隻 Bot。",
    guideSteps: [
      { title: "先用一隻 Bot", body: "給它一個由開始到完成的清楚結果，並寫明批准規則。" },
      { title: "再加專門角色", body: "當一個細分角色反覆出現時，才建立第二隻 Bot。" },
      { title: "需要看見交接時開群組", body: "當所有 Bot 都要看見交接內容時，把它們加入同一個群組。" },
    ],
    guideLink: "閱讀 xAI 協作指南",
    teamEyebrow: "GROK BOT 團隊",
    outcomeLabel: "你會得到",
    audienceLabel: "適合",
    workflowTitle: "這組 Bot 怎樣接力",
    workflowBody: "角色就是流程。每隻 Bot 只負責一個部分，再把清楚結果交給下一位。",
    handoffLabel: "交接",
    templatesTitle: "可以加入的 Bots",
    templatesBody: "這些公開模板已經存在於 x.ai。先加入符合需要的模板，再依你的規則修改說明。",
    templateOpen: "在 x.ai 加入",
    setupTitle: "複製團隊設定",
    setupBody: "把這段內容貼給協調 Bot，先檢查名稱和已連接工具，再逐一建立角色。",
    examplesTitle: "X 上的真實設定",
    examplesBody: "這些公開例子顯示多隻 Bot 一起完成事情。我們核對了來源文字，但沒有重新執行這些團隊。",
    otherTitle: "其他 Bot 團隊",
    allTeams: "查看全部 Bot 團隊",
  },
  "zh-Hans": {} as BotTeamsPageCopy,
};

pageCopy["zh-Hans"] = {
  ...pageCopy["zh-Hant"],
  eyebrow: toSimplified(pageCopy["zh-Hant"].eyebrow),
  title: toSimplified(pageCopy["zh-Hant"].title),
  body: toSimplified(pageCopy["zh-Hant"].body),
  count: toSimplified(pageCopy["zh-Hant"].count),
  oneBotTitle: toSimplified(pageCopy["zh-Hant"].oneBotTitle),
  oneBotBody: toSimplified(pageCopy["zh-Hant"].oneBotBody),
  teamTitle: toSimplified(pageCopy["zh-Hant"].teamTitle),
  teamBody: toSimplified(pageCopy["zh-Hant"].teamBody),
  chooseTitle: toSimplified(pageCopy["zh-Hant"].chooseTitle),
  chooseBody: toSimplified(pageCopy["zh-Hant"].chooseBody),
  bots: (count) => `${count} 只 Bot`,
  evidence: (count) => `${count} 个真实设置`,
  open: toSimplified(pageCopy["zh-Hant"].open),
  guideEyebrow: toSimplified(pageCopy["zh-Hant"].guideEyebrow),
  guideTitle: toSimplified(pageCopy["zh-Hant"].guideTitle),
  guideBody: toSimplified(pageCopy["zh-Hant"].guideBody),
  guideSteps: pageCopy["zh-Hant"].guideSteps.map((step) => ({
    title: toSimplified(step.title),
    body: toSimplified(step.body),
  })),
  guideLink: toSimplified(pageCopy["zh-Hant"].guideLink),
  teamEyebrow: toSimplified(pageCopy["zh-Hant"].teamEyebrow),
  outcomeLabel: toSimplified(pageCopy["zh-Hant"].outcomeLabel),
  audienceLabel: toSimplified(pageCopy["zh-Hant"].audienceLabel),
  workflowTitle: toSimplified(pageCopy["zh-Hant"].workflowTitle),
  workflowBody: toSimplified(pageCopy["zh-Hant"].workflowBody),
  handoffLabel: toSimplified(pageCopy["zh-Hant"].handoffLabel),
  templatesTitle: toSimplified(pageCopy["zh-Hant"].templatesTitle),
  templatesBody: toSimplified(pageCopy["zh-Hant"].templatesBody),
  templateOpen: toSimplified(pageCopy["zh-Hant"].templateOpen),
  setupTitle: toSimplified(pageCopy["zh-Hant"].setupTitle),
  setupBody: toSimplified(pageCopy["zh-Hant"].setupBody),
  examplesTitle: toSimplified(pageCopy["zh-Hant"].examplesTitle),
  examplesBody: toSimplified(pageCopy["zh-Hant"].examplesBody),
  otherTitle: toSimplified(pageCopy["zh-Hant"].otherTitle),
  allTeams: toSimplified(pageCopy["zh-Hant"].allTeams),
};

function toSimplified(value: string) {
  const pairs = [
    ["並", "并"], ["佈", "布"], ["併", "并"], ["來", "来"], ["係", "系"], ["個", "个"],
    ["們", "们"], ["備", "备"], ["傳", "传"], ["價", "价"], ["優", "优"], ["內", "内"],
    ["刪", "删"], ["則", "则"], ["創", "创"], ["動", "动"], ["務", "务"], ["協", "协"],
    ["參", "参"], ["問", "问"], ["單", "单"], ["圍", "围"], ["圖", "图"], ["團", "团"],
    ["執", "执"], ["報", "报"], ["場", "场"], ["夠", "够"], ["實", "实"], ["審", "审"],
    ["寫", "写"], ["將", "将"], ["專", "专"], ["尋", "寻"], ["對", "对"], ["層", "层"],
    ["帳", "帐"], ["幾", "几"], ["庫", "库"], ["廣", "广"], ["彙", "汇"], ["後", "后"],
    ["從", "从"], ["應", "应"], ["戶", "户"], ["擇", "择"], ["據", "据"], ["數", "数"],
    ["斷", "断"], ["於", "于"], ["時", "时"], ["曆", "历"], ["會", "会"], ["條", "条"],
    ["構", "构"], ["標", "标"], ["樣", "样"], ["檔", "档"], ["檢", "检"], ["權", "权"],
    ["歸", "归"], ["氣", "气"], ["決", "决"], ["沒", "没"], ["測", "测"], ["準", "准"],
    ["為", "为"], ["營", "营"], ["獨", "独"], ["現", "现"], ["產", "产"], ["畫", "画"],
    ["異", "异"], ["當", "当"], ["發", "发"], ["確", "确"], ["稱", "称"], ["穩", "稳"],
    ["範", "范"], ["篩", "筛"], ["簡", "简"], ["紀", "纪"], ["約", "约"], ["細", "细"],
    ["終", "终"], ["組", "组"], ["結", "结"], ["絡", "络"], ["給", "给"], ["統", "统"],
    ["經", "经"], ["綱", "纲"], ["緊", "紧"], ["線", "线"], ["總", "总"], ["繫", "系"],
    ["續", "续"], ["義", "义"], ["聯", "联"], ["與", "与"], ["處", "处"], ["號", "号"],
    ["術", "术"], ["衝", "冲"], ["裡", "里"], ["製", "制"], ["複", "复"], ["見", "见"],
    ["規", "规"], ["視", "视"], ["覺", "觉"], ["訂", "订"], ["計", "计"], ["訊", "讯"],
    ["討", "讨"], ["記", "记"], ["設", "设"], ["試", "试"], ["話", "话"], ["該", "该"],
    ["認", "认"], ["語", "语"], ["誤", "误"], ["說", "说"], ["調", "调"], ["論", "论"],
    ["證", "证"], ["議", "议"], ["讀", "读"], ["變", "变"], ["讓", "让"], ["負", "负"],
    ["財", "财"], ["責", "责"], ["買", "买"], ["貼", "贴"], ["資", "资"], ["質", "质"],
    ["賬", "账"], ["購", "购"], ["蹤", "踪"], ["車", "车"], ["較", "较"], ["轉", "转"],
    ["辦", "办"], ["這", "这"], ["連", "连"], ["週", "周"], ["進", "进"], ["運", "运"],
    ["過", "过"], ["達", "达"], ["適", "适"], ["選", "选"], ["還", "还"], ["銷", "销"],
    ["錄", "录"], ["錢", "钱"], ["錯", "错"], ["長", "长"], ["門", "门"], ["開", "开"],
    ["間", "间"], ["閱", "阅"], ["關", "关"], ["隊", "队"], ["際", "际"], ["險", "险"],
    ["隱", "隐"], ["隻", "只"], ["頁", "页"], ["項", "项"], ["須", "须"], ["預", "预"],
    ["題", "题"], ["顯", "显"], ["風", "风"], ["驗", "验"], ["體", "体"], ["麼", "么"],
    ["點", "点"],
  ] as const;
  const map = new Map<string, string>(pairs);
  return [...value].map((char) => map.get(char) ?? char).join("");
}

export function localizeBotTeam(team: BotTeam, locale: Locale): LocalizedBotTeam {
  const localized = copy[locale][team.slug] ?? copy.en[team.slug];
  return { ...team, ...localized };
}

export function botTeamsPageCopy(locale: Locale) {
  return pageCopy[locale];
}
