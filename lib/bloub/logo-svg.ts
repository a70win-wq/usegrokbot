import { BotEngine } from "./engine";
import { RAYON } from "./repere";
import { POSES } from "./states";

const BOX = Math.ceil(RAYON * 1.12);

export const BOT_INK = "#0a0a0c";
export const BOT_EYE = "#ffffff";
export const BOT_PAPER = "#f6f7f9";

export function botLogoSvg({
  ink = BOT_INK,
  paper,
  size = 512,
}: {
  ink?: string;
  paper?: string;
  size?: number;
} = {}) {
  const engine = new BotEngine(RAYON, "idle");
  const frame = engine.sample(POSES.idle);
  const eyes = frame.eyes
    .map(
      (eye) =>
        `<path d="${eye.d}" transform="${eye.matrix}" fill="${BOT_EYE}" fill-opacity="${eye.alpha}"/>`,
    )
    .join("");
  const backdrop = paper
    ? `<rect x="${-BOX}" y="${-BOX}" width="${BOX * 2}" height="${BOX * 2}" fill="${paper}"/>`
    : "";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${-BOX} ${-BOX} ${BOX * 2} ${BOX * 2}">
  ${backdrop}
  <path d="${frame.bodyPath}" fill="${ink}"/>
  ${eyes}
</svg>`;
}

export function botLogoDataUri(options?: { ink?: string; paper?: string; size?: number }) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(botLogoSvg(options))}`;
}
