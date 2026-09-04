import assignmentsFile from "./template-team-assignments.json";
import type { Locale } from "@/lib/i18n/types";

export const templateTeamModes = ["builder", "orchestrator"] as const;

export type TemplateTeamMode = (typeof templateTeamModes)[number];
export type TemplateType = "single" | "team";
export type TemplateTypeFilter = "all" | TemplateType;

const validModes = new Set<string>(templateTeamModes);
const rawAssignments = assignmentsFile as Record<string, string>;
const assignmentEntries: Array<[string, TemplateTeamMode]> = [];

for (const [id, mode] of Object.entries(rawAssignments)) {
  if (!validModes.has(mode)) {
    throw new Error(`Template ${id} has an invalid team mode.`);
  }
  assignmentEntries.push([id, mode as TemplateTeamMode]);
}

const explicitModeById = new Map(assignmentEntries);

// Team labels are an editorial claim. Only reviewed public descriptions are
// allowed into this map; new templates stay single until their evidence is checked.
export function reviewedTemplateTeamMode(id: string): TemplateTeamMode | undefined {
  return explicitModeById.get(id);
}

export function templateTypeFromMode(mode: TemplateTeamMode | undefined): TemplateType {
  return mode ? "team" : "single";
}

export const templateTeamAssignments = Object.fromEntries(
  assignmentEntries,
) as Readonly<Record<string, TemplateTeamMode>>;

export const templateHubUiCopy = {
  en: {
    navLabel: "Template browsing",
    byRole: "By Identity",
    botTeams: "Bot Teams",
    allTemplates: "All Templates",
    teamTitle: "Bot Team Templates",
    teamIntro:
      "Choose your current situation: you do not have a Bot team yet, or you already have several Bots.",
    teamCount: "{n} verified team templates",
    categoryLabel: "Which situation are you in?",
    categoryCount: "{n} templates",
    builderTitle: "No Bot team yet",
    builderBody: "These templates create several Bots with different purposes for you.",
    orchestratorTitle: "Already have several Bots",
    orchestratorBody: "These templates assign each request to the most suitable Bot.",
    builderListTitle: "Templates that create Bots for you",
    orchestratorListTitle: "Templates that assign requests",
    evidenceNote:
      "Only templates whose public description clearly creates or manages multiple Bots appear here.",
    typeLabel: "Template type",
    typeAll: "All",
    typeSingle: "Single Bot",
    typeTeam: "Bot Team",
    filteredBody: "Showing {n} public templates that match these filters.",
    filterEmpty: "No public templates match these filters yet.",
  },
  "zh-Hant": {
    navLabel: "模板瀏覽方式",
    byRole: "按身份",
    botTeams: "Bot 團隊",
    allTemplates: "全部模板",
    teamTitle: "Bot 團隊模板",
    teamIntro: "先選擇你現在的情況：還沒有 Bot 團隊，或已經有多個 Bots。",
    teamCount: "{n} 個已確認的團隊模板",
    categoryLabel: "你現在是哪一種情況？",
    categoryCount: "{n} 個模板",
    builderTitle: "還沒有 Bot 團隊",
    builderBody: "這些模板會按你的需要，替你建立多個不同用途的 Bots。",
    orchestratorTitle: "已經有多個 Bots",
    orchestratorBody: "這些模板會把每件事交給最合適的 Bot。",
    builderListTitle: "會替你建立 Bots 的模板",
    orchestratorListTitle: "會替你分配事情的模板",
    evidenceNote: "只收錄清楚說明會建立或管理多個 Bots 的模板。",
    typeLabel: "模板類型",
    typeAll: "全部",
    typeSingle: "單一 Bot",
    typeTeam: "Bot 團隊",
    filteredBody: "目前顯示 {n} 個符合篩選條件的公開模板。",
    filterEmpty: "目前沒有符合這些篩選條件的公開模板。",
  },
  "zh-Hans": {
    navLabel: "模板浏览方式",
    byRole: "按身份",
    botTeams: "Bot 团队",
    allTemplates: "全部模板",
    teamTitle: "Bot 团队模板",
    teamIntro: "先选择你现在的情况：还没有 Bot 团队，或已经有多个 Bots。",
    teamCount: "{n} 个已确认的团队模板",
    categoryLabel: "你现在是哪一种情况？",
    categoryCount: "{n} 个模板",
    builderTitle: "还没有 Bot 团队",
    builderBody: "这些模板会按你的需要，替你建立多个不同用途的 Bots。",
    orchestratorTitle: "已经有多个 Bots",
    orchestratorBody: "这些模板会把每件事交给最合适的 Bot。",
    builderListTitle: "会替你建立 Bots 的模板",
    orchestratorListTitle: "会替你分配事情的模板",
    evidenceNote: "只收录清楚说明会建立或管理多个 Bots 的模板。",
    typeLabel: "模板类型",
    typeAll: "全部",
    typeSingle: "单一 Bot",
    typeTeam: "Bot 团队",
    filteredBody: "目前显示 {n} 个符合筛选条件的公开模板。",
    filterEmpty: "目前没有符合这些筛选条件的公开模板。",
  },
  ja: {
    navLabel: "テンプレートの探し方",
    byRole: "立場から",
    botTeams: "Bot Teams",
    allTemplates: "すべてのテンプレート",
    teamTitle: "Bot Team テンプレート",
    teamIntro:
      "今の状況を選んでください。まだ Bot チームがないか、すでに複数の Bots があるか。",
    teamCount: "確認済みのチームテンプレート {n} 件",
    categoryLabel: "今はどの状況ですか？",
    categoryCount: "{n} 件のテンプレート",
    builderTitle: "まだ Bot チームがない",
    builderBody: "これらのテンプレートは、用途の違う複数の Bots を代わりに作ります。",
    orchestratorTitle: "すでに複数の Bots がある",
    orchestratorBody: "これらのテンプレートは、一件ずつ一番合う Bot に渡します。",
    builderListTitle: "Bots を代わりに作るテンプレート",
    orchestratorListTitle: "依頼を振り分けるテンプレート",
    evidenceNote:
      "公開説明が、複数の Bots を作るか管理すると明記しているテンプレートだけを載せています。",
    typeLabel: "テンプレートの種類",
    typeAll: "すべて",
    typeSingle: "Single Bot",
    typeTeam: "Bot Team",
    filteredBody: "この条件に合う公開テンプレート {n} 件を表示しています。",
    filterEmpty: "この条件に合う公開テンプレートはまだありません。",
  },
} satisfies Record<Locale, Record<string, string>>;

export function interpolateTemplateHubCopy(
  value: string,
  vars: Record<string, string | number>,
) {
  return value.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] === undefined ? `{${key}}` : String(vars[key]),
  );
}
