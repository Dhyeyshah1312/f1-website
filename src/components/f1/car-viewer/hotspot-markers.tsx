"use client";

import { useState } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import { CAR_COMPONENTS, type CarComponentId } from "@/components/f1/car-viewer/car-components";

interface HotspotMarkersProps {
  selected: CarComponentId | null;
  onSelect: (id: CarComponentId) => void;
}

/**
 * Six clickable hotspots, positioned near their real component. Uses R3F's
 * native pointer-event system (real raycasting against each sphere mesh),
 * not a 2D overlay faked to look aligned with the 3D scene.
 */
export function HotspotMarkers({ selected, onSelect }: HotspotMarkersProps) {
  const [hovered, setHovered] = useState<CarComponentId | null>(null);

  return (
    <>
      {CAR_COMPONENTS.map((c) => {
        const active = selected === c.id || hovered === c.id;
        return (
          <mesh
            key={c.id}
            position={c.position}
            onClick={(e: ThreeEvent<MouseEvent>) => {
              e.stopPropagation();
              onSelect(c.id);
            }}
            onPointerOver={(e: ThreeEvent<PointerEvent>) => {
              e.stopPropagation();
              setHovered(c.id);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              setHovered(null);
              document.body.style.cursor = "auto";
            }}
          >
            <sphereGeometry args={[active ? 0.09 : 0.06, 16, 16]} />
            <meshBasicMaterial color={active ? "#D6303C" : "#F4F5F6"} transparent opacity={active ? 1 : 0.85} />
          </mesh>
        );
      })}
    </>
  );
}
