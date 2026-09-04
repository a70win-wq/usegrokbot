"use client";

import { useState } from "react";
import { Check, ChevronDown, ShieldCheck } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { GetGrokBot } from "@/components/GetGrokBot";
import { PromptBox } from "@/components/PromptBox";
import type { DiscoverStory } from "@/data/discover";
import { type Locale, useI18n } from "@/lib/i18n";
import {
  buildPromptFromCase,
  defaultCaseSchedule,
  type ApprovalMode,
  type CasePromptSettings,
} from "@/lib/prompts/from-discover";

type FieldKey = "goal" | "dataScope" | "destination" | "schedule" | "boundaries";

type BuilderCopy = {
  eyebrow: string;
  title: string;
  body: string;
  caseNote: string;
  toolsLabel: string;
  toolsNote: string;
  included: string[];
  promptTitle: string;
  copyPrompt: string;
  openGrok: string;
  firstRun: string;
  customize: string;
  optional: string;
  approvalLabel: string;
  confirmChanges: string;
  draftOnly: string;
  privacy: string;
  fields: Array<{
    key: FieldKey;
    label: string;
    placeholder: string;
    multiline?: boolean;
  }>;
};

export function CasePromptBuilder({
  story,
  appNames,
}: {
  story: DiscoverStory;
  appNames: string[];
}) {
  const { locale } = useI18n();
  const copy = promptBuilderCopy(locale);
  const [values, setValues] = useState<Record<FieldKey, string>>({
    goal: "",
    dataScope: "",
    destination: "",
    schedule: "",
    boundaries: "",
  });
  const [approvalMode, setApprovalMode] = useState<ApprovalMode>("confirm-changes");

  const settings: CasePromptSettings = { ...values, approvalMode };
  const prompt = buildPromptFromCase(
    locale,
    {
      title: story.title,
      headline: story.headline,
      whatTheyDid: story.whatTheyDid,
      howItWorks: story.howItWorks,
      whyUseful: story.whyUseful,
      result: story.result,
      output: story.output,
      category: story.category,
      schedule: story.schedule,
      appNames,
    },
    settings,
  );

  function updateField(key: FieldKey, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  return (
    <section className="mt-10 overflow-hidden rounded-[18px] border border-line bg-card">
      <div className="border-b border-line bg-elevated px-5 py-6 sm:px-6">
        <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] text-accent uppercase">
          <ShieldCheck className="size-4" strokeWidth={1.8} />
          {copy.eyebrow}
        </div>
        <h2 className="mt-3 text-[24px] font-medium tracking-tight text-ink sm:text-[28px]">
          {copy.title}
        </h2>
        <p className="mt-2 max-w-[650px] text-[14px] leading-6 text-mute">{copy.body}</p>
        <p className="mt-3 rounded-[10px] border border-line bg-card px-3 py-2 text-[12px] leading-5 text-faint">
          {copy.caseNote}
        </p>

        <div className="mt-4">
          <p className="text-[11px] font-medium tracking-[0.08em] text-faint uppercase">
            {copy.toolsLabel}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {appNames.map((app) => (
              <span
                key={app}
                className="rounded-full border border-line bg-card px-2.5 py-1 text-[12px] text-ink"
              >
                {app}
              </span>
            ))}
          </div>
          <p className="mt-2 text-[12px] leading-5 text-faint">{copy.toolsNote}</p>
        </div>

        <ul className="mt-5 grid gap-2 text-[13px] text-ink sm:grid-cols-2">
          {copy.included.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-ok" strokeWidth={2} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-4 py-5 sm:px-6 sm:py-6">
        <PromptBox prompt={prompt} title={copy.promptTitle} />

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <CopyButton
            text={prompt}
            label={copy.copyPrompt}
            variant="solid"
            className="w-full sm:w-auto"
          />
          <GetGrokBot
            variant="outline"
            label={copy.openGrok}
            className="w-full justify-center sm:w-auto"
          />
        </div>
        <p className="mt-3 text-[12px] leading-5 text-faint">{copy.firstRun}</p>

        <details className="group mt-6 rounded-[14px] border border-line bg-elevated">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[14px] font-medium text-ink [&::-webkit-details-marker]:hidden">
            <span>
              {copy.customize}
              <span className="ml-2 font-normal text-faint">{copy.optional}</span>
            </span>
            <ChevronDown
              className="size-4 shrink-0 text-faint transition-transform group-open:rotate-180"
              strokeWidth={1.8}
            />
          </summary>

          <div className="border-t border-line px-4 py-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {copy.fields.map((field) => (
                <label
                  key={field.key}
                  className={field.multiline ? "block sm:col-span-2" : "block"}
                >
                  <span className="mb-1.5 block text-[12px] font-medium text-faint">
                    {field.label}
                  </span>
                  {field.multiline ? (
                    <textarea
                      value={values[field.key]}
                      placeholder={
                        field.key === "schedule"
                          ? defaultCaseSchedule(locale, story.schedule)
                          : field.placeholder
                      }
                      onChange={(event) => updateField(field.key, event.target.value)}
                      maxLength={fieldMaxLength(field.key)}
                      rows={3}
                      className="w-full resize-y rounded-[10px] border border-line bg-input px-3 py-2.5 text-sm leading-6 text-ink placeholder:text-faint"
                    />
                  ) : (
                    <input
                      value={values[field.key]}
                      placeholder={
                        field.key === "schedule"
                          ? defaultCaseSchedule(locale, story.schedule)
                          : field.placeholder
                      }
                      onChange={(event) => updateField(field.key, event.target.value)}
                      maxLength={fieldMaxLength(field.key)}
                      className="h-11 w-full rounded-[10px] border border-line bg-input px-3 text-sm text-ink placeholder:text-faint"
                    />
                  )}
                </label>
              ))}
            </div>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-[12px] font-medium text-faint">
                {copy.approvalLabel}
              </span>
              <select
                value={approvalMode}
                onChange={(event) => setApprovalMode(event.target.value as ApprovalMode)}
                className="h-11 w-full rounded-[10px] border border-line bg-input px-3 text-sm text-ink sm:max-w-[420px]"
              >
                <option value="confirm-changes">{copy.confirmChanges}</option>
                <option value="draft-only">{copy.draftOnly}</option>
              </select>
            </label>

            <p className="mt-4 flex items-start gap-2 text-[12px] leading-5 text-faint">
              <ShieldCheck className="mt-0.5 size-4 shrink-0" strokeWidth={1.8} />
              <span>{copy.privacy}</span>
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}

