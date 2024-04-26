import {
	Facility,
	FACILITY_REGISTRY,
	RecipeType,
} from "@eurydia/dsp-item-registry";

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
		recipeType: RecipeType.ASSEMBLER,
		connectionCount: 0,
	};
};
