import {
  Recipe,
  Facility,
  Sorter,
  BOM,
  Proliferator,
} from "../types";

/**
 * Create `Proliferator` object from given bonus and level.
 * @param prolif_level Can be 0 to 3.
 * @param prolif_mode Can be either 0 or 1.
 * @returns
 */
export const get_prolif = (
  prolif_level: number,
  prolif_mode: number,
): Proliferator => {
  let work_consumption_multiplier = 1;
  let product_multiplier = 1;
  let speedup_multiplier = 1;
  //  power consumption
  switch (prolif_level) {
    case 1:
      work_consumption_multiplier = 1.3;
      break;
    case 2:
      work_consumption_multiplier = 1.7;
      break;
    case 3:
      work_consumption_multiplier = 2.5;
      break;
  }
  /**
   * 0 for extra products and
   * 1 for production speedup.
   */
  if (prolif_mode === 0) {
    switch (prolif_level) {
      case 1:
        product_multiplier = 1.125;
        break;
      case 2:
        product_multiplier = 1.2;
        break;
      case 3:
        product_multiplier = 1.25;
        break;
    }
  } else {
    switch (prolif_level) {
      case 1:
        speedup_multiplier = 1.25;
        break;
      case 2:
        speedup_multiplier = 1.5;
        break;
      case 3:
        speedup_multiplier = 2;
        break;
    }
  }

  return {
    work_consumption_multiplier,
    product_multiplier,
    speedup_multiplier,
  };
};
/**
 * Calculate cycles performed in one minute.
 * @param facility
 * @param recipe
 * @param proliferator
 * @returns
 */
