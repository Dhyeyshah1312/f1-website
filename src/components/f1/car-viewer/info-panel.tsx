"use client";

import { useState } from "react";
import { CAR_COMPONENTS, type CarComponentId } from "@/components/f1/car-viewer/car-components";
import { CAR_COMPONENT_EXPLAINERS } from "@/lib/data/car-component-explainers";
import { cn } from "@/lib/utils";

type Mode = "beginner" | "technical";

interface InfoPanelProps {
  selected: CarComponentId | null;
}

/** Page Specs §7 — component info + Beginner/Technical mode toggle, explainer copy from lib/data/car-component-explainers.ts. */
export function InfoPanel({ selected }: InfoPanelProps) {
  const [mode, setMode] = useState<Mode>("beginner");
  const component = CAR_COMPONENTS.find((c) => c.id === selected);
  const explainer = selected ? CAR_COMPONENT_EXPLAINERS[selected] : null;

  return (
    <div className="flex flex-col gap-4 border-t border-asphalt p-4 md:border-l md:border-t-0 md:p-6">
      <div className="flex border border-asphalt">
        {(["beginner", "technical"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              "flex-1 px-3 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors",
              mode === m ? "bg-circuit-red text-titanium" : "text-brushed-steel hover:text-titanium",
            )}
          >
            {m}
          </button>
        ))}
      </div>

      {component ? (
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wide text-brushed-steel">
            Selected component
          </span>
          <h3 className="font-display text-2xl font-black tracking-tight text-titanium">
            {component.label}
          </h3>
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-sm text-brushed-steel">
              {mode === "beginner" ? "Explainer —" : "Technical detail —"}
            </span>
            <p className="max-w-[65ch] font-body text-sm leading-[1.5] text-titanium">
              {explainer ? explainer[mode] : null}
            </p>
          </div>
        </div>
      ) : (
        <p className="font-mono text-sm text-brushed-steel">
          Click a hotspot on the car to isolate a component.
        </p>
      )}
    </div>
  );
}
