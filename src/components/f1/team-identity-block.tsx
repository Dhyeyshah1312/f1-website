import { PendingToken } from "@/components/f1/pending-token";
import { DriverStat } from "@/components/f1/driver-stat";

/** Page Specs §4 — principal/HQ/power unit/chassis/founded year, all [F] F1DB, not seeded yet. */
export function TeamIdentityBlock() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
      <DriverStat label="Team principal" value={<PendingToken source="F1DB" />} />
      <DriverStat label="Headquarters" value={<PendingToken source="F1DB" />} />
      <DriverStat label="Power unit" value={<PendingToken source="F1DB" />} />
      <DriverStat label="Chassis" value={<PendingToken source="F1DB" />} />
      <DriverStat label="Founded" value={<PendingToken source="F1DB" />} />
    </div>
  );
}
