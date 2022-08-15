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
    RecipeType.CHEMICAL_FACILITY,
    speedup_only,
  );
};

const RECIPES = [
  makeSmeltingRecipe(
    "plastic",
    3,
    { "graphite": 1, "refined oil": 2 },
    { plastic: 1 },
  ),
  makeSmeltingRecipe(
    "graphene",
    3,
    { "sulfuric acid": 1, "graphite": 3 },
    { graphene: 2 },
  ),
  makeSmeltingRecipe(
    "organic crystal",
    6,
    { "water": 1, "refined oil": 1, "plastic": 2 },
    { "organic crystal": 1 },
  ),
  makeSmeltingRecipe(
    "graphene (advanced)",
    2,
    { "fire ice": 2 },
    { hydrogen: 1, graphene: 2 },
  ),
  makeSmeltingRecipe(
    "sulfuric acid",
    6,
    { "water": 4, "refined oil": 6, "stone": 8 },
    { "sulfuric acid": 4 },
  ),
  makeSmeltingRecipe(
    "carbon nanotube",
    4,
    { "titanium ingot": 1, "graphene": 3 },
    { "carbon nanotube": 2 },
  ),
  makeSmeltingRecipe(
    "carbon nanotube (advanced)",
    4,
    { "spiniform stalagmaite crystal": 6 },
    { "carbon nanotube": 2 },
  ),
];

export default RECIPES;
