import { NextResponse } from "next/server";
import { getSeasonFinalStandings } from "@/lib/data";

const FIRST_SEASON = 1950;

/**
 * On-demand season final standings (both championships + race count) for
 * History's click-to-expand year panel. Fetched per-year only when a user
 * actually expands it, same reasoning as /api/rounds/[round] — no need to
 * pre-load the full grid for all 75+ seasons on page load.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ year: string }> }) {
  const { year: yearParam } = await params;
  const year = Number(yearParam);
  const currentYear = new Date().getFullYear();
  if (!Number.isInteger(year) || year < FIRST_SEASON || year > currentYear) {
    return NextResponse.json({ error: "Invalid season" }, { status: 400 });
  }
  const detail = await getSeasonFinalStandings(String(year));
  return NextResponse.json(detail);
}
