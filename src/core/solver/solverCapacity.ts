// Output-oriented solver

import { facilityFromLabel } from "~assets/facility";
import { proliferatorFromLabel } from "~assets/proliferator";
import { recipeFromLabel } from "~assets/recipe";

export const solveFacilityNeededCountCapacity = (
	facilityLabel: string,
	recipeLabel: string,
	prolifEffectLabel: string,
	capacityRecord: Record<string, string>,
): number => {
	const _facility = facilityFromLabel(
		facilityLabel,
	);
	const _recipe = recipeFromLabel(recipeLabel);
	const _prolif = proliferatorFromLabel(
		prolifEffectLabel,
	);
	const _capacityRecord: Record<string, number> =
		{};
	for (const entry of Object.entries(
		capacityRecord,
	)) {
		const [itemLabel, value] = entry;
		let parsedValue = Number.parseInt(value);
		if (Number.isNaN(parsedValue)) {
			parsedValue = 0;
		}
		_capacityRecord[itemLabel] = parsedValue;
	}

	if (
		Object.values(_capacityRecord).every(
			(value) => value === 0,
		)
	) {
		return 0;
	}

	const productMultiplier =
		_prolif.productMultiplier;

	const cycleMuliplier =
		_facility.cycleMultiplier *
		_prolif.cycleMultiplier;
	const cyclesPerMinutePerFacility =
		(60 / _recipe.cycleTimeSecond) *
		cycleMuliplier;

	let needed = 0;
	for (const entry of Object.entries(
		_recipe.productRecord,
	)) {
		const [itemLabel, ratio] = entry;
		const itemFlowrate =
			ratio *
			cyclesPerMinutePerFacility *
			productMultiplier;
		const currNeeded =
			_capacityRecord[itemLabel] / itemFlowrate;
		if (currNeeded > needed) {
			needed = currNeeded;
		}
	}

	return needed;
};
