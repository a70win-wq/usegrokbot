"use client";

import { useEffect, useRef } from "react";
import { BotFace } from "@/components/BotFace";
import type { TemplateIdentitySlug } from "@/data/template-identities";
import { cn } from "@/lib/cn";

const identityOrder = {
  engineer: 0,
  manager: 1,
  "solo-founder": 2,
  "x-creator": 3,
  "video-creator": 4,
  sales: 5,
  marketer: 6,
  recruiter: 7,
  parent: 8,
  student: 9,
  "job-seeker": 10,
  investor: 11,
  "crypto-trader": 12,
  designer: 13,
  "product-manager": 14,
  researcher: 15,
  finance: 16,
  freelancer: 17,
  "shop-owner": 18,
  "site-owner": 19,
  assistant: 20,
  renter: 21,
  traveler: 22,
  "tesla-owner": 23,
  "game-developer": 24,
  fitness: 25,
  surfer: 26,
  "comics-reader": 27,
  "fashion-shopper": 28,
} as const satisfies Record<TemplateIdentitySlug, number>;

const colors = [
  "#3b93f0",
  "#8b5cf6",
  "#e152b0",
  "#f08a24",
  "#3ecf8e",
  "#2fbfa0",
  "#e8483f",
  "#f0b429",
  "#8b5e3c",
  "#0a0a0c",
] as const;

const shapes = [
  "cercle",
  "squircle",
  "galet",
  "capsule",
  "hexagone",
  "goutte",
  "nuage",
  "triangle",
] as const;

type Follower = {
  element: HTMLSpanElement;
  body: SVGPathElement;
  eyes: SVGGElement;
  travel: {
    anchorX: number;
    anchorY: number;
    radii: readonly number[];
  } | null;
  x: number;
  y: number;
};

const followers = new Map<HTMLSpanElement, Follower>();
const fullTravelDistance = 180;
const bodyEdgeInset = 0.06;
const eyeEase = 0.42;
const directionSampleCount = 72;
const eyePathSampleCount = 24;
const contourSearchSteps = 10;
const travelCache = new Map<string, NonNullable<Follower["travel"]>>();

let pointer: { x: number; y: number } | null = null;
let animationFrame: number | null = null;
let finePointerQuery: MediaQueryList | null = null;
let reducedMotionQuery: MediaQueryList | null = null;
let pointerListenerActive = false;

function renderEyePositions() {
  animationFrame = null;
  const motionAllowed = Boolean(finePointerQuery?.matches && !reducedMotionQuery?.matches);
  const updates: Array<{
    follower: Follower;
    targetX: number;
    targetY: number;
    nextX: number;
    nextY: number;
  }> = [];
  let needsAnotherFrame = false;

  for (const follower of followers.values()) {
    let targetX = 0;
    let targetY = 0;

    if (motionAllowed && pointer) {
      const rect = follower.body.getBoundingClientRect();
      const isVisible =
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.top < window.innerHeight &&
        rect.left < window.innerWidth;

      if (isVisible) {
        const dx = pointer.x - (rect.left + rect.width / 2);
        const dy = pointer.y - (rect.top + rect.height / 2);
        const distance = Math.hypot(dx, dy);

        if (distance > 0.5) {
          const directionX = dx / distance;
          const directionY = dy / distance;
          const strength = Math.min(1, distance / fullTravelDistance);
          const travel = follower.travel;

          if (travel) {
            const samplePosition =
              (((Math.atan2(directionY, directionX) + Math.PI * 2) %
                (Math.PI * 2)) /
                (Math.PI * 2)) *
              directionSampleCount;
            const lowerIndex = Math.floor(samplePosition) % directionSampleCount;
            const upperIndex = (lowerIndex + 1) % directionSampleCount;
            const radius = Math.min(
              travel.radii[lowerIndex] ?? 0,
              travel.radii[upperIndex] ?? 0,
            );
            targetX = travel.anchorX + directionX * radius * strength;
            targetY = travel.anchorY + directionY * radius * strength;
          }
        } else if (follower.travel) {
          targetX = follower.travel.anchorX;
          targetY = follower.travel.anchorY;
        }
      }
    }

    const nextX = motionAllowed
      ? follower.x + (targetX - follower.x) * eyeEase
      : targetX;
    const nextY = motionAllowed
      ? follower.y + (targetY - follower.y) * eyeEase
      : targetY;

    updates.push({ follower, targetX, targetY, nextX, nextY });
  }

  for (const { follower, targetX, targetY, nextX, nextY } of updates) {
    const resolvedX = Math.abs(targetX - nextX) < 0.05 ? targetX : nextX;
    const resolvedY = Math.abs(targetY - nextY) < 0.05 ? targetY : nextY;
    const changed = follower.x !== resolvedX || follower.y !== resolvedY;
    follower.x = resolvedX;
    follower.y = resolvedY;

    if (changed) {
      follower.eyes.setAttribute(
        "transform",
        `translate(${follower.x.toFixed(2)} ${follower.y.toFixed(2)})`,
      );
    }

    if (follower.x !== targetX || follower.y !== targetY) needsAnotherFrame = true;
  }

  if (needsAnotherFrame) scheduleEyePositions();
}

