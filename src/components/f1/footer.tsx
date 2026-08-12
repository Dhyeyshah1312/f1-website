import Link from "next/link";
import { DataValue } from "@/components/f1/data-value";
import { getStandingsLastUpdated } from "@/lib/data";
import { NAV_SECTIONS } from "@/components/f1/nav-sections";

function formatTimestamp(date: Date): string {
  return `${date.toISOString().slice(0, 16).replace("T", " ")} UTC`;
}

/** Page Specs §0 — minimal footer: section links, data attribution, standings last-updated. */
export async function Footer() {
  const lastUpdated = await getStandingsLastUpdated();

  return (
    <footer className="border-t border-asphalt px-4 py-6 md:px-6">
      <nav aria-label="Footer sections" className="flex flex-wrap gap-x-6 gap-y-2">
        {NAV_SECTIONS.filter((s) => !s.stretch).map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="font-mono text-xs uppercase tracking-wide text-brushed-steel transition-colors hover:text-titanium"
          >
            {section.label}
          </Link>
        ))}
      </nav>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-brushed-steel">
        <span>Data — Jolpica-F1 · OpenF1</span>
        <span aria-hidden className="text-asphalt">
          /
        </span>
        <span className="flex items-center gap-1">
          Standings updated —{" "}
          <DataValue value={lastUpdated} render={(date) => formatTimestamp(date)} />
        </span>
      </div>
    </footer>
  );
}
