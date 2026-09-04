import { BookmarksView } from "@/components/BookmarksView";
import { JsonLd } from "@/components/JsonLd";
import {
  bookmarkUiCopy,
  bookmarksForLocale,
  githubBookmarks,
  localizeBookmark,
  youtubeBookmarks,
} from "@/data/bookmarks";
import {
  chineseTeachingArticlesByViews,
  englishArticlesByViews,
  japaneseArticlesByViews,
} from "@/lib/articles";
import { absoluteUrl, localeFromParams } from "@/lib/i18n/paths";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { urlLocale, locale } = localeFromParams((await params).locale);
  const copy = bookmarkUiCopy[locale];
  return pageMeta({
    title: copy.title,
    description: copy.intro,
    path: "/bookmarks",
    urlLocale,
  });
}

export default async function BookmarksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { urlLocale, locale } = localeFromParams((await params).locale);
  const copy = bookmarkUiCopy[locale];
  const github = bookmarksForLocale(githubBookmarks, locale).map((item) =>
    localizeBookmark(item, locale),
  );
  const youtube = bookmarksForLocale(youtubeBookmarks, locale).map((item) =>
    localizeBookmark(item, locale),
  );
  const chineseArticles = chineseTeachingArticlesByViews();
  const englishArticles = englishArticlesByViews(20);
  const japaneseArticles = japaneseArticlesByViews(20);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: copy.title,
          description: copy.intro,
          url: absoluteUrl("/bookmarks", urlLocale),
          numberOfItems:
            github.length +
            youtube.length +
            chineseArticles.length +
            englishArticles.length +
            (locale === "ja" ? japaneseArticles.length : 0),
          publisher: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />
      <BookmarksView
        github={github}
        youtube={youtube}
        chineseArticles={chineseArticles}
        englishArticles={englishArticles}
        japaneseArticles={japaneseArticles}
      />
    </>
  );
}
