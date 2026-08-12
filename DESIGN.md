# Design System: F1 — Beginner's Guide

## 1. Visual Theme & Atmosphere

**Density:** 6/10 — swings by page, not fixed. Discover and driver-profile heroes read "art gallery airy" (2–3): oversized type, full-viewport panels, deep negative space. Season, Drivers grid, and Technology telemetry panels read "cockpit dense" (8–9): tight data tables, monospace stat blocks, instrument-panel information density. Never settle in the middle — a page is either an editorial statement or an instrument panel, not a diluted mix of both.

**Variance:** 7/10 — confident asymmetry. Paddock grid (11 uneven team columns), section-teaser stacks, split hero layouts. No symmetric 3-up card rows anywhere in the system.

**Motion:** 8/10 — cinematic choreography. The interface is the experience, not a decorated container for content. Motion has two distinct registers (see §6) and they are never substituted for each other.

**The mood:** a carbon-fiber instrument panel lit by hard directional light, next to a full-bleed editorial spread from a car magazine shot on a soundstage. Precision engineering and oversized typography-as-graphic-object, sharing one system. Materials read as physical — carbon weave, brushed titanium, rubber, asphalt, glass — never as decorative gradients standing in for materials.

**Explicitly not:** cyberpunk, neon, glassmorphism (frosted-blur cards as the default surface language), the "black background + purple/blue glow + floating glass card" AI-generic look. Glass appears only where real glass would appear — visor reflections, screen glare in imagery — never as a UI chrome effect.

---

## 2. Color Palette & Roles

