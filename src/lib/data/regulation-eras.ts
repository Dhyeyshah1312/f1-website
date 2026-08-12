/**
 * History's "Regulation Eras" layer — a separate axis from the per-season
 * champions timeline. `[C]` original editorial content (DESIGN.md §8), same
 * research standard as the driver Achievements/partner drafts.
 *
 * Deliberately NOT modeled as one non-overlapping band per year: F1's
 * chassis/aero rules and engine rules change on independent schedules (e.g.
 * 1978-1982's "Ground Effect, First Era" sits entirely inside 1977-1988's
 * "The Turbo Era" — both real, both true at once). Forcing a single era
 * per year would silently drop one of the two. `years` states each era's
 * real range explicitly instead, so the overlap is visible rather than
 * hidden.
 *
 * Ordered by start year. The 2026 entry deliberately excludes a full
 * description — the Technology page is that content's real home; linkHref
 * points there instead of duplicating it.
 */

export interface RegulationEra {
  id: string;
  name: string;
  years: string;
  description: string;
  linkHref?: string;
}

export const REGULATION_ERAS: RegulationEra[] = [
  {
    id: "front-engine",
    name: "Front-Engine Era",
    years: "1950–1958",
    description:
      "F1's earliest years, cars built with the engine mounted in front of the driver, similar in principle to contemporary road cars. Ended almost overnight once Cooper proved the rear-engine layout was faster from 1959 onward.",
  },
  {
    id: "rear-engine-revolution",
    name: "Rear-Engine Revolution",
    years: "1959–1976",
    description:
      "Rear/mid-mounted engines become universal after Cooper's breakthrough. Aerodynamic wings begin appearing on cars from 1968, the first step toward downforce-driven design.",
  },
  {
    id: "turbo-era",
    name: "The Turbo Era",
    years: "1977–1988",
    description:
      "Renault introduces F1's first turbocharged engine in 1977; by the mid-1980s, turbo engines in qualifying trim were producing over 1,000 horsepower — a figure not matched since. Banned entirely from 1989 on safety and cost grounds.",
  },
  {
    id: "ground-effect-first",
    name: "Ground Effect, First Era",
    years: "1978–1982",
    description:
      "Lotus pioneers underbody aerodynamics that use the car's floor to generate huge amounts of grip via low air pressure, most famously in the title-winning Lotus 79 of 1978. Banned in 1982 once grip levels became dangerously extreme for the safety standards of the time.",
  },
  {
    id: "naturally-aspirated",
    name: "The Naturally Aspirated Era",
    years: "1989–2005",
    description:
      "Turbos banned, giving way to a long run of naturally aspirated engines: 3.5-litre through the early '90s, reduced to 3.0 litres from 1995. The V10 engines of this era, revving past 19,000 RPM, are widely considered the best-sounding in F1 history.",
  },
  {
    id: "v8-era",
    name: "The V8 Era",
    years: "2006–2013",
    description:
      "The FIA mandates smaller 2.4-litre V8 engines to cut both cost and power, part of a broader effort to slow the sport down after the V10 era's fastest, most dangerous years.",
  },
  {
    id: "turbo-hybrid",
    name: "The Turbo-Hybrid Era",
    years: "2014–2025",
    description:
      "1.6-litre turbo V6 engines paired with sophisticated hybrid energy recovery replace the V8s, dramatically improving efficiency. Mercedes' early dominance of this era — eight consecutive Constructors' Championships — remains unmatched by any team in the hybrid era.",
  },
  {
    id: "halo",
    name: "The Halo",
    years: "2018–present",
    description:
      "A titanium safety structure protecting the driver's head becomes mandatory on all cars — one of the most visually controversial changes in F1 history at the time, now widely credited with saving lives in several serious accidents since.",
  },
  {
    id: "ground-effect-returns",
    name: "Ground Effect Returns",
    years: "2022–2025",
    description:
      "After 40 years away, ground-effect aerodynamics come back by design, meant to let cars race more closely by relying less on wings (which create the \"dirty air\" that makes following difficult) and more on the floor.",
  },
  {
    id: "2026-era",
    name: "The 2026 Era",
    years: "2026–present",
    description:
      "Active aerodynamics, a lighter and more electrically-powered hybrid unit, and a smaller overall car.",
    linkHref: "/technology",
  },
];
