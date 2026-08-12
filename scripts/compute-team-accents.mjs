#!/usr/bin/env node
// Generates src/lib/data/team-colors.ts from the primary/secondary source
// table below. Run with `npm run compute:team-accents`. Do not hand-edit the
// generated file — edit SOURCE_TEAM_COLORS here and re-run instead.
//
// uiAccent algorithm (deterministic, not hand-picked):
//   1. candidate = team's primary hex
//   2. walking teams in the stable order below, if candidate collides
//      (identical or near-identical, see NEAR_IDENTICAL_DELTA_E) with any
//      already-finalized earlier team's uiAccent -> candidate = secondary
//   3. re-validate the fallback candidate against collision; if it STILL
//      collides, there is no third color to try — log it as UNRESOLVED and
//      leave uiAccent on primary (a visible TODO, not a silent guess) unless
//      the source table carries a `note` for that team, in which case it's
//      a documented, accepted collision rather than an open one.
//
// `pin`, when present on an entry, bypasses the algorithm entirely for that
// team — its uiAccent is exactly the pinned hex, always. This is for cases
// like Mercedes below: not a color the algorithm couldn't resolve, but a
// deliberate choice to stop two teams competing for the same true-primary
// color and just relocating the collision. Pinned entries are still checked
// against every earlier-finalized team's accent and loudly warned about (not
// silently accepted) if they collide — the pin is trusted, not exempted from
// the check.
//
// There is no per-team background-contrast check. Every accent bar renders
// with a fixed 1px Brushed Steel hairline outline (see StandingsTable), which
// guarantees legibility against the Off-Black Carbon background regardless
// of how dark the fill color is — so contrast against the page background is
// solved once, structurally, by the outline, not per-color by this script.
// The outlineContrast check below exists to document *why* that's true
// rather than assert it blindly.

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const BACKGROUND_HEX = "#0B0C0D"; // DESIGN.md Off-Black Carbon
const OUTLINE_HEX = "#8A8F94"; // Brushed Steel — the hairline outline every accent bar gets
const MIN_CONTRAST = 3.0; // WCAG non-text minimum
const NEAR_IDENTICAL_DELTA_E = 15; // CIE76 ΔE — below this two colors read as "the same" in a 2px stripe

// Stable order — determines which team of a colliding pair falls back.
// This is the same order the community reference table was given in.
const SOURCE_TEAM_COLORS = [
  { id: "mclaren", primary: "#FF8000", secondary: "#000000" },
  { id: "ferrari", primary: "#E80020", secondary: "#FFFFFF" },
  { id: "red_bull", primary: "#3671C6", secondary: "#FFCC00" },
  {
    id: "mercedes",
    primary: "#000000",
    secondary: "#27F4D2",
    pin: "#27F4D2",
    note:
      "Deliberate pin, not an algorithmic fallback: Mercedes and Cadillac " +
      "both have black as their true primary. Letting the algorithm resolve " +
      "that competition would only relocate the collision to whichever team " +
      "loses the stable-order tiebreak — so Mercedes is pinned to its other " +
      "real brand color (teal) instead, freeing black for Cadillac and " +
      "letting both teams render distinctly.",
  },
  { id: "aston_martin", primary: "#00665E", secondary: "#CEDC00" },
  { id: "alpine", primary: "#FF87BC", secondary: "#0090FF" },
  { id: "williams", primary: "#64C4FF", secondary: "#041E42" },
  { id: "rb", primary: "#FFFFFF", secondary: "#6692FF" }, // Racing Bulls
  {
    id: "haas",
    primary: "#FFFFFF",
    secondary: "#E6002B",
    note:
      "Accepted collision, not a bug: white (RB) and red (Ferrari) — Haas's " +
      "only two real colors — are both already claimed by earlier teams in " +
      "stable order. There's no third color to invent without breaking the " +
      "primary-or-secondary-only rule. The row's team-name text is the real " +
      "disambiguator here; the accent bar is decorative reinforcement only.",
  },
  { id: "audi", primary: "#C8CED4", secondary: "#F50537" },
  {
    id: "cadillac",
    primary: "#FFFFFF",
    secondary: "#000000", // livery revealed Feb 2026: white/black w/ red accent
  },
];

