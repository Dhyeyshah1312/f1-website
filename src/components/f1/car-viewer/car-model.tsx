"use client";

import type { CarComponentId } from "@/components/f1/car-viewer/car-components";

const BASE_COLOR = "#8A8F94"; // Brushed Steel
const DIM_COLOR = "#2A2D30"; // Asphalt Gray
const ACCENT_COLOR = "#D6303C"; // Circuit Red

interface PartAppearance {
  color: string;
  emissive: string;
  emissiveIntensity: number;
  opacity: number;
  transparent: boolean;
}

function partAppearance(partId: CarComponentId, selected: CarComponentId | null): PartAppearance {
  if (selected === null) {
    return { color: BASE_COLOR, emissive: "#000000", emissiveIntensity: 0, opacity: 1, transparent: false };
  }
  if (selected === partId) {
    return {
      color: ACCENT_COLOR,
      emissive: ACCENT_COLOR,
      emissiveIntensity: 0.5,
      opacity: 1,
      transparent: false,
    };
  }
  return { color: DIM_COLOR, emissive: "#000000", emissiveIntensity: 0, opacity: 0.25, transparent: true };
}

interface CarModelProps {
  selected: CarComponentId | null;
}

/**
 * A stylized, geometrically simplified F1 car built from primitives — not a
 * licensed or "realistic" 2026 car model (none exists to source; see
 * Page Specs §7 discussion). Deliberately reads as an abstract machined
 * form in DESIGN.md's language, not a claim of replica accuracy.
 */
export function CarModel({ selected }: CarModelProps) {
  const body = partAppearance("power-unit", selected);
  const frontWing = partAppearance("front-wing", selected);
  const floor = partAppearance("floor-diffuser", selected);
  const drs = partAppearance("drs-active-aero", selected);
  const suspension = partAppearance("suspension", selected);
  const tyres = partAppearance("tyres", selected);

  return (
    <group>
      {/* Monocoque / tub */}
      <mesh position={[0.2, 0.35, 0]}>
        <boxGeometry args={[1.7, 0.32, 0.85]} />
        <meshStandardMaterial {...body} />
      </mesh>

      {/* Nose cone */}
      <mesh position={[1.55, 0.28, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.22, 1.0, 12]} />
        <meshStandardMaterial {...frontWing} />
      </mesh>

      {/* Halo */}
      <mesh position={[-0.2, 0.68, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.32, 0.025, 8, 24, Math.PI]} />
        <meshStandardMaterial {...body} />
      </mesh>

      {/* Sidepods */}
      {[0.55, -0.55].map((z) => (
        <mesh key={z} position={[-0.5, 0.35, z]}>
          <boxGeometry args={[0.9, 0.32, 0.32]} />
          <meshStandardMaterial {...body} />
        </mesh>
      ))}

      {/* Engine cover — power unit */}
      <mesh position={[-1.05, 0.55, 0]}>
        <boxGeometry args={[0.9, 0.28, 0.5]} />
        <meshStandardMaterial {...body} />
      </mesh>

      {/* Front wing + endplates */}
      <mesh position={[2.15, 0.1, 0]}>
        <boxGeometry args={[0.45, 0.05, 1.7]} />
        <meshStandardMaterial {...frontWing} />
      </mesh>
      {[0.85, -0.85].map((z) => (
        <mesh key={z} position={[2.15, 0.2, z]}>
          <boxGeometry args={[0.45, 0.3, 0.03]} />
          <meshStandardMaterial {...frontWing} />
        </mesh>
      ))}

      {/* Floor */}
      <mesh position={[-0.3, 0.05, 0]}>
        <boxGeometry args={[3.0, 0.03, 1.6]} />
        <meshStandardMaterial {...floor} />
      </mesh>

      {/* Diffuser */}
      <mesh position={[-1.85, 0.15, 0]} rotation={[0, 0, -0.25]}>
        <boxGeometry args={[0.5, 0.03, 1.5]} />
        <meshStandardMaterial {...floor} />
      </mesh>

      {/* Rear wing pylons + DRS/active aero flap */}
      {[0.5, -0.5].map((z) => (
        <mesh key={z} position={[-1.95, 0.55, z]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 6]} />
          <meshStandardMaterial {...drs} />
        </mesh>
      ))}
      <mesh position={[-2.05, 0.8, 0]}>
        <boxGeometry args={[0.18, 0.35, 1.3]} />
        <meshStandardMaterial {...drs} />
      </mesh>

      {/* Suspension arms — simplified rods per wheel */}
      {[
        [1.35, 0.55],
        [1.35, -0.55],
        [-1.15, 0.55],
        [-1.15, -0.55],
      ].map(([x, z]) => (
        <group key={`${x}-${z}`}>
          <mesh position={[x, 0.32, z > 0 ? 0.65 : -0.65]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.015, 0.015, 0.6, 6]} />
            <meshStandardMaterial {...suspension} />
          </mesh>
        </group>
      ))}

      {/* Wheels / tyres */}
      {[
        [1.35, 0.85],
        [1.35, -0.85],
        [-1.35, 0.85],
        [-1.35, -0.85],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.32, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.28, 20]} />
          <meshStandardMaterial {...tyres} />
        </mesh>
      ))}
    </group>
  );
}
