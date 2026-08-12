import { getSeasonSchedule, isPending } from "@/lib/data";
import { WorldMap } from "@/components/f1/world-map";
import { PageHero } from "@/components/f1/page-hero";

export default async function CircuitsPage() {
  const schedule = await getSeasonSchedule();
  const totalRounds = !isPending(schedule) ? schedule.length : 24;

  return (
    <div className="flex flex-col">
      <PageHero
        index="05 — THE CALENDAR, MAPPED"
        title="Circuits"
        description="24 rounds. The world, drawn to scale."
        stats={[
          { label: "Global Championship", value: `${totalRounds} ROUNDS` },
          { label: "Global Venues", value: "5 CONTINENTS" },
        ]}
      />

      <div className="flex flex-col gap-8 py-10 md:py-14">
        <WorldMap schedule={schedule} />
      </div>
    </div>
  );
}
