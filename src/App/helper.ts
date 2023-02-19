import { Proliferator, Facility, Recipe, Sorter } from "../assets";
import { Preferences, Configuration } from "../types";

const computeCyclesPerMinute = (
  config: Configuration,
  // facility: Facility,
  // recipe: Recipe,
  // proliferator: Proliferator,
): number => {
  const {
    recipe_cycle_time_second,
    facility_speed_multiplier,
    proliferator_speed_multiplier,
  } = config;

  return (
    (60 / recipe_cycle_time_second) *
    facility_speed_multiplier *
    proliferator_speed_multiplier
  );
};

const computeFacilitiesPerBelt = (
  belt_flowrate_per_minute: number,
  item_flowrate_per_minute: number,
): number => {
  const supportable: number = Math.floor(
    belt_flowrate_per_minute / item_flowrate_per_minute,
  );

  return supportable;
};

export const computeFacilitiesPerArray = (
  config: Configuration,
  preferences: Preferences,
  // facility: Facility,
  // recipe: Recipe,
  // proliferator: Proliferator,
  // input_flowrate_per_minute: number,
  // output_flowrate_per_minute: number,
): number => {
  const {
    recipe_material_ratios,
    recipe_product_ratios,
    input_flowrate_per_second,
    output_flowrate_per_second,
    proliferator_product_multiplier,
  } = config;

  const input_flowrate_per_minute = input_flowrate_per_second * 60;
  const output_flowrate_per_minute = output_flowrate_per_second * 60;

  const cycles_per_minute = computeCyclesPerMinute(config);

  const input_limiting_item =
    Math.max(...Object.values(recipe_material_ratios)) *
    cycles_per_minute;

  const input_supportable: number = computeFacilitiesPerBelt(
    input_flowrate_per_minute,
    input_limiting_item,
  );

  const output_limiting_item =
    Math.max(...Object.values(recipe_product_ratios)) *
    cycles_per_minute *
    proliferator_product_multiplier;

  let output_supportable: number = computeFacilitiesPerBelt(
    output_flowrate_per_minute,
    output_limiting_item,
  );

  if (
    preferences.keepBeltUnderMaxFlow &&
    output_supportable > 1 &&
    output_supportable * output_limiting_item >=
      output_flowrate_per_minute
  ) {
    output_supportable = output_supportable - 1;
  }

  const facilities_per_array: number = Math.min(
    input_supportable,
    output_supportable,
  );
  if (
    preferences.preferEven &&
    facilities_per_array > 2 &&
    facilities_per_array % 2 === 1
  ) {
    return facilities_per_array - 1;
  }
  return facilities_per_array;
};

export const computeFacilitiesNeeded = (
  objectives: Record<string, number>,
  config: Configuration,
  // facility: Facility,
  // recipe: Recipe,
  // prolfierator: Proliferator,
): number => {
  if (Object.values(objectives).every((demand) => demand === 0)) {
    return 0;
  }

  const { proliferator_product_multiplier, recipe_product_ratios } =
    config;

  const cycles_per_minute = computeCyclesPerMinute(config);

  return Math.max(
    ...Object.keys(objectives).map((key) => {
      return Math.ceil(
        objectives[key] /
          (recipe_product_ratios[key] *
            cycles_per_minute *
            proliferator_product_multiplier),
      );
    }),
  );
};

export const computeIdlePowerPerFacility = (
  config: Configuration,
  // facility: Facility,
  // recipe: Recipe,
  // sorter: Sorter,
): number => {
  const {
    facility_idle_consumption_MW,
    sorter_idle_consumption_MW,
    recipe_material_ratios,
    recipe_product_ratios,
  } = config;

  const sorter_consumption =
    sorter_idle_consumption_MW *
    (Object.values(recipe_material_ratios).length +
      Object.values(recipe_product_ratios).length);

  return sorter_consumption + facility_idle_consumption_MW;
};

export const computeWorkPowerPerFacility = (
  config: Configuration,
  // facility: Facility,
  // recipe: Recipe,
  // proliferator: Proliferator,
  // sorter: Sorter,
): number => {
  const {
    recipe_material_ratios,
    recipe_product_ratios,
    sorter_work_consumption_MW,
    facility_work_consumption_MW,
    proliferator_work_consumption_multiplier,
  } = config;

  const sorter_consumption =
    sorter_work_consumption_MW *
    (Object.values(recipe_material_ratios).length +
      Object.values(recipe_product_ratios).length);
  const facility_consumption =
    facility_work_consumption_MW *
    proliferator_work_consumption_multiplier;

  return sorter_consumption + facility_consumption;
};

export const computeBillMaterialsPerFacility = (
  config: Configuration,
): { [K: string]: number } => {
  const { recipe_material_ratios } = config;

  const bill: { [K: string]: number } = {};

  const cycles_per_minute: number = computeCyclesPerMinute(config);

  Object.entries(recipe_material_ratios).forEach((entry) => {
    const [key, value] = entry;
    bill[key] = value * cycles_per_minute;
  });

  return bill;
};

export const computeBillProductsPerFacility = (
  config: Configuration,
): { [K: string]: number } => {
  const { recipe_product_ratios, proliferator_product_multiplier } =
    config;

  const bill: { [K: string]: number } = {};
  const cycles_per_minute: number = computeCyclesPerMinute(config);

  Object.entries(recipe_product_ratios).forEach((entry) => {
    const [key, value] = entry;
    bill[key] =
      value * cycles_per_minute * proliferator_product_multiplier;
  });

  return bill;
};
