import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Grok Bot Prompts",
  description: "Ready-to-use Grok Bot prompts for sales, marketing, research, writing, office and coding.",
  path: "/prompts",
});

export default function PromptsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
