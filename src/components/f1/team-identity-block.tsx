import { DriverStat } from "@/components/f1/driver-stat";
import { getTeamIdentity } from "@/lib/data/team-identity";

interface TeamIdentityBlockProps {
  constructorId: string;
}

export function TeamIdentityBlock({ constructorId }: TeamIdentityBlockProps) {
  const identity = getTeamIdentity(constructorId);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
      <DriverStat label="Team principal" value={identity.principal} />
      <DriverStat label="Headquarters" value={identity.headquarters} />
      <DriverStat label="Power unit" value={identity.powerUnit} />
      <DriverStat label="Chassis" value={identity.chassis} />
      <DriverStat label="Founded" value={identity.founded} />
    </div>
  );
}
