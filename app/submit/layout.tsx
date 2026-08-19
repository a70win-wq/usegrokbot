import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Share a Grok Bot use case",
  description: "Submit a Grok Bot workflow or prompt for the library.",
  path: "/submit",
});

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
