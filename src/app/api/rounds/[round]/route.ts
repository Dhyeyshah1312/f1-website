import { NextResponse } from "next/server";
import { getRoundDetail } from "@/lib/data";

/**
 * On-demand round detail (podium/pole/fastest lap) for the Season calendar
 * strip's click-to-expand panel. Fetched per-round only when a user actually
 * expands it, rather than pre-loading every past round on page load.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ round: string }> }) {
  const { round: roundParam } = await params;
  const round = Number(roundParam);
  if (!Number.isInteger(round) || round < 1) {
    return NextResponse.json({ error: "Invalid round" }, { status: 400 });
  }
  const detail = await getRoundDetail(round);
  return NextResponse.json(detail);
}
