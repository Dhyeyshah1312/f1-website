import "server-only";
import type { LiveSession } from "@/lib/data/types";

/**
 * OpenF1 (api.openf1.org) — free, no-auth, real-time session data. Used for
 * the "is a race weekend live right now" signal (nav LIVE pulse, Season page
 * live banner, Race Center). Historical data stays with Jolpica-F1/F1DB.
 */
const BASE_URL = "https://api.openf1.org/v1";

// Short revalidate window — this is the one signal that's genuinely time-sensitive.
const REVALIDATE_SESSION_SECONDS = 60;

interface OpenF1Session {
  session_key: number;
  session_type: string;
  session_name: string;
  country_name: string;
  location: string;
  date_start: string;
  date_end: string;
}

async function getJson<T>(path: string, revalidateSeconds: number): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      next: { revalidate: revalidateSeconds },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function toLiveSession(session: OpenF1Session): LiveSession {
  return {
    sessionKey: session.session_key,
    sessionType: session.session_type,
    sessionName: session.session_name,
    countryName: session.country_name,
    location: session.location,
    dateStart: session.date_start,
    dateEnd: session.date_end,
  };
}

/** The most recent session on record (may be in the past, present, or — rarely — future). */
export async function fetchLatestSession(): Promise<LiveSession | null> {
  const data = await getJson<OpenF1Session[]>(
    "/sessions?session_key=latest",
    REVALIDATE_SESSION_SECONDS,
  );
  const session = data?.[0];
  return session ? toLiveSession(session) : null;
}

/** True if `session` is currently in progress (now is between its start and end). */
export function isSessionLive(session: LiveSession, now: Date = new Date()): boolean {
  const start = new Date(session.dateStart).getTime();
  const end = new Date(session.dateEnd).getTime();
  const t = now.getTime();
  return t >= start && t <= end;
}
