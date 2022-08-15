import { Recipe } from "../../../types";
import SMELTING_RECIPES from "./smelting_facility";
import ASSEMBLER_RECIPE from "./assembler";
import REFINING_RECIPES from "./refining_facility";
import CHEMICAL_RECIPES from "./chemical_facility";
import PARTICLE_COLLIDER_RECIPES from "./particle_collider";
import RESEARCH_RECIPES from "./research_facility";

const RECIPES: Recipe[] = [
  ...SMELTING_RECIPES,
  ...ASSEMBLER_RECIPE,
  ...REFINING_RECIPES,
  ...CHEMICAL_RECIPES,
  ...PARTICLE_COLLIDER_RECIPES,
  ...RESEARCH_RECIPES,
];

export default RECIPES;
