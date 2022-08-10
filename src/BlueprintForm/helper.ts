import {
  Recipe,
  Facility,
  Sorter,
  BOM,
  Proliferator,
} from "../types";

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
    cycle_multiplier,
  };
};
const get_cycle_per_minute = (
  f: Facility,
  r: Recipe,
  p: Proliferator,
): number => {
  return (
    (60 / r.cycle_time) * f.cycle_multiplier * p.cycle_multiplier
  );
};

export const calculate_max_facility = (
  f: Facility,
  r: Recipe,
  p: Proliferator,
  input_flowrate: number,
  output_flowrate: number,
): number => {
  const cycle_per_minute = get_cycle_per_minute(f, r, p);

  const limiting_input =
    Math.max(...Object.values(r.material)) * cycle_per_minute;

  let nfacility_input = Math.floor(
    (input_flowrate * 60) / limiting_input,
  );
  nfacility_input -= Math.floor(
    (nfacility_input * limiting_input) / (input_flowrate * 60),
  );

  const limiting_output =
    Math.max(...Object.values(r.product)) *
    cycle_per_minute *
    p.product_multiplier;

  let nfacility_output = Math.floor(
    (output_flowrate * 60) / limiting_output,
  );

  nfacility_output -= Math.floor(
    (nfacility_output * limiting_output) / (output_flowrate * 60),
  );

  return Math.min(nfacility_input, nfacility_output);
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

export const calculate_max_work_consumption = (
  nfacility: number,
  f: Facility,
  r: Recipe,
  s: Sorter,
  p: Proliferator,
): number => {
  const nsorter =
    nfacility *
    (Object.keys(r.material).length + Object.keys(r.product).length);

  const s_consumption = nsorter * s.work_consumption;

  const f_consumption =
    nfacility * p.work_consumption_multiplier * f.work_consumption;

  return parseFloat((s_consumption + f_consumption).toFixed(3));
};

export const calculate_max_idle_consumption = (
  nfacility: number,
  f: Facility,
  r: Recipe,
  s: Sorter,
): number => {
  const nsorter =
    nfacility *
    (Object.keys(r.material).length + Object.keys(r.product).length);

  const s_consumption = nsorter * s.idle_consumption;

  const f_consumption = nfacility * f.idle_consumption;

  return parseFloat((s_consumption + f_consumption).toFixed(3));
};
