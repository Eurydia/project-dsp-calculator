import { Recipe } from "../recipe";
import { GroupEnumRecipe, ItemEnum } from "../enums";

const makeSmeltingRecipe = (
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
    GroupEnumRecipe.SMELTING_FACILITY,
    speedup_only,
  );
};

export const G_SMELTING: Recipe[] = [
  makeSmeltingRecipe(
    "Iron Ingot",
    1,
    { [ItemEnum.IRON_ORE]: 1 },
    { [ItemEnum.IRON_INGOT]: 1 },
  ),
  makeSmeltingRecipe(
    "Copper Ingot",
    1,
    { [ItemEnum.COPPER_ORE]: 1 },
    { [ItemEnum.COPPER_INGOT]: 1 },
  ),
  makeSmeltingRecipe(
    "High-Purity Silicon",
    2,
    { [ItemEnum.SILICON_ORE]: 2 },
    { [ItemEnum.HIGH_PURITY_SILICON]: 1 },
  ),
  makeSmeltingRecipe(
    "Titanium Ingot",
    2,
    { [ItemEnum.TITANIUM_ORE]: 2 },
    { [ItemEnum.TITANIUM_INGOT]: 1 },
  ),
  makeSmeltingRecipe(
    "Stone Brick",
    1,
    { [ItemEnum.STONE]: 1 },
    { [ItemEnum.STONE_BRICK]: 1 },
  ),
  makeSmeltingRecipe(
    "Graphite",
    2,
    { [ItemEnum.COAL]: 2 },
    { [ItemEnum.GRAPHITE]: 1 },
  ),
  makeSmeltingRecipe(
    "Magnet",
    1.5,
    { [ItemEnum.IRON_ORE]: 1 },
    { [ItemEnum.MAGNET]: 1 },
  ),
  makeSmeltingRecipe(
    "Titanium Alloy",
    12,
    {
      [ItemEnum.TITANIUM_INGOT]: 4,
      [ItemEnum.STEEL]: 4,
      [ItemEnum.SULFURIC_ACID]: 8,
    },
    { [ItemEnum.TITANIUM_ALLOY]: 4 },
  ),
  makeSmeltingRecipe(
    "Glass",
    2,
    { [ItemEnum.STONE]: 2 },
    { [ItemEnum.GLASS]: 1 },
  ),
  makeSmeltingRecipe(
    "Diamond",
    2,
    { [ItemEnum.GRAPHITE]: 2 },
    { [ItemEnum.DIAMOND]: 1 },
  ),
  makeSmeltingRecipe(
    "Steel",
    3,
    { [ItemEnum.IRON_INGOT]: 3 },
    { [ItemEnum.STEEL]: 1 },
  ),
  makeSmeltingRecipe(
    "Diamond (advanced)",
    1.5,
    { [ItemEnum.KIMBERLITE_ORE]: 1 },
    { [ItemEnum.DIAMOND]: 2 },
  ),
  makeSmeltingRecipe(
    "Silicon Ore",
    10,
    { [ItemEnum.STONE]: 10 },
    { [ItemEnum.SILICON_ORE]: 1 },
  ),
];