// --- color math -------------------------------------------------------

function hexToRgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function srgbChannelToLinear(c) {
  const cs = c / 255;
  return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}

function relativeLuminance([r, g, b]) {
  const [rl, gl, bl] = [r, g, b].map(srgbChannelToLinear);
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

function contrastRatio(hexA, hexB) {
  const lA = relativeLuminance(hexToRgb(hexA));
  const lB = relativeLuminance(hexToRgb(hexB));
  const [lighter, darker] = lA >= lB ? [lA, lB] : [lB, lA];
  return (lighter + 0.05) / (darker + 0.05);
}

function labF(t) {
  const delta = 6 / 29;
  return t > delta ** 3 ? Math.cbrt(t) : t / (3 * delta ** 2) + 4 / 29;
}

function hexToLab(hex) {
  const [r, g, b] = hexToRgb(hex).map(srgbChannelToLinear);
  // sRGB (D65) -> XYZ
  const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
  const y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
  const z = r * 0.0193339 + g * 0.119192 + b * 0.9503041;
  const [xn, yn, zn] = [0.95047, 1.0, 1.08883];
  const fx = labF(x / xn);
  const fy = labF(y / yn);
  const fz = labF(z / zn);
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

function deltaE76(hexA, hexB) {
  const [l1, a1, b1] = hexToLab(hexA);
  const [l2, a2, b2] = hexToLab(hexB);
  return Math.sqrt((l1 - l2) ** 2 + (a1 - a2) ** 2 + (b1 - b2) ** 2);
}

function collidesWithAny(hex, finalizedHexes) {
  return finalizedHexes.some(
    (other) => hex.toUpperCase() === other.toUpperCase() || deltaE76(hex, other) < NEAR_IDENTICAL_DELTA_E,
  );
}

// One-time structural check (not per-team): confirm the outline itself is
// legible against the background. If this ever fails, the "outline solves
// contrast" premise above is wrong and the algorithm needs a rethink.
const outlineContrast = contrastRatio(OUTLINE_HEX, BACKGROUND_HEX);
const outlineContrastOk = outlineContrast >= MIN_CONTRAST;

// --- algorithm ----------------------------------------------------------

const results = [];
const finalizedAccents = [];
const unresolved = [];
const pinCollisions = [];

for (const { id, primary, secondary, note, pin } of SOURCE_TEAM_COLORS) {
  let candidate;
  let pinned = false;

  if (pin) {
    candidate = pin;
    pinned = true;
    if (collidesWithAny(candidate, finalizedAccents)) {
      // The pin is trusted, not silently exempted — surface it loudly if it
      // turns out to collide with an earlier team anyway.
      pinCollisions.push({ id });
    }
  } else {
    candidate = primary;
    if (collidesWithAny(candidate, finalizedAccents)) {
      candidate = secondary;
      if (collidesWithAny(candidate, finalizedAccents)) {
        // Still colliding on secondary — no third color. Documented (note) or open TODO.
        unresolved.push({ id, note });
        candidate = primary;
      }
    }
  }

  finalizedAccents.push(candidate);
  results.push({ id, primary, secondary, uiAccent: candidate, note, pinned });
}

// --- report ---------------------------------------------------------------

console.log(
  `Outline legibility check: Brushed Steel (${OUTLINE_HEX}) vs background (${BACKGROUND_HEX}) = ${outlineContrast.toFixed(
    2,
  )}:1 (min ${MIN_CONTRAST}:1) — ${outlineContrastOk ? "OK" : "FAILING, algorithm assumption is broken"}\n`,
);

console.log("Computed uiAccent per team:\n");
for (const r of results) {
  const flag = unresolved.find((u) => u.id === r.id);
  const pinCollision = pinCollisions.find((p) => p.id === r.id);
  let label = "";
  if (r.pinned) label = pinCollision ? "PINNED — ** ALSO COLLIDES, review pin **" : "PINNED (deliberate)";
  else if (flag) label = flag.note ? "ACCEPTED COLLISION (documented)" : "UNRESOLVED (needs review)";
  console.log(
    `  ${r.id.padEnd(13)} primary=${r.primary}  secondary=${r.secondary}  uiAccent=${r.uiAccent}${
      label ? `   ** ${label} **` : ""
    }`,
  );
}

const distinctCount = new Set(results.map((r) => r.uiAccent.toUpperCase())).size;
console.log(`\n${results.length} teams, ${distinctCount} distinct uiAccent values.`);

const openTodos = unresolved.filter((u) => !u.note);
if (openTodos.length > 0) {
  console.log(`${openTodos.length} team(s) still need a manual look (no note explaining the collision):`);
  for (const u of openTodos) console.log(`  - ${u.id}`);
} else if (unresolved.length > 0) {
  console.log(`All ${unresolved.length} colliding team(s) have a documented, accepted reason.`);
} else {
  console.log("No unresolved collisions.");
}

// --- write generated file --------------------------------------------------

const teamEntries = results
  .map((r) => {
    const entry = `  ${r.id}: { primary: "${r.primary}", secondary: "${r.secondary}", uiAccent: "${r.uiAccent}" },`;
    const label = r.pinned ? `PINNED — ${r.note}` : r.note;
    return label ? `  // ${label}\n${entry}` : entry;
  })
  .join("\n");

const output = `/**
 * AUTO-GENERATED by scripts/compute-team-accents.mjs — do not hand-edit.
 * Edit SOURCE_TEAM_COLORS in that script and run \`npm run compute:team-accents\`.
 *
 * primary/secondary: community-sourced livery reference, not pulled from
 * official F1 broadcast graphics — an approximation worth a real
 * verification pass later, not a fact the way a stat would be.
 *
 * uiAccent: deterministically derived from primary/secondary (CIE76 collision
 * check against every other team's accent, in stable order) — never
 * hand-picked, except where a per-team comment says "PINNED" (a documented,
 * deliberate override, not an algorithm output). Use uiAccent anywhere
 * multiple teams must be simultaneously distinguishable in a list (e.g. the
 * standings-row accent bar, which also always renders with a 1px Brushed
 * Steel outline — see StandingsTable — so background contrast is handled
 * structurally and isn't gated here). Team profile pages / hero sections
 * should use primary/secondary instead, since showing the real livery
 * matters more there than list-differentiation.
 */
export interface TeamColor {
  primary: string;
  secondary: string;
  uiAccent: string;
}

export const TEAM_COLORS: Record<string, TeamColor> = {
${teamEntries}
};

const FALLBACK_COLOR: TeamColor = {
  primary: "#8A8F94",
  secondary: "#2A2D30",
  uiAccent: "#8A8F94",
}; // Brushed Steel / Asphalt — unknown constructorId

export function getTeamColors(constructorId: string): TeamColor {
  return TEAM_COLORS[constructorId] ?? FALLBACK_COLOR;
}

/** Real livery primary — for team profile pages / hero sections, not lists. */
export function getTeamColor(constructorId: string): string {
  return getTeamColors(constructorId).primary;
}

/** Collision-safe accent — for standings rows and anywhere teams must read as distinct in a list. */
export function getTeamUiAccent(constructorId: string): string {
  return getTeamColors(constructorId).uiAccent;
}
`;

const outPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "src/lib/data/team-colors.ts",
);
writeFileSync(outPath, output, "utf-8");
console.log(`\nWrote ${path.relative(process.cwd(), outPath)}`);
