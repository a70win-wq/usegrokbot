import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Learn Grok Bot",
  description: "Simple guides: what Grok Bot is, how to use it, how to create one, and real examples.",
  path: "/learn",
});

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
