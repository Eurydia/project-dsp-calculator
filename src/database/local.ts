import {
	getFacility,
	getProliferator,
	getRecipe,
	getSorterAll,
} from "~assets/get";
import {
	ComputeFormData,
	ConfigFormData,
} from "~types/query";

export const FACILITY_KEY = "facility";
export const RECIPE_KEY = "recipe";
export const PROLIFERATOR_KEY = "proliferator";
export const SORTER_KEY = "sorter";
export const FLOWRATE_KEY = "flowrate";
export const PROLIFERATOR_SPRAY_COUNT_KEY =
	"proliferatorSprayCount";
export const COMPUTE_MODE_KEY = "computeMode";
export const CONSTRAINT_KEY = "constraint";
export const CAPACITY_KEY = "capacity";

export const getLocalComputeFormData = () => {
	const configFormData = getLocalConfigFormData();
	const computeMode =
		getLocalComputeMode() ?? "0";
	const constraint = getLocalRecord(
		CONSTRAINT_KEY,
	);
	const constraintCorrected =
		constraint === null ? {} : constraint;
	if (constraint === null) {
		for (const k in configFormData.recipe
			.materialRecord) {
			constraintCorrected[k] = "";
		}
	}
	const capacity = getLocalRecord(CAPACITY_KEY);
	const capacityCorrected =
		capacity === null ? {} : capacity;
	if (capacity === null) {
		for (const k in configFormData.recipe
			.productRecord) {
			capacityCorrected[k] = "";
		}
	}
	const formData: ComputeFormData = {
		computeMode,
		constraint: constraintCorrected,
		capacity: capacityCorrected,
	};
	return formData;
};

export const getLocalComputeMode = () => {
	const item = localStorage.getItem(
		COMPUTE_MODE_KEY,
	);
	if (
		item === null ||
		(item !== "0" && item !== "1")
	) {
		return null;
	}
	return item;
};

export const getLocalConfigFormData = () => {
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

	const sorter = getLocalRecord(SORTER_KEY);
	const sorterCorrected: Record<string, string> =
		sorter === null ? {} : sorter;
	if (sorter === null) {
		for (const s of getSorterAll()) {
			sorterCorrected[s.label] = "";
		}
	}
	const flowrate = getLocalRecord(FLOWRATE_KEY);
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
			PROLIFERATOR_SPRAY_COUNT_KEY,
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
	const label =
		localStorage.getItem(FACILITY_KEY);
	if (label === null) {
		return undefined;
	}
	return getFacility(label);
};

export const getLocalRecipe = () => {
	const label = localStorage.getItem(RECIPE_KEY);
	if (label === null) {
		return undefined;
	}
	return getRecipe(label);
};

export const getLocalProliferator = () => {
	const label = localStorage.getItem(
		PROLIFERATOR_KEY,
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
