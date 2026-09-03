import { ArticlesView } from "@/components/ArticlesView";
import { latestArticleStories, topArticleStoriesByViews } from "@/lib/x-metrics";

export default function ArticlesPage() {
  return (
    <ArticlesView
      top={topArticleStoriesByViews(20)}
      latest={latestArticleStories(10)}
    />
  );
}
