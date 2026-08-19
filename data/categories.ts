import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "sales",
    name: "Sales",
    shortName: "Sales",
    description: "Find leads, research prospects and prepare follow-ups.",
    icon: "Users",
  },
  {
    slug: "marketing",
    name: "Marketing",
    shortName: "Marketing",
    description: "Monitor competitors, campaigns and market trends.",
    icon: "Megaphone",
  },
  {
    slug: "content",
    name: "Content",
    shortName: "Content",
    description: "Research topics and create better content faster.",
    icon: "PenLine",
  },
  {
    slug: "research",
    name: "Research",
    shortName: "Research",
    description: "Turn hours of online research into short useful reports.",
    icon: "Search",
  },
  {
    slug: "operations",
    name: "Operations",
    shortName: "Office",
    description: "Handle repetitive daily office tasks.",
    icon: "Briefcase",
  },
  {
    slug: "customer-support",
    name: "Customer Support",
    shortName: "Support",
    description: "Organize feedback and support requests.",
    icon: "Headphones",
  },
  {
    slug: "hr",
    name: "HR",
    shortName: "HR",
    description: "Research candidates and organize hiring tasks.",
    icon: "UserRoundSearch",
  },
  {
    slug: "coding",
    name: "Coding",
    shortName: "Coding",
    description: "Help investigate issues, bugs and GitHub work.",
    icon: "Code",
  },
  {
    slug: "finance",
    name: "Finance",
    shortName: "Finance",
    description: "Organize simple finance and reporting tasks.",
    icon: "Wallet",
  },
  {
    slug: "productivity",
    name: "Productivity",
    shortName: "Productivity",
    description: "Help manage everyday work and personal tasks.",
    icon: "ListChecks",
  },
];

export const categoriesBySlug = Object.fromEntries(
  categories.map((category) => [category.slug, category]),
) as Record<Category["slug"], Category>;
