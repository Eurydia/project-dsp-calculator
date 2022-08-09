import { Recipe } from "../../types";
import SMELTING_RECIPES from "./smelting_facility";
import ASSEMBLER_RECIPE from "./assembler";
import REFINING_RECIPES from "./refining_facility";
import CHEMICAL_RECIPES from "./chemical_facility";
import PARTICLE_COLLIDER_RECIPES from "./particle_collider";
import RESEARCH_RECIPES from "./research_facility";

const sortByAlphabet = (a: Recipe, b: Recipe): number => {
  if (a.label > b.label) {
    return 1;
  } else if (a.label < b.label) {
    return -1;
  }
  return 0;
};

const RECIPES = [
  ...SMELTING_RECIPES.sort(sortByAlphabet),
  ...ASSEMBLER_RECIPE.sort(sortByAlphabet),
  ...REFINING_RECIPES.sort(sortByAlphabet),
  ...CHEMICAL_RECIPES.sort(sortByAlphabet),
  ...PARTICLE_COLLIDER_RECIPES.sort(sortByAlphabet),
  ...RESEARCH_RECIPES.sort(sortByAlphabet),
];

export default RECIPES;
