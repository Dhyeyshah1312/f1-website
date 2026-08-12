import "server-only";
import { pending } from "@/lib/data/types";
import type {
  CircuitWinner,
  ConstructorRoundResult,
  ConstructorStanding,
  DriverBio,
  DriverCareerStats,
  DriverStanding,
  LiveSession,
  Maybe,
  RaceSummary,
  RoundDetail,
  RoundWinner,
  SeasonChampions,
  SeasonFinalStandings,
} from "@/lib/data/types";
import * as jolpica from "@/lib/data/sources/jolpica";
import * as openf1 from "@/lib/data/sources/openf1";

/**
 * The ONLY module the app's components should import F1 data from — per
 * PRD §9, components never call lib/data/sources/* or raw fetch() directly.
 * Every function here returns Maybe<T>: real data on success, or Pending
 * (never a fabricated value) when the upstream source is unavailable.
 */

export type { Maybe, Pending, DataSource } from "@/lib/data/types";
export type {
  Circuit,
  RaceSummary,
  DriverStanding,
  ConstructorStanding,
  SeasonStandings,
  LiveSession,
  PodiumEntry,
  RoundWinner,
  RoundDetail,
  DriverBio,
  DriverSeasonRecord,
  DriverCareerStats,
  ConstructorDriverResult,
  ConstructorRoundResult,
  CircuitWinner,
  SeasonChampions,
  SeasonFinalStandings,
} from "@/lib/data/types";
export { isPending } from "@/lib/data/types";

export async function getNextRace(): Promise<Maybe<RaceSummary>> {
  const race = await jolpica.fetchNextRace();
  return race ?? pending("JOLPICA-F1");
}

export async function getSeasonSchedule(): Promise<Maybe<RaceSummary[]>> {
  const schedule = await jolpica.fetchSeasonSchedule();
  return schedule ?? pending("JOLPICA-F1");
}

export async function getDriverStandings(): Promise<Maybe<DriverStanding[]>> {
  const standings = await jolpica.fetchDriverStandings();
  return standings ?? pending("JOLPICA-F1");
}

export async function getConstructorStandings(): Promise<Maybe<ConstructorStanding[]>> {
  const standings = await jolpica.fetchConstructorStandings();
  return standings ?? pending("JOLPICA-F1");
}

/**
 * A timestamp for "when was standings data last refreshed." Ergast/Jolpica
 * doesn't expose a modified-at field, so this is the time of a successful
 * fetch — Pending (not a guessed date) if the fetch itself failed.
 */
export async function getStandingsLastUpdated(): Promise<Maybe<Date>> {
  const standings = await jolpica.fetchDriverStandings();
  return standings ? new Date() : pending("JOLPICA-F1");
}

/**
 * The currently in-progress session, if any. Distinct from Pending:
 * - Pending  = OpenF1 was unreachable, liveness is unknown
 * - null     = OpenF1 answered; no session is live right now
 * - LiveSession = OpenF1 answered; this session is live right now
 */
export async function getActiveLiveSession(): Promise<Maybe<LiveSession | null>> {
  const session = await openf1.fetchLatestSession();
  if (!session) return pending("OPENF1");
  return openf1.isSessionLive(session) ? session : null;
}

/** Every completed round's winner this season, keyed by round number. */
export async function getSeasonWinners(): Promise<Maybe<Map<number, RoundWinner>>> {
  const winners = await jolpica.fetchSeasonWinners();
  if (!winners) return pending("JOLPICA-F1");
  return new Map(winners.map((w) => [w.round, w]));
}

/**
 * Full detail for one round — podium, fastest lap, pole — fetched on demand
 * (via /api/rounds/[round]) rather than pre-fetched for every past round.
 * Each field resolves independently so a single failed endpoint doesn't
 * blank out the whole panel.
 */
export async function getRoundDetail(round: number): Promise<RoundDetail> {
  const [results, pole] = await Promise.all([
    jolpica.fetchRoundResults(round),
    jolpica.fetchRoundPole(round),
  ]);
  return {
    round,
    podium: results ? results.podium : pending("JOLPICA-F1"),
    fastestLap: results ? results.fastestLap : pending("JOLPICA-F1"),
    pole: pole ? pole : pending("JOLPICA-F1"),
  };
}

/** A driver's bio (name, DOB, nationality, number) — independent of season. */
export async function getDriverBio(driverId: string): Promise<Maybe<DriverBio>> {
  const bio = await jolpica.fetchDriverBio(driverId);
  return bio ?? pending("JOLPICA-F1");
}

/** Career-wide aggregates and season-by-season timeline for a driver. */
export async function getDriverCareerStats(driverId: string): Promise<Maybe<DriverCareerStats>> {
  const stats = await jolpica.fetchDriverCareerStats(driverId);
  return stats ?? pending("JOLPICA-F1");
}

/** Every round's results for both of a team's cars this season — the race-by-race strip. */
export async function getConstructorSeasonResults(
  constructorId: string,
): Promise<Maybe<ConstructorRoundResult[]>> {
  const results = await jolpica.fetchConstructorSeasonResults(constructorId);
  return results ?? pending("JOLPICA-F1");
}

/** Every season's winner at a circuit, all-time. */
export async function getCircuitWinners(circuitId: string): Promise<Maybe<CircuitWinner[]>> {
  const winners = await jolpica.fetchCircuitWinners(circuitId);
  return winners ?? pending("JOLPICA-F1");
}

const FIRST_SEASON = 1950;

/** Every season 1950-present, oldest first — the History timeline's year axis. */
export function getHistorySeasons(): string[] {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - FIRST_SEASON + 1 }, (_, i) => String(FIRST_SEASON + i));
}

/**
 * Every season's Drivers'/Constructors' champions, 1950-present, for the
 * History timeline. Always returns one entry per season (the timeline axis
 * is continuous) — a season whose fetch failed still appears, with Pending
 * fields, rather than leaving a gap.
 */
export async function getSeasonHistory(): Promise<SeasonChampions[]> {
  const seasons = getHistorySeasons();
  const raw = await jolpica.fetchAllSeasonChampions(seasons);
  return raw.map((r) => ({
    season: r.season,
    driverChampion: r.driverChampion ?? pending("JOLPICA-F1"),
    constructorChampion: r.constructorChampion.resolved
      ? r.constructorChampion.champion
      : pending("JOLPICA-F1"),
  }));
}

/** One season's full final standings + race count, fetched on demand when a History year is expanded. */
export async function getSeasonFinalStandings(season: string): Promise<SeasonFinalStandings> {
  const result = await jolpica.fetchSeasonFinalStandings(season);
  return {
    season,
    round: result.round ?? pending("JOLPICA-F1"),
    driverStandings: result.driverStandings ?? pending("JOLPICA-F1"),
    constructorStandings: result.constructorStandings ?? pending("JOLPICA-F1"),
  };
}
