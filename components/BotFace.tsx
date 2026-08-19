import { cn } from "@/lib/cn";

export const botPalette = [
  "#1d1d1f",
  "#8b5a2b",
  "#ff3b30",
  "#ff6b00",
  "#34c759",
  "#00c7be",
  "#007aff",
  "#5856d6",
  "#af52de",
  "#ff2d55",
  "#ff9f1a",
  "#8e8e93",
] as const;

export function botColorFor(key: string) {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) hash = (hash * 33 + key.charCodeAt(i)) >>> 0;
  return botPalette[hash % botPalette.length];
}

export const botColors = {
  sales: "#ff6b00",
  marketing: "#ff3b30",
  content: "#af52de",
  research: "#007aff",
  operations: "#8e8e93",
  "customer-support": "#34c759",
  hr: "#ff2d55",
  coding: "#00c7be",
  finance: "#5856d6",
  productivity: "#1d1d1f",
  default: "#007aff",
} as const;

/** Official Grok Bot blob. `look="auto"` slowly turns the eyes on its own. */
export function BotFace({
  color = "#007aff",
  size = 32,
  className,
  look = "none",
}: {
  color?: string;
  size?: number;
  className?: string;
  look?: "none" | "auto";
}) {
  const eyeW = Math.max(3, size * 0.16);
  const eyeH = Math.max(4.5, size * 0.23);
  const gap = size * 0.11;
  const travel = Math.max(2, size * 0.2);

  return (
    <span
      className={cn("relative inline-block shrink-0 overflow-hidden rounded-full", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 32% 28%, color-mix(in srgb, ${color} 70%, white), ${color} 56%, color-mix(in srgb, ${color} 82%, black))`,
        boxShadow: `inset 0 ${size * 0.04}px ${size * 0.08}px rgba(255,255,255,0.35), inset 0 ${-size * 0.05}px ${size * 0.1}px rgba(0,0,0,0.18)`,
      }}
      aria-hidden
    >
      <span
        className={cn("absolute inset-0", look === "auto" && "bot-eyes")}
        style={
          look === "auto"
            ? {
                ["--look" as string]: `${travel}px`,
                animation: "bot-look 3.2s ease-in-out infinite",
              }
            : undefined
        }
      >
        <span
          className="absolute rounded-full bg-white"
          style={{
            width: eyeW,
            height: eyeH,
            top: "36%",
            left: `calc(50% - ${gap / 2 + eyeW}px)`,
          }}
        />
        <span
          className="absolute rounded-full bg-white"
          style={{
            width: eyeW,
            height: eyeH,
            top: "36%",
            left: `calc(50% + ${gap / 2}px)`,
          }}
        />
      </span>
    </span>
  );
}
