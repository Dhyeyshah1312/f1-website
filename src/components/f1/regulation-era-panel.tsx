import Link from "next/link";
import type { RegulationEra } from "@/lib/data/regulation-eras";

interface RegulationEraPanelProps {
  era: RegulationEra;
}

/** Detail panel shown when a Regulation Era tile is expanded on History. */
export function RegulationEraPanel({ era }: RegulationEraPanelProps) {
  return (
    <div className="flex flex-col gap-4 border-t border-asphalt py-6">
      <p className="max-w-[65ch] font-body text-base leading-[1.5] text-titanium">
        {era.description}
      </p>
      {era.linkHref && (
        <Link
          href={era.linkHref}
          className="w-fit font-mono text-sm uppercase tracking-wide text-circuit-red hover:underline"
        >
          Full breakdown on Technology →
        </Link>
      )}
    </div>
  );
}
