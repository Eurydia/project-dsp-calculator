import { Recipe } from "../../types";
import { SMELTING_RECIPE_DATA_LIST } from "./smelting";
import { ASSEMBLER_RECIPE_DATA_LIST } from "./assembler";
import { REFINING_RECIPE_DATA_LIST } from "./refining";
import { CHEMICAL_RECIPE_DATA_LIST } from "./chemical";
import { PARTICLE_RECIPE_DATA_LIST } from "./particle";
import { RESEARCH_RECIPE_DATA_LIST } from "./research";

export const RECIPE_DATA_LIST: Recipe[] = [
	...SMELTING_RECIPE_DATA_LIST,
	...ASSEMBLER_RECIPE_DATA_LIST,
	...REFINING_RECIPE_DATA_LIST,
	...CHEMICAL_RECIPE_DATA_LIST,
	...PARTICLE_RECIPE_DATA_LIST,
	...RESEARCH_RECIPE_DATA_LIST,
].sort((a, b) => {
	if (a.label > b.label) {
		return 1;
	}
	if (a.label < b.label) {
		return -1;
	}
	return 0;
});
