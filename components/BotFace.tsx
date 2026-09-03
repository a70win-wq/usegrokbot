import { BloubBot } from "@/components/BloubBot";
import { COLORS } from "@/lib/bloub";

export const botPalette = COLORS.map((item) => item.hex);

const teamBotPalette = ["#4f7cff", "#f08a24", "#8b5cf6", "#3ecf8e", "#e152b0"] as const;

export function botColorFor(key: string) {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) hash = (hash * 33 + key.charCodeAt(i)) >>> 0;
  return botPalette[hash % botPalette.length];
}

export function teamBotColor(index: number) {
  return teamBotPalette[index % teamBotPalette.length];
}

export const botColors = {
  sales: "#f08a24",
  marketing: "#e8483f",
  content: "#e152b0",
  research: "#3b93f0",
  operations: "#a3a3a3",
  "customer-support": "#3ecf8e",
  hr: "#e152b0",
  coding: "#2fbfa0",
  finance: "#8b5cf6",
  productivity: "#0a0a0c",
  default: "#3b93f0",
} as const;

/** Official Grok Bot blob from bloub. Frozen by default; `look="auto"` blinks. */
export function BotFace({
  color = "#3b93f0",
  size = 32,
  className,
  look = "none",
  paper = "var(--canvas)",
}: {
  color?: string;
  size?: number;
  className?: string;
  look?: "none" | "auto";
  paper?: string;
}) {
  return (
    <BloubBot
      size={size}
      color={color}
      paper={paper}
      crop="icon"
      frozenAt={look === "auto" ? undefined : 1}
      className={className}
    />
  );
}
