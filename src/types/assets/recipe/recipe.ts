import { RecipeType } from "./enums";

const RECIPE_TABLE: Record<string, Recipe> = {};

export type Recipe = Readonly<{
	label: string;
	cycleTime: number;
	materials: { [K: string]: number };
	products: { [K: string]: number };
	recipeType: RecipeType;
	speedupOnly: boolean;
}>;

export const Recipe = {
	fromLabel: (label: string): Recipe => {
		if (label in RECIPE_TABLE) {
			return RECIPE_TABLE[label];
		}
		return RECIPE_TABLE["Copper Ingot"];
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
		recipeType: RecipeType,
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

	getRegisteredItems: (): Recipe[] => {
		return Object.values(RECIPE_TABLE);
	},
};
