import "server-only";
import type {
  Circuit,
  CircuitWinner,
  ConstructorDriverResult,
  ConstructorRoundResult,
  ConstructorStanding,
  DriverBio,
  DriverCareerStats,
  DriverSeasonRecord,
  DriverStanding,
  PodiumEntry,
  RaceSession,
  RaceSummary,
  RoundWinner,
} from "@/lib/data/types";

/** Raw per-season fan-out result for History — Maybe-wrapping happens in lib/data/index.ts. */
export interface SeasonChampionsRaw {
  season: string;
  /** null = the position-1 fetch failed. */
  driverChampion: PodiumEntry | null;
  constructorChampion: {
    /** false = the fetch failed; true = it succeeded (champion may still be legitimately null pre-1958). */
    resolved: boolean;
    champion: { constructorId: string; constructorName: string } | null;
  };
}

export interface SeasonFinalStandingsRaw {
  round: number | null;
  driverStandings: DriverStanding[] | null;
  constructorStandings: ConstructorStanding[] | null;
}

/**
 * Jolpica-F1 (api.jolpi.ca/ergast/f1) — free, no-auth, Ergast-compatible.
 * This is the ONLY file that knows the Ergast JSON shape; everything else in
 * the app consumes the normalized domain types from lib/data/types.ts.
 */
const BASE_URL = "https://api.jolpi.ca/ergast/f1";

// Revalidate windows are conservative for now — the Season/Race Center pages
// can tighten these per-endpoint once they're being built.
const REVALIDATE_SCHEDULE_SECONDS = 3600;
const REVALIDATE_STANDINGS_SECONDS = 300;
// Past-round results/qualifying never change once final — safe to cache long.
const REVALIDATE_RESULTS_SECONDS = 6 * 3600;
// Completed-season standings never change — same cache window as career stats.
const REVALIDATE_HISTORY_SECONDS = 24 * 3600;

interface ErgastSession {
  date: string;
  time?: string;
}

interface ErgastCircuit {
  circuitId: string;
  circuitName: string;
  Location: {
    lat: string;
    long: string;
    locality: string;
    country: string;
  };
}

interface ErgastRace {
  season: string;
  round: string;
  raceName: string;
  Circuit: ErgastCircuit;
  date: string;
  time?: string;
  FirstPractice?: ErgastSession;
  Qualifying?: ErgastSession;
  Sprint?: ErgastSession;
  SprintQualifying?: ErgastSession;
}

interface ErgastRaceTableResponse {
  MRData: {
    RaceTable: {
      season: string;
      Races: ErgastRace[];
    };
  };
}

