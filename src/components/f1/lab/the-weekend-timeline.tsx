"use client";

import { useState } from "react";
import { PendingToken } from "@/components/f1/pending-token";
import { cn } from "@/lib/utils";

interface Stage {
  id: string;
  day: string;
  label: string;
}

const STAGES: Stage[] = [
  { id: "practice", day: "Friday", label: "Practice" },
  { id: "qualifying", day: "Saturday", label: "Qualifying" },
  { id: "sprint", day: "Saturday", label: "Sprint" },
  { id: "race", day: "Sunday", label: "Race" },
];

/** Page Specs §8 — click a stage for a one-line explainer (content not written yet). */
export function TheWeekendTimeline() {
  const [selected, setSelected] = useState<string>(STAGES[0].id);
  const activeStage = STAGES.find((s) => s.id === selected);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {STAGES.map((stage) => (
          <button
            key={stage.id}
            type="button"
            onClick={() => setSelected(stage.id)}
            className={cn(
              "flex flex-col gap-1 border-t-2 bg-graphite px-4 py-4 text-left transition-colors",
              selected === stage.id ? "border-circuit-red" : "border-asphalt hover:border-brushed-steel",
            )}
          >
            <span className="font-mono text-[11px] uppercase tracking-wide text-brushed-steel">
              {stage.day}
            </span>
            <span
              className={cn(
                "font-display text-xl font-black tracking-tight",
                selected === stage.id ? "text-circuit-red" : "text-titanium",
              )}
            >
              {stage.label}
            </span>
          </button>
        ))}
      </div>

      {activeStage && (
        <div className="flex flex-col gap-2 border-t border-asphalt pt-4">
          <span className="font-mono text-xs uppercase tracking-wide text-brushed-steel">
            {activeStage.day} — {activeStage.label}
          </span>
          <p className="flex items-center gap-2 font-mono text-sm">
            <span className="text-brushed-steel">Explainer —</span>
            <PendingToken source="EDITORIAL" />
          </p>
        </div>
      )}
    </div>
  );
}
