import { COLOR_BY_ID, DEMI_VIEWBOX, NOTIF_BLUE, RAYON, type BotFrame, type DotRender } from "@/lib/bloub";
import { cn } from "@/lib/cn";

const ICON_BOX = Math.ceil(RAYON * 1.12);

export function paperHex(paper: string, theme: "light" | "dark" = "light"): string {
  if (paper.startsWith("#")) return paper;
  if (paper.includes("card")) return theme === "dark" ? "#12151a" : "#ffffff";
  return theme === "dark" ? "#0b0d10" : "#f6f7f9";
}

export function resolveInk(color?: string): string {
  if (!color) return "#0a0a0c";
  if (color.startsWith("#")) return color;
  return COLOR_BY_ID.get(color)?.hex ?? color;
}

function dotFill(dot: DotRender, ink: string, paper: string) {
  if (dot.color) return dot.color;
  if (dot.depth === undefined) return ink;
  return `color-mix(in srgb, ${paper} ${Math.round((1 - dot.depth) * 100)}%, ${ink})`;
}

function Dot({
  dot,
  ink,
  paper,
}: {
  dot: DotRender;
  ink: string;
  paper: string;
}) {
  const fill = dotFill(dot, ink, paper);
  const common = { fill, opacity: dot.opacity };
  if (dot.d) {
    return (
      <path
        d={dot.d}
        transform={`translate(${dot.x} ${dot.y}) rotate(${dot.rot ?? 0}) scale(${RAYON})`}
        {...common}
      />
    );
  }
  return <circle cx={dot.x} cy={dot.y} r={dot.r} {...common} />;
}

export function BloubSvg({
  frame,
  size,
  ink,
  paper,
  uid,
  crop = "icon",
  className,
  title,
}: {
  frame: BotFrame;
  size: number;
  ink: string;
  paper: string;
  uid: string;
  crop?: "icon" | "scene";
  className?: string;
  title?: string;
}) {
  const box = crop === "scene" ? DEMI_VIEWBOX : ICON_BOX;
  const maskId = `bot-mask-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`${-box} ${-box} ${box * 2} ${box * 2}`}
      className={cn("overflow-visible", className)}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x={-box} y={-box} width={box * 2} height={box * 2}>
          <path d={frame.bodyPath} fill="#fff" />
          <g data-bot-eyes>
            {frame.eyes.map((eye, index) => (
              <path key={index} d={eye.d} transform={eye.matrix} opacity={eye.alpha} fill="#000" />
            ))}
          </g>
          {frame.notch ? <circle cx={frame.notch.x} cy={frame.notch.y} r={frame.notch.r} fill="#000" /> : null}
        </mask>
        {frame.arcs.map((arc) => (
          <linearGradient
            key={arc.id}
            id={`${uid}-${arc.id}`}
            gradientUnits="userSpaceOnUse"
            x1={arc.grad.x1}
            y1={arc.grad.y1}
            x2={arc.grad.x2}
            y2={arc.grad.y2}
          >
            {arc.grad.stops.map((stop, index) => (
              <stop
                key={index}
                offset={arc.grad.stops.length === 1 ? 0 : index / (arc.grad.stops.length - 1)}
                stopColor={stop}
              />
            ))}
          </linearGradient>
        ))}
      </defs>

      <g fill="none" strokeLinecap="round">
        {frame.arcs.map((arc) => (
          <path
            key={`b${arc.id}`}
            d={arc.back}
            stroke={`url(#${uid}-${arc.id})`}
            strokeWidth={arc.width}
            opacity={arc.opacity}
          />
        ))}
      </g>

      {frame.dotsBehind
        ? frame.dots.map((dot, index) => <Dot key={`pb${index}`} dot={dot} ink={ink} paper={paper} />)
        : null}

      <g opacity={frame.bodyAlpha}>
        <path data-bot-body d={frame.bodyPath} fill={paper} />
        <g mask={`url(#${maskId})`}>
          <rect x={-box} y={-box} width={box * 2} height={box * 2} fill={ink} />
        </g>
      </g>

      {!frame.dotsBehind
        ? frame.dots.map((dot, index) => <Dot key={`pf${index}`} dot={dot} ink={ink} paper={paper} />)
        : null}

      {frame.notif ? (
        <circle cx={frame.notif.x} cy={frame.notif.y} r={frame.notif.r} fill={NOTIF_BLUE} />
      ) : null}

      <g fill="none" strokeLinecap="round">
        {frame.arcs.map((arc) => (
          <path
            key={`f${arc.id}`}
            d={arc.front}
            stroke={`url(#${uid}-${arc.id})`}
            strokeWidth={arc.width}
            opacity={arc.opacity}
          />
        ))}
      </g>
    </svg>
  );
}
