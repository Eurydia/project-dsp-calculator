// Input-oriented solvers

import {
	Facility,
	Proliferator,
	Recipe,
} from "@eurydos/dsp-item-registry";
import { safeParseClamp } from "~core/parsing";

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
		f: Facility,
		r: Recipe,
		p: Proliferator,
		constraint: Record<string, string>,
	) => {
		const result: Record<string, number> = {};
		for (const [label, value] of Object.entries(
			constraint,
		)) {
			result[label] = safeParseClamp(
				value,
				0,
				Number.MAX_SAFE_INTEGER,
			);
		}

		if (
			Object.values(result).every(
				(value) => value === 0,
			)
		) {
			return 0;
		}

		const cycleMuliplier =
			f.cycleMultiplier * p.cycleMultiplier;

		const cyclesPerMinitePerFacility =
			(60 / r.cycleTimeSecond) * cycleMuliplier;

		let needed = 0;
		for (const entry of Object.entries(
			r.materialRecord,
		)) {
			const [label, ratio] = entry;
			const itemFlowrate =
				ratio * cyclesPerMinitePerFacility;
			const currNeeded =
				result[label] / itemFlowrate;

			if (
				(currNeeded > 0 && needed === 0) ||
				currNeeded < needed
			) {
				needed = currNeeded;
			}
		}
		return needed;
	};
