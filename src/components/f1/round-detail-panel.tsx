import { isPending } from "@/lib/data/types";
import type { PodiumEntry, RoundDetail } from "@/lib/data/types";
import { PendingToken } from "@/components/f1/pending-token";
import { TelemetryLine } from "@/components/f1/telemetry-line";

function DriverName({ entry }: { entry: PodiumEntry }) {
  return (
    <span className="text-titanium">
      {entry.givenName} {entry.familyName}
    </span>
  );
}

interface RoundDetailPanelProps {
  detail: RoundDetail | "loading" | undefined;
}

/** Podium / pole / fastest-lap panel shown when a past round is expanded (Page Specs §2). */
export function RoundDetailPanel({ detail }: RoundDetailPanelProps) {
  if (!detail || detail === "loading") {
    return (
      <div className="border-t border-asphalt py-4">
        <TelemetryLine className="max-w-[10rem]" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 border-t border-asphalt py-4 font-mono text-xs sm:grid-cols-3">
      <div className="flex flex-col gap-1.5">
        <span className="uppercase tracking-wide text-brushed-steel">Podium</span>
        {isPending(detail.podium) ? (
          <PendingToken source={detail.podium.source} />
        ) : (
          detail.podium.map((entry) => (
            <span key={entry.driverId}>
              P{entry.position} — <DriverName entry={entry} />
            </span>
          ))
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="uppercase tracking-wide text-brushed-steel">Pole</span>
        {isPending(detail.pole) ? (
          <PendingToken source={detail.pole.source} />
        ) : detail.pole ? (
          <DriverName entry={detail.pole} />
        ) : (
          <span className="text-brushed-steel">—</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="uppercase tracking-wide text-brushed-steel">Fastest lap</span>
        {isPending(detail.fastestLap) ? (
          <PendingToken source={detail.fastestLap.source} />
        ) : detail.fastestLap ? (
          <DriverName entry={detail.fastestLap} />
        ) : (
          <span className="text-brushed-steel">—</span>
        )}
      </div>
    </div>
  );
}
