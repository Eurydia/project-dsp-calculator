import { GroupEnumRecipe, ItemEnum } from "./GroupEnums";

const LOOKUP_RECIPES: { [K: string]: Recipe } = {};

export type BOM = Partial<{
  [K: string]: number;
}>;

export type Recipe = Readonly<{
  label: string;
  cycle_time: number;
  materials: BOM;
  products: BOM;
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
    material: BOM,
    product: BOM,
    recipe_type: GroupEnumRecipe,
    speedup_only: boolean = false,
  ): Recipe => {
    const recipe: Recipe = {
      label,
      cycle_time,
      materials: material,
      products: product,
      recipe_type,
      speedup_only,
    };
    LOOKUP_RECIPES[label] = recipe;
    return recipe;
  },
};
