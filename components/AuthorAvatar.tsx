"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { BlobatarAvatar } from "./BlobatarAvatar";

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
        decoding="async"
        loading="lazy"
        className={cn(box, "shrink-0 rounded-full bg-elevated object-cover", className)}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <BlobatarAvatar
      name={handle ?? name}
      size={size}
      expression="happy"
      className={className}
      title={`${name} community avatar`}
    />
  );
}
