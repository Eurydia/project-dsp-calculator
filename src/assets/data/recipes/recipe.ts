import { GroupEnumRecipe, ItemEnum } from "./GroupEnums";

export type BOM = Partial<{
  [K in ItemEnum]: number;
}>;

export type Recipe = {
  label: string;
  cycle_time: number;
  material: BOM;
  product: BOM;
  recipe_type: GroupEnumRecipe;
  speedup_only: boolean;
};

export const Recipe = {
  create: (
    label: string,
    cycle_time: number,
    material: BOM,
    product: BOM,
    recipe_type: GroupEnumRecipe,
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
  },
};
