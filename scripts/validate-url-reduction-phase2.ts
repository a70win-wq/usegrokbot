import { existsSync, readFileSync } from "node:fs";
import sitemap from "../app/sitemap";
import nextConfig, { configuredRedirects } from "../next.config";
import { botTeams } from "../data/bot-teams";
import {
  discoverStories,
  discoverStoryDestination,
  shouldIndexDiscoverStory,
} from "../data/discover";
import { retainedDiscoverSlugs } from "../data/retained-discover";
import {
  retiredBotTeamSlugs,
  retiredScenarioSlugs,
} from "../data/retired-use-case-slugs";
import { scenarios } from "../data/scenarios";
import { templates } from "../data/templates";
import { topicSlugs } from "../data/topics";
import { appSlugs } from "../data/types";
import { verifiedUseCases } from "../data/verified-use-cases";
import { retiredDiscoverRedirects } from "../lib/retired-discover-redirects";
import {
  legacyPageRedirects,
  urlReductionRedirects,
} from "../lib/url-reduction-redirects";

const EXPECTED_DISCOVER = 1_804;
const EXPECTED_RETAINED_DISCOVER = 88;
const EXPECTED_EXTERNAL_DISCOVER = 1_716;
const EXPECTED_TEMPLATES = 209;
const EXPECTED_VERIFIED_USE_CASES = 28;
const EXPECTED_OLD_BOT_TEAMS = 48;
const EXPECTED_OLD_SCENARIOS = 24;
const EXPECTED_COMMUNITY_HANDLES = 1_273;
const EXPECTED_SITEMAP_URLS = 462;
const EXPECTED_CONFIGURED_REDIRECTS = 259;
const EXPECTED_LEGACY_PAGE_REDIRECTS = 14;
const EXPECTED_URL_REDUCTION_REDIRECTS = 244;
const LOCALES = ["en", "zh-hk", "zh-cn"] as const;
const localePattern = ":locale(en|zh-hk|zh-cn)";

const errors: string[] = [];
const redirectRules = configuredRedirects();

function check(condition: unknown, message: string) {
  if (!condition) errors.push(message);
}

function expectRedirect(source: string, destination: string) {
  const found = redirectRules.some(
    (rule) =>
      rule.source === source &&
      rule.destination === destination &&
      rule.permanent === true,
  );
  check(found, `Missing permanent redirect: ${source} -> ${destination}`);
}

function expectLocalizedAndDefaultRedirect(
  path: string,
  localizedDestination: string,
  defaultDestination: string,
) {
  expectRedirect(`/${localePattern}${path}`, localizedDestination);
  expectRedirect(path, defaultDestination);
}

const retained = discoverStories.filter(shouldIndexDiscoverStory);
const externalOnly = discoverStories.filter((story) => !shouldIndexDiscoverStory(story));
const retainedSet = new Set<string>(retainedDiscoverSlugs);
const verifiedSet = new Set(verifiedUseCases.map((item) => item.slug));
const oldBotTeams = botTeams.filter((item) => !verifiedSet.has(item.slug));
const handles = new Set(
  discoverStories
    .filter((story) => story.source === "community")
    .map((story) => story.handle?.trim().replace(/^@/, "").toLowerCase())
    .filter((handle): handle is string => Boolean(handle)),
);

