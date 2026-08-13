import { getTeamHistory } from "@/lib/data/team-history";
import { getTeamIdentity } from "@/lib/data/team-identity";
import { PendingToken } from "@/components/f1/pending-token";

interface TeamHistoryStripProps {
  constructorId: string;
}

export function TeamHistoryStrip({ constructorId }: TeamHistoryStripProps) {
  const history = getTeamHistory(constructorId);
  const identity = getTeamIdentity(constructorId);

  return (
    <div className="flex flex-col gap-1 font-mono text-sm">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 border-t border-asphalt py-3">
        <span className="text-brushed-steel font-bold shrink-0 w-56">Constructors&apos; championships —</span>
        <span className="text-titanium font-bold">{identity.championships}</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-start gap-2 border-t border-asphalt py-3">
        <span className="text-brushed-steel font-bold shrink-0 w-56 pt-0.5">Notable eras —</span>
        {history ? (
          <p className="max-w-[75ch] font-body text-base leading-relaxed text-titanium flex-1">{history}</p>
        ) : (
          <PendingToken source="EDITORIAL" />
        )}
      </div>
    </div>
  );
}
