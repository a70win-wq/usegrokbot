"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { BloubSvg, resolveInk } from "@/components/BloubSvg";
import {
  BotEngine,
  DEFAULT_EXPRESSION,
  DEFAULT_SHAPE,
  EXPRESSION_BY_ID,
  PITCH,
  PITCH_MAX,
  POSES,
  SHAPE_BY_ID,
  STATE_BY_ID,
  YAW_MAX,
  defaultCycle,
  type Block,
  type BotFrame,
  type Look,
  type StateId,
} from "@/lib/bloub";
import { clamp } from "@/lib/bloub/math";
import { RAYON } from "@/lib/bloub";
import { cn } from "@/lib/cn";

export type BloubBotProps = {
  size?: number;
  color?: string;
  paper?: string;
  shape?: string;
  expression?: string;
  state?: StateId;
  frozenAt?: number;
  playing?: boolean;
  cycle?: Block[];
  follow?: boolean;
  crop?: "icon" | "scene";
  className?: string;
  title?: string;
};

function siteLook(nx: number, ny: number, pointer: boolean): Look {
  return {
    yaw: nx * YAW_MAX,
    pitch: PITCH - ny * PITCH_MAX,
    mix: 1,
    spin: 0,
    wander: pointer ? 0 : 1,
  };
}

function makeEngine(state: StateId, shape: string, expression: string) {
  return new BotEngine(
    RAYON,
    state,
    SHAPE_BY_ID.get(shape)?.radii ?? null,
    EXPRESSION_BY_ID.get(expression) ?? null,
  );
}

export function BloubBot({
  size = 32,
  color = "#0a0a0c",
  paper = "var(--canvas)",
  shape = DEFAULT_SHAPE,
  expression = DEFAULT_EXPRESSION,
  state = "idle",
  frozenAt,
  playing = false,
  cycle,
  follow = false,
  crop,
  className,
  title,
}: BloubBotProps) {
  const uid = useId().replace(/:/g, "");
  const ink = resolveInk(color);
  const defaultBlocks = useMemo(() => defaultCycle().blocks, []);
  const blocks = cycle ?? defaultBlocks;
  const scene = crop ?? (playing || follow || frozenAt === undefined ? "scene" : "icon");
  const frozen = frozenAt !== undefined && !playing && !follow;
  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const stillEngine = useMemo(
    () => makeEngine(state, shape, expression),
    [state, shape, expression],
  );
  const stillFrame = useMemo(
    () => stillEngine.sample(frozenAt ?? POSES[state] ?? 1),
    [stillEngine, frozenAt, state],
  );

  const boxRef = useRef<HTMLSpanElement>(null);
  const engineRef = useRef<BotEngine | null>(null);
  const clockRef = useRef(0);
  const lastRef = useRef(0);
  const blockRef = useRef(0);
  const blockStartRef = useRef(0);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const aimingRef = useRef(false);
  const [frame, setFrame] = useState<BotFrame>(stillFrame);

  if (engineRef.current === null) {
    engineRef.current = makeEngine(playing ? (blocks[0]?.state ?? state) : state, shape, expression);
  }

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    engine.setShape(SHAPE_BY_ID.get(shape)?.radii ?? null, clockRef.current);
    engine.setExpression(EXPRESSION_BY_ID.get(expression) ?? null, clockRef.current);
  }, [shape, expression]);

  useEffect(() => {
    if (frozen || reduceMotion) return;
    const engine = engineRef.current;
    if (!engine || engine.state === state || playing) return;
    engine.setState(state, clockRef.current);
  }, [state, frozen, playing, reduceMotion]);

  useEffect(() => {
    if (frozen || reduceMotion) return;
    const engine = engineRef.current;
    if (!engine) return;

    if (playing && blocks.length) {
      const first = blocks[0]!;
      engine.setState(first.state, clockRef.current);
      blockRef.current = 0;
      blockStartRef.current = clockRef.current;
    }

    let raf = 0;
    const tick = (ms: number) => {
      raf = window.requestAnimationFrame(tick);
      const dt = lastRef.current ? Math.min((ms - lastRef.current) / 1000, 0.064) : 0;
      lastRef.current = ms;
      clockRef.current += dt;
      const now = clockRef.current;

      if (playing && blocks.length) {
        const current = blocks[blockRef.current];
        if (current && now >= blockStartRef.current + current.duration) {
          const next = (blockRef.current + 1) % blocks.length;
          blockRef.current = next;
          blockStartRef.current = now;
          engine.setState(blocks[next]!.state, now);
        }
      }

      const liveState = engine.state;
      if (follow && STATE_BY_ID.get(liveState)?.baseFace) {
        const box = boxRef.current?.getBoundingClientRect();
        const pointer = pointerRef.current;
        if (box && box.width > 0 && box.height > 0) {
          const aimX = pointer?.x ?? window.innerWidth / 2;
          const aimY = pointer?.y ?? window.innerHeight / 2;
          const nx = clamp((aimX - (box.left + box.width / 2)) / Math.max(1, window.innerWidth / 2), -1, 1);
          const ny = clamp((aimY - (box.top + box.height / 2)) / Math.max(1, window.innerHeight / 2), -1, 1);
          engine.setLook(siteLook(nx, ny, pointer !== null), now);
          aimingRef.current = true;
        }
      } else if (aimingRef.current) {
        engine.setLook(null, now);
        aimingRef.current = false;
      }

      setFrame(engine.sample(now));
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [frozen, reduceMotion, playing, follow, blocks]);

  useEffect(() => {
    if (!follow || frozen || reduceMotion) return;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerRef.current = { x: event.clientX, y: event.clientY };
    };
    const onLeave = () => {
      pointerRef.current = null;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [follow, frozen, reduceMotion]);

  return (
    <span
      ref={boxRef}
      className={cn("inline-flex shrink-0", scene === "scene" && "h-full w-full")}
    >
      <BloubSvg
        frame={frozen || reduceMotion ? stillFrame : frame}
        size={size}
        ink={ink}
        paper={paper}
        uid={uid}
        crop={scene}
        className={className}
        title={title}
      />
    </span>
  );
}
