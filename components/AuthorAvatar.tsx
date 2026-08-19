"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function AuthorAvatar({
  name,
  handle,
  className,
}: {
  name: string;
  handle?: string;
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

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        width={36}
        height={36}
        className={cn("size-9 shrink-0 rounded-full bg-elevated object-cover", className)}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-elevated text-[11px] font-medium text-mute",
        className,
      )}
    >
      {initials}
    </span>
  );
}
