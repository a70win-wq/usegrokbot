import assignmentsFile from "./template-team-assignments.json";
import type { Locale } from "@/lib/i18n/types";

export const templateTeamModes = ["builder", "orchestrator"] as const;

export type TemplateTeamMode = (typeof templateTeamModes)[number];
export type TemplateType = "single" | "team";
export type TemplateTypeFilter = "all" | TemplateType;

const validModes = new Set<string>(templateTeamModes);
const rawAssignments = assignmentsFile as Record<string, readonly string[]>;
const assignmentEntries: Array<[string, readonly TemplateTeamMode[]]> = [];

for (const [id, modes] of Object.entries(rawAssignments)) {
  if (!modes.length || modes.some((mode) => !validModes.has(mode))) {
    throw new Error(`Template ${id} has an invalid team mode.`);
  }
  if (new Set(modes).size !== modes.length) {
    throw new Error(`Template ${id} repeats a team mode.`);
  }
  assignmentEntries.push([id, modes as readonly TemplateTeamMode[]]);
}

const explicitModesById = new Map(assignmentEntries);

// Team labels are an editorial claim. Only reviewed public descriptions are
// allowed into this map; new templates stay single until their evidence is checked.
export function reviewedTemplateTeamModes(id: string): readonly TemplateTeamMode[] {
  return explicitModesById.get(id) ?? [];
}

export function templateTypeFromModes(modes: readonly TemplateTeamMode[]): TemplateType {
  return modes.length ? "team" : "single";
}

export const templateTeamAssignments = Object.fromEntries(
  assignmentEntries,
) as Readonly<Record<string, readonly TemplateTeamMode[]>>;

export const templateHubUiCopy = {
  en: {
    navLabel: "Template browsing",
    byRole: "By Identity",
    botTeams: "Bot Teams",
    allTemplates: "All Templates",
    teamTitle: "Bot Team Templates",
    teamIntro:
      "Start with one template to build several specialist Bots or coordinate the team you already have.",
    teamCount: "{n} verified team templates",
    teamListTitle: "Choose a team template",
    builderTitle: "Builds a team",
    builderBody: "Creates several Bots with distinct roles.",
    orchestratorTitle: "Coordinates Bots",
    orchestratorBody: "Routes each request to the right specialist Bot.",
    builderBadge: "Builds a Bot team",
    orchestratorBadge: "Coordinates Bots",
    evidenceNote:
      "Only templates whose public description clearly creates or coordinates multiple Bots appear here.",
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
    teamIntro: "從一個模板開始，建立多個專門 Bots，或管理你已有的 Bot 團隊。",
    teamCount: "{n} 個已確認的團隊模板",
    teamListTitle: "選擇一個團隊模板",
    builderTitle: "建立一隊 Bots",
    builderBody: "建立多個各有角色的 Bots。",
    orchestratorTitle: "協調多個 Bots",
    orchestratorBody: "把每個要求交給適合的專門 Bot。",
    builderBadge: "建立 Bot 團隊",
    orchestratorBadge: "協調多個 Bots",
    evidenceNote: "只有公開說明清楚顯示會建立或協調多個 Bots 的模板，才會出現在這裡。",
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
    teamIntro: "从一个模板开始，建立多个专门 Bots，或管理你已有的 Bot 团队。",
    teamCount: "{n} 个已确认的团队模板",
    teamListTitle: "选择一个团队模板",
    builderTitle: "建立一队 Bots",
    builderBody: "建立多个各有角色的 Bots。",
    orchestratorTitle: "协调多个 Bots",
    orchestratorBody: "把每个要求交给适合的专门 Bot。",
    builderBadge: "建立 Bot 团队",
    orchestratorBadge: "协调多个 Bots",
    evidenceNote: "只有公开说明清楚显示会建立或协调多个 Bots 的模板，才会出现在这里。",
    typeLabel: "模板类型",
    typeAll: "全部",
    typeSingle: "单一 Bot",
    typeTeam: "Bot 团队",
    filteredBody: "目前显示 {n} 个符合筛选条件的公开模板。",
    filterEmpty: "目前没有符合这些筛选条件的公开模板。",
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
