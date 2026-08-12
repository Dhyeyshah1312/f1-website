import { isPending } from "@/lib/data/types";
import type { DriverStanding, Maybe, RaceSummary } from "@/lib/data/types";
import { CountdownChip } from "@/components/f1/countdown-chip";
import { PendingToken } from "@/components/f1/pending-token";

interface LiveStatusStripProps {
  nextRace: Maybe<RaceSummary>;
  driverStandings: Maybe<DriverStanding[]>;
}

export function LiveStatusStrip({ nextRace, driverStandings }: LiveStatusStripProps) {
  const leader = !isPending(driverStandings) ? driverStandings[0] : undefined;

  return (
    <div className="relative flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-y border-asphalt/80 bg-graphite/40 px-4 py-3.5 font-mono text-xs uppercase tracking-wide backdrop-blur-md md:px-12">
      {/* Subtle red highlight left bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-circuit-red" />

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2 text-circuit-red-highlight font-bold">
          <span className="h-2 w-2 rounded-full bg-circuit-red animate-ping" />
          LIVE FEED
        </span>
        <span className="h-3 w-[1px] bg-asphalt" />
        <span className="text-titanium">
          {isPending(nextRace) ? (
            <PendingToken source={nextRace.source} />
          ) : (
            <CountdownChip race={nextRace} />
          )}
        </span>
      </div>

      <div className="flex items-center gap-3 text-titanium">
        <span className="text-brushed-steel">CHAMPIONSHIP LEADER:</span>
        {isPending(driverStandings) ? (
          <PendingToken source={driverStandings.source} />
        ) : leader ? (
          <span className="flex items-center gap-2 rounded border border-asphalt/60 bg-carbon px-2.5 py-1 text-titanium shadow-inner">
            <span className="font-bold text-circuit-red-highlight">#{leader.permanentNumber || 1}</span>
            <span>{leader.givenName} {leader.familyName}</span>
            <span className="text-brushed-steel">({leader.points} PTS)</span>
          </span>
        ) : (
          <PendingToken source="JOLPICA-F1" />
        )}
      </div>
    </div>
  );
}
