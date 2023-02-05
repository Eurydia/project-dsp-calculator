import { Facility, Recipe } from "../assets";
import { Flags, Proliferator } from "../types";

const computeCyclesPerMinute = (
  recipe_cycle_time: number,
  facility_speed_multiplier: number,
  proliferator_speed_multiplier: number,
): number => {
  return (
    (60 / recipe_cycle_time) *
    facility_speed_multiplier *
    proliferator_speed_multiplier
  );
};

const computeFacilitiesPerBelt = (
  belt_flowrate_per_minute: number,
  item_flowrate_per_minute: number,
  flags: Flags,
): number => {
  const supportable: number = Math.floor(
    belt_flowrate_per_minute / item_flowrate_per_minute,
  );
  if (
    flags.keepBeltUnderMaxFlow &&
    supportable >= 1 &&
    supportable * item_flowrate_per_minute >= belt_flowrate_per_minute
  ) {
    return supportable - 1;
  }
  return supportable;
};

export const computeFacilitiesPerArray = (
  facility: Facility,
  recipe: Recipe,
  proliferator: Proliferator,
  input_flowrate_per_minute: number,
  output_flowrate_per_minute: number,
  flags: Flags,
): number => {
  const { materials, products, cycle_time } = recipe;
  const proliferator_bonus = Proliferator.getMultiplier(proliferator);

  const cycles_per_minute = computeCyclesPerMinute(
    cycle_time,
    facility.speedup_multiplier,
    proliferator_bonus.speed_multiplier,
  );

  const input_supportable: number = computeFacilitiesPerBelt(
    input_flowrate_per_minute,
    Math.max(...Object.values(materials)) * cycles_per_minute,
    flags,
  );

  const output_supportable: number = computeFacilitiesPerBelt(
    output_flowrate_per_minute,
    Math.max(...Object.values(products)) *
      cycles_per_minute *
      proliferator_bonus.product_multiplier,
    flags,
  );

  const facilities_per_array: number = Math.min(
    input_supportable,
    output_supportable,
  );
  if (
    flags.preferEven &&
    facilities_per_array > 0 &&
    facilities_per_array % 2 === 1
  ) {
    return facilities_per_array - 1;
  }
  return facilities_per_array;
};

export const computeFacilitiesNeeded = (
  demands: {
    [K: string]: number;
  },
  facility: Facility,
  recipe: Recipe,
  prolfierator: Proliferator,
): number => {
  if (Object.values(demands).every((demand) => demand === 0)) {
    return 0;
  }

  const proliferator_bonus = Proliferator.getMultiplier(prolfierator);

  const cycles_per_minute = computeCyclesPerMinute(
    recipe.cycle_time,
    facility.speedup_multiplier,
    proliferator_bonus.speed_multiplier,
  );

  const { products } = recipe;
  return Math.max(
    ...Object.keys(demands).map((key) => {
      return Math.ceil(
        demands[key] /
          (products[key] *
            cycles_per_minute *
            proliferator_bonus.product_multiplier),
      );
    }),
  );
};

export const computeIdleConsumptionPerFacility = (
  recipe: Recipe,
  flags: Flags,
): number => {
  const { materials, products } = recipe;
  const { accountForSortersConsumption } = flags;

  return (
    (Object.values(materials).length +
      Object.values(products).length) *
    accountForSortersConsumption.idle_consumption
  );
};

export const computeWorkConsumptionPerFacility = (
  recipe: Recipe,
  flags: Flags,
): number => {
  const { materials, products } = recipe;
  const { accountForSortersConsumption } = flags;

  return (
    (Object.values(materials).length +
      Object.values(products).length) *
    accountForSortersConsumption.work_consumption
  );
};
