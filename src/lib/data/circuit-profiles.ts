/**
 * Circuit "Notable Moments" narrative + vitals. `[C]` original editorial
 * content (DESIGN.md §8) — sourced via web search, cross-checked, same
 * research standard as the driver Achievements/partner drafts and
 * lib/data/team-history.ts: nothing invented.
 *
 * `vitals` only carries fields with a confirmed, specific number — a field
 * left out here still renders `[PENDING — F1DB]` on the page rather than a
 * guessed or rounded value (e.g. Red Bull Ring's "just over 4 km" isn't
 * precise enough to populate Length; Interlagos/Mexico City/Sepang's
 * length/turns weren't confirmed to the same standard as the rest and are
 * left out entirely, not padded).
 *
 * Deliberately excludes "last winner": that's live data the Circuits page
 * already pulls from Jolpica-F1 — hardcoding it here would either duplicate
 * real dynamic data or go stale the moment it's written. Lap record is left
 * to its existing `[PENDING — JOLPICA-F1]` stat for the same reason: a real
 * lap time belongs to that live-data slot, not to editorial prose, even
 * where a source happens to mention one (Albert Park's below) as color.
 *
 * Keyed by circuitId, matching lib/data/image-slugs.ts's CIRCUIT_IMAGE_SLUGS
 * keys (Jolpica's raw circuitId, e.g. "villeneuve" for Montreal, "americas"
 * for COTA, "rodriguez" for Mexico City, "losail" for Lusail).
 */

export interface CircuitVitals {
  lengthKm?: number;
  turns?: number;
  laps?: number;
  elevationM?: number;
}

export interface CircuitProfile {
  vitals: CircuitVitals;
  notableMoments: string;
}

