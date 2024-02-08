export enum ProliferatorMode {
	EXTRA_PRODUCTS = "Extra Products",
	PRODUCTION_SPEEDUP = "Production Speedup",
	UH_OH = "Uh oh",
}

export type Proliferator = Readonly<{
	label: string;
	mode: ProliferatorMode;
	workConsumptionMultiplier: number;
	productMultiplier: number;
	cycleMultiplier: number;
	sprayCount: number;
}>;

export const PROLIFERATOR_REGISTERY: Record<
	string,
	Proliferator
> = {};

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

const proliferatorRegister = (
	label: string,
	mode: ProliferatorMode,
	workConsumptionMultiplier: number,
	productMultiplier: number,
	cycleMultiplier: number,
	sprayCount: number,
): void => {
	PROLIFERATOR_REGISTERY[label] = {
		label,
		mode,
		workConsumptionMultiplier,
		productMultiplier,
		cycleMultiplier,
		sprayCount,
	};
};

proliferatorRegister(
	"None",
	ProliferatorMode.PRODUCTION_SPEEDUP,
	1,
	1,
	1,
	0,
);
proliferatorRegister(
	"Cycle Speed +25%",
	ProliferatorMode.PRODUCTION_SPEEDUP,
	1.3,
	1,
	1.25,
	12,
);
proliferatorRegister(
	"Cycle Speed +50%",
	ProliferatorMode.PRODUCTION_SPEEDUP,
	1.7,
	1,
	1.5,
	24,
);
proliferatorRegister(
	"Cycle Speed +100%",
	ProliferatorMode.PRODUCTION_SPEEDUP,
	2.5,
	1,
	2,
	60,
);
proliferatorRegister(
	"Extra Products +12.5%",
	ProliferatorMode.EXTRA_PRODUCTS,
	1.3,
	1.125,
	1,
	12,
);
proliferatorRegister(
	"Extra Products +20%",
	ProliferatorMode.EXTRA_PRODUCTS,
	1.7,
	1.2,
	1,
	24,
);
proliferatorRegister(
	"Extra Products +25%",
	ProliferatorMode.EXTRA_PRODUCTS,
	2.5,
	1.25,
	1,
	60,
);
