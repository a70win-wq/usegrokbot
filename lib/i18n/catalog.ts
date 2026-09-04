import { appsBySlug } from "@/data/apps";
import type { App, AppSlug } from "@/data/types";
import type { Locale } from "./types";

const appCopy: Record<Exclude<Locale, "en">, Record<AppSlug, string>> = {
  "zh-Hant": {
    browser: "瀏覽網站、比較頁面、收集公開資訊。",
    gmail: "整理收件匣、草擬回覆、跟進電子郵件。",
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
    youtube: "收集影片靈感、留言與競爭對手上傳。",
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
  ja: {
    browser: "Web を見て、ページを比べ、公開情報を集めます。",
    gmail: "受信箱を整理し、返信案とフォローを用意します。",
    "google-sheets": "リストを保存し、見込み客や簡単なレポートを更新します。",
    "google-calendar": "会議を準備し、1週間の予定を整えます。",
    slack: "チームが使う場所へ要点を届けます。",
    notion: "調査結果を再利用できるページにまとめます。",
    github: "Issue、Pull Request、リポジトリの動きを追います。",
    salesforce: "CRM のメモと次の対応を最新に保ちます。",
    hubspot: "連絡先、取引、フォローを更新します。",
    linkedin: "人物や会社を調べ、投稿のヒントを集めます。",
    x: "会話、メンション、話題を追います。",
    reddit: "顧客の言葉と新しい悩みを見つけます。",
    youtube: "動画のヒント、コメント、競合の投稿を集めます。",
  },
};

export function localizeApp(app: App, locale: Locale): App {
  if (locale === "en") return app;
  return { ...app, description: appCopy[locale][app.slug] };
}

export function appFor(slug: AppSlug, locale: Locale): App {
  return localizeApp(appsBySlug[slug], locale);
}
