import { RecipeType } from "assets/recipes/index.mts";

type Facility = {
	label: string;
	cycleMultiplier: number;
	workConsumptionMW: number;
	idleConsumptionMW: number;
	recipeType: RecipeType;
	connectionCount: number;
};

export const FACILITY_REGISTRY: Record<
	string,
	Facility
> = {};

export const facilityFromLabel = (
	label: string,
): Facility => {
	if (label in FACILITY_REGISTRY) {
		return FACILITY_REGISTRY[label];
	}
	return {
		label: "Uh oh",
		cycleMultiplier: 1,
		workConsumptionMW: 1,
		idleConsumptionMW: 1,
		recipeType: RecipeType.UH_OH,
		connectionCount: 0,
	};
};

const facilityRegister = (
	label: string,
	cycleMultiplier: number,
	workConsumptionMW: number,
	idleConsumptionMW: number,
	recipeType: RecipeType,
	connectionCount: number,
): void => {
	FACILITY_REGISTRY[label] = {
		label,
		cycleMultiplier,
		workConsumptionMW,
		idleConsumptionMW,
		recipeType,
		connectionCount,
	};
};

facilityRegister(
	"Arc Smelter",
	1,
	0.36,
	0.012,
	RecipeType.SMELTING_FACILITY,
	12,
);
facilityRegister(
	"Plane Smelter",
	2,
	1.44,
	0.048,
	RecipeType.SMELTING_FACILITY,
	12,
);
facilityRegister(
	"Negentropy Smelter",
	3,
	2.88,
	0.096,
	RecipeType.SMELTING_FACILITY,
	12,
);
facilityRegister(
	"Assembler Mk.I",
	0.75,
	0.27,
	0.012,
	RecipeType.ASSEMBLER,
	12,
);
facilityRegister(
	"Assembler Mk.II",
	1,
	0.54,
	0.015,
	RecipeType.ASSEMBLER,
	12,
);
facilityRegister(
	"Assembler Mk.III",
	1.5,
	1.08,
	0.018,
	RecipeType.ASSEMBLER,
	12,
);
facilityRegister(
	"Re-composing Assembler",
	3,
	2.7,
	0.054,
	RecipeType.ASSEMBLER,
	12,
);
facilityRegister(
	"Oil Refinery",
	1,
	0.96,
	0.024,
	RecipeType.REFINING_FACILITY,
	9,
);
facilityRegister(
	"Chemical Plant",
	1,
	0.72,
	0.024,
	RecipeType.CHEMICAL_FACILITY,
	8,
);
facilityRegister(
	"Quantum Chemical Plant",
	2,
	2.16,
	0.036,
	RecipeType.CHEMICAL_FACILITY,
	8,
);
facilityRegister(
	"Miniature Particle Collider",
	1,
	12,
	0.12,
	RecipeType.PARTICLE_COLLIDER,
	9,
);
facilityRegister(
	"Matrix Lab",
	1,
	0.48,
	0.012,
	RecipeType.RESEARCH_FACILITY,
	12,
);
facilityRegister(
	"Self-evolution Lab",
	3,
	1.92,
	0.048,
	RecipeType.RESEARCH_FACILITY,
	12,
);
