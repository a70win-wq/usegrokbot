import { ImageResponse } from "next/og";
import { botLogoDataUri } from "@/lib/bloub/logo-svg";
import { site } from "@/lib/site";

export const alt = `${site.name} — How people use Grok Bot.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default function OpenGraphImage() {
  const bot = botLogoDataUri({ ink: "#3b93f0", size: 512 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#ffffff",
          padding: "56px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 620,
            height: "100%",
            gap: 72,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#6b7280",
            }}
          >
            {site.name}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                fontSize: 68,
                fontWeight: 500,
                letterSpacing: "-0.05em",
                color: "#111318",
                lineHeight: 1.05,
              }}
            >
              How people use Grok Bot.
            </div>
            <div
              style={{
                width: 64,
                height: 3,
                background: "#4f7cff",
              }}
            />
            <div
              style={{
                fontSize: 26,
                color: "#6b7280",
                letterSpacing: "-0.02em",
                lineHeight: 1.35,
              }}
            >
              A public index of real jobs from X.
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={bot} width={380} height={380} alt="" />
        </div>
      </div>
    ),
    size,
  );
}
