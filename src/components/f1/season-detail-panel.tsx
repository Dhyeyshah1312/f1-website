import { isPending } from "@/lib/data/types";
import type { SeasonFinalStandings } from "@/lib/data/types";
import { getSeasonStoryline } from "@/lib/data/season-storylines";
import { PendingToken } from "@/components/f1/pending-token";
import { TelemetryLine } from "@/components/f1/telemetry-line";
import { StandingsTable } from "@/components/f1/standings-table";

interface SeasonDetailPanelProps {
  detail: SeasonFinalStandings | "loading" | undefined;
}

/** Final standings / race count / storyline panel shown when a History year is expanded. */
export function SeasonDetailPanel({ detail }: SeasonDetailPanelProps) {
  if (!detail || detail === "loading") {
    return (
      <div className="border-t border-asphalt py-4">
        <TelemetryLine className="max-w-[10rem]" />
      </div>
    );
  }

  const noConstructorsChampionshipYet =
    !isPending(detail.constructorStandings) && detail.constructorStandings.length === 0;
  const storyline = getSeasonStoryline(detail.season);

  return (
    <div className="flex flex-col gap-6 border-t border-asphalt py-6">
      <div className="flex items-center gap-2 font-mono text-sm">
        <span className="text-brushed-steel">Races —</span>
        {isPending(detail.round) ? (
          <PendingToken source={detail.round.source} />
        ) : (
          <span className="text-titanium">{detail.round}</span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2">
        <StandingsTable variant="drivers" title="Drivers" data={detail.driverStandings} />
        {noConstructorsChampionshipYet ? (
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-black tracking-tight text-titanium">
              Constructors
            </h2>
            <p className="border-t border-asphalt py-3 font-mono text-sm text-brushed-steel">
              Constructors&apos; Championship not awarded until 1958.
            </p>
          </div>
        ) : (
          <StandingsTable variant="constructors" title="Constructors" data={detail.constructorStandings} />
        )}
      </div>

      <div className="flex flex-col gap-2 border-t border-asphalt py-2">
        <span className="font-mono text-sm text-brushed-steel">Storyline —</span>
        {storyline ? (
          <p className="max-w-[65ch] font-body text-base leading-[1.5] text-titanium">{storyline}</p>
        ) : (
          <PendingToken source="EDITORIAL" />
        )}
      </div>
    </div>
  );
}
