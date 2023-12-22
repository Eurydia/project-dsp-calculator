import {
	Recipe,
	RecipeType,
	ItemEnum,
} from "../../types";

const makeParticleRecipe = (
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
		RecipeType.PARTICLE_COLLIDER,
		speedupOnly,
	);
};

export const PARTICLE_RECIPE_DATA_LIST: Recipe[] =
	[
		makeParticleRecipe(
			"Strange Matter",
			8,
			{
				[ItemEnum.PARTICLE_CONTAINER]: 2,
				[ItemEnum.IRON_INGOT]: 2,
				[ItemEnum.DEUTERIUM]: 10,
			},
			{ [ItemEnum.STRANGE_MATTER]: 1 },
		),
		makeParticleRecipe(
			"Deuterium",
			2.5,
			{ [ItemEnum.HYDROGEN]: 10 },
			{ [ItemEnum.DEUTERIUM]: 5 },
			true,
		),
		makeParticleRecipe(
			"Mass-energy Storage",
			2,
			{ [ItemEnum.CRITICAL_PHOTON]: 2 },
			{
				[ItemEnum.HYDROGEN]: 2,
				[ItemEnum.ANTIMATTER]: 2,
			},
			true,
		),
	];
