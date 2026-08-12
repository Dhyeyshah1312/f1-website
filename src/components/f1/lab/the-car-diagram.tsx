"use client";

import { useState } from "react";
import { CAR_COMPONENTS, type CarComponentId } from "@/components/f1/car-viewer/car-components";
import { PendingToken } from "@/components/f1/pending-token";

// 2D viewBox positions for this flat diagram — unrelated to the 3D viewer's
// coordinates, same six component ids/labels reused for consistency.
const DIAGRAM_POSITIONS: Record<CarComponentId, [number, number]> = {
  "front-wing": [30, 132],
  suspension: [95, 118],
  tyres: [310, 140],
  "power-unit": [230, 75],
  "drs-active-aero": [352, 60],
  "floor-diffuser": [260, 138],
};

/**
 * Page Specs §8 — simplified, non-3D version of the Technology page's
 * beginner content: same six components, a static diagram instead of the
 * R3F scene. The silhouette is schematic, not to scale.
 */
export function TheCarDiagram() {
  const [selected, setSelected] = useState<CarComponentId | null>(null);
  const component = CAR_COMPONENTS.find((c) => c.id === selected);

  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-start">
      <svg
        viewBox="0 0 400 160"
        className="w-full max-w-2xl"
        role="img"
        aria-label="Simplified car diagram, not to scale"
      >
        <path
          d="M20,140 L20,125 C20,110 35,100 55,100 L90,100 C100,80 120,65 150,65 L230,65 C245,65 255,72 260,85 L340,85 C355,85 365,95 365,110 L365,130 C365,138 358,140 350,140 Z"
          fill="var(--graphite)"
          stroke="var(--asphalt)"
          strokeWidth={2}
        />
        <circle cx={90} cy={140} r={20} fill="var(--carbon)" stroke="var(--asphalt)" strokeWidth={2} />
        <circle cx={310} cy={140} r={20} fill="var(--carbon)" stroke="var(--asphalt)" strokeWidth={2} />

        {CAR_COMPONENTS.map((c) => {
          const [x, y] = DIAGRAM_POSITIONS[c.id];
          const active = selected === c.id;
          return (
            <circle
              key={c.id}
              cx={x}
              cy={y}
              r={active ? 9 : 6}
              fill={active ? "var(--circuit-red)" : "var(--titanium)"}
              stroke="var(--carbon)"
              strokeWidth={1.5}
              className="cursor-pointer"
              onClick={() => setSelected(c.id)}
            />
          );
        })}
      </svg>

      <div className="flex flex-1 flex-col gap-3 border-t border-asphalt pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
        {component ? (
          <>
            <h2 className="font-display text-2xl font-black tracking-tight text-titanium">
              {component.label}
            </h2>
            <p className="flex items-center gap-2 font-mono text-sm">
              <span className="text-brushed-steel">Explainer —</span>
              <PendingToken source="EDITORIAL" />
            </p>
          </>
        ) : (
          <p className="font-mono text-sm text-brushed-steel">Click a dot on the diagram.</p>
        )}
      </div>
    </div>
  );
}
