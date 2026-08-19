"use client";

import { useState } from "react";
import { BloubBot } from "@/components/BloubBot";
import { COLORS } from "@/lib/bloub";
import { useI18n } from "@/lib/i18n";

const START = Math.max(0, COLORS.findIndex((item) => item.id === "bleu"));

export function HeroBot() {
  const { t } = useI18n();
  const [index, setIndex] = useState(START);
  const color = COLORS[index] ?? COLORS[0]!;

  return (
    <button
      type="button"
      onClick={() => setIndex((current) => (current + 1) % COLORS.length)}
      aria-label={t("bot.nextColor")}
      className="mx-auto block rounded-full md:mx-0"
    >
      <span className="block size-[108px] md:size-[160px]">
        <BloubBot
          size={160}
          color={color.hex}
          paper="var(--canvas)"
          playing
          follow
          crop="scene"
          className="h-full w-full"
          title={t("bot.aria")}
        />
      </span>
    </button>
  );
}
