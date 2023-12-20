import { Recipe } from "../../types";
import { SMELTING_RECIPES } from "./smelting";
import { ASSEMBLER_RECIPES } from "./assembler";
import { REFINING_RECIPES } from "./refining";
import { CHEMICAL_RECIPES } from "./chemical";
import { PARTICLE_RECIPES } from "./particle";
import { RESEARCH_RECIPES } from "./research";

export const AssetRecipes: Recipe[] = [
	...SMELTING_RECIPES,
	...ASSEMBLER_RECIPES,
	...REFINING_RECIPES,
	...CHEMICAL_RECIPES,
	...PARTICLE_RECIPES,
	...RESEARCH_RECIPES,
].sort((a, b) => {
	if (a.label > b.label) {
		return 1;
	}
	if (a.label < b.label) {
		return -1;
	}
	return 0;
});
