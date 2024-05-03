import {
	Recipe,
	RECIPE_REGISTRY,
	RecipeType,
} from "@eurydos/dsp-item-registry";

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

export const getDisabledRecipeOptions = (
	currRecipeType: RecipeType,
) =>
	Object.values(RECIPE_REGISTRY)
		.filter(
			({ recipeType }) =>
				recipeType !== currRecipeType,
		)
		.map(({ label }) => label);

export const RECIPE_DEFAULT_LOOKUP: Record<
	string,
	string
> = {};

for (const recipe of Object.values(
	RECIPE_REGISTRY,
)) {
	RECIPE_DEFAULT_LOOKUP[recipe.recipeType] =
		recipe.label;
}
