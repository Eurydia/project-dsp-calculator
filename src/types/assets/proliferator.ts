const PROLIFERATOR_TABLE: {
	[K: string]: Proliferator;
} = {};

export enum ProliferatorMode {
	EXTRA_PRODUCTS = "Extra Products",
	PRODUCTION_SPEEDUP = "Production Speedup",
}

export type Proliferator = Readonly<{
	label: string;
	mode: ProliferatorMode;
	workConsumptionMultiplier: number;
	productMultiplier: number;
	speedupMultiplier: number;
}>;

export const Proliferator = {
	toJSON: (
		proliferator: Proliferator,
	): string => {
		return JSON.stringify(proliferator);
	},

	fromLabel: (
		label: string,
	): Proliferator | null => {
		if (label in PROLIFERATOR_TABLE) {
			return PROLIFERATOR_TABLE[label];
		}
		return null;
	},

	register: (
		proliferator: Proliferator,
	): void => {
		const { label } = proliferator;
		PROLIFERATOR_TABLE[label] = proliferator;
	},

	create: (
		label: string,
		mode: ProliferatorMode,
		workConsumptionMultiplier: number,
		productMultiplier: number,
		speedupMultiplier: number,
	): Proliferator => {
		const newProliferator: Proliferator = {
			label,
			mode,
			workConsumptionMultiplier,
			productMultiplier,
			speedupMultiplier,
		};

		Proliferator.register(newProliferator);

		return newProliferator;
	},
};
