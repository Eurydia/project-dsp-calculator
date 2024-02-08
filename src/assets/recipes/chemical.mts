import {
	RecipeType,
	recipeRegister,
} from "./recipe.mts";
import { Ingredient } from "assets/ingredient.mts";

const recipeRegisterChemical = (
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
		RecipeType.CHEMICAL_FACILITY,
		speedupOnly,
	);
};

recipeRegisterChemical(
	"Plastic",
	3,
	{
		[Ingredient.GRAPHENE]: 1,
		[Ingredient.REFINED_OIL]: 2,
	},
	{ [Ingredient.PLASTIC]: 1 },
);
recipeRegisterChemical(
	"Graphene",
	3,
	{
		[Ingredient.SULFURIC_ACID]: 1,
		[Ingredient.ENERGETIC_GRAPHITE]: 3,
	},
	{ [Ingredient.GRAPHENE]: 2 },
);
recipeRegisterChemical(
	"Organic Crystal",
	6,
	{
		[Ingredient.WATER]: 1,
		[Ingredient.REFINED_OIL]: 1,
		[Ingredient.PLASTIC]: 2,
	},
	{ [Ingredient.ORGANIC_CRYSTAL]: 1 },
);
recipeRegisterChemical(
	"Explosive Unit",
	6,
	{
		[Ingredient.SULFURIC_ACID]: 1,
		[Ingredient.PLASTIC]: 2,
		[Ingredient.COMBUSTIBLE_UNIT]: 2,
	},
	{ [Ingredient.EXPLOSIVE_UNIT]: 2 },
);
recipeRegisterChemical(
	"Crystal Explosive Unit",
	24,
	{
		[Ingredient.CASIMIR_CRYSTAL]: 1,
		[Ingredient.CRYSTAL_SILICON]: 8,
		[Ingredient.EXPLOSIVE_UNIT]: 8,
	},
	{ [Ingredient.CRYSTAL_EXPLOSIVE_UNIT]: 8 },
);
recipeRegisterChemical(
	"Graphene (advanced)",
	2,
	{ [Ingredient.FIRE_ICE]: 2 },
	{
		[Ingredient.HYDROGEN]: 1,
		[Ingredient.GRAPHENE]: 2,
	},
);
recipeRegisterChemical(
	"Sulfuric Acid",
	6,
	{
		[Ingredient.WATER]: 4,
		[Ingredient.REFINED_OIL]: 6,
		[Ingredient.STONE]: 8,
	},
	{ [Ingredient.SULFURIC_ACID]: 4 },
);
recipeRegisterChemical(
	"Carbon Nanotube",
	4,
	{
		[Ingredient.TITANIUM_INGOT]: 1,
		[Ingredient.GRAPHENE]: 3,
	},
	{ [Ingredient.CARBON_NANOTUBE]: 2 },
);
recipeRegisterChemical(
	"Carbon Nanotube (advanced)",
	4,
	{
		[Ingredient.STALAGMITE_CRYSTAL]: 6,
	},
	{ [Ingredient.CARBON_NANOTUBE]: 2 },
);
