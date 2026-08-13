import { cn } from "@/lib/utils";
import type { DataSource } from "@/lib/data/types";

interface PendingTokenProps {
  /** Which upstream source this value will come from once wired. */
  source: DataSource;
  className?: string;
}

/**
 * The unwired-data placeholder defined in DESIGN.md §4 ("Data Placeholder").
 * Exact token format `[PENDING — SOURCE]`, always Brushed Steel + mono, never
 * Titanium White or Circuit Red, and never paired with the live-pulse treatment
 * reserved for genuine live data — those two constraints are what make it
 * unmistakable as a placeholder rather than a real stat, not the wording alone.
 */
export function PendingToken({ source, className }: PendingTokenProps) {
  return (
    <span
      className={cn("font-mono text-brushed-steel text-xs sm:text-sm tracking-tight truncate max-w-full inline-block align-middle", className)}
      data-pending-source={source}
    >
      [PENDING — {source}]
    </span>
  );
}
