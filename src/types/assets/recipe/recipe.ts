import { RecipeEnum } from "./enums";

const RECIPE_TABLE: Record<string, Recipe> = {};

export type Recipe = Readonly<{
	label: string;
	cycleTime: number;
	materials: { [K: string]: number };
	products: { [K: string]: number };
	recipeType: RecipeEnum;
	speedupOnly: boolean;
}>;

export const Recipe = {
	fromLabel: (label: string): Recipe | null => {
		if (label in RECIPE_TABLE) {
			return RECIPE_TABLE[label];
		}
		return null;
	},

	toJSON: (recipe: Recipe): string => {
		return JSON.stringify(recipe);
	},

	register: (recipe: Recipe) => {
		const { label } = recipe;
		RECIPE_TABLE[label] = recipe;
	},

	create: (
		label: string,
		cycleTime: number,
		materials: { [K: string]: number },
		products: { [K: string]: number },
		recipeType: RecipeEnum,
		speedupOnly: boolean,
	): Recipe => {
		const newRecipe: Recipe = {
			label,
			cycleTime,
			materials,
			products,
			recipeType,
			speedupOnly,
		};
		Recipe.register(newRecipe);
		return newRecipe;
	},
};
