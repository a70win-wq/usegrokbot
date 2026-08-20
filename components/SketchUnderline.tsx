import type { ReactNode } from "react";

export function SketchUnderline({ children, active = true }: { children: ReactNode; active?: boolean }) {
  if (!active) return <>{children}</>;

  return (
    <span className="relative inline-block pb-1">
      <span className="relative z-10">{children}</span>
      <svg
        className="pointer-events-none absolute -bottom-0.5 left-0 h-2 w-full overflow-visible"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M2 6 C 18 9, 34 2, 50 6 S 82 8, 98 4"
          pathLength="1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="text-accent motion-reduce:hidden"
          strokeDasharray="1"
          strokeDashoffset="1"
        >
          <animate attributeName="stroke-dashoffset" from="1" to="0" dur="0.62s" begin="0.18s" fill="freeze" />
        </path>
        <path
          d="M2 6 C 18 9, 34 2, 50 6 S 82 8, 98 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="hidden text-accent motion-reduce:block"
        />
      </svg>
    </span>
  );
}
