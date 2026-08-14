import { notFound } from "next/navigation";
import {
  getDriverBio,
  getDriverCareerStats,
  getDriverStandings,
  isPending,
} from "@/lib/data";
import { hasDriverPortrait, hasDriverPartnerPhoto } from "@/lib/data/portraits";
import { driverImageSlug } from "@/lib/data/image-slugs";
import { getDriverPartner } from "@/lib/data/driver-partners";
import { getDriverInstagramHandle } from "@/lib/data/driver-socials";
import { getDriverAchievements } from "@/lib/data/driver-achievements";
import { DriverPortrait } from "@/components/f1/driver-portrait";
import { ParallaxLayer } from "@/components/f1/parallax-layer";
import { DriverPartnerPhoto } from "@/components/f1/driver-partner-photo";
import { SocialLink } from "@/components/f1/social-link";
import { DataValue } from "@/components/f1/data-value";
import { AnimatedNumber } from "@/components/f1/animated-number";
import { PendingToken } from "@/components/f1/pending-token";
import { DriverStat } from "@/components/f1/driver-stat";
import { CareerTimeline } from "@/components/f1/career-timeline";
import { TeammateCompare } from "@/components/f1/teammate-compare";
import { RevealSection } from "@/components/f1/reveal-section";

// Career stats are a ~13-request Jolpica fan-out per driver (see
// fetchDriverCareerStats) — statically generating all 22 slugs moves that
// cost to build/background-revalidation instead of a visitor's request.
// 86400s matches REVALIDATE_CAREER_SECONDS in sources/jolpica.ts.
export const revalidate = 86400;

export async function generateStaticParams() {
  const drivers = await getDriverStandings();
  if (isPending(drivers)) return [];
  return drivers.map((d) => ({ slug: d.driverId }));
}

function ageFromDob(dob: string): number {
  const birth = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const hasHadBirthdayThisYear =
    now.getMonth() > birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
}

