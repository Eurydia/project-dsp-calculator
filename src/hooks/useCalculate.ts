import { useState } from "react";
import {
	solveDemandPerMinutePerFacility,
	solveFacilityNeededCountCapacity,
	solveFacilityNeededCountConstraint,
	solveFacilityPerArrayCount,
	solveIdleConsumptionMWPerFacility,
	solveProductionPerMinutePerFacility,
	solveWorkConsumptionMWPerFacility,
} from "~core/solver";
import {
	ComputeFormData,
	ConfigFormData,
} from "~types/query";
import { useConstraint } from "./useConstraint";

export const useCalculate = (
	init: ComputeFormData,
) => {
	const [mode, setMode] = useState(init.mode);
	const [constraint, setConstraint] =
		useConstraint("constraint", init.constraint);
	const [capacity, setCapacity] = useConstraint(
		"capacity",
		init.capacity,
	);

	const handleModeChange = (
		next: ComputeFormData["mode"],
	) => {
		setMode(next);
		localStorage.setItem(
			"mode",
			JSON.stringify(next),
		);
	};

	const compute = async (q: ConfigFormData) => {
		let facilitiesNeeded = 0;
		if (mode === "constraint") {
			facilitiesNeeded =
				solveFacilityNeededCountConstraint(
					q.f,
					q.r,
					q.p,
					constraint,
				);
		} else {
			facilitiesNeeded =
				solveFacilityNeededCountCapacity(
					q.f,
					q.r,
					q.p,
					capacity,
				);
		}
		const facilitiesPerArray =
			solveFacilityPerArrayCount(
				q.f,
				q.r,
				q.p,
				q.flowrate,
			);

		const materialPerMinutePerFacility =
			solveDemandPerMinutePerFacility(
				q.f,
				q.r,
				q.p,
				q.pSprayCount,
			);

		const productPerMinutePerFacility =
			solveProductionPerMinutePerFacility(
				q.f,
				q.r,
				q.p,
			);

		let arraysNeeded = 0;
		if (facilitiesPerArray > 0) {
			arraysNeeded = Math.floor(
				facilitiesNeeded / facilitiesPerArray,
			);
		}

		const facilityLeftover =
			facilitiesNeeded -
			arraysNeeded * facilitiesPerArray;

		const workConsumptionPerFacility =
			solveWorkConsumptionMWPerFacility(
				q.f,
				q.p,
				q.s,
			);

		const idleConsumptionPerFacility =
			solveIdleConsumptionMWPerFacility(q.f, q.s);
		return {
			facilitiesNeeded,
			idleConsumptionPerFacility,
			workConsumptionPerFacility,
			facilityLeftover,
			arraysNeeded,
			productPerMinutePerFacility,
			materialPerMinutePerFacility,
			facilitiesPerArray,
		};
	};

	const computed: ComputeFormData = {
		capacity,
		constraint,
		mode,
	};
	return {
		computed,
		handleModeChange,
		setCapacity,
		setConstraint,
		compute,
	};
};
