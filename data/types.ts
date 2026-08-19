export const categorySlugs = [
  "sales",
  "marketing",
  "content",
  "research",
  "operations",
  "customer-support",
  "hr",
  "coding",
  "finance",
  "productivity",
] as const;

export type CategorySlug = (typeof categorySlugs)[number];

export const appSlugs = [
  "browser",
  "gmail",
  "google-sheets",
  "google-calendar",
  "slack",
  "notion",
  "github",
  "salesforce",
  "hubspot",
  "linkedin",
  "x",
  "reddit",
  "youtube",
] as const;

export type AppSlug = (typeof appSlugs)[number];

export type Difficulty = "easy" | "medium" | "advanced";
export type Schedule = "one-time" | "daily" | "weekly" | "always-on";
export type OutputStatus = "alert" | "watch" | "ok";

export type ExampleItem = {
  name: string;
  status: OutputStatus;
  summary: string;
  why?: string;
  action?: string;
};

export type CustomizeField = {
  key: string;
  label: string;
  placeholder: string;
};

export type UseCase = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  problem: string;
  category: CategorySlug;
  tags: string[];
  apps: AppSlug[];
  difficulty: Difficulty;
  schedule: Schedule;
  setupTime: string;
  featured: boolean;
  popular: boolean;
  copies: number;
  createdAt: string;
  icon: string;
  prompt: string;
  steps: string[];
  targetUsers: string[];
  exampleOutput: {
    title: string;
    items: ExampleItem[];
  };
  related: string[];
  customizeFields?: CustomizeField[];
};

export type Category = {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  icon: string;
};

export type App = {
  slug: AppSlug;
  name: string;
  description: string;
  icon: string;
  showOnHome: boolean;
};
