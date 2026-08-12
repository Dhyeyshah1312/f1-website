"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface SectionTeaserPanelProps {
  index: string;
  title: string;
  hook: string;
  href: string;
  /** Optional dimmed background element — real imagery only, never fabricated. */
  background?: ReactNode;
}

/**
 * Enhanced Awwwwards-tier full-viewport panel with deep 3D parallax, kinetic text reveals,
 * and deliberate micro-interactions.
 */
export function SectionTeaserPanel({ index, title, hook, href, background }: SectionTeaserPanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Deep multi-layer parallax & scale choreography
  const bgY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.0, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.3, 1, 1, 0.3]);

  // Spring-smoothed mouse hover tilt
  const smoothTextY = useSpring(textY, { stiffness: 120, damping: 20 });

  return (
    <div
      ref={ref}
      data-cursor-text="EXPLORE"
      className="group relative flex min-h-[100dvh] items-end overflow-hidden border-t border-asphalt/80 bg-carbon transition-colors duration-500 hover:border-circuit-red/50"
    >
      {/* Background imagery with 3D Parallax Depth & Ambient Red Glow on Hover */}
      {background ? (
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 opacity-30 grayscale transition-all duration-700 ease-out group-hover:opacity-60 group-hover:grayscale-0"
        >
          {background}
        </motion.div>
      ) : (
        /* Generative telemetry grid backdrop for sections without custom image */
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.16]"
        >
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, var(--circuit-red) 1px, transparent 1px), linear-gradient(0deg, var(--asphalt) 1px, transparent 1px), linear-gradient(90deg, var(--asphalt) 1px, transparent 1px)",
              backgroundSize: "40px 40px, 80px 80px, 80px 80px",
            }}
          />
        </motion.div>
      )}

      {/* Gradient mask for readable contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon via-carbon/60 to-transparent transition-opacity duration-500 group-hover:via-carbon/40" />

      {/* Red accent line highlight on left border */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-circuit-red to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Click target link */}
      <Link href={href} aria-label={title} className="absolute inset-0 z-20" />

      {/* Content choreography */}
      <motion.div
        style={{ y: smoothTextY, opacity: textOpacity }}
        className="relative z-10 flex w-full items-end justify-between p-6 md:p-14"
      >
        <div className="flex flex-col gap-3">
          {/* Index tag with red pulse */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold tracking-widest text-circuit-red-highlight">
              {index}
            </span>
            <span className="h-[1px] w-8 bg-circuit-red/50 transition-all duration-300 group-hover:w-16 group-hover:bg-circuit-red-highlight" />
          </div>

          {/* Title with character hover transition */}
          <h2 className="font-display text-6xl font-black uppercase tracking-tight text-titanium transition-all duration-300 group-hover:translate-x-2 group-hover:text-circuit-red md:text-9xl">
            {title}
          </h2>

          {/* Hook text */}
          <p className="max-w-md font-mono text-sm tracking-wide text-brushed-steel transition-colors duration-300 group-hover:text-titanium md:text-base">
            {hook}
          </p>
        </div>

        {/* Floating action pill indicator */}
        <div className="hidden items-center justify-center rounded-full border border-asphalt bg-graphite/80 p-4 text-titanium backdrop-blur-md transition-all duration-300 group-hover:border-circuit-red group-hover:bg-circuit-red group-hover:text-titanium md:flex">
          <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110" />
        </div>
      </motion.div>
    </div>
  );
}
