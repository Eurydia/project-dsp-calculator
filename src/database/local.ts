import {
	Facility,
	Proliferator,
	Recipe,
} from "@eurydos/dsp-item-registry";

export const facilityKey = "facility";
export const recipeKey = "recipe";
export const proliferatorKey = "proliferator";
export const sorterKey = "sorter";
export const flowrateKey = "flowrate";
export const proliferatorSprayCountKey =
	"proliferatorSprayCount";

export const getLocalProliferatorSprayCount =
	() => {
		return localStorage.getItem(
			proliferatorSprayCountKey,
		);
	};

export const setLocalProliferatorSprayCount = (
	c: string,
) => {
	localStorage.setItem(
		proliferatorSprayCountKey,
		c,
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
	return localStorage.getItem(facilityKey);
};

export const getLocalRecipe = () => {
	return localStorage.getItem(recipeKey);
};

export const getLocalProliferator = () => {
	return localStorage.getItem(proliferatorKey);
};

export const setLocalFacility = (f: Facility) => {
	localStorage.setItem(facilityKey, f.label);
};

export const setLocalRecipe = (r: Recipe) => {
	localStorage.setItem(recipeKey, r.label);
};

export const setLocalProliferator = (
	p: Proliferator,
) => {
	localStorage.setItem(proliferatorKey, p.label);
};
