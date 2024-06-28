// Output-oriented solver

import { safeParseClamp } from "~core/parsing";
import { ConfigFormData } from "~types/query";

export const computeFacilityNeededCountCapacity =
	(
		config: ConfigFormData,
		capacity: Record<string, string>,
	) => {
		const { facility, proliferator, recipe } =
			config;
		const parsed: Record<string, number> = {};
		for (const [k, v] of Object.entries(
			capacity,
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
			recipe.productRecord,
		)) {
			const itemFlowrate =
				v *
				cyclesPerMinute *
				proliferator.productMultiplier;
			const currNeeded = parsed[k] / itemFlowrate;
			if (currNeeded > result) {
				result = currNeeded;
			}
		}

		return result;
	};
