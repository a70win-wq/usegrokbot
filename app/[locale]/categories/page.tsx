"use client";

import { CategoryCard } from "@/components/CategoryCard";
import { storiesForTopic } from "@/data/discover";
import { topics } from "@/data/topics";
import { useI18n } from "@/lib/i18n";

export default function CategoriesPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">
        {t("pages.categoriesTitle")}
      </h1>
      <p className="mt-3 max-w-2xl text-base text-mute">{t("pages.categoriesBody")}</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <CategoryCard key={topic.slug} topic={topic} count={storiesForTopic(topic.slug).length} />
        ))}
      </div>
    </div>
  );
}
