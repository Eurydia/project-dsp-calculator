export const RECIPE_REGISTRY: Record<
	string,
	Recipe
> = {};

// Default recipe for each recipe type
export const RECIPE_DEFAULT_LOOKUP: Record<
	string,
	string
> = {};

export enum RecipeType {
	ASSEMBLER = "Assembler",
	SMELTING_FACILITY = "Smelting Facility",
	CHEMICAL_FACILITY = "Chemical Facility",
	REFINING_FACILITY = "Refining Facility",
	RESEARCH_FACILITY = "Research Facility",
	PARTICLE_COLLIDER = "Particle Collider",
	UH_OH = "Uh oh",
}

export type Recipe = {
	label: string;
	cycleTimeSecond: number;
	materialRecord: Record<string, number>;
	productRecord: Record<string, number>;
	recipeType: RecipeType;
	speedupOnly: boolean;
};

export const recipeFromLabel = (
	label: string,
): Recipe => {
	if (label in RECIPE_REGISTRY) {
		return RECIPE_REGISTRY[label];
	}
	return {
		label: "Uh oh",
		cycleTimeSecond: 1,
		materialRecord: {},
		productRecord: {},
		recipeType: RecipeType.UH_OH,
		speedupOnly: false,
	};
};

export const recipeRegister = (
	label: string,
	cycleTimeSecond: number,
	materialRecord: Record<string, number>,
	productRecord: Record<string, number>,
	recipeType: RecipeType,
	speedupOnly: boolean = false,
): void => {
	RECIPE_REGISTRY[label] = {
		label,
		cycleTimeSecond,
		materialRecord,
		productRecord,
		recipeType,
		speedupOnly,
	};

	RECIPE_DEFAULT_LOOKUP[recipeType] = label;
};
