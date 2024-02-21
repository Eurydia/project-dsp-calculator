// Input-oriented solvers

import { facilityFromLabel } from "assets/facility.mts";
import { proliferatorFromLabel } from "assets/proliferator.mts";
import { recipeFromLabel } from "assets/recipes/recipe.mts";

// Computes the number of facility which consumes the lowest material transport capacity
// E.g. For circuit board (1x copper ingot, 2x iron ingot)
// If the constraint is given as
// - 200x copper ingot per minute
// - 300x iron ingot per minute
// then the calculated number of arc smelter is 3 (45x copper ingot per minute per facility, 90 iron ingot per minute per facility)
// This way, the calculator does not tap into resource which does not exist
// or exceed the constraint.

export const solveFacilityNeededCountConstraint =
	(
		facilityLabel: string,
		recipeLabel: string,
		prolifEffectLabel: string,
		constraintRecord: Record<string, string>,
	) => {
		const _facility = facilityFromLabel(
			facilityLabel,
		);
		const _recipe = recipeFromLabel(recipeLabel);
		const _prolif = proliferatorFromLabel(
			prolifEffectLabel,
		);
		const _constraintRecord: Record<
			string,
			number
		> = {};
		for (const entry of Object.entries(
			constraintRecord,
		)) {
			const [itemLabel, value] = entry;
			let parsedValue = Number.parseInt(value);
			if (Number.isNaN(parsedValue)) {
				parsedValue = 0;
			}
			_constraintRecord[itemLabel] = parsedValue;
		}

		if (
			Object.values(_constraintRecord).every(
				(value) => value === 0,
			)
		) {
			return 0;
		}

		const cycleMuliplier =
			_facility.cycleMultiplier *
			_prolif.cycleMultiplier;

		const cyclesPerMinitePerFacility =
			(60 / _recipe.cycleTimeSecond) *
			cycleMuliplier;

		let needed = 0;
		for (const entry of Object.entries(
			_recipe.materialRecord,
		)) {
			const [label, ratio] = entry;
			const itemFlowrate =
				ratio * cyclesPerMinitePerFacility;
			const currNeeded =
				_constraintRecord[label] / itemFlowrate;

			if (
				(currNeeded > 0 && needed === 0) ||
				currNeeded < needed
			) {
				needed = currNeeded;
			}
		}

		return needed;
	};
