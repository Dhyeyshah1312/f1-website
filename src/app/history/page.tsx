import { getSeasonHistory, isPending } from "@/lib/data";
import { HistoryTimeline } from "@/components/f1/history-timeline";
import { PendingToken } from "@/components/f1/pending-token";
import { RevealSection } from "@/components/f1/reveal-section";
import { PageHero } from "@/components/f1/page-hero";

export const revalidate = 86400;

export default async function HistoryPage() {
  const seasons = await getSeasonHistory();
  const seasonCount = !isPending(seasons) ? seasons.length : 76;

  return (
    <div className="flex flex-col">
      <PageHero
        index="06 — HISTORY TELEMETRY"
        title="History"
        description="1950 → Present. Every champion, every legend."
        imageSrc="/images/heroes/history-hero.png"
        stats={[
          { label: "Championship Seasons", value: `${seasonCount} SEASONS` },
          { label: "Inaugural Season", value: "1950 SILVERSTONE" },
        ]}
      />

      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-16 px-4 py-10 md:px-6 md:py-14">
        <RevealSection>
          <HistoryTimeline seasons={seasons} />
        </RevealSection>

        <RevealSection className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-black tracking-tight text-titanium">Records</h2>
          <div className="flex flex-col gap-3 font-mono text-sm">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 border-t border-asphalt py-3">
              <span className="text-brushed-steel shrink-0 w-44 font-bold">Most wins —</span>
              <span className="text-titanium font-bold">Lewis Hamilton <span className="text-circuit-red-highlight">(105 Grand Prix victories)</span></span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 border-t border-asphalt py-3">
              <span className="text-brushed-steel shrink-0 w-44 font-bold">Most poles —</span>
              <span className="text-titanium font-bold">Lewis Hamilton <span className="text-circuit-red-highlight">(104 pole positions)</span></span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 border-t border-asphalt py-3">
              <span className="text-brushed-steel shrink-0 w-44 font-bold">Youngest champion —</span>
              <span className="text-titanium font-bold">Sebastian Vettel <span className="text-brushed-steel">(23 years, 134 days — 2010 Red Bull Racing)</span></span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 border-t border-asphalt py-3">
              <span className="text-brushed-steel shrink-0 w-44 font-bold">Oldest champion —</span>
              <span className="text-titanium font-bold">Juan Manuel Fangio <span className="text-brushed-steel">(46 years, 41 days — 1957 Maserati)</span></span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 border-t border-asphalt py-3">
              <span className="text-brushed-steel shrink-0 w-44 font-bold">Most championships —</span>
              <span className="text-titanium font-bold">Michael Schumacher & Lewis Hamilton <span className="text-circuit-red-highlight">(7 World Championships each)</span></span>
            </div>
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
