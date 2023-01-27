import { Facility, Recipe } from "../../assets";
import { Flags, Proliferator } from "../../types";

export const getCyclesPerMinute = (
  facility: Facility,
  recipe: Recipe,
  proliferator: Proliferator,
): number => {
  const base_cycle: number = 60 / recipe.cycle_time;
  const f_multiplier: number = facility.speedup_multiplier;
  const p_multiplier: number =
    Proliferator.getMultiplier(proliferator).speed_multiplier;

  return base_cycle * f_multiplier * p_multiplier;
};

const getLimitingFlowrate = (
  cycles_per_minute: number,
  ratios: { [K: string]: number },
): number => {
  const limiting_ratio: number = Math.max(...Object.values(ratios));

  return limiting_ratio * cycles_per_minute;
};

export const getMaxFacility = (
  cycles_per_minute: number,
  recipes: Recipe,
  input_flowrate_per_minute: number,
  output_flowrate_per_minute: number,
  flags: Flags,
): number => {
  const { materials, products } = recipes;
  const input_max_facility: number =
    input_flowrate_per_minute /
    getLimitingFlowrate(cycles_per_minute, materials);
  const output_max_facility: number =
    output_flowrate_per_minute /
    getLimitingFlowrate(cycles_per_minute, products);

  const max_facility: number = Math.min(
    output_max_facility,
    input_max_facility,
  );

  if (flags.preferEven && max_facility % 2 === 1) {
    return max_facility - 1;
  }
  return max_facility;
};

export const getMaxFacilitySatisfy = (
  targets: {
    [K: string]: number;
  },
  recipe: Recipe,
  max_facility: number,
): number => {
  const { products } = recipe;
  const target_ratios: number[] = Object.keys(targets).map((key) => {
    return targets[key] / products[key];
  });

  const target: number = Math.max(...target_ratios);
  const facility_satisfy: number = Math.ceil(target / max_facility);
  return facility_satisfy;
};
