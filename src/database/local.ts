import {
	getFacility,
	getProliferator,
	getRecipe,
	getSorterAll,
} from "~assets/get";
import { ConfigFormData } from "~types/query";

export const facilityKey = "facility";
export const recipeKey = "recipe";
export const proliferatorKey = "proliferator";
export const sorterKey = "sorter";
export const flowrateKey = "flowrate";
export const proliferatorSprayCountKey =
	"proliferatorSprayCount";
export const computeModeKey = "computeMode";
export const constraintKey = "constraint";
export const capacityKey = "capacity";

export const getLocalConfigForm = () => {
	const facility =
		getLocalFacility() ??
		getFacility("Arc Smelter")!;

	const recipe =
		getLocalRecipe() ??
		getRecipe("Copper Ingot")!;

	const proliferator =
		getLocalProliferator() ??
		getProliferator("None")!;

	const proliferatorSprayCount =
		getLocalProliferatorSprayCount() ??
		proliferator.sprayCount.toString();

	const sorter = getLocalRecord(sorterKey);
	const sorterCorrected: Record<string, string> =
		sorter === null ? {} : sorter;
	if (sorter === null) {
		for (const s of getSorterAll()) {
			sorterCorrected[s.label] = "";
		}
	}
	const flowrate = getLocalRecord(flowrateKey);
	const flowrateCorrected =
		flowrate === null ? {} : flowrate;
	if (flowrate === null) {
		for (const k in recipe.materialRecord) {
			flowrateCorrected[k] = "";
		}
		for (const k in recipe.productRecord) {
			flowrateCorrected[k] = "";
		}
	}

	const data: ConfigFormData = {
		facility,
		recipe,
		proliferator,
		proliferatorSprayCount,
		sorter: sorterCorrected,
		flowrate: flowrateCorrected,
	};
	return data;
};

export const getLocalProliferatorSprayCount =
	() => {
		return localStorage.getItem(
			proliferatorSprayCountKey,
		);
	};

export const getLocalRecord = (
	key: string,
): Record<string, string> | null => {
	try {
		const jsonString = localStorage.getItem(key);
		if (jsonString === null) {
			return null;
		}
		const jsonObj = JSON.parse(jsonString);
		if (typeof jsonObj !== "object") {
			return null;
		}
		for (const key in jsonObj as Object) {
			if (typeof jsonObj[key] !== "string") {
				return null;
			}
		}
		return jsonObj;
	} catch {
		return null;
	}
};

export const setLocalRecord = (
	key: string,
	item: Record<string, string>,
) => {
	const jsonString = JSON.stringify(item);
	localStorage.setItem(key, jsonString);
};

export const getLocalFacility = () => {
	const label = localStorage.getItem(facilityKey);
	if (label === null) {
		return undefined;
	}
	return getFacility(label);
};

export const getLocalRecipe = () => {
	const label = localStorage.getItem(recipeKey);
	if (label === null) {
		return undefined;
	}
	return getRecipe(label);
};

export const getLocalProliferator = () => {
	const label = localStorage.getItem(
		proliferatorKey,
	);
	if (label === null) {
		return undefined;
	}
	return getProliferator(label);
};

export const setLocalString = (
	key: string,
	str: string,
) => {
	localStorage.setItem(key, str);
};
