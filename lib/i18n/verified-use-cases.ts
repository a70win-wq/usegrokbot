import type {
  LocalizedUseCaseText,
  VerifiedUseCase,
  VerifiedUseCaseCategorySlug,
} from "@/data/verified-use-cases";
import type { Locale } from "./types";

const categoryOrder: readonly VerifiedUseCaseCategorySlug[] = [
  "everyday-life",
  "business-admin",
  "content-communication",
  "research-career",
  "product-engineering",
  "bot-team-management",
];

const categoryLabels: Record<Locale, Record<VerifiedUseCaseCategorySlug, string>> = {
  en: {
    "everyday-life": "Everyday life",
    "business-admin": "Business admin & finance",
    "content-communication": "Content & communication",
    "research-career": "Research & career",
    "product-engineering": "Product & engineering",
    "bot-team-management": "Bot team management",
  },
  "zh-Hant": {
    "everyday-life": "日常生活",
    "business-admin": "行政與財務",
    "content-communication": "內容與溝通",
    "research-career": "研究與求職",
    "product-engineering": "產品與工程",
    "bot-team-management": "Bot 團隊管理",
  },
  "zh-Hans": {
    "everyday-life": "日常生活",
    "business-admin": "行政与财务",
    "content-communication": "内容与沟通",
    "research-career": "研究与求职",
    "product-engineering": "产品与工程",
    "bot-team-management": "Bot 团队管理",
  },
  ja: {
    "everyday-life": "日常生活",
    "business-admin": "事務とお金",
    "content-communication": "コンテンツと連絡",
    "research-career": "調査と求職",
    "product-engineering": "プロダクトとエンジニアリング",
    "bot-team-management": "Bot チームの管理",
  },
};

const pageCopy = {
  en: {
    title: "Use Cases",
    subtitle: (count: number) => `Strictly selected from ${count.toLocaleString("en-US")} public posts.`,
    categoryLabel: "Category",
    evidenceLabel: "Evidence",
    structureLabel: "Structure",
    allCategories: "All categories",
    allEvidence: "All",
    allStructures: "All",
    promptIncluded: "Prompt included",
    setupShared: "Setup shared",
    singleBot: "Single Bot",
    botTeam: "Bot Team",
    resultsLabel: "Use Case results",
    showing: (count: number) => `${count} use cases`,
    empty: "No use case matches these filters.",
    clearFilters: "Clear filters",
    open: "Open use case",
    promptTitle: "Source prompt",
    setupTitle: "Shared setup",
    handoffTitle: "Bot handoff",
    sourceTitle: "Source",
    relatedSourcesTitle: "Related sources",
    openOriginal: "Open original post",
    allUseCases: "All Use Cases",
  },
  "zh-Hant": {
    title: "使用案例",
    subtitle: (count: number) => `從 ${count.toLocaleString("en-US")} 篇公開貼文中嚴格篩選。`,
    categoryLabel: "分類",
    evidenceLabel: "公開內容",
    structureLabel: "形式",
    allCategories: "全部分類",
    allEvidence: "全部",
    allStructures: "全部",
    promptIncluded: "Prompt 已公開",
    setupShared: "設定已公開",
    singleBot: "Single Bot",
    botTeam: "Bot Team",
    resultsLabel: "Use Case 結果",
    showing: (count: number) => `${count} 個 Use Cases`,
    empty: "沒有符合這組條件的 Use Case。",
    clearFilters: "清除篩選",
    open: "查看 Use Case",
    promptTitle: "來源 Prompt",
    setupTitle: "公開設定",
    handoffTitle: "Bot 交接",
    sourceTitle: "來源",
    relatedSourcesTitle: "相關來源",
    openOriginal: "查看原文",
    allUseCases: "全部 Use Cases",
  },
  "zh-Hans": {
    title: "使用案例",
    subtitle: (count: number) => `从 ${count.toLocaleString("en-US")} 篇公开帖子中严格筛选。`,
    categoryLabel: "分类",
    evidenceLabel: "公开内容",
    structureLabel: "形式",
    allCategories: "全部分类",
    allEvidence: "全部",
    allStructures: "全部",
    promptIncluded: "Prompt 已公开",
    setupShared: "设置已公开",
    singleBot: "Single Bot",
    botTeam: "Bot Team",
    resultsLabel: "Use Case 结果",
    showing: (count: number) => `${count} 个 Use Cases`,
    empty: "没有符合这组条件的 Use Case。",
    clearFilters: "清除筛选",
    open: "查看 Use Case",
    promptTitle: "来源 Prompt",
    setupTitle: "公开设置",
    handoffTitle: "Bot 交接",
    sourceTitle: "来源",
    relatedSourcesTitle: "相关来源",
    openOriginal: "查看原文",
    allUseCases: "全部 Use Cases",
  },
  ja: {
    title: "活用例",
    subtitle: (count: number) => `${count.toLocaleString("ja-JP")} 件の公開投稿から厳選。`,
    categoryLabel: "カテゴリー",
    evidenceLabel: "公開内容",
    structureLabel: "構成",
    allCategories: "すべてのカテゴリー",
    allEvidence: "すべて",
    allStructures: "すべて",
    promptIncluded: "プロンプトあり",
    setupShared: "設定を公開",
    singleBot: "単独 Bot",
    botTeam: "Bot チーム",
    resultsLabel: "活用例の結果",
    showing: (count: number) => `${count} 件の活用例`,
    empty: "この条件に合う活用例はありません。",
    clearFilters: "条件をクリア",
    open: "活用例を見る",
    promptTitle: "元のプロンプト",
    setupTitle: "公開されている設定",
    handoffTitle: "Bot の受け渡し",
    sourceTitle: "出典",
    relatedSourcesTitle: "関連する出典",
    openOriginal: "元の投稿を見る",
    allUseCases: "すべての活用例",
  },
} satisfies Record<Locale, Record<string, string | ((count: number) => string)>>;

