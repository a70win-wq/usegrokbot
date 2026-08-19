"use client";

import { useEffect, useRef } from "react";
import { BotFace } from "./BotFace";

/** Official Grok Bot face, ~3× a 16px cursor, sits beside the pointer. */
const SIZE = 48;
const OFFSET_X = 16;
const OFFSET_Y = 18;

export function CursorBot() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) {
      wrap.style.display = "none";
      return;
    }

    const pos = { x: -100, y: -100 };
    const target = { x: pos.x, y: pos.y };
    let frame = 0;
    let disposed = false;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      target.x = event.clientX + OFFSET_X;
      target.y = event.clientY + OFFSET_Y;
      wrap.style.opacity = "1";
    };

    const onLeave = () => {
      wrap.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    const tick = () => {
      if (disposed) return;
      frame = window.requestAnimationFrame(tick);
      const ease = reduce ? 1 : 0.4;
      pos.x += (target.x - pos.x) * ease;
      pos.y += (target.y - pos.y) * ease;
      wrap.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    };
    frame = window.requestAnimationFrame(tick);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[200] opacity-0"
      style={{ willChange: "transform" }}
    >
      <BotFace size={SIZE} color="#007aff" look="auto" />
    </div>
  );
}
