import { Recipe, RecipeEnum, ItemEnum } from "../../types";

const makeChemicalRecipe = (
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
    RecipeEnum.CHEMICAL_FACILITY,
    speedup_only,
  );
};

export const G_CHEMICAL: Recipe[] = [
  makeChemicalRecipe(
    "Plastic",
    3,
    { [ItemEnum.GRAPHENE]: 1, [ItemEnum.REFINED_OIL]: 2 },
    { [ItemEnum.PLASTIC]: 1 },
  ),
  makeChemicalRecipe(
    "Graphene",
    3,
    { [ItemEnum.SULFURIC_ACID]: 1, [ItemEnum.GRAPHITE]: 3 },
    { [ItemEnum.GRAPHENE]: 2 },
  ),
  makeChemicalRecipe(
    "Organic Crystal",
    6,
    {
      [ItemEnum.WATER]: 1,
      [ItemEnum.REFINED_OIL]: 1,
      [ItemEnum.PLASTIC]: 2,
    },
    { [ItemEnum.ORGANIC_CRYSTAL]: 1 },
  ),
  makeChemicalRecipe(
    "Graphene (advanced)",
    2,
    { [ItemEnum.FIRE_ICE]: 2 },
    { [ItemEnum.HYDROGEN]: 1, [ItemEnum.GRAPHENE]: 2 },
  ),
  makeChemicalRecipe(
    "Sulfuric Acid",
    6,
    {
      [ItemEnum.WATER]: 4,
      [ItemEnum.REFINED_OIL]: 6,
      [ItemEnum.STONE]: 8,
    },
    { [ItemEnum.SULFURIC_ACID]: 4 },
  ),
  makeChemicalRecipe(
    "Carbon Nanotube",
    4,
    { [ItemEnum.TITANIUM_INGOT]: 1, [ItemEnum.GRAPHENE]: 3 },
    { [ItemEnum.CARBON_NANOTUBE]: 2 },
  ),
  makeChemicalRecipe(
    "Carbon Nanotube (advanced)",
    4,
    { [ItemEnum.SPINIFORM_STALAGMITE_CRYSTAL]: 6 },
    { [ItemEnum.CARBON_NANOTUBE]: 2 },
  ),
];
