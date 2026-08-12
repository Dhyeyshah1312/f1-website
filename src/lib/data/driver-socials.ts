/**
 * Elsewhere → Social Instagram handle. `[C]` original editorial content
 * (DESIGN.md §8) — resolved, public handles, not sourced from an API.
 * Keyed by driver image slug (see image-slugs.ts), same convention as
 * driver-partners.ts and the *-partner.jpg filenames on disk.
 */
const DRIVER_INSTAGRAM_HANDLES: Record<string, string> = {
  verstappen: "maxverstappen1",
  hamilton: "lewishamilton",
  leclerc: "charles_leclerc",
  norris: "lando",
  piastri: "oscarpiastri",
  russell: "georgerussell63",
  antonelli: "kimi.antonelli",
  alonso: "fernandoalo_oficial",
  stroll: "lance_stroll",
  albon: "alex_albon",
  sainz: "carlossainz55",
  perez: "schecoperez",
  bottas: "valtteribottas",
  gasly: "pierregasly",
  ocon: "estebanocon",
  colapinto: "francolapinto",
  hulkenberg: "hulkhulkenberg",
  hadjar: "isackhadjar",
  lawson: "liamlawson30",
  lindblad: "arvid.lindblad",
  bearman: "olliebearman",
  bortoleto: "gabrielbortoleto_",
};

export function getDriverInstagramHandle(imageSlug: string): string | null {
  return DRIVER_INSTAGRAM_HANDLES[imageSlug] ?? null;
}
