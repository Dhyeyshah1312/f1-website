"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { isPending } from "@/lib/data/types";
import type { SeasonChampions, SeasonFinalStandings } from "@/lib/data/types";
import { REGULATION_ERAS } from "@/lib/data/regulation-eras";
import { PendingToken } from "@/components/f1/pending-token";
import { SeasonDetailPanel } from "@/components/f1/season-detail-panel";
import { RegulationEraPanel } from "@/components/f1/regulation-era-panel";
import { cn } from "@/lib/utils";

interface HistoryTimelineProps {
  seasons: SeasonChampions[];
}

type View = "champions" | "eras";

// Distance a pointer has to travel before a press counts as a drag rather
// than a click — lets the same gesture drive both interactions cleanly.
const DRAG_THRESHOLD_PX = 4;

/**
 * The History timeline (Page Specs §6): two views over the same horizontal
 * scroll-snap strip register (DESIGN.md §6: the calendar strip and History
 * timeline are the only intentionally horizontal-scrolling elements), each
 * with click-and-drag on top of native scroll/touch.
 *
 * "Champions" — one tile per season 1950-present, click fans out to
 * /api/history/[year] for the full final-standings panel (mirrors
 * CalendarStrip's on-demand round detail).
 *
 * "Eras" — a genuinely separate axis, not a per-year re-skin: F1's
 * chassis/aero and engine regulations change on independent schedules and
 * their eras overlap (see lib/data/regulation-eras.ts), so this is its own
 * shorter strip of named eras rather than forcing one era per year-tile.
 */
export function HistoryTimeline({ seasons }: HistoryTimelineProps) {
  const [view, setView] = useState<View>("champions");
  const [expandedSeason, setExpandedSeason] = useState<string | null>(null);
  const [details, setDetails] = useState<Record<string, SeasonFinalStandings | "loading">>({});
  const [expandedEraId, setExpandedEraId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startX: number; startScrollLeft: number; dragged: boolean } | null>(null);

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current = { startX: e.clientX, startScrollLeft: el.scrollLeft, dragged: false };
    el.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const el = scrollRef.current;
    const state = dragState.current;
    if (!el || !state) return;
    const delta = e.clientX - state.startX;
    if (Math.abs(delta) > DRAG_THRESHOLD_PX) state.dragged = true;
    el.scrollLeft = state.startScrollLeft - delta;
  }

  function handlePointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    scrollRef.current?.releasePointerCapture(e.pointerId);
  }

  function handleViewChange(next: View) {
    setView(next);
    setExpandedSeason(null);
    setExpandedEraId(null);
  }

  async function handleYearClick(season: string) {
    if (dragState.current?.dragged) {
      dragState.current = null;
      return;
    }
    dragState.current = null;

    if (expandedSeason === season) {
      setExpandedSeason(null);
      return;
    }
    setExpandedSeason(season);
    if (!details[season]) {
      setDetails((d) => ({ ...d, [season]: "loading" }));
      try {
        const res = await fetch(`/api/history/${season}`);
        const data = (await res.json()) as SeasonFinalStandings;
        setDetails((d) => ({ ...d, [season]: data }));
      } catch {
        // Leave it on "loading" -> the panel keeps showing the telemetry-line
        // rather than silently going blank or fabricating a result.
      }
    }
  }

  function handleEraClick(eraId: string) {
    if (dragState.current?.dragged) {
      dragState.current = null;
      return;
    }
    dragState.current = null;
    setExpandedEraId((current) => (current === eraId ? null : eraId));
  }

  const expandedEra = expandedEraId ? REGULATION_ERAS.find((e) => e.id === expandedEraId) : null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-black tracking-tight text-titanium">
          {view === "champions" ? "Champions" : "Regulation Eras"}
        </h2>
        <div className="flex border border-asphalt">
          {(["champions", "eras"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => handleViewChange(v)}
              className={cn(
                "px-3 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors",
                view === v ? "bg-circuit-red text-titanium" : "text-brushed-steel hover:text-titanium",
              )}
            >
              {v === "champions" ? "Champions" : "Eras"}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={scrollRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="flex cursor-grab snap-x snap-mandatory gap-1 overflow-x-auto pb-2 active:cursor-grabbing"
      >
        {view === "champions"
          ? seasons.map((entry) => {
              const isDecadeStart = Number(entry.season) % 10 === 0;
              const isExpanded = expandedSeason === entry.season;

              return (
                <button
                  key={entry.season}
                  type="button"
                  onClick={() => handleYearClick(entry.season)}
                  aria-expanded={isExpanded}
                  className={cn(
                    "flex min-w-[7rem] shrink-0 snap-start flex-col gap-1 border-t-2 px-2 py-2 text-left font-mono text-[11px]",
                    isDecadeStart ? "border-circuit-red/40" : "border-asphalt",
                    isExpanded && "border-circuit-red",
                  )}
                >
                  <span
                    className={cn(
                      isDecadeStart
                        ? "font-display text-lg font-black leading-none text-titanium"
                        : "text-brushed-steel",
                    )}
                  >
                    {entry.season}
                  </span>

                  {isPending(entry.driverChampion) ? (
                    <PendingToken source={entry.driverChampion.source} className="text-[10px]" />
                  ) : (
                    <span className="truncate text-titanium">
                      {entry.driverChampion.familyName.toUpperCase()}
                    </span>
                  )}

                  {isPending(entry.constructorChampion) ? (
                    <PendingToken source={entry.constructorChampion.source} className="text-[10px]" />
                  ) : entry.constructorChampion ? (
                    <span className="truncate text-brushed-steel">
                      {entry.constructorChampion.constructorName}
                    </span>
                  ) : (
                    <span className="text-brushed-steel">—</span>
                  )}
                </button>
              );
            })
          : REGULATION_ERAS.map((era) => {
              const isExpanded = expandedEraId === era.id;
              return (
                <button
                  key={era.id}
                  type="button"
                  onClick={() => handleEraClick(era.id)}
                  aria-expanded={isExpanded}
                  className={cn(
                    "flex min-w-[11rem] shrink-0 snap-start flex-col gap-1 border-t-2 px-2 py-2 text-left font-mono text-[11px]",
                    "border-asphalt",
                    isExpanded && "border-circuit-red",
                  )}
                >
                  <span className="font-display text-base font-black leading-tight text-titanium">
                    {era.name}
                  </span>
                  <span className="text-brushed-steel">{era.years}</span>
                </button>
              );
            })}
      </div>

      {view === "champions" && expandedSeason !== null && (
        <SeasonDetailPanel detail={details[expandedSeason]} />
      )}
      {view === "eras" && expandedEra && <RegulationEraPanel era={expandedEra} />}
    </div>
  );
}