function fieldMaxLength(key: FieldKey) {
  if (key === "goal") return 500;
  if (key === "dataScope") return 600;
  if (key === "boundaries") return 800;
  return 300;
}

function promptBuilderCopy(locale: Locale): BuilderCopy {
  if (locale === "zh-Hant") {
    return {
      eyebrow: "已從案例變成提示詞",
      title: "複製後，交給 Grok Bot",
      body: "開頭就像可以直接貼上的設定提示詞：叫它開一隻新 Bot、接好工具、做這份工。後面再加上試跑、核准，以及這個真實案例的靈感。不用填表也可以用。",
      caseNote: "案例只是公開靈感，不代表我們已經重做或保證同樣結果。原始來源仍留在本頁。",
      toolsLabel: "需要的工具",
      toolsNote: "提示詞會先檢查連接和最低權限。未連接就會停下來問你，不會叫你貼密碼。",
      included: ["一貼就能設定新 Bot", "第一次只讀試跑", "重要動作先讓你核准", "做不到會直說"],
      promptTitle: "由這個案例產生的提示詞",
      copyPrompt: "複製完整提示詞",
      openGrok: "打開 Grok Bot",
      firstRun: "建議：先貼提示詞，再回答 Bot 的問題。第一次只會試跑，不會直接改資料。",
      customize: "想再貼近自己的情況？",
      optional: "選填",
      approvalLabel: "Bot 可以做到哪一步？",
      confirmChanges: "改任何東西之前，每次都要問我",
      draftOnly: "只看、分析和寫草稿，永遠不可以改東西",
      privacy: "你在下面填的資料只會留在這個瀏覽器，用來即時改寫提示詞，不會上傳。",
      fields: [
        { key: "goal", label: "你真正想做到什麼？", placeholder: "例如：每天幫我選出最重要的十封郵件" },
        { key: "dataScope", label: "可以看哪些資料？", placeholder: "例如：工作 Gmail，最近 30 天，不看私人標籤" },
        { key: "destination", label: "結果放在哪裡？", placeholder: "例如：先在對話顯示，我核准後才匯出檔案" },
        { key: "schedule", label: "什麼時候做？", placeholder: "例如：每天早上 9 點，香港時間" },
        {
          key: "boundaries",
          label: "有什麼絕對不能碰？",
          placeholder: "例如：不可以刪除郵件、聯絡客人、付款或改帳戶設定",
          multiline: true,
        },
      ],
    };
  }

  if (locale === "zh-Hans") {
    return {
      eyebrow: "已从案例变成提示词",
      title: "复制后，交给 Grok Bot",
      body: "开头就像可以直接粘贴的设置提示词：叫它开一个新 Bot、接好工具、做这份工。后面再加上试跑、核准，以及这个真实案例的灵感。不用填表也可以用。",
      caseNote: "案例只是公开灵感，不代表我们已经重做或保证同样结果。原始来源仍留在本页。",
      toolsLabel: "需要的工具",
      toolsNote: "提示词会先检查连接和最低权限。未连接就会停下来问你，不会叫你粘贴密码。",
      included: ["一贴就能设置新 Bot", "第一次只读试跑", "重要动作先让你核准", "做不到会直说"],
      promptTitle: "由这个案例生成的提示词",
      copyPrompt: "复制完整提示词",
      openGrok: "打开 Grok Bot",
      firstRun: "建议：先粘贴提示词，再回答 Bot 的问题。第一次只会试跑，不会直接修改资料。",
      customize: "想再贴近自己的情况？",
      optional: "选填",
      approvalLabel: "Bot 可以做到哪一步？",
      confirmChanges: "修改任何东西之前，每次都要问我",
      draftOnly: "只看、分析和写草稿，永远不可以修改",
      privacy: "你在下面填写的资料只会留在这个浏览器，用来即时改写提示词，不会上传。",
      fields: [
        { key: "goal", label: "你真正想做到什么？", placeholder: "例如：每天帮我选出最重要的十封邮件" },
        { key: "dataScope", label: "可以查看哪些资料？", placeholder: "例如：工作 Gmail，最近 30 天，不看私人标签" },
        { key: "destination", label: "结果放在哪里？", placeholder: "例如：先在对话显示，我核准后才导出文件" },
        { key: "schedule", label: "什么时候做？", placeholder: "例如：每天早上 9 点，香港时间" },
        {
          key: "boundaries",
          label: "有什么绝对不能碰？",
          placeholder: "例如：不可以删除邮件、联系客户、付款或修改账户设置",
          multiline: true,
        },
      ],
    };
  }

  if (locale === "ja") {
    return {
      eyebrow: "例からプロンプトを作りました",
      title: "コピーして、Grok Bot に渡す",
      body: "そのまま貼れる設定プロンプトです。最初は試し実行にし、大切な操作は承認を待ちます。",
      caseNote: "公開例を参考にしています。同じ結果を保証するものではありません。",
      toolsLabel: "必要なツール",
      toolsNote: "接続と最小権限を先に確認します。パスワードは貼りません。",
      included: ["貼るだけで新しい Bot を設定", "最初は読むだけの試し実行", "大切な操作は先にあなたが承認", "できないことははっきり言う"],
      promptTitle: "この例から作ったプロンプト",
      copyPrompt: "プロンプト全体をコピー",
      openGrok: "Grok Bot を開く",
      firstRun: "先にプロンプトを貼り、Bot の質問に答えてください。初回はデータを変えません。",
      customize: "自分の状況に寄せたい？",
      optional: "任意",
      approvalLabel: "Bot はどこまで進めてよい？",
      confirmChanges: "何かを変える前に、毎回必ず聞いてください",
      draftOnly: "見る・分析する・下書きだけ。何も変えてはいけない",
      privacy: "入力内容はこのブラウザ内だけで使います。アップロードしません。",
      fields: [
        { key: "goal", label: "本当に達成したいことは？", placeholder: "例：毎日いちばん大切なメールを10通選ぶ" },
        { key: "dataScope", label: "どの資料を見てよい？", placeholder: "例：仕事用 Gmail、直近30日、私用ラベルは見ない" },
        { key: "destination", label: "結果はどこに出す？", placeholder: "例：まず会話に出し、承認後にファイルへ書き出す" },
        { key: "schedule", label: "いつ実行する？", placeholder: "例：平日の朝9時、日本時間" },
        {
          key: "boundaries",
          label: "絶対に触れてはいけないことは？",
          placeholder: "例：メール削除、顧客への連絡、支払い、アカウント設定の変更は禁止",
          multiline: true,
        },
      ],
    };
  }

  return {
    eyebrow: "Case turned into a prompt",
    title: "Copy it straight into Grok Bot",
    body: "The first paragraph is a paste-ready setup prompt: create a new bot, connect the tools, and do this job. After that we add a dry run, approval rules, and the real public case as inspiration. No form filling required.",
    caseNote: "This public case is inspiration only. We do not claim to have reproduced it or guarantee the same result. The original source remains on this page.",
    toolsLabel: "Tools needed",
    toolsNote: "The prompt checks connections and least privilege first. If something is not connected, it stops and asks without requesting a password.",
    included: ["Paste-ready bot setup", "Starts with a read-only dry run", "Asks before important actions", "Reports blockers honestly"],
    promptTitle: "Prompt generated from this case",
    copyPrompt: "Copy full prompt",
    openGrok: "Open Grok Bot",
    firstRun: "Tip: paste the prompt, then answer the Bot's questions. Its first run will be a preview and will not change your data.",
    customize: "Want to make it yours?",
    optional: "Optional",
    approvalLabel: "How far can the Bot go?",
    confirmChanges: "Ask me every time before changing anything",
    draftOnly: "Read, analyze and draft only, never change anything",
    privacy: "Anything you enter below stays in this browser. It only updates the prompt here and is not uploaded.",
    fields: [
      { key: "goal", label: "What do you really want?", placeholder: "Example: pick the ten most important emails each day" },
      { key: "dataScope", label: "What data can it use?", placeholder: "Example: work Gmail, last 30 days, exclude private labels" },
      { key: "destination", label: "Where should the result go?", placeholder: "Example: show it in chat, then export a file after I approve" },
      { key: "schedule", label: "When should it run?", placeholder: "Example: every weekday at 9 AM, Hong Kong time" },
      {
        key: "boundaries",
        label: "What must it never touch?",
        placeholder: "Example: never delete email, contact customers, pay or change account settings",
        multiline: true,
      },
    ],
  };
}
