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
  perez: {
    bio: {
      driverId: "perez",
      permanentNumber: "11",
      code: "PER",
      givenName: "Sergio",
      familyName: "Pérez",
      dateOfBirth: "1990-01-26",
      nationality: "Mexican",
    },
    careerStats: {
      wins: 6,
      podiums: 39,
      poles: 3,
      championships: 0,
      points: 1637,
      timeline: [
        { season: "2011", position: 16, points: 14, wins: 0, constructorIds: ["sauber"], constructorNames: ["Sauber"] },
        { season: "2020", position: 4, points: 125, wins: 1, constructorIds: ["racing_point"], constructorNames: ["Racing Point"] },
        { season: "2023", position: 2, points: 285, wins: 2, constructorIds: ["red_bull"], constructorNames: ["Red Bull"] },
      ],
    },
  },
  gasly: {
    bio: {
      driverId: "gasly",
      permanentNumber: "10",
      code: "GAS",
      givenName: "Pierre",
      familyName: "Gasly",
      dateOfBirth: "1996-02-07",
      nationality: "French",
    },
    careerStats: {
      wins: 1,
      podiums: 5,
      poles: 0,
      championships: 0,
      points: 434,
      timeline: [
        { season: "2017", position: 21, points: 0, wins: 0, constructorIds: ["toro_rosso"], constructorNames: ["Toro Rosso"] },
        { season: "2020", position: 10, points: 75, wins: 1, constructorIds: ["alphatauri"], constructorNames: ["AlphaTauri"] },
      ],
    },
  },
  ocon: {
    bio: {
      driverId: "ocon",
      permanentNumber: "31",
      code: "OCO",
      givenName: "Esteban",
      familyName: "Ocon",
      dateOfBirth: "1996-09-17",
      nationality: "French",
    },
    careerStats: {
      wins: 1,
      podiums: 4,
      poles: 0,
      championships: 0,
      points: 445,
      timeline: [
        { season: "2016", position: 23, points: 0, wins: 0, constructorIds: ["manor"], constructorNames: ["Manor"] },
        { season: "2021", position: 11, points: 74, wins: 1, constructorIds: ["alpine"], constructorNames: ["Alpine"] },
      ],
    },
  },
  albon: {
    bio: {
      driverId: "albon",
      permanentNumber: "23",
      code: "ALB",
      givenName: "Alexander",
      familyName: "Albon",
      dateOfBirth: "1996-03-23",
      nationality: "Thai",
    },
    careerStats: {
      wins: 0,
      podiums: 2,
      poles: 0,
      championships: 0,
      points: 240,
      timeline: [
        { season: "2019", position: 8, points: 92, wins: 0, constructorIds: ["tor_rosso", "red_bull"], constructorNames: ["Toro Rosso", "Red Bull"] },
        { season: "2020", position: 7, points: 105, wins: 0, constructorIds: ["red_bull"], constructorNames: ["Red Bull"] },
      ],
    },
  },
  tsunoda: {
    bio: {
      driverId: "tsunoda",
      permanentNumber: "22",
      code: "TSU",
      givenName: "Yuki",
      familyName: "Tsunoda",
      dateOfBirth: "2000-05-11",
      nationality: "Japanese",
    },
    careerStats: {
      wins: 0,
      podiums: 0,
      poles: 0,
      championships: 0,
      points: 91,
      timeline: [
        { season: "2021", position: 14, points: 32, wins: 0, constructorIds: ["alphatauri"], constructorNames: ["AlphaTauri"] },
        { season: "2024", position: 11, points: 30, wins: 0, constructorIds: ["rb"], constructorNames: ["RB"] },
      ],
    },
  },
  stroll: {
    bio: {
      driverId: "stroll",
      permanentNumber: "18",
      code: "STR",
      givenName: "Lance",
      familyName: "Stroll",
      dateOfBirth: "1998-10-29",
      nationality: "Canadian",
    },
    careerStats: {
      wins: 0,
      podiums: 3,
      poles: 1,
      championships: 0,
      points: 292,
      timeline: [
        { season: "2017", position: 12, points: 40, wins: 0, constructorIds: ["williams"], constructorNames: ["Williams"] },
        { season: "2020", position: 11, points: 75, wins: 0, constructorIds: ["racing_point"], constructorNames: ["Racing Point"] },
      ],
    },
  },
  hulkenberg: {
    bio: {
      driverId: "hulkenberg",
      permanentNumber: "27",
      code: "HUL",
      givenName: "Nico",
      familyName: "Hülkenberg",
      dateOfBirth: "1987-08-19",
      nationality: "German",
    },
    careerStats: {
      wins: 0,
      podiums: 0,
      poles: 1,
      championships: 0,
      points: 561,
      timeline: [
        { season: "2010", position: 14, points: 22, wins: 0, constructorIds: ["williams"], constructorNames: ["Williams"] },
        { season: "2018", position: 7, points: 69, wins: 0, constructorIds: ["renault"], constructorNames: ["Renault"] },
      ],
    },
  },
  bottas: {
    bio: {
      driverId: "bottas",
      permanentNumber: "77",
      code: "BOT",
      givenName: "Valtteri",
      familyName: "Bottas",
      dateOfBirth: "1989-08-28",
      nationality: "Finnish",
    },
    careerStats: {
      wins: 10,
      podiums: 67,
      poles: 20,
      championships: 0,
      points: 1797,
      timeline: [
        { season: "2013", position: 17, points: 4, wins: 0, constructorIds: ["williams"], constructorNames: ["Williams"] },
        { season: "2019", position: 2, points: 326, wins: 4, constructorIds: ["mercedes"], constructorNames: ["Mercedes"] },
        { season: "2020", position: 2, points: 223, wins: 2, constructorIds: ["mercedes"], constructorNames: ["Mercedes"] },
      ],
    },
  },
  bearman: {
    bio: {
      driverId: "bearman",
      permanentNumber: "87",
      code: "BEA",
      givenName: "Oliver",
      familyName: "Bearman",
      dateOfBirth: "2005-05-08",
      nationality: "British",
    },
    careerStats: {
      wins: 0,
      podiums: 0,
      poles: 0,
      championships: 0,
      points: 7,
      timeline: [
        { season: "2024", position: 18, points: 7, wins: 0, constructorIds: ["ferrari", "haas"], constructorNames: ["Ferrari", "Haas"] },
      ],
    },
  },
  lawson: {
    bio: {
      driverId: "lawson",
      permanentNumber: "30",
      code: "LAW",
      givenName: "Liam",
      familyName: "Lawson",
      dateOfBirth: "2002-02-11",
      nationality: "New Zealander",
    },
    careerStats: {
      wins: 0,
      podiums: 0,
      poles: 0,
      championships: 0,
      points: 6,
      timeline: [
        { season: "2023", position: 20, points: 2, wins: 0, constructorIds: ["alphatauri"], constructorNames: ["AlphaTauri"] },
        { season: "2024", position: 20, points: 4, wins: 0, constructorIds: ["rb"], constructorNames: ["RB"] },
      ],
    },
  },
  hadjar: {
    bio: {
      driverId: "hadjar",
      permanentNumber: "6",
      code: "HAD",
      givenName: "Isack",
      familyName: "Hadjar",
      dateOfBirth: "2004-09-28",
      nationality: "French",
    },
    careerStats: {
      wins: 0,
      podiums: 0,
      poles: 0,
      championships: 0,
      points: 0,
      timeline: [],
    },
  },
  bortoleto: {
    bio: {
      driverId: "bortoleto",
      permanentNumber: "5",
      code: "BOR",
      givenName: "Gabriel",
      familyName: "Bortoleto",
      dateOfBirth: "2004-10-14",
      nationality: "Brazilian",
    },
    careerStats: {
      wins: 0,
      podiums: 0,
      poles: 0,
      championships: 0,
      points: 0,
      timeline: [],
    },
  },
  colapinto: {
    bio: {
      driverId: "colapinto",
      permanentNumber: "43",
      code: "COL",
      givenName: "Franco",
      familyName: "Colapinto",
      dateOfBirth: "2003-05-27",
      nationality: "Argentine",
    },
    careerStats: {
      wins: 0,
      podiums: 0,
      poles: 0,
      championships: 0,
      points: 5,
      timeline: [
        { season: "2024", position: 19, points: 5, wins: 0, constructorIds: ["williams"], constructorNames: ["Williams"] },
      ],
    },
  },
  arvid_lindblad: {
    bio: {
      driverId: "arvid_lindblad",
      permanentNumber: "99",
      code: "LIN",
      givenName: "Arvid",
      familyName: "Lindblad",
      dateOfBirth: "2007-08-08",
      nationality: "British",
    },
    careerStats: {
      wins: 0,
      podiums: 0,
      poles: 0,
      championships: 0,
      points: 0,
      timeline: [],
    },
  },
};

