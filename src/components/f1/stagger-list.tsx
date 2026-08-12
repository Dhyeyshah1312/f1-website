"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT_QUINT } },
};

/**
 * DESIGN.md §7 — "Lists never mount instantly — staggered cascade delays for
 * waterfall reveals (driver grid, calendar strip, standings rows)." One
 * reusable pair instead of hand-rolling per-index delays at each call site.
 */
export function StaggerList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}
