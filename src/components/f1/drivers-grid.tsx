"use client";

import { useMemo, useState } from "react";
import { isPending } from "@/lib/data/types";
import type { DriverStanding, Maybe } from "@/lib/data/types";
import { PendingToken } from "@/components/f1/pending-token";
import { DriverCard } from "@/components/f1/driver-card";
import { StaggerList, StaggerItem } from "@/components/f1/stagger-list";

type SortMode = "team" | "position" | "nationality";

interface DriversGridProps {
  drivers: Maybe<DriverStanding[]>;
  portraitAvailability: Record<string, boolean>;
}

function selectClass() {
  return "border border-asphalt bg-carbon px-2 py-1.5 font-mono text-xs text-titanium focus:border-circuit-red focus:outline-none";
}

export function DriversGrid({ drivers, portraitAvailability }: DriversGridProps) {
  const [sortMode, setSortMode] = useState<SortMode>("team");
  const [teamFilter, setTeamFilter] = useState<string>("all");

  const teams = useMemo(() => {
    if (isPending(drivers)) return [];
    const seen = new Map<string, string>();
    for (const d of drivers) if (!seen.has(d.constructorId)) seen.set(d.constructorId, d.constructorName);
    return [...seen.entries()];
  }, [drivers]);

  const grouped = useMemo(() => {
    if (isPending(drivers)) return [];
    const filtered =
      teamFilter === "all" ? drivers : drivers.filter((d) => d.constructorId === teamFilter);

    if (sortMode === "position") {
      return [{ key: "all", label: null, rows: [...filtered].sort((a, b) => a.position - b.position) }];
    }
    if (sortMode === "nationality") {
      const sorted = [...filtered].sort(
        (a, b) => a.nationality.localeCompare(b.nationality) || a.familyName.localeCompare(b.familyName),
      );
      return [{ key: "all", label: null, rows: sorted }];
    }
    // Grouped by team, in order of each team's best-placed driver (the list
    // arrives pre-sorted by position, so first-appearance order works).
    const groups = new Map<string, DriverStanding[]>();
    for (const d of filtered) {
      if (!groups.has(d.constructorId)) groups.set(d.constructorId, []);
      groups.get(d.constructorId)!.push(d);
    }
    return [...groups.entries()].map(([constructorId, rows]) => ({
      key: constructorId,
      label: rows[0]?.constructorName ?? constructorId,
      rows,
    }));
  }, [drivers, sortMode, teamFilter]);

  if (isPending(drivers)) {
    return (
      <div className="border-t border-asphalt py-6">
        <PendingToken source={drivers.source} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end gap-4 border-b border-asphalt pb-4">
        <label className="flex flex-col gap-1">
          <span className="font-mono text-[11px] uppercase tracking-wide text-brushed-steel">
            Sort by
          </span>
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            className={selectClass()}
          >
            <option value="team">Team</option>
            <option value="position">Standings position</option>
            <option value="nationality">Nationality</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-mono text-[11px] uppercase tracking-wide text-brushed-steel">
            Team
          </span>
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className={selectClass()}
          >
            <option value="all">All teams</option>
            {teams.map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {grouped.map((group) => (
        <div key={group.key} className="flex flex-col gap-4">
          {group.label && (
            <h2 className="font-display text-xl font-black tracking-tight text-titanium">
              {group.label}
            </h2>
          )}
          <StaggerList className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {group.rows.map((driver) => (
              <StaggerItem key={driver.driverId}>
                <DriverCard
                  driver={driver}
                  hasPortrait={portraitAvailability[driver.driverId] ?? false}
                />
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      ))}
    </div>
  );
}
