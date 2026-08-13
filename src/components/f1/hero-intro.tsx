"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { TelemetryLine } from "@/components/f1/telemetry-line";
import { F1LogoMark } from "@/components/f1/f1-logo-mark";

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

const TEXT_DELAY = 0.5;
const CTA_DELAY = 1.0;

const TEASER_STACK_ID = "explore";

export function HeroIntro() {
  function handleEnter() {
    document.getElementById(TEASER_STACK_ID)?.scrollIntoView({ behavior: "smooth" });
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 100, damping: 20 });
  const y = useSpring(rawY, { stiffness: 100, damping: 20 });
  const rotate = useTransform(rawX, [-12, 12], [-0.6, 0.6]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(relX * 24);
    rawY.set(relY * 16);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-carbon px-4 pb-12 pt-20 md:px-12 md:pb-24"
    >
      {/* Visual Anchor: Night Race Photography Backdrop */}
      <div className="absolute inset-0 z-0 opacity-45 grayscale transition-opacity duration-700 hover:opacity-60 hover:grayscale-0">
        <Image
          src="/images/heroes/season-hero-v2.png"
          alt="Formula 1 Night Grid Telemetry"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/80 to-carbon/40" />
      </div>

      {/* Telemetry Monospace Data Ticker Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="absolute top-20 left-4 right-4 z-10 flex items-center justify-between border-b border-asphalt/60 pb-3 font-mono text-[11px] uppercase tracking-widest text-brushed-steel md:left-12 md:right-12"
      >
        <div className="flex items-center gap-3">
          <span className="inline-block h-2 w-2 rounded-full bg-circuit-red animate-ping" />
          <span className="font-bold text-titanium">[ JOLPICA LIVE TELEMETRY ]</span>
        </div>
        <div className="hidden items-center gap-6 sm:flex">
          <span>LATENCY: 12MS</span>
          <span>SYSTEM: OPTIMAL</span>
          <span className="font-bold text-circuit-red-highlight">2026 REGULATION ERA</span>
        </div>
      </motion.div>

      {/* Ambient Grid Backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.08] bg-[linear-gradient(var(--asphalt)_1px,transparent_1px),linear-gradient(90deg,var(--asphalt)_1px,transparent_1px)] bg-[size:56px_56px]"
      />

      {/* Telemetry Line Sweep */}
      <TelemetryLine once duration={1.0} className="absolute left-0 right-0 top-32 z-10 max-w-none opacity-90" />

      {/* Hero Content — F1 Brand Logo + Tagline */}
      <motion.div
        style={{ x, y, rotate }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: TEXT_DELAY, duration: 0.8, ease: EASE_OUT_QUINT }}
        className="relative z-10 flex flex-col gap-5 mt-auto"
      >
        <div className="flex items-center gap-6">
          <F1LogoMark className="h-24 w-52 sm:h-32 sm:w-72 md:h-40 md:w-96" />
          <div className="hidden flex-col gap-1 border-l border-circuit-red/50 pl-6 md:flex">
            <span className="font-display text-3xl font-black uppercase tracking-tight text-titanium">
              FORMULA 1
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-circuit-red-highlight">
              THE APEX OF MOTORSPORT
            </span>
          </div>
        </div>

        <p className="max-w-xl font-mono text-xs uppercase tracking-widest text-brushed-steel sm:text-sm md:text-base">
          Formula 1, explained — real live telemetry from the grid to the standings.
        </p>
      </motion.div>

      {/* Primary CTA — Strict DESIGN.md §4 compliance (machined top highlight, zero outer glow) */}
      <motion.button
        type="button"
        onClick={handleEnter}
        data-cursor-text="ENTER"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ delay: CTA_DELAY, duration: 0.6, ease: EASE_OUT_QUINT }}
        className="relative z-10 mt-6 sm:mt-8 w-fit rounded-sm border-t border-circuit-red-highlight bg-circuit-red px-7 py-3 font-mono text-xs font-bold uppercase tracking-widest text-titanium transition-colors duration-200 hover:bg-circuit-red-highlight"
      >
        Explore Telemetry ↓
      </motion.button>
    </div>
  );
}
