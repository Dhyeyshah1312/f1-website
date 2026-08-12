import { getConstructorStandings, getDriverStandings, isPending } from "@/lib/data";
import { hasTeamLivery } from "@/lib/data/portraits";
import { PaddockGrid } from "@/components/f1/paddock-grid";
import { PageHero } from "@/components/f1/page-hero";

export default async function TeamsPage() {
  const [constructors, drivers] = await Promise.all([
    getConstructorStandings(),
    getDriverStandings(),
  ]);

  const liveryAvailability: Record<string, boolean> = {};
  const teamCount = !isPending(constructors) ? constructors.length : 10;
  const leadingTeam = !isPending(constructors) && constructors.length > 0
    ? constructors[0].constructorName
    : undefined;

  if (!isPending(constructors)) {
    for (const c of constructors) liveryAvailability[c.constructorId] = hasTeamLivery(c.constructorId);
  }

  return (
    <div className="flex flex-col">
      <PageHero
        index="04 — THE PADDOCK"
        title="Teams"
        description="The paddock, mapped — constructors, liveries, and engineering history."
        stats={[
          { label: "Constructors", value: `${teamCount} TEAMS` },
          { label: "Constructor Leader", value: leadingTeam || "JOLPICA FEED" },
        ]}
      />

      <div className="flex flex-col gap-8 py-10 md:py-14">
        <PaddockGrid constructors={constructors} drivers={drivers} liveryAvailability={liveryAvailability} />
      </div>
    </div>
  );
}
