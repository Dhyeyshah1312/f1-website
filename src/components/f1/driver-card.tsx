import Link from "next/link";
import type { DriverStanding } from "@/lib/data/types";
import { DriverPortrait } from "@/components/f1/driver-portrait";
import { getTeamUiAccent } from "@/lib/data/team-colors";

interface DriverCardProps {
  driver: DriverStanding;
  hasPortrait: boolean;
}

export function DriverCard({ driver, hasPortrait }: DriverCardProps) {
  const teamAccent = getTeamUiAccent(driver.constructorId);

  return (
    <Link
      href={`/drivers/${driver.driverId}`}
      data-cursor="magnetic"
      data-cursor-text="STATS"
      className="group relative flex flex-col gap-3 rounded-b border-t-2 border-asphalt/80 bg-graphite/30 p-2 transition-all duration-300 hover:-translate-y-2 hover:bg-graphite/70 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
      style={{ borderTopColor: teamAccent }}
    >
      <div className="relative overflow-hidden rounded-sm">
        <DriverPortrait
          slug={driver.driverId}
          hasPortrait={hasPortrait}
          number={driver.permanentNumber}
          alt={`${driver.givenName} ${driver.familyName}`}
          className="aspect-[3/4] w-full transition-transform duration-500 group-hover:scale-105"
          numeralClassName="text-7xl"
        />
        {/* Hover Red Tint Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-30" />
      </div>

      <div className="flex flex-col gap-0.5 px-1 pb-1">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-circuit-red-highlight">
            #{driver.permanentNumber ?? "—"}
          </span>
          <span className="font-mono text-xs font-bold text-titanium">
            P{driver.position}
          </span>
        </div>
        <span className="font-display text-xl font-black leading-tight tracking-tight text-titanium transition-colors group-hover:text-circuit-red">
          {driver.givenName} {driver.familyName}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wide text-brushed-steel">
          {driver.constructorName}
        </span>
        <span className="mt-1 font-mono text-sm font-bold text-titanium">{driver.points} PTS</span>
      </div>
    </Link>
  );
}
