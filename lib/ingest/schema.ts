import { z } from "zod";
import { discoverCategorySlugs, outcomeSlugs } from "@/data/discover";
import { appSlugs } from "@/data/types";

export const extractSchema = z.object({
  relevant: z.boolean(),
  relevance: z.number().min(0).max(100),
  reason: z.string(),
  title: z.string(),
  headline: z.string(),
  whatTheyDid: z.string(),
  howItWorks: z.string(),
  whyUseful: z.string(),
  whyItMatters: z.string(),
  whoShouldTry: z.array(z.string()).min(1).max(4),
  usefulFor: z.string(),
  quote: z.string().optional(),
  result: z.string().optional(),
  output: z.string().optional(),
  category: z.enum(discoverCategorySlugs),
  outcomes: z.array(z.enum(outcomeSlugs)).min(1).max(3),
  apps: z.array(z.enum(appSlugs)).min(1).max(5),
  difficulty: z.enum(["easy", "medium", "advanced"]),
  schedule: z.enum(["one-time", "daily", "weekly", "always-on"]),
  format: z.enum(["post", "article"]).optional(),
  elonLiked: z.boolean().optional(),
});

export type ExtractedCase = z.infer<typeof extractSchema>;
