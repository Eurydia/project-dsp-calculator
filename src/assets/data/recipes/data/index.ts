import { Recipe } from "../recipe";
import { G_SMELTING } from "./g_smelting";
import { G_ASSEMBLER } from "./g_assembler";
import { G_REFINING } from "./g_refining";
import { G_CHEMICAL } from "./g_chemical";
import { G_PARTICLE } from "./g_particle";
import { G_RESEARCH } from "./g_research";

export const AssetRecipes: Recipe[] = [
  ...G_SMELTING,
  ...G_ASSEMBLER,
  ...G_REFINING,
  ...G_CHEMICAL,
  ...G_PARTICLE,
  ...G_RESEARCH,
];
