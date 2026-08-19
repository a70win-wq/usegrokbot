import type { AppSlug, UseCase } from "@/data/types";

const loginApps = new Set<AppSlug>([
  "gmail",
  "google-sheets",
  "google-calendar",
  "slack",
  "notion",
  "github",
  "salesforce",
  "hubspot",
  "linkedin",
]);

const writeApps = new Set<AppSlug>(["gmail", "salesforce", "hubspot", "slack"]);

export type LoginNeed = "yes" | "maybe" | "no";
export type ApprovalNeed = "recommended" | "optional";

export function capabilitiesFor(useCase: UseCase) {
  const tools = [...useCase.apps, ...(useCase.alsoUses ?? [])];
  const needsBrowser = tools.includes("browser");
  const needsLogin = tools.some((app) => loginApps.has(app));
  const writes = tools.some((app) => writeApps.has(app));

  return {
    needsBrowser,
    loginRequired: (needsLogin ? "yes" : needsBrowser ? "maybe" : "no") as LoginNeed,
    supportsRoutine: useCase.schedule !== "one-time",
    humanApproval: (writes ? "recommended" : "optional") as ApprovalNeed,
  };
}

export function displayApps(useCase: UseCase) {
  return [...useCase.apps, ...(useCase.alsoUses ?? [])];
}
