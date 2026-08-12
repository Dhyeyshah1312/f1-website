/**
 * Elsewhere → Partner subsection content. `[C]` original editorial content
 * (DESIGN.md §8) — resolved, public-record facts, not sourced from an API.
 * Keyed by driver image slug (see image-slugs.ts), not the raw Jolpica
 * driverId, matching the *-partner.jpg filenames on disk.
 *
 * Deliberately excludes Antonelli, Lindblad, and Norris — no public
 * relationship confirmed for them, a resolved fact rather than a gap to
 * backfill later.
 */

export type PartnerStatus = "Dating" | "Engaged" | "Married";

export interface DriverPartner {
  name: string;
  status: PartnerStatus;
  /** Instagram handle, without the leading @ — build the link as https://instagram.com/{handle}. */
  instagramHandle: string;
}

const DRIVER_PARTNERS: Record<string, DriverPartner> = {
  albon: { name: "Lily Muni He", status: "Engaged", instagramHandle: "lilymhe" },
  alonso: { name: "Melissa Jiménez", status: "Dating", instagramHandle: "melissajimenezgp" },
  bearman: { name: "Alicia Torriani", status: "Dating", instagramHandle: "alicia_torriani" },
  bortoleto: { name: "Isabella Bernardini", status: "Dating", instagramHandle: "isabellabernardini_" },
  bottas: { name: "Tiffany Cromwell", status: "Dating", instagramHandle: "tiffanycromwell" },
  colapinto: { name: "Maia Reficco", status: "Dating", instagramHandle: "maiareficco" },
  gasly: { name: 'Francisca "Kika" Gomes', status: "Dating", instagramHandle: "kikagomes" },
  hadjar: { name: "Lauren Fitzsimmons", status: "Dating", instagramHandle: "laurenfitzsimmons_" },
  hamilton: { name: "Kim Kardashian", status: "Dating", instagramHandle: "kimkardashian" },
  hulkenberg: { name: "Egle Ruskyte", status: "Married", instagramHandle: "egle_hulkenberg" },
  lawson: { name: "Hannah St. John", status: "Dating", instagramHandle: "hannahstjohn" },
  leclerc: { name: "Alexandra Saint Mleux", status: "Married", instagramHandle: "alexandramalenaleclerc" },
  ocon: { name: "Flavy Barla", status: "Dating", instagramHandle: "flavy.barla" },
  perez: { name: "Carola Martínez", status: "Married", instagramHandle: "carolamartinezsalido" },
  piastri: { name: "Lily Zneimer", status: "Dating", instagramHandle: "lilyzneimer" },
  russell: { name: "Carmen Montero Mundt", status: "Engaged", instagramHandle: "carmenmmundt" },
  sainz: { name: "Rebecca Donaldson", status: "Dating", instagramHandle: "rebeccadonaldson" },
  stroll: { name: "Yael Shelbia", status: "Dating", instagramHandle: "yaelshelbia" },
  verstappen: { name: "Kelly Piquet", status: "Dating", instagramHandle: "kellypiquet" },
};

export function getDriverPartner(imageSlug: string): DriverPartner | null {
  return DRIVER_PARTNERS[imageSlug] ?? null;
}
