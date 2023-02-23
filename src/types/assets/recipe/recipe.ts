import { RecipeEnum } from "./enums";

const RECIPE_TABLE: Record<string, Recipe> = {};

export type Recipe = Readonly<{
  label: string;
  cycle_time: number;
  materials: { [K: string]: number };
  products: { [K: string]: number };
  recipe_type: RecipeEnum;
  speedup_only: boolean;
}>;

export const Recipe = {
  fromLabel: (label: string): Recipe | null => {
    if (label in RECIPE_TABLE) {
      return RECIPE_TABLE[label];
    }
    return null;
  },

  toJSON: (recipe: Recipe): string => {
    return JSON.stringify(recipe);
  },

  register: (recipe: Recipe) => {
    const { label } = recipe;
    RECIPE_TABLE[label] = recipe;
  },

  create: (
    label: string,
    cycle_time: number,
    materials: { [K: string]: number },
    products: { [K: string]: number },
    recipe_type: RecipeEnum,
    speedup_only: boolean,
  ): Recipe => {
    const new_recipe: Recipe = {
      label,
      cycle_time,
      materials: materials,
      products: products,
      recipe_type,
      speedup_only,
    };
    Recipe.register(new_recipe);
    return new_recipe;
  },
};
