import { getDiscoverStory } from "../data/discover";
import {
  verifiedUseCaseCategories,
  verifiedUseCases,
} from "../data/verified-use-cases";
import { localizeVerifiedUseCase } from "../lib/i18n/verified-use-cases";
import { getVerifiedUseCasePrompt } from "../lib/verified-use-case-sources";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

assert(verifiedUseCases.length === 28, `Expected 28 verified Use Cases, found ${verifiedUseCases.length}`);
assert(new Set(verifiedUseCases.map((item) => item.slug)).size === verifiedUseCases.length, "Use Case slugs must be unique");
assert(new Set(verifiedUseCases.map((item) => item.primarySourceSlug)).size === verifiedUseCases.length, "Primary sources must be unique");

const expectedRanks = Array.from({ length: verifiedUseCases.length }, (_, index) => index + 1);
assert(
  JSON.stringify(verifiedUseCases.map((item) => item.rank)) === JSON.stringify(expectedRanks),
  "Use Case ranks must run from 1 to 28",
);

for (const category of verifiedUseCaseCategories) {
  assert(verifiedUseCases.some((item) => item.category === category), `Empty Use Case category: ${category}`);
}

for (const item of verifiedUseCases) {
  const source = getDiscoverStory(item.primarySourceSlug);
  assert(source, `Missing primary source for ${item.slug}: ${item.primarySourceSlug}`);
  for (const supportingSlug of item.supportingSourceSlugs) {
    assert(getDiscoverStory(supportingSlug), `Missing supporting source for ${item.slug}: ${supportingSlug}`);
  }

  const visibleCopy = [
    item.title.en,
    item.title.zhHant,
    ...(item.setupSteps ?? []).flatMap((step) => [step.en, step.zhHant]),
    ...(item.teamRoles ?? []).flatMap((role) => [role.name, role.purpose.en, role.purpose.zhHant]),
  ];
  assert(!visibleCopy.some((value) => /[—–]/.test(value)), `Visible copy uses an em or en dash: ${item.slug}`);
  assert(!visibleCopy.some((value) => value.includes("工作")), `Chinese bot copy uses 工作: ${item.slug}`);

  const setupCopy = item.setupSteps ?? [];
  assert(
    new Set(setupCopy.map((step) => step.en.trim())).size === setupCopy.length &&
      new Set(setupCopy.map((step) => step.zhHant.trim())).size === setupCopy.length,
    `Use Case repeats a setup explanation: ${item.slug}`,
  );

  const roles = item.teamRoles ?? [];
  if (item.structure === "team") {
    assert(roles.length >= 2, `Bot Team Use Case needs at least two sourced roles: ${item.slug}`);
  } else {
    assert(roles.length === 0, `Single Bot Use Case should not include team roles: ${item.slug}`);
  }
  assert(new Set(roles.map((role) => role.name)).size === roles.length, `Use Case repeats a Bot role: ${item.slug}`);
  assert(
    new Set(roles.map((role) => role.purpose.en.trim())).size === roles.length &&
      new Set(roles.map((role) => role.purpose.zhHant.trim())).size === roles.length,
    `Use Case repeats a Bot explanation: ${item.slug}`,
  );

  const simplified = localizeVerifiedUseCase(item, "zh-Hans");
  const simplifiedCopy = [
    simplified.title,
    ...simplified.setupSteps,
    ...simplified.teamRoles.map((role) => role.purpose),
  ].join("\n");
  assert(
    !/[隻筆腦夾滿簽雲礙東車鬧鐘蹤銀沒遲併剛閉兩壞訴載齊償爭親遞複頻賽熱誰機談麼潛邊遠額敗階]/.test(
      simplifiedCopy,
    ),
    `Simplified Chinese copy still contains a Traditional character: ${item.slug}`,
  );

  const prompt = getVerifiedUseCasePrompt(item.primarySourceSlug);
  if (item.evidence === "prompt") {
    assert(prompt, `Prompt evidence has no extracted prompt: ${item.slug}`);
    const sourceText = `${source.body ?? ""}\n${source.whatTheyDid ?? ""}`;
    assert(sourceText.includes(prompt), `Extracted prompt is not verbatim source text: ${item.slug}`);
  } else {
    assert(!prompt, `Setup-only Use Case unexpectedly has a prompt: ${item.slug}`);
    assert(item.setupSteps && item.setupSteps.length >= 2, `Setup Use Case needs at least two source-backed steps: ${item.slug}`);
    assert(item.setupSteps.length <= 6, `Setup Use Case has too many steps: ${item.slug}`);
  }
}

const promptCount = verifiedUseCases.filter((item) => item.evidence === "prompt").length;
const setupCount = verifiedUseCases.filter((item) => item.evidence === "setup").length;
const singleCount = verifiedUseCases.filter((item) => item.structure === "single").length;
const teamCount = verifiedUseCases.filter((item) => item.structure === "team").length;

assert(promptCount === 12 && setupCount === 16, `Expected 12 prompts and 16 setups, found ${promptCount}/${setupCount}`);
assert(singleCount === 21 && teamCount === 7, `Expected 21 Single Bot and 7 Bot Team cases, found ${singleCount}/${teamCount}`);

console.log(`Verified ${verifiedUseCases.length} Use Cases: ${promptCount} prompts, ${setupCount} setups, ${singleCount} single, ${teamCount} team.`);
