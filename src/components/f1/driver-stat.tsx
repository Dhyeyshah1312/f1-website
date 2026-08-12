import type { ReactNode } from "react";

export function DriverStat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-t border-asphalt pt-2">
      <span className="font-mono text-[11px] uppercase tracking-wide text-brushed-steel">{label}</span>
      <span className="font-mono text-2xl text-titanium">{value}</span>
    </div>
  );
}
