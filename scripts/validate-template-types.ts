import catalogFile from "../data/templates-catalog.json";
import { teamTemplates, templates } from "../data/templates";
import {
  reviewedTemplateTeamModes,
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
const validModes = new Set<string>(templateTeamModes);

for (const [id, modes] of Object.entries(templateTeamAssignments)) {
  const item = catalogById.get(id);
  if (!item) fail("Team map contains an unknown catalog template " + id);
  if (!modes.length) fail("Team template has no team mode " + id);
  if (new Set(modes).size !== modes.length) fail("Team template repeats a mode " + id);
  if (modes.some((mode) => !validModes.has(mode))) fail("Team template has an unknown mode " + id);

  const classified = reviewedTemplateTeamModes(item.id);
  if (classified.join(",") !== modes.join(",")) {
    fail("Team template classification does not match its reviewed decision " + id);
  }
}

if (reviewedTemplateTeamModes("unreviewed-template").length) {
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
console.log("Template type validation passed.");
console.log("Runtime templates: " + templates.length);
console.log("Reviewed team templates: " + Object.keys(templateTeamAssignments).length);
console.log("Team templates shown: " + runtimeTeams.length);
console.log("Templates that build teams: " + builders.length);
console.log("Templates that coordinate Bots: " + orchestrators.length);
