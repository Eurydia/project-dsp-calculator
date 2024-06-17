import { Sorter } from "@eurydos/dsp-item-registry";
import { db } from "database";

export const sorterFromLabel = async (
	label: string,
): Promise<Sorter> => {
	const item = await db.get("sorters", label);
	if (item === undefined) {
		return {
			label: "Uh oh",
			workConsumptionMW: 1,
			idleConsumptionMW: 1,
		};
	}
	return item;
};
