import { ProliferatorMode } from "@eurydos/dsp-item-registry";
import {
	getFacility,
	getProliferator,
	getRecipe,
} from "~assets/get";
import {
	tryParse,
	tryParseInt,
} from "~core/parsing";
import { EditorFormData } from "~types/query";

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

/**
 * @version 2.6.0
 * @description
 * Loads an object from local storage, parses it, sanitizes it, and returns it.
 *
 * The object should be a record whose keys are strings and values are strings.
 * Otherwise, the function returns null.
 *
 * It accepts a validator for the values.
 */
const getLocalStringRecord = (
	key: string,
): Record<string, string> | null => {
	const jsonString = localStorage.getItem(key);
	if (jsonString === null) {
		return null;
	}
	const jsonObj = tryParse(jsonString);
	if (
		jsonObj === null ||
		typeof jsonObj !== "object"
	) {
		return null;
	}
	// Every key should be a string.
	for (const key in jsonObj) {
		if (typeof key !== "string") {
			return null;
		}
	}
	const obj = jsonObj as Record<string, unknown>;
	// Every value should be a string and pass the validator.
	for (const k in obj) {
		const v = obj[k];
		if (typeof v !== "string") {
			return null;
		}
		if (v !== "" && tryParseInt(v) === null) {
			return null;
		}
	}
	const p = obj as Record<string, string>;
	return p;
};

/**
 * @version 2.6.0
 * @description
 * Loads the previous session data from local storage, sanitizes it, and returns it.
 *
 * This function does not attempt to recover data, so if the sanitization fails, it returns a predfined fallback object.
 */

export const getLocalEditorFormData =
	(): EditorFormData => {
		const fallback: EditorFormData = {
			facility: getFacility("Arc Smelter")!,
			recipe: getRecipe("Copper Ingot")!,
			proliferator: getProliferator("None")!,
			proliferatorSprayCount: "12",
			sorter: {
				"Sorter Mk.I": "",
				"Sorter Mk.II": "",
				"Sorter Mk.III": "",
				"Pile Sorter": "",
			},
			flowrate: {
				"Copper Ore": "",
				"Copper Ingot": "",
			},
			capacity: {
				"Copper Ingot": "",
			},
			constraint: {
				"Copper Ore": "",
			},
			computeMode: "0",
		};

		// The compute mode, if it exists, should be either "0" or "1".
		// Its value is independent of the other facility so I will place it before.
		const computeMode = getLocalComputeMode();
		if (!computeMode) {
			return fallback;
		}

		// Everything should based on the saved facility.
		const facility = getLocalFacility();
		if (!facility) {
			return fallback;
		}

		// The recipe, if it exists, should have the same recipe type as the facility.
		const recipe = getLocalRecipe();
		if (
			!recipe ||
			recipe.recipeType !== facility.recipeType
		) {
			return fallback;
		}

		// The proliferator, if it exists, should be compatible with the recipe.
		const proliferator = getLocalProliferator();
		if (
			!proliferator ||
			(proliferator.mode ===
				ProliferatorMode.EXTRA_PRODUCTS &&
				recipe.speedupOnly)
		) {
			return fallback;
		}

		// The proliferator spray count, if it exists, should be empty string or a string representing a natural number.
		const proliferatorSprayCount =
			getLocalProliferatorSprayCount();
		if (!proliferatorSprayCount) {
			return fallback;
		}

		// The sorter, if it exists, should contain sorter labels as keys, and the values must empty strings or strings representing natural numbers.
		const sorter =
			getLocalStringRecord(SORTER_KEY);
		if (!sorter) {
			return fallback;
		}

		// The constraint, if it exists, should match exactly the keys in the recipe's material record.
		const constraint = getLocalStringRecord(
			CONSTRAINT_KEY,
		);
		if (constraint === null) {
			return fallback;
		}
		for (const k in constraint) {
			if (
				recipe.materialRecord[k] === undefined
			) {
				return fallback;
			}
		}

		// The capacity, if it exists, should match exactly the keys in the recipe's product record.
		const capacity =
			getLocalStringRecord(CAPACITY_KEY);
		if (capacity === null) {
			return fallback;
		}
		for (const k in capacity) {
			if (recipe.productRecord[k] === undefined) {
				return fallback;
			}
		}

		// The flowrate, if it exists, should match exactly the keys in the recipe's material and product records.
		const flowrate =
			getLocalStringRecord(FLOWRATE_KEY);
		if (flowrate === null) {
			return fallback;
		}
		for (const k in flowrate) {
			if (
				recipe.materialRecord[k] === undefined &&
				recipe.productRecord[k] === undefined
			) {
				return fallback;
			}
		}

		// combined check for flowrate, capacity, and constraint to reduce the number of iterations.
		for (const k in recipe.materialRecord) {
			if (flowrate[k] === undefined) {
				return fallback;
			}
			if (constraint[k] === undefined) {
				return fallback;
			}
		}
		for (const k in recipe.productRecord) {
			if (flowrate[k] === undefined) {
				return fallback;
			}
			if (capacity[k] === undefined) {
				return fallback;
			}
		}

		const formData: EditorFormData = {
			facility,
			recipe,
			proliferator,
			proliferatorSprayCount,
			sorter,
			flowrate,
			capacity,
			constraint,
			computeMode,
		};
		return formData;
	};

const getLocalComputeMode = () => {
	const mode = localStorage.getItem(
		COMPUTE_MODE_KEY,
	);
	if (mode === null) {
		return null;
	}
	if (mode !== "0" && mode !== "1") {
		return null;
	}
	return mode;
};

/**
 * @version 2.6.0
 * @description
 * Loads a string, which represents the proliferator spray count, from local storage, sanitizes it, and returns it.
 * If the sanitization fails, it returns null.
 *
 * An empty is valid, and non-empty strings must represent a natural number.
 */
const getLocalProliferatorSprayCount = ():
	| string
	| null => {
	const numString = localStorage.getItem(
		PROLIFERATOR_SPRAY_COUNT_KEY,
	);
	if (numString === null) {
		return null;
	}
	if (numString === "") {
		return "";
	}
	const p = tryParseInt(numString);
	if (p === null || p < 0) {
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

const getLocalFacility = () =>
	getLocalObject(FACILITY_KEY, getFacility);
const getLocalRecipe = () =>
	getLocalObject(RECIPE_KEY, getRecipe);
const getLocalProliferator = () =>
	getLocalObject(
		PROLIFERATOR_KEY,
		getProliferator,
	);
