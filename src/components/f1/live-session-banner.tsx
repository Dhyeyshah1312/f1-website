import { getActiveLiveSession, isPending } from "@/lib/data";

/**
 * Renders only during an active race weekend (OpenF1 reports a session
 * currently in progress). Outside a live weekend — the normal case — this
 * renders nothing; that's correct behavior, not a stub left unfinished.
 */
export async function LiveSessionBanner() {
  const session = await getActiveLiveSession();
  if (isPending(session) || session === null) return null;

  return (
    <div className="flex items-center gap-3 border-t border-b border-circuit-red bg-graphite px-4 py-2 font-mono text-xs text-titanium md:px-6">
      <span className="flex items-center gap-1.5 text-circuit-red">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-circuit-red" />
        LIVE
      </span>
      <span className="uppercase">{session.sessionName}</span>
      <span className="text-brushed-steel">
        {session.location}, {session.countryName}
      </span>
    </div>
  );
}
