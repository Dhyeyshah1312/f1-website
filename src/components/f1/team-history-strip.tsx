import { PendingToken } from "@/components/f1/pending-token";
import { getTeamHistory } from "@/lib/data/team-history";

interface TeamHistoryStripProps {
  constructorId: string;
}

/**
 * Page Specs §4 — constructors' championships won ([F] F1DB, not seeded
 * yet) + notable eras ([C] editorial, see lib/data/team-history.ts).
 */
export function TeamHistoryStrip({ constructorId }: TeamHistoryStripProps) {
  const history = getTeamHistory(constructorId);

  return (
    <div className="flex flex-col gap-2 font-mono text-sm">
      <div className="flex items-center gap-2 border-t border-asphalt py-2">
        <span className="text-brushed-steel">Constructors&apos; championships —</span>
        <PendingToken source="F1DB" />
      </div>
      <div className="flex flex-col gap-2 border-t border-asphalt py-2">
        <span className="text-brushed-steel">Notable eras —</span>
        {history ? (
          <p className="max-w-[65ch] font-body text-base leading-[1.5] text-titanium">{history}</p>
        ) : (
          <PendingToken source="EDITORIAL" />
        )}
      </div>
    </div>
  );
}