interface ErgastDriver {
  driverId: string;
  permanentNumber?: string;
  code?: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

interface ErgastDriverStandingEntry {
  position: string;
  points: string;
  wins: string;
  Driver: ErgastDriver;
  Constructors: { constructorId: string; name: string }[];
}

interface ErgastConstructorStandingEntry {
  position: string;
  points: string;
  wins: string;
  Constructor: {
    constructorId: string;
    name: string;
    nationality: string;
  };
}

interface ErgastStandingsTableResponse<Entry> {
  MRData: {
    StandingsTable: {
      season: string;
      round: string;
      StandingsLists: { round: string; DriverStandings?: Entry[]; ConstructorStandings?: Entry[] }[];
    };
  };
}

async function getJson<T>(path: string, revalidateSeconds: number): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      next: { revalidate: revalidateSeconds },
    });
    if (!res.ok) {
      console.error(`[Jolpica-F1 HTTP ${res.status}] Failed path: ${path} - ${res.statusText}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`[Jolpica-F1 Network Error] Failed path: ${path}`, err);
    return null;
  }
}

const RATE_LIMIT_RETRY_ATTEMPTS = 5;
const RATE_LIMIT_RETRY_BASE_DELAY_MS = 500;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getJsonWithRetry<T>(path: string, revalidateSeconds: number): Promise<T | null> {
  for (let attempt = 0; attempt < RATE_LIMIT_RETRY_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(`${BASE_URL}${path}`, {
        next: { revalidate: revalidateSeconds },
      });
      if (res.status === 429) {
        console.warn(`[Jolpica-F1 Rate Limit 429] Retrying path: ${path} (attempt ${attempt + 1}/${RATE_LIMIT_RETRY_ATTEMPTS})`);
        if (attempt < RATE_LIMIT_RETRY_ATTEMPTS - 1) {
          await delay(RATE_LIMIT_RETRY_BASE_DELAY_MS * 2 ** attempt);
          continue;
        }
        console.error(`[Jolpica-F1 Rate Limit 429 Exceeded] Path failed after ${RATE_LIMIT_RETRY_ATTEMPTS} attempts: ${path}`);
        return null;
      }
      if (!res.ok) {
        console.error(`[Jolpica-F1 HTTP ${res.status}] Path: ${path} - ${res.statusText}`);
        return null;
      }
      return (await res.json()) as T;
    } catch (err) {
      console.error(`[Jolpica-F1 Network Error] Path: ${path}`, err);
      return null;
    }
  }
  return null;
}

function toSession(session: ErgastSession | undefined): RaceSession | null {
  if (!session) return null;
  return { date: session.date, time: session.time ?? null };
}

function toCircuit(circuit: ErgastCircuit): Circuit {
  return {
    id: circuit.circuitId,
    name: circuit.circuitName,
    locality: circuit.Location.locality,
    country: circuit.Location.country,
    lat: Number(circuit.Location.lat),
    long: Number(circuit.Location.long),
  };
}

function toRaceSummary(race: ErgastRace): RaceSummary {
  return {
    season: race.season,
    round: Number(race.round),
    raceName: race.raceName,
    circuit: toCircuit(race.Circuit),
    race: { date: race.date, time: race.time ?? null },
    firstPractice: toSession(race.FirstPractice),
    qualifying: toSession(race.Qualifying),
    sprint: toSession(race.Sprint),
    sprintQualifying: toSession(race.SprintQualifying),
  };
}

/** The next scheduled race on the current calendar, or null if unavailable. */
export async function fetchNextRace(): Promise<RaceSummary | null> {
  const data = await getJson<ErgastRaceTableResponse>(
    "/current/next.json",
    REVALIDATE_SCHEDULE_SECONDS,
  );
  const race = data?.MRData.RaceTable.Races[0];
  return race ? toRaceSummary(race) : null;
}

/** The full current-season race calendar, or null if unavailable. */
export async function fetchSeasonSchedule(): Promise<RaceSummary[] | null> {
  const data = await getJson<ErgastRaceTableResponse>(
    "/current.json?limit=40",
    REVALIDATE_SCHEDULE_SECONDS,
  );
  return data?.MRData.RaceTable.Races.map(toRaceSummary) ?? null;
}

function toDriverStanding(entry: ErgastDriverStandingEntry): DriverStanding {
  return {
    position: Number(entry.position),
    points: Number(entry.points),
    wins: Number(entry.wins),
    driverId: entry.Driver.driverId,
    driverCode: entry.Driver.code ?? null,
    permanentNumber: entry.Driver.permanentNumber ?? null,
    givenName: entry.Driver.givenName,
    familyName: entry.Driver.familyName,
    nationality: entry.Driver.nationality,
    constructorId: entry.Constructors[0]?.constructorId ?? "",
    constructorName: entry.Constructors[0]?.name ?? "",
  };
}

function toConstructorStanding(entry: ErgastConstructorStandingEntry): ConstructorStanding {
  return {
    position: Number(entry.position),
    points: Number(entry.points),
    wins: Number(entry.wins),
    constructorId: entry.Constructor.constructorId,
    constructorName: entry.Constructor.name,
    nationality: entry.Constructor.nationality,
  };
}

function driverStandingToPodiumEntry(entry: ErgastDriverStandingEntry): PodiumEntry {
  return {
    position: Number(entry.position),
    driverId: entry.Driver.driverId,
    driverCode: entry.Driver.code ?? null,
    givenName: entry.Driver.givenName,
    familyName: entry.Driver.familyName,
    constructorId: entry.Constructors[0]?.constructorId ?? "",
    constructorName: entry.Constructors[0]?.name ?? "",
  };
}

/** Current-season drivers' championship standings, or null if unavailable. */
export async function fetchDriverStandings(): Promise<DriverStanding[] | null> {
  const data = await getJson<ErgastStandingsTableResponse<ErgastDriverStandingEntry>>(
    "/current/driverStandings.json",
    REVALIDATE_STANDINGS_SECONDS,
  );
  const entries = data?.MRData.StandingsTable.StandingsLists[0]?.DriverStandings;
  if (!entries) return null;
  return entries.map(toDriverStanding);
}

/** Current-season constructors' championship standings, or null if unavailable. */
export async function fetchConstructorStandings(): Promise<ConstructorStanding[] | null> {
  const data = await getJson<ErgastStandingsTableResponse<ErgastConstructorStandingEntry>>(
    "/current/constructorStandings.json",
    REVALIDATE_STANDINGS_SECONDS,
  );
  const entries = data?.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings;
  if (!entries) return null;
  return entries.map(toConstructorStanding);
}

interface ErgastResultDriver {
  driverId: string;
  code?: string;
  givenName: string;
  familyName: string;
}

interface ErgastResultConstructor {
  constructorId: string;
  name: string;
}

interface ErgastResultEntry {
  position: string;
  points?: string;
  status?: string;
  Driver: ErgastResultDriver;
  Constructor: ErgastResultConstructor;
  FastestLap?: { rank: string };
}

interface ErgastRaceWithResults extends ErgastRace {
  Results: ErgastResultEntry[];
}

interface ErgastResultsResponse {
  MRData: {
    RaceTable: {
      season: string;
      Races: ErgastRaceWithResults[];
    };
  };
}

interface ErgastQualifyingEntry {
  position: string;
  Driver: ErgastResultDriver;
  Constructor: ErgastResultConstructor;
}

interface ErgastRaceWithQualifying extends ErgastRace {
  QualifyingResults: ErgastQualifyingEntry[];
}

interface ErgastQualifyingResponse {
  MRData: {
    RaceTable: {
      season: string;
      Races: ErgastRaceWithQualifying[];
    };
  };
}

function toPodiumEntry(entry: ErgastResultEntry | ErgastQualifyingEntry): PodiumEntry {
  return {
    position: Number(entry.position),
    driverId: entry.Driver.driverId,
    driverCode: entry.Driver.code ?? null,
    givenName: entry.Driver.givenName,
    familyName: entry.Driver.familyName,
    constructorId: entry.Constructor.constructorId,
    constructorName: entry.Constructor.name,
  };
}

/**
 * Every completed round's winner this season, in one request (Ergast's
 * finish-position filter: /current/results/1.json). Powers the calendar
 * strip's compact per-round summary without a fetch per round.
 */
export async function fetchSeasonWinners(): Promise<RoundWinner[] | null> {
  const data = await getJson<ErgastResultsResponse>(
    "/current/results/1.json?limit=40",
    REVALIDATE_RESULTS_SECONDS,
  );
  if (!data) return null;
  return data.MRData.RaceTable.Races.filter((race) => race.Results.length > 0).map((race) => ({
    round: Number(race.round),
    ...toPodiumEntry(race.Results[0]),
  }));
}

/** Top-3 podium and the fastest-lap holder for one round, or null if unavailable. */
export async function fetchRoundResults(
  round: number,
): Promise<{ podium: PodiumEntry[]; fastestLap: PodiumEntry | null } | null> {
  const data = await getJson<ErgastResultsResponse>(
    `/current/${round}/results.json?limit=30`,
    REVALIDATE_RESULTS_SECONDS,
  );
  const results = data?.MRData.RaceTable.Races[0]?.Results;
  if (!results) return null;
  const podium = results
    .filter((entry) => Number(entry.position) <= 3)
    .sort((a, b) => Number(a.position) - Number(b.position))
    .map(toPodiumEntry);
  const fastestLapEntry = results.find((entry) => entry.FastestLap?.rank === "1");
  return { podium, fastestLap: fastestLapEntry ? toPodiumEntry(fastestLapEntry) : null };
}

/** Pole position for one round, or null if unavailable. */
export async function fetchRoundPole(round: number): Promise<PodiumEntry | null> {
  const data = await getJson<ErgastQualifyingResponse>(
    `/current/${round}/qualifying.json?limit=30`,
    REVALIDATE_RESULTS_SECONDS,
  );
  const pole = data?.MRData.RaceTable.Races[0]?.QualifyingResults.find(
    (entry) => Number(entry.position) === 1,
  );
  return pole ? toPodiumEntry(pole) : null;
}

// ---------------------------------------------------------------------------
// Driver profile — bio + career aggregates. Career stats never change once a
// season is final, so those are cached long; bio essentially never changes.
// ---------------------------------------------------------------------------

const REVALIDATE_CAREER_SECONDS = 24 * 3600;

interface ErgastDriverTableResponse {
  MRData: {
    DriverTable: { Drivers: ErgastDriver[] };
  };
}

interface ErgastSeasonTableResponse {
  MRData: {
    SeasonTable: { Seasons: { season: string }[] };
  };
}

interface ErgastTotalOnlyResponse {
  MRData: { total: string };
}

function toDriverBio(driver: ErgastDriver): DriverBio {
  return {
    driverId: driver.driverId,
    permanentNumber: driver.permanentNumber ?? null,
    code: driver.code ?? null,
    givenName: driver.givenName,
    familyName: driver.familyName,
    dateOfBirth: driver.dateOfBirth,
    nationality: driver.nationality,
  };
}

/** A driver's bio (name, DOB, nationality, number) — independent of season. */
export async function fetchDriverBio(driverId: string): Promise<DriverBio | null> {
  const data = await getJson<ErgastDriverTableResponse>(
    `/drivers/${driverId}.json`,
    REVALIDATE_CAREER_SECONDS,
  );
  const driver = data?.MRData.DriverTable.Drivers[0];
  return driver ? toDriverBio(driver) : null;
}

/** Every season a driver has raced in, e.g. ["2019", "2020", ...]. */
async function fetchDriverSeasons(driverId: string): Promise<string[] | null> {
  const data = await getJson<ErgastSeasonTableResponse>(
    `/drivers/${driverId}/seasons.json?limit=40`,
    REVALIDATE_CAREER_SECONDS,
  );
  return data?.MRData.SeasonTable.Seasons.map((s) => s.season) ?? null;
}

/** One season's final standing for a driver — Jolpica requires the year in the path. */
async function fetchDriverSeasonStanding(
  driverId: string,
  season: string,
): Promise<DriverSeasonRecord | null> {
  const data = await getJson<ErgastStandingsTableResponse<ErgastDriverStandingEntry>>(
    `/${season}/drivers/${driverId}/driverStandings.json`,
    REVALIDATE_CAREER_SECONDS,
  );
  const entry = data?.MRData.StandingsTable.StandingsLists[0]?.DriverStandings?.[0];
  if (!entry) return null;
  return {
    season,
    position: Number(entry.position),
    points: Number(entry.points),
    wins: Number(entry.wins),
    constructorIds: entry.Constructors.map((c) => c.constructorId),
    constructorNames: entry.Constructors.map((c) => c.name),
  };
}

/** How many times a driver has finished a race in exactly `position` (1 = wins). */
async function fetchDriverResultCountAtPosition(
  driverId: string,
  position: 1 | 2 | 3,
): Promise<number | null> {
  const data = await getJson<ErgastTotalOnlyResponse>(
    `/drivers/${driverId}/results/${position}.json?limit=1`,
    REVALIDATE_CAREER_SECONDS,
  );
  return data ? Number(data.MRData.total) : null;
}

/** How many pole positions (qualifying P1) a driver has taken, career-wide. */
async function fetchDriverPoleCount(driverId: string): Promise<number | null> {
  const data = await getJson<ErgastTotalOnlyResponse>(
    `/drivers/${driverId}/qualifying/1.json?limit=1`,
    REVALIDATE_CAREER_SECONDS,
  );
  return data ? Number(data.MRData.total) : null;
}

interface ErgastAllDriverStandingsResponse {
  MRData: {
    StandingsTable: {
      driverId?: string;
      StandingsLists?: {
        season: string;
        round: string;
        DriverStandings?: ErgastDriverStandingEntry[];
      }[];
    };
  };
}

/**
 * Career aggregates for a driver: wins/podiums/poles/championships/points and
 * a season-by-season timeline. Fetches career standings in a single request
 * with rate-limit retries to prevent build-time concurrency rate limits.
 */
export async function fetchDriverCareerStats(driverId: string): Promise<DriverCareerStats | null> {
  const [allStandingsData, wins, podiumPositions, poles] = await Promise.all([
    getJsonWithRetry<ErgastAllDriverStandingsResponse>(
      `/drivers/${driverId}/driverStandings.json?limit=100`,
      REVALIDATE_CAREER_SECONDS,
    ),
    fetchDriverResultCountAtPosition(driverId, 1),
    Promise.all(([1, 2, 3] as const).map((pos) => fetchDriverResultCountAtPosition(driverId, pos))),
    fetchDriverPoleCount(driverId),
  ]);

  if (!allStandingsData) {
    console.error(`[Jolpica-F1] Career standings fetch returned null for driver: ${driverId}`);
    return null;
  }

  const standingsLists = allStandingsData.MRData.StandingsTable.StandingsLists ?? [];
  const timeline: DriverSeasonRecord[] = standingsLists
    .map((list) => {
      const entry = list.DriverStandings?.[0];
      if (!entry) return null;
      return {
        season: list.season,
        position: Number(entry.position),
        points: Number(entry.points),
        wins: Number(entry.wins),
        constructorIds: entry.Constructors.map((c) => c.constructorId),
        constructorNames: entry.Constructors.map((c) => c.name),
      };
    })
    .filter((r): r is DriverSeasonRecord => r !== null);

  const podiums = podiumPositions.every((n) => n !== null)
    ? podiumPositions.reduce((sum, n) => sum + (n ?? 0), 0)
    : null;

  return {
    wins: wins ?? timeline.reduce((sum, r) => sum + r.wins, 0),
    podiums: podiums ?? 0,
    poles: poles ?? 0,
    championships: timeline.filter((r) => r.position === 1).length,
    points: timeline.reduce((sum, r) => sum + r.points, 0),
    timeline: timeline.sort((a, b) => Number(a.season) - Number(b.season)),
  };
}

// ---------------------------------------------------------------------------
// Team profile — current-season race-by-race results, both cars, one request.
// ---------------------------------------------------------------------------

/** Every round's results for both of a team's cars this season, in one request. */
export async function fetchConstructorSeasonResults(
  constructorId: string,
): Promise<ConstructorRoundResult[] | null> {
  const jolpicaId = constructorId === "sauber" ? "kick_sauber" : constructorId;
  const data = await getJson<ErgastResultsResponse>(
    `/current/constructors/${jolpicaId}/results.json?limit=100`,
    REVALIDATE_RESULTS_SECONDS,
  );
  if (!data) return null;
  return data.MRData.RaceTable.Races.map((race) => ({
    round: Number(race.round),
    raceName: race.raceName,
    date: race.date,
    results: race.Results.map(
      (entry): ConstructorDriverResult => ({
        driverId: entry.Driver.driverId,
        driverCode: entry.Driver.code ?? null,
        familyName: entry.Driver.familyName,
        position: Number(entry.position),
        points: Number(entry.points ?? "0"),
        status: entry.status ?? "Unknown",
      }),
    ),
  }));
}

// ---------------------------------------------------------------------------
// Circuits — historical winners (cheap, one request). Lap record is
// deliberately NOT computed here: Jolpica's circuit-scoped results endpoint
// only returns the WINNER of each historical race, but the winner isn't
// necessarily who set the fastest lap. Getting a genuine lap record would
// mean fetching full results for every historical race at that circuit —
// 70+ requests for older tracks like Monaco — which isn't reasonable load
// to put on a free community API. Left Pending rather than approximated
// from winner-only data, which would risk showing a wrong "record."
// ---------------------------------------------------------------------------

/** Every season's winner at a circuit, all-time. */
export async function fetchCircuitWinners(circuitId: string): Promise<CircuitWinner[] | null> {
  const data = await getJson<ErgastResultsResponse>(
    `/circuits/${circuitId}/results/1.json?limit=100`,
    REVALIDATE_CAREER_SECONDS,
  );
  if (!data) return null;
  return data.MRData.RaceTable.Races.filter((race) => race.Results.length > 0).map((race) => {
    const winner = race.Results[0];
    return {
      season: race.season,
      driverId: winner.Driver.driverId,
      driverCode: winner.Driver.code ?? null,
      givenName: winner.Driver.givenName,
      familyName: winner.Driver.familyName,
      constructorName: winner.Constructor.name,
    };
  });
}

// ---------------------------------------------------------------------------
// History — every season's champions (1950-present) for the timeline
// scrubber, plus on-demand full final standings for the click-to-expand
// season detail panel.
// ---------------------------------------------------------------------------

// The Constructors' Championship wasn't introduced until 1958 — a settled
// historical fact, not something to query for. Years before it get a
// resolved `null` constructor champion instead of a wasted request.
const CONSTRUCTORS_CHAMPIONSHIP_START_YEAR = 1958;

// See getJson's rate-limit note above — this caps in-flight requests on top
// of getJson's own retry/backoff, since an unbounded Promise.all across
// 150+ requests (this fan-out's actual size) would overwhelm the retry
// budget too. 3 concurrent + getJson's backoff settled around ~85% success
// for the full 1950-present range in testing.
const HISTORY_FETCH_CONCURRENCY = 3;

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

/** One season's Drivers' champion (position 1 only — a much lighter payload than the full grid). */
async function fetchSeasonDriverChampion(season: string): Promise<PodiumEntry | null> {
  const data = await getJsonWithRetry<ErgastStandingsTableResponse<ErgastDriverStandingEntry>>(
    `/${season}/driverStandings/1.json`,
    REVALIDATE_HISTORY_SECONDS,
  );
  const entry = data?.MRData.StandingsTable.StandingsLists[0]?.DriverStandings?.[0];
  return entry ? driverStandingToPodiumEntry(entry) : null;
}

/** One season's Constructors' champion (position 1 only), distinguishing "not held yet" from a failed fetch. */
async function fetchSeasonConstructorChampion(season: string): Promise<{
  resolved: boolean;
  champion: { constructorId: string; constructorName: string } | null;
}> {
  if (Number(season) < CONSTRUCTORS_CHAMPIONSHIP_START_YEAR) {
    return { resolved: true, champion: null };
  }
  const data = await getJsonWithRetry<ErgastStandingsTableResponse<ErgastConstructorStandingEntry>>(
    `/${season}/constructorStandings/1.json`,
    REVALIDATE_HISTORY_SECONDS,
  );
  if (!data) return { resolved: false, champion: null };
  const entry = data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings?.[0];
  return {
    resolved: true,
    champion: entry
      ? { constructorId: entry.Constructor.constructorId, constructorName: entry.Constructor.name }
      : null,
  };
}

/** Every season's champions across the given years — the History timeline's data source. */
export async function fetchAllSeasonChampions(seasons: string[]): Promise<SeasonChampionsRaw[]> {
  return mapWithConcurrency(seasons, HISTORY_FETCH_CONCURRENCY, async (season) => {
    const [driverChampion, constructorChampion] = await Promise.all([
      fetchSeasonDriverChampion(season),
      fetchSeasonConstructorChampion(season),
    ]);
    return { season, driverChampion, constructorChampion };
  });
}

/** Full final standings + race count for one season, fetched on demand when a year is expanded. */
async function fetchSeasonDriverStandings(
  season: string,
): Promise<{ round: number; standings: DriverStanding[] } | null> {
  const data = await getJsonWithRetry<ErgastStandingsTableResponse<ErgastDriverStandingEntry>>(
    `/${season}/driverStandings.json`,
    REVALIDATE_HISTORY_SECONDS,
  );
  const list = data?.MRData.StandingsTable.StandingsLists[0];
  if (!list?.DriverStandings) return null;
  return { round: Number(list.round), standings: list.DriverStandings.map(toDriverStanding) };
}

async function fetchSeasonConstructorStandingsFull(season: string): Promise<ConstructorStanding[] | null> {
  // Resolved-empty, not a failed fetch — see CONSTRUCTORS_CHAMPIONSHIP_START_YEAR above.
  if (Number(season) < CONSTRUCTORS_CHAMPIONSHIP_START_YEAR) return [];
  const data = await getJsonWithRetry<ErgastStandingsTableResponse<ErgastConstructorStandingEntry>>(
    `/${season}/constructorStandings.json`,
    REVALIDATE_HISTORY_SECONDS,
  );
  const entries = data?.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings;
  if (!entries) return null;
  return entries.map(toConstructorStanding);
}

/** One season's full final standings (both championships) + race count, for the detail panel. */
export async function fetchSeasonFinalStandings(season: string): Promise<SeasonFinalStandingsRaw> {
  const [driverResult, constructorStandings] = await Promise.all([
    fetchSeasonDriverStandings(season),
    fetchSeasonConstructorStandingsFull(season),
  ]);
  return {
    round: driverResult?.round ?? null,
    driverStandings: driverResult?.standings ?? null,
    constructorStandings,
  };
}
