import { Recipe, BOM } from "../recipe";
import { GroupEnumRecipe, ItemEnum } from "../GroupEnums";

const makeRefiningRecipe = (
  label: string,
  cycle_time: number,
  material: BOM,
  product: BOM,
  speedup_only: boolean = false,
): Recipe => {
  return Recipe.create(
    label,
    cycle_time,
    material,
    product,
    GroupEnumRecipe.REFINING_FACILITY,
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
