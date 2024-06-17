import {
	Facility,
	RecipeType,
} from "@eurydos/dsp-item-registry";
import { db } from "database";

export const facilityFromLabel = async (
	label: string,
): Promise<Facility> => {
	const item = await db.get("facilities", label);
	if (item === undefined) {
		return {
			label: "Uh oh",
			cycleMultiplier: 1,
			workConsumptionMW: 1,
			idleConsumptionMW: 1,
			recipeType: RecipeType.ASSEMBLER,
			connectionCount: 0,
		};
	}
	return item;
};
