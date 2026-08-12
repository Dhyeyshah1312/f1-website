# F1 Project — Page-by-Page Component Spec

Companion doc to `F1-Project-Master-PRD.md`. This breaks §6 (IA) into build-level detail: layout, components, data bindings, interactions. This is what turns into the actual Claude Code build prompt, one section at a time.

Global conventions used throughout:
- **Data source key:** `[J]` Jolpica-F1, `[O]` OpenF1, `[F]` F1DB seed, `[C]` original/fictional content
- Desktop-first; mobile notes are placeholders until the mobile pass

---

## 0. Global shell (applies to every page)

**Navigation**
- Persistent top bar: wordmark (left), condensed menu trigger (right) — menu itself is full-screen takeover, not a dropdown, in keeping with Level 4 direction
- Section index visible in the full-screen menu: 01 Discover → 08 Beginner's Lab (+ 09 Race Center if in scope)
- Active section indicator, current race weekend countdown chip persists in nav (ties to Season data)

**Page transitions**
- No hard page loads — route transitions are choreographed (directional wipe / camera-move metaphor per §4 of PRD), Motion-driven
- Loading state: telemetry-line motif reused from homepage intro, not a generic spinner

**Footer**
- Minimal: section links, data attribution (Jolpica-F1/OpenF1 credit), last-updated timestamp for standings

---

## 1. Discover (Homepage)

**Purpose:** set tone in under 10 seconds, funnel into the other 8 sections.

