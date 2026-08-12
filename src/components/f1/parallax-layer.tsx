"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * Subtle scroll parallax for hero background imagery. The child is
 * oversized (inset -10%) so the translate never reveals an edge gap.
 * Wraps an absolutely-positioned hero image/background — pass the same
 * `absolute inset-0` container className to this component instead.
 */
export function ParallaxLayer({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="absolute inset-[-8%]">
        {children}
      </motion.div>
    </div>
  );
}
