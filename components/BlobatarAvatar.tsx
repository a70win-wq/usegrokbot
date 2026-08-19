"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";

const BLOBATAR_ORIGIN = "https://blobatar.dev/avatar";

type BlobatarExpression = "happy" | "thinking" | "smug" | "love" | "sad" | "idle";

export function BlobatarAvatar({
  name,
  size = 40,
  expression = "happy",
  className,
  title,
}: {
  name: string;
  size?: number;
  expression?: BlobatarExpression;
  className?: string;
  title?: string;
}) {
  const [failed, setFailed] = useState(false);
  const safeName = name.trim() || "usegrokbot-community";
  const initials = useMemo(
    () =>
      safeName
        .replace(/^@/, "")
        .split(/[\s._-]+/)
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "UG",
    [safeName],
  );
  const idleSrc = useMemo(() => blobatarUrl(safeName, size), [safeName, size]);
  const hoverSrc = useMemo(() => blobatarUrl(safeName, size, expression), [safeName, size, expression]);

  if (failed) {
    return (
      <span
        aria-hidden={title ? undefined : true}
        title={title}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full bg-elevated text-[11px] font-medium text-mute",
          className,
        )}
        style={{ width: size, height: size }}
      >
        {initials}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "blobatar group/blobatar relative inline-flex shrink-0 overflow-hidden rounded-full bg-elevated motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:rotate-2",
        className,
      )}
      style={{ width: size, height: size }}
      title={title}
      aria-hidden={title ? undefined : true}
    >
      {/* Blobatar's public HTTP endpoint keeps avatars deterministic without adding a client bundle dependency. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={idleSrc}
        alt={title ?? ""}
        width={size}
        height={size}
        className="absolute inset-0 size-full object-cover transition-opacity duration-150 group-hover/blobatar:opacity-0"
        onError={() => setFailed(true)}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hoverSrc}
        alt=""
        width={size}
        height={size}
        className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-150 group-hover/blobatar:opacity-100"
      />
    </span>
  );
}

function blobatarUrl(name: string, size: number, expression?: BlobatarExpression) {
  const params = new URLSearchParams({
    size: String(Math.max(24, Math.round(size * 2))),
    background: "circle",
    gen: "2",
  });
  if (expression && expression !== "idle") params.set("expression", expression);
  return `${BLOBATAR_ORIGIN}/${encodeURIComponent(name)}?${params.toString()}`;
}
