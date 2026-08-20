"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { celebrate } from "@/lib/celebrate";

const BLOBATAR_ORIGIN = "https://blobatar.dev/avatar";
const RARE_PREFIX = "usegrokbot:rare-blob:";

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
  const [tapCount, setTapCount] = useState(0);
  const [rare, setRare] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);
  const safeName = name.trim() || "usegrokbot-community";
  const storageKey = `${RARE_PREFIX}${safeName.toLowerCase()}`;

  useEffect(() => {
    try {
      setRare(window.localStorage.getItem(storageKey) === "1");
    } catch {
      // localStorage may be unavailable in privacy modes; the Easter egg still works for this visit.
    }
  }, [storageKey]);

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
  const avatarSeed = rare ? `rare:${safeName}` : safeName;
  const idleSrc = useMemo(() => blobatarUrl(avatarSeed, size, rare ? "smug" : undefined), [avatarSeed, rare, size]);
  const hoverSrc = useMemo(
    () => blobatarUrl(avatarSeed, size, rare ? "love" : expression),
    [avatarSeed, expression, rare, size],
  );

  function onSecretTap() {
    if (rare) return;
    const next = tapCount + 1;
    if (next < 5) {
      setTapCount(next);
      return;
    }

    setTapCount(0);
    setRare(true);
    setJustUnlocked(true);
    try {
      window.localStorage.setItem(storageKey, "1");
    } catch {
      // Persistence is a bonus, never a requirement for the avatar itself.
    }
    void celebrate("rare");
    window.setTimeout(() => setJustUnlocked(false), 2400);
  }

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
      className={cn("relative inline-flex shrink-0", className)}
      style={{ width: size, height: size }}
      onPointerUp={onSecretTap}
      title={rare ? `${title ?? safeName} · Rare Blob ✨` : title}
      aria-hidden={title ? undefined : true}
    >
      <span
        className={cn(
          "blobatar group/blobatar absolute inset-0 overflow-hidden rounded-full bg-elevated motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:rotate-2",
          rare && "ring-2 ring-amber-400/80 ring-offset-2 ring-offset-canvas",
        )}
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

      {rare ? (
        <span
          className="pointer-events-none absolute -top-1 -right-1 z-10 flex size-5 items-center justify-center rounded-full border border-amber-300/70 bg-card text-[10px] shadow-sm"
          aria-hidden
        >
          ✨
        </span>
      ) : null}

      {justUnlocked ? (
        <span className="pointer-events-none fixed top-20 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-amber-300/50 bg-card px-4 py-2 text-[13px] font-medium whitespace-nowrap text-ink shadow-lg">
          ✨ Rare Blob unlocked
        </span>
      ) : null}
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
