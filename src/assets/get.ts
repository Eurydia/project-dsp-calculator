import {
	FACILITY_REGISTRY,
	PROLIFERATOR_REGISTERY,
	Proliferator,
	RECIPE_REGISTRY,
	Recipe,
	SORTER_REGISTRY,
} from "@eurydos/dsp-item-registry";
import {
	facilityKey,
	recipeKey,
} from "../database/keys";

export const getFacility = (label: string) => {
	return FACILITY_REGISTRY.get(label);
};

export const getFacilityAll = () => {
	const items = FACILITY_REGISTRY.values();
	return [...items];
};

export const getRecipeAllWithType = (
	rType: string,
) => {
	const items: Recipe[] = [];
	for (const item of RECIPE_REGISTRY.values()) {
		if (item.recipeType === rType) {
			items.push(item);
		}
	}
	return items;
};

export const getRecipe = (label: string) => {
	return RECIPE_REGISTRY.get(label);
};

export const getRecipeAll = () => {
	const items = RECIPE_REGISTRY.values();
	return [...items];
};

export const getProliferator = (
	label: string,
) => {
	return PROLIFERATOR_REGISTERY.get(label);
};
export const getProliferatorAll = () => {
	const items = PROLIFERATOR_REGISTERY.values();
	return [...items];
};

export const getProliferatorAllWithMode = (
	mode: string,
) => {
	const items: Proliferator[] = [];
	for (const item of PROLIFERATOR_REGISTERY.values()) {
		if (item.mode === mode) {
			items.push(item);
		}
	}
	return items;
};

export const getSorter = (label: string) => {
	return SORTER_REGISTRY.get(label);
};

export const getLocalFacility = () => {
	return localStorage.getItem(facilityKey);
};

export const getLocalRecipe = () => {
	return localStorage.getItem(recipeKey);
};
