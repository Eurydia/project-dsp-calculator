import { RecipeType } from "../../types";

const FACILITY_TABLE: {
	[K: string]: Facility;
} = {};

export type Facility = Readonly<{
	label: string;
	speedupMultiplier: number;
	workConsumptionMW: number;
	idleConsumptionMW: number;
	recipeType: RecipeType;
}>;

export const Facility = {
	fromLabel: (label: string): Facility | null => {
		if (label in FACILITY_TABLE) {
			return FACILITY_TABLE[label];
		}
		return null;
	},

	toJSON: (facility: Facility): string => {
		return JSON.stringify(facility.label);
	},

	register: (facility: Facility): void => {
		const { label } = facility;
		FACILITY_TABLE[label] = facility;
	},

	create: (
		label: string,
		speedupMultiplier: number,
		workConsumptionMW: number,
		idleConsumptionMW: number,
		recipeType: RecipeType,
	): Facility => {
		const newFacility: Facility = {
			label,
			speedupMultiplier,
			workConsumptionMW,
			idleConsumptionMW,
			recipeType,
		};

		Facility.register(newFacility);
		return newFacility;
	},

	getRegisteredItems: (): Facility[] => {
		return Object.values(FACILITY_TABLE);
	},
};