check(discoverStories.length === EXPECTED_DISCOVER, `Discover must be ${EXPECTED_DISCOVER}, found ${discoverStories.length}`);
check(retained.length === EXPECTED_RETAINED_DISCOVER, `Retained Discover must be ${EXPECTED_RETAINED_DISCOVER}, found ${retained.length}`);
check(externalOnly.length === EXPECTED_EXTERNAL_DISCOVER, `External Discover must be ${EXPECTED_EXTERNAL_DISCOVER}, found ${externalOnly.length}`);
check(retainedSet.size === EXPECTED_RETAINED_DISCOVER, "Retained Discover list has duplicates");
check(retained.every((story) => retainedSet.has(story.slug)), "Runtime retained set differs from the reviewed list");
check(templates.length === EXPECTED_TEMPLATES, `Templates must be ${EXPECTED_TEMPLATES}, found ${templates.length}`);
check(verifiedUseCases.length === EXPECTED_VERIFIED_USE_CASES, `Verified Use Cases must be ${EXPECTED_VERIFIED_USE_CASES}, found ${verifiedUseCases.length}`);
check(oldBotTeams.length === EXPECTED_OLD_BOT_TEAMS, `Old Bot Teams must be ${EXPECTED_OLD_BOT_TEAMS}, found ${oldBotTeams.length}`);
check(scenarios.length === EXPECTED_OLD_SCENARIOS, `Old scenarios must be ${EXPECTED_OLD_SCENARIOS}, found ${scenarios.length}`);
check(
  oldBotTeams.every((item) => retiredBotTeamSlugs.includes(item.slug as (typeof retiredBotTeamSlugs)[number])),
  "Retired Bot Team redirect list differs from the data",
);
check(
  scenarios.every((item) => retiredScenarioSlugs.includes(item.slug as (typeof retiredScenarioSlugs)[number])),
  "Retired scenario redirect list differs from the data",
);
check(handles.size === EXPECTED_COMMUNITY_HANDLES, `Community handles must be ${EXPECTED_COMMUNITY_HANDLES}, found ${handles.size}`);
check(topicSlugs.length === 17, `Topics must be 17, found ${topicSlugs.length}`);
check(appSlugs.length === 13, `Apps must be 13, found ${appSlugs.length}`);
check(nextConfig.redirects === configuredRedirects, "Next config is not using the validated redirect list");
check(redirectRules.length === EXPECTED_CONFIGURED_REDIRECTS, `Configured redirects must be ${EXPECTED_CONFIGURED_REDIRECTS}, found ${redirectRules.length}`);
check(legacyPageRedirects().length === EXPECTED_LEGACY_PAGE_REDIRECTS, `Legacy page redirects must be ${EXPECTED_LEGACY_PAGE_REDIRECTS}, found ${legacyPageRedirects().length}`);
check(urlReductionRedirects().length === EXPECTED_URL_REDUCTION_REDIRECTS, `URL reduction redirects must be ${EXPECTED_URL_REDUCTION_REDIRECTS}, found ${urlReductionRedirects().length}`);
check(new Set(redirectRules.map((rule) => rule.source)).size === redirectRules.length, "Configured redirects contain duplicate sources");

