import {
	Recipe,
	RecipeType,
	ItemEnum,
} from "../../types";

const makeChemicalRecipe = (
	label: string,
	cycleTime: number,
	materialRecord: { [K: string]: number },
	productRecord: { [K: string]: number },
	speedupOnly: boolean = false,
): Recipe => {
	return Recipe.create(
		label,
		cycleTime,
		materialRecord,
		productRecord,
		RecipeType.CHEMICAL_FACILITY,
		speedupOnly,
	);
};

export const CHEMICAL_RECIPE_DATA_LIST: Recipe[] =
	[
		makeChemicalRecipe(
			"Plastic",
			3,
			{
				[ItemEnum.GRAPHENE]: 1,
				[ItemEnum.REFINED_OIL]: 2,
			},
			{ [ItemEnum.PLASTIC]: 1 },
		),
		makeChemicalRecipe(
			"Graphene",
			3,
			{
				[ItemEnum.SULFURIC_ACID]: 1,
				[ItemEnum.ENERGETIC_GRAPHITE]: 3,
			},
			{ [ItemEnum.GRAPHENE]: 2 },
		),
		makeChemicalRecipe(
			"Organic Crystal",
			6,
			{
				[ItemEnum.WATER]: 1,
				[ItemEnum.REFINED_OIL]: 1,
				[ItemEnum.PLASTIC]: 2,
			},
			{ [ItemEnum.ORGANIC_CRYSTAL]: 1 },
		),
		makeChemicalRecipe(
			"Explosive Unit",
			6,
			{
				[ItemEnum.SULFURIC_ACID]: 1,
				[ItemEnum.PLASTIC]: 2,
				[ItemEnum.COMBUSTIBLE_UNIT]: 2,
			},
			{ [ItemEnum.EXPLOSIVE_UNIT]: 2 },
		),
		makeChemicalRecipe(
			"Crystal Explosive Unit",
			24,
			{
				[ItemEnum.CASIMIR_CRYSTAL]: 1,
				[ItemEnum.CRYSTAL_SILICON]: 8,
				[ItemEnum.EXPLOSIVE_UNIT]: 8,
			},
			{ [ItemEnum.CRYSTAL_EXPLOSIVE_UNIT]: 8 },
		),
		makeChemicalRecipe(
			"Graphene (advanced)",
			2,
			{ [ItemEnum.FIRE_ICE]: 2 },
			{
				[ItemEnum.HYDROGEN]: 1,
				[ItemEnum.GRAPHENE]: 2,
			},
		),
		makeChemicalRecipe(
			"Sulfuric Acid",
			6,
			{
				[ItemEnum.WATER]: 4,
				[ItemEnum.REFINED_OIL]: 6,
				[ItemEnum.STONE]: 8,
			},
			{ [ItemEnum.SULFURIC_ACID]: 4 },
		),
		makeChemicalRecipe(
			"Carbon Nanotube",
			4,
			{
				[ItemEnum.TITANIUM_INGOT]: 1,
				[ItemEnum.GRAPHENE]: 3,
			},
			{ [ItemEnum.CARBON_NANOTUBE]: 2 },
		),
		makeChemicalRecipe(
			"Carbon Nanotube (advanced)",
			4,
			{
				[ItemEnum.STALAGMITE_CRYSTAL]: 6,
			},
			{ [ItemEnum.CARBON_NANOTUBE]: 2 },
		),
	];
