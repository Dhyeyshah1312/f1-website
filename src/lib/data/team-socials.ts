/**
 * Elsewhere → Social Instagram handle. `[C]` original editorial content
 * (DESIGN.md §8) — resolved, public handles, not sourced from an API.
 * Keyed by constructorId, matching lib/data/team-colors.ts's TEAM_COLORS
 * keys, same convention as team-history.ts.
 */
const TEAM_INSTAGRAM_HANDLES: Record<string, string> = {
  mclaren: "mclarenf1",
  ferrari: "scuderiaferrari",
  red_bull: "redbullracing",
  mercedes: "mercedesamgf1",
  williams: "williamsf1team",
  audi: "audif1",
  aston_martin: "astonmartinf1",
  haas: "haasf1team",
  alpine: "alpinef1team",
  rb: "visacashapprb",
  cadillac: "cadillacf1",
};

export function getTeamInstagramHandle(constructorId: string): string | null {
  return TEAM_INSTAGRAM_HANDLES[constructorId] ?? null;
}
