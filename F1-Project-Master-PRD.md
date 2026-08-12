# F1 Beginner's Guide — Master Product Requirements Document

Working title: **F1** (mock/tribute styling of the official F1 site — branding decision deferred, see §8)

---

## 1. What this is

An immersive, cinematic web experience that teaches someone who knows nothing about Formula 1 how the sport works, while giving existing fans a genuinely deep, beautifully presented reference (teams, drivers, circuits, history, current season). Not a clone built for its own sake — the goal is "someone opens this and wants to keep exploring," at Level 4 production value (see §4).

**Two audiences, one interface, progressive disclosure:**
- Beginner: what is DRS, how does scoring work, what happens on a race weekend
- Enthusiast: full stats, records, historical comparisons, technical detail

## 2. Target users

| Segment | Needs |
|---|---|
| Complete beginner | Plain-language explainers: quali vs. race, points system, why 2 drivers/team, terminology |
| Casual viewer | Knows a few names/teams, wants context and depth without a textbook |
| F1 nerd | Historical stats, records, technical regs, championship data, telemetry-style detail |

## 3. Scope

Full multi-page website (not single-page), desktop-first now, mobile parity later.

Primary sections:
1. **Discover** — homepage / entry experience
2. **Season** — current standings, calendar, next race
3. **Drivers** — all 22 driver profiles
4. **Teams** — all 11 team/constructor profiles
5. **Circuits** — all 2026 calendar tracks, interactive map
6. **History** — champions, records, decade-by-decade archive
7. **Technology** — the 2026 car, explained (3D, exploded view)
8. **Beginner's Lab** — interactive "learn F1 in 5 minutes" mini-experiences
9. **Race Center** *(stretch)* — live/current weekend hub

## 4. Creative direction

**Target feeling:** "This feels like the future / ridiculously expensive / an Apple product launch / a movie / I'm inside a spaceship."

**Level: 4 — the interface itself is the experience.** Scroll-driven storytelling, cinematic transitions, full interactive 3D, unconventional navigation, reactive visuals, ambient sound.

**Visual language:** future / precision / speed / engineering / human. Explicitly *not* cyberpunk, not neon, not glassmorphism, not "black + purple gradient + glowing cards."

- Materials: carbon fiber, brushed metal, rubber, titanium, glass, asphalt
- Lighting: hard directional light, track lighting, reflections, deep shadow, cinematic highlights
- Typography: condensed display face + technical grotesk + monospace telemetry accents, oversized editorial scale
- Motion: acceleration/deceleration curves, inertia, camera movement, track-line drawing, velocity-based type animation, directional wipes

**Reference synthesis** (from the 3 reels provided): modular editorial grids + massive typography-as-graphic-object + dark cinematic engineering aesthetic + asymmetric layout + large negative space. Combined direction: *aerospace engineering × luxury editorial × cinematic product launch × digital instrument panel.*

## 5. Content strategy

**Real content:** drivers, teams, liveries, circuits, results, championships, historical stats, current 2026 standings/calendar, publicly documented driver achievements and social links.

**Original/fictional:** the site's own interface copy, animations, interactive lessons/diagrams, editorial voice, data visualizations.

