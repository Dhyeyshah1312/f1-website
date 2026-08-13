/**
 * Team "Identity" and "History" section data (Team Principal, Headquarters, Power Unit, Chassis, Founded, Constructors' Championships).
 * Curated for all 11 teams on the grid.
 */

export interface TeamIdentity {
  principal: string;
  headquarters: string;
  powerUnit: string;
  chassis: string;
  founded: string;
  championships: string;
}

const TEAM_IDENTITIES: Record<string, TeamIdentity> = {
  red_bull: {
    principal: "Christian Horner",
    headquarters: "Milton Keynes, United Kingdom",
    powerUnit: "Red Bull Ford Powertrains",
    chassis: "RB22",
    founded: "2005 (lineage to Stewart Grand Prix 1997)",
    championships: "6 titles (2010–2013, 2022, 2023)",
  },
  ferrari: {
    principal: "Frédéric Vasseur",
    headquarters: "Maranello, Italy",
    powerUnit: "Ferrari",
    chassis: "SF-26",
    founded: "1950 (Scuderia Ferrari founded 1929)",
    championships: "16 titles (1961, 1964, 1975, 1977, 1979, 1982, 1983, 1999–2004, 2007, 2008)",
  },
  mclaren: {
    principal: "Andrea Stella",
    headquarters: "Woking, United Kingdom",
    powerUnit: "Mercedes-AMG",
    chassis: "MCL39",
    founded: "1966 (Bruce McLaren Motor Racing 1963)",
    championships: "8 titles (1974, 1984, 1985, 1988–1991, 1998)",
  },
  mercedes: {
    principal: "Toto Wolff",
    headquarters: "Brackley, United Kingdom",
    powerUnit: "Mercedes-AMG",
    chassis: "F1 W17",
    founded: "2010 (lineage to Tyrrell 1968 / Brawn GP 2009)",
    championships: "8 titles (2014–2021 consecutive)",
  },
  aston_martin: {
    principal: "Mike Krack",
    headquarters: "Silverstone, United Kingdom",
    powerUnit: "Honda",
    chassis: "AMR26",
    founded: "2021 (lineage to Jordan Grand Prix 1991)",
    championships: "0 titles (best finish P4 in 2020 as Racing Point)",
  },
  alpine: {
    principal: "Oliver Oakes",
    headquarters: "Enstone, UK & Viry, France",
    powerUnit: "Mercedes-AMG / Renault",
    chassis: "A526",
    founded: "2021 (lineage to Toleman 1981 / Renault 1977)",
    championships: "2 titles (2005, 2006 as Renault)",
  },
  williams: {
    principal: "James Vowles",
    headquarters: "Grove, United Kingdom",
    powerUnit: "Mercedes-AMG",
    chassis: "FW48",
    founded: "1977 (Williams Grand Prix Engineering)",
    championships: "9 titles (1980, 1981, 1986, 1987, 1992, 1993, 1994, 1996, 1997)",
  },
  rb: {
    principal: "Laurent Mekies",
    headquarters: "Faenza, Italy",
    powerUnit: "Red Bull Ford Powertrains",
    chassis: "VCARB 03",
    founded: "2006 (lineage to Minardi 1985 / Toro Rosso 2006)",
    championships: "0 titles (best finish P6 in 2008 & 2021)",
  },
  haas: {
    principal: "Ayao Komatsu",
    headquarters: "Kannapolis, USA & Banbury, UK",
    powerUnit: "Ferrari",
    chassis: "VF-26",
    founded: "2016 (Haas F1 Team debut)",
    championships: "0 titles (best finish P5 in 2018)",
  },
  sauber: {
    principal: "Mattia Binotto / Jonathan Wheatley",
    headquarters: "Hinwil, Switzerland",
    powerUnit: "Audi",
    chassis: "R26",
    founded: "2026 (lineage to Sauber 1993 / BMW Sauber 2006)",
    championships: "0 titles (best finish P2 in 2007 as BMW Sauber)",
  },
};

export function getTeamIdentity(constructorId: string): TeamIdentity {
  return (
    TEAM_IDENTITIES[constructorId] ?? {
      principal: "Team Principal",
      headquarters: "Global F1 Headquarters",
      powerUnit: "2026 Turbo-Hybrid V6",
      chassis: "2026 Spec Chassis",
      founded: "F1 Constructor",
      championships: "0 titles",
    }
  );
}
