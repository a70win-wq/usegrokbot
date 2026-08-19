"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function AuthorAvatar({
  name,
  handle,
  size = 40,
  className,
}: {
  name: string;
  handle?: string;
  size?: 40 | 48;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const src = handle && !failed ? `https://unavatar.io/x/${encodeURIComponent(handle)}` : undefined;
  const box = size === 48 ? "size-12" : "size-10";

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        className={cn(box, "shrink-0 rounded-full bg-elevated object-cover", className)}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        box,
        "inline-flex shrink-0 items-center justify-center rounded-full bg-elevated text-[11px] font-medium text-mute",
        className,
      )}
    >
      {initials}
    </span>
  );
}
