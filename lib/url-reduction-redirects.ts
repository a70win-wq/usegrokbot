import {
  retiredBotTeamSlugs,
  retiredScenarioSlugs,
} from "../data/retired-use-case-slugs";
import { topicSlugs } from "../data/topics";
import { appSlugs } from "../data/types";
import { URL_LOCALE_PATTERN } from "./i18n/paths";

const locale = `:locale(${URL_LOCALE_PATTERN})`;

function permanentRedirect(source: string, destination: string) {
  return { source, destination, permanent: true as const };
}

function legacyPageRedirectsFor(sourcePrefix: string, destinationPrefix: string) {
  return [
    permanentRedirect(`${sourcePrefix}/official`, `${destinationPrefix}/roles`),
    permanentRedirect(`${sourcePrefix}/prompts`, destinationPrefix),
    permanentRedirect(`${sourcePrefix}/saved`, destinationPrefix),
    permanentRedirect(`${sourcePrefix}/discover`, destinationPrefix),
    permanentRedirect(`${sourcePrefix}/rankings`, destinationPrefix),
    permanentRedirect(`${sourcePrefix}/learn`, destinationPrefix),
    permanentRedirect(`${sourcePrefix}/learn/:slug`, destinationPrefix),
  ];
}

function urlReductionRedirectsFor(sourcePrefix: string, destinationPrefix: string) {
  return [
    permanentRedirect(`${sourcePrefix}/categories`, destinationPrefix),
    ...topicSlugs.map((slug) =>
      permanentRedirect(`${sourcePrefix}/categories/${slug}`, `${destinationPrefix}?topic=${slug}`),
    ),
    permanentRedirect(`${sourcePrefix}/categories/customer-support`, `${destinationPrefix}?topic=operations`),
    permanentRedirect(`${sourcePrefix}/categories/hr`, `${destinationPrefix}?topic=operations`),
    permanentRedirect(`${sourcePrefix}/categories/productivity`, `${destinationPrefix}?topic=personal`),
    permanentRedirect(`${sourcePrefix}/integrations`, destinationPrefix),
    permanentRedirect(`${sourcePrefix}/apps`, destinationPrefix),
    ...appSlugs.map((slug) =>
      permanentRedirect(`${sourcePrefix}/integrations/${slug}`, `${destinationPrefix}?app=${slug}`),
    ),
    ...appSlugs.map((slug) =>
      permanentRedirect(`${sourcePrefix}/apps/${slug}`, `${destinationPrefix}?app=${slug}`),
    ),
    permanentRedirect(`${sourcePrefix}/community/:handle`, "https://x.com/:handle"),
    ...retiredBotTeamSlugs.map((slug) =>
      permanentRedirect(`${sourcePrefix}/use-cases/${slug}`, `${destinationPrefix}/templates/teams`),
    ),
    ...retiredScenarioSlugs.map((slug) =>
      permanentRedirect(`${sourcePrefix}/use-cases/${slug}`, `${destinationPrefix}/use-cases`),
    ),
  ];
}

export function legacyPageRedirects() {
  return [
    ...legacyPageRedirectsFor(`/${locale}`, "/:locale"),
    ...legacyPageRedirectsFor("", "/en"),
  ];
}

export function urlReductionRedirects() {
  return [
    ...urlReductionRedirectsFor(`/${locale}`, "/:locale"),
    ...urlReductionRedirectsFor("", "/en"),
  ];
}
