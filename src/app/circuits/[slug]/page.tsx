import { notFound } from "next/navigation";
import { getCircuitWinners, getSeasonSchedule, isPending } from "@/lib/data";
import { hasCircuitImage } from "@/lib/data/portraits";
import { getCircuitProfile } from "@/lib/data/circuit-profiles";
import { CircuitImage } from "@/components/f1/circuit-image";
import { ParallaxLayer } from "@/components/f1/parallax-layer";
import { TrackOutlineReveal } from "@/components/f1/track-outline-reveal";
import { DriverStat } from "@/components/f1/driver-stat";
import { AnimatedNumber } from "@/components/f1/animated-number";
import { PendingToken } from "@/components/f1/pending-token";
import { CircuitWinnersList } from "@/components/f1/circuit-winners-list";
import { RevealSection } from "@/components/f1/reveal-section";

// Same static-generation pattern as Drivers/Teams — cheap here too, one
// bulk winners request per circuit.
export const revalidate = 86400;

export async function generateStaticParams() {
  const schedule = await getSeasonSchedule();
  if (isPending(schedule)) return [];
  const seen = new Set<string>();
  return schedule
    .filter((r) => {
      if (seen.has(r.circuit.id)) return false;
      seen.add(r.circuit.id);
      return true;
    })
    .map((r) => ({ slug: r.circuit.id }));
}

export default async function CircuitDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [schedule, winners] = await Promise.all([getSeasonSchedule(), getCircuitWinners(slug)]);

  const round = !isPending(schedule) ? schedule.find((r) => r.circuit.id === slug) : undefined;
  if (!isPending(schedule) && !round) notFound();

  const circuitName = round?.circuit.name ?? slug;
  const location = round ? `${round.circuit.locality}, ${round.circuit.country}` : null;
  const profile = getCircuitProfile(slug);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex min-h-[70dvh] items-end overflow-hidden border-b border-asphalt">
        <ParallaxLayer className="absolute inset-0">
          <CircuitImage
            circuitId={slug}
            hasImage={hasCircuitImage(slug)}
            circuitName={circuitName}
            className="h-full w-full"
            priority
          />
        </ParallaxLayer>
        <TrackOutlineReveal className="pointer-events-none absolute right-4 top-4 h-40 w-64 opacity-70 md:h-56 md:w-96" />
        <div className="relative z-10 flex flex-col gap-2 bg-gradient-to-t from-carbon via-carbon/70 to-transparent p-6 pt-24 md:p-12 md:pt-32">
          {round?.sprint && (
            <span className="w-fit border border-circuit-red px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-circuit-red">
              Sprint weekend
            </span>
          )}
          <h1 className="font-display text-6xl font-black tracking-tight text-titanium md:text-8xl">
            {circuitName}
          </h1>
          <span className="font-mono text-sm uppercase tracking-wide text-brushed-steel">
            {location ?? <PendingToken source="JOLPICA-F1" />}
          </span>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-16 px-4 py-12 md:px-6 md:py-16">
        {/* Key stats */}
        <RevealSection className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-black tracking-tight text-titanium">
            Circuit
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            <DriverStat
              label="Laps"
              value={
                profile?.vitals.laps !== undefined ? (
                  <AnimatedNumber value={profile.vitals.laps} />
                ) : (
                  "—"
                )
              }
            />
            <DriverStat
              label="Length"
              value={profile?.vitals.lengthKm ? `${profile.vitals.lengthKm} km` : "—"}
            />
            <DriverStat
              label="Turns"
              value={
                profile?.vitals.turns !== undefined ? (
                  <AnimatedNumber value={profile.vitals.turns} />
                ) : (
                  "—"
                )
              }
            />
            <DriverStat
              label="Elevation"
              value={profile?.vitals.elevationM !== undefined ? `${profile.vitals.elevationM} m` : "—"}
            />
            <DriverStat
              label="Lap record"
              value={profile?.vitals.lapRecord ? profile.vitals.lapRecord : "—"}
            />
          </div>
        </RevealSection>

        {/* Historical winners */}
        <RevealSection className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-black tracking-tight text-titanium">
            Winners
          </h2>
          <CircuitWinnersList winners={winners} />
        </RevealSection>

        {/* Notable moments */}
        <RevealSection className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-black tracking-tight text-titanium">
            Notable Moments
          </h2>
          {profile ? (
            <p className="max-w-[65ch] border-t border-asphalt pt-4 font-body text-base leading-[1.5] text-titanium">
              {profile.notableMoments}
            </p>
          ) : (
            <div className="flex items-center gap-2 border-t border-asphalt py-2 font-mono text-sm">
              <span className="text-brushed-steel">Editorial —</span>
              <PendingToken source="EDITORIAL" />
            </div>
          )}
        </RevealSection>
      </div>
    </div>
  );
}
