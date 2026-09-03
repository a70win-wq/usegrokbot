import catalogFile from "../data/templates-catalog.json";
import {
  getTemplateIdentity,
  identitySlugsForTemplate,
  primaryIdentitySlugs,
  templateIdentityAssignments,
  templateIdentitySlugs,
  templateIdentityStoryAssignments,
  templatesForIdentity,
} from "../data/template-identities";
import { templates } from "../data/templates";

type CatalogItem = { id: string };

function fail(message: string): never {
  throw new Error(message);
}

const catalogIds = new Set((catalogFile as CatalogItem[]).map((item) => item.id));
const assignmentIds = new Set(Object.keys(templateIdentityAssignments));
const storyAssignmentIds = new Set(Object.keys(templateIdentityStoryAssignments));
const runtimeIds = new Set(templates.map((template) => template.id));
const validSlugs = new Set<string>(templateIdentitySlugs);
const reservedTemplateRoutes = ["all", "teams"];

for (const slug of reservedTemplateRoutes) {
  if (validSlugs.has(slug)) fail("Identity slug conflicts with reserved template route " + slug);
}

function validateAssignment(id: string, slugs: readonly string[]) {
  if (slugs.length > 2) fail("Template " + id + " has more than two identities.");
  for (const slug of slugs) {
    if (!validSlugs.has(slug)) fail("Template " + id + " has unknown identity " + slug);
  }
}

if (catalogIds.size !== assignmentIds.size) {
  fail("Every catalog template must have an identity decision, including an empty decision.");
}

for (const id of catalogIds) {
  if (!assignmentIds.has(id)) fail("Missing identity decision for template " + id);
}

for (const id of assignmentIds) {
  if (!catalogIds.has(id)) fail("Identity map contains an unknown template " + id);
  validateAssignment(id, templateIdentityAssignments[id]);
}

for (const id of runtimeIds) {
  if (!catalogIds.has(id) && !storyAssignmentIds.has(id)) {
    fail("Missing identity decision for story-only template " + id);
  }
}

for (const id of storyAssignmentIds) {
  if (!runtimeIds.has(id)) fail("Story identity map contains an unknown template " + id);
  if (catalogIds.has(id)) fail("Story identity map duplicates catalog template " + id);
  validateAssignment(id, templateIdentityStoryAssignments[id]);
}

for (const slug of primaryIdentitySlugs) {
  if (!getTemplateIdentity(slug)) fail("Missing definition for identity " + slug);
  if (templatesForIdentity(slug).length === 0) fail("Primary identity is empty: " + slug);
}

const requiredXCreatorIds = [
  "GkX6X536UK2MlbkfGLQnb",
  "JZAccYtlRFvDSU2CnMnkZ",
  "HU7XArfGhUgLnzVcr7neB",
];
const excludedXCreatorIds = [
  "s6JVFYDIDMsCQMBeTcznW",
  "NQQjXITgX9V7WjaDh9Vzb",
  "Q2shbC8RRmoRleIyr5J33",
  "3U6zxtPa1b8GbWheaIr4J",
  "uY_7s1TZILVzUeJ9lLOx9",
];
const xCreatorIds = new Set(templatesForIdentity("x-creator").map((item) => item.id));

for (const id of requiredXCreatorIds) {
  if (!xCreatorIds.has(id)) fail("X creator is missing required template " + id);
}

for (const id of excludedXCreatorIds) {
  if (xCreatorIds.has(id)) fail("X creator includes an excluded template " + id);
}

const assigned = templates.filter((template) => identitySlugsForTemplate(template).length > 0);
const unassigned = templates.length - assigned.length;

console.log("Template identity validation passed.");
console.log("Catalog decisions: " + assignmentIds.size);
console.log("Story-only decisions: " + storyAssignmentIds.size);
console.log("Runtime templates: " + templates.length);
console.log("Runtime templates with an identity: " + assigned.length);
console.log("Runtime templates left unclassified: " + unassigned);
for (const slug of primaryIdentitySlugs) {
  console.log(slug + ": " + templatesForIdentity(slug).length);
}
