/**
 * Team "Identity" section data (Team Principal, Headquarters, Power Unit, Chassis, Founded Year).
 * Curated for all 11 teams on the grid.
 */

export interface TeamIdentity {
  principal: string;
  headquarters: string;
  powerUnit: string;
  chassis: string;
  founded: string;
}

const TEAM_IDENTITIES: Record<string, TeamIdentity> = {
  red_bull: {
    principal: "Christian Horner",
    headquarters: "Milton Keynes, United Kingdom",
    powerUnit: "Red Bull Ford Powertrains",
    chassis: "RB22",
    founded: "2005",
  },
  ferrari: {
    principal: "Frédéric Vasseur",
    headquarters: "Maranello, Italy",
    powerUnit: "Ferrari",
    chassis: "SF-26",
    founded: "1950 (1929)",
  },
  mclaren: {
    principal: "Andrea Stella",
    headquarters: "Woking, United Kingdom",
    powerUnit: "Mercedes-AMG",
    chassis: "MCL39",
    founded: "1963",
  },
  mercedes: {
    principal: "Toto Wolff",
    headquarters: "Brackley, United Kingdom",
    powerUnit: "Mercedes-AMG",
    chassis: "F1 W17",
    founded: "2010 (1954)",
  },
  aston_martin: {
    principal: "Mike Krack",
    headquarters: "Silverstone, United Kingdom",
    powerUnit: "Honda",
    chassis: "AMR26",
    founded: "2021 (1991 Jordan)",
  },
  alpine: {
    principal: "Oliver Oakes",
    headquarters: "Enstone, UK & Viry, France",
    powerUnit: "Mercedes-AMG / Renault",
    chassis: "A526",
    founded: "2021 (1977 Renault)",
  },
  williams: {
    principal: "James Vowles",
    headquarters: "Grove, United Kingdom",
    powerUnit: "Mercedes-AMG",
    chassis: "FW48",
    founded: "1977",
  },
  rb: {
    principal: "Laurent Mekies",
    headquarters: "Faenza, Italy",
    powerUnit: "Red Bull Ford Powertrains",
    chassis: "VCARB 03",
    founded: "2006 (1985 Minardi)",
  },
  haas: {
    principal: "Ayao Komatsu",
    headquarters: "Kannapolis, USA & Banbury, UK",
    powerUnit: "Ferrari",
    chassis: "VF-26",
    founded: "2016",
  },
  sauber: {
    principal: "Mattia Binotto / Jonathan Wheatley",
    headquarters: "Hinwil, Switzerland",
    powerUnit: "Audi",
    chassis: "R26",
    founded: "1993 (Audi 2026)",
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
    }
  );
}
