/**
 * Jolpica-F1 IDs vs. image filenames don't always match — not typos, genuine
 * naming-convention differences (Jolpica's "rb" for Racing Bulls will never
 * look like a sane filename). This is the one place that gap is bridged.
 * Pure string mapping, no fs access — safe to import from client components
 * (unlike lib/data/portraits.ts, which needs server-only for existsSync).
 */

const DRIVER_IMAGE_SLUGS: Record<string, string> = {
  max_verstappen: "verstappen",
  arvid_lindblad: "lindblad",
};

const TEAM_IMAGE_SLUGS: Record<string, string> = {
  red_bull: "red-bull",
  rb: "racing-bulls", // Jolpica's constructorId for Racing Bulls
  aston_martin: "aston-martin",
};

// All 23 circuitIds map explicitly (not identity-fallback) — verified
// against the live 2026 Jolpica calendar on 2026-08-12. Two were genuinely
// ambiguous and confirmed against Jolpica's own round data before wiring:
//  - "madring" (round 14, "Spanish Grand Prix") is Madrid, distinct from
//    "catalunya" (round 7, Barcelona) — both map to their own real names.
//  - "sepang" (round 16) is officially named "Bahrain Grand Prix in
//    Malaysia" by Jolpica itself — Kuala Lumpur, not Bahrain. The image file
//    is named bahrain-verify.jpg (reflecting that prior uncertainty); mapped
//    here rather than renamed, same as every other circuit in this table.
const CIRCUIT_IMAGE_SLUGS: Record<string, string> = {
  albert_park: "albert-park",
  shanghai: "shanghai",
  suzuka: "suzuka",
  miami: "miami",
  villeneuve: "montreal",
  monaco: "monaco",
  catalunya: "catalunya",
  red_bull_ring: "red-bull-ring",
  silverstone: "silverstone",
  spa: "spa-francorchamps",
  hungaroring: "hungaroring",
  zandvoort: "zandvoort",
  monza: "monza",
  madring: "madring",
  baku: "baku",
  sepang: "bahrain-verify", // see note above — actually Kuala Lumpur, Malaysia
  marina_bay: "marina-bay",
  americas: "cota",
  rodriguez: "mexico-city",
  interlagos: "interlagos",
  vegas: "las-vegas",
  losail: "lusail",
  yas_marina: "yas-marina",
};

export function driverImageSlug(driverId: string): string {
  return DRIVER_IMAGE_SLUGS[driverId] ?? driverId;
}

export function teamImageSlug(constructorId: string): string {
  return TEAM_IMAGE_SLUGS[constructorId] ?? constructorId;
}

export function circuitImageSlug(circuitId: string): string {
  return CIRCUIT_IMAGE_SLUGS[circuitId] ?? circuitId;
}
