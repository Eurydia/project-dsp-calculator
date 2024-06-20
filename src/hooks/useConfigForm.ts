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
import { getLocalConfigForm } from "~database/local";
import {
	ConfigFormData,
	configFormHandlers,
} from "~types/query";
import { useFacility } from "./useFacility";
import { useFlowrate } from "./useFlowrate";
import { useProliferator } from "./useProliferator";
import { useProliferatorSprayCount } from "./useProliferatorSprayCount";
import { useRecipe } from "./useRecipe";
import { useSorter } from "./useSorter";

export const useConfigForm = () => {
	const { current: init } = useRef(
		getLocalConfigForm(),
	);

	const [facility, setFacility] = useFacility(
		init.facility,
	);
	const [recipe, setRecipe] = useRecipe(
		init.recipe,
	);
	const [sorter, setSorter] = useSorter(
		init.sorter,
	);
	const [proliferator, setProliferator] =
		useProliferator(init.proliferator);
	const [
		proliferatorSprayCount,
		handleProliferatorSprayCountChange,
	] = useProliferatorSprayCount(
		init.proliferatorSprayCount,
	);
	const [flowrate, setFlowrate, updateFlowrate] =
		useFlowrate(init.flowrate);

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
		for (const key in nextR.materialRecord) {
			nextFlowrate[key] = "0";
		}
		for (const key in nextR.productRecord) {
			nextFlowrate[key] = "0";
		}
		setFlowrate(nextFlowrate);
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
			connectionCount,
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

	const data: ConfigFormData = {
		facility,
		flowrate,
		proliferator,
		proliferatorSprayCount,
		recipe,
		sorter,
	};
	const handlers: configFormHandlers = {
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
