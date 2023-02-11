import { Proliferator, Facility, Recipe, Sorter } from "../assets";
import { Flags } from "../types";

const computeCyclesPerMinute = (
  facility: Facility,
  recipe: Recipe,
  proliferator: Proliferator,
): number => {
  return (
    (60 / recipe.cycle_time) *
    facility.speedup_multiplier *
    proliferator.speedup_multiplier
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
    supportable > 1 &&
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
  const { materials, products } = recipe;

  const cycles_per_minute = computeCyclesPerMinute(
    facility,
    recipe,
    proliferator,
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
      proliferator.production_multiplier,
    flags,
  );
  const facilities_per_array: number = Math.min(
    input_supportable,
    output_supportable,
  );
  if (
    flags.preferEven &&
    facilities_per_array > 2 &&
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

  const cycles_per_minute = computeCyclesPerMinute(
    facility,
    recipe,
    prolfierator,
  );

  const { products } = recipe;
  return Math.max(
    ...Object.keys(demands).map((key) => {
      return Math.ceil(
        demands[key] /
          (products[key] *
            cycles_per_minute *
            prolfierator.production_multiplier),
      );
    }),
  );
};

export const computeIdleConsumptionPerFacility = (
  facility: Facility,
  recipe: Recipe,
  sorter: Sorter,
): number => {
  const { materials, products } = recipe;

  const sorter_consumption =
    sorter.idle_consumption *
    (Object.values(materials).length +
      Object.values(products).length);

  return sorter_consumption + facility.idle_consumption_MW;
};

export const computeWorkConsumptionPerFacility = (
  facility: Facility,
  recipe: Recipe,
  proliferator: Proliferator,
  sorter: Sorter,
): number => {
  const { materials, products } = recipe;

  const sorter_consumption =
    sorter.work_consumption *
    (Object.values(materials).length +
      Object.values(products).length);
  const facility_consumption =
    facility.work_consumption_MW *
    proliferator.work_consumption_multiplier;

  return sorter_consumption + facility_consumption;
};

export const computeBillMaterialsPerFacility = (
  facility: Facility,
  recipe: Recipe,
  proliferator: Proliferator,
): { [K: string]: number } => {
  const bill: { [K: string]: number } = {};
  const cycles_per_minute: number = computeCyclesPerMinute(
    facility,
    recipe,
    proliferator,
  );

  Object.entries(recipe.materials).forEach((entry) => {
    const [key, value] = entry;
    bill[key] = value * cycles_per_minute;
  });

  return bill;
};

export const computeBillProductsPerFacility = (
  facility: Facility,
  recipe: Recipe,
  proliferator: Proliferator,
): { [K: string]: number } => {
  const bill: { [K: string]: number } = {};
  const cycles_per_minute: number = computeCyclesPerMinute(
    facility,
    recipe,
    proliferator,
  );

  Object.entries(recipe.products).forEach((entry) => {
    const [key, value] = entry;
    bill[key] =
      value * cycles_per_minute * proliferator.production_multiplier;
  });

  return bill;
};
