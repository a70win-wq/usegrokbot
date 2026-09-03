import assert from "node:assert/strict";
import {
  botTeamCategorySlugs,
  botTeams,
  verifiedBotTeamPostCount,
} from "../data/bot-teams";
import { discoverStories, getDiscoverStory } from "../data/discover";
import { catalogEntry } from "../data/templates";
import { localizeBotTeam } from "../lib/i18n/bot-teams";

const teamSlugs = botTeams.map((team) => team.slug);
const sourceSlugs = botTeams.flatMap((team) => team.exampleSlugs);
const sourceUrls: string[] = [];
const categoryCounts = new Map<string, number>();
const englishOutcomes = botTeams.map((team) => localizeBotTeam(team, "en").outcome);
const traditionalChineseOutcomes = botTeams.map((team) => localizeBotTeam(team, "zh-Hant").outcome);

assert.equal(new Set(teamSlugs).size, teamSlugs.length, "Bot Team slugs must be unique");
assert.equal(new Set(sourceSlugs).size, sourceSlugs.length, "Each source post should map to one Bot Team");
assert.equal(new Set(englishOutcomes).size, botTeams.length, "English outcomes must be unique");
assert.equal(new Set(traditionalChineseOutcomes).size, botTeams.length, "Chinese outcomes must be unique");
assert.ok(traditionalChineseOutcomes.every((outcome) => !outcome.includes("工作")), "Chinese outcomes must describe what each Bot helps with");
assert.equal(verifiedBotTeamPostCount, sourceSlugs.length, "The verified source count must match the source map");
assert.deepEqual(
  botTeams.map((team) => team.rank),
  botTeams.map((_, index) => index + 1),
  "Bot Team ranks must stay sequential",
);

for (const team of botTeams) {
  assert.ok(botTeamCategorySlugs.includes(team.category), `${team.slug} has an unknown category`);
  assert.ok(team.botCount >= 2, `${team.slug} must contain at least two Bots`);
  assert.ok(team.roles.length >= 2, `${team.slug} needs at least two visible roles`);
  assert.ok(team.exampleSlugs.length > 0, `${team.slug} needs at least one source post`);
  assert.ok(team.templateIds.length > 0, `${team.slug} needs at least one real Template`);

  const representedBotCount = team.roles.reduce((total, role) => total + (role.count ?? 1), 0);
  assert.ok(
    representedBotCount <= team.botCount,
    `${team.slug} shows more Bots in its roles than the source total`,
  );

  for (const sourceSlug of team.exampleSlugs) {
    const story = getDiscoverStory(sourceSlug);
    assert.ok(story, `${team.slug} references missing source ${sourceSlug}`);
    sourceUrls.push(story.xPostUrl ?? story.sourceUrl);
  }

  assert.equal(
    new Set(team.templateIds).size,
    team.templateIds.length,
    `${team.slug} repeats a Template`,
  );
  for (const templateId of team.templateIds) {
    assert.ok(catalogEntry(templateId), `${team.slug} references missing Template ${templateId}`);
  }

  categoryCounts.set(team.category, (categoryCounts.get(team.category) ?? 0) + 1);
}

assert.equal(new Set(sourceUrls).size, sourceUrls.length, "Selected source posts must not repeat the same URL");
for (const category of botTeamCategorySlugs) {
  assert.ok((categoryCounts.get(category) ?? 0) > 0, `${category} needs at least one Bot Team`);
}

console.log(
  `Validated ${botTeams.length} Bot Teams in ${botTeamCategorySlugs.length} categories, mapped to ${sourceSlugs.length} unique sources from ${discoverStories.length} posts.`,
);
