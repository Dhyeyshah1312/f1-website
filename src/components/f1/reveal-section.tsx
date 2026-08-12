"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll-driven reveal wrapper (Page Specs §3 — driver profile). DESIGN.md §7:
 * narrative/scroll-driven motion uses velocity-based easing, not spring
 * physics — this is the narrative register, not a UI micro-interaction.
 */
export function RevealSection({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: EASE_OUT_QUINT }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
