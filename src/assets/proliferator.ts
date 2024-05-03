import {
	Proliferator,
	PROLIFERATOR_REGISTERY,
	ProliferatorMode,
} from "@eurydos/dsp-item-registry";

export const proliferatorFromLabel = (
	label: string,
): Proliferator => {
	if (label in PROLIFERATOR_REGISTERY) {
		return PROLIFERATOR_REGISTERY[label];
	}
	return {
		label: "Uh oh",
		mode: ProliferatorMode.EXTRA_PRODUCTS,
		workConsumptionMultiplier: 1,
		productMultiplier: 1,
		cycleMultiplier: 1,
		sprayCount: 1,
	};
};

export const getDisabledProlifOptions = (
	speedupOnly: boolean,
) =>
	Object.values(PROLIFERATOR_REGISTERY)
		.filter(
			({ mode }) =>
				speedupOnly &&
				mode !==
					ProliferatorMode.PRODUCTION_SPEEDUP,
		)
		.map(({ label }) => label);

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
