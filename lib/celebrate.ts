"use client";

type ConfettiShape = unknown;

type ConfettiOptions = {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  gravity?: number;
  scalar?: number;
  ticks?: number;
  origin?: { x?: number; y?: number };
  shapes?: ConfettiShape[];
  disableForReducedMotion?: boolean;
};

type ConfettiFn = ((options?: ConfettiOptions) => Promise<null> | null) & {
  shapeFromText?: (options: { text: string; scalar?: number }) => ConfettiShape;
};

declare global {
  interface Window {
    confetti?: ConfettiFn;
    __useGrokBotConfetti?: Promise<ConfettiFn | null>;
  }
}

const SCRIPT_ID = "usegrokbot-canvas-confetti";
const SCRIPT_SRC = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.4/dist/confetti.browser.min.js";

export async function celebrate(kind: "copy" | "submit" = "copy") {
  if (typeof window === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const confetti = await loadConfetti();
  if (!confetti) return;

  const scalar = kind === "submit" ? 1.05 : 0.9;
  const robot = confetti.shapeFromText?.({ text: "🤖", scalar });
  const star = confetti.shapeFromText?.({ text: "⭐", scalar });
  const shapes = [robot, star].filter(Boolean) as ConfettiShape[];
  const common: ConfettiOptions = {
    disableForReducedMotion: true,
    scalar,
    gravity: 0.95,
    ticks: 130,
    shapes: shapes.length ? shapes : undefined,
  };

  if (kind === "submit") {
    confetti({
      ...common,
      particleCount: 42,
      spread: 68,
      startVelocity: 30,
      origin: { x: 0.5, y: 0.7 },
    });
    window.setTimeout(() => {
      confetti({
        ...common,
        particleCount: 22,
        spread: 48,
        startVelocity: 24,
        origin: { x: 0.5, y: 0.76 },
      });
    }, 140);
    return;
  }

  confetti({
    ...common,
    particleCount: 22,
    spread: 48,
    startVelocity: 22,
    origin: { x: 0.5, y: 0.72 },
  });
}

async function loadConfetti(): Promise<ConfettiFn | null> {
  if (window.confetti) return window.confetti;
  if (window.__useGrokBotConfetti) return window.__useGrokBotConfetti;

  window.__useGrokBotConfetti = new Promise((resolve) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      if (window.confetti) {
        resolve(window.confetti);
        return;
      }
      existing.addEventListener("load", () => resolve(window.confetti ?? null), { once: true });
      existing.addEventListener("error", () => resolve(null), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.addEventListener("load", () => resolve(window.confetti ?? null), { once: true });
    script.addEventListener("error", () => resolve(null), { once: true });
    document.head.appendChild(script);
  });

  return window.__useGrokBotConfetti;
}
