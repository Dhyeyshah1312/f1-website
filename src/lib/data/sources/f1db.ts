import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * F1DB (github.com/f1db/f1db) — static historical dataset, used to seed local
 * dev and anything needing bulk historical queries (circuits, team history,
 * records) without hammering Jolpica-F1. Drop the dataset's JSON exports into
 * lib/data/seed/<name>.json — e.g. seed/circuits.json, seed/constructors.json —
 * and read them through loadSeed(). No seed files are bundled yet, so every
 * loadSeed() call currently resolves to null (→ Pending upstream) until the
 * dataset is added; that's the correct behavior, not a bug.
 */
const SEED_DIR = path.join(process.cwd(), "src/lib/data/seed");

export async function loadSeed<T>(name: string): Promise<T | null> {
  try {
    const raw = await readFile(path.join(SEED_DIR, `${name}.json`), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
