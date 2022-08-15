import { RecipeType } from "../../../enums";
import { Recipe, BOM } from "../../../types";

export const makeRecipe = (
  label: string,
  cycle_time: number,
  material: BOM,
  product: BOM,
  recipe_type: RecipeType,
  speedup_only: boolean = false,
): Recipe => {
  return {
    label,
    cycle_time,
    material,
    product,
    recipe_type,
    speedup_only,
  };
};
