import { Recipe } from "../../types/assets/recipe/recipe";
import {
  RecipeEnum,
  ItemEnum,
} from "../../types/assets/recipe/enums";

const makeRefiningRecipe = (
  label: string,
  cycle_time: number,
  materials: { [K: string]: number },
  products: { [K: string]: number },
  speedup_only: boolean = false,
): Recipe => {
  return Recipe.create(
    label,
    cycle_time,
    materials,
    products,
    RecipeEnum.REFINING_FACILITY,
    speedup_only,
  );
};

export const G_REFINING: Recipe[] = [
  makeRefiningRecipe(
    "Plasma Refining",
    4,
    { [ItemEnum.CRUDE_OIL]: 2 },
    { [ItemEnum.HYDROGEN]: 1, [ItemEnum.REFINED_OIL]: 2 },
  ),
  makeRefiningRecipe(
    "X-Ray Cracking",
    4,
    { [ItemEnum.REFINED_OIL]: 1, [ItemEnum.HYDROGEN]: 2 },
    { [ItemEnum.GRAPHITE]: 1, [ItemEnum.HYDROGEN]: 3 },
    true,
  ),
  makeRefiningRecipe(
    "Reforming Refine",
    4,
    {
      [ItemEnum.HYDROGEN]: 1,
      [ItemEnum.COAL]: 1,
      [ItemEnum.REFINED_OIL]: 2,
    },
    { [ItemEnum.REFINED_OIL]: 3 },
    true,
  ),
];
