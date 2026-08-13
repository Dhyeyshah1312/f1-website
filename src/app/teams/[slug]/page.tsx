import { notFound } from "next/navigation";
import {
  getConstructorSeasonResults,
  getConstructorStandings,
  getDriverStandings,
  isPending,
} from "@/lib/data";
import { hasDriverPortrait, hasTeamLivery, hasTeamLogo } from "@/lib/data/portraits";
import { getTeamColors } from "@/lib/data/team-colors";
import { getTeamInstagramHandle } from "@/lib/data/team-socials";
import { TeamImage } from "@/components/f1/team-image";
import { ParallaxLayer } from "@/components/f1/parallax-layer";
import { DriverCard } from "@/components/f1/driver-card";
import { DriverStat } from "@/components/f1/driver-stat";
import { TeamIdentityBlock } from "@/components/f1/team-identity-block";
import { TeamHistoryStrip } from "@/components/f1/team-history-strip";
import { TeamResultStrip } from "@/components/f1/team-result-strip";
import { SocialLink } from "@/components/f1/social-link";
import { AnimatedNumber } from "@/components/f1/animated-number";
import { PendingToken } from "@/components/f1/pending-token";
import { RevealSection } from "@/components/f1/reveal-section";

// Lighter-weight than the driver profile fan-out (3 requests, not ~13), but
// static generation + a shared revalidate window is the established pattern
// for detail pages here — see /drivers/[slug] for why.
export const revalidate = 86400;

export async function generateStaticParams() {
  const constructors = await getConstructorStandings();
  if (isPending(constructors)) return [];
  return constructors.map((c) => ({ slug: c.constructorId }));
}

export default async function TeamProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [constructors, drivers, seasonResults] = await Promise.all([
    getConstructorStandings(),
    getDriverStandings(),
    getConstructorSeasonResults(slug),
  ]);

  const team = !isPending(constructors) ? constructors.find((c) => c.constructorId === slug) : undefined;
  if (!isPending(constructors) && !team) notFound();

  const teamDrivers = !isPending(drivers) ? drivers.filter((d) => d.constructorId === slug) : [];
  const driverPortraitAvailability: Record<string, boolean> = {};
  for (const d of teamDrivers) driverPortraitAvailability[d.driverId] = hasDriverPortrait(d.driverId);

  const colors = getTeamColors(slug);
  const teamName = team?.constructorName ?? slug;
  const instagramHandle = getTeamInstagramHandle(slug);

  return (
    <div className="flex flex-col">
      {/* Hero — real livery + real team colors, not uiAccent (Page Specs §4) */}
      <section className="relative flex min-h-[70dvh] items-end overflow-hidden border-b border-asphalt">
        <ParallaxLayer className="absolute inset-0">
          <TeamImage
            constructorId={slug}
            variant="livery"
            hasImage={hasTeamLivery(slug)}
            teamName={teamName}
            className="h-full w-full"
            priority
            sizes="100vw"
          />
        </ParallaxLayer>
        <div className="relative z-10 flex w-full flex-col gap-2 bg-gradient-to-t from-carbon via-carbon/70 to-transparent p-6 pt-24 md:p-12 md:pt-32">
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div
                className="h-1.5 w-16"
                style={{ backgroundColor: colors.primary }}
                aria-hidden
              />
              <h1 className="font-display text-6xl font-black tracking-tight text-titanium md:text-8xl">
                {teamName}
              </h1>
            </div>
            {hasTeamLogo(slug) && (
              <TeamImage
                constructorId={slug}
                variant="logo"
                hasImage
                teamName={teamName}
                className="h-24 w-24 sm:h-36 sm:w-36 md:h-44 md:w-44 shrink-0 object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              />
            )}
          </div>
          <span className="font-mono text-sm uppercase tracking-wide text-brushed-steel">
            {team ? `P${team.position} — ${team.points} PTS` : "—"}
          </span>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-16 px-4 py-12 md:px-6 md:py-16">
        {/* Drivers */}
        <RevealSection className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-black tracking-tight text-titanium">Drivers</h2>
          <div className="grid grid-cols-2 gap-6 sm:max-w-md">
            {teamDrivers.map((d) => (
              <DriverCard
                key={d.driverId}
                driver={d}
                hasPortrait={driverPortraitAvailability[d.driverId] ?? false}
              />
            ))}
          </div>
        </RevealSection>

        {/* Current season */}
        <RevealSection className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-black tracking-tight text-titanium">
            2026 Season
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <DriverStat label="Position" value={team ? `P${team.position}` : "—"} />
            <DriverStat label="Points" value={team ? <AnimatedNumber value={team.points} /> : "—"} />
            <DriverStat label="Wins" value={team ? <AnimatedNumber value={team.wins} /> : "—"} />
          </div>
        </RevealSection>

        {/* Identity */}
        <RevealSection className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-black tracking-tight text-titanium">
            Identity
          </h2>
          <TeamIdentityBlock constructorId={slug} />
        </RevealSection>

        {/* History */}
        <RevealSection className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-black tracking-tight text-titanium">
            History
          </h2>
          <TeamHistoryStrip constructorId={slug} />
        </RevealSection>

        {/* Race-by-race */}
        <RevealSection className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-black tracking-tight text-titanium">
            Race by Race
          </h2>
          <TeamResultStrip results={seasonResults} />
        </RevealSection>

        {/* Elsewhere */}
        <RevealSection className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-black tracking-tight text-titanium">
            Elsewhere
          </h2>
          <div className="flex items-center gap-2 border-t border-asphalt py-2 font-mono text-sm">
            <span className="text-brushed-steel">Social —</span>
            {instagramHandle ? (
              <SocialLink handle={instagramHandle}>@{instagramHandle}</SocialLink>
            ) : (
              <PendingToken source="EDITORIAL" />
            )}
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
