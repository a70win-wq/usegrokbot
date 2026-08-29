"use client";

import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { BloubBot } from "@/components/BloubBot";
import { COLORS, type StateId } from "@/lib/bloub";
import { clamp, easings } from "@/lib/bloub/math";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";

const START = Math.max(0, COLORS.findIndex((item) => item.id === "bleu"));
const BOT = 160;
const PARKS = [
  { x: 0, y: 0 },
  { x: -32, y: -44 },
  { x: 18, y: 40 },
] as const;
const HOME = PARKS[0];
const FREE_HOPS = [
  { x: -88, y: -56 },
  { x: 76, y: 36 },
  { x: -28, y: 84 },
] as const;
const HOP_MS = 640;
const DRAG_PX = 3;
const DOCK_MARGIN = 72;
const EDGE = 8;
const TOP_SAFE = 56;
const HOP_MQ = "(pointer: fine), (min-width: 768px)";

type Pt = { x: number; y: number };

function nearestPark(point: Pt) {
  let best = 0;
  let bestDist = Infinity;
  PARKS.forEach((park, index) => {
    const dist = (park.x - point.x) ** 2 + (park.y - point.y) ** 2;
    if (dist < bestDist) {
      bestDist = dist;
      best = index;
    }
  });
  return best;
}

function clampToViewport(point: Pt): Pt {
  return {
    x: clamp(point.x, EDGE, Math.max(EDGE, window.innerWidth - BOT - EDGE)),
    y: clamp(point.y, TOP_SAFE, Math.max(TOP_SAFE, window.innerHeight - BOT - EDGE)),
  };
}

