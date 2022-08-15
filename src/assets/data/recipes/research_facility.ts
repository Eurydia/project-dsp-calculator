import { RecipeType } from "../../../enums";
import { Recipe, BOM } from "../../../types";
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
    RecipeType.RESEARCH_FACILITY,
    speedup_only,
  );
};

const RECIPES = [
  makeSmeltingRecipe(
    "electromagnetic matrix",
    3,
    { "circuit board": 1, "magnetic coil": 1 },
    { "electromagnetic matrix": 1 },
  ),
  makeSmeltingRecipe(
    "energy matrix",
    6,
    { hydrogen: 2, graphite: 2 },
    { "energy matrix": 1 },
  ),
  makeSmeltingRecipe(
    "structure matrix",
    8,
    { "diamond": 1, "titanium crystal": 1 },
    { "structure matrix": 1 },
  ),
  makeSmeltingRecipe(
    "information matrix",
    10,
    { "particle broadband": 1, "processor": 2 },
    { "information matrix": 1 },
  ),
  makeSmeltingRecipe(
    "gravity matrix",
    10,
    { "graviton lens": 1, "quantum chip": 1 },
    { "gravity matrix": 2 },
  ),
  makeSmeltingRecipe(
    "universe matrix",
    15,
    {
      "electromagnetic matrix": 1,
      "energy matrix": 1,
      "structure matrix": 1,
      "information matrix": 1,
      "gravity matrix": 1,
      "antimatter": 1,
    },
    { "universe matrix": 1 },
  ),
];

export default RECIPES;
