"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { DataValue } from "@/components/f1/data-value";
import { CountdownChip } from "@/components/f1/countdown-chip";
import { NAV_SECTIONS } from "@/components/f1/nav-sections";
import type { LiveSession, Maybe, RaceSummary } from "@/lib/data";

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

interface NavBarProps {
  nextRace: Maybe<RaceSummary>;
  liveSession: Maybe<LiveSession | null>;
}

export function NavBar({ nextRace, liveSession }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const isLive = liveSession !== null && typeof liveSession === "object" && "sessionKey" in liveSession;

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-asphalt/80 bg-carbon/80 px-4 backdrop-blur-xl transition-all duration-300 md:px-8">
        {/* Brand Logo with magnetic pull */}
        <Link
          href="/"
          data-cursor="magnetic"
          data-cursor-text="HOME"
          className="group flex items-center gap-2 font-display text-2xl font-black tracking-tighter text-titanium transition-all hover:scale-105"
          onClick={() => setOpen(false)}
        >
          <span className="text-circuit-red transition-colors group-hover:text-circuit-red-highlight">F1</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-brushed-steel group-hover:text-titanium">
            TELEMETRY
          </span>
        </Link>

        {/* Live Race Countdown Chip */}
        <div className="hidden items-center gap-3 md:flex">
          {isLive && (
            <span className="flex items-center gap-1.5 font-mono text-xs font-bold text-circuit-red">
              <span className="h-2 w-2 animate-ping rounded-full bg-circuit-red" />
              LIVE SESSION
            </span>
          )}
          <DataValue value={nextRace} render={(race) => <CountdownChip race={race} />} />
        </div>

        {/* Menu Toggle Button */}
        <button
          type="button"
          data-cursor="magnetic"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-10 w-10 items-center justify-center rounded border border-asphalt bg-graphite/60 text-titanium transition-all duration-300 hover:border-circuit-red hover:bg-circuit-red/20 hover:text-circuit-red-highlight"
        >
          <div className="flex h-4 w-5 flex-col justify-between">
            <span
              className={`h-0.5 w-full bg-current transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </header>

      {/* Fullscreen Navigation Index */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: EASE_OUT_QUINT }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-carbon/95 px-6 md:px-20"
            aria-label="Section index"
          >
            {/* Ambient telemetry grid lines */}
            <div className="pointer-events-none absolute inset-0 opacity-10 bg-[linear-gradient(var(--asphalt)_1px,transparent_1px),linear-gradient(90deg,var(--asphalt)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <ol className="relative z-10 flex flex-col gap-3">
              {NAV_SECTIONS.map((section, i) => (
                <motion.li
                  key={section.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: EASE_OUT_QUINT, delay: i * 0.05 }}
                >
                  {section.stretch ? (
                    <span className="flex items-baseline gap-4 py-2 text-brushed-steel/60">
                      <span className="font-mono text-sm">{section.index}</span>
                      <span className="font-display text-4xl font-black uppercase tracking-tight md:text-7xl">
                        {section.label}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-widest text-asphalt">— STRETCH</span>
                    </span>
                  ) : (
                    <Link
                      href={section.href}
                      data-cursor="magnetic"
                      data-cursor-text="GOTO"
                      onClick={() => setOpen(false)}
                      className="group relative flex items-baseline gap-6 py-2 text-titanium transition-all hover:translate-x-3"
                    >
                      <span className="font-mono text-sm font-bold text-circuit-red-highlight transition-colors group-hover:text-titanium">
                        {section.index}
                      </span>
                      <span className="font-display text-4xl font-black uppercase tracking-tight text-titanium transition-colors group-hover:text-circuit-red md:text-7xl">
                        {section.label}
                      </span>
                      {/* Underline sweep animation */}
                      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-circuit-red transition-all duration-300 group-hover:w-full" />
                    </Link>
                  )}
                </motion.li>
              ))}
            </ol>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
