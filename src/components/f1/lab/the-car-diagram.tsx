"use client";

import { useState } from "react";
import { CAR_COMPONENTS, type CarComponentId } from "@/components/f1/car-viewer/car-components";
import { CAR_COMPONENT_EXPLAINERS } from "@/lib/data/car-component-explainers";

// 2D viewBox coordinates (0 0 500 180) for the sleek F1 car side profile
const DIAGRAM_POSITIONS: Record<CarComponentId, [number, number]> = {
  "front-wing": [45, 125],
  suspension: [130, 110],
  tyres: [390, 128],
  "power-unit": [280, 82],
  "drs-active-aero": [445, 55],
  "floor-diffuser": [300, 138],
};

/**
 * Simplified 2D interactive F1 car diagram (Beginner's Lab "The Car" page).
 * Features an authentic low-slung F1 side-profile silhouette with front/rear wings,
 * explicit Halo safety structure loop, open cockpit, exposed wheels, and floor diffuser.
 */
export function TheCarDiagram() {
  const [selected, setSelected] = useState<CarComponentId>("front-wing");
  const component = CAR_COMPONENTS.find((c) => c.id === selected) ?? CAR_COMPONENTS[0];
  const explainer = CAR_COMPONENT_EXPLAINERS[selected];

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      <div className="relative flex w-full flex-1 items-center justify-center rounded-xl border border-asphalt/80 bg-graphite/40 p-6 backdrop-blur-md">
        <svg
          viewBox="0 0 500 180"
          className="w-full max-w-2xl select-none"
          role="img"
          aria-label="Formula 1 Car Side Profile Diagram"
        >
          <defs>
            <linearGradient id="f1CarBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#17191B" />
              <stop offset="50%" stopColor="#2A2D30" />
              <stop offset="100%" stopColor="#17191B" />
            </linearGradient>
            <linearGradient id="haloGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D6303C" />
              <stop offset="100%" stopColor="#F4F5F6" />
            </linearGradient>
          </defs>

          {/* Underbody Floor & Rear Diffuser */}
          <path
            d="M 40 142 H 460 L 475 125 H 440 L 420 138 H 100 L 70 142 Z"
            fill="#0B0C0D"
            stroke="#D6303C"
            strokeWidth="1.5"
          />

          {/* Front Wing Assembly */}
          <path
            d="M 15 132 L 65 132 L 75 142 H 20 Z"
            fill="#D6303C"
            stroke="#F4F5F6"
            strokeWidth="1"
          />
          <path d="M 15 120 V 138 H 22 V 120 Z" fill="#F4F5F6" />

          {/* Low Slung F1 Nose Cone & Chassis Body Line */}
          <path
            d="M 65 132 L 140 115 C 170 110 200 100 220 92 L 235 78 C 242 70 255 70 265 78 L 275 88 C 290 85 330 85 370 88 L 420 95 C 435 95 445 105 450 120 H 420 C 400 120 370 110 330 110 H 140 Z"
            fill="url(#f1CarBody)"
            stroke="#8A8F94"
            strokeWidth="1.5"
          />

          {/* Red Livery Accent Striping */}
          <path
            d="M 120 118 Q 200 100 270 86 Q 350 88 410 97"
            fill="none"
            stroke="#D6303C"
            strokeWidth="3"
          />

          {/* Driver Helmet */}
          <circle cx="236" cy="82" r="7" fill="#F4F5F6" stroke="#D6303C" strokeWidth="1.5" />

          {/* Authentic F1 Halo Safety Loop Structure */}
          {/* Central Mount Pillar */}
          <line x1="216" y1="92" x2="224" y2="70" stroke="#D6303C" strokeWidth="3" strokeLinecap="round" />
          {/* Protective Arch Loop */}
          <path
            d="M 218 84 C 230 54 260 56 270 70 L 262 78 C 255 68 234 66 224 88 Z"
            fill="#17191B"
            stroke="url(#haloGrad)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Engine Airbox Roll Hoop Intake */}
          <path d="M 260 75 L 275 62 L 285 75 Z" fill="#0B0C0D" stroke="#D6303C" strokeWidth="1" />

          {/* Rear Wing Endplates & DRS Mainplane Wing */}
          <path
            d="M 430 50 H 475 V 105 H 455 V 68 H 430 Z"
            fill="#17191B"
            stroke="#F4F5F6"
            strokeWidth="1.5"
          />
          <path d="M 435 55 H 470" stroke="#D6303C" strokeWidth="4" strokeLinecap="round" />
          <path d="M 435 64 H 470" stroke="#F4F5F6" strokeWidth="2" strokeLinecap="round" />

          {/* Suspension Arms */}
          <line x1="120" y1="120" x2="140" y2="128" stroke="#8A8F94" strokeWidth="2" />
          <line x1="120" y1="128" x2="145" y2="135" stroke="#8A8F94" strokeWidth="2" />
          <line x1="380" y1="115" x2="400" y2="128" stroke="#8A8F94" strokeWidth="2" />

          {/* Open Wheels — Front Tyre */}
          <g>
            <circle cx="120" cy="128" r="24" fill="#0B0C0D" stroke="#2A2D30" strokeWidth="3" />
            <circle cx="120" cy="128" r="13" fill="#17191B" stroke="#D6303C" strokeWidth="2" />
            <circle cx="120" cy="128" r="4" fill="#F4F5F6" />
          </g>

          {/* Open Wheels — Rear Tyre */}
          <g>
            <circle cx="390" cy="128" r="26" fill="#0B0C0D" stroke="#2A2D30" strokeWidth="3" />
            <circle cx="390" cy="128" r="14" fill="#17191B" stroke="#D6303C" strokeWidth="2" />
            <circle cx="390" cy="128" r="4" fill="#F4F5F6" />
          </g>

          {/* Interactive Component Hotspots with 48px Transparent Hit Targets */}
          {CAR_COMPONENTS.map((c) => {
            const [x, y] = DIAGRAM_POSITIONS[c.id];
            const active = selected === c.id;
            return (
              <g
                key={c.id}
                className="cursor-pointer"
                onClick={() => setSelected(c.id)}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  setSelected(c.id);
                }}
              >
                {/* 48px hit area target */}
                <circle cx={x} cy={y} r={24} fill="transparent" pointerEvents="all" />
                {active && (
                  <circle
                    cx={x}
                    cy={y}
                    r={14}
                    fill="none"
                    stroke="#D6303C"
                    strokeWidth="1.5"
                    className="animate-ping opacity-75"
                    pointerEvents="none"
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={active ? 9 : 6.5}
                  fill={active ? "#E35864" : "#F4F5F6"}
                  stroke="#0B0C0D"
                  strokeWidth="2"
                  className="transition-all duration-200"
                  pointerEvents="none"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Component Explainer Side Panel */}
      <div className="flex flex-1 flex-col gap-4 rounded-xl border border-asphalt/80 bg-carbon/95 p-6 md:p-8">
        <div className="flex items-center gap-2 font-mono text-xs text-circuit-red-highlight uppercase tracking-widest">
          <span>COMPONENT INSPECTOR</span>
          <span>—</span>
          <span>{selected}</span>
        </div>

        <h2 className="font-display text-3xl font-black uppercase tracking-tight text-titanium">
          {component.label}
        </h2>

        <div className="flex flex-col gap-2 border-t border-asphalt/60 pt-4 font-mono text-sm leading-relaxed text-titanium">
          <span className="text-xs uppercase tracking-wider text-brushed-steel font-bold">
            Plain Language Explainer:
          </span>
          <p>{explainer?.beginner ?? "Click a dot on the diagram to inspect that F1 car component."}</p>
        </div>

        <div className="mt-2 flex flex-wrap gap-2 pt-2">
          {CAR_COMPONENTS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelected(c.id)}
              className={`rounded px-3 py-1.5 font-mono text-xs font-bold uppercase transition-all ${
                selected === c.id
                  ? "border border-circuit-red-highlight bg-circuit-red text-titanium"
                  : "border border-asphalt/60 bg-graphite/40 text-brushed-steel hover:text-titanium"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
