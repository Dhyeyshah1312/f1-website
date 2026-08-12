"use client";

import { motion } from "motion/react";

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

// A stylized closed-loop circuit diagram — NOT this circuit's real layout. No
// FIA track trace data is available for any of the 23 circuits, and drawing
// a fake "realistic" layout would be worse than an honestly-abstract one.
// Built from distinct straights + corners (not one smooth blob) so it reads
// as a track at a glance: front straight, hairpin, chicane, sweeper, back
// straight — per DESIGN.md §7's track-line stroke-dashoffset draw-in.
const ABSTRACT_TRACK_PATH =
  "M50,150 L50,65 Q50,30 85,30 L175,30 Q195,30 200,45 Q205,60 220,60 Q235,60 240,45 Q245,30 265,30 L320,30 Q355,30 355,65 L355,135 Q355,165 320,165 L100,165 Q50,165 50,150 Z";

export function TrackOutlineReveal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      role="img"
      aria-label="Stylized circuit outline (not the real track layout)"
    >
      <motion.path
        d={ABSTRACT_TRACK_PATH}
        fill="none"
        stroke="var(--circuit-red)"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE_OUT_QUINT }}
      />
      {/* A single car light, lapping the completed outline once drawn-in —
          the sustained motion a finished, static circuit graphic can't give. */}
      <motion.circle
        r={4}
        fill="var(--circuit-red-highlight)"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 1, 0],
          offsetDistance: ["0%", "0%", "100%", "100%", "100%"],
        }}
        transition={{
          delay: 1.5,
          duration: 7,
          times: [0, 0.05, 0.85, 0.95, 1],
          ease: ["linear", "linear", "linear", "linear"],
          repeat: Infinity,
          repeatDelay: 0.4,
        }}
        style={{ offsetPath: `path("${ABSTRACT_TRACK_PATH}")`, offsetRotate: "0deg" }}
      />
    </svg>
  );
}
