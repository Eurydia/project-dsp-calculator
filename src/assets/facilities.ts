import { Facility, RecipeEnum } from "../types";

const file = await fetch(
	"assets/facilities.json",
);
const data: {
	label: string;
	speedupMultiplier: number;
	workConsumptionMW: number;
	idleConsumptionMW: number;
	recipeType: RecipeEnum;
}[] = await file.json();

export const AssetFacilities: Facility[] = data
	.map(
		({
			label,
			speedupMultiplier,
			workConsumptionMW,
			idleConsumptionMW,
			recipeType,
		}) =>
			Facility.create(
				label,
				speedupMultiplier,
				workConsumptionMW,
				idleConsumptionMW,
				recipeType,
			),
	)
	.sort((a: Facility, b: Facility): number => {
		if (a.label > b.label) {
			return 1;
		}
		if (a.label < b.label) {
			return -1;
		}
		return 0;
	});
