/**
 * Driver "Notable Records" and "Career Highlights" editorial content.
 * Curated and verified for all 22 drivers on the grid.
 */

export interface DriverAchievements {
  notableRecords: string;
  careerHighlights: string;
}

const DRIVER_ACHIEVEMENTS: Record<string, DriverAchievements> = {
  max_verstappen: {
    notableRecords: "Most wins in a single season (19 in 2023), most consecutive GP wins (10 in 2023), youngest driver to start an F1 race (17 yrs, 166 days).",
    careerHighlights: "4x Formula 1 World Champion (2021, 2022, 2023, 2024), 60+ Grand Prix victories, 100+ podium finishes.",
  },
  hamilton: {
    notableRecords: "Most all-time World Championship titles (7, tied with Schumacher), most career wins (105), most pole positions (104), most podium finishes (201).",
    careerHighlights: "7x Formula 1 World Champion (2008, 2014, 2015, 2017, 2018, 2019, 2020), iconic dominant eras with McLaren and Mercedes.",
  },
  leclerc: {
    notableRecords: "First Monegasque driver to win the Monaco Grand Prix (2024), 26+ career pole positions.",
    careerHighlights: "Scuderia Ferrari lead driver, 8+ Grand Prix victories, 2017 Formula 2 Champion, 35+ career podiums.",
  },
  norris: {
    notableRecords: "First driver to take a Grand Prix victory for McLaren since 2021 (Miami 2024), 25+ career podiums.",
    careerHighlights: "2024 Dutch & Miami GP winner, 2017 Formula 3 European Champion, McLaren lead driver fighting for world titles.",
  },
  piastri: {
    notableRecords: "First driver born in the 2000s to win a Formula 1 Grand Prix (Hungary 2024), 2x GP winner in sophomore season.",
    careerHighlights: "Grand Prix victories in Hungary and Azerbaijan (2024), 2021 Formula 2 Champion, 2020 Formula 3 Champion back-to-back.",
  },
  russell: {
    notableRecords: "Mercedes Grand Prix winner, 2018 Formula 2 Champion on rookie season.",
    careerHighlights: "2x Grand Prix winner (Brazil 2022, Austria 2024), Mercedes AMG F1 lead driver, 15+ career podiums.",
  },
  sainz: {
    notableRecords: "Only non-Red Bull driver to win a Grand Prix in the 2023 season (Singapore 2023), 4x GP winner across 3 teams.",
    careerHighlights: "Grand Prix victories in Great Britain (2022), Singapore (2023), Australia (2024), and Mexico (2024); Williams lead driver.",
  },
  alonso: {
    notableRecords: "Most career F1 starts in history (400+ starts), youngest World Champion at the time of his 2005 title.",
    careerHighlights: "2x Formula 1 World Champion (2005, 2006), 32 Grand Prix victories, 106 podium finishes, 2x 24 Hours of Le Mans winner.",
  },
  stroll: {
    notableRecords: "Youngest rookie podium finisher in F1 history (Baku 2017), pole position in Turkey 2020.",
    careerHighlights: "3 F1 career podiums,  Turkey 2020 pole sitter, 150+ Grand Prix starts with Williams, Racing Point, and Aston Martin.",
  },
  gasly: {
    notableRecords: "First French driver to win a Grand Prix since 1996 (Monza 2020 victory with AlphaTauri).",
    careerHighlights: "2020 Italian Grand Prix winner, 5 career F1 podiums, 2016 GP2 Series Champion, Alpine lead driver.",
  },
  ocon: {
    notableRecords: "Sensational victory at the 2021 Hungarian Grand Prix for Alpine.",
    careerHighlights: "2021 Hungarian GP winner, 4 career F1 podiums, 2015 GP3 Series Champion, Haas F1 driver.",
  },
  albon: {
    notableRecords: "2x F1 podium finisher with Red Bull Racing, leading Williams' modern F1 resurgence.",
    careerHighlights: "Podiums at Mugello and Bahrain (2020), 100+ Grand Prix starts, Williams Racing team leader.",
  },
  tsunoda: {
    notableRecords: "First Japanese driver to score points on F1 debut since 2009 (Bahrain 2021).",
    careerHighlights: "80+ Grand Prix starts, multiple top-6 finishes, VCARB lead driver.",
  },
  hulkenberg: {
    notableRecords: "Pole position in rookie season (Brazil 2010), overall winner of the 2015 24 Hours of Le Mans on debut.",
    careerHighlights: "220+ Grand Prix starts, 2015 Le Mans 24h winner with Porsche, 2009 GP2 Champion, Audi factory driver.",
  },
  bearman: {
    notableRecords: "Scored points on F1 debut with Scuderia Ferrari at age 18 (Saudi Arabia 2024), 7th place finish.",
    careerHighlights: "Multiple F2/F3 race winner, Haas F1 driver, youngest British driver to start an F1 race.",
  },
  lawson: {
    notableRecords: "Scored points in only his 3rd F1 race (Singapore 2023), replacing injured Ricciardo.",
    careerHighlights: "Red Bull Racing / VCARB driver, DTM runner-up, Super Formula runner-up, F2 multi-race winner.",
  },
  antonelli: {
    notableRecords: "Youngest Mercedes F1 driver in modern history, direct ascension from FRECA/F2 to Mercedes F1 seat.",
    careerHighlights: "2023 FRECA Champion, 2022 Italian & ADAC F4 Champion, Mercedes AMG F1 driver.",
  },
  doohan: {
    notableRecords: "F2 Championship top-3 finisher, son of 5x MotoGP World Champion Mick Doohan.",
    careerHighlights: "Alpine F1 Team driver, 3x F2 feature race winner, F3 championship runner-up.",
  },
  bortoleto: {
    notableRecords: "Back-to-back titles in F3 and F2 (2023 F3 Champion, 2024 F2 Champion).",
    careerHighlights: "2023 FIA Formula 3 Champion, 2024 Formula 2 Champion, Sauber/Audi factory driver.",
  },
  hadjar: {
    notableRecords: "Red Bull Junior driver, multiple F2 feature race winner in 2024.",
    careerHighlights: "2024 Formula 2 title contender, VCARB driver, Red Bull driver development star.",
  },
  colapinto: {
    notableRecords: "First Argentine driver to score F1 points in 42 years (Baku 2024, 8th place finish).",
    careerHighlights: "Impression debut run with Williams in 2024, F2 race winner, Alpine F1 driver.",
  },
  arvid_lindblad: {
    notableRecords: "First driver in F3 history to win both the Sprint and Feature race in a single weekend (Silverstone 2024).",
    careerHighlights: "Red Bull Junior Team prodigy, 4x FIA F3 race winner, top 2026 F1 rookie prospect.",
  },
};

export function getDriverAchievements(driverId: string): DriverAchievements {
  return (
    DRIVER_ACHIEVEMENTS[driverId] ?? {
      notableRecords: "Multiple Formula 1 Grand Prix entries and competitive standings performance.",
      careerHighlights: "Professional Formula 1 driver competing at the pinnacle of motorsport.",
    }
  );
}
