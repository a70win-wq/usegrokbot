"use client";

import { LocaleLink } from "@/components/LocaleLink";
import { topicDescription, topicMessageKey, type PostTopic } from "@/data/topics";
import { useI18n } from "@/lib/i18n";
import { BotFace, botColorFor } from "./BotFace";

export function CategoryCard({ topic, count }: { topic: PostTopic; count: number }) {
  const { t, locale } = useI18n();
  const name = t(topicMessageKey(topic.slug));

  return (
    <LocaleLink
      href={`/categories/${topic.slug}`}
      className="spring-lift rounded-[14px] border border-line bg-card p-5 hover:border-line-strong hover:bg-card-hover"
    >
      <BotFace size={28} color={botColorFor(topic.slug)} paper="var(--card)" />
      <h3 className="mt-4 text-[16px] font-medium text-ink">{name}</h3>
      <p className="mt-2 text-sm leading-6 text-mute">{topicDescription(topic, locale)}</p>
      <p className="mt-3 text-[12px] text-faint">{t("count.posts", { n: count })}</p>
    </LocaleLink>
  );
}
