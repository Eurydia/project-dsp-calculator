type Sorter = {
	label: string;
	workConsumptionMW: number;
	idleConsumptionMW: number;
};

export const SORTER_REGISTRY: Record<
	string,
	Sorter
> = {};

export const sorterFromLabel = (
	label: string,
): Sorter => {
	if (label in SORTER_REGISTRY) {
		return SORTER_REGISTRY[label];
	}
	return {
		label: "Uh oh",
		workConsumptionMW: 1,
		idleConsumptionMW: 1,
	};
};

const sorterRegister = (
	label: string,
	workConsumptionMW: number,
	idleConsumptionMW: number,
): void => {
	SORTER_REGISTRY[label] = {
		label,
		workConsumptionMW,
		idleConsumptionMW,
	};
};

sorterRegister("Sorter Mk.I", 0.018, 0.009);
sorterRegister("Sorter Mk.II", 0.036, 0.009);
sorterRegister("Sorter Mk.III", 0.072, 0.009);
sorterRegister("Pile Sorter", 0.144, 0.009);
