import {
	Facility,
	Proliferator,
	ProliferatorMode,
	Recipe,
} from "@eurydos/dsp-item-registry";
import {
	getProliferatorWithMode,
	getRecipeWithType,
} from "~database/get";
import { ConfigFormData } from "~types/query";
import { useFacility } from "./useFacility";
import { useFlowrate } from "./useFlowrate";
import { useProliferator } from "./useProliferator";
import { useProliferatorSprayCount } from "./useProliferatorSprayCount";
import { useRecipe } from "./useRecipe";
import { useSorter } from "./useSorter";

export const useConfigForm = (
	init: ConfigFormData,
) => {
	const [f, setF] = useFacility("f", init.f);
	const [r, setR] = useRecipe("r", init.r);
	const [s, setS] = useSorter("s", init.s);
	const [p, setP] = useProliferator("p", init.p);
	const [pSprayCount, setPSprayCount] =
		useProliferatorSprayCount(
			"pSprayCount",
			init.pSprayCount,
		);
	const [flowrate, setFlowrate, updateFlowrate] =
		useFlowrate("flowrate", init.flowrate);

	const handleFChange = async (
		nextF: Facility,
	) => {
		setF(nextF);
		const nextR = (await getRecipeWithType(
			nextF.recipeType,
		))!;
		await handleRChange(nextR);
	};

	const handleRChange = async (nextR: Recipe) => {
		setR(nextR);

		if (
			nextR.speedupOnly &&
			p.mode === "Extra Products"
		) {
			const nextP =
				(await getProliferatorWithMode(
					ProliferatorMode.PRODUCTION_SPEEDUP,
				))!;
			setP(nextP);
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

	const handleSChange = async (
		label: string,
		value: string,
	) => {
		const { connectionCount } = f;
		setS(label, value, connectionCount);
	};

	const handleFlowrateChange = async (
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
		setPSprayCount(nextP.sprayCount.toString());
	};

	const data: ConfigFormData = {
		f,
		flowrate,
		p,
		pSprayCount,
		r,
		s,
	};

	return {
		data,
		handleFChange,
		handleRChange,
		handleSChange,
		handlePChange,
		handleFlowrateChange,
		setPSprayCount,
	};
};