export function HeroBot() {
  const { t } = useI18n();
  const [index, setIndex] = useState(START);
  const [mood, setMood] = useState<StateId>("idle");
  const [canHop, setCanHop] = useState(false);
  const [holding, setHolding] = useState(false);
  const color = COLORS[index] ?? COLORS[0]!;

  const fieldRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const posRef = useRef<Pt & { scale: number }>({ ...HOME, scale: 1 });
  const parkRef = useRef(0);
  const freeHopRef = useRef(0);
  const moodRef = useRef<StateId>("idle");
  const hoppingRef = useRef(false);
  const freeRef = useRef(false);
  const canHopRef = useRef(false);
  const reduceRef = useRef(false);
  const skipClickRef = useRef(false);
  const hopRafRef = useRef(0);
  const unbindRef = useRef<(() => void) | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    offsetX: number;
    offsetY: number;
    active: boolean;
  } | null>(null);

  const setBotMood = (next: StateId) => {
    moodRef.current = next;
    setMood(next);
  };

  const applyTransform = () => {
    const el = btnRef.current;
    if (!el || !canHopRef.current) return;
    const { x, y, scale } = posRef.current;
    const half = BOT / 2;
    el.style.transform = `translate3d(${x + half}px, ${y + half}px, 0) scale(${scale}) translate3d(${-half}px, ${-half}px, 0)`;
  };

  const stopHop = () => {
    if (hopRafRef.current) {
      window.cancelAnimationFrame(hopRafRef.current);
      hopRafRef.current = 0;
    }
    hoppingRef.current = false;
  };

  const dockPoint = (parkIndex: number): Pt | null => {
    const field = fieldRef.current;
    if (!field) return null;
    const box = field.getBoundingClientRect();
    const park = PARKS[parkIndex];
    return { x: box.left + park.x, y: box.top + park.y };
  };

  const inDockZone = (point: Pt) => {
    const field = fieldRef.current;
    if (!field) return false;
    const box = field.getBoundingClientRect();
    const cx = point.x + BOT / 2;
    const cy = point.y + BOT / 2;
    return (
      cx >= box.left - DOCK_MARGIN &&
      cx <= box.right + DOCK_MARGIN &&
      cy >= box.top - DOCK_MARGIN &&
      cy <= box.bottom + DOCK_MARGIN
    );
  };

  const hopTo = (to: Pt, asExclaim: boolean) => {
    const from = { x: posRef.current.x, y: posRef.current.y };
    const dest = clampToViewport(to);

    if (reduceRef.current) {
      stopHop();
      posRef.current = { ...dest, scale: 1 };
      applyTransform();
      setBotMood("idle");
      return;
    }

    stopHop();
    hoppingRef.current = true;
    setBotMood(asExclaim ? "exclaim" : "egg");

    const started = performance.now();
    const ctrl = {
      x: (from.x + dest.x) / 2,
      y: Math.min(from.y, dest.y) - Math.min(64, 36 + Math.hypot(dest.x - from.x, dest.y - from.y) * 0.18),
    };

    const step = (now: number) => {
      const t = clamp((now - started) / HOP_MS);
      const e = easings.easeInOutCubic(t);
      const rest = 1 - e;
      posRef.current = {
        x: rest * rest * from.x + 2 * rest * e * ctrl.x + e * e * dest.x,
        y: rest * rest * from.y + 2 * rest * e * ctrl.y + e * e * dest.y,
        scale: asExclaim ? 1 - 0.48 * Math.sin(Math.PI * e) : 1 - 0.08 * Math.sin(Math.PI * e),
      };
      applyTransform();

      if (t < 1) {
        hopRafRef.current = window.requestAnimationFrame(step);
        return;
      }

      posRef.current = { ...dest, scale: 1 };
      applyTransform();
      hoppingRef.current = false;
      setBotMood("idle");
      hopRafRef.current = 0;
    };

    hopRafRef.current = window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const hopMq = window.matchMedia(HOP_MQ);
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const hop = hopMq.matches;
      canHopRef.current = hop;
      reduceRef.current = reduceMq.matches;
      setCanHop(hop);
      if (hop) return;
      stopHop();
      dragRef.current = null;
      freeRef.current = false;
      posRef.current = { ...HOME, scale: 1 };
      parkRef.current = 0;
      setBotMood("idle");
      const el = btnRef.current;
      if (el) el.style.transform = "";
    };

    sync();
    hopMq.addEventListener("change", sync);
    reduceMq.addEventListener("change", sync);
    return () => {
      hopMq.removeEventListener("change", sync);
      reduceMq.removeEventListener("change", sync);
      delete document.documentElement.dataset.heroHold;
      unbindRef.current?.();
      unbindRef.current = null;
      stopHop();
    };
  }, []);

  useLayoutEffect(() => {
    if (!canHop) return;
    const stickToDock = () => {
      if (!canHopRef.current || freeRef.current || hoppingRef.current || dragRef.current) return;
      const point = dockPoint(parkRef.current);
      if (!point) return;
      posRef.current = { ...point, scale: 1 };
      applyTransform();
    };
    stickToDock();
    const boot = document.documentElement.getAttribute("data-boot");
    let observer: MutationObserver | undefined;
    let frame = 0;
    if (boot === "1") {
      observer = new MutationObserver(() => {
        if (document.documentElement.getAttribute("data-boot") === "1") return;
        observer?.disconnect();
        frame = window.requestAnimationFrame(stickToDock);
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-boot"] });
    } else {
      frame = window.requestAnimationFrame(stickToDock);
    }
    window.addEventListener("scroll", stickToDock, { passive: true });
    window.addEventListener("resize", stickToDock);
    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", stickToDock);
      window.removeEventListener("resize", stickToDock);
    };
  }, [canHop]);

  const hopFromClick = () => {
    if (hoppingRef.current) return;
    if (!canHopRef.current) {
      setIndex((current) => (current + 1) % COLORS.length);
      return;
    }

    if (freeRef.current) {
      const delta = FREE_HOPS[freeHopRef.current % FREE_HOPS.length]!;
      freeHopRef.current += 1;
      hopTo({ x: posRef.current.x + delta.x, y: posRef.current.y + delta.y }, true);
      return;
    }

    parkRef.current = (parkRef.current + 1) % PARKS.length;
    const next = dockPoint(parkRef.current);
    if (next) hopTo(next, true);
  };

  const stopTracking = () => {
    unbindRef.current?.();
    unbindRef.current = null;
    setHolding(false);
    delete document.documentElement.dataset.heroHold;
  };

  const finishDrag = (drag: NonNullable<typeof dragRef.current>) => {
    dragRef.current = null;
    stopTracking();
    const el = btnRef.current;
    if (el?.hasPointerCapture(drag.pointerId)) {
      try {
        el.releasePointerCapture(drag.pointerId);
      } catch {
        /* already released */
      }
    }
    if (!drag.active) {
      skipClickRef.current = true;
      hopFromClick();
      return;
    }

    skipClickRef.current = true;
    setIndex((current) => (current + 1) % COLORS.length);

    const here = { x: posRef.current.x, y: posRef.current.y };
    if (inDockZone(here) && fieldRef.current) {
      const field = fieldRef.current.getBoundingClientRect();
      const next = nearestPark({ x: here.x - field.left, y: here.y - field.top });
      parkRef.current = next;
      freeRef.current = false;
      const home = dockPoint(next);
      if (home) hopTo(home, false);
      else setBotMood("idle");
      return;
    }

    freeRef.current = true;
    setBotMood("idle");
  };

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (!canHopRef.current) return;
    if (event.button !== undefined && event.button !== 0) return;

    stopHop();
    stopTracking();

    const rect = event.currentTarget.getBoundingClientRect();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      active: false,
    };
    setBotMood("egg");
    setHolding(true);
    document.documentElement.dataset.heroHold = "1";

    const onMove = (moveEvent: { clientX: number; clientY: number }) => {
      const drag = dragRef.current;
      if (!drag) return;

      const dx = moveEvent.clientX - drag.startX;
      const dy = moveEvent.clientY - drag.startY;
      if (!drag.active && dx * dx + dy * dy < DRAG_PX * DRAG_PX) return;

      drag.active = true;
      freeRef.current = true;
      if (moodRef.current !== "egg") setBotMood("egg");

      posRef.current = {
        ...clampToViewport({
          x: moveEvent.clientX - drag.offsetX,
          y: moveEvent.clientY - drag.offsetY,
        }),
        scale: 1,
      };
      applyTransform();
    };

    const onUp = () => {
      const drag = dragRef.current;
      stopTracking();
      if (!drag) return;
      finishDrag(drag);
    };

    const opts: AddEventListenerOptions = { capture: true };
    document.addEventListener("pointermove", onMove, opts);
    document.addEventListener("mousemove", onMove, opts);
    document.addEventListener("pointerup", onUp, opts);
    document.addEventListener("mouseup", onUp, opts);
    document.addEventListener("pointercancel", onUp, opts);
    unbindRef.current = () => {
      document.removeEventListener("pointermove", onMove, opts);
      document.removeEventListener("mousemove", onMove, opts);
      document.removeEventListener("pointerup", onUp, opts);
      document.removeEventListener("mouseup", onUp, opts);
      document.removeEventListener("pointercancel", onUp, opts);
    };
  };

  const onClick = () => {
    if (skipClickRef.current) {
      skipClickRef.current = false;
      return;
    }
    hopFromClick();
  };

  return (
    <div
      ref={fieldRef}
      className="pointer-events-none relative mx-auto size-[160px] shrink-0 md:mx-0"
    >
      <button
        ref={btnRef}
        type="button"
        draggable={false}
        onClick={onClick}
        onPointerDown={onPointerDown}
        onDragStart={(event) => event.preventDefault()}
        aria-label={canHop ? t("bot.play") : t("bot.nextColor")}
        className={cn(
          "pointer-events-auto block size-[160px] rounded-full select-none [&_svg]:pointer-events-none [&_svg]:[-webkit-user-drag:none]",
          "focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none",
          canHop
            ? "fixed top-0 left-0 cursor-grab touch-none active:cursor-grabbing"
            : "",
          canHop && (holding ? "z-[210]" : "z-30"),
        )}
      >
        <span className="block h-full w-full">
          <BloubBot
            size={160}
            color={color.hex}
            paper="var(--canvas)"
            state={mood}
            follow
            crop="scene"
            className="h-full w-full"
            title={t("bot.aria")}
          />
        </span>
      </button>
      {holding ? (
        <div className="pointer-events-auto fixed inset-0 z-[200] cursor-grabbing" aria-hidden />
      ) : null}
    </div>
  );
}
