import assert from "node:assert/strict";
import { bookmarkUiCopy } from "../data/bookmarks";
import { officialUseCases } from "../data/official-use-cases";
import { templateHubUiCopy } from "../data/template-types";
import { templateIdentityUiCopy } from "../data/template-identities";
import { botTeamsPageCopy } from "../lib/i18n/bot-teams";
import { jaMessages } from "../lib/i18n/messages-ja";
import { localizeOfficial } from "../lib/i18n/official";
import { buildPromptFromCase } from "../lib/prompts/from-discover";
import { verifiedUseCasesPageCopy } from "../lib/i18n/verified-use-cases";

const forbiddenUiPhrases = [
  "How people use Grok Bot",
  "Use Case",
  "Use Cases",
  "Templates",
  "Bot Team",
  "Bot Teams",
  "Single Bot",
  "xAI Roles",
  "By Identity",
  "Top 10",
  "Top 20",
];

function collectStrings(value: unknown, path = "root", output: Array<[string, string]> = []) {
  if (typeof value === "string") output.push([path, value]);
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectStrings(item, `${path}.${index}`, output));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => collectStrings(item, `${path}.${key}`, output));
  }
  return output;
}

const uiCopy = {
  messages: jaMessages,
  bookmarks: bookmarkUiCopy.ja,
  templateHub: templateHubUiCopy.ja,
  templateIdentity: templateIdentityUiCopy.ja,
  botTeams: botTeamsPageCopy("ja"),
  useCases: verifiedUseCasesPageCopy("ja"),
};

for (const [path, value] of collectStrings(uiCopy)) {
  for (const phrase of forbiddenUiPhrases) {
    assert.ok(!value.includes(phrase), `Japanese UI contains "${phrase}" at ${path}: ${value}`);
  }
}

for (const item of officialUseCases) {
  const localized = localizeOfficial(item, "ja");
  assert.notEqual(localized.title, item.title, `Japanese role title is not translated: ${item.slug}`);
  assert.match(localized.title, /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u);
  if (item.guide) {
    assert.notEqual(
      localized.guide?.startWith,
      item.guide.startWith,
      `Japanese first request is not translated: ${item.slug}`,
    );
  }
}

const samplePrompt = buildPromptFromCase(
  "ja",
  {
    title: "メール整理 Bot",
    headline: "受信箱を整理する",
    whatTheyDid: "不要なメールを整理しました。",
    howItWorks: "許可した受信箱だけを確認します。",
    appNames: ["Gmail"],
    category: "operations",
    schedule: "one-time",
  },
  {
    goal: "",
    dataScope: "",
    destination: "",
    schedule: "",
    boundaries: "",
    approvalMode: "confirm-changes",
  },
);

assert.match(samplePrompt, /新しい Bot|設定してください/);
assert.ok(!samplePrompt.includes("Do the work in this order"), "Japanese prompt fell back to English");
assert.ok(!samplePrompt.includes("Human approval"), "Japanese prompt has an English approval heading");

console.log("Japanese translation validation passed.");
console.log(`Checked ${collectStrings(uiCopy).length} Japanese UI strings and ${officialUseCases.length} official roles.`);
