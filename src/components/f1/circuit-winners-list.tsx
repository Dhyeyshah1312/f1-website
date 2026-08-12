import { isPending } from "@/lib/data/types";
import type { CircuitWinner, Maybe } from "@/lib/data/types";
import { PendingToken } from "@/components/f1/pending-token";

export function CircuitWinnersList({ winners }: { winners: Maybe<CircuitWinner[]> }) {
  if (isPending(winners)) {
    return (
      <div className="border-t border-asphalt py-3">
        <PendingToken source={winners.source} />
      </div>
    );
  }

  if (winners.length === 0) {
    return <p className="border-t border-asphalt py-3 font-mono text-sm text-brushed-steel">—</p>;
  }

  return (
    <div className="flex max-h-96 flex-col overflow-y-auto">
      {[...winners].reverse().map((w) => (
        <div
          key={w.season}
          className="grid grid-cols-[4rem_1fr_1fr] items-center gap-2 border-t border-asphalt py-2"
        >
          <span className="font-mono text-sm text-brushed-steel">{w.season}</span>
          <span className="truncate font-body text-sm text-titanium">
            {w.givenName} {w.familyName}
          </span>
          <span className="truncate font-mono text-[11px] uppercase text-brushed-steel">
            {w.constructorName}
          </span>
        </div>
      ))}
    </div>
  );
}
