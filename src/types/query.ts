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

type ConfigFormHandlers = {
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

type ComputeFormHandlers = {
	handleComputeModeChange: (next: string) => void;
	handleCapacityUpdate: (
		k: string,
		v: string,
	) => void;
	handleConstraintUpdate: (
		k: string,
		v: string,
	) => void;
};

export type EditorFormData = ComputeFormData &
	ConfigFormData;
export type EditorFormHandlers =
	ComputeFormHandlers & ConfigFormHandlers;

export type FlowData = {
	facilitiesNeeded: number;
	facilitiesPerArray: number;
	materialFlowPerMinutePerFacility: Record<
		string,
		number
	>;
	productFlowPerMinutePerFacility: Record<
		string,
		number
	>;
};

export type PowerUsageData = {
	facilitiesNeeded: number;
	facilitiesPerArray: number;
	workUsageMWPerFacility: number;
	idleUsageMWPerFacility: number;
};
