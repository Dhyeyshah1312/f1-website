import { getConstructorStandings, getDriverStandings, getNextRace, isPending } from "@/lib/data";
import { hasCircuitImage, hasDriverPortrait, hasTeamLivery } from "@/lib/data/portraits";
import { HeroIntro } from "@/components/f1/hero-intro";
import { LiveStatusStrip } from "@/components/f1/live-status-strip";
import { SectionTeaserPanel } from "@/components/f1/section-teaser-panel";
import { DriverPortrait } from "@/components/f1/driver-portrait";
import { TeamImage } from "@/components/f1/team-image";
import { CircuitImage } from "@/components/f1/circuit-image";

export default async function Home() {
  const [nextRace, driverStandings, constructorStandings] = await Promise.all([
    getNextRace(),
    getDriverStandings(),
    getConstructorStandings(),
  ]);

  const leader = !isPending(driverStandings) && driverStandings.length > 0 ? driverStandings[0] : undefined;
  const leadingTeam = !isPending(constructorStandings) && constructorStandings.length > 0 ? constructorStandings[0] : undefined;
  const nextCircuit = !isPending(nextRace) ? nextRace.circuit : undefined;

  return (
    <div className="flex flex-col">
      <HeroIntro />

      <LiveStatusStrip nextRace={nextRace} driverStandings={driverStandings} />

      <div id="explore" className="flex flex-col">
        {/* 02 — Season */}
        <SectionTeaserPanel
          index="02"
          title="Season"
          hook="Standings, calendar, and the next race — live."
          href="/season"
          background={
            <img
              src="/images/heroes/season-hero.png"
              alt="2026 Season"
              className="h-full w-full object-cover object-center opacity-75"
            />
          }
        />

        {/* 03 — Drivers */}
        <SectionTeaserPanel
          index="03"
          title="Drivers"
          hook="22 drivers. Every stat, every story."
          href="/drivers"
          background={
            <DriverPortrait
              slug={leader?.driverId ?? "hamilton"}
              hasPortrait={leader ? hasDriverPortrait(leader.driverId) : true}
              number={leader?.permanentNumber ?? "44"}
              alt={leader ? `${leader.givenName} ${leader.familyName}` : "Lewis Hamilton"}
              className="h-full w-full"
              sizes="100vw"
            />
          }
        />

        {/* 04 — Teams */}
        <SectionTeaserPanel
          index="04"
          title="Teams"
          hook="11 teams. The paddock, mapped."
          href="/teams"
          background={
            <TeamImage
              constructorId={leadingTeam?.constructorId ?? "ferrari"}
              variant="livery"
              hasImage={leadingTeam ? hasTeamLivery(leadingTeam.constructorId) : true}
              teamName={leadingTeam?.constructorName ?? "Ferrari"}
              className="h-full w-full"
              sizes="100vw"
            />
          }
        />

        {/* 05 — Circuits */}
        <SectionTeaserPanel
          index="05"
          title="Circuits"
          hook="24 rounds. The world, drawn to scale."
          href="/circuits"
          background={
            <CircuitImage
              circuitId={nextCircuit?.id ?? "albert_park"}
              hasImage={nextCircuit ? hasCircuitImage(nextCircuit.id) : true}
              circuitName={nextCircuit?.name ?? "Albert Park Circuit"}
              className="h-full w-full"
              sizes="100vw"
            />
          }
        />

        {/* 06 — History */}
        <SectionTeaserPanel
          index="06"
          title="History"
          hook="1950 to now. Every champion."
          href="/history"
          background={
            <img
              src="/images/heroes/history-hero.png"
              alt="F1 History"
              className="h-full w-full object-cover object-center opacity-75"
            />
          }
        />

        {/* 07 — Technology */}
        <SectionTeaserPanel
          index="07"
          title="Technology"
          hook="The 2026 car, taken apart."
          href="/technology"
          background={
            <img
              src="/images/heroes/technology-hero.png"
              alt="F1 Technology"
              className="h-full w-full object-cover object-center opacity-75"
            />
          }
        />

        {/* 08 — Beginner's Lab */}
        <SectionTeaserPanel
          index="08"
          title="Beginner's Lab"
          hook="Learn F1 in five minutes."
          href="/beginners-lab"
          background={
            <img
              src="/images/heroes/lab-hero.png"
              alt="Beginner's Lab"
              className="h-full w-full object-cover object-center opacity-75"
            />
          }
        />
      </div>
    </div>
  );
}
