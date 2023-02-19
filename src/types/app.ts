import { Facility, Proliferator, Recipe, Sorter } from "../assets";

export type Preferences = {
  preferEven: boolean;
  keepBeltUnderMaxFlow: boolean;
};

export const Preferences = {
  create: (): Preferences => {
    return {
      preferEven: true,
      keepBeltUnderMaxFlow: true,
    };
  },
};

export type Configuration = {
  facility: Facility;
  recipe: Recipe;
  sorter: Sorter;
  proliferator: Proliferator;
  input_flowrate_per_second: number;
  output_flowrate_per_second: number;
};
