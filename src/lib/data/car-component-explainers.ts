import type { CarComponentId } from "@/components/f1/car-viewer/car-components";

/**
 * Technology page's Beginner/Technical explainer copy for each hotspot.
 * `[C]` original editorial content (DESIGN.md §8) — same research standard
 * as the driver Achievements/partner drafts and lib/data/team-history.ts:
 * nothing invented.
 */
export interface CarComponentExplainer {
  beginner: string;
  technical: string;
}

export const CAR_COMPONENT_EXPLAINERS: Record<CarComponentId, CarComponentExplainer> = {
  "front-wing": {
    beginner:
      "The first part of the car to meet the oncoming air. It's shaped to push air around and under the car and create grip at the front — even a few millimetres of adjustment can change how the car handles a corner.",
    technical:
      "For 2026, front wings are part of F1's new fully active aerodynamics system — the flaps physically move between two positions: a high-downforce \"closed\" mode for cornering and a flattened, low-drag \"open\" mode on straights, deployed automatically based on where the car is on track.",
  },
  "floor-diffuser": {
    beginner:
      "Most of a Formula 1 car's grip doesn't come from the wings — it comes from underneath. The floor is shaped to accelerate air flowing beneath the car, and the diffuser at the back speeds that air up even further, creating suction that pulls the car onto the track. This is called \"ground effect.\"",
    technical:
      "Floor and diffuser aerodynamics generate up to 60% of a car's total downforce, with far less drag penalty than the wings. For 2026, the floor's width was reduced by 100mm (to 1.9m) as part of a wider push to shrink the cars and reduce the wake turbulence that makes following another car difficult.",
  },
  "power-unit": {
    beginner:
      "Every 2026 car uses a hybrid engine — part traditional combustion engine, part electric motor — running on fully sustainable fuel. The electric side now does much more of the work than before, giving a bigger, more noticeable boost when a driver accelerates.",
    technical:
      "The 2026 power unit keeps the 1.6-litre turbo-hybrid V6 layout but removes the MGU-H (the turbo-recovery motor) entirely, while the MGU-K's electrical output nearly triples — from 120kW to 350kW. The result is close to an even split between combustion and electric power, and a genuinely different energy-management challenge: race engineers now plan battery deployment across a lap the way they used to plan fuel loads.",
  },
  "drs-active-aero": {
    beginner:
      "Overtaking in F1 used to rely on a simple flap on the rear wing (DRS) that a driver could open in specific zones to reduce drag and go faster in a straight line. From 2026, that idea has grown into something much bigger — the whole car's aerodynamics actively adjust themselves, automatically, all the time.",
    technical:
      "2026 introduces full-time active aerodynamics on both the front and rear wings, not just a driver-triggered rear flap. On straights, both wings move to a flattened, low-drag mode to reduce drag and raise top speed; through corners, they return to a high-downforce mode for grip. It's the direct evolution of DRS, but now permanent and bidirectional rather than a single manual override.",
  },
  suspension: {
    beginner:
      "Suspension is what connects the car's body to its wheels — it's the reason the car can absorb bumps, stay stable under braking, and keep its tyres pressed to the track through a corner. Teams spend more time adjusting this than almost anything else on the car.",
    technical:
      "Setup changes to camber, toe, ride height, and spring rates are the primary way teams tune a car to a specific circuit's demands — from Monaco's low-speed precision to Monza's high-speed stability — often adjusted race-by-race or even session-by-session.",
  },
  tyres: {
    beginner:
      "Tyres are the only part of the car actually touching the track, and they matter more than almost anything else — different rubber compounds grip differently, wear differently, and change how a driver has to manage a whole race.",
    technical:
      "2026 brings narrower tyres across the board — front tyres 25mm narrower, rears 30mm narrower — part of the broader push to reduce drag and cut overall weight, working alongside the shortened 3.4m maximum wheelbase to make the cars smaller and more agile than the previous generation.",
  },
};