function formatName(driverId: string): { givenName: string; familyName: string; code: string } {
  const parts = driverId.split("_");
  if (parts.length === 1) {
    const name = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    return { givenName: name, familyName: name, code: name.slice(0, 3).toUpperCase() };
  }
  const givenName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  const familyName = parts.slice(1).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
  const code = (givenName[0] + familyName.slice(0, 2)).toUpperCase();
  return { givenName, familyName, code };
}

export function getCuratedDriverBio(driverId: string): DriverBio {
  const key = driverId.toLowerCase();
  if (CuratedDriverDataMap[key]) return CuratedDriverDataMap[key].bio;
  const aliasKey = key.replace("max_", "");
  if (CuratedDriverDataMap[aliasKey]) return CuratedDriverDataMap[aliasKey].bio;

  const { givenName, familyName, code } = formatName(driverId);
  return {
    driverId,
    permanentNumber: "0",
    code,
    givenName,
    familyName,
    dateOfBirth: "2000-01-01",
    nationality: "International",
  };
}

export function getCuratedDriverCareerStats(driverId: string): DriverCareerStats {
  const key = driverId.toLowerCase();
  if (CuratedDriverDataMap[key]) return CuratedDriverDataMap[key].careerStats;
  const aliasKey = key.replace("max_", "");
  if (CuratedDriverDataMap[aliasKey]) return CuratedDriverDataMap[aliasKey].careerStats;

  return {
    wins: 0,
    podiums: 0,
    poles: 0,
    championships: 0,
    points: 0,
    timeline: [],
  };
}
