import {
	PROLIFERATOR_REGISTERY,
	Proliferator,
	ProliferatorMode,
} from "@eurydia/dsp-item-registry";

export const proliferatorLabelFromSprayCount = (
	sprayCount: number,
): string => {
	if (sprayCount === 12) {
		return "Proliferator Mk.I";
	}
	if (sprayCount === 24) {
		return "Proliferator Mk.II";
	}
	if (sprayCount === 60) {
		return "Proliferator Mk.III";
	}
	return "None";
};

export const proliferatorFromLabel = (
	label: string,
): Proliferator => {
	if (label in PROLIFERATOR_REGISTERY) {
		return PROLIFERATOR_REGISTERY[label];
	}
	return {
		label: "Uh oh",
		mode: ProliferatorMode.UH_OH,
		workConsumptionMultiplier: 1,
		productMultiplier: 1,
		cycleMultiplier: 1,
		sprayCount: 1,
	};
};
