import {
	Facility,
	Proliferator,
	Recipe,
} from "@eurydos/dsp-item-registry";

export type ConfigFormData = {
	facility: Facility;
	recipe: Recipe;
	proliferator: Proliferator;
	sorter: Record<string, string>;
	proliferatorSprayCount: string;
	flowrate: Record<string, string>;
};

export type configFormHandlers = {
	handleFacilityChange: (f: Facility) => void;
	handleRecipeChange: (r: Recipe) => void;
	handleProliferatorChange: (
		p: Proliferator,
	) => void;
	handleProliferatorSprayCountChange: (
		v: string,
	) => void;
	handleSorterChange: (
		l: string,
		v: string,
	) => void;
	handleFlowrateChange: (
		l: string,
		v: string,
	) => void;
};

export type ComputeFormData = {
	computeMode: string;
	capacity: Record<string, string>;
	constraint: Record<string, string>;
};

export type ComputeFormHandlers = {
	handleComputeModeChange: (next: string) => void;
	handleCapacityUpdate: (
		k: string,
		v: string,
	) => void;
	handleConstraintUpdate: (
		k: string,
		v: string,
	) => void;
	handleCapacityChange: (
		next: Record<string, string>,
	) => void;
	handleConstraintChange: (
		next: Record<string, string>,
	) => void;
};
