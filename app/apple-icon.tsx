import { ImageResponse } from "next/og";
import { BOT_INK, BOT_PAPER, botLogoDataUri } from "@/lib/bloub/logo-svg";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BOT_PAPER,
        }}
      >
        <img src={botLogoDataUri({ ink: BOT_INK, size: 512 })} width={148} height={148} alt="" />
      </div>
    ),
    size,
  );
}
