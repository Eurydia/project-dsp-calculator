import {
	Recipe,
	RECIPE_REGISTRY,
	RecipeType,
} from "@eurydia/dsp-item-registry";

export const recipeFromLabel = (
	label: string,
): Recipe => {
	if (label in RECIPE_REGISTRY) {
		return RECIPE_REGISTRY[label];
	}
	return {
		label: "Uh oh",
		cycleTimeSecond: 1,
		materialRecord: {},
		productRecord: {},
		recipeType: RecipeType.ASSEMBLER,
		speedupOnly: false,
	};
};

export const RECIPE_DEFAULT_LOOKUP: Record<
	string,
	string
> = {};

for (const entry of Object.entries(
	RECIPE_REGISTRY,
)) {
	RECIPE_DEFAULT_LOOKUP[entry[0]] =
		entry[1].label;
}
