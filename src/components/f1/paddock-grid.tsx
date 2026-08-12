import Link from "next/link";
import { isPending } from "@/lib/data/types";
import type { ConstructorStanding, DriverStanding, Maybe } from "@/lib/data/types";
import { PendingToken } from "@/components/f1/pending-token";
import { TeamImage } from "@/components/f1/team-image";
import { getTeamUiAccent } from "@/lib/data/team-colors";

interface PaddockGridProps {
  constructors: Maybe<ConstructorStanding[]>;
  drivers: Maybe<DriverStanding[]>;
  liveryAvailability: Record<string, boolean>;
}

export function PaddockGrid({ constructors, drivers, liveryAvailability }: PaddockGridProps) {
  if (isPending(constructors)) {
    return (
      <div className="border-t border-asphalt py-6">
        <PendingToken source={constructors.source} />
      </div>
    );
  }

  const driversByTeam = new Map<string, DriverStanding[]>();
  if (!isPending(drivers)) {
    for (const d of drivers) {
      if (!driversByTeam.has(d.constructorId)) driversByTeam.set(d.constructorId, []);
      driversByTeam.get(d.constructorId)!.push(d);
    }
  }

  return (
    <div className="flex h-[72vh] min-h-[440px] gap-px overflow-hidden border-y border-asphalt/80 bg-asphalt/40 backdrop-blur-md">
      {constructors.map((team) => {
        const accent = getTeamUiAccent(team.constructorId);
        const teamDrivers = driversByTeam.get(team.constructorId) ?? [];
        return (
          <Link
            key={team.constructorId}
            href={`/teams/${team.constructorId}`}
            data-cursor="magnetic"
            data-cursor-text="TEAM"
            className="group relative flex-1 overflow-hidden bg-carbon/90 transition-[flex-grow] duration-500 ease-out hover:flex-[5] focus-visible:flex-[5]"
          >
            {/* Collapsed state */}
            <div className="absolute inset-0 flex flex-col items-center justify-between p-3 opacity-100 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0">
              <span className="font-mono text-xs font-bold text-circuit-red-highlight">P{team.position}</span>
              <span
                className="font-display text-sm font-black uppercase tracking-wider text-titanium"
                style={{ writingMode: "vertical-rl" }}
              >
                {team.constructorName}
              </span>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
            </div>

            {/* Expanded state */}
            <div className="absolute inset-0 flex flex-col opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <TeamImage
                constructorId={team.constructorId}
                variant="livery"
                hasImage={liveryAvailability[team.constructorId] ?? false}
                teamName={team.constructorName}
                className="flex-1"
                sizes="25vw"
              />
              <div className="flex flex-col gap-1.5 border-t border-asphalt/80 bg-graphite/95 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-black tracking-tight text-titanium">
                    {team.constructorName}
                  </span>
                  <span className="font-mono text-xs font-bold text-circuit-red-highlight">
                    P{team.position}
                  </span>
                </div>
                <span className="font-mono text-[11px] font-bold text-titanium">
                  {team.points} PTS
                </span>
                <div className="flex flex-col gap-0.5 border-t border-asphalt/60 pt-1">
                  {teamDrivers.map((d) => (
                    <span key={d.driverId} className="font-mono text-xs text-brushed-steel">
                      #{d.permanentNumber} {d.givenName} {d.familyName}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1.5" style={{ backgroundColor: accent }} />
          </Link>
        );
      })}
    </div>
  );
}
