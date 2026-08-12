import { isPending } from "@/lib/data/types";
import type { ConstructorRoundResult, Maybe } from "@/lib/data/types";
import { PendingToken } from "@/components/f1/pending-token";

/** Page Specs §4 — current-season race-by-race result strip, real Jolpica-F1 data. */
export function TeamResultStrip({ results }: { results: Maybe<ConstructorRoundResult[]> }) {
  if (isPending(results)) {
    return (
      <div className="border-t border-asphalt py-3">
        <PendingToken source={results.source} />
      </div>
    );
  }

  if (results.length === 0) {
    return <p className="border-t border-asphalt py-3 font-mono text-sm text-brushed-steel">—</p>;
  }

  return (
    <div className="flex flex-col">
      {[...results].reverse().map((round) => (
        <div
          key={round.round}
          className="grid grid-cols-[3rem_1fr_1fr] items-center gap-2 border-t border-asphalt py-2"
        >
          <span className="font-mono text-sm text-brushed-steel">
            R{String(round.round).padStart(2, "0")}
          </span>
          <span className="truncate font-body text-sm text-titanium">
            {round.raceName.replace(" Grand Prix", "")}
          </span>
          <span className="truncate font-mono text-sm text-titanium">
            {round.results
              .map((d) => `${d.driverCode ?? d.familyName.slice(0, 3).toUpperCase()} P${d.position}`)
              .join(" · ")}
          </span>
        </div>
      ))}
    </div>
  );
}
