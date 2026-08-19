import { cn } from "@/lib/cn";
import type { TrustStatus } from "@/data/verification";

const styles: Record<TrustStatus, string> = {
  official: "border-accent-2/35 bg-accent-2/10 text-[#c4b5fd]",
  library: "border-line bg-elevated text-faint",
  community: "border-line bg-elevated text-mute",
  tested: "border-ok/30 bg-ok/10 text-ok",
};

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: TrustStatus;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase",
        styles[status],
        className,
      )}
    >
      {label}
    </span>
  );
}
