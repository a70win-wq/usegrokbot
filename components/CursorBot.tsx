"use client";

import { useEffect, useRef } from "react";
import { BloubBot } from "@/components/BloubBot";

/** Official Grok Bot face, ~3× a 16px cursor, sits beside the pointer. */
const SIZE = 72;
const OFFSET_X = 18;
const OFFSET_Y = 20;
const EDGE_X = 8;
const TOP_PAD = 64;
const BOTTOM_PAD = 88;

export function CursorBot() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const fineMq = window.matchMedia("(pointer: fine)");
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pos = { x: -100, y: -100 };
    const target = { x: pos.x, y: pos.y };
    let frame = 0;
    let disposed = false;
    let mode: "mouse" | "scroll" = "mouse";

    const onMove = (event: PointerEvent) => {
      if (mode !== "mouse") return;
      if (event.pointerType && event.pointerType !== "mouse") return;
      target.x = event.clientX + OFFSET_X;
      target.y = event.clientY + OFFSET_Y;
      wrap.style.opacity = "1";
    };

    const onLeave = () => {
      if (mode !== "mouse") return;
      wrap.style.opacity = "0";
    };

    const placeFromScroll = () => {
      if (mode !== "scroll") return;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      const travel = Math.max(0, window.innerHeight - SIZE - TOP_PAD - BOTTOM_PAD);
      target.x = EDGE_X;
      target.y = TOP_PAD + travel * progress;
      wrap.style.opacity = "1";
    };

    const applyMode = () => {
      mode = fineMq.matches ? "mouse" : "scroll";
      wrap.style.display = "";
      if (mode === "scroll") {
        placeFromScroll();
        return;
      }
      wrap.style.opacity = "0";
    };

    applyMode();

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", placeFromScroll, { passive: true });
    window.addEventListener("resize", placeFromScroll);
    fineMq.addEventListener("change", applyMode);

    const tick = () => {
      if (disposed) return;
      frame = window.requestAnimationFrame(tick);
      const ease = reduceMq.matches ? 1 : mode === "scroll" ? 0.16 : 0.4;
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
      window.removeEventListener("scroll", placeFromScroll);
      window.removeEventListener("resize", placeFromScroll);
      fineMq.removeEventListener("change", applyMode);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      data-cursor-bot
      className="pointer-events-none fixed top-0 left-0 z-[200] opacity-0"
      style={{ willChange: "transform" }}
    >
      <BloubBot size={SIZE} color="#4f7cff" paper="var(--canvas)" playing follow crop="scene" />
    </div>
  );
}
