"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// The real F1 points table (P1-P10; P11+ score 0) — a fixed rule, not fetched
// data. Applied here to a made-up finishing order, not an actual race.
const POINTS = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
const INITIAL_ORDER = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

/**
 * Page Specs §8 — click-to-select finishing order (selecting, not literal
 * drag-and-drop — more reliable across touch/keyboard, and the spec allows
 * either). Pure UI logic: "Car A".."Car J" are placeholders, not drivers.
 */
export function ThePointsSimulator() {
  const [order, setOrder] = useState<string[]>(INITIAL_ORDER);
  const [picked, setPicked] = useState<string | null>(null);

  function handleChipClick(car: string, index: number) {
    if (picked === null) {
      setPicked(car);
      return;
    }
    if (picked === car) {
      setPicked(null);
      return;
    }
    setOrder((prev) => {
      const next = [...prev];
      const pickedIndex = next.indexOf(picked);
      [next[pickedIndex], next[index]] = [next[index], next[pickedIndex]];
      return next;
    });
    setPicked(null);
  }

  return (
    <div className="flex flex-col gap-8">
      <p className="font-mono text-sm text-brushed-steel">
        Click a car, then click a position to move it there. Points update live — this is the
        real F1 scoring table, applied to a made-up finishing order.
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {order.map((car, i) => {
          const pos = i + 1;
          const pts = POINTS[i] ?? 0;
          const isPicked = picked === car;
          return (
            <button
              key={pos}
              type="button"
              onClick={() => handleChipClick(car, i)}
              aria-pressed={isPicked}
              className={cn(
                "flex flex-col items-center gap-1 border-t-2 bg-graphite px-3 py-4 transition-colors",
                isPicked ? "border-circuit-red" : "border-asphalt hover:border-brushed-steel",
              )}
            >
              <span className="font-mono text-[11px] text-brushed-steel">P{pos}</span>
              <span className="font-display text-2xl font-black text-titanium">Car {car}</span>
              <span className="font-mono text-sm text-circuit-red">{pts} pts</span>
            </button>
          );
        })}
      </div>

      <p className="font-mono text-xs text-brushed-steel">
        {picked ? `Car ${picked} selected — click a position to move it.` : "Nothing selected."}
      </p>
    </div>
  );
}
