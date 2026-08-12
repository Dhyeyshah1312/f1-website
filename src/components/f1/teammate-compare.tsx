"use client";

import { useState } from "react";
import type { DriverStanding } from "@/lib/data/types";
import { DriverStat } from "@/components/f1/driver-stat";

interface TeammateCompareProps {
  driver: DriverStanding;
  teammate: DriverStanding | null;
}

/** Page Specs §3 — "Compare to teammate" toggle, current-season stats side by side. */
export function TeammateCompare({ driver, teammate }: TeammateCompareProps) {
  const [open, setOpen] = useState(false);

  if (!teammate) return null;

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-fit border border-brushed-steel px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-titanium transition-colors hover:border-circuit-red hover:text-circuit-red"
      >
        {open ? "Hide comparison" : `Compare to ${teammate.givenName} ${teammate.familyName}`}
      </button>

      {open && (
        <div className="grid grid-cols-2 gap-6 border-t border-asphalt pt-4">
          {[driver, teammate].map((d) => (
            <div key={d.driverId} className="flex flex-col gap-3">
              <span className="font-display text-lg font-black tracking-tight text-titanium">
                {d.givenName} {d.familyName}
              </span>
              <DriverStat label="Position" value={`P${d.position}`} />
              <DriverStat label="Points" value={d.points} />
              <DriverStat label="Wins" value={d.wins} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
