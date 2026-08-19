import { ImageResponse } from "next/og";
import { BOT_INK, BOT_PAPER, botLogoDataUri } from "@/lib/bloub/logo-svg";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default function OpenGraphImage() {
  const bot = botLogoDataUri({ ink: BOT_INK, size: 512 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: BOT_PAPER,
          gap: 28,
        }}
      >
        <img src={bot} width={280} height={280} alt="" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 560,
              letterSpacing: "-0.04em",
              color: "#111318",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#5c6370",
              letterSpacing: "-0.02em",
            }}
          >
            See what people are actually building with Grok Bot.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
