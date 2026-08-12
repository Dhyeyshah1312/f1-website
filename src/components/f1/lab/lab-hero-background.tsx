/**
 * Beginner's Lab hero background. Same imagery constraint as the other two
 * unphotographed heroes (see history-hero-background.tsx) — original
 * treatment instead of licensed photography. Deliberately the simplest and
 * warmest of the three: a starting-grid motif (22 cars, paired by team,
 * the literal subject of the first lesson module) rendered as plain rounded
 * blocks rather than anything technical — approachable, not another
 * blueprint.
 */
const GRID_ROWS = 11;

export function LabHeroBackground() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-graphite">
      <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-[0.14]">
        {[0, 1].map((col) => (
          <div key={col} className="flex flex-col gap-4" style={{ marginTop: col === 1 ? "1.5rem" : 0 }}>
            {Array.from({ length: GRID_ROWS }, (_, row) => (
              <div
                key={row}
                className="h-3 w-16 rounded-sm md:h-4 md:w-24"
                style={{ backgroundColor: row % 3 === 0 ? "var(--circuit-red)" : "var(--brushed-steel)" }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