export function verifiedUseCasesPageCopy(locale: Locale) {
  return {
    ...pageCopy[locale],
    categories: categoryOrder.map((slug) => ({ slug, label: categoryLabels[locale][slug] })),
  };
}

const jaUseCaseByEnglish: Record<string, string> = {
  "Keep a living wiki for every Bot": "どの Bot にも更新される Wiki を置く",
  "Fill and sign a PDF, then wait": "PDF を記入・署名し、確認を待つ",
  "Tidy email, files, and paid subscriptions": "メール、ファイル、有料サブスクを先に整理する",
  "Watch the rest of your Bots": "ほかの Bot を見守り、改善案だけ渡す",
  "Open a live webpage and return a QA report": "公開中のページを開き、品質確認レポートを返す",
  "Fill your Amazon cart, never check out": "Amazon のカートまで入れ、購入はしない",
  "Turn a dish into a shopping list and cooking steps": "料理名から買い物リストと手順を作る",
  "Keep a reminder board with its photos": "写真つきのリマインダーボードを保つ",
  "Sort X follows before you unfollow": "フォロー解除の前に X のフォローを分類する",
  "Check rent deposits against the lease": "家賃の入金を契約と照合する",
  "Find best-tools pages and draft outreach": "ツール紹介ページを探し、連絡文の下書きを作る",
  "Answer only from official Army publications": "公式の陸軍文書だけから答える",
  "Watch a job feed and archive new listings": "求人フィードを見守り、新しい募集を保存する",
  "Draft every message, send nothing": "文面はすべて下書きし、送信しない",
  "Make one publishable video from two clips": "2本の素材から公開できる1本にまとめる",
  "Turn a bug into a pull request": "不具合からプルリクエストまで進める",
  "Audit spending against cards you already have": "持っているカードに対して支出を点検する",
  "Find money leaks, then wait for approval": "お金の漏れを見つけ、許可を待つ",
  "Find contractors who serve your address": "自分の住所に来る業者を探す",
  "Turn today's bookmarks into one post": "今日のブックマークを1本の投稿にする",
  "Download a patent library as PDFs": "特許を PDF のライブラリとして保存する",
  "Watch public repositories before the announcement": "発表前に公開リポジトリの変化を見る",
  "Match this week's charges to receipts": "今週の請求と領収書を照合する",
  "Prevent conflicts between both kids' games": "子どもの試合が重ならないようにする",
  "Manage a job search with five specialized Bots": "5つの専門 Bot で求職を進める",
  "Ask Lenny's archive a product question": "Lenny のアーカイブにプロダクトの質問をする",
  "Start and dock a mower from far away": "遠くから芝刈り機を起動し、充電位置へ戻す",
  "Run a founder org chart with a morning standup": "創業者の組織図で朝のスタンドアップを回す",
  "Owns the vault, the wiki, and the daily note.": "保管庫、Wiki、デイリーノートを管理します。",
  "Create one Obsidian vault on the Chief of Staff computer, with Home.md as the entrance.":
    "幕僚長のコンピュータに Obsidian の保管庫を1つ作り、Home.md を入口にします。",
  "Create Hunt folders for incoming sources, Ship folders for outputs, plus Wiki and Maps folders.":
    "入ってくる出典用に Hunt、成果物用に Ship、さらに Wiki と Maps のフォルダを作ります。",
  "Give every note a date and folder before anything else happens.":
    "どのノートにも、先に日付を付けて所定のフォルダへ入れます。",
  "Keep full files in the assigned folders; return only a short digest in chat.":
    "全文は指定フォルダに残し、チャットには短い要約だけ返します。",
  "Run the published daily schedule and keep decisions in Wiki/Decisions.":
    "公開されている日次の時間割で回し、決定は Wiki/Decisions に残します。",
  "Nothing in the vault may post, pay, or send; the final approval stays human.":
    "保管庫の中身は投稿も支払いも送信もしません。最終承認は人が行います。",
  "File research into Hunt without filling the chat.": "調査資料は Hunt に入れ、チャットを埋めません。",
  "Writes performance notes to twitter/live-score.": "成果メモを twitter/live-score に書きます。",
  "Writes build records into builds/.": "ビルドの記録を builds/ に書きます。",
  "Give the Bot the live webpage you want reviewed.": "確認してほしい公開中のページを Bot に渡します。",
  "Let it open the page in its cloud computer and browse the experience itself.":
    "クラウドコンピュータでそのページを開き、自分で操作して確認させます。",
  "Ask for one report covering SEO, accessibility, forms, UX, and content consistency.":
    "SEO、アクセシビリティ、フォーム、UX、内容の一貫性を1通のレポートにまとめさせます。",
  "Limit the Bot to Army Pubs, the official Army regulations repository.":
    "参照先を公式の Army Pubs だけに限定します。",
  "Require the regulation, page, paragraph, and line for every answer.":
    "どの答えにも、条文、ページ、段落、行を付けさせます。",
  "Require it to flag any regulation that contradicts the answer.":
    "答えと矛盾する条文があれば、必ず指摘させます。",
  "Double-check the cited lines yourself.": "引用された原文は、最後に自分で確認します。",
  "Check the public Contra feed every six hours.": "6時間ごとに Contra の公開フィードを確認します。",
  "Archive each listing in Notion before it disappears from the free feed.":
    "無料フィードから消える前に、各募集を Notion へ保存します。",
  "Email only when a listing is new or has just closed.": "募集が新規か、ちょうど閉じたときだけメールします。",
  "Give the Bot links to two videos on X.": "X 上の動画2本のリンクを Bot に渡します。",
  "Ask it to place the videos side by side in one clip.": "2本を横並びにした1本のクリップにまとめさせます。",
  "Ask it to add captions to the finished clip.": "完成したクリップに字幕を付けさせます。",
  "Connect the repository and Cursor Cloud Agent to the Patch Engineer.":
    "リポジトリと Cursor Cloud Agent を Patch Engineer に接続します。",
  "Describe the bug, where it appears, and the result you expect.": "不具合、出る場所、期待する結果を伝えます。",
  "Keep every code change in the cloud branch, never on your Mac or inside chat.":
    "コードの変更はクラウドのブランチだけに残し、Mac やチャットでは直しません。",
  "You read the diff and decide whether to merge it.": "diff を読んで、マージするかを自分で決めます。",
  "Turns the report into a bounded request and hands it to the cloud agent.":
    "報告を範囲つきの依頼に直し、クラウド agent へ渡します。",
  "Patches and tests the cloud branch, then opens a pull request.":
    "クラウドのブランチを修正・テストし、プルリクエストを開きます。",
  "Use Captain as the only Bot that talks to you.": "あなたと話す Bot は Captain だけにします。",
  "Use read-only Plaid data and never show account numbers.": "Plaid は読み取り専用にし、口座番号は表示しません。",
  "Use only the official Chase and Amex pages for current benefits.":
    "最新の特典は Chase と Amex の公式ページだけから確認します。",
  "Run monthly and return one list of mismatched spending and unused benefits.":
    "毎月実行し、カードの使い分けミスと未使用特典を1つのリストにまとめます。",
  "Never post or apply for a new card without approval.": "承認なしに投稿したり、新しいカードを申し込んだりしません。",
  "Combines the spending and benefits findings into one monthly recap.":
    "支出と特典の結果を1通の月次まとめにします。",
  "Reads the posted transactions through Plaid.": "Plaid 経由で計上済みの取引を読みます。",
  "Checks current card benefits on the official pages.": "公式ページで最新のカード特典を確認します。",
  "Create one shared evidence table for receipts, charges, amounts, dates, and source links.":
    "領収書、請求、金額、日付、出典リンクを1つの証拠表にまとめます。",
  "Pass an item forward only after the previous evidence field is complete.":
    "前の証拠欄が揃ってからだけ、次の Bot へ渡します。",
  "Run the review overnight, but block sending, cancelling, disputes, and card access.":
    "夜間に照合しますが、送信、解約、異議申し立て、カード操作は止めます。",
  "Make every final decision from one approval queue.": "最終判断は、1つの承認キューからすべて行います。",
  "Reads receipts, invoices, and confirmations.": "領収書、請求書、確認メールを読みます。",
  "Links each item to its statement charge.": "各項目を明細の請求と結びつけます。",
  "Decides whether an item is worth pursuing.": "その項目を追う価値があるかを判断します。",
  "Writes the cancellation, follow-up, or claim.": "解約、フォロー、請求の文面を書きます。",
  "Rejects anything without proof and takes no action.": "証拠がないものは却下し、自分では動きません。",
  "Puts approved evidence into one review queue.": "確認済みの証拠を1つの確認キューに入れます。",
  "Sign in to Thumbtack yourself.": "Thumbtack には、まず自分でログインします。",
  "Let the Bot find contractors who actually serve your ZIP code.":
    "実際にその郵便番号を担当する業者を Bot に探させます。",
  "Let it write the request, then wait for your approval.": "依頼文を書かせ、承認を待ちます。",
  "Send only after you press yes.": "同意してからだけ送ります。",
  "Scan only the new X bookmarks from that day.": "その日に増えた X のブックマークだけを見ます。",
  "Group them by topic and choose the strongest thread.": "話題ごとに分け、いちばん強い一本を選びます。",
  "Draft one post using the fixed hook, numbers, counterpoint, and next-action format.":
    "決められた型（フック、数字、意外な視点、次の行動）で投稿を1本下書きします。",
  "Keep every original link with the draft.": "下書きには、元のリンクをすべて残します。",
  "You still decide what deserves publishing.": "公開してよいかは、最後に自分で決めます。",
  "Ask for every patent tied to the company, going back to the chosen year.":
    "指定した年以降、その会社に関する特許をすべて集めさせます。",
  "Let the Bot pull each filing and convert it into an individual PDF.":
    "各出願を取り出し、1件ずつ PDF にさせます。",
  "Drag the finished files into your own archive.": "できたファイルを、自分の保管場所へドラッグします。",
  "Choose the public repositories and define which changes count as a signal.":
    "公開リポジトリを選び、どの変化を合図とみなすかを決めます。",
  "Use a fixed six-stage handoff and do not let any commit skip a stage.":
    "固定の6段階で受け渡し、どの commit も段階を飛ばしません。",
  "Reject any claim that lacks a file path, diff, and commit SHA.":
    "ファイルパス、diff、commit SHA がない主張は採用しません。",
  "Keep delivery blocked until you decide whether the alert should be sent.":
    "通知を送るかは、あなたが決めるまで止めます。",
  "Syncs the repository mirror when a new push appears.": "新しい push が出たら、リポジトリの複製を同期します。",
  "Reads what changed in the code.": "コードのどこが変わったかを読みます。",
  "Connects a change to people and related repositories.": "変化を関係する人とほかのリポジトリへつなぎます。",
  "Compares the change with past release timing.": "今回の変化を、過去の公開タイミングと比べます。",
  "Packages the evidence so every claim can be traced.": "どの主張も辿れるように、証拠をまとめます。",
  "Turns approved evidence into a concise alert.": "確認済みの証拠を、短い通知にします。",
  "Give the Bot both children's game schedules.": "2人の子どもの試合スケジュールを Bot に渡します。",
  "Add how long your family usually needs to leave the house and warm up.":
    "家を出る時間と、試合前の準備に必要な時間を加えます。",
  "Put every game and leave-by time into the calendar, then flag conflicts and missed time.":
    "試合と出発時刻をカレンダーに入れ、重複や間に合わない時間を印します。",
  "Check again on Wednesday and the day before each game for changes.":
    "各試合の前の水曜日と前日に、変更がないか再確認します。",
  "Use Notion as the source of truth for every opportunity.": "どの求人機会も、Notion を唯一の正本にします。",
  "Create separate Bots for queue, review, application, resume, and status.":
    "名簿、確認、応募、履歴書、進捗用に、別々の Bot を作ります。",
  "Write explicit failure rules and keep the process as a closed learning loop.":
    "失敗時の扱いを明記し、流れを改善し続けられるようにします。",
  "At the interview stage, retrieve the exact submitted resume from Gmail and compare it with the job posting.":
    "面接の段階では、Gmail から実際に送った履歴書を取り出し、求人と照合します。",
  "Create personalized interview notes and mock questions from that comparison.":
    "その照合から、個別の面接メモと模擬質問を作ります。",
  "Keeps the opportunity list and next step current.": "機会の名簿と次の一手を最新に保ちます。",
  "Checks fit before an application moves forward.": "応募を進める前に、向き不向きを確認します。",
  "Prepares the application for your approval.": "応募内容を整え、承認を待ちます。",
  "Links the exact submitted resume to each employer.": "実際に送った履歴書を、各社へ結びつけます。",
  "Updates the current stage of every application.": "各応募の今の段階を更新します。",
  "Ask an Engineer Bot to connect to the Navimow robotic mower.":
    "Engineer Bot に、Navimow の芝刈りロボットへ接続するよう頼みます。",
  "Let it complete the connection setup, which the source says took about two minutes.":
    "接続設定を完了させます。出典では約2分だったとあります。",
  "Send a start command from away from home.": "家を離れた場所から、開始の指示を送ります。",
  "Send the mower back to its dock when finished.": "終わったら、芝刈り機を充電位置へ戻します。",
  "Make Atlas, the Chief of Staff, the only Bot that talks to you directly.":
    "幕僚長 Atlas だけが、直接あなたと話す Bot になるようにします。",
  "Use one group chat per outcome, with Atlas in every group.":
    "成果ごとにグループチャットを1つ作り、どのグループにも Atlas を入れます。",
  "End every charter with a clear list of actions that require approval.":
    "どの役割の決まりにも、承認が必要な操作を最後に明記します。",
  "Demonstrate the complete flow once on screen instead of describing it only in text.":
    "流れは文章だけで説明せず、画面上で一通り実演します。",
  "In the daily standup, cover yesterday, this week's goal, current progress, and one move for today.":
    "毎日のスタンドアップでは、昨日の結果、今週の目標、今の進捗、今日の一手だけを扱います。",
  "End with each executive offering feedback and help to the others.":
    "最後に、各担当が意見を出し、ほかの担当をどう助けられるかを述べます。",
  "Splits outcomes, delegates, and keeps the approval queue.": "成果を分け、各 Bot に渡し、承認キューを保ちます。",
  "Finds verified prospects and keeps the source.": "確認済みの見込み先を見つけ、出典を残します。",
  "Turns the week's learning into draft content.": "その週に得たことを、コンテンツの下書きにします。",
  "Writes short outreach drafts for approved prospects.": "承認済みの見込み先へ、短い連絡文の下書きを書きます。",
  "Sorts the inbox and routes each item.": "受信トレイを整理し、各件を正しい行き先へ回します。",
  "Reports what moved and the next number to watch.": "何が動いたかと、次に見る数字を報告します。",
};

