import { Recipe, Facility, Sorter, BOM, Proliferator } from "./types";

export const get_prolif = (
  prolif_level: number,
  prolif_effect: number,
): Proliferator => {
  let work_consumption_multiplier = 1;
  let product_multiplier = 1;
  let cycle_multiplier = 1;

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

  if (prolif_effect === 0) {
    // extra product
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
    // production speed up
    switch (prolif_level) {
      case 1:
        cycle_multiplier = 1.25;
        break;
      case 2:
        cycle_multiplier = 1.5;
        break;
      case 3:
        cycle_multiplier = 2;
        break;
    }
  }

  return {
    work_consumption_multiplier,
    product_multiplier,
    speedup_multiplier: cycle_multiplier,
  };
};
const get_cycle_per_minute = (
  f: Facility,
  r: Recipe,
  p: Proliferator,
): number => {
  return (
    (60 / r.cycle_time) * f.speedup_multiplier * p.speedup_multiplier
  );
};

const get_max_facility = (
  limiter_per_minute: number,
  flow_rate_per_min: number,
  keep_belt_under_max: boolean,
): number => {
  let nfacility = Math.floor(flow_rate_per_min / limiter_per_minute);

  if (keep_belt_under_max) {
    while (
      nfacility > 0 &&
      nfacility * limiter_per_minute >= flow_rate_per_min
    ) {
      nfacility -= 1;
    }
  }

  return nfacility;
};

export const calculate_max_facility = (
  f: Facility,
  r: Recipe,
  p: Proliferator,
  input_flowrate: number,
  output_flowrate: number,
  keep_belt_under_max: boolean,
  prefer_even: boolean,
): number => {
  if (isNaN(input_flowrate) || isNaN(output_flowrate)) {
    return 0;
  }

  const cycle_per_minute = get_cycle_per_minute(f, r, p);

  const input_limiter_per_minute =
    Math.max(...Object.values(r.material)) * cycle_per_minute;

  const nfacility_input = get_max_facility(
    input_limiter_per_minute,
    input_flowrate * 60,
    keep_belt_under_max,
  );

  const output_limiter_per_minute =
    Math.max(...Object.values(r.product)) *
    cycle_per_minute *
    p.product_multiplier;

  const nfacility_output = get_max_facility(
    output_limiter_per_minute,
    output_flowrate * 60,
    keep_belt_under_max,
  );

  let res = Math.min(nfacility_input, nfacility_output);
  if (prefer_even && res % 2 === 1) {
    res -= 1;
  }
  return res;
};

export const calculate_material_per_minute = (
  nfacility: number,
  f: Facility,
  r: Recipe,
  p: Proliferator,
): BOM => {
  const cycle_per_minute = get_cycle_per_minute(f, r, p);

  const material = r.material;
  const res: BOM = {};
  for (const key of Object.keys(material)) {
    const val = material[key];

    res[key] = val * nfacility * cycle_per_minute;
  }

  return res;
};

export const calculate_product_per_minute = (
  nfacility: number,
  f: Facility,
  r: Recipe,
  p: Proliferator,
): BOM => {
  const cycle_per_minute = get_cycle_per_minute(f, r, p);

  const product = r.product;
  const res: BOM = {};
  for (const key of Object.keys(product)) {
    const val = product[key];

    res[key] =
      val * nfacility * cycle_per_minute * p.product_multiplier;
  }

  return res;
};

export const calculate_work_consumption = (
  nfacility: number,
  f: Facility,
  r: Recipe,
  s: Sorter,
  p: Proliferator,
  count_sorter: boolean,
): number => {
  let sorter_consumption = 0;
  if (count_sorter) {
    const nsorters =
      nfacility *
      (Object.keys(r.material).length +
        Object.keys(r.product).length);

    sorter_consumption = nsorters * s.work_consumption;
  }

  const facility_consumption =
    nfacility * p.work_consumption_multiplier * f.work_consumption;

  return parseFloat(
    (sorter_consumption + facility_consumption).toFixed(3),
  );
};

export const calculate_idle_consumption = (
  nfacility: number,
  f: Facility,
  r: Recipe,
  s: Sorter,
  count_sorters: boolean,
): number => {
  let sorter_consumption = 0;
  if (count_sorters) {
    const nsorter =
      nfacility *
      (Object.keys(r.material).length +
        Object.keys(r.product).length);

    sorter_consumption = nsorter * s.idle_consumption;
  }

  const facility_consumption = nfacility * f.idle_consumption;

  return parseFloat(
    (sorter_consumption + facility_consumption).toFixed(3),
  );
};
