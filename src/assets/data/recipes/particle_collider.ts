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
    RecipeType.PARTICLE_COLLIDER,
    speedup_only,
  );
};

const RECIPES = [
  makeSmeltingRecipe(
    "strange matter",
    8,
    { "particle container": 2, "iron ingot": 2, "deuterium": 10 },
    { "strange matter": 1 },
  ),
  makeSmeltingRecipe(
    "deuterium",
    2.5,
    { hydrogen: 10 },
    { deuterium: 5 },
    true,
  ),
  makeSmeltingRecipe(
    "mass-energy storage",
    2,
    { "critical photon": 2 },
    { hydrogen: 2, antimatter: 2 },
    true,
  ),
];

export default RECIPES;
