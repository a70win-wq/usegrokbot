import { ArticlesView } from "@/components/ArticlesView";
import {
  chineseTeachingArticlesByViews,
  englishArticlesByViews,
  japaneseArticlesByViews,
  latestArticleStories,
} from "@/lib/articles";
import { localeFromParams } from "@/lib/i18n/paths";

export default async function ArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = localeFromParams((await params).locale);

  return (
    <ArticlesView
      chineseTutorials={chineseTeachingArticlesByViews()}
      english={englishArticlesByViews(20)}
      japanese={japaneseArticlesByViews(20)}
      latest={latestArticleStories(10, locale)}
    />
  );
}