export function localizeUseCaseText(value: LocalizedUseCaseText, locale: Locale) {
  if (locale === "en") return value.en;
  if (locale === "ja") return jaUseCaseByEnglish[value.en] ?? value.en;
  if (locale === "zh-Hans") return toSimplified(value.zhHant);
  return value.zhHant;
}

export function localizeVerifiedUseCase(item: VerifiedUseCase, locale: Locale) {
  return {
    ...item,
    title: localizeUseCaseText(item.title, locale),
    categoryLabel: categoryLabels[locale][item.category],
    setupSteps: item.setupSteps?.map((step) => localizeUseCaseText(step, locale)) ?? [],
    teamRoles:
      item.teamRoles?.map((role) => ({
        name: role.name,
        purpose: localizeUseCaseText(role.purpose, locale),
      })) ?? [],
  };
}

function toSimplified(value: string) {
  const pairs = [
    ["與", "与"], ["個", "个"], ["隊", "队"], ["團", "团"], ["協", "协"], ["實", "实"],
    ["從", "从"], ["類", "类"], ["選", "选"], ["這", "这"], ["裡", "里"], ["開", "开"],
    ["關", "关"], ["給", "给"], ["為", "为"], ["員", "员"], ["總", "总"], ["數", "数"],
    ["據", "据"], ["來", "来"], ["發", "发"], ["佈", "布"], ["寫", "写"], ["讓", "让"],
    ["會", "会"], ["見", "见"], ["還", "还"], ["過", "过"], ["將", "将"], ["標", "标"],
    ["計", "计"], ["劃", "划"], ["時", "时"], ["資", "资"], ["訊", "讯"], ["審", "审"],
    ["歸", "归"], ["檔", "档"], ["護", "护"], ["顧", "顾"], ["問", "问"], ["務", "务"],
    ["庫", "库"], ["風", "风"], ["險", "险"], ["應", "应"], ["購", "购"], ["買", "买"],
    ["後", "后"], ["長", "长"], ["動", "动"], ["復", "复"], ["練", "练"], ["準", "准"],
    ["備", "备"], ["篩", "筛"], ["較", "较"], ["確", "确"], ["認", "认"], ["聲", "声"],
    ["聯", "联"], ["絡", "络"], ["戶", "户"], ["營", "营"], ["銷", "销"], ["產", "产"],
    ["場", "场"], ["覽", "览"], ["優", "优"], ["繼", "继"], ["續", "续"], ["萬", "万"],
    ["圍", "围"], ["專", "专"], ["業", "业"], ["進", "进"], ["傳", "传"], ["統", "统"],
    ["籌", "筹"], ["匯", "汇"], ["報", "报"], ["異", "异"], ["議", "议"], ["導", "导"],
    ["處", "处"], ["啟", "启"], ["題", "题"], ["觀", "观"], ["測", "测"], ["證", "证"],
    ["驗", "验"], ["創", "创"], ["辦", "办"], ["組", "组"], ["織", "织"], ["圖", "图"],
    ["貼", "贴"], ["運", "运"], ["內", "内"], ["製", "制"], ["餘", "余"], ["頭", "头"],
    ["調", "调"], ["電", "电"], ["郵", "邮"], ["簡", "简"], ["輯", "辑"], ["覺", "觉"],
    ["學", "学"], ["顯", "显"], ["達", "达"], ["濾", "滤"], ["當", "当"], ["際", "际"],
    ["現", "现"], ["間", "间"], ["經", "经"], ["體", "体"], ["獨", "独"], ["層", "层"],
    ["軟", "软"], ["質", "质"], ["義", "义"], ["術", "术"], ["對", "对"], ["須", "须"],
    ["權", "权"], ["擋", "挡"], ["帳", "账"], ["檢", "检"], ["視", "视"], ["網", "网"],
    ["頁", "页"], ["錯", "错"], ["誤", "误"], ["說", "说"], ["變", "变"], ["節", "节"],
    ["錄", "录"], ["擬", "拟"], ["則", "则"], ["項", "项"], ["樣", "样"], ["離", "离"],
    ["獲", "获"], ["尋", "寻"], ["觸", "触"], ["屬", "属"], ["並", "并"], ["價", "价"],
    ["徑", "径"], ["該", "该"], ["輸", "输"], ["轉", "转"], ["負", "负"], ["責", "责"],
    ["線", "线"], ["條", "条"], ["斷", "断"], ["範", "范"], ["無", "无"], ["語", "语"],
    ["氣", "气"], ["刪", "删"], ["減", "减"], ["結", "结"], ["構", "构"], ["釋", "释"],
    ["預", "预"], ["約", "约"], ["監", "监"], ["雜", "杂"], ["記", "记"], ["執", "执"],
    ["環", "环"], ["驟", "骤"], ["訂", "订"], ["單", "单"], ["貨", "货"], ["課", "课"],
    ["閱", "阅"], ["讀", "读"], ["換", "换"], ["規", "规"], ["領", "领"], ["職", "职"],
    ["碼", "码"], ["決", "决"], ["點", "点"], ["編", "编"], ["設", "设"], ["順", "顺"],
    ["財", "财"], ["錢", "钱"], ["紀", "纪"], ["曆", "历"], ["衝", "冲"], ["詢", "询"],
    ["請", "请"], ["話", "话"], ["畫", "画"], ["廣", "广"], ["適", "适"], ["試", "试"],
    ["連", "连"], ["況", "况"], ["夠", "够"], ["採", "采"], ["習", "习"], ["維", "维"],
    ["費", "费"], ["週", "周"], ["門", "门"], ["區", "区"], ["號", "号"], ["聞", "闻"],
    ["蓋", "盖"], ["論", "论"], ["掃", "扫"], ["歷", "历"], ["稅", "税"], ["瀏", "浏"],
    ["擇", "择"], ["幫", "帮"], ["穩", "稳"], ["稱", "称"], ["補", "补"], ["廠", "厂"],
    ["雙", "双"], ["討", "讨"], ["腳", "脚"], ["鎖", "锁"], ["鉤", "钩"], ["強", "强"],
    ["師", "师"], ["倉", "仓"], ["隻", "只"], ["筆", "笔"], ["腦", "脑"],
    ["夾", "夹"], ["滿", "满"], ["簽", "签"], ["雲", "云"], ["礙", "碍"],
    ["東", "东"], ["車", "车"], ["鬧", "闹"], ["鐘", "钟"], ["蹤", "踪"],
    ["銀", "银"], ["沒", "没"], ["遲", "迟"], ["併", "并"], ["剛", "刚"],
    ["閉", "闭"], ["兩", "两"], ["壞", "坏"], ["訴", "诉"], ["載", "载"],
    ["齊", "齐"], ["償", "偿"], ["爭", "争"], ["親", "亲"], ["遞", "递"],
    ["複", "复"], ["頻", "频"], ["賽", "赛"], ["熱", "热"], ["誰", "谁"],
    ["機", "机"], ["談", "谈"], ["麼", "么"], ["潛", "潜"], ["邊", "边"],
    ["遠", "远"], ["額", "额"], ["敗", "败"], ["階", "阶"],
  ] as const;
  const map = new Map<string, string>(pairs);
  return [...value]
    .map((char) => map.get(char) ?? char)
    .join("")
    .replaceAll("营运", "运营")
    .replaceAll("贴文", "帖子")
    .replaceAll("资料夹", "文件夹")
    .replaceAll("电邮", "邮件")
    .replaceAll("行事历", "日历")
    .replaceAll("履历", "简历")
    .replaceAll("程式库", "代码库")
    .replaceAll("程式", "程序")
    .replaceAll("索偿", "索赔")
    .replaceAll("连结", "链接")
    .replaceAll("资讯流", "信息流")
    .replaceAll("收件匣", "收件箱")
    .replaceAll("影片", "视频")
    .replaceAll("职缺", "职位空缺")
    .replaceAll("采买", "采购")
    .replaceAll("追踪名单", "关注列表")
    .replaceAll("登入", "登录")
    .replaceAll("邮递区号", "邮政编码")
    .replaceAll("承办商", "承包商")
    .replaceAll("设定", "设置")
    .replaceAll("纪录", "记录")
    .replaceAll("连线", "连接")
    .replaceAll("一则帖子", "一条帖子")
    .replaceAll("档案", "文件")
    .replaceAll("个人化", "个性化")
    .replaceAll("取消追踪", "取消关注")
    .replaceAll("一则可以", "一条可以")
    .replaceAll("哪一则", "哪一条")
    .replaceAll("每一则笔记", "每条笔记")
    .replaceAll("讯号", "信号")
    .replaceAll("查看程序实际改了什么", "查看代码实际改了什么");
}