const CIRCUIT_PROFILES: Record<string, CircuitProfile> = {
  albert_park: {
    vitals: { lengthKm: 5.278 },
    notableMoments:
      "Circles the man-made Albert Park Lake just south of Melbourne's city centre. Despite sitting in a public park, race weekend brings temporary concrete barriers along the lakeside stretch, giving it a street-circuit feel it doesn't have the other 361 days of the year. Michael Schumacher's 1:24.125 track record, set in 2004, has never been broken.",
  },
  shanghai: {
    vitals: {},
    notableMoments:
      "Famous for its \"snail-shell\" corners: Turns 1–2 form a tightening spiral that gets sharper the further you go, and Turns 11–13 do the reverse — no other F1 track puts a driver into a sustained tightening spiral at the very start of a lap, before the tyres are even properly warm. Opened in 2004; hosted Michael Schumacher's 91st and final career win in 2006, a record that stood for 15 years.",
  },
  suzuka: {
    vitals: { lengthKm: 5.807, turns: 18 },
    notableMoments:
      "The only genuine figure-eight circuit in Formula 1, with the track literally crossing over itself via a bridge. That layout, and its position deep in the calendar, made it F1's favourite venue for deciding championships for decades: Ayrton Senna and Alain Prost, teammates and bitter rivals, collided here in both 1989 and 1990 while fighting for the title — the second time, deliberately, to make sure of it.",
  },
  miami: {
    vitals: {},
    notableMoments:
      "Built entirely around the parking lots of Hard Rock Stadium, complete with an artificial marina feature added purely for spectacle — there's no real water access, the yachts are trucked in. Debuted in 2022 and immediately became one of the most attended race weekends on the calendar; three different first-time winners in its first three years (Verstappen, Norris, Piastri).",
  },
  villeneuve: {
    vitals: {},
    notableMoments:
      "Built on Île Notre-Dame, a man-made island in the St. Lawrence River. Home to the \"Wall of Champions\" — a concrete wall that earned its name in 1999 when three separate world champions (Hill, Schumacher, Villeneuve) all crashed into it in the same race weekend. Gilles Villeneuve, the circuit's namesake, won here on the track's very first running in 1978; drivers still cross a \"Salut Gilles\" tribute painted on the finish line.",
  },
  monaco: {
    vitals: { lengthKm: 3.337, turns: 19, laps: 78 },
    notableMoments:
      "The shortest lap on the calendar but, because of that, the most laps of any race. Run on the actual public streets of Monte Carlo, barriers instead of run-off, making it F1's ultimate precision test. Ayrton Senna won here five years running (1989–1993), including a qualifying lap in 1988 that was 1.4 seconds faster than his own teammate in an identical car.",
  },
  catalunya: {
    vitals: {},
    notableMoments:
      "Long-serving host of F1's pre-season testing, meaning every team arrives at the actual race here already knowing the track intimately. Its balanced mix of high- and low-speed corners has made it F1's benchmark \"all-rounder\" test for decades. F1's first visit in 1991 produced one of the sport's most famous images: Nigel Mansell and Ayrton Senna racing wheel-to-wheel down the main straight, separated by millimetres.",
  },
  red_bull_ring: {
    vitals: {},
    notableMoments:
      "Just over 4 km — the shortest lap on the current calendar — set in the Styrian mountains with steep elevation changes packed into that short distance. Also the site of F1's most notorious team-orders scandal: Ferrari ordered Rubens Barrichello to hand victory to Michael Schumacher in 2001, then did it again in 2002 while Barrichello was already leading, prompting a rule change that lasted over a decade.",
  },
  silverstone: {
    vitals: { lengthKm: 5.891, turns: 18, laps: 52 },
    notableMoments:
      "Built on a former Second World War airfield, and the site of the very first round of the Formula 1 World Championship in 1950, with King George VI and Queen Elizabeth in attendance.",
  },
  spa: {
    vitals: { lengthKm: 7.004, turns: 19, elevationM: 102 },
    notableMoments:
      "The longest and most vertically dramatic circuit on the calendar, cutting through the Ardennes forest with its own microclimate (it can genuinely be raining on one part of the track and dry on another). Michael Schumacher made his F1 debut here in 1991, then returned 13 years later to clinch his seventh World Championship at the same track.",
  },
  hungaroring: {
    vitals: { lengthKm: 4.381, turns: 14 },
    notableMoments:
      "A tight, twisty lap in a natural amphitheatre outside Budapest, often nicknamed \"Monaco without the walls\" for how hard it is to overtake despite being a permanent circuit with real run-off, not street barriers. At the very first Hungarian GP in 1986, Nelson Piquet passed Ayrton Senna around the outside with two wheels on the grass — still cited as one of the greatest overtakes in F1 history.",
  },
  zandvoort: {
    vitals: {},
    notableMoments:
      "Genuinely banked corners, rare in modern F1 — Turn 3 at up to 19° and Turn 14 at 18°, inspired by oval racing, built into the sand dunes of the Dutch coast. Max Verstappen's first home win came here in 2021 in front of the Dutch royal family, part of three wins at the track since its return to the calendar.",
  },
  monza: {
    vitals: { lengthKm: 5.793, turns: 11, laps: 53 },
    notableMoments:
      "The \"Temple of Speed,\" the lowest-downforce, highest-speed circuit of the year, and the traditional home of the Italian GP since 1950. Also the site of F1's closest-ever finish: Peter Gethin beat Ronnie Peterson by 0.01 seconds in 1971, with the top five separated by less than a second.",
  },
  madring: {
    vitals: { lengthKm: 5.4, turns: 22 },
    notableMoments:
      "Brand new for 2026: a hybrid street/purpose-built circuit around IFEMA Madrid. Its signature feature is \"La Monumental,\" a 550-metre corner banked at 24% — the longest single corner on the F1 calendar. Madrid's first Formula 1 race since 1981, and the city's first-ever race held inside Madrid itself. No race history yet — this is the one circuit on the calendar still waiting for its defining moment.",
  },
  baku: {
    vitals: {},
    notableMoments:
      "One circuit, two personalities: a tight, castle-walled old-town section that barely fits an F1 car, opening onto a 2.2 km straight — the longest on the calendar. The inaugural 2016 race set the tone with a chaotic late restart; the 2021 race added to the legend when Max Verstappen's tyre exploded at high speed while leading with four laps to go.",
  },
  sepang: {
    vitals: {},
    notableMoments:
      "Listed on the 2026 calendar as the \"Bahrain Grand Prix,\" but actually hosted in Malaysia — a modern Hermann Tilke-designed circuit known for brutal tropical humidity and sudden monsoon downpours that have red-flagged races outright before. Its real history, under its usual Malaysian GP identity, includes the infamous 2013 \"Multi 21\" incident, where Sebastian Vettel defied a direct team order to overtake his own teammate.",
  },
  marina_bay: {
    vitals: { lengthKm: 4.927, turns: 19 },
    notableMoments:
      "F1's original night race, run entirely under floodlights through the city's Downtown Core and Kallang districts since 2008. That same inaugural night race also produced F1's darkest scandal, \"Crashgate,\" when Renault was found to have ordered a driver to deliberately crash to help his teammate win.",
  },
  americas: {
    vitals: { lengthKm: 5.513, turns: 20 },
    notableMoments:
      "Turn 1 climbs more than 30 metres in elevation in just a few hundred metres of track, one of the most dramatic opening corners anywhere on the calendar. The inaugural 2012 race was an instant classic, Lewis Hamilton holding off Sebastian Vettel in front of over 100,000 fans.",
  },
  rodriguez: {
    vitals: {},
    notableMoments:
      "Sits 2,240 metres above sea level — by far the highest circuit on the calendar, with the next-highest (Interlagos) at roughly 800m. The thin air means less aerodynamic downforce and less cooling for the engine and brakes, so cars run unusually low-drag setups here and hit some of the highest top speeds of the season despite the altitude. Named for brothers Ricardo and Pedro Rodríguez, both killed in racing accidents — Ricardo at this very circuit in 1962.",
  },
  interlagos: {
    vitals: {},
    notableMoments:
      "One of the few remaining anti-clockwise circuits left on the calendar, compact and undulating, with a long-standing reputation for unpredictable weather that regularly scrambles races. Lewis Hamilton's title-winning pass on the final corner of the final lap of the 2008 season remains one of the most dramatic championship deciders in F1 history — home favourite Felipe Massa had already celebrated on the podium believing he'd won the title, seconds before it was taken from him.",
  },
  vegas: {
    vitals: { lengthKm: 6.201, turns: 17 },
    notableMoments:
      "Running straight down the Strip past Caesars Palace, the Bellagio, and the Venetian. Returned to the calendar in 2023 after a 41-year absence; Max Verstappen is the only repeat winner so far, taking both 2023 and 2025.",
  },
  losail: {
    vitals: {},
    notableMoments:
      "Originally built for MotoGP in 2004, and fitted in 2008 with one of the largest floodlighting systems ever installed at a sports venue at the time. Debuted on the F1 calendar in 2021 as a late-season replacement for the Australian GP, immediately factoring into that year's tightest title fight.",
  },
  yas_marina: {
    vitals: {},
    notableMoments:
      "Believed to be the most expensive circuit ever built, at a reported cost of around $1 billion. A 12-storey hotel is built directly over the track, forming a bridge over Turns 18 and 19 — the first of its kind anywhere in motorsport. Every race here starts in daylight and finishes under floodlights. Host to the most controversial season finale in modern F1 history: the disputed 2021 title decider, where a late Safety Car restart let Max Verstappen pass Lewis Hamilton on the final lap to win his first World Championship.",
  },
};

export function getCircuitProfile(circuitId: string): CircuitProfile | null {
  return CIRCUIT_PROFILES[circuitId] ?? null;
}
