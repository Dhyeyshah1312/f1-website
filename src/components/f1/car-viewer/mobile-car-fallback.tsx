"use client";

import { useState } from "react";
import { CAR_COMPONENTS, type CarComponentId } from "@/components/f1/car-viewer/car-components";
import { InfoPanel } from "@/components/f1/car-viewer/info-panel";
import { cn } from "@/lib/utils";

/** Simplified static (non-3D) fallback below tablet width — DESIGN.md §6. */
export function MobileCarFallback() {
  const [selected, setSelected] = useState<CarComponentId | null>(null);

  return (
    <div className="flex flex-col border-t border-asphalt">
      <div className="flex flex-col gap-3 p-4">
        <p className="font-mono text-xs text-brushed-steel">
          Full 3D view available on larger screens. Select a component:
        </p>
        <div className="grid grid-cols-2 gap-2">
          {CAR_COMPONENTS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelected(c.id)}
              className={cn(
                "border px-3 py-2 text-left font-mono text-xs uppercase tracking-wide",
                selected === c.id ? "border-circuit-red text-circuit-red" : "border-asphalt text-titanium",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <InfoPanel selected={selected} />
    </div>
  );
}