function scheduleEyePositions() {
  if (animationFrame === null) {
    animationFrame = window.requestAnimationFrame(renderEyePositions);
  }
}

function onPointerMove(event: PointerEvent) {
  if (event.pointerType && event.pointerType !== "mouse") return;
  pointer = { x: event.clientX, y: event.clientY };
  scheduleEyePositions();
}

function resetPointer() {
  pointer = null;
  scheduleEyePositions();
}

function onPreferenceChange() {
  syncPointerListener();
  pointer = null;
  scheduleEyePositions();
}

function syncPointerListener() {
  const shouldListen = Boolean(
    finePointerQuery?.matches && !reducedMotionQuery?.matches,
  );
  if (shouldListen === pointerListenerActive) return;

  if (shouldListen) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
  } else {
    window.removeEventListener("pointermove", onPointerMove);
    pointer = null;
  }
  pointerListenerActive = shouldListen;
}

function startPointerTracking() {
  finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  window.addEventListener("scroll", scheduleEyePositions, { passive: true });
  window.addEventListener("resize", scheduleEyePositions, { passive: true });
  window.addEventListener("blur", resetPointer);
  document.documentElement.addEventListener("pointerleave", resetPointer);
  finePointerQuery.addEventListener("change", onPreferenceChange);
  reducedMotionQuery.addEventListener("change", onPreferenceChange);
  syncPointerListener();
}

function stopPointerTracking() {
  if (pointerListenerActive) window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("scroll", scheduleEyePositions);
  window.removeEventListener("resize", scheduleEyePositions);
  window.removeEventListener("blur", resetPointer);
  document.documentElement.removeEventListener("pointerleave", resetPointer);
  finePointerQuery?.removeEventListener("change", onPreferenceChange);
  reducedMotionQuery?.removeEventListener("change", onPreferenceChange);
  finePointerQuery = null;
  reducedMotionQuery = null;
  pointerListenerActive = false;
  pointer = null;
  if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
  animationFrame = null;
}

function sampleEyeOutline(eyes: SVGGElement) {
  const points: Array<{ x: number; y: number }> = [];

  for (const path of eyes.querySelectorAll<SVGPathElement>("path")) {
    const length = path.getTotalLength();
    const matrix = path.transform.baseVal.consolidate()?.matrix;
    if (!matrix || length <= 0) continue;

    for (let index = 0; index < eyePathSampleCount; index += 1) {
      const point = path.getPointAtLength((length * index) / eyePathSampleCount);
      const transformed = new DOMPoint(point.x, point.y).matrixTransform(matrix);
      points.push({ x: transformed.x, y: transformed.y });
    }
  }

  return points;
}

