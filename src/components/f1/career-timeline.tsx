import { isPending } from "@/lib/data/types";
import type { DriverSeasonRecord, Maybe } from "@/lib/data/types";
import { PendingToken } from "@/components/f1/pending-token";

export function CareerTimeline({ timeline }: { timeline: Maybe<DriverSeasonRecord[]> }) {
  if (isPending(timeline)) {
    return (
      <div className="border-t border-asphalt py-3">
        <PendingToken source={timeline.source} />
      </div>
    );
  }

  if (timeline.length === 0) {
    return <p className="border-t border-asphalt py-3 font-mono text-sm text-brushed-steel">—</p>;
  }

  return (
    <div className="flex flex-col">
      {[...timeline].reverse().map((season) => (
        <div
          key={season.season}
          className="grid grid-cols-[4rem_1fr_5rem_5rem] items-center gap-2 border-t border-asphalt py-2"
        >
          <span className="font-mono text-sm text-brushed-steel">{season.season}</span>
          <span className="truncate font-body text-sm text-titanium">
            {season.constructorNames.join(" / ")}
          </span>
          <span className="font-mono text-sm text-titanium">
            P{season.position}
            {season.position === 1 && <span className="ml-1 text-circuit-red">★</span>}
          </span>
          <span className="text-right font-mono text-sm text-titanium">{season.points} PTS</span>
        </div>
      ))}
    </div>
  );
}
