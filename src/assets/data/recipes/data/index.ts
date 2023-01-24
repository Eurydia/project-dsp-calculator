import { Recipe } from "../recipe";
import SMELTING_RECIPES from "./g_smelting";
import ASSEMBLER_RECIPE from "./g_assembler";
import REFINING_RECIPES from "./g_refining";
import CHEMICAL_RECIPES from "./g_chemical";
import PARTICLE_COLLIDER_RECIPES from "./g_particle";
import RESEARCH_RECIPES from "./g_research";

export const RECIPES: Recipe[] = [
  ...SMELTING_RECIPES,
  ...ASSEMBLER_RECIPE,
  ...REFINING_RECIPES,
  ...CHEMICAL_RECIPES,
  ...PARTICLE_COLLIDER_RECIPES,
  ...RESEARCH_RECIPES,
];
