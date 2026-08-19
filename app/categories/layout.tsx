import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Grok Bot categories",
  description: "Explore Grok Bot workflows by job: sales, marketing, research, operations and more.",
  path: "/categories",
});

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
