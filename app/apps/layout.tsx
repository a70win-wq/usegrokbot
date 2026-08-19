import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Grok Bot for the tools you already use",
  description: "Grok Bot workflows for Gmail, Slack, Notion, GitHub, Sheets and more.",
  path: "/apps",
});

export default function AppsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
