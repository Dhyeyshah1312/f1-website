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
          <div className="flex flex-col gap-2 font-mono text-sm">
            <div className="flex items-center gap-2 border-t border-asphalt py-2">
              <span className="text-brushed-steel">Most wins —</span>
              <PendingToken source="F1DB" />
            </div>
            <div className="flex items-center gap-2 border-t border-asphalt py-2">
              <span className="text-brushed-steel">Most poles —</span>
              <PendingToken source="F1DB" />
            </div>
            <div className="flex items-center gap-2 border-t border-asphalt py-2">
              <span className="text-brushed-steel">Youngest champion —</span>
              <PendingToken source="F1DB" />
            </div>
            <div className="flex items-center gap-2 border-t border-asphalt py-2">
              <span className="text-brushed-steel">Oldest champion —</span>
              <PendingToken source="F1DB" />
            </div>
            <div className="flex items-center gap-2 border-t border-asphalt py-2">
              <span className="text-brushed-steel">Most championships —</span>
              <PendingToken source="F1DB" />
            </div>
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
