/**
 * Jolpica-F1 IDs vs. image filenames mapping. Pure string mapping, no fs access.
 */

const DRIVER_IMAGE_SLUGS: Record<string, string> = {
  max_verstappen: "verstappen",
  arvid_lindblad: "lindblad",
};

const TEAM_IMAGE_SLUGS: Record<string, string> = {
  red_bull: "red-bull",
  rb: "racing-bulls", // Jolpica's constructorId for Racing Bulls
  aston_martin: "aston-martin",
  sauber: "audi",
  audi: "audi",
  cadillac: "cadillac",
  haas: "haas",
  alpine: "alpine",
  williams: "williams",
  mercedes: "mercedes",
  ferrari: "ferrari",
  mclaren: "mclaren",
};

// All 24 circuitIds mapped explicitly to verified public/images/circuits/ filenames
const CIRCUIT_IMAGE_SLUGS: Record<string, string> = {
  albert_park: "albert-park",
  shanghai: "shanghai",
  suzuka: "suzuka",
  bahrain: "bahrain-verify",
  jeddah: "bahrain-verify",
  miami: "miami",
  imola: "monza",
  monaco: "monaco",
  montreal: "montreal",
  villeneuve: "montreal",
  catalunya: "catalunya",
  red_bull_ring: "red-bull-ring",
  silverstone: "silverstone",
  hungaroring: "hungaroring",
  spa: "spa-francorchamps",
  zandvoort: "zandvoort",
  monza: "monza",
  baku: "baku",
  singapore: "marina-bay",
  marina_bay: "marina-bay",
  americas: "cota",
  rodriguez: "mexico-city",
  interlagos: "interlagos",
  vegas: "las-vegas",
  losail: "lusail",
  yas_marina: "yas-marina",
  sepang: "bahrain-verify",
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
