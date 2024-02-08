import {
	RecipeType,
	recipeRegister,
} from "./recipe.mts";
import { Ingredient } from "assets/ingredient.mts";

const recipeRegisterParticle = (
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
		RecipeType.PARTICLE_COLLIDER,
		speedupOnly,
	);
};

recipeRegisterParticle(
	"Strange Matter",
	8,
	{
		[Ingredient.PARTICLE_CONTAINER]: 2,
		[Ingredient.IRON_INGOT]: 2,
		[Ingredient.DEUTERIUM]: 10,
	},
	{ [Ingredient.STRANGE_MATTER]: 1 },
);
recipeRegisterParticle(
	"Deuterium",
	2.5,
	{ [Ingredient.HYDROGEN]: 10 },
	{ [Ingredient.DEUTERIUM]: 5 },
	true,
);
recipeRegisterParticle(
	"Mass-energy Storage",
	2,
	{ [Ingredient.CRITICAL_PHOTON]: 2 },
	{
		[Ingredient.HYDROGEN]: 2,
		[Ingredient.ANTIMATTER]: 2,
	},
	true,
);
