import {
	Facility,
	Proliferator,
	ProliferatorMode,
	Recipe,
} from "@eurydos/dsp-item-registry";
import { useRef } from "react";
import {
	getProliferatorWithMode,
	getRecipeWithType,
} from "~assets/get";
import {
	CAPACITY_KEY,
	COMPUTE_MODE_KEY,
	CONSTRAINT_KEY,
	FACILITY_KEY,
	PROLIFERATOR_KEY,
	PROLIFERATOR_SPRAY_COUNT_KEY,
	RECIPE_KEY,
	getLocalComputeFormData,
	getLocalConfigFormData,
} from "~database/local";
import {
	EditorFormData,
	EditorFormHandlers,
} from "~types/query";
import { useLabelObject } from "./uesLabelObject";
import { useFlowrate } from "./useFlowrate";
import { useRecord } from "./useRecord";
import { useSorter } from "./useSorter";
import { useString } from "./useString";

export const useEditorForm = () => {
	const { current: configInit } = useRef(
		getLocalConfigFormData(),
	);
	const { current: computeInit } = useRef(
		getLocalComputeFormData(),
	);

	const [facility, setFacility] = useLabelObject(
		FACILITY_KEY,
		configInit.facility,
	);
	const [recipe, setRecipe] = useLabelObject(
		RECIPE_KEY,
		configInit.recipe,
	);
	const [sorter, setSorter] = useSorter(
		configInit.sorter,
	);
	const [proliferator, setProliferator] =
		useLabelObject(
			PROLIFERATOR_KEY,
			configInit.proliferator,
		);
	const [
		proliferatorSprayCount,
		handleProliferatorSprayCountChange,
	] = useString(
		PROLIFERATOR_SPRAY_COUNT_KEY,
		configInit.proliferatorSprayCount,
	);
	const [flowrate, updateFlowrate, setFlowrate] =
		useFlowrate(configInit.flowrate);

	const [computeMode, handleComputeModeChange] =
		useString(
			COMPUTE_MODE_KEY,
			computeInit.computeMode,
		);
	const [
		constraint,
		handleConstraintUpdate,
		handleConstraintChange,
	] = useRecord(
		CONSTRAINT_KEY,
		computeInit.constraint,
	);
	const [
		capacity,
		handleCapacityUpdate,
		handleCapacityChange,
	] = useRecord(
		CAPACITY_KEY,
		computeInit.capacity,
	);

	const handleFacilityChange = (
		nextF: Facility,
	) => {
		setFacility(nextF);
		const nextR = getRecipeWithType(
			nextF.recipeType,
		);
		if (nextR === undefined) {
			return;
		}
		handleRecipeChange(nextR);
	};

	const handleRecipeChange = (nextR: Recipe) => {
		setRecipe(nextR);
		if (
			nextR.speedupOnly &&
			proliferator.mode === "Extra Products"
		) {
			const nextP = getProliferatorWithMode(
				ProliferatorMode.PRODUCTION_SPEEDUP,
			);
			if (nextP !== undefined) {
				setProliferator(nextP);
			}
		}
		const nextFlowrate: Record<string, string> =
			{};
		const nextConstraint: Record<string, string> =
			{};
		const nextCapacity: Record<string, string> =
			{};
		for (const k in nextR.materialRecord) {
			nextConstraint[k] = "";
			nextFlowrate[k] = "0";
		}
		for (const k in nextR.productRecord) {
			nextCapacity[k] = "";
			nextFlowrate[k] = "0";
		}
		setFlowrate(nextFlowrate);
		handleCapacityChange(nextCapacity);
		handleConstraintChange(nextConstraint);
	};

	const handleSorterChange = (
		label: string,
		value: string,
	) => {
		const { connectionCount } = facility;
		setSorter(label, value, connectionCount);
	};

	const handleFlowrateChange = (
		itemLabel: string,
		value: string,
	) => {
		const { connectionCount } = facility;
		updateFlowrate(
			itemLabel,
			value,
			connectionCount * 7200,
		);
	};

	const handleProliferatorChange = (
		nextP: Proliferator,
	) => {
		setProliferator(nextP);
		handleProliferatorSprayCountChange(
			nextP.sprayCount.toString(),
		);
	};

	const data: EditorFormData = {
		facility,
		flowrate,
		proliferator,
		proliferatorSprayCount,
		recipe,
		sorter,
		capacity,
		computeMode,
		constraint,
	};
	const handlers: EditorFormHandlers = {
		handleConstraintUpdate,
		handleCapacityUpdate,
		handleComputeModeChange,
		handleFacilityChange,
		handleProliferatorChange,
		handleRecipeChange,
		handleSorterChange,
		handleFlowrateChange,
		handleProliferatorSprayCountChange,
	};
	return {
		data,
		handlers,
	};
};
