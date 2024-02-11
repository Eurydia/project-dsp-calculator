import {
	RecipeType,
	recipeRegister,
} from "./recipe.mts";
import { Ingredient } from "assets/ingredient.mts";

const recipeRegisterSmelting = (
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
		RecipeType.SMELTING_FACILITY,
		speedupOnly,
	);
};

recipeRegisterSmelting(
	"Iron Ingot",
	1,
	{ [Ingredient.IRON_ORE]: 1 },
	{ [Ingredient.IRON_INGOT]: 1 },
);
recipeRegisterSmelting(
	"Copper Ingot",
	1,
	{ [Ingredient.COPPER_ORE]: 1 },
	{ [Ingredient.COPPER_INGOT]: 1 },
);
recipeRegisterSmelting(
	"High-Purity Silicon",
	2,
	{ [Ingredient.SILICON_ORE]: 2 },
	{ [Ingredient.HIGH_PURITY_SILICON]: 1 },
);
recipeRegisterSmelting(
	"Titanium Ingot",
	2,
	{ [Ingredient.TITANIUM_ORE]: 2 },
	{ [Ingredient.TITANIUM_INGOT]: 1 },
);
recipeRegisterSmelting(
	"Stone Brick",
	1,
	{ [Ingredient.STONE]: 1 },
	{ [Ingredient.STONE_BRICK]: 1 },
);
recipeRegisterSmelting(
	"Energetic Graphite",
	2,
	{ [Ingredient.COAL]: 2 },
	{ [Ingredient.ENERGETIC_GRAPHITE]: 1 },
);
recipeRegisterSmelting(
	"Magnet",
	1.5,
	{ [Ingredient.IRON_ORE]: 1 },
	{ [Ingredient.MAGNET]: 1 },
);
recipeRegisterSmelting(
	"Crystal Silicon",
	2,
	{ [Ingredient.HIGH_PURITY_SILICON]: 1 },
	{ [Ingredient.CRYSTAL_SILICON]: 1 },
);
recipeRegisterSmelting(
	"Titanium Alloy",
	12,
	{
		[Ingredient.TITANIUM_INGOT]: 4,
		[Ingredient.STEEL]: 4,
		[Ingredient.SULFURIC_ACID]: 8,
	},
	{ [Ingredient.TITANIUM_ALLOY]: 4 },
);
recipeRegisterSmelting(
	"Glass",
	2,
	{ [Ingredient.STONE]: 2 },
	{ [Ingredient.GLASS]: 1 },
);
recipeRegisterSmelting(
	"Diamond",
	2,
	{ [Ingredient.ENERGETIC_GRAPHITE]: 1 },
	{ [Ingredient.DIAMOND]: 1 },
);

recipeRegisterSmelting(
	"Steel",
	3,
	{ [Ingredient.IRON_INGOT]: 3 },
	{ [Ingredient.STEEL]: 1 },
);
recipeRegisterSmelting(
	"Diamond (advanced)",
	1.5,
	{ [Ingredient.KIMBERLITE_ORE]: 1 },
	{ [Ingredient.DIAMOND]: 2 },
);
recipeRegisterSmelting(
	"Silicon Ore",
	10,
	{ [Ingredient.STONE]: 10 },
	{ [Ingredient.SILICON_ORE]: 1 },
);
