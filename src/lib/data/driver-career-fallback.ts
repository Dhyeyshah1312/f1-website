import type { DriverBio, DriverCareerStats } from "@/lib/data/types";

export interface CuratedDriverData {
  bio: DriverBio;
  careerStats: DriverCareerStats;
}

export const CuratedDriverDataMap: Record<string, CuratedDriverData> = {
  hamilton: {
    bio: {
      driverId: "hamilton",
      permanentNumber: "44",
      code: "HAM",
      givenName: "Lewis",
      familyName: "Hamilton",
      dateOfBirth: "1985-01-07",
      nationality: "British",
    },
    careerStats: {
      wins: 105,
      podiums: 201,
      poles: 104,
      championships: 7,
      points: 4829.5,
      timeline: [
        { season: "2007", position: 2, points: 109, wins: 4, constructorIds: ["mclaren"], constructorNames: ["McLaren"] },
        { season: "2008", position: 1, points: 98, wins: 5, constructorIds: ["mclaren"], constructorNames: ["McLaren"] },
        { season: "2014", position: 1, points: 384, wins: 11, constructorIds: ["mercedes"], constructorNames: ["Mercedes"] },
        { season: "2015", position: 1, points: 381, wins: 10, constructorIds: ["mercedes"], constructorNames: ["Mercedes"] },
        { season: "2017", position: 1, points: 363, wins: 9, constructorIds: ["mercedes"], constructorNames: ["Mercedes"] },
        { season: "2018", position: 1, points: 408, wins: 11, constructorIds: ["mercedes"], constructorNames: ["Mercedes"] },
        { season: "2019", position: 1, points: 413, wins: 11, constructorIds: ["mercedes"], constructorNames: ["Mercedes"] },
        { season: "2020", position: 1, points: 347, wins: 11, constructorIds: ["mercedes"], constructorNames: ["Mercedes"] },
        { season: "2024", position: 7, points: 223, wins: 2, constructorIds: ["mercedes"], constructorNames: ["Mercedes"] },
        { season: "2025", position: 6, points: 156, wins: 0, constructorIds: ["ferrari"], constructorNames: ["Ferrari"] },
        { season: "2026", position: 2, points: 169, wins: 1, constructorIds: ["ferrari"], constructorNames: ["Ferrari"] },
      ],
    },
  },
  leclerc: {
    bio: {
      driverId: "leclerc",
      permanentNumber: "16",
      code: "LEC",
      givenName: "Charles",
      familyName: "Leclerc",
      dateOfBirth: "1997-10-16",
      nationality: "Monegasque",
    },
    careerStats: {
      wins: 8,
      podiums: 42,
      poles: 26,
      championships: 0,
      points: 1381,
      timeline: [
        { season: "2018", position: 13, points: 39, wins: 0, constructorIds: ["sauber"], constructorNames: ["Sauber"] },
        { season: "2019", position: 4, points: 264, wins: 2, constructorIds: ["ferrari"], constructorNames: ["Ferrari"] },
        { season: "2022", position: 2, points: 308, wins: 3, constructorIds: ["ferrari"], constructorNames: ["Ferrari"] },
        { season: "2024", position: 3, points: 356, wins: 3, constructorIds: ["ferrari"], constructorNames: ["Ferrari"] },
        { season: "2026", position: 4, points: 138, wins: 0, constructorIds: ["ferrari"], constructorNames: ["Ferrari"] },
      ],
    },
  },
  max_verstappen: {
    bio: {
      driverId: "max_verstappen",
      permanentNumber: "1",
      code: "VER",
      givenName: "Max",
      familyName: "Verstappen",
      dateOfBirth: "1997-09-30",
      nationality: "Dutch",
    },
    careerStats: {
      wins: 63,
      podiums: 111,
      poles: 40,
      championships: 4,
      points: 3014.5,
      timeline: [
        { season: "2015", position: 12, points: 49, wins: 0, constructorIds: ["tor_rosso"], constructorNames: ["Toro Rosso"] },
        { season: "2021", position: 1, points: 395.5, wins: 10, constructorIds: ["red_bull"], constructorNames: ["Red Bull"] },
        { season: "2022", position: 1, points: 454, wins: 15, constructorIds: ["red_bull"], constructorNames: ["Red Bull"] },
        { season: "2023", position: 1, points: 575, wins: 19, constructorIds: ["red_bull"], constructorNames: ["Red Bull"] },
        { season: "2024", position: 1, points: 437, wins: 9, constructorIds: ["red_bull"], constructorNames: ["Red Bull"] },
      ],
    },
  },
  norris: {
    bio: {
      driverId: "norris",
      permanentNumber: "4",
      code: "NOR",
      givenName: "Lando",
      familyName: "Norris",
      dateOfBirth: "1999-11-13",
      nationality: "British",
    },
    careerStats: {
      wins: 4,
      podiums: 26,
      poles: 8,
      championships: 0,
      points: 965,
      timeline: [
        { season: "2019", position: 11, points: 49, wins: 0, constructorIds: ["mclaren"], constructorNames: ["McLaren"] },
        { season: "2024", position: 2, points: 374, wins: 3, constructorIds: ["mclaren"], constructorNames: ["McLaren"] },
        { season: "2025", position: 1, points: 420, wins: 5, constructorIds: ["mclaren"], constructorNames: ["McLaren"] },
      ],
    },
  },
  alonso: {
    bio: {
      driverId: "alonso",
      permanentNumber: "14",
      code: "ALO",
      givenName: "Fernando",
      familyName: "Alonso",
      dateOfBirth: "1981-07-29",
      nationality: "Spanish",
    },
    careerStats: {
      wins: 32,
      podiums: 106,
      poles: 22,
      championships: 2,
      points: 2329,
      timeline: [
        { season: "2001", position: 23, points: 0, wins: 0, constructorIds: ["minardi"], constructorNames: ["Minardi"] },
        { season: "2005", position: 1, points: 133, wins: 7, constructorIds: ["renault"], constructorNames: ["Renault"] },
        { season: "2006", position: 1, points: 134, wins: 7, constructorIds: ["renault"], constructorNames: ["Renault"] },
        { season: "2023", position: 4, points: 206, wins: 0, constructorIds: ["aston_martin"], constructorNames: ["Aston Martin"] },
      ],
    },
  },
  russell: {
    bio: {
      driverId: "russell",
      permanentNumber: "63",
      code: "RUS",
      givenName: "George",
      familyName: "Russell",
      dateOfBirth: "1998-02-15",
      nationality: "British",
    },
    careerStats: {
      wins: 3,
      podiums: 15,
      poles: 5,
      championships: 0,
      points: 669,
      timeline: [
        { season: "2019", position: 20, points: 0, wins: 0, constructorIds: ["williams"], constructorNames: ["Williams"] },
        { season: "2022", position: 4, points: 275, wins: 1, constructorIds: ["mercedes"], constructorNames: ["Mercedes"] },
        { season: "2024", position: 6, points: 245, wins: 1, constructorIds: ["mercedes"], constructorNames: ["Mercedes"] },
        { season: "2026", position: 3, points: 160, wins: 1, constructorIds: ["mercedes"], constructorNames: ["Mercedes"] },
      ],
    },
  },
  sainz: {
    bio: {
      driverId: "sainz",
      permanentNumber: "55",
      code: "SAI",
      givenName: "Carlos",
      familyName: "Sainz",
      dateOfBirth: "1994-09-01",
      nationality: "Spanish",
    },
    careerStats: {
      wins: 4,
      podiums: 25,
      poles: 6,
      championships: 0,
      points: 1226.5,
      timeline: [
        { season: "2015", position: 15, points: 18, wins: 0, constructorIds: ["tor_rosso"], constructorNames: ["Toro Rosso"] },
        { season: "2022", position: 5, points: 246, wins: 1, constructorIds: ["ferrari"], constructorNames: ["Ferrari"] },
        { season: "2024", position: 5, points: 290, wins: 2, constructorIds: ["ferrari"], constructorNames: ["Ferrari"] },
      ],
    },
  },
  piastri: {
    bio: {
      driverId: "piastri",
      permanentNumber: "81",
      code: "PIA",
      givenName: "Oscar",
      familyName: "Piastri",
      dateOfBirth: "2001-04-06",
      nationality: "Australian",
    },
    careerStats: {
      wins: 2,
      podiums: 10,
      poles: 0,
      championships: 0,
      points: 392,
      timeline: [
        { season: "2023", position: 9, points: 97, wins: 0, constructorIds: ["mclaren"], constructorNames: ["McLaren"] },
        { season: "2024", position: 4, points: 292, wins: 2, constructorIds: ["mclaren"], constructorNames: ["McLaren"] },
      ],
    },
  },
  antonelli: {
    bio: {
      driverId: "antonelli",
      permanentNumber: "12",
      code: "ANT",
      givenName: "Andrea Kimi",
      familyName: "Antonelli",
      dateOfBirth: "2006-08-25",
      nationality: "Italian",
    },
    careerStats: {
      wins: 1,
      podiums: 5,
      poles: 2,
      championships: 0,
      points: 219,
      timeline: [
        { season: "2026", position: 1, points: 219, wins: 1, constructorIds: ["mercedes"], constructorNames: ["Mercedes"] },
      ],
    },
  },
};

export function getCuratedDriverBio(driverId: string): DriverBio | null {
  const key = driverId.toLowerCase();
  if (CuratedDriverDataMap[key]) return CuratedDriverDataMap[key].bio;
  if (CuratedDriverDataMap[key.replace("max_", "")]) return CuratedDriverDataMap[key.replace("max_", "")].bio;
  return null;
}

export function getCuratedDriverCareerStats(driverId: string): DriverCareerStats | null {
  const key = driverId.toLowerCase();
  if (CuratedDriverDataMap[key]) return CuratedDriverDataMap[key].careerStats;
  if (CuratedDriverDataMap[key.replace("max_", "")]) return CuratedDriverDataMap[key.replace("max_", "")].careerStats;
  return null;
}
