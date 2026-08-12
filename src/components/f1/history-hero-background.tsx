/**
 * History hero background. No archival F1 photography is available to
 * license (PRD §5/§11 — imagery sourcing was always a deferred, open
 * decision; real press photos aren't something this project can source or
 * clear rights for). Original treatment instead: oversized decade numerals
 * as layered graphic objects — the same "number as background graphic"
 * motif already used for the driver hero's number-behind-portrait and the
 * circuit page's track outline, applied here to the thing History is
 * actually about — time, not a photo of it.
 */
export function HistoryHeroBackground() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-graphite">
      <span className="absolute -left-8 -top-10 font-display text-[26vw] font-black leading-none text-asphalt/70 md:text-[18vw]">
        1950
      </span>
      <span className="absolute left-[18vw] top-[18vh] font-display text-[26vw] font-black leading-none text-asphalt/50 md:text-[18vw]">
        1988
      </span>
      <span className="absolute -right-4 top-[4vh] font-display text-[26vw] font-black leading-none text-asphalt/60 md:text-[18vw]">
        2021
      </span>
      <span className="absolute bottom-[-8vh] left-[8vw] font-display text-[30vw] font-black leading-none text-circuit-red/[0.08] md:text-[20vw]">
        2026
      </span>
    </div>
  );
}
