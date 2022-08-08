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
    RecipeType.SMELTING_FACILITY,
    speedup_only,
  );
};

const RECIPES = [
  makeSmeltingRecipe(
    "iron ingot",
    1,
    { "iron ore": 1 },
    { "iron ingot": 1 },
  ),
  makeSmeltingRecipe(
    "copper ingot",
    1,
    { "copper ore": 1 },
    { "copper ingot": 1 },
  ),
  makeSmeltingRecipe(
    "high-purity silicon",
    2,
    { "silicon ore": 2 },
    { "high-purity silicon": 1 },
  ),
  makeSmeltingRecipe(
    "titanium ingot",
    2,
    { "titanium ore": 2 },
    { "titanium ingot": 1 },
  ),
  makeSmeltingRecipe(
    "stone brick",
    1,
    { stone: 1 },
    { "stone brick": 1 },
  ),
  makeSmeltingRecipe("graphite", 2, { coal: 2 }, { graphite: 1 }),
  makeSmeltingRecipe("magnet", 1.5, { "iron ore": 1 }, { magnet: 1 }),
  makeSmeltingRecipe(
    "titanium alloy",
    12,
    { "titanium ingot": 4, "steel": 4, "sulfuric acid": 8 },
    { "titanium alloy": 4 },
  ),
  makeSmeltingRecipe("glass", 2, { stone: 2 }, { glass: 1 }),
  makeSmeltingRecipe("diamond", 2, { graphite: 2 }, { diamond: 1 }),
  makeSmeltingRecipe("steel", 3, { "iron ingot": 3 }, { steel: 1 }),
  makeSmeltingRecipe(
    "diamond (advanced)",
    1.5,
    { "kimberlite ore": 1 },
    { diamond: 2 },
  ),
  makeSmeltingRecipe(
    "silicon ore",
    10,
    { stone: 10 },
    { "silicon ore": 1 },
  ),
];

export default RECIPES;
