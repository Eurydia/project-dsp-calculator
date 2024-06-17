import { Proliferator } from "@eurydos/dsp-item-registry";
import { db } from "database";

export const proliferatorFromLabel = async (
	label: string,
): Promise<Proliferator> => {
	const item = await db.get(
		"proliferators",
		label,
	);
	if (item === undefined) {
		return {
			label: "Uh oh",
			mode: "Production Speedup",
			workConsumptionMultiplier: 1,
			productMultiplier: 1,
			cycleMultiplier: 1,
			sprayCount: 1,
		};
	}
	return item;
};

export const getDisabledProlifOptions = (
	speedupOnly: boolean,
) => {
	return [];
};

export const prolifNameFromSprayCount = (
	sprayCount: number,
): string => {
	switch (sprayCount) {
		case 12:
			return "Proliferator Mk.I";
		case 24:
			return "Proliferator Mk.II";
		case 60:
			return "Proliferator Mk.III";
		default:
			return "None";
	}
};
