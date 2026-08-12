import { getDriverStandings, isPending } from "@/lib/data";
import { hasDriverPortrait } from "@/lib/data/portraits";
import { DriversGrid } from "@/components/f1/drivers-grid";
import { PageHero } from "@/components/f1/page-hero";

export default async function DriversPage() {
  const drivers = await getDriverStandings();

  const portraitAvailability: Record<string, boolean> = {};
  const driverCount = !isPending(drivers) ? drivers.length : 22;
  const leaderName = !isPending(drivers) && drivers.length > 0 
    ? `${drivers[0].givenName} ${drivers[0].familyName}` 
    : undefined;

  if (!isPending(drivers)) {
    for (const d of drivers) portraitAvailability[d.driverId] = hasDriverPortrait(d.driverId);
  }

  return (
    <div className="flex flex-col">
      <PageHero
        index="03 — THE GRID"
        title="Drivers"
        description="22 drivers. Every stat, every telemetry profile."
        stats={[
          { label: "Active Drivers", value: `${driverCount} DRIVERS` },
          { label: "Current Leader", value: leaderName || "JOLPICA FEED" },
        ]}
      />

      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-4 py-10 md:px-6 md:py-14">
        <DriversGrid drivers={drivers} portraitAvailability={portraitAvailability} />
      </div>
    </div>
  );
}