- **Off-Black Carbon** (#0B0C0D) — primary background. Never pure `#000000`. Reads as carbon-fiber weave, not void.
- **Graphite Panel** (#17191B) — elevated surface fill: cards, panels, nav takeover background.
- **Asphalt Gray** (#2A2D30) — secondary surface, hairline borders, border-top dividers replacing cards in dense tables.
- **Brushed Steel** (#8A8F94) — secondary text, metadata, inactive icons, resting-state borders.
- **Titanium White** (#F4F5F6) — primary text on dark, oversized numerals, high-contrast headlines.
- **Circuit Red** (#D6303C) — the single accent. Saturation held under 80% deliberately — reads as an instrument-panel warning/live color, not a neon glow. Used for: primary CTA fill, live-session indicators, active nav state, focus rings, championship-leader accent. Nothing else gets a second accent color — team livery colors (data-driven, from `[F]`/`[J]`) are the only sanctioned exception, scoped strictly to that team's own components (driver cards, team hero, standings row accent).

No warm/cool gray drift — every neutral above sits on one temperature (cool-neutral zinc base). No secondary accent hue anywhere in global chrome.

---

## 3. Typography Rules

- **Display:** `Big Shoulders` (extra-bold, condensed, weights 800–900) — track-tight (-2%), oversized editorial scale. Used for hero wordmark, page titles, driver-number-as-background-numeral treatment. Hierarchy comes from weight/color/scale contrast, not just "bigger." (Google consolidated the formerly-separate "Big Shoulders Display" cut into this one variable family — same condensed display face, current name.)
- **Body / UI:** `Hanken Grotesk` (technical grotesk) — relaxed leading (1.5), max 65ch line length, all navigation/labels/copy.
- **Mono / Telemetry:** `JetBrains Mono` — lap times, gaps, countdowns, stat values, coordinates, table numerals. Any numeric value that changes (live gap, points, countdown) is always set in mono.
- **High-density override:** on Season, Drivers grid, and Technology panels (density ≥7), ALL numbers render in mono, no exceptions.
- **Banned:** `Inter`, any generic system-ui stack for display use, any serif anywhere (Times New Roman, Georgia, Garamond, Fraunces — none fit the instrument-panel/aerospace direction; this system is sans + mono only, full stop).

---

## 4. Component Stylings

- **Buttons:** Flat rectangles, 2px corner radius (machined, not soft). Resting state: 1px Brushed Steel hairline border, transparent fill. Primary: Circuit Red fill with a single 1px lighter-red top-edge highlight, simulating hard directional light catching a machined edge. Active/press state: -1px translateY + shadow compression (tactile, not springy-bouncy). No outer glow, ever. No custom cursors.
- **Cards / Panels:** Machined-edge rectangles, 4–8px radius maximum — never the soft "generously rounded" consumer-app default. Graphite Panel fill, 1px Asphalt Gray hairline border, tight hard-edged directional drop-shadow (like track lighting), never a diffuse ambient glow. In high-density contexts (standings table, stat blocks, calendar strip) replace cards entirely with border-top dividers and negative space — cards are reserved for places where elevation genuinely communicates hierarchy (driver profile hero, team profile hero, lesson cards in Beginner's Lab).
- **Inputs / Filters:** Label above, small-caps uppercase in Hanken Grotesk. Numeric/filter values in mono. Focus ring: 1px Circuit Red. Error text below in Circuit Red, no icon clutter.
- **Loading states:** The telemetry-line motif (a horizontal scan-line, acceleration/deceleration eased, left-to-right) is the PRIMARY loading pattern site-wide — reused from the homepage intro, per product spec. This overrides generic skeletal loaders for page/section transitions. Skeletal shimmer (Asphalt Gray base, exact layout match) is reserved for inline data refresh only — e.g., standings table re-fetching after a live session update — where a full telemetry-line reveal would be disruptive. No circular spinners anywhere.
- **Empty / Error states:** Composed, not text-only. E.g., "no live session" renders a dimmed, static circuit outline rather than a caption.
- **Data Placeholder (unwired live/historical values):** Exact token format: `[PENDING — SOURCE]` in full caps, e.g. `[PENDING — JOLPICA-F1]`, `[PENDING — OPENF1]`, `[PENDING — F1DB]`. The brackets and the word PENDING are part of the rendered string, not just an authoring note — never strip them for a "cleaner" mock. Rendered exclusively in Brushed Steel, in mono (JetBrains Mono), and WITHOUT the live-pulse micro-loop reserved for genuine `[O]` data (§7) — this token must be visually distinguishable from a real stat even at a glance, by color and by the absence of the live-pulse treatment, not by the text alone. Titanium White and Circuit Red are reserved for real data; a placeholder rendered in either of those is a violation regardless of what the text says.

---

## 5. Layout Principles

- Asymmetric editorial grid throughout — no symmetric 3-equal-card feature rows anywhere in the system.
- Oversized numerals (driver numbers, lap counts, year markers) used as graphic objects, not just data — sized to be a layout anchor, not a stat.
- Heroes are split-screen or left-aligned, never centered (variance is 7, well above the centered-hero threshold).
- Teams page uses the 11-column paddock grid (uneven, expands on hover/focus) — not a card grid.
- Discover homepage uses full-viewport stacked section-teaser panels, not a grid.
- CSS Grid over Flexbox math; never `calc()` percentage hacks.
- 1400px max-width containment on text-heavy pages (Drivers profile body copy, History season detail); full-bleed on 3D viewer, world map, and hero panels.
- `min-h-[100dvh]` for every full-height section — never `h-screen`.

---

## 6. Responsive Rules

- Mobile-first collapse below 768px: every multi-column layout (paddock grid, standings two-column, teaser stack) becomes single-column. No exceptions.
- No accidental horizontal scroll. The calendar strip and History timeline are the only intentionally horizontal-scrolling elements — both get explicit scroll-snap and a visible drag/scroll affordance, never silent overflow.
- Headlines scale via `clamp()`; body text never drops below 1rem/14px.
- All interactive elements: 44px minimum touch target.
- The 3D car viewer (Technology) gets a simplified static-render fallback below tablet width — full R3F scene is desktop-first per product spec's own perf note.
- Inline hero imagery (if used) stacks below headline text on mobile, never overlapping.

---

## 7. Motion & Interaction Philosophy

Two distinct registers — never substituted for each other:

1. **UI micro-interactions** (buttons, toggles, cards, filters, hover states): spring physics, `stiffness: 100, damping: 20`. Tactile and weighty, not bouncy.
2. **Narrative / scroll-driven choreography** (Discover intro sequence, History timeline travel, Beginner's Lab module transitions, page-to-page route transitions): velocity-based easing that mimics real acceleration/deceleration (custom cubic-bezier, ease-out-quint family) — driven by scroll position, not springs. This is a deliberate distinction: springs feel like UI responding to a click; the acceleration curves feel like a camera or a car moving, which is the register the product spec calls for at the narrative layer.

Additional rules:
- Track-line reveals use SVG `stroke-dashoffset` draw-in (circuit outlines, timeline paths) — never a generic fade.
- Route transitions are directional wipes framed as camera moves, never a cross-fade.
- Lists never mount instantly — staggered cascade delays for waterfall reveals (driver grid, calendar strip, standings rows).
- Perpetual micro-loops are earned, not decorative: the nav's live countdown chip ticks in mono; a "LIVE" pulse indicator appears ONLY during an actual active race weekend (`[O]` data present) — never an always-on decorative pulse.
- Animate exclusively via `transform` and `opacity`. Never animate `top`/`left`/`width`/`height`.

---

## 8. Anti-Patterns (Banned)

- No cyberpunk, no neon, no glassmorphism as the default/primary surface language (real-glass reflections in imagery only).
- No "black background + purple/blue glow + floating glass card" AI-generic look, in any form.
- No outer glow / neon shadows on any component, ever.
- No pure black (`#000000`) — Off-Black Carbon only.
- No soft consumer-app corner radii (>8px) on structural panels/cards.
- No centered, symmetric hero sections.
- No symmetric 3-equal-card feature rows.
- No `Inter`, no generic system-ui display font, no serif anywhere in the system.
- No emojis anywhere in UI copy or code comments.
- No custom mouse cursors.
- No fabricated data, statistics, or metrics of any kind — no invented lap times, points totals, uptime numbers, "X drivers analyzed," or similar filler. Every number on screen must trace to `[J]` Jolpica-F1, `[O]` OpenF1, `[F]` F1DB, or explicit `[C]` original editorial content written by a person. This applies to every named entity paired with a number, too — a real driver name (e.g. "Verstappen") next to an invented points total is still fabrication; a plausible-sounding number doesn't become acceptable because the name attached to it is real. Where real data isn't wired yet, use the Data Placeholder token defined in §4 — never a plausible-looking fake number, and never a real name paired with an invented value.
- No decorative "LABEL // YEAR" filler formatting (e.g. invented "SYSTEM // 2024" chrome). This does NOT ban genuine telemetry-style live data labels ("LAP 42/58", "P1 VER +0.312") — those are real data in the project's native visual language, not decoration, and are core to the identity.
- No fake "SYSTEM PERFORMANCE METRICS" / "BY THE NUMBERS" dashboard blocks filled with invented figures.
- No AI copywriting clichés ("Elevate", "Seamless", "Unleash", "Next-Gen", "Revolutionize").
- No filler scroll prompts — "Scroll to explore," bouncing chevrons, swipe-down icons. The content pulls the user in; no on-screen apology for requiring a scroll.
- No broken image links — real driver/team/circuit photography is licensed (sourcing decision pending, see PRD §5/§8); use clean placeholder blocks or `picsum.photos`/SVG stand-ins until sourcing is resolved, never a broken `<img>`.
- No generic placeholder names ("John Doe," "Acme Corp") — use real, publicly documented driver/team/circuit names per the seeded dataset, or explicit `[placeholder]` brackets if the real value isn't available yet.
