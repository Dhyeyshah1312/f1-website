import { getConstructorStandings, getDriverStandings } from "@/lib/data";
import { MarkVisited } from "@/components/f1/lab/mark-visited";
import { TheGridExplainer } from "@/components/f1/lab/the-grid-explainer";

export default async function TheGridPage() {
  const [drivers, constructors] = await Promise.all([getDriverStandings(), getConstructorStandings()]);

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-4 py-10 md:px-6 md:py-14">
      <MarkVisited id="the-grid" />
      <header className="flex flex-col gap-1 border-b border-asphalt pb-6">
        <span className="font-mono text-xs uppercase tracking-wide text-brushed-steel">01 — The Grid</span>
        <h1 className="font-display text-5xl font-black tracking-tight text-titanium md:text-7xl">
          Who&apos;s Racing
        </h1>
        <p className="max-w-md font-mono text-sm text-brushed-steel">
          11 teams, 2 drivers each. Click a team to see who&apos;s driving for them this season.
        </p>
      </header>

      <TheGridExplainer drivers={drivers} constructors={constructors} />
    </div>
  );
}
