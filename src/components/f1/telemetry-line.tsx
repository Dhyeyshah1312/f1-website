"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// DESIGN.md §7 — velocity-based easing approximating ease-out-quint, used for
// narrative/scroll-driven motion. The telemetry line is the one motion motif
// reused everywhere loading/transition state would otherwise need a spinner.
const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

interface TelemetryLineProps {
  className?: string;
  /** Full sweep duration in seconds. */
  duration?: number;
  /** Play a single sweep instead of looping — the Discover intro's origin use. */
  once?: boolean;
  onSweepComplete?: () => void;
}

/**
 * The primary loading/transition motif (DESIGN.md §4, Page Specs §0): a
 * horizontal scan-line that sweeps left-to-right on an Asphalt Gray track.
 * Used for route transitions and page/section loading states — never a
 * circular spinner. Originates as the Discover homepage intro sweep (§1);
 * `once` is that original one-shot use, looping is the reused loading state.
 */
export function TelemetryLine({ className, duration = 1.1, once = false, onSweepComplete }: TelemetryLineProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("relative h-px w-full overflow-hidden bg-asphalt", className)}
    >
      <motion.div
        className="absolute inset-y-0 left-0 w-1/3 bg-circuit-red"
        initial={{ x: "-100%" }}
        animate={{ x: "300%" }}
        onAnimationComplete={once ? onSweepComplete : undefined}
        transition={
          once
            ? { duration, ease: EASE_OUT_QUINT }
            : { duration, ease: EASE_OUT_QUINT, repeat: Infinity, repeatDelay: 0.15 }
        }
      />
    </div>
  );
}
