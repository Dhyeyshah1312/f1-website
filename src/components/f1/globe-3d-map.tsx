"use client";

import React, { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import Link from "next/link";
import Image from "next/image";
import type { Maybe, RaceSummary } from "@/lib/data/types";
import { isPending } from "@/lib/data/types";
import { circuitImageSlug } from "@/lib/data/image-slugs";

// 24 Official Formula 1 Grand Prix circuit coordinates
export const F1_CIRCUITS_DATA = [
  { id: "albert_park", name: "Albert Park Circuit", location: "Melbourne, Australia", lat: -37.8497, lng: 144.968, round: 1 },
  { id: "shanghai", name: "Shanghai International Circuit", location: "Shanghai, China", lat: 31.3389, lng: 121.22, round: 2 },
  { id: "suzuka", name: "Suzuka Circuit", location: "Suzuka, Japan", lat: 34.8431, lng: 136.541, round: 3 },
  { id: "bahrain", name: "Bahrain International Circuit", location: "Sakhir, Bahrain", lat: 26.0325, lng: 50.5106, round: 4 },
  { id: "jeddah", name: "Jeddah Corniche Circuit", location: "Jeddah, Saudi Arabia", lat: 21.6319, lng: 39.1044, round: 5 },
  { id: "miami", name: "Miami International Autodrome", location: "Miami, USA", lat: 25.958, lng: -80.2389, round: 6 },
  { id: "imola", name: "Autodromo Enzo e Dino Ferrari", location: "Imola, Italy", lat: 44.3439, lng: 11.7167, round: 7 },
  { id: "monaco", name: "Circuit de Monaco", location: "Monte Carlo, Monaco", lat: 43.7347, lng: 7.4206, round: 8 },
  { id: "montreal", name: "Circuit Gilles-Villeneuve", location: "Montréal, Canada", lat: 45.5, lng: -73.5228, round: 9 },
  { id: "catalunya", name: "Circuit de Barcelona-Catalunya", location: "Montmeló, Spain", lat: 41.57, lng: 2.2611, round: 10 },
  { id: "red_bull_ring", name: "Red Bull Ring", location: "Spielberg, Austria", lat: 47.2197, lng: 14.7647, round: 11 },
  { id: "silverstone", name: "Silverstone Circuit", location: "Silverstone, UK", lat: 52.0786, lng: -1.0169, round: 12 },
  { id: "hungaroring", name: "Hungaroring", location: "Mogyoród, Hungary", lat: 47.5789, lng: 19.2486, round: 13 },
  { id: "spa", name: "Circuit de Spa-Francorchamps", location: "Stavelot, Belgium", lat: 50.4372, lng: 5.9714, round: 14 },
  { id: "zandvoort", name: "Circuit Zandvoort", location: "Zandvoort, Netherlands", lat: 52.3888, lng: 4.5409, round: 15 },
  { id: "monza", name: "Autodromo Nazionale Monza", location: "Monza, Italy", lat: 45.6156, lng: 9.2811, round: 16 },
  { id: "baku", name: "Baku City Circuit", location: "Baku, Azerbaijan", lat: 40.3725, lng: 49.8533, round: 17 },
  { id: "singapore", name: "Marina Bay Street Circuit", location: "Singapore", lat: 1.2914, lng: 103.864, round: 18 },
  { id: "americas", name: "Circuit of The Americas", location: "Austin, USA", lat: 30.1328, lng: -97.6411, round: 19 },
  { id: "rodriguez", name: "Autódromo Hermanos Rodríguez", location: "Mexico City, Mexico", lat: 19.4042, lng: -99.0907, round: 20 },
  { id: "interlagos", name: "Autódromo José Carlos Pace", location: "São Paulo, Brazil", lat: -23.7036, lng: -46.6997, round: 21 },
  { id: "vegas", name: "Las Vegas Strip Circuit", location: "Las Vegas, USA", lat: 36.1147, lng: -115.173, round: 22 },
  { id: "losail", name: "Lusail International Circuit", location: "Lusail, Qatar", lat: 25.49, lng: 51.4542, round: 23 },
  { id: "yas_marina", name: "Yas Marina Circuit", location: "Abu Dhabi, UAE", lat: 24.4672, lng: 54.6031, round: 24 },
];

interface Globe3DMapProps {
  schedule?: Maybe<RaceSummary[]>;
}

export function Globe3DMap({ schedule }: Globe3DMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const pointerStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [selectedCircuit, setSelectedCircuit] = useState(F1_CIRCUITS_DATA[0]);
  const [imgError, setImgError] = useState(false);

  const nextRaceId = !isPending(schedule) && schedule && schedule.length > 0 ? schedule[0]?.circuit?.id : "monaco";

  useEffect(() => {
    setImgError(false);
  }, [selectedCircuit.id]);

  useEffect(() => {
    let width = 0;
    let animId: number;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 24000,
      mapBrightness: 3.5,
      baseColor: [0.05, 0.07, 0.1],
      markerColor: [0.95, 0.25, 0.3],
      glowColor: [0.15, 0.2, 0.25],
      markers: F1_CIRCUITS_DATA.map((c) => {
        const isSelected = c.id === selectedCircuit.id;
        const isNext = c.id === nextRaceId || c.id.includes(nextRaceId || "");
        return {
          location: [c.lat, c.lng],
          size: isSelected ? 0.09 : isNext ? 0.07 : 0.045,
        };
      }),
    });

    const render = () => {
      if (pointerInteracting.current === null) {
        phiRef.current += 0.003;
      }
      globe.update({
        phi: phiRef.current + pointerInteractionMovement.current,
        width: width * 2,
        height: width * 2,
      });
      animId = requestAnimationFrame(render);
    };

    render();

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 100);

    return () => {
      cancelAnimationFrame(animId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [nextRaceId, selectedCircuit.id]);

  // Click on globe marker logic: hit test 3D sphere projection to find tapped circuit
  function handleCanvasClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Ignore if drag distance was significant
    const dx = e.clientX - pointerStartPos.current.x;
    const dy = e.clientY - pointerStartPos.current.y;
    if (Math.hypot(dx, dy) > 8) return;

    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const radius = rect.width / 2;
    const currentPhi = phiRef.current + pointerInteractionMovement.current;

    let closestCircuit = null;
    let minDistance = Infinity;

    for (const c of F1_CIRCUITS_DATA) {
      const phi_m = (c.lng * Math.PI) / 180;
      const theta_m = (c.lat * Math.PI) / 180;

      // 3D projection on rotated sphere
      const x = Math.cos(theta_m) * Math.sin(phi_m + currentPhi);
      const y = Math.sin(theta_m);
      const z = Math.cos(theta_m) * Math.cos(phi_m + currentPhi);

      // Only evaluate front hemisphere
      if (z > 0) {
        const markerX = radius + radius * x;
        const markerY = radius - radius * y * 0.9; // slight tilt scaling
        const dist = Math.hypot(cx - markerX, cy - markerY);
        if (dist < minDistance && dist < 35) {
          minDistance = dist;
          closestCircuit = c;
        }
      }
    }

    if (closestCircuit) {
      setSelectedCircuit(closestCircuit);
    }
  }

  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl border border-asphalt/80 bg-graphite/40 backdrop-blur-md lg:flex-row">
      {/* 3D WebGL Globe Viewport */}
      <div className="relative flex flex-1 items-center justify-center p-4 min-h-[450px] md:min-h-[550px]">
        {/* Globe canvas */}
        <div className="relative aspect-square w-full max-w-[500px]">
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            onPointerDown={(e) => {
              pointerStartPos.current = { x: e.clientX, y: e.clientY };
              pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
              if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
            }}
            onPointerUp={() => {
              pointerInteracting.current = null;
              if (canvasRef.current) canvasRef.current.style.cursor = "grab";
            }}
            onPointerOut={() => {
              pointerInteracting.current = null;
              if (canvasRef.current) canvasRef.current.style.cursor = "grab";
            }}
            onMouseMove={(e) => {
              if (pointerInteracting.current !== null) {
                const delta = e.clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta * 0.008;
              }
            }}
            onTouchMove={(e) => {
              if (pointerInteracting.current !== null && e.touches[0]) {
                const delta = e.touches[0].clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta * 0.008;
              }
            }}
            className="h-full w-full cursor-grab opacity-0 transition-opacity duration-700 ease-in-out"
          />
        </div>

        {/* Floating Telemetry Badge */}
        <div className="absolute top-6 left-6 flex items-center gap-2 rounded border border-asphalt/80 bg-carbon/90 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-titanium backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-circuit-red animate-ping" />
          <span>3D TELEMETRY GLOBE</span>
        </div>

        {/* Drag / Tap Instruction */}
        <div className="absolute bottom-6 left-6 font-mono text-[11px] uppercase tracking-widest text-brushed-steel">
          [ TAP DOTS OR DRAG GLOBE ]
        </div>
      </div>

      {/* Circuit Inspector Panel */}
      <div className="flex w-full flex-col justify-between border-t border-asphalt/80 bg-carbon/95 p-6 lg:w-[420px] lg:border-t-0 lg:border-l">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-asphalt/60 pb-3">
            <span className="font-mono text-xs font-bold text-circuit-red-highlight">
              ROUND {selectedCircuit.round} / 24
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-brushed-steel">
              CIRCUIT INSPECTOR
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-display text-3xl font-black uppercase tracking-tight text-titanium">
              {selectedCircuit.name}
            </h3>
            <span className="font-mono text-sm tracking-wide text-circuit-red-highlight">
              📍 {selectedCircuit.location}
            </span>
          </div>

          {/* Image preview box with key prop + error recovery fallback */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded border border-asphalt bg-graphite flex items-center justify-center">
            {!imgError ? (
              <Image
                key={selectedCircuit.id}
                src={`/images/circuits/${circuitImageSlug(selectedCircuit.id)}.jpg`}
                alt={selectedCircuit.name}
                fill
                className="object-cover"
                sizes="400px"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="font-display text-2xl font-black tracking-tight text-asphalt text-center px-4">
                {selectedCircuit.name}
              </span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="flex flex-col gap-0.5 rounded border border-asphalt/50 bg-graphite/40 p-2.5">
              <span className="text-[10px] uppercase text-brushed-steel">LATITUDE</span>
              <span className="font-bold text-titanium">{selectedCircuit.lat.toFixed(4)}°</span>
            </div>
            <div className="flex flex-col gap-0.5 rounded border border-asphalt/50 bg-graphite/40 p-2.5">
              <span className="text-[10px] uppercase text-brushed-steel">LONGITUDE</span>
              <span className="font-bold text-titanium">{selectedCircuit.lng.toFixed(4)}°</span>
            </div>
          </div>
        </div>

        {/* Quick Circuit Selector Strip */}
        <div className="mt-6 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-brushed-steel">
            SELECT CIRCUIT ON GRID
          </span>
          <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto pr-1">
            {F1_CIRCUITS_DATA.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCircuit(c)}
                className={`rounded px-2.5 py-1 font-mono text-[11px] font-bold uppercase transition-all ${
                  selectedCircuit.id === c.id
                    ? "border border-circuit-red-highlight bg-circuit-red text-titanium shadow-[0_0_10px_rgba(214,48,60,0.5)]"
                    : "border border-asphalt/60 bg-graphite/40 text-brushed-steel hover:border-titanium hover:text-titanium"
                }`}
              >
                R{c.round} {c.id.replace(/_/g, " ").toUpperCase()}
              </button>
            ))}
          </div>

          <Link
            href={`/circuits/${selectedCircuit.id}`}
            data-cursor="magnetic"
            data-cursor-text="VIEW"
            className="mt-4 flex w-full items-center justify-center rounded border border-circuit-red-highlight bg-circuit-red/20 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-titanium transition-all hover:bg-circuit-red hover:shadow-[0_0_20px_rgba(214,48,60,0.6)]"
          >
            Inspect Circuit Telemetry →
          </Link>
        </div>
      </div>
    </div>
  );
}
