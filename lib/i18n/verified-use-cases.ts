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
} satisfies Record<Locale, Record<string, string | ((count: number) => string)>>;

export function verifiedUseCasesPageCopy(locale: Locale) {
  return {
    ...pageCopy[locale],
    categories: categoryOrder.map((slug) => ({ slug, label: categoryLabels[locale][slug] })),
  };
}

export function localizeUseCaseText(value: LocalizedUseCaseText, locale: Locale) {
  if (locale === "en") return value.en;
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
