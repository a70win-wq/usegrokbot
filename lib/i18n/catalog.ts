import { appsBySlug } from "@/data/apps";
import { categoriesBySlug } from "@/data/categories";
import type { App, AppSlug, Category, CategorySlug, UseCase } from "@/data/types";
import { getUseCaseI18n } from "./use-cases";
import type { Locale } from "./types";

const categoryCopy: Record<
  Exclude<Locale, "en">,
  Record<CategorySlug, { name: string; shortName: string; description: string }>
> = {
  "zh-Hant": {
    sales: {
      name: "銷售",
      shortName: "銷售",
      description: "找潛在客戶、研究對象、準備跟進。",
    },
    marketing: {
      name: "市場",
      shortName: "市場",
      description: "監察對手、廣告活動與市場趨勢。",
    },
    content: {
      name: "內容",
      shortName: "內容",
      description: "研究題材，更快寫出更好的內容。",
    },
    research: {
      name: "研究",
      shortName: "研究",
      description: "把數小時的網上研究變成短而有用的報告。",
    },
    operations: {
      name: "營運",
      shortName: "辦公室",
      description: "處理每天重複的辦公室工作。",
    },
    "customer-support": {
      name: "客戶支援",
      shortName: "支援",
      description: "整理意見與支援請求。",
    },
    hr: {
      name: "人事",
      shortName: "人事",
      description: "研究候選人，整理招聘工作。",
    },
    coding: {
      name: "開發",
      shortName: "開發",
      description: "幫忙查問題、bug 與 GitHub 工作。",
    },
    finance: {
      name: "財務",
      shortName: "財務",
      description: "整理簡單的財務與匯報工作。",
    },
    productivity: {
      name: "效率",
      shortName: "效率",
      description: "幫忙管理日常工作與個人任務。",
    },
  },
  "zh-Hans": {
    sales: {
      name: "销售",
      shortName: "销售",
      description: "找潜在客户、研究对象、准备跟进。",
    },
    marketing: {
      name: "市场",
      shortName: "市场",
      description: "监控竞品、营销活动与市场趋势。",
    },
    content: {
      name: "内容",
      shortName: "内容",
      description: "研究题材，更快写出更好的内容。",
    },
    research: {
      name: "研究",
      shortName: "研究",
      description: "把数小时的网上研究变成短而有用的报告。",
    },
    operations: {
      name: "运营",
      shortName: "办公室",
      description: "处理每天重复的办公室工作。",
    },
    "customer-support": {
      name: "客户支持",
      shortName: "支持",
      description: "整理反馈与支持请求。",
    },
    hr: {
      name: "人事",
      shortName: "人事",
      description: "研究候选人，整理招聘工作。",
    },
    coding: {
      name: "开发",
      shortName: "开发",
      description: "帮忙查问题、bug 与 GitHub 工作。",
    },
    finance: {
      name: "财务",
      shortName: "财务",
      description: "整理简单的财务与汇报工作。",
    },
    productivity: {
      name: "效率",
      shortName: "效率",
      description: "帮忙管理日常工作与个人任务。",
    },
  },
};

const appCopy: Record<Exclude<Locale, "en">, Record<AppSlug, string>> = {
  "zh-Hant": {
    browser: "瀏覽網站、比較頁面、收集公開資訊。",
    gmail: "整理收件箱、草擬回覆、跟進電郵。",
    "google-sheets": "保存名單、追蹤潛在客戶、更新簡單報告。",
    "google-calendar": "準備會議，把一週安排好。",
    slack: "把簡報送到團隊已經在用的地方。",
    notion: "把研究寫成團隊可重用的頁面。",
    github: "留意 issues、pull requests 與倉庫動態。",
    salesforce: "讓 CRM 備註與下一步保持最新。",
    hubspot: "更新聯絡人、交易與跟進任務。",
    linkedin: "研究人物、公司與貼文靈感。",
    x: "追蹤對話、提及與熱門話題。",
    reddit: "找出真實顧客用語與新冒出的問題。",
    youtube: "收集影片靈感、留言與對手上載。",
  },
  "zh-Hans": {
    browser: "浏览网站、比较页面、收集公开信息。",
    gmail: "整理收件箱、起草回复、跟进邮件。",
    "google-sheets": "保存名单、追踪潜在客户、更新简单报告。",
    "google-calendar": "准备会议，把一周安排好。",
    slack: "把简报送到团队已经在用的地方。",
    notion: "把研究写成团队可复用的页面。",
    github: "留意 issues、pull requests 与仓库动态。",
    salesforce: "让 CRM 备注与下一步保持最新。",
    hubspot: "更新联系人、交易与跟进任务。",
    linkedin: "研究人物、公司与帖子灵感。",
    x: "追踪对话、提及与热门话题。",
    reddit: "找出真实顾客用语与新冒出的问题。",
    youtube: "收集视频灵感、评论与竞品上传。",
  },
};

export function localizeCategory(category: Category, locale: Locale): Category {
  if (locale === "en") return category;
  return { ...category, ...categoryCopy[locale][category.slug] };
}

export function categoryFor(slug: CategorySlug, locale: Locale): Category {
  return localizeCategory(categoriesBySlug[slug], locale);
}

export function localizeApp(app: App, locale: Locale): App {
  if (locale === "en") return app;
  return { ...app, description: appCopy[locale][app.slug] };
}

export function appFor(slug: AppSlug, locale: Locale): App {
  return localizeApp(appsBySlug[slug], locale);
}

export function localizeUseCase(useCase: UseCase, locale: Locale): UseCase {
  const copy = getUseCaseI18n(useCase.slug, locale);
  if (!copy) return useCase;
  return {
    ...useCase,
    title: copy.title,
    shortDescription: copy.shortDescription,
    description: copy.description,
    steps: copy.steps,
    targetUsers: copy.targetUsers,
  };
}
