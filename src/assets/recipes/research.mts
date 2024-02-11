import {
	RecipeType,
	recipeRegister,
} from "./recipe.mts";
import { Ingredient } from "assets/ingredient.mts";

const recipeRegisterResearch = (
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
		RecipeType.RESEARCH_FACILITY,
		speedupOnly,
	);
};

recipeRegisterResearch(
	"Electromagnetic Matrix",
	3,
	{
		[Ingredient.CIRCUIT_BOARD]: 1,
		[Ingredient.MAGNETIC_COIL]: 1,
	},
	{ [Ingredient.ELECTROMAGNETIC_MATRIX]: 1 },
);
recipeRegisterResearch(
	"Energy Matrix",
	6,
	{
		[Ingredient.HYDROGEN]: 2,
		[Ingredient.ENERGETIC_GRAPHITE]: 2,
	},
	{ [Ingredient.ENERGY_MATRIX]: 1 },
);
recipeRegisterResearch(
	"Structure Matrix",
	8,
	{
		[Ingredient.DIAMOND]: 1,
		[Ingredient.TITANIUM_CRYSTAL]: 1,
	},
	{ [Ingredient.STRUCTURE_MATRIX]: 1 },
);
recipeRegisterResearch(
	"Information Matrix",
	10,
	{
		[Ingredient.PARTICLE_BROADBAND]: 1,
		[Ingredient.PROCESSOR]: 2,
	},
	{ [Ingredient.INFORMATION_MATRIX]: 1 },
);
recipeRegisterResearch(
	"Gravity Matrix",
	24,
	{
		[Ingredient.GRAVITON_LENS]: 1,
		[Ingredient.QUANTUM_CHIP]: 1,
	},
	{ [Ingredient.GRAVITY_MATRIX]: 2 },
);
recipeRegisterResearch(
	"Universe Matrix",
	15,
	{
		[Ingredient.ELECTROMAGNETIC_MATRIX]: 1,
		[Ingredient.ENERGY_MATRIX]: 1,
		[Ingredient.STRUCTURE_MATRIX]: 1,
		[Ingredient.INFORMATION_MATRIX]: 1,
		[Ingredient.GRAVITY_MATRIX]: 1,
		[Ingredient.ANTIMATTER]: 1,
	},
	{ [Ingredient.UNIVERSE_MATRIX]: 1 },
);
