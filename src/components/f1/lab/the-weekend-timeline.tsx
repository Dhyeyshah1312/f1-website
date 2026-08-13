"use client";

import { useState } from "react";
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

const EXPLAINERS: Record<string, string> = {
  practice:
    "Free practice sessions where teams test setup, tyre compounds, and fuel loads before the weekend gets serious. Drivers aren't racing each other yet — they're gathering data. Lap times often don't mean much here, since teams run different fuel loads and hide their real pace.",
  qualifying:
    "A three-part knockout session (Q1, Q2, Q3) that sets Sunday's starting grid. Each part eliminates the slowest cars until the final ten fight for pole position in Q3. One flying lap can be the difference between the front row and the back of the grid.",
  sprint:
    "A shorter standalone race — about 100km, no mandatory pit stops — that awards points to the top eight finishers but doesn't affect the main Grand Prix result. It also sets the grid for a separate Sprint Qualifying session held instead of a Friday practice session on those weekends.",
  race:
    "The Grand Prix itself — the full-length race that decides the weekend, run over a fixed number of laps or two hours, whichever comes first. Points go to the top ten finishers, with one extra point for the fastest lap if that driver finishes in the top ten.",
};

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
          <span className="font-mono text-xs font-bold uppercase tracking-wide text-circuit-red-highlight">
            {activeStage.day} — {activeStage.label}
          </span>
          <p className="font-mono text-sm leading-relaxed text-titanium max-w-3xl">
            {EXPLAINERS[activeStage.id]}
          </p>
        </div>
      )}
    </div>
  );
}
