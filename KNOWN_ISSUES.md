# Known Issues

Tracked but not yet investigated. Revisit before any public launch.

## `notFound()` returns HTTP 200 instead of 404 on static/ISR driver routes

**Where:** `/drivers/[slug]` (uses `generateStaticParams` + `export const revalidate = 86400`).

**What happens:** requesting a slug that isn't one of the 22 real drivers (e.g.
`/drivers/not-a-real-driver`) correctly renders the App Router not-found UI
("This page could not be found") — the `notFound()` call in
`src/app/drivers/[slug]/page.tsx` is firing as intended. But the HTTP status
code on that response is `200 OK`, not `404`. Response headers show
`x-nextjs-cache: HIT`, suggesting Next is caching the not-found render as if
it were a valid static hit rather than tagging it with the correct status.

**Discovered:** 2026-08-12, while verifying static generation of driver
profile pages (`next start`, production mode). Not caused by that change as
far as we know — surfaced by it, not introduced by it — but unconfirmed.

**Why it matters:** search engines / crawlers / monitoring that check status
codes rather than page content will treat bad driver URLs as valid pages.
Low severity pre-launch (no public traffic yet), but should be fixed before
going live — a wrong-but-200 response is worse than a correct 404 once
there's real traffic or SEO exposure.

**Likely cause (unconfirmed):** interaction between Next.js's ISR caching
and `notFound()` on a dynamic route that also has `generateStaticParams` —
plausibly a Next.js/Turbopack-level quirk rather than app code, but this
hasn't been verified against a minimal repro or Next's issue tracker.

**Next step when picked up:** minimal repro (a throwaway dynamic route with
just `generateStaticParams` + `notFound()`, no other data dependencies) to
confirm whether this is app-code or framework-level before filing/searching
upstream issues.
