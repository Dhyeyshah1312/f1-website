import {
  getConstructorStandings,
  getDriverStandings,
  getNextRace,
  getSeasonSchedule,
  getSeasonWinners,
  isPending,
} from "@/lib/data";
import { DataValue } from "@/components/f1/data-value";
import { PendingToken } from "@/components/f1/pending-token";
import { CountdownChip } from "@/components/f1/countdown-chip";
import { StandingsTable } from "@/components/f1/standings-table";
import { CalendarStrip } from "@/components/f1/calendar-strip";
import { LiveSessionBanner } from "@/components/f1/live-session-banner";
import { PageHero } from "@/components/f1/page-hero";

export default async function SeasonPage() {
  const [nextRace, driverStandings, constructorStandings, schedule, winners] = await Promise.all([
    getNextRace(),
    getDriverStandings(),
    getConstructorStandings(),
    getSeasonSchedule(),
    getSeasonWinners(),
  ]);

  const racesRemaining =
    !isPending(schedule) && !isPending(winners) ? schedule.length - winners.size : null;

  return (
    <div className="flex flex-col">
      <LiveSessionBanner />

      <PageHero
        index="02 — SEASON TELEMETRY"
        title="2026 Season"
        description="Standings, calendar, and real-time race telemetry."
        imageSrc="/images/heroes/season-hero.png"
        stats={[
          {
            label: "Current Round",
            value: <DataValue value={nextRace} render={(race) => race.round} />,
          },
          {
            label: "Next Race",
            value: <DataValue value={nextRace} render={(race) => <CountdownChip race={race} />} />,
          },
          {
            label: "Races Remaining",
            value:
              racesRemaining !== null ? (
                racesRemaining
              ) : isPending(schedule) ? (
                <PendingToken source={schedule.source} />
              ) : (
                <PendingToken source={isPending(winners) ? winners.source : "JOLPICA-F1"} />
              ),
          },
        ]}
      />

      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-14 px-4 py-10 md:px-6 md:py-14">
        <section className="grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2">
          <StandingsTable variant="drivers" title="Drivers" data={driverStandings} />
          <StandingsTable variant="constructors" title="Constructors" data={constructorStandings} />
        </section>

        <section>
          <CalendarStrip schedule={schedule} winners={winners} />
        </section>
      </div>
    </div>
  );
}
