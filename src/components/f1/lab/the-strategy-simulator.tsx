"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Compound = "soft" | "medium" | "hard";

// Illustrative model only — fixed made-up degradation curves and pit-stop
// cost, not real telemetry. The point is to show the *shape* of the
// strategy trade-off (fast-but-fades vs. slow-but-durable), not to predict
// an actual race.
const COMPOUND_INFO: Record<Compound, { label: string; base: number; degradation: number }> = {
  soft: { label: "Soft", base: 90.0, degradation: 0.08 },
  medium: { label: "Medium", base: 90.8, degradation: 0.05 },
  hard: { label: "Hard", base: 91.5, degradation: 0.03 },
};

const TOTAL_LAPS = 50;
const PIT_STOP_COST = 22; // seconds

function simulate(stints: Compound[]): number {
  const baseStintLaps = Math.floor(TOTAL_LAPS / stints.length);
  let lapsAssigned = 0;
  let totalTime = 0;
  stints.forEach((compound, i) => {
    const isLast = i === stints.length - 1;
    const stintLaps = isLast ? TOTAL_LAPS - lapsAssigned : baseStintLaps;
    lapsAssigned += stintLaps;
    const { base, degradation } = COMPOUND_INFO[compound];
    for (let lap = 0; lap < stintLaps; lap++) {
      totalTime += base + degradation * lap;
    }
  });
  return totalTime + (stints.length - 1) * PIT_STOP_COST;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = (seconds % 60).toFixed(1).padStart(4, "0");
  return `${m}:${s}`;
}

const STOP_OPTIONS = [1, 2, 3] as const; // stint count: 0/1/2 stops

function buttonClass(active: boolean) {
  return cn(
    "border px-3 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors",
    active ? "border-circuit-red text-circuit-red" : "border-asphalt text-titanium hover:border-brushed-steel",
  );
}

/** Page Specs §8 — pit-stop/tyre-choice simulation, clearly illustrative. */
export function TheStrategySimulator() {
  const [stints, setStints] = useState<Compound[]>(["medium", "hard"]); // default: 1-stop

  function setStintCount(count: number) {
    setStints((prev) => {
      const next = [...prev];
      while (next.length < count) next.push("medium");
      while (next.length > count) next.pop();
      return next;
    });
  }

  const totalTime = useMemo(() => simulate(stints), [stints]);
  const baselineTime = useMemo(
    () => simulate(Array(stints.length).fill("medium") as Compound[]),
    [stints.length],
  );
  const delta = totalTime - baselineTime;

  return (
    <div className="flex flex-col gap-8">
      <p className="font-mono text-sm text-brushed-steel">
        <span className="text-circuit-red">Simulated</span> — an illustrative model ({TOTAL_LAPS}
        -lap race, fixed degradation curves), not real telemetry.
      </p>

      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-wide text-brushed-steel">Stops</span>
        <div className="flex gap-2">
          {STOP_OPTIONS.map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setStintCount(count)}
              className={buttonClass(stints.length === count)}
            >
              {count - 1}-stop
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs uppercase tracking-wide text-brushed-steel">
          Tyre choice per stint
        </span>
        <div className="flex flex-wrap gap-4">
          {stints.map((compound, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="font-mono text-[11px] text-brushed-steel">Stint {i + 1}</span>
              <div className="flex gap-1">
                {(Object.keys(COMPOUND_INFO) as Compound[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setStints((prev) => prev.map((s, idx) => (idx === i ? c : s)))}
                    className={buttonClass(compound === c)}
                  >
                    {COMPOUND_INFO[c].label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1 border-t border-asphalt pt-4">
        <span className="font-mono text-xs uppercase tracking-wide text-brushed-steel">
          Result — {TOTAL_LAPS} laps
        </span>
        <span className="font-display text-4xl font-black text-titanium">{formatTime(totalTime)}</span>
        <span className={cn("font-mono text-sm", delta < 0 ? "text-circuit-red" : "text-brushed-steel")}>
          {delta === 0
            ? "Same as an all-Medium strategy"
            : `${delta > 0 ? "+" : ""}${delta.toFixed(1)}s vs. an all-Medium strategy`}
        </span>
      </div>
    </div>
  );
}
