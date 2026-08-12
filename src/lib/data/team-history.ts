/**
 * Team History strip's "Notable eras" narrative. `[C]` original editorial
 * content (DESIGN.md §8) — sourced via web search, cross-checked, same
 * research standard as the driver Achievements/partner drafts: nothing
 * invented. Future changes are included only where officially announced by
 * the team/brand itself (Alpine's 2027 Gucci partnership, Williams' 2026
 * rename) — never speculation — and are worth a periodic re-check since
 * sponsorship deals get announced throughout a season, not a one-time-final
 * list.
 *
 * Keyed by constructorId, matching lib/data/team-colors.ts's TEAM_COLORS
 * keys — not Jolpica's raw ids where they differ (e.g. "rb" for Racing
 * Bulls, same reasoning as image-slugs.ts).
 */
const TEAM_HISTORY: Record<string, string> = {
  ferrari:
    "The only team to have competed in every Formula 1 season since the championship began in 1950, and F1's most successful constructor outright: 16 Constructors' Championships and 15 Drivers' Championships. Founded by Enzo Ferrari in 1929, decades before F1 itself existed. The Michael Schumacher/Jean Todt era (2000–2004) remains the team's peak: five consecutive Drivers' titles and six consecutive Constructors' titles.",
  mercedes:
    "Returned to Formula 1 in 2010 after a 55-year absence (Mercedes last raced works entries in 1954–55), rebuilding on the foundation of the 2009 champion Brawn GP team. Became the defining force of the sport's turbo-hybrid era: eight consecutive Constructors' Championships from 2014 to 2021, a record no other team has matched in the hybrid era.",
  mclaren:
    "Founded by Bruce McLaren in 1963, entering F1 in 1966. Ten Constructors' Championships (most recently 2025) and 13 Drivers' titles make it the second most successful team in F1 history behind Ferrari. Defined much of the 1980s and early '90s through the McLaren-Honda era, with Ayrton Senna and Alain Prost driving the legendary MP4/4.",
  red_bull:
    "Formed in 2005 after Red Bull bought the Jaguar Racing team outright in late 2004. Founder Dietrich Mateschitz built the team around advisor Helmut Marko, team principal Christian Horner, and chief designer Adrian Newey. Eight Drivers' Championships and six Constructors' titles followed, anchored by two periods of total dominance: Sebastian Vettel's four consecutive titles (2010–2013) and Max Verstappen's four consecutive titles (2021–2024).",
  aston_martin:
    "Traces its current lineage through Jordan Grand Prix (1991–2005, founded by Eddie Jordan) → Force India (2008–2018) → Racing Point (2019–2020, rescued from administration by a Lawrence Stroll-led consortium) → Aston Martin (2021–present), following Stroll's £182 million investment and stake in the Aston Martin road car brand. Separately, Aston Martin itself briefly fielded its own F1 team in 1959–1960, a historical footnote unrelated to today's team.",
  alpine:
    "The current identity of Renault's long-running works team. Confirmed for 2027 (not yet in effect): Gucci becomes title partner under a three-year deal reported at over $150 million, and the team will race as \"Gucci Racing Alpine Formula One Team\" in Gucci's colors — red, green, black and gold — replacing the current Alpine blue and BWT pink. It's the first time a luxury fashion house has become a top-level motorsport title partner.",
  williams:
    "Founded in 1977 by Sir Frank Williams and Patrick Head (with roots stretching back to Frank Williams Racing Cars in 1966). Nine Constructors' Championships and seven Drivers' titles, mostly won between 1980 and 1997 — but no championship since Jacques Villeneuve's title that year. For the 2026 season: the team reverted its name from Williams Racing back to Williams F1 Team, and brought back a modernized version of the original 1977 \"Forward W\" logo.",
  haas:
    "Founded by American industrialist Gene Haas (also owner of Haas Automation and the Stewart-Haas NASCAR team), debuting in 2016 — the first American-led F1 team since the Haas Lola effort of the 1980s, and still the only American constructor on the current grid. Finished its debut season 8th in the constructors' standings, the strongest first-year points total of any new team that millennium.",
  audi:
    "Racing as Audi from 2026, but built on Sauber's long F1 history — Sauber joined the grid in 1993 and gave F1 debuts to Charles Leclerc, Felipe Massa, and 2007 World Champion Kimi Räikkönen. Audi announced its F1 entry in 2022, acquired a minority stake in Sauber in 2023, and completed a full €600 million takeover of Sauber Holding AG in January 2025. 2025 was a transitional year racing as Stake F1 Team Kick Sauber before the full Audi factory identity took over for 2026.",
  rb: "Red Bull's second team, with more name changes than any other current constructor: originally Minardi (1985–2005) until Red Bull bought it in 2006, then Scuderia Toro Rosso (2006–2019, delivering Vettel's shock 2008 Italian GP win in the rain), AlphaTauri (2020–2023, adding a second Monza win with Pierre Gasly in 2020), RB/VCARB (2024), and Racing Bulls from 2025 onward. Long served as Red Bull's proving ground for future senior-team drivers, including Vettel, Sainz, and Verstappen himself.",
  cadillac:
    "Formula 1's newest team, debuting in 2026 as the sport's 11th constructor and bringing the grid to 22 cars. Backed by General Motors and TWG Motorsports, the entry followed a rejected earlier bid (via Andretti Global) before GM's stronger, direct commitment won FIA approval. Sources its power units from Ferrari through 2029, after which GM begins supplying its own — the team is based both in Fishers, Indiana and near Silverstone, UK.",
};

export function getTeamHistory(constructorId: string): string | null {
  return TEAM_HISTORY[constructorId] ?? null;
}
