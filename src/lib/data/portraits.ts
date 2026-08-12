import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";
import { circuitImageSlug, driverImageSlug, teamImageSlug } from "@/lib/data/image-slugs";

/**
 * Image existence checks — run at render time rather than assumed, so a
 * missing file degrades to a placeholder instead of a broken <img>
 * (DESIGN.md §8 bans broken image links). Drop a matching file in and it
 * starts rendering with no code changes. Filenames use driverImageSlug /
 * teamImageSlug, not the raw Jolpica ID (see lib/data/image-slugs.ts).
 */
const IMAGES_DIR = path.join(process.cwd(), "public/images");

function fileExists(...segments: string[]): boolean {
  return existsSync(path.join(IMAGES_DIR, ...segments));
}

export function hasDriverPortrait(driverId: string): boolean {
  return fileExists("drivers", `${driverImageSlug(driverId)}.jpg`);
}

export function hasDriverPartnerPhoto(driverId: string): boolean {
  return fileExists("drivers", `${driverImageSlug(driverId)}-partner.jpg`);
}

export function hasTeamLivery(constructorId: string): boolean {
  return fileExists("teams", `${teamImageSlug(constructorId)}-livery.jpg`);
}

export function hasTeamLogo(constructorId: string): boolean {
  return fileExists("teams", `${teamImageSlug(constructorId)}-logo.jpg`);
}

export function hasCircuitImage(circuitId: string): boolean {
  return fileExists("circuits", `${circuitImageSlug(circuitId)}.jpg`);
}
