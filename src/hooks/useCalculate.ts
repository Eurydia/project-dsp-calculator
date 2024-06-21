import { useRef } from "react";
import {
	ComputeFormData,
	ComputeFormHandlers,
} from "~types/query";
import { useCapacity } from "./useCapacity";
import { useComputeMode } from "./useComputeMode";
import { useConstraint } from "./useConstraint";

export const useCalculate = (): {
	data: ComputeFormData;
	handlers: ComputeFormHandlers;
} => {
	const { current: init } = useRef(
		getLocalComputeFormData(),
	);
	const [computeMode, handleComputeModeChange] =
		useComputeMode(init.computeMode);
	const [
		constraint,
		setConstraint,
		handleConstraintUpdate,
	] = useConstraint(init.constraint);
	const [
		capacity,
		setCapacity,
		handleCapacityUpdate,
	] = useCapacity(init.capacity);

	const handleCapacityChange = (
		next: Record<string, string>,
	) => {
		const n: Record<string, string> = {};
		for (const k in next) {
			n[k] = "";
		}
		setCapacity(n);
	};
	const handleConstraintChange = (
		next: Record<string, string>,
	) => {
		const n: Record<string, string> = {};
		for (const k in next) {
			n[k] = "";
		}
		setConstraint(n);
	};

	// const compute = (q: ConfigFormData) => {
	// 	let facilitiesNeeded = 0;
	// 	if (mode === "constraint") {
	// 		facilitiesNeeded =
	// 			solveFacilityNeededCountConstraint(
	// 				q.facility,
	// 				q.recipe,
	// 				q.proliferator,
	// 				constraint,
	// 			);
	// 	} else {
	// 		facilitiesNeeded =
	// 			solveFacilityNeededCountCapacity(
	// 				q.facility,
	// 				q.recipe,
	// 				q.proliferator,
	// 				capacity,
	// 			);
	// 	}
	// 	const facilitiesPerArray =
	// 		solveFacilityPerArrayCount(
	// 			q.facility,
	// 			q.recipe,
	// 			q.proliferator,
	// 			q.flowrate,
	// 		);

	// 	const materialPerMinutePerFacility =
	// 		solveDemandPerMinutePerFacility(
	// 			q.facility,
	// 			q.recipe,
	// 			q.proliferator,
	// 			q.proliferatorSprayCount,
	// 		);

	// 	const productPerMinutePerFacility =
	// 		solveProductionPerMinutePerFacility(
	// 			q.facility,
	// 			q.recipe,
	// 			q.proliferator,
	// 		);

	// 	let arraysNeeded = 0;
	// 	if (facilitiesPerArray > 0) {
	// 		arraysNeeded = Math.floor(
	// 			facilitiesNeeded / facilitiesPerArray,
	// 		);
	// 	}

	// 	const facilityLeftover =
	// 		facilitiesNeeded -
	// 		arraysNeeded * facilitiesPerArray;

	// 	const workConsumptionPerFacility =
	// 		solveWorkConsumptionMWPerFacility(
	// 			q.facility,
	// 			q.proliferator,
	// 			q.sorter,
	// 		);

	// 	const idleConsumptionPerFacility =
	// 		solveIdleConsumptionMWPerFacility(
	// 			q.facility,
	// 			q.sorter,
	// 		);
	// 	return {
	// 		facilitiesNeeded,
	// 		idleConsumptionPerFacility,
	// 		workConsumptionPerFacility,
	// 		facilityLeftover,
	// 		arraysNeeded,
	// 		productPerMinutePerFacility,
	// 		materialPerMinutePerFacility,
	// 		facilitiesPerArray,
	// 	};
	// };

	const data: ComputeFormData = {
		capacity,
		constraint,
		computeMode,
	};
	const handlers: ComputeFormHandlers = {
		handleComputeModeChange,
		handleCapacityChange,
		handleConstraintChange,
		handleConstraintUpdate,
		handleCapacityUpdate,
	};
	return {
		data,
		handlers,
	};
};
