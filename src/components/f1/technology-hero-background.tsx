/**
 * Technology hero background. Same imagery constraint as History (see
 * history-hero-background.tsx) — no licensed car close-up photography
 * available, and the page already has a real, actual 3D model of the car
 * below this hero, so a fake photo here would compete with the real thing
 * rather than introduce it. A CAD/engineering-blueprint treatment instead:
 * fine grid + a few abstract technical linework strokes, in keeping with
 * DESIGN.md's "aerospace engineering" reference direction.
 */
export function TechnologyHeroBackground() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-graphite">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="tech-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40,0 L0,0 0,40" fill="none" stroke="var(--asphalt)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tech-grid)" opacity="0.5" />
        {/* Abstract front-wing / floor-edge linework — deliberately not a
            traceable real component, a technical-diagram motif only. */}
        <path
          d="M-40,420 L280,420 Q340,420 380,380 L620,180"
          fill="none"
          stroke="var(--circuit-red)"
          strokeWidth="1.5"
          opacity="0.18"
        />
        <path
          d="M-40,480 L320,480 Q380,480 420,440 L720,220"
          fill="none"
          stroke="var(--circuit-red)"
          strokeWidth="1.5"
          opacity="0.1"
        />
        <circle cx="620" cy="180" r="3" fill="var(--circuit-red)" opacity="0.3" />
      </svg>
    </div>
  );
}
