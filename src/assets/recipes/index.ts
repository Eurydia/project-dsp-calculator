import { Recipe } from "../../types";
import { G_SMELTING } from "./g_smelting";
import { G_ASSEMBLER } from "./g_assembler";
import { G_REFINING } from "./g_refining";
import { G_CHEMICAL } from "./g_chemical";
import { G_PARTICLE } from "./g_particle";
import { G_RESEARCH } from "./g_research";

const compareAlphabet = <T extends { label: string }>(
  a: T,
  b: T,
): number => {
  if (a.label > b.label) {
    return 1;
  }
  if (a.label < b.label) {
    return -1;
  }
  return 0;
};

export const AssetRecipes: Recipe[] = [
  ...G_SMELTING,
  ...G_ASSEMBLER,
  ...G_REFINING,
  ...G_CHEMICAL,
  ...G_PARTICLE,
  ...G_RESEARCH,
].sort(compareAlphabet);
