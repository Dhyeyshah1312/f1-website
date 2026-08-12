"use client";

import { useMemo, useState } from "react";
import { isPending } from "@/lib/data/types";
import type { ConstructorStanding, DriverStanding, Maybe } from "@/lib/data/types";
import { PendingToken } from "@/components/f1/pending-token";
import { StaggerList, StaggerItem } from "@/components/f1/stagger-list";
import { getTeamUiAccent } from "@/lib/data/team-colors";
import { cn } from "@/lib/utils";

type SortKey = "position" | "name" | "points";
type SortDir = "asc" | "desc";

interface DriversTableProps {
  variant: "drivers";
  title: string;
  data: Maybe<DriverStanding[]>;
}

interface ConstructorsTableProps {
  variant: "constructors";
  title: string;
  data: Maybe<ConstructorStanding[]>;
}

type StandingsTableProps = DriversTableProps | ConstructorsTableProps;

function sortRows<T extends { position: number; points: number }>(
  rows: T[],
  key: SortKey,
  dir: SortDir,
  nameOf: (row: T) => string,
): T[] {
  const sorted = [...rows].sort((a, b) => {
    if (key === "position") return a.position - b.position;
    if (key === "points") return b.points - a.points;
    return nameOf(a).localeCompare(nameOf(b));
  });
  return dir === "asc" ? sorted : sorted.reverse();
}

function TeamAccentBar({ constructorId }: { constructorId: string }) {
  return (
    <span
      aria-hidden
      className="w-[4px] shrink-0 self-stretch rounded-full border border-brushed-steel/40 transition-all duration-200"
      style={{ backgroundColor: getTeamUiAccent(constructorId) }}
    />
  );
}

function SortHeader({
  label,
  active,
  dir,
  onClick,
  className,
}: {
  label: string;
  active: boolean;
  dir: SortDir;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "font-mono text-[11px] uppercase tracking-wide text-brushed-steel transition-colors hover:text-circuit-red-highlight",
        active && "font-bold text-titanium",
        className,
      )}
    >
      {label}
      {active && <span className="ml-1 text-circuit-red-highlight">{dir === "asc" ? "↑" : "↓"}</span>}
    </button>
  );
}

export function StandingsTable(props: StandingsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("position");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "points" ? "desc" : "asc");
    }
  };

  const driverRows = useMemo(() => {
    if (props.variant !== "drivers" || isPending(props.data)) return [];
    return sortRows(props.data, sortKey, sortDir, (row) => `${row.familyName} ${row.givenName}`);
  }, [props, sortKey, sortDir]);

  const constructorRows = useMemo(() => {
    if (props.variant !== "constructors" || isPending(props.data)) return [];
    return sortRows(props.data, sortKey, sortDir, (row) => row.constructorName);
  }, [props, sortKey, sortDir]);

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-asphalt/60 bg-graphite/30 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-asphalt/60 pb-2">
        <h2 className="font-display text-2xl font-black uppercase tracking-tight text-titanium">
          {props.title}
        </h2>
        <span className="font-mono text-[10px] uppercase tracking-widest text-brushed-steel">
          LIVE STANDINGS
        </span>
      </div>

      {isPending(props.data) ? (
        <div className="py-3">
          <PendingToken source={props.data.source} />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-[2rem_1fr_5rem] items-center gap-2 border-b border-asphalt/60 py-2">
            <SortHeader
              label="POS"
              active={sortKey === "position"}
              dir={sortDir}
              onClick={() => toggleSort("position")}
            />
            <SortHeader
              label={props.variant === "drivers" ? "DRIVER" : "TEAM"}
              active={sortKey === "name"}
              dir={sortDir}
              onClick={() => toggleSort("name")}
            />
            <SortHeader
              label="PTS"
              active={sortKey === "points"}
              dir={sortDir}
              onClick={() => toggleSort("points")}
              className="text-right"
            />
          </div>

          <StaggerList>
            {props.variant === "drivers"
              ? driverRows.map((row) => (
                  <StaggerItem key={row.driverId}>
                    <div className="group flex items-stretch gap-3 border-t border-asphalt/40 py-2.5 transition-colors duration-200 hover:bg-asphalt/30 hover:px-2 rounded-sm">
                      <TeamAccentBar constructorId={row.constructorId} />
                      <div className="grid flex-1 grid-cols-[2rem_1fr_5rem] items-center gap-2 font-mono">
                        <span className="text-xs font-bold text-circuit-red-highlight">{row.position}</span>
                        <span className="truncate font-body text-sm font-semibold text-titanium transition-colors group-hover:text-circuit-red-highlight">
                          {row.givenName} {row.familyName}
                        </span>
                        <span className="text-right text-sm font-bold text-titanium">{row.points}</span>
                      </div>
                    </div>
                  </StaggerItem>
                ))
              : constructorRows.map((row) => (
                  <StaggerItem key={row.constructorId}>
                    <div className="group flex items-stretch gap-3 border-t border-asphalt/40 py-2.5 transition-colors duration-200 hover:bg-asphalt/30 hover:px-2 rounded-sm">
                      <TeamAccentBar constructorId={row.constructorId} />
                      <div className="grid flex-1 grid-cols-[2rem_1fr_5rem] items-center gap-2 font-mono">
                        <span className="text-xs font-bold text-circuit-red-highlight">{row.position}</span>
                        <span className="truncate font-body text-sm font-semibold text-titanium transition-colors group-hover:text-circuit-red-highlight">
                          {row.constructorName}
                        </span>
                        <span className="text-right text-sm font-bold text-titanium">{row.points}</span>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
          </StaggerList>
        </div>
      )}
    </div>
  );
}
