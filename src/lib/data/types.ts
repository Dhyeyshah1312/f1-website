/**
 * Upstream data sources, per PRD §9 and DESIGN.md's `[J]`/`[O]`/`[F]`/`[C]` source
 * keys. EDITORIAL covers `[C]` content that's meant to be hand-written (bios,
 * achievement blurbs, social handles) rather than fetched — it's Pending
 * because nobody has written it yet, not because a request failed.
 */
export type DataSource = "JOLPICA-F1" | "OPENF1" | "F1DB" | "EDITORIAL";

/**
 * A value that hasn't been wired to real data yet. Fetchers return this instead
 * of a fabricated number/name — components render it via <PendingToken />, never
 * substitute a plausible-looking placeholder value in its place.
 */
export interface Pending {
  readonly pending: true;
  readonly source: DataSource;
}

export function pending(source: DataSource): Pending {
  return { pending: true, source };
}

export function isPending<T>(value: T | Pending): value is Pending {
  return (
    typeof value === "object" &&
    value !== null &&
    "pending" in value &&
    (value as Pending).pending === true
  );
}

/** A value that is either resolved data of type T, or still Pending. */
export type Maybe<T> = T | Pending;

// ---------------------------------------------------------------------------
// Domain types — normalized shape components consume. Source-specific JSON
// (Ergast/Jolpica, OpenF1, F1DB) is mapped into these inside lib/data/sources/*
// and never leaks past lib/data/index.ts.
// ---------------------------------------------------------------------------

export interface Circuit {
  id: string;
  name: string;
  locality: string;
  country: string;
  lat: number;
  long: number;
}

export interface RaceSession {
  date: string; // ISO date, e.g. "2026-08-23"
  time: string | null; // ISO time, e.g. "13:00:00Z"
}

export interface RaceSummary {
  season: string;
  round: number;
  raceName: string;
  circuit: Circuit;
  race: RaceSession;
  firstPractice: RaceSession | null;
  qualifying: RaceSession | null;
  sprint: RaceSession | null;
  sprintQualifying: RaceSession | null;
}

export interface DriverStanding {
  position: number;
  points: number;
  wins: number;
  driverId: string;
  driverCode: string | null;
  permanentNumber: string | null;
  givenName: string;
  familyName: string;
  nationality: string;
  constructorId: string;
  constructorName: string;
}

export interface ConstructorStanding {
  position: number;
  points: number;
  wins: number;
  constructorId: string;
  constructorName: string;
  nationality: string;
}

export interface SeasonStandings {
  season: string;
  round: number;
  drivers: DriverStanding[];
  constructors: ConstructorStanding[];
}

export interface LiveSession {
  sessionKey: number;
  sessionType: string; // "Practice", "Qualifying", "Sprint", "Race", ...
  sessionName: string;
  countryName: string;
  location: string;
  dateStart: string; // ISO datetime
  dateEnd: string; // ISO datetime
}

export interface PodiumEntry {
  position: number;
  driverId: string;
  driverCode: string | null;
  givenName: string;
  familyName: string;
  constructorId: string;
  constructorName: string;
}

/** One round's winner, as returned by the season-wide "every round's P1" query. */
export interface RoundWinner extends PodiumEntry {
  round: number;
}

/**
 * Full detail for one round, fetched on demand (not part of the initial
 * calendar load) when a past round is expanded. Each field is independently
 * Maybe<T> — e.g. pole can be Pending while podium and fastestLap resolved,
 * if only the qualifying endpoint failed.
 */
export interface RoundDetail {
  round: number;
  podium: Maybe<PodiumEntry[]>;
  fastestLap: Maybe<PodiumEntry | null>;
  pole: Maybe<PodiumEntry | null>;
}

export interface DriverBio {
  driverId: string;
  permanentNumber: string | null;
  code: string | null;
  givenName: string;
  familyName: string;
  dateOfBirth: string; // ISO date
  nationality: string;
}

/** One season of a driver's career — used for both the timeline and career aggregates. */
export interface DriverSeasonRecord {
  season: string;
  position: number;
  points: number;
  wins: number;
  constructorIds: string[];
  constructorNames: string[];
}

export interface DriverCareerStats {
  wins: number;
  podiums: number;
  poles: number;
  championships: number;
  points: number;
  /** Ascending by season — debut is timeline[0], most recent is the last entry. */
  timeline: DriverSeasonRecord[];
}

export interface ConstructorDriverResult {
  driverId: string;
  driverCode: string | null;
  familyName: string;
  position: number;
  points: number;
  status: string; // "Finished", "+1 Lap", "Retired", "Accident", ...
}

/** One round's results for both of a team's cars, current season. */
export interface ConstructorRoundResult {
  round: number;
  raceName: string;
  date: string;
  results: ConstructorDriverResult[];
}

/** One season's winner at a given circuit — Circuits page history list. */
export interface CircuitWinner {
  season: string;
  driverId: string;
  driverCode: string | null;
  givenName: string;
  familyName: string;
  constructorName: string;
}

/**
 * One season's Drivers'/Constructors' champions — History timeline scrubber.
 * constructorChampion resolves to `null` (not Pending) for 1950-1957: the
 * Constructors' Championship genuinely didn't exist yet, a historical fact,
 * not a gap in the data.
 */
export interface SeasonChampions {
  season: string;
  driverChampion: Maybe<PodiumEntry>;
  constructorChampion: Maybe<{ constructorId: string; constructorName: string } | null>;
}

/** One season's final standings + race count — History's click-to-expand detail panel. */
export interface SeasonFinalStandings {
  season: string;
  round: Maybe<number>;
  driverStandings: Maybe<DriverStanding[]>;
  constructorStandings: Maybe<ConstructorStanding[]>;
}
