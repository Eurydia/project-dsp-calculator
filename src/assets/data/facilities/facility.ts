import { GroupEnumRecipe } from "../recipes";

const LOOKUP_FACILITIES: { [K: string]: Facility } = {};

export type Facility = Readonly<{
  label: string;
  speedup_multiplier: number;
  work_consumption: number;
  idle_consumption: number;
  recipe_type: GroupEnumRecipe;
}>;

export const Facility = {
  fromLabel: (label: string): Facility | null => {
    if (label in LOOKUP_FACILITIES) {
      return LOOKUP_FACILITIES[label];
    }
    return null;
  },

  toString: (facility: Facility): string => {
    return JSON.stringify(facility.label);
  },

  create: (
    label: string,
    speedup_multiplier: number,
    work_consumption: number,
    idle_consumption: number,
    recipe_type: GroupEnumRecipe,
  ): Facility => {
    const facility: Facility = {
      label,
      speedup_multiplier,
      work_consumption,
      idle_consumption,
      recipe_type,
    };
    LOOKUP_FACILITIES[label] = facility;
    return facility;
  },
};
