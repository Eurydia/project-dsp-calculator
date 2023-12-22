const SORTER_TABLE: {
	[key: string]: Sorter;
} = {};

export type Sorter = Readonly<{
	label: string;
	workConsumptionMW: number;
	idleConsumptionMW: number;
}>;

export const Sorter = {
	fromLabel: (label: string): Sorter => {
		if (label in SORTER_TABLE) {
			return SORTER_TABLE[label];
		}
		return SORTER_TABLE["Sorter Mk.I"];
	},

	toJSON: (sorter: Sorter): string => {
		return JSON.stringify(sorter);
	},

	register: (sorter: Sorter) => {
		const { label } = sorter;
		SORTER_TABLE[label] = sorter;
	},

	create: (
		label: string,
		work_consumption: number,
		idle_consumption: number,
	): Sorter => {
		const new_sorter: Sorter = {
			label,
			workConsumptionMW: work_consumption,
			idleConsumptionMW: idle_consumption,
		};
		Sorter.register(new_sorter);
		return new_sorter;
	},

	getRegisteredItems: (): Sorter[] => {
		return Object.values(SORTER_TABLE);
	},
};
