import { getActiveLiveSession, getNextRace } from "@/lib/data";
import { NavBar } from "@/components/f1/nav-bar";

/** Server wrapper — fetches nav-level data, hands resolved Maybe<T> values to the client NavBar. */
export async function Nav() {
  const [nextRace, liveSession] = await Promise.all([getNextRace(), getActiveLiveSession()]);
  return <NavBar nextRace={nextRace} liveSession={liveSession} />;
}
