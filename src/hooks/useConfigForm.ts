import {
	Facility,
	Proliferator,
	ProliferatorMode,
	Recipe,
} from "@eurydos/dsp-item-registry";
import {
	getProliferatorWithMode,
	getRecipeWithType,
} from "~assets/get";
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

export const useConfigForm = (
	init: ConfigFormData,
) => {
	const [f, setF] = useFacility(init.f);
	const [r, setR] = useRecipe(init.r);
	const [s, setS] = useSorter(init.s);
	const [p, setP] = useProliferator(init.p);
	const [pSprayCount, handlePSprayCount] =
		useProliferatorSprayCount(init.pSprayCount);
	const [flowrate, setFlowrate, updateFlowrate] =
		useFlowrate(init.flowrate);

	const handleFChange = (nextF: Facility) => {
		setF(nextF);
		const nextR = getRecipeWithType(
			nextF.recipeType,
		);
		if (nextR === undefined) {
			return;
		}
		handleRChange(nextR);
	};

	const handleRChange = (nextR: Recipe) => {
		setR(nextR);

		if (
			nextR.speedupOnly &&
			p.mode === "Extra Products"
		) {
			const nextP = getProliferatorWithMode(
				ProliferatorMode.PRODUCTION_SPEEDUP,
			);
			if (nextP !== undefined) {
				setP(nextP);
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

	const handleSChange = (
		label: string,
		value: string,
	) => {
		const { connectionCount } = f;
		setS(label, value, connectionCount);
	};

	const handleFlowrateChange = (
		itemLabel: string,
		value: string,
	) => {
		const { connectionCount } = f;
		updateFlowrate(
			itemLabel,
			value,
			connectionCount,
		);
	};

	const handlePChange = (nextP: Proliferator) => {
		setP(nextP);
		handlePSprayCount(
			nextP.sprayCount.toString(),
		);
	};

	const data: ConfigFormData = {
		f,
		flowrate,
		p,
		pSprayCount,
		r,
		s,
	};
	const handlers: configFormHandlers = {
		handleFChange,
		handlePChange,
		handleRChange,
		handleSChange,
		handleFlowrateChange,
		handlePSprayCount,
	};
	return {
		data,
		handlers,
	};
};
