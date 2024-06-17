import {
	RECIPE_REGISTRY,
	Recipe,
	RecipeType,
} from "@eurydos/dsp-item-registry";
import { db } from "database";

export const recipeFromLabel = async (
	label: string,
): Promise<Recipe> => {
	const item = await db.get("recipes", label);
	if (item === undefined) {
		return {
			label: "Uh oh",
			cycleTimeSecond: 1,
			materialRecord: {},
			productRecord: {},
			recipeType: RecipeType.ASSEMBLER,
			speedupOnly: false,
		};
	}
	return item;
};

export const getDisabledRecipeOptions = (
	currRecipeType: string,
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
