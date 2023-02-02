import { GroupEnumRecipe } from "../recipes";

const FACILITY_TABLE: { [K: string]: Facility } = {};

export type Facility = Readonly<{
  label: string;
  speedup_multiplier: number;
  work_consumption: number;
  idle_consumption: number;
  recipe_type: GroupEnumRecipe;
}>;

export const Facility = {
  fromLabel: (label: string): Facility | null => {
    if (label in FACILITY_TABLE) {
      return FACILITY_TABLE[label];
    }
    return null;
  },

  toString: (facility: Facility): string => {
    return JSON.stringify(facility.label);
  },

  register: (facility: Facility): void => {
    const { label } = facility;
    FACILITY_TABLE[label] = facility;
  },

  create: (
    label: string,
    speedup_multiplier: number,
    work_consumption: number,
    idle_consumption: number,
    recipe_type: GroupEnumRecipe,
  ): Facility => {
    const new_facility: Facility = {
      label,
      speedup_multiplier,
      work_consumption,
      idle_consumption,
      recipe_type,
    };
    Facility.register(new_facility);
    return new_facility;
  },
};
