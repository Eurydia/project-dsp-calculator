import { GroupEnumRecipe } from "./enums";

const LOOKUP_RECIPES: { [K: string]: Recipe } = {};

export type Recipe = Readonly<{
  label: string;
  cycle_time: number;
  materials: { [K: string]: number };
  products: { [K: string]: number };
  recipe_type: GroupEnumRecipe;
  speedup_only: boolean;
}>;

export const Recipe = {
  fromLabel: (label: string): Recipe | null => {
    if (label in LOOKUP_RECIPES) {
      return LOOKUP_RECIPES[label];
    }
    return null;
  },

  toString: (recipe: Recipe): string => {
    return JSON.stringify(recipe.label);
  },

  create: (
    label: string,
    cycle_time: number,
    materials: { [K: string]: number },
    products: { [K: string]: number },
    recipe_type: GroupEnumRecipe,
    speedup_only: boolean,
  ): Recipe => {
    const recipe: Recipe = {
      label,
      cycle_time,
      materials: materials,
      products: products,
      recipe_type,
      speedup_only,
    };
    LOOKUP_RECIPES[label] = recipe;
    return recipe;
  },
};