**Sequence:**
1. Black frame → telemetry line animates across screen → faint circuit outline resolves in background `[C]`
2. Oversized wordmark reveal ("FORMULA ONE." or working title) + tagline
3. Primary CTA ("Enter") + secondary scroll cue
4. On scroll: section-teaser stack — one full-viewport panel per section (Season/Drivers/Teams/Circuits/History/Technology/Beginner's Lab), each with a representative image/motion loop and one-line hook, parallax on scroll
5. Live strip near top or bottom: next race countdown + current championship leader `[J]` — this is the one piece of real, changing data on the homepage, everything else on this page is `[C]`

**Key components:** `HeroIntro`, `SectionTeaserPanel` (x7-8), `LiveStatusStrip`, `ScrollCue`

**Interactions:** cursor-reactive micro-movement on hero type (subtle, not gimmicky), scroll-scrubbed panel transitions

---

## 2. Season

**Purpose:** the "what's happening right now" hub.

**Layout:**
- Header: current round number, next race countdown, "X races remaining"
- Two-column standings: Drivers' Championship (sortable table, team-color row accents) | Constructors' Championship
- Full calendar strip: 24 rounds, past rounds show result summary, future rounds show date/circuit, sprint rounds visually flagged
- Click a past round → inline expand: podium, pole, fastest lap, brief summary
- Click a future round → links to that circuit's page (§5)

**Data:** `[J]` current standings + results, `[O]` live session data if a race weekend is in progress (practice/quali/race status, live gaps) — this is the one page where `[O]` matters most

**Components:** `StandingsTable` (drivers/constructors variants), `CalendarStrip`, `RoundSummaryCard`, `LiveSessionBanner` (only renders during an active weekend)

---

## 3. Drivers

**Grid view**
- 22 cards, default grouped by team (pairs), team livery color as card accent
- Card shows: portrait, number, name, team, current points `[J]`
- Filter/sort bar: by team, by standings position, by nationality
- Hover: portrait shifts to action shot or subtle motion loop `[C]/photography TBD`

**Profile view** (`/drivers/[slug]`)
- Full-bleed portrait hero, driver number as oversized background numeral
- Scroll-driven reveal sequence: bio/nationality/age → current season stats → career stats (wins, podiums, poles, championships, points) `[J]` → career timeline (debut, team history, title years) `[J]/[F]` → achievements/records `[F]` → social handles + known partnerships `[C]` (publicly documented, sourced at content time — see PRD §5 licensing note)
- "Compare to teammate" toggle — side-by-side current-season stats

**Components:** `DriverGridCard`, `DriverFilterBar`, `DriverHero`, `StatBlock`, `CareerTimeline`, `TeammateCompare`

---

## 4. Teams

**Grid view**
- 11-column "paddock" layout, full-height on hover/focus, livery color fill
- Collapsed state: team name + constructor position; expanded: drivers, livery close-up

**Profile view** (`/teams/[slug]`)
- Hero: car livery (large), team colors as page accent
- Two driver cards linking to Drivers profiles
- Current season: constructor points, position `[J]`
- Team identity block: principal, HQ, power unit supplier, chassis name, founded year `[F]`
- History: constructors' championships won, notable eras `[F]`
- Current-season race-by-race result strip

**Components:** `PaddockGrid`, `TeamHero`, `DriverPairCard`, `TeamIdentityBlock`, `TeamHistoryStrip`

---

## 5. Circuits

**World map view**
- Interactive draggable/zoomable map, 24 markers for the 2026 calendar `[J]` (dates/order) + `[F]` (geometry)
- Marker states: completed / upcoming / next race (highlighted)

**Circuit detail** (`/circuits/[slug]`)
- Track outline draws itself in on load (SVG path animation)
- Key stats: laps, circuit length, number of turns, DRS zones `[F]`
- Elevation profile (if data available) `[F]`
- Historical: past winners, lap record + holder `[J]`
- Notable moments `[C]` (editorial, written once)

**Components:** `WorldMap`, `CircuitMarker`, `TrackDrawIn`, `CircuitStatBlock`, `WinnersHistoryList`

---

## 6. History

**Layout**
- Horizontal (or vertical, TBD in design pass) timeline, 1950 → present, decade tick marks
- Drag/scroll to travel through time; each year surfaces that season's drivers'/constructors' champion `[J]/[F]`
- Click a year → season detail: final standings, number of races, standout storyline `[C]` editorial blurb
- Dedicated "Records" panel: most wins, most poles, youngest/oldest champion, most championships, etc. `[F]`

**Components:** `EraTimeline`, `YearMarker`, `SeasonDetailPanel`, `RecordsGrid`

**Stretch:** subtle visual-language shift as user travels through decades (period-appropriate color grading/type texture) — flag as a polish-phase item, not core build

---

## 7. Technology ("The Machine")

**Layout**
- Full-viewport 3D car (React Three Fiber + drei), orbit controls
- Hotspot markers on the model: front wing, floor/diffuser, power unit, DRS/active aero, suspension, tyres
- Click hotspot → component explodes/isolates, side panel opens with explanation
- Mode toggle: **Beginner** (plain language, "this keeps the car stable in corners") vs **Technical** (2026 regs, actual numbers — e.g. 1.6L V6 turbo-hybrid specifics, active aero rules) `[C]`, technical claims sourced from official regulation summaries at content time

**Components:** `CarViewer3D`, `ComponentHotspot`, `ExplodedView`, `InfoPanel`, `ModeToggle`

**Perf note:** this is the heaviest page — needs its own loading/progressive-mesh strategy so it doesn't block first paint

---

## 8. Beginner's Lab

**Landing:** module list, each framed as a short interactive lesson, no login required, progress kept in local state (session-only for v1)

1. **The Grid** — visual intro to 22 cars / 11 teams, "here's who's racing"
2. **The Weekend** — interactive Thu→Sun timeline (Practice → Qualifying → Sprint* → Race), click each stage for a 1-line explainer
3. **The Points** — interactive points visualization; drag finishing positions, see points awarded update live
4. **The Car** — simplified version of the Technology section's beginner mode, standalone
5. **The Strategy** — lightweight pit-stop/tyre-choice simulation, shows how strategy affects race outcome

**Components:** `LessonCard`, `WeekendTimeline`, `PointsSimulator`, `CarBasicsExplainer`, `StrategySimulator`, `ProgressTracker`

---

## 9. Race Center — stretch (v1 scope TBD, see PRD §11)

- Only meaningfully different from Season page during an active race weekend
- Session-by-session schedule with live status `[O]`
- Live standings/gaps during a session if `[O]` data available
- If not in scope for v1: fold its countdown/next-race function into Season page and revisit later

---

## Build sequencing recommendation

Given the tech stack in PRD §10, suggested build order (each is a self-contained Claude Code prompt rather than one giant one):

1. Global shell + design tokens (nav, footer, transitions, type system)
2. Data layer (§9 of PRD) wired to Jolpica-F1/OpenF1/F1DB with typed fetchers
3. Season + Drivers + Teams (data-heavy, most reusable component patterns)
4. Circuits (map + track drawing)
5. History (timeline)
6. Discover/Homepage (depends on other sections existing for the teaser panels)
7. Technology (3D — most complex, isolate so it doesn't block everything else)
8. Beginner's Lab (mostly original interaction design, least data-dependent)
9. Race Center (only if in v1 scope)

---

*Still open before this goes to Claude Code: image sourcing decision (PRD §5/§8), final naming (PRD §8), and a design-system pass (type scale, color tokens, spacing) — recommend doing that in Google Stitch before writing the build prompt for §1 above.*
