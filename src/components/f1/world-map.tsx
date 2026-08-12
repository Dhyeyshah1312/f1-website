"use client";

import type { Maybe, RaceSummary } from "@/lib/data/types";
import { Globe3DMap } from "@/components/f1/globe-3d-map";

interface WorldMapProps {
  schedule: Maybe<RaceSummary[]>;
}

export function WorldMap({ schedule }: WorldMapProps) {
  return (
    <div className="w-full">
      <Globe3DMap schedule={schedule} />
    </div>
  );
}
