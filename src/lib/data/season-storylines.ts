/**
 * History's per-season storyline blurb. `[C]` original editorial content
 * (DESIGN.md §8) — same research standard as the driver Achievements/partner
 * drafts: nothing invented.
 *
 * Deliberately covers only a curated ~20 of the 77 seasons since 1950 — the
 * pivotal/famous ones — not a promise to eventually cover all of them on a
 * fixed timeline. A season missing here still renders `[PENDING — EDITORIAL]`
 * in SeasonDetailPanel, same as before this file existed; that's the honest
 * state for a season that hasn't been written up, not a bug.
 */
const SEASON_STORYLINES: Record<string, string> = {
  "1950":
    "The first-ever World Championship season. Giuseppe Farina won the title for Alfa Romeo, and the opening round at Silverstone remains the first race in Formula 1 history.",
  "1976":
    "One of F1's most famous title fights: James Hunt vs. Niki Lauda, immortalized decades later in the film Rush. Lauda suffered near-fatal burns in a crash at the Nürburgring mid-season, returned just six weeks later, then withdrew from the rain-soaked finale in Japan over safety concerns — handing Hunt the title by a single point, 69 to 68.",
  "1977":
    "Niki Lauda's remarkable comeback continued, winning his second World Championship the year after his crash — proof of how completely he'd recovered.",
  "1982":
    "One of the most chaotic seasons in F1 history: 11 different drivers won a race, and Keke Rosberg claimed the title despite winning only once all year.",
  "1988":
    "McLaren-Honda's near-perfect season: the MP4/4 won 15 of 16 races, and Ayrton Senna beat teammate Alain Prost to his first World Championship.",
  "1989":
    "Senna and Prost, now bitter rivals on the same team, collided at the Suzuka chicane while fighting for the title — Prost was champion.",
  "1990":
    "The rivalry came to a head again at the same corner, Senna this time colliding with Prost deliberately at the first corner to secure his second title.",
  "1994":
    "A season marked by tragedy: Ayrton Senna was killed in a crash during the San Marino Grand Prix at Imola, a loss that reshaped F1's approach to driver safety for decades afterward. Michael Schumacher won his first World Championship that year, the title decided by a controversial collision with Damon Hill at the final race in Adelaide.",
  "1999":
    "Mika Häkkinen won his second consecutive title for McLaren in a season where Michael Schumacher missed several races with a broken leg.",
  "2000":
    "Michael Schumacher won his first title for Ferrari, ending a 21-year wait for the team's next Drivers' Championship.",
  "2005":
    "Fernando Alonso became the youngest World Champion at the time, ending Michael Schumacher and Ferrari's run of dominance.",
  "2006":
    "Alonso repeated as champion, going back-to-back before Schumacher's first retirement from the sport at the end of the year.",
  "2008":
    "Lewis Hamilton won his first title on the final corner of the final lap of the season, passing Timo Glock in the closing seconds to overtake Felipe Massa, who had already begun celebrating on the podium believing he'd won.",
  "2009":
    "One of F1's great underdog stories: Brawn GP, assembled from the wreckage of Honda's sudden withdrawal just weeks before the season, won both the Drivers' and Constructors' Championships in its only year of existence with that name.",
  "2010":
    "A four-way title fight went to the final race in Abu Dhabi, where Sebastian Vettel won the Grand Prix and, with it, his first World Championship — the youngest champion in F1 history at the time.",
  "2014":
    "The start of the turbo-hybrid era, and the beginning of Mercedes' period of dominance, with an intense intra-team title fight between teammates Lewis Hamilton and Nico Rosberg.",
  "2016":
    "Nico Rosberg won his only World Championship, beating teammate Hamilton — then retired from Formula 1 just five days later.",
  "2021":
    "One of the most controversial season finales in F1 history: Max Verstappen passed Lewis Hamilton on the final lap in Abu Dhabi, following a disputed late Safety Car restart, to win his first World Championship.",
  "2025":
    "Lando Norris won his first World Championship, McLaren's tenth Constructors' title, after a season-long fight that included his maiden win at Miami the year before and a title-clinching victory at his home race, the British Grand Prix.",
};

export function getSeasonStoryline(season: string): string | null {
  return SEASON_STORYLINES[season] ?? null;
}
