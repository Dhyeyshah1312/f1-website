"use client";

import { useState } from "react";
import Link from "next/link";
import { isPending } from "@/lib/data/types";
import type { Maybe, RaceSummary, RoundDetail, RoundWinner } from "@/lib/data/types";
import { PendingToken } from "@/components/f1/pending-token";
import { RoundDetailPanel } from "@/components/f1/round-detail-panel";
import { StaggerList, StaggerItem } from "@/components/f1/stagger-list";
import { cn } from "@/lib/utils";

interface CalendarStripProps {
  schedule: Maybe<RaceSummary[]>;
  winners: Maybe<Map<number, RoundWinner>>;
}

function raceTimestamp(round: RaceSummary): number {
  return new Date(`${round.race.date}T${round.race.time ?? "00:00:00Z"}`).getTime();
}

export function CalendarStrip({ schedule, winners }: CalendarStripProps) {
  const [expandedRound, setExpandedRound] = useState<number | null>(null);
  const [details, setDetails] = useState<Record<number, RoundDetail | "loading">>({});
  // Lazy initializer — the one React-sanctioned place to read a clock value
  // during render; a full day-level "now" doesn't need to tick like the nav
  // countdown does, so it's read once rather than kept live.
  const [now] = useState(() => Date.now());

  if (isPending(schedule)) {
    return (
      <div className="flex flex-col gap-3">
        <h2 className="font-display text-2xl font-black tracking-tight text-titanium">Calendar</h2>
        <PendingToken source={schedule.source} />
      </div>
    );
  }

  async function handleRoundClick(round: RaceSummary) {
    if (expandedRound === round.round) {
      setExpandedRound(null);
      return;
    }
    setExpandedRound(round.round);
    if (!details[round.round]) {
      setDetails((d) => ({ ...d, [round.round]: "loading" }));
      try {
        const res = await fetch(`/api/rounds/${round.round}`);
        const data = (await res.json()) as RoundDetail;
        setDetails((d) => ({ ...d, [round.round]: data }));
      } catch {
        // Leave it on "loading" -> the panel keeps showing the telemetry-line
        // rather than silently going blank or fabricating a result.
      }
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-display text-2xl font-black tracking-tight text-titanium">Calendar</h2>

      <StaggerList className="flex snap-x snap-mandatory gap-1 overflow-x-auto pb-2">
        {schedule.map((round) => {
          const isPast = raceTimestamp(round) < now;
          const winner = isPending(winners) ? undefined : winners.get(round.round);
          const isExpanded = expandedRound === round.round;

          const tile = (
            <div
              className={cn(
                "flex min-w-[8rem] snap-start flex-col gap-1 border-t-2 px-2 py-2 font-mono text-[11px]",
                isPast ? "border-asphalt text-brushed-steel" : "border-circuit-red/40 text-titanium",
                isExpanded && "border-circuit-red",
              )}
            >
              <span>
                R{String(round.round).padStart(2, "0")}
                {round.sprint && " · SPR"}
              </span>
              <span className="truncate uppercase text-titanium">{round.circuit.name}</span>
              {isPast ? (
                isPending(winners) ? (
                  <PendingToken source={winners.source} className="text-[10px]" />
                ) : winner ? (
                  <span className="truncate text-titanium">{winner.familyName.toUpperCase()}</span>
                ) : (
                  <PendingToken source="JOLPICA-F1" className="text-[10px]" />
                )
              ) : (
                <span>{round.race.date}</span>
              )}
            </div>
          );

          if (isPast) {
            return (
              <StaggerItem key={round.round}>
                <button
                  type="button"
                  onClick={() => handleRoundClick(round)}
                  aria-expanded={isExpanded}
                  className="text-left"
                >
                  {tile}
                </button>
              </StaggerItem>
            );
          }

          return (
            <StaggerItem key={round.round}>
              <Link href={`/circuits/${round.circuit.id}`}>{tile}</Link>
            </StaggerItem>
          );
        })}
      </StaggerList>

      {expandedRound !== null && <RoundDetailPanel detail={details[expandedRound]} />}
    </div>
  );
}
