import {
	FACILITY_REGISTRY,
	PROLIFERATOR_REGISTERY,
	RECIPE_REGISTRY,
} from "@eurydos/dsp-item-registry";

export const FACILITY_OPTIONS = Object.values(
	FACILITY_REGISTRY,
).map(({ label }) => label);
export const RECIPE_OPTIONS = Object.values(
	RECIPE_REGISTRY,
).map(({ label }) => label);
export const PROLIF_OPTIONS = Object.values(
	PROLIFERATOR_REGISTERY,
).map(({ label }) => label);
