"use client";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiscoverCard } from "@/components/DiscoverCard";
import type { DiscoverStory } from "@/data/discover";
import { topicDescription, topicMessageKey, type PostTopic } from "@/data/topics";
import { useI18n } from "@/lib/i18n";

export function CategoryDetailView({ topic, stories }: { topic: PostTopic; stories: DiscoverStory[] }) {
  const { t, locale } = useI18n();
  const name = t(topicMessageKey(topic.slug));

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
      <Breadcrumbs items={[{ href: "/categories", label: t("nav.categories") }, { label: name }]} />
      <h1 className="mt-6 text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">
        {t("pages.categoryHeading", { name })}
      </h1>
      <p className="mt-3 max-w-2xl text-base text-mute">{topicDescription(topic, locale)}</p>
      <p className="mt-3 text-[13px] text-faint">{t("count.posts", { n: stories.length })}</p>
      {stories.length ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {stories.map((story) => (
            <DiscoverCard key={story.slug} story={story} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-sm text-mute">{t("discover.empty")}</p>
      )}
    </div>
  );
}
