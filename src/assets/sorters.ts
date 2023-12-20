import { Sorter } from "../types";

const file = await fetch("assets/sorters.json");
const data: {
	label: string;
	workConsumptionMW: number;
	idleConsumptionMW: number;
}[] = await file.json();

export const AssetSorters: Sorter[] = data.map(
	({
		label,
		idleConsumptionMW,
		workConsumptionMW,
	}) =>
		Sorter.create(
			label,
			workConsumptionMW,
			idleConsumptionMW,
		),
);
