import type { ReactNode } from "react";

export function DriverStat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-t border-asphalt pt-2 min-w-0 max-w-full overflow-hidden">
      <span className="font-mono text-[11px] uppercase tracking-wide text-brushed-steel truncate">{label}</span>
      <div className="font-mono text-lg sm:text-2xl text-titanium truncate leading-tight flex items-center min-h-[32px]">{value}</div>
    </div>
  );
}
