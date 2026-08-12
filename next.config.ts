import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Default 60s isn't enough for /history: its build-time champions fan-out
  // (1950-present, rate-limit-constrained — see HISTORY_FETCH_CONCURRENCY in
  // lib/data/sources/jolpica.ts) takes ~90-120s. Same "front-load the cost at
  // build/revalidation time" tradeoff as the driver profile pages, just
  // bigger, so it needs more runway than Next's default.
  staticPageGenerationTimeout: 180,
  // Next's own dev-mode indicator badge (bottom-left "N" pill) — framework
  // chrome, not app UI, and it doesn't ship in production, but it visually
  // clips at the viewport edge during dev preview. Off for a clean preview.
  devIndicators: false,
};

export default nextConfig;