function makeTravelProfile(
  body: SVGPathElement,
  eyes: SVGGElement,
): NonNullable<Follower["travel"]> | null {
  const bodyBox = body.getBBox();
  const eyeBox = eyes.getBBox();
  const eyeOutline = sampleEyeOutline(eyes);
  if (!eyeOutline.length || bodyBox.width <= 0 || bodyBox.height <= 0) return null;

  const fits = (x: number, y: number) =>
    eyeOutline.every((point) => body.isPointInFill({ x: point.x + x, y: point.y + y }));

  const desiredAnchorX =
    bodyBox.x + bodyBox.width / 2 - (eyeBox.x + eyeBox.width / 2);
  const desiredAnchorY =
    bodyBox.y + bodyBox.height / 2 - (eyeBox.y + eyeBox.height / 2);
  let anchorX = desiredAnchorX;
  let anchorY = desiredAnchorY;

  if (!fits(anchorX, anchorY)) {
    let low = 0;
    let high = 1;
    for (let step = 0; step < contourSearchSteps; step += 1) {
      const ratio = (low + high) / 2;
      if (fits(desiredAnchorX * ratio, desiredAnchorY * ratio)) low = ratio;
      else high = ratio;
    }
    const safeRatio = low * 0.85;
    anchorX = desiredAnchorX * safeRatio;
    anchorY = desiredAnchorY * safeRatio;
  }

  if (!fits(anchorX, anchorY)) {
    anchorX = 0;
    anchorY = 0;
  }

  const inset = Math.min(bodyBox.width, bodyBox.height) * bodyEdgeInset;
  const searchLimit = Math.hypot(bodyBox.width, bodyBox.height);
  const radii = Array.from({ length: directionSampleCount }, (_, index) => {
    const angle = (index / directionSampleCount) * Math.PI * 2;
    const directionX = Math.cos(angle);
    const directionY = Math.sin(angle);
    let low = 0;
    let high = searchLimit;

    for (let step = 0; step < contourSearchSteps; step += 1) {
      const distance = (low + high) / 2;
      if (
        fits(
          anchorX + directionX * distance,
          anchorY + directionY * distance,
        )
      ) {
        low = distance;
      } else {
        high = distance;
      }
    }

    return Math.max(0, low - inset);
  });

  return { anchorX, anchorY, radii };
}

function registerFollower(element: HTMLSpanElement, profileKey: string) {
  const eyes = element.querySelector<SVGGElement>("[data-bot-eyes]");
  const body = element.querySelector<SVGPathElement>("[data-bot-body]");
  if (!eyes || !body) return;

  eyes.setAttribute("transform", "translate(0 0)");
  const cachedTravel = travelCache.get(profileKey);
  const travel = cachedTravel ?? makeTravelProfile(body, eyes);
  if (travel && !cachedTravel) travelCache.set(profileKey, travel);

  followers.set(element, { element, body, eyes, travel, x: 0, y: 0 });
  if (followers.size === 1) startPointerTracking();
  scheduleEyePositions();

  return () => {
    followers.delete(element);
    eyes.removeAttribute("transform");
    if (followers.size === 0) stopPointerTracking();
  };
}

export function IdentityMascot({
  slug,
  size = 40,
  paper = "var(--card)",
  className,
}: {
  slug: TemplateIdentitySlug;
  size?: number;
  paper?: string;
  className?: string;
}) {
  const index = identityOrder[slug];
  const shape = shapes[index % shapes.length];
  const followerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = followerRef.current;
    if (!element) return;
    return registerFollower(element, shape);
  }, [shape]);

  return (
    <span
      ref={followerRef}
      data-identity-mascot={slug}
      className={cn("inline-flex shrink-0 items-center justify-center", className)}
      aria-hidden
    >
      <BotFace
        color={colors[index % colors.length]}
        shape={shape}
        expression="neutre"
        size={size}
        paper={paper}
      />
    </span>
  );
}
