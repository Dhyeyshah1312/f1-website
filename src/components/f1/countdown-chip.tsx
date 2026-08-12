"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { RaceSummary } from "@/lib/data";

interface CountdownChipProps {
  race: RaceSummary;
}

function targetDate(race: RaceSummary): Date {
  return new Date(`${race.race.date}T${race.race.time ?? "00:00:00Z"}`);
}

function formatRemaining(ms: number): string {
  if (ms <= 0) return "LIVE";
  const totalMinutes = Math.floor(ms / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  return `T-${String(days).padStart(2, "0")}:${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

/** Nav's live countdown chip (Page Specs §0) — ticks client-side once real race data is resolved. */
export function CountdownChip({ race }: CountdownChipProps) {
  const [remaining, setRemaining] = useState<string | null>(null);

  useEffect(() => {
    const target = targetDate(race);
    const tick = () => setRemaining(formatRemaining(target.getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000 * 30);
    return () => clearInterval(id);
  }, [race]);

  return (
    <span className="font-mono text-xs tracking-wide text-titanium">
      NEXT — {race.raceName.replace(" Grand Prix", "").toUpperCase()} —{" "}
      <AnimatePresence mode="popLayout" initial={false}>
        {/* Re-keying on each tick re-triggers the enter animation — a brief
            digital-readout flicker on every 30s update, not a static swap. */}
        <motion.span
          key={remaining}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="inline-block tabular-nums"
        >
          {remaining ?? "T-—:—:—"}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
