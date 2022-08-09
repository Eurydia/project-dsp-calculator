import { RecipeType } from "../../enums";
import { Recipe, BOM } from "../../types";
import { makeRecipe } from "./_base";

const makeSmeltingRecipe = (
  label: string,
  cycle_time: number,
  material: BOM,
  product: BOM,
  speedup_only: boolean = false,
): Recipe => {
  return makeRecipe(
    label,
    cycle_time,
    material,
    product,
    RecipeType.REFINING_FACILITY,
    speedup_only,
  );
};

const RECIPES = [
  makeSmeltingRecipe(
    "plasma refining",
    4,
    { "crude oil": 2 },
    { "hydrogen": 1, "refined oil": 2 },
  ),
  makeSmeltingRecipe(
    "x-ray cracking",
    4,
    { "refined oil": 1, "hydrogen": 2 },
    { graphite: 1, hydrogen: 3 },
    true,
  ),
  makeSmeltingRecipe(
    "reforming refine",
    4,
    { "hydrogen": 1, "coal": 1, "refined oil": 2 },
    { "refined oil": 3 },
    true,
  ),
];

export default RECIPES;
