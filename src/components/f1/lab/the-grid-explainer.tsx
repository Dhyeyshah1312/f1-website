"use client";

import { useState } from "react";
import { isPending } from "@/lib/data/types";
import type { ConstructorStanding, DriverStanding, Maybe } from "@/lib/data/types";
import { PendingToken } from "@/components/f1/pending-token";
import { getTeamUiAccent } from "@/lib/data/team-colors";
import { TeamImage } from "@/components/f1/team-image";
import { cn } from "@/lib/utils";

interface TheGridExplainerProps {
  drivers: Maybe<DriverStanding[]>;
  constructors: Maybe<ConstructorStanding[]>;
}

/** Page Specs §8 — visual intro to 22 cars / 11 teams, reusing already-fetched standings data. */
export function TheGridExplainer({ drivers, constructors }: TheGridExplainerProps) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  if (isPending(drivers)) {
    return (
      <div className="border-t border-asphalt py-6">
        <PendingToken source={drivers.source} />
      </div>
    );
  }
  if (isPending(constructors)) {
    return (
      <div className="border-t border-asphalt py-6">
        <PendingToken source={constructors.source} />
      </div>
    );
  }

  const byTeam = new Map<string, DriverStanding[]>();
  for (const d of drivers) {
    if (!byTeam.has(d.constructorId)) byTeam.set(d.constructorId, []);
    byTeam.get(d.constructorId)!.push(d);
  }

  function toggle(id: string) {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="font-mono text-sm text-titanium">
        <span className="text-circuit-red">{revealed.size}</span> of {constructors.length} teams
        explored — {revealed.size * 2} of {constructors.length * 2} cars.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {constructors.map((team) => {
          const teamDrivers = byTeam.get(team.constructorId) ?? [];
          const isOpen = revealed.has(team.constructorId);
          const accent = getTeamUiAccent(team.constructorId);
          return (
            <button
              key={team.constructorId}
              type="button"
              onClick={() => toggle(team.constructorId)}
              className="flex flex-col gap-2 border-t-2 bg-graphite p-4 text-left transition-transform hover:bg-graphite/80"
              style={{ borderTopColor: accent }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-display text-lg font-black tracking-tight text-titanium">
                  {team.constructorName}
                </span>
                <TeamImage
                  constructorId={team.constructorId}
                  variant="logo"
                  hasImage
                  teamName={team.constructorName}
                  className="h-8 w-8 object-contain shrink-0"
                />
              </div>
              <span
                className={cn(
                  "font-mono text-xs text-brushed-steel transition-opacity",
                  isOpen ? "opacity-100" : "opacity-60",
                )}
              >
                2 drivers, 1 team — 2 cars on the grid
              </span>
              {isOpen && (
                <div className="mt-1 flex flex-col gap-1 border-t border-asphalt pt-2">
                  {teamDrivers.map((d) => (
                    <span key={d.driverId} className="font-mono text-sm text-titanium">
                      #{d.permanentNumber ?? "—"} {d.givenName} {d.familyName}
                    </span>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