export default async function DriverProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [standings, bio, careerStats] = await Promise.all([
    getDriverStandings(),
    getDriverBio(slug),
    getDriverCareerStats(slug),
  ]);

  const currentSeason = !isPending(standings) ? standings.find((d) => d.driverId === slug) : undefined;
  // If standings resolved and the slug genuinely isn't in the current grid, 404.
  // If standings itself is Pending, we can't tell — render what we can instead
  // of false-404ing on an unrelated API hiccup.
  // KNOWN ISSUE (see KNOWN_ISSUES.md): this renders the not-found UI correctly
  // but the response ships as HTTP 200, not 404, under ISR — untriaged.
  if (!isPending(standings) && !currentSeason) notFound();

  const teammate =
    !isPending(standings) && currentSeason
      ? standings.find((d) => d.constructorId === currentSeason.constructorId && d.driverId !== slug) ?? null
      : null;

  const portraitAvailable = hasDriverPortrait(slug);
  const partnerPhotoAvailable = hasDriverPartnerPhoto(slug);
  const partner = partnerPhotoAvailable ? getDriverPartner(driverImageSlug(slug)) : null;
  const instagramHandle = getDriverInstagramHandle(driverImageSlug(slug));
  const number = currentSeason?.permanentNumber ?? (!isPending(bio) ? bio.permanentNumber : null);
  const displayName = currentSeason
    ? `${currentSeason.givenName} ${currentSeason.familyName}`
    : !isPending(bio)
      ? `${bio.givenName} ${bio.familyName}`
      : slug;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex min-h-[80dvh] items-end overflow-hidden border-b border-asphalt">
        <ParallaxLayer className="absolute inset-0">
          <DriverPortrait
            slug={slug}
            hasPortrait={portraitAvailable}
            number={number}
            alt={displayName}
            className="h-full w-full"
            numeralClassName="text-[32vw]"
            priority
            sizes="100vw"
          />
        </ParallaxLayer>
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 select-none font-display text-[32vw] font-black leading-none text-asphalt/40"
        >
          {number ?? ""}
        </span>
        <div className="relative z-10 flex flex-col gap-2 bg-gradient-to-t from-carbon via-carbon/70 to-transparent p-6 pt-24 md:p-12 md:pt-32">
          <span className="font-mono text-sm text-brushed-steel">
            #{number ?? "—"} {currentSeason?.driverCode ?? (!isPending(bio) ? bio.code : "")}
          </span>
          <h1 className="font-display text-6xl font-black tracking-tight text-titanium md:text-8xl">
            {displayName}
          </h1>
          <span className="font-mono text-sm uppercase tracking-wide text-brushed-steel">
            {currentSeason?.constructorName ?? <PendingToken source="JOLPICA-F1" />}
          </span>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-16 px-4 py-12 md:px-6 md:py-16">
        {/* Bio */}
        <RevealSection className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-black tracking-tight text-titanium">Bio</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <DriverStat
              label="Nationality"
              value={<DataValue value={bio} render={(b) => b.nationality} />}
            />
            <DriverStat
              label="Age"
              value={<DataValue value={bio} render={(b) => ageFromDob(b.dateOfBirth)} />}
            />
            <DriverStat
              label="Date of birth"
              value={<DataValue value={bio} render={(b) => b.dateOfBirth} />}
            />
            <DriverStat label="Number" value={number ?? <PendingToken source="JOLPICA-F1" />} />
          </div>
        </RevealSection>

        {/* Current-season stats */}
        <RevealSection className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-black tracking-tight text-titanium">
            2026 Season
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <DriverStat
              label="Position"
              value={currentSeason ? `P${currentSeason.position}` : <PendingToken source="JOLPICA-F1" />}
            />
            <DriverStat
              label="Points"
              value={
                currentSeason ? (
                  <AnimatedNumber value={currentSeason.points} />
                ) : (
                  <PendingToken source="JOLPICA-F1" />
                )
              }
            />
            <DriverStat
              label="Wins"
              value={
                currentSeason ? (
                  <AnimatedNumber value={currentSeason.wins} />
                ) : (
                  <PendingToken source="JOLPICA-F1" />
                )
              }
            />
          </div>
          {currentSeason && <TeammateCompare driver={currentSeason} teammate={teammate} />}
        </RevealSection>

        {/* Career stats */}
        <RevealSection className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-black tracking-tight text-titanium">
            Career
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            <DriverStat
              label="Wins"
              value={<DataValue value={careerStats} render={(s) => <AnimatedNumber value={s.wins} />} />}
            />
            <DriverStat
              label="Podiums"
              value={<DataValue value={careerStats} render={(s) => <AnimatedNumber value={s.podiums} />} />}
            />
            <DriverStat
              label="Poles"
              value={<DataValue value={careerStats} render={(s) => <AnimatedNumber value={s.poles} />} />}
            />
            <DriverStat
              label="Championships"
              value={
                <DataValue value={careerStats} render={(s) => <AnimatedNumber value={s.championships} />} />
              }
            />
            <DriverStat
              label="Career points"
              value={<DataValue value={careerStats} render={(s) => <AnimatedNumber value={s.points} />} />}
            />
          </div>
        </RevealSection>

        {/* Career timeline */}
        <RevealSection className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-black tracking-tight text-titanium">
            Timeline
          </h2>
          <CareerTimeline
            timeline={isPending(careerStats) ? careerStats : careerStats.timeline}
          />
        </RevealSection>

        {/* Achievements / records — not in Jolpica-F1's scope; curated content, not sourced yet */}
        <RevealSection className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-black tracking-tight text-titanium">
            Achievements
          </h2>
          <div className="flex flex-col gap-3 font-mono text-sm">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 border-t border-asphalt py-3">
              <span className="text-brushed-steel shrink-0 w-40 font-bold">Notable records —</span>
              <span className="text-titanium">{getDriverAchievements(slug).notableRecords}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 border-t border-asphalt py-3">
              <span className="text-brushed-steel shrink-0 w-40 font-bold">Career highlights —</span>
              <span className="text-titanium">{getDriverAchievements(slug).careerHighlights}</span>
            </div>
          </div>
        </RevealSection>

        {/* Socials — hand-curated editorial content, not written yet */}
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
          {partner && (
            <div className="flex items-start gap-6 border-t border-asphalt py-6 font-mono text-sm">
              <DriverPartnerPhoto
                slug={slug}
                alt={partner.name}
                className="h-56 w-40 shrink-0 sm:h-72 sm:w-56"
              />
              <div className="flex flex-col gap-1 pt-2">
                <span className="text-brushed-steel">Partner —</span>
                <div className="flex flex-wrap items-baseline gap-2">
                  <SocialLink
                    handle={partner.instagramHandle}
                    className="w-fit font-display text-2xl font-black tracking-tight no-underline"
                  >
                    {partner.name}
                  </SocialLink>
                </div>
                <span className="text-brushed-steel">{partner.status}</span>
              </div>
            </div>
          )}
        </RevealSection>
      </div>
    </div>
  );
}
