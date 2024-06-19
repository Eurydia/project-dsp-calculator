// Output-oriented solver

import {
	Facility,
	Proliferator,
	Recipe,
} from "@eurydos/dsp-item-registry";
import { safeParseClamp } from "~core/parsing";

export const solveFacilityNeededCountCapacity = (
	f: Facility,
	r: Recipe,
	p: Proliferator,
	capacity: Record<string, string>,
) => {
	const result: Record<string, number> = {};
	for (const [label, value] of Object.entries(
		capacity,
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

	const productMultiplier = p.productMultiplier;

	const cycleMuliplier =
		f.cycleMultiplier * p.cycleMultiplier;
	const cyclesPerMinutePerFacility =
		(60 / r.cycleTimeSecond) * cycleMuliplier;

	let needed = 0;
	for (const entry of Object.entries(
		r.productRecord,
	)) {
		const [itemLabel, ratio] = entry;
		const itemFlowrate =
			ratio *
			cyclesPerMinutePerFacility *
			productMultiplier;
		const currNeeded =
			result[itemLabel] / itemFlowrate;
		if (currNeeded > needed) {
			needed = currNeeded;
		}
	}

	return needed;
};
