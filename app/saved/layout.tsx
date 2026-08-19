import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Saved use cases",
  description: "Use cases you saved in this browser.",
  path: "/saved",
});

export default function SavedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