2026 season context to build against: 11 teams / 22 drivers (Cadillac's entry), 24 Grand Prix weekends including 6 sprints, new power unit and aero regulations. Verify current standings/calendar at build time — these change weekly.

**Imagery note:** real F1 photography (liveries, drivers, circuits) is licensed/copyrighted. Options to settle later: official/licensed press imagery, properly licensed editorial stock, or original renders/illustrations for anything that can't be sourced cleanly — especially relevant given §8 is still open.

## 6. Information architecture highlights

- **Homepage:** dark cinematic open → telemetry line → circuit outline reveal → oversized "FORMULA ONE." wordmark → scroll-gated entry
- **Beginner's Lab:** interactive modules — The Grid (22 cars), The Weekend (Thu→Sun timeline), The Points (championship math), The Car (component explorer), The Strategy (pit-stop/tyre simulation)
- **Drivers:** full-bleed portrait → scroll reveals stats/career timeline/achievements/socials, per driver
- **Teams:** 11-column "paddock" grid, selecting a team takes over the viewport (livery, drivers, history, current standing, technical identity)
- **Circuits:** drag-around world map → click a race → circuit draws itself in with corners/overtaking zones/history/winners
- **History:** horizontal timeline 1950→present, decade-based visual language shifts
- **Technology ("The Machine"):** full interactive 3D 2026 car, hover/click to explode components (front wing, floor, power unit, DRS/active aero, suspension) with plain-language + technical explanations

## 7. Decisions locked in

| # | Decision | Answer |
|---|---|---|
| A | Naming approach | Use "F1" / mock the real official site's styling directly (not an invented brand) |
| B | Relationship to F1 | Blend of unofficial fan platform / "official-looking" fictional experience / independent educational product — not locked to one framing |
| C | Data source | Both — seed with a static dataset for development, wire to live data for production |
| D | 3D depth | Full interactive 3D car with exploded, hoverable components |
| E | Audio | Ambient only for now; architecture should allow adding engine/UI sound later without rework |
| F | Content depth | Focused primary experience, but "Wikipedia-level depth" reachable via progressive disclosure — an Apple-launch-style surface with real depth underneath |

## 8. Open decision — branding/legal (deferred)

You chose "not sure yet" on whether this stays a personal/portfolio project or eventually goes public. Flagging so it doesn't get lost: "F1," team names/logos/liveries, and driver photography are trademarked/licensed. Building it under literal F1 branding is low-risk as a private/portfolio/localhost project; it becomes a real legal question the moment it's publicly deployed under that name with real traffic. **Revisit before any public launch** — likely resolution is either a licensing conversation or a rebrand pass (the design system underneath doesn't need to change, only the wordmark/logo/copy referencing "F1" directly).

## 9. Data architecture

Recommended approach: a data layer that's source-agnostic, so swapping seed data for live data later doesn't touch components.

```
F1 DATA LAYER
├── seasons        (2026 + historical)
├── teams          (11 constructors, liveries, HQ, history)
├── drivers        (22 drivers, bios, career stats, socials)
├── circuits       (24 tracks, geometry, records)
├── races          (calendar, sessions, results)
├── championships  (standings, historical champions)
└── records        (all-time stats)
        ↓
   normalized local cache (build-time + revalidated)
        ↓
   components (never call raw APIs directly)
```

**Live/historical data sources (free, no paid contract needed):**
- **Jolpica-F1** (`api.jolpi.ca/ergast/f1`) — free, no auth, Ergast-compatible drop-in, full historical results/standings/qualifying 1950–present including 2026
- **OpenF1** — free, no auth, real-time session data (positions, laps, stints, team radio, weather) for 2023+ — useful for the Race Center / live-weekend features
- **F1DB** — static full historical dataset (JSON/CSV/SQL dump) — good for seeding, offline dev, and anything needing bulk historical queries without hammering an API

None of these provide licensed photography — imagery stays a separate sourcing decision (§5).

## 10. Technical architecture (recommended)

Based on the tooling already installed in your Claude Code environment (21st.dev component library, Google Stitch, Motion, `ui-ux-pro-max-skill`):

- **Framework:** Next.js (React) — server-rendered for data-heavy pages (drivers/teams/circuits), fast client transitions for the cinematic navigation
- **Styling/components:** Tailwind + shadcn/ui as the base, 21st.dev for sourcing/generating polished one-off components fast
- **Animation:** Motion (Framer Motion successor) for UI/page-transition choreography; GSAP + ScrollTrigger for the scroll-driven storytelling sections (Beginner's Lab, History timeline) — the two are complementary, not redundant
- **3D:** Three.js via React Three Fiber + drei for the exploded car viewer
- **Design:** Google Stitch for layout/visual exploration before component build-out
- **Data:** typed data layer (§9) with a thin fetch/cache wrapper around Jolpica-F1 + OpenF1, seeded from F1DB for local dev

This isn't final — flag if you want a different framework or animation stack before it goes into the Claude Code build prompt.

## 11. Not yet decided

- Final name/wordmark (pending §8)
- Exact page-by-page component spec
- Image sourcing plan (licensed vs. original renders)
- Hosting/deployment target
- Whether Race Center ships in v1 or later

---

*Next step: once §8 and §11 are settled, this becomes the actual build brief handed to Claude Code — broken into IA → design system → data layer → page-by-page implementation, in that order, rather than one large prompt.*
