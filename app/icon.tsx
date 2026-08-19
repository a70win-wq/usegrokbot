import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090A",
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            backgroundImage: "linear-gradient(135deg, #4F7CFF 0%, #8B5CF6 100%)",
            borderRadius: 4,
          }}
        />
      </div>
    ),
    size,
  );
}
