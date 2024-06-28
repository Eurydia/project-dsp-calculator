// Input-oriented solvers

import { safeParseClamp } from "~core/parsing";
import { ConfigFormData } from "~types/query";

// Computes the number of facility which consumes the lowest material transport capacity
// E.g. For circuit board (1x copper ingot, 2x iron ingot)
// If the constraint is given as
// - 200x copper ingot per minute
// - 300x iron ingot per minute
// then the calculated number of arc smelter is 3 (45x copper ingot per minute per facility, 90 iron ingot per minute per facility)
// This way, the calculator does not tap into resource which does not exist
// or exceed the constraint.
export const computeFacilityNeededCountConstraint =
	(
		config: ConfigFormData,
		constraint: Record<string, string>,
	) => {
		const { facility, recipe, proliferator } =
			config;

		const parsed: Record<string, number> = {};
		for (const [k, v] of Object.entries(
			constraint,
		)) {
			parsed[k] = safeParseClamp(
				v,
				0,
				Number.MAX_SAFE_INTEGER,
			);
		}

		if (
			Object.values(parsed).every(
				(value) => value === 0,
			)
		) {
			return 0;
		}

		const cyclesPerMinute =
			(60 / recipe.cycleTimeSecond) *
			facility.cycleMultiplier *
			proliferator.cycleMultiplier;

		let result = 0;
		for (const [k, v] of Object.entries(
			recipe.materialRecord,
		)) {
			const itemFlowrate = v * cyclesPerMinute;
			const currNeeded = parsed[k] / itemFlowrate;
			if (
				(currNeeded > 0 && result === 0) ||
				currNeeded < result
			) {
				result = currNeeded;
			}
		}
		return result;
	};
