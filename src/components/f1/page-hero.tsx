"use client";

import React, { type ReactNode, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { TrackOutlineReveal } from "@/components/f1/track-outline-reveal";

interface PageHeroStat {
  label: string;
  value: ReactNode;
}

interface PageHeroProps {
  index: string;
  title: string;
  description?: string;
  imageSrc?: string;
  background?: ReactNode;
  stats?: PageHeroStat[];
}

export function PageHero({ index, title, description, imageSrc, background, stats }: PageHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[50dvh] items-end overflow-hidden border-b border-asphalt/80 bg-carbon px-4 pb-8 pt-24 md:px-12 md:pb-12 md:pt-32"
    >
      {/* Background Hero Image */}
      {imageSrc ? (
        <div className="absolute inset-0 z-0 opacity-80 transition-opacity duration-700 hover:opacity-95">
          <Image
            src={imageSrc}
            alt={title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/60 to-carbon/20" />
        </div>
      ) : background ? (
        <div className="absolute inset-0 z-0 opacity-70">
          {background}
          <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/60 to-carbon/20" />
        </div>
      ) : (
        <div className="pointer-events-none absolute -right-12 -top-12 h-[65vh] w-[65vh] opacity-[0.14] md:h-[75vh] md:w-[75vh]">
          <TrackOutlineReveal className="h-full w-full" />
        </div>
      )}

      {/* Ambient Grid Backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06] bg-[linear-gradient(var(--asphalt)_1px,transparent_1px),linear-gradient(90deg,var(--asphalt)_1px,transparent_1px)] bg-[size:48px_48px]"
      />

      {/* Machined Red Accent Line on Top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-circuit-red via-circuit-red-highlight to-transparent z-10" />

      {/* Hero Content */}
      <motion.div style={{ opacity }} className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-4">
        {/* Index Tag */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-circuit-red-highlight">
            {index}
          </span>
          <span className="h-[1px] w-12 bg-asphalt" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-brushed-steel">
            TELEMETRY DATA
          </span>
        </div>

        {/* Display Title with Kinetic Reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl font-black uppercase tracking-tight text-titanium drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)] md:text-8xl"
        >
          {title}
        </motion.h1>

        {/* Description Tagline */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl font-mono text-sm tracking-wide text-brushed-steel md:text-base"
          >
            {description}
          </motion.p>
        )}

        {/* Telemetry Stats Badges Grid */}
        {stats && stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 flex flex-wrap items-center gap-6 border-t border-asphalt/60 pt-4"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-0.5 font-mono text-xs">
                <span className="uppercase text-brushed-steel">{stat.label}</span>
                <span className="font-bold text-titanium">{stat.value}</span>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
