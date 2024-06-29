import {
	getFacility,
	getProliferator,
	getRecipe,
	getSorterAll,
} from "~assets/get";
import { tryParseInt } from "~core/parsing";
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

const getLocalStringRecord = (
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

/**
 * @version 2.6.0
 * @description
 *
 */
export const getLocalComputeFormData = () => {
	const configFormData = getLocalConfigFormData();
	const computeMode =
		getLocalComputeMode() ?? "0";
	const constraint = getLocalStringRecord(
		CONSTRAINT_KEY,
	);
	const constraintCorrected =
		constraint === null ? {} : constraint;
	for (const k in configFormData.recipe
		.materialRecord) {
		constraintCorrected[k] = "";
		if (constraint !== null) {
			constraintCorrected[k] =
				constraint[k] ?? "";
		}
	}
	const capacity =
		getLocalStringRecord(CAPACITY_KEY);
	const capacityCorrected =
		capacity === null ? {} : capacity;
	for (const k in configFormData.recipe
		.productRecord) {
		capacityCorrected[k] = "";
		if (capacity !== null) {
			capacityCorrected[k] = capacity[k] ?? "";
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

	const sorter = getLocalStringRecord(SORTER_KEY);
	const sorterCorrected: Record<string, string> =
		sorter === null ? {} : sorter;
	if (sorter === null) {
		for (const s of getSorterAll()) {
			sorterCorrected[s.label] = "";
		}
	}
	const flowrate =
		getLocalStringRecord(FLOWRATE_KEY);
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

/**
 * @version 2.6.0
 * @description
 * Loads a string, which represents the proliferator spray count, from local storage, sanitizes it, and returns it.
 *
 * If the sanitization fails, it returns null.
 */
export const getLocalProliferatorSprayCount = ():
	| string
	| null => {
	const numString = localStorage.getItem(
		PROLIFERATOR_SPRAY_COUNT_KEY,
	);
	if (numString === null) {
		return null;
	}
	const p = tryParseInt(numString);
	if (typeof p !== "number") {
		return null;
	}
	return p.toString();
};

/**
 * @version 2.6.0
 * @description
 * Loads a string from local storage, performs type-checking, and passes it to the callback function.
 *
 * This function is a generic version of getLocalFacility, getLocalRecipe, and getLocalProliferator functions. It reduces code duplication.
 */
const getLocalObject = <T>(
	key: string,
	processor: (label: string) => T | null,
) => {
	const label: unknown | null =
		localStorage.getItem(key);
	if (
		label === null ||
		typeof label !== "string"
	) {
		return null;
	}
	return processor(label);
};

export const getLocalFacility = () =>
	getLocalObject(FACILITY_KEY, getFacility);
export const getLocalRecipe = () =>
	getLocalObject(RECIPE_KEY, getRecipe);
export const getLocalProliferator = () =>
	getLocalObject(
		PROLIFERATOR_KEY,
		getProliferator,
	);
