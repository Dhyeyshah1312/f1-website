import { getConstructorStandings, getDriverStandings, getNextRace, isPending } from "@/lib/data";
import { hasCircuitImage, hasDriverPortrait, hasTeamLivery } from "@/lib/data/portraits";
import { HeroIntro } from "@/components/f1/hero-intro";
import { LiveStatusStrip } from "@/components/f1/live-status-strip";
import { SectionTeaserPanel } from "@/components/f1/section-teaser-panel";
import { DriverPortrait } from "@/components/f1/driver-portrait";
import { TeamImage } from "@/components/f1/team-image";
import { CircuitImage } from "@/components/f1/circuit-image";

/**
 * Discover (Page Specs §1) — the whole page is [C] original interface copy
 * except the live status strip, which is real Jolpica-F1 data already
 * fetched elsewhere in the tree (Nav). Calling the same lib/data functions
 * again here is intentional, not a re-fetch: Next's fetch cache dedupes
 * identical calls within a request, so it never hits the network twice.
 */
export default async function Home() {
  const [nextRace, driverStandings, constructorStandings] = await Promise.all([
    getNextRace(),
    getDriverStandings(),
    getConstructorStandings(),
  ]);

  const leader = !isPending(driverStandings) ? driverStandings[0] : undefined;
  const leadingTeam = !isPending(constructorStandings) ? constructorStandings[0] : undefined;
  const nextCircuit = !isPending(nextRace) ? nextRace.circuit : undefined;

  return (
    <div className="flex flex-col">
      <HeroIntro />

      <LiveStatusStrip nextRace={nextRace} driverStandings={driverStandings} />

      <div id="explore" className="flex flex-col">
        <SectionTeaserPanel
          index="02"
          title="Season"
          hook="Standings, calendar, and the next race — live."
          href="/season"
        />

        <SectionTeaserPanel
          index="03"
          title="Drivers"
          hook="22 drivers. Every stat, every story."
          href="/drivers"
          background={
            leader && (
              <DriverPortrait
                slug={leader.driverId}
                hasPortrait={hasDriverPortrait(leader.driverId)}
                number={leader.permanentNumber}
                alt={`${leader.givenName} ${leader.familyName}`}
                className="h-full w-full"
                sizes="100vw"
              />
            )
          }
        />

        <SectionTeaserPanel
          index="04"
          title="Teams"
          hook="11 teams. The paddock, mapped."
          href="/teams"
          background={
            leadingTeam && (
              <TeamImage
                constructorId={leadingTeam.constructorId}
                variant="livery"
                hasImage={hasTeamLivery(leadingTeam.constructorId)}
                teamName={leadingTeam.constructorName}
                className="h-full w-full"
                sizes="100vw"
              />
            )
          }
        />

        <SectionTeaserPanel
          index="05"
          title="Circuits"
          hook="24 rounds. The world, drawn to scale."
          href="/circuits"
          background={
            nextCircuit && (
              <CircuitImage
                circuitId={nextCircuit.id}
                hasImage={hasCircuitImage(nextCircuit.id)}
                circuitName={nextCircuit.name}
                className="h-full w-full"
                sizes="100vw"
              />
            )
          }
        />

        <SectionTeaserPanel
          index="06"
          title="History"
          hook="1950 to now. Every champion."
          href="/history"
        />

        <SectionTeaserPanel
          index="07"
          title="Technology"
          hook="The 2026 car, taken apart."
          href="/technology"
        />

        <SectionTeaserPanel
          index="08"
          title="Beginner's Lab"
          hook="Learn F1 in five minutes."
          href="/beginners-lab"
        />
      </div>
    </div>
  );
}