const get_cycle_per_minute = (
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
/**
 * Calculate the maximal number of facility that
 * the given belt can support.
 * @param item_volume Items that needed to be transported per minute.
 * @param belt_volume Items that can be transported per minute.
 * @param keep_belt_under_max If true,
 * remove facilities until belt volume is under 100%.
 * @returns
 */
const get_supportable_facility = (
  item_volume: number,
  belt_volume: number,
  keep_belt_under_max: boolean,
): number => {
  let res = Math.floor(belt_volume / item_volume);

  if (keep_belt_under_max) {
    while (res > 0 && res * item_volume >= belt_volume) {
      res -= 1;
    }
  }
  return res;
};
/**
 * Calculate maximal number of facilities from
 * given input and output capacities.
 * @param facility
 * @param recipe
 * @param proliferator
 * @param input_belt_volume items transported per second.
 * @param output_belt_volume items transported per second.
 * @param keep_belt_under_max passed to `get_supportable_facility`
 * @param prefer_even if `true`, return even result.
 * @returns
 */
export const calculate_n_facility_from_flow_rate = (
  facility: Facility,
  recipe: Recipe,
  proliferator: Proliferator,
  input_belt_volume: number,
  output_belt_volume: number,
  keep_belt_under_max: boolean,
  prefer_even: boolean,
): number => {
  const cycle_per_minute = get_cycle_per_minute(
    facility,
    recipe,
    proliferator,
  );

  const input_limiting_volume =
    Math.max(...Object.values(recipe.material)) * cycle_per_minute;
  /**
   * Max facilities input belt can support.
   */
  const input_res = get_supportable_facility(
    input_limiting_volume,
    input_belt_volume * 60,
    keep_belt_under_max,
  );

  const output_limiting_volume =
    Math.max(...Object.values(recipe.product)) *
    cycle_per_minute *
    proliferator.product_multiplier;
  /**
   * Max facilites output belt can support.
   */
  const output_res = get_supportable_facility(
    output_limiting_volume,
    output_belt_volume * 60,
    keep_belt_under_max,
  );

  let res = Math.min(input_res, output_res);
  if (prefer_even && res % 2 === 1) {
    res -= 1;
  }
  return res;
};

/**
 * Calculate material demand per minute from
 * given number of facility.
 * @param n_facility Number of facilities.
 * @param facility
 * @param recipe
 * @param proliferator
 * @returns
 */
export const calculate_material_per_minute = (
  n_facility: number,
  facility: Facility,
  recipe: Recipe,
  proliferator: Proliferator,
): BOM => {
  const cycle_per_minute = get_cycle_per_minute(
    facility,
    recipe,
    proliferator,
  );

  const material = recipe.material;
  const res: BOM = {};
  for (const key of Object.keys(material)) {
    const ratio_per_cycle = material[key];

    res[key] = ratio_per_cycle * cycle_per_minute * n_facility;
  }

  return res;
};
/**
 * Calculate products produce per minute from
 * given number of facility.
 * @param n_facility Number of facilities.
 * @param facility
 * @param recipe
 * @param proliferator
 * @returns
 */
export const calculate_product_per_minute = (
  n_facility: number,
  facility: Facility,
  recipe: Recipe,
  proliferator: Proliferator,
): BOM => {
  const cycle_per_minute = get_cycle_per_minute(
    facility,
    recipe,
    proliferator,
  );

  const product = recipe.product;
  const res: BOM = {};
  for (const key of Object.keys(product)) {
    const ratio_per_cycle = product[key];

    res[key] =
      n_facility *
      ratio_per_cycle *
      cycle_per_minute *
      proliferator.product_multiplier;
  }

  return res;
};
/**
 * Calculate work power consumption in MW from
 * given number of facilities.
 * @param n_facility Number of facilities.
 * @param facility
 * @param recipe
 * @param proliferator
 * @param sorter If not `null`, also count consumption by sorters.
 * @returns
 */
export const calculate_work_consumption = (
  n_facility: number,
  facility: Facility,
  recipe: Recipe,
  proliferator: Proliferator,
  sorter: Sorter | null,
): number => {
  let sorter_consumption = 0;
  if (sorter !== null) {
    const nsorters =
      n_facility *
      (Object.keys(recipe.material).length +
        Object.keys(recipe.product).length);

    sorter_consumption = nsorters * sorter.work_consumption;
  }

  const facility_consumption =
    n_facility *
    proliferator.work_consumption_multiplier *
    facility.work_consumption;

  return parseFloat(
    (sorter_consumption + facility_consumption).toFixed(3),
  );
};
/**
 * Calculate idle power consumption in MW from
 * given number of facilities.
 * @param n_facility Number of facilities.
 * @param facility
 * @param recipe
 * @param sorter If not `null`, also count consumption by sorters.
 * @returns
 */
export const calculate_idle_consumption = (
  n_facility: number,
  facility: Facility,
  recipe: Recipe,
  sorter: Sorter | null,
): number => {
  let sorter_consumption = 0;
  if (sorter !== null) {
    const nsorter =
      n_facility *
      (Object.keys(recipe.material).length +
        Object.keys(recipe.product).length);

    sorter_consumption = nsorter * sorter.idle_consumption;
  }

  const facility_consumption = n_facility * facility.idle_consumption;

  return parseFloat(
    (sorter_consumption + facility_consumption).toFixed(3),
  );
};
/**
 * Calculate the number of facilities needed to satisfy
 * given production target.
 * @param facility
 * @param recipe
 * @param proliferator
 * @param production_target_obj
 * @returns
 */
export const calculate_n_facility_needed = (
  facility: Facility,
  recipe: Recipe,
  proliferator: Proliferator,
  production_target_obj: { [key: string]: string },
) => {
  const product_per_facility_per_minute =
    calculate_product_per_minute(1, facility, recipe, proliferator);

  let facility_needed = 0;
  /**
   * For each products produced in the recipe,
   * calculate the number of facilities needed.
   *
   * Some of them will be `NaN`, in that case
   * assumes target production to be 0 per minute.
   */
  for (const key of Object.keys(production_target_obj)) {
    const prodcution_taget = parseInt(production_target_obj[key]);

    let current_needed = 0;
    if (!isNaN(prodcution_taget)) {
      current_needed = Math.ceil(
        prodcution_taget / product_per_facility_per_minute[key],
      );
    }

    if (current_needed > facility_needed) {
      facility_needed = current_needed;
    }
  }
  return facility_needed;
};
