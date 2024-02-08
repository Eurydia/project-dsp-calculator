import {
	RecipeType,
	recipeRegister,
} from "./recipe.mts";
import { Ingredient } from "assets/ingredient.mts";

const recipeRegisterRefining = (
	label: string,
	cycleTime: number,
	materialRecord: Partial<
		Record<Ingredient, number>
	>,
	productRecord: Partial<
		Record<Ingredient, number>
	>,
	speedupOnly: boolean = false,
): void => {
	recipeRegister(
		label,
		cycleTime,
		materialRecord,
		productRecord,
		RecipeType.REFINING_FACILITY,
		speedupOnly,
	);
};

recipeRegisterRefining(
	"Plasma Refining",
	4,
	{ [Ingredient.CRUDE_OIL]: 2 },
	{
		[Ingredient.HYDROGEN]: 1,
		[Ingredient.REFINED_OIL]: 2,
	},
);
recipeRegisterRefining(
	"X-ray Cracking",
	4,
	{
		[Ingredient.REFINED_OIL]: 1,
		[Ingredient.HYDROGEN]: 2,
	},
	{
		[Ingredient.ENERGETIC_GRAPHITE]: 1,
		[Ingredient.HYDROGEN]: 3,
	},
	true,
);
recipeRegisterRefining(
	"Reforming Refinement",
	4,
	{
		[Ingredient.HYDROGEN]: 1,
		[Ingredient.COAL]: 1,
		[Ingredient.REFINED_OIL]: 2,
	},
	{ [Ingredient.REFINED_OIL]: 3 },
	true,
);
