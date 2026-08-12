"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CarModel } from "@/components/f1/car-viewer/car-model";
import { HotspotMarkers } from "@/components/f1/car-viewer/hotspot-markers";
import { InfoPanel } from "@/components/f1/car-viewer/info-panel";
import type { CarComponentId } from "@/components/f1/car-viewer/car-components";

/**
 * Full 3D viewer — desktop/tablet only (DESIGN.md §6: the 3D scene is
 * desktop-first, narrower viewports get MobileCarFallback instead).
 * Performance-capped deliberately: dpr ceiling, no shadow maps, no
 * postprocessing — this is the heaviest page on the site (Page Specs §7).
 */
export function CarViewer() {
  const [selected, setSelected] = useState<CarComponentId | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_320px]">
      <div className="relative h-[70vh] min-h-[420px] border-t border-asphalt bg-carbon">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [4.5, 2.2, 4.5], fov: 40 }}
          onPointerMissed={() => setSelected(null)}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 6, 4]} intensity={1.1} />
          <directionalLight position={[-4, 3, -4]} intensity={0.35} />
          <CarModel selected={selected} />
          <HotspotMarkers selected={selected} onSelect={setSelected} />
          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={9}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
      </div>
      <InfoPanel selected={selected} />
    </div>
  );
}
