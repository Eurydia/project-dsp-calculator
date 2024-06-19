import {
	FACILITY_REGISTRY,
	RECIPE_REGISTRY,
} from "@eurydos/dsp-item-registry";
import {
	getFacility,
	getLocalFacility,
	getLocalRecipe,
	getRecipe,
} from "~database/get";
import { ConfigFormData } from "~types/query";

export const extractConfigFormQuery =
	async (): Promise<ConfigFormData> => {
		const fLabel: string =
			getLocalFacility() ?? "Arc Smelter";
		const fItem =
			(await getFacility(fLabel)) ??
			FACILITY_REGISTRY[fLabel];

		const rLabel: string =
			getLocalRecipe() ?? "Copper Ingot";
		const rItem =
			(await getRecipe(rLabel)) ??
			RECIPE_REGISTRY[rLabel];

		const formData: ConfigFormData = {
			f: fItem,
			r: rItem,
		};
		return formData;
	};