const redirectEntries = Object.entries(retiredDiscoverRedirects);
check(redirectEntries.length === externalOnly.length, `Discover redirect map must have ${externalOnly.length} entries, found ${redirectEntries.length}`);
for (const story of externalOnly) {
  const destination = discoverStoryDestination(story);
  check(/^https?:\/\//.test(destination), `External Discover destination is invalid: ${story.slug}`);
  check(retiredDiscoverRedirects[story.slug] === destination, `Discover redirect is stale: ${story.slug}`);
}
for (const story of retained) {
  check(discoverStoryDestination(story) === `/discover/${story.slug}`, `Retained Discover points outside: ${story.slug}`);
  check(!(story.slug in retiredDiscoverRedirects), `Retained Discover appears in redirect map: ${story.slug}`);
}

expectLocalizedAndDefaultRedirect("/official", "/:locale/roles", "/en/roles");
for (const path of ["/prompts", "/saved", "/discover", "/rankings", "/learn"]) {
  expectLocalizedAndDefaultRedirect(path, "/:locale", "/en");
}
expectLocalizedAndDefaultRedirect("/learn/:slug", "/:locale", "/en");
expectLocalizedAndDefaultRedirect("/categories", "/:locale", "/en");
for (const slug of topicSlugs) {
  expectLocalizedAndDefaultRedirect(`/categories/${slug}`, `/:locale?topic=${slug}`, `/en?topic=${slug}`);
}
expectLocalizedAndDefaultRedirect("/categories/customer-support", "/:locale?topic=operations", "/en?topic=operations");
expectLocalizedAndDefaultRedirect("/categories/hr", "/:locale?topic=operations", "/en?topic=operations");
expectLocalizedAndDefaultRedirect("/categories/productivity", "/:locale?topic=personal", "/en?topic=personal");
expectLocalizedAndDefaultRedirect("/integrations", "/:locale", "/en");
expectLocalizedAndDefaultRedirect("/apps", "/:locale", "/en");
for (const slug of appSlugs) {
  expectLocalizedAndDefaultRedirect(`/integrations/${slug}`, `/:locale?app=${slug}`, `/en?app=${slug}`);
  expectLocalizedAndDefaultRedirect(`/apps/${slug}`, `/:locale?app=${slug}`, `/en?app=${slug}`);
}
expectLocalizedAndDefaultRedirect("/community/:handle", "https://x.com/:handle", "https://x.com/:handle");
for (const team of oldBotTeams) {
  expectLocalizedAndDefaultRedirect(`/use-cases/${team.slug}`, "/:locale/templates/teams", "/en/templates/teams");
}
for (const scenario of scenarios) {
  expectLocalizedAndDefaultRedirect(`/use-cases/${scenario.slug}`, "/:locale/use-cases", "/en/use-cases");
}

const sitemapEntries = sitemap();
const sitemapUrls = new Set(sitemapEntries.map((entry) => entry.url));
check(sitemapEntries.length === EXPECTED_SITEMAP_URLS, `Sitemap must have ${EXPECTED_SITEMAP_URLS} URLs, found ${sitemapEntries.length}`);
check(sitemapUrls.size === sitemapEntries.length, "Sitemap contains duplicate URLs");

for (const locale of LOCALES) {
  const base = `https://usegrokbot.com/${locale}`;
  check(sitemapUrls.has(`${base}/community`), `Sitemap missing ${locale} community page`);
  for (const story of retained) {
    check(sitemapUrls.has(`${base}/discover/${story.slug}`), `Sitemap missing retained Discover: ${locale}/${story.slug}`);
  }
  for (const item of verifiedUseCases) {
    check(sitemapUrls.has(`${base}/use-cases/${item.slug}`), `Sitemap missing verified Use Case: ${locale}/${item.slug}`);
  }
  for (const scenario of scenarios) {
    check(!sitemapUrls.has(`${base}/use-cases/${scenario.slug}`), `Sitemap still contains old scenario: ${locale}/${scenario.slug}`);
  }
}

for (const entry of sitemapEntries) {
  const pathname = new URL(entry.url).pathname;
  check(!pathname.includes("/categories"), `Sitemap contains category URL: ${pathname}`);
  check(!pathname.includes("/integrations"), `Sitemap contains integration URL: ${pathname}`);
  check(!/^\/(en|zh-hk|zh-cn)\/community\/.+/.test(pathname), `Sitemap contains community profile: ${pathname}`);
}

const removedRoutes = [
  "app/[locale]/categories/page.tsx",
  "app/[locale]/categories/[slug]/page.tsx",
  "app/[locale]/categories/layout.tsx",
  "app/[locale]/integrations/page.tsx",
  "app/[locale]/integrations/[slug]/page.tsx",
  "app/[locale]/integrations/layout.tsx",
  "app/[locale]/community/[handle]/page.tsx",
  "app/[locale]/discover/page.tsx",
  "app/[locale]/rankings/page.tsx",
  "app/[locale]/rankings/layout.tsx",
  "components/BotTeamDetailView.tsx",
  "components/CategoryDetailView.tsx",
  "components/DiscoverIndexView.tsx",
  "components/IntegrationDetailView.tsx",
  "components/RankingsView.tsx",
  "components/UseCaseDetailView.tsx",
];
for (const path of removedRoutes) check(!existsSync(path), `Retired route still exists: ${path}`);

const footer = readFileSync("components/Footer.tsx", "utf8");
check(!footer.includes('href: "/categories"'), "Footer still links to /categories");

const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
  scripts?: Record<string, string>;
};
check(packageJson.scripts?.predev === "npm run generate:discover-redirects", "Dev does not refresh retired Discover redirects");

const ci = readFileSync(".github/workflows/ci.yml", "utf8");
check(ci.includes("npm run validate:url-phase1"), "CI does not run phase 1 URL validation");
check(ci.includes("npm run validate:url-phase2"), "CI does not run phase 2 URL validation");

if (errors.length) {
  console.error(`Phase 2 URL reduction validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Validated phase 2: ${discoverStories.length} Discover (${retained.length} retained, ${externalOnly.length} redirected), ${templates.length} Templates, ${verifiedUseCases.length} verified Use Cases, ${oldBotTeams.length} old Bot Teams, ${scenarios.length} old scenarios, and ${sitemapEntries.length} sitemap URLs.`,
);
