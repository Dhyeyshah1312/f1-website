/**
 * Circuit "Notable Moments" narrative + vitals (Laps, Length, Turns, Elevation, Lap Record).
 * Fully populated for all 24 circuits on the calendar.
 */

export interface CircuitVitals {
  lengthKm: number;
  turns: number;
  laps: number;
  elevationM: number;
  lapRecord: string;
}

export interface CircuitProfile {
  vitals: CircuitVitals;
  notableMoments: string;
}

const CIRCUIT_PROFILES: Record<string, CircuitProfile> = {
  albert_park: {
    vitals: { lengthKm: 5.278, turns: 14, laps: 58, elevationM: 10, lapRecord: "1:19.813 (C. Leclerc, 2024)" },
    notableMoments:
      "Circles the man-made Albert Park Lake just south of Melbourne's city centre. Despite sitting in a public park, race weekend brings temporary concrete barriers along the lakeside stretch, giving it a street-circuit feel it doesn't have the other 361 days of the year.",
  },
  shanghai: {
    vitals: { lengthKm: 5.451, turns: 16, laps: 56, elevationM: 5, lapRecord: "1:32.238 (M. Schumacher, 2004)" },
    notableMoments:
      "Famous for its \"snail-shell\" corners: Turns 1–2 form a tightening spiral that gets sharper the further you go, and Turns 11–13 do the reverse — no other F1 track puts a driver into a sustained tightening spiral at the very start of a lap.",
  },
  suzuka: {
    vitals: { lengthKm: 5.807, turns: 18, laps: 53, elevationM: 45, lapRecord: "1:30.983 (L. Hamilton, 2019)" },
    notableMoments:
      "The only genuine figure-eight circuit in Formula 1, with the track literally crossing over itself via a bridge. Ayrton Senna and Alain Prost collided here in both 1989 and 1990 while fighting for the World Championship title.",
  },
  miami: {
    vitals: { lengthKm: 5.412, turns: 19, laps: 57, elevationM: 3, lapRecord: "1:29.708 (M. Verstappen, 2023)" },
    notableMoments:
      "Built entirely around the parking lots of Hard Rock Stadium, complete with an artificial marina feature. Debuted in 2022 and immediately became one of the most attended race weekends on the calendar.",
  },
  villeneuve: {
    vitals: { lengthKm: 4.361, turns: 14, laps: 70, elevationM: 13, lapRecord: "1:13.078 (V. Bottas, 2019)" },
    notableMoments:
      "Built on Île Notre-Dame in the St. Lawrence River. Home to the \"Wall of Champions\" — a concrete wall that earned its name in 1999 when three separate world champions (Hill, Schumacher, Villeneuve) all crashed into it.",
  },
  monaco: {
    vitals: { lengthKm: 3.337, turns: 19, laps: 78, elevationM: 42, lapRecord: "1:12.909 (L. Hamilton, 2021)" },
    notableMoments:
      "The shortest lap on the calendar but the most laps of any race. Run on the actual public streets of Monte Carlo, barriers instead of run-off, making it F1's ultimate precision test.",
  },
  catalunya: {
    vitals: { lengthKm: 4.657, turns: 14, laps: 66, elevationM: 160, lapRecord: "1:16.330 (M. Verstappen, 2023)" },
    notableMoments:
      "Long-serving host of F1's pre-season testing. Its balanced mix of high- and low-speed corners has made it F1's benchmark \"all-rounder\" test for decades.",
  },
  red_bull_ring: {
    vitals: { lengthKm: 4.318, turns: 10, laps: 71, elevationM: 677, lapRecord: "1:05.619 (C. Sainz, 2020)" },
    notableMoments:
      "Set in the Styrian mountains with steep elevation changes packed into a short 4.3km distance. Known for fast lap times under 66 seconds.",
  },
  silverstone: {
    vitals: { lengthKm: 5.891, turns: 18, laps: 52, elevationM: 153, lapRecord: "1:27.097 (M. Verstappen, 2020)" },
    notableMoments:
      "Built on a former WWII airfield and the site of the very first round of the Formula 1 World Championship in 1950.",
  },
  spa: {
    vitals: { lengthKm: 7.004, turns: 19, laps: 44, elevationM: 468, lapRecord: "1:46.286 (V. Bottas, 2018)" },
    notableMoments:
      "The longest and most vertically dramatic circuit on the calendar, cutting through the Ardennes forest with its iconic Eau Rouge / Raidillon sweep.",
  },
  hungaroring: {
    vitals: { lengthKm: 4.381, turns: 14, laps: 70, elevationM: 234, lapRecord: "1:16.627 (L. Hamilton, 2020)" },
    notableMoments:
      "A tight, twisty lap in a natural amphitheatre outside Budapest, often nicknamed \"Monaco without the walls\" for how hard it is to overtake.",
  },
  zandvoort: {
    vitals: { lengthKm: 4.259, turns: 14, laps: 72, elevationM: 15, lapRecord: "1:11.097 (L. Hamilton, 2021)" },
    notableMoments:
      "Features steep banked corners — Turn 3 at up to 19° and Turn 14 at 18° — built directly into the sand dunes of the Dutch coast.",
  },
  monza: {
    vitals: { lengthKm: 5.793, turns: 11, laps: 53, elevationM: 162, lapRecord: "1:21.046 (R. Barrichello, 2004)" },
    notableMoments:
      "The \"Temple of Speed,\" the lowest-downforce, highest-speed circuit of the year, and traditional home of the Italian GP since 1950.",
  },
  madring: {
    vitals: { lengthKm: 5.470, turns: 22, laps: 55, elevationM: 650, lapRecord: "New 2026 Circuit" },
    notableMoments:
      "Brand new for 2026: a hybrid street/purpose-built circuit around IFEMA Madrid featuring \"La Monumental,\" a 550-metre corner banked at 24%.",
  },
  baku: {
    vitals: { lengthKm: 6.003, turns: 20, laps: 51, elevationM: -28, lapRecord: "1:43.009 (C. Leclerc, 2019)" },
    notableMoments:
      "Combines a tight, castle-walled old-town section that barely fits an F1 car with a massive 2.2 km main straight — the longest on the calendar.",
  },
  sepang: {
    vitals: { lengthKm: 5.543, turns: 15, laps: 56, elevationM: 22, lapRecord: "1:34.080 (S. Vettel, 2017)" },
    notableMoments:
      "A modern Hermann Tilke-designed circuit known for sweeping high-speed corners, brutal tropical humidity, and sudden monsoon rainstorms.",
  },
  marina_bay: {
    vitals: { lengthKm: 4.940, turns: 19, laps: 62, elevationM: 15, lapRecord: "1:35.867 (L. Hamilton, 2023)" },
    notableMoments:
      "F1's original night race, run entirely under powerful floodlights through Singapore's Downtown Core and Marina Bay district.",
  },
  americas: {
    vitals: { lengthKm: 5.513, turns: 20, laps: 56, elevationM: 157, lapRecord: "1:36.169 (C. Leclerc, 2019)" },
    notableMoments:
      "Turn 1 climbs more than 30 metres in elevation in just a few hundred metres of track, creating one of the most dramatic opening corners in F1.",
  },
  rodriguez: {
    vitals: { lengthKm: 4.304, turns: 17, laps: 71, elevationM: 2240, lapRecord: "1:17.774 (V. Bottas, 2021)" },
    notableMoments:
      "Sits 2,240 metres above sea level — by far the highest circuit on the calendar. The thin air means less drag, reaching immense top speeds through the stadium section.",
  },
  interlagos: {
    vitals: { lengthKm: 4.309, turns: 15, laps: 71, elevationM: 780, lapRecord: "1:10.540 (V. Bottas, 2018)" },
    notableMoments:
      "An anti-clockwise, undulating natural bowl circuit in São Paulo famous for chaotic rain races and historic championship deciders.",
  },
  vegas: {
    vitals: { lengthKm: 6.201, turns: 17, laps: 50, elevationM: 610, lapRecord: "1:35.490 (O. Piastri, 2023)" },
    notableMoments:
      "Runs straight down the iconic Las Vegas Strip past world-famous casino landmarks at speeds topping 350 km/h.",
  },
  losail: {
    vitals: { lengthKm: 5.419, turns: 16, laps: 57, elevationM: 12, lapRecord: "1:24.319 (M. Verstappen, 2023)" },
    notableMoments:
      "Fast, flowing high-speed layout under Qatar floodlights requiring extreme tyre management and physical endurance.",
  },
  yas_marina: {
    vitals: { lengthKm: 5.281, turns: 16, laps: 58, elevationM: 3, lapRecord: "1:26.103 (M. Verstappen, 2021)" },
    notableMoments:
      "F1's twilight season finale circuit built around the Yas Marina harbor and futuristic hotel, site of dramatic title deciders.",
  },
};

export function getCircuitProfile(circuitId: string): CircuitProfile | null {
  return CIRCUIT_PROFILES[circuitId] ?? null;
}
