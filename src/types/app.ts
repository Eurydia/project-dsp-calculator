export type Preferences = {
  preferEven: boolean;
  keepBeltUnderMaxFlow: boolean;
  disableRounding: boolean;
};

export const Preferences = {
  create: (): Preferences => {
    return {
      preferEven: true,
      keepBeltUnderMaxFlow: true,
      disableRounding: false,
    };
  },
};

export type Configuration = {
  facility_speed_multiplier: number;
  facility_work_consumption_MW: number;
  facility_idle_consumption_MW: number;

  recipe_cycle_time_second: number;
  recipe_material_ratios: Record<string, number>;
  recipe_product_ratios: Record<string, number>;

  sorter_work_consumption_MW: number;
  sorter_idle_consumption_MW: number;

  proliferator_speed_multiplier: number;
  proliferator_product_multiplier: number;
  proliferator_work_consumption_multiplier: number;

  input_flowrate_per_minute: number;
  output_flowrate_per_minute: number;
};

export const Configuration = {
  create: (): Configuration => {
    return {
      facility_speed_multiplier: 1,
      facility_work_consumption_MW: 0,
      facility_idle_consumption_MW: 0,

      recipe_cycle_time_second: 1,
      recipe_material_ratios: {},
      recipe_product_ratios: {},

      sorter_work_consumption_MW: 0,
      sorter_idle_consumption_MW: 0,

      proliferator_product_multiplier: 1,
      proliferator_speed_multiplier: 1,
      proliferator_work_consumption_multiplier: 1,

      input_flowrate_per_minute: 6,
      output_flowrate_per_minute: 6,
    };
  },
};
