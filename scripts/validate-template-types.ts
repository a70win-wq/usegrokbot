import catalogFile from "../data/templates-catalog.json";
import jaCatalogFile from "../data/templates-i18n-ja.json";
import { templateTeamCardCopy } from "../data/template-team-copy";
import { teamTemplates, templates } from "../data/templates";
import {
  reviewedTemplateTeamMode,
  templateTeamAssignments,
  templateTeamModes,
} from "../data/template-types";

type CatalogItem = {
  id: string;
  title: string;
  oneLiner: string;
  body: string;
};

function fail(message: string): never {
  throw new Error(message);
}

const catalog = catalogFile as CatalogItem[];
const catalogById = new Map(catalog.map((item) => [item.id, item]));
const jaCatalog = jaCatalogFile as Record<string, { title?: string; oneLiner?: string; body?: string }>;
const validModes = new Set<string>(templateTeamModes);
const locales = ["en", "zh-Hant", "zh-Hans", "ja"] as const;

for (const item of templates) {
  const localized = jaCatalog[item.id];
  if (!localized) fail("Japanese template copy is missing " + item.id);
  if (!localized.oneLiner?.trim() || !localized.body?.trim()) {
    fail("Japanese template copy is empty " + item.id);
  }
}

for (const [id, mode] of Object.entries(templateTeamAssignments)) {
  const item = catalogById.get(id);
  if (!item) fail("Team map contains an unknown catalog template " + id);
  if (!validModes.has(mode)) fail("Team template has an unknown mode " + id);

  const classified = reviewedTemplateTeamMode(item.id);
  if (classified !== mode) {
    fail("Team template classification does not match its reviewed decision " + id);
  }

  const cardCopy = templateTeamCardCopy[id];
  if (!cardCopy) fail("Team template has no clear card copy " + id);
  for (const locale of locales) {
    if (!cardCopy[locale]?.trim()) fail("Team template card copy is empty for " + id + " " + locale);
  }
}

for (const id of Object.keys(templateTeamCardCopy)) {
  if (!(id in templateTeamAssignments)) fail("Team card copy has no reviewed category " + id);
}

if (reviewedTemplateTeamMode("unreviewed-template")) {
  fail("An unreviewed template was classified as a team.");
}

const runtimeTeams = teamTemplates();
const runtimeTeamIds = new Set(runtimeTeams.map((item) => item.id));
for (const id of Object.keys(templateTeamAssignments)) {
  if (!runtimeTeamIds.has(id)) fail("Reviewed team template is missing at runtime " + id);
}

if (runtimeTeams.length !== Object.keys(templateTeamAssignments).length) {
  fail("Runtime includes a team template that has not been reviewed.");
}

for (const template of templates) {
  if (template.templateType === "team" && !(template.id in templateTeamAssignments)) {
    fail("Runtime includes an unreviewed team template " + template.id);
  }
}

const builders = teamTemplates("builder");
const orchestrators = teamTemplates("orchestrator");

if (builders.length + orchestrators.length !== runtimeTeams.length) {
  fail("A team template appears in more than one category.");
}
console.log("Template type validation passed.");
console.log("Runtime templates: " + templates.length);
console.log("Reviewed team templates: " + Object.keys(templateTeamAssignments).length);
console.log("Team templates shown: " + runtimeTeams.length);
console.log("Templates that build teams: " + builders.length);
console.log("Templates that coordinate Bots: " + orchestrators.length);
