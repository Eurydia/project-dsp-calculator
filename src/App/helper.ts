import { object } from "zod";
import { AssetProliferators } from "../assets";
import {
	Preferences,
	Configuration,
} from "../types";

const computeCyclesPerMinute = (
	config: Configuration,
): number => {
	const {
		recipeCycleTimeSecond:
			recipe_cycle_time_second,
		facilitySpeedupMultiplier:
			facility_speed_multiplier,
		proliferatorSpeedupMultiplier:
			proliferator_speed_multiplier,
	} = config;

	return (
		(60 / recipe_cycle_time_second) *
		facility_speed_multiplier *
		proliferator_speed_multiplier
	);
};

const computeFacilitiesPerBelt = (
	belt_flowrate_per_minute: number,
	item_flowrate_per_minute: number,
): number => {
	const supportable: number = Math.floor(
		belt_flowrate_per_minute /
			item_flowrate_per_minute,
	);

	return supportable;
};

export const computeFacilitiesPerArray = (
	config: Configuration,
	preferences: Preferences,
	// facility: Facility,
	// recipe: Recipe,
	// proliferator: Proliferator,
	// input_flowrate_per_minute: number,
	// output_flowrate_per_minute: number,
): number => {
	const {
		recipeMaterialRatioRecord:
			recipe_material_ratios,
		recipeProductRatioRecord:
			recipe_product_ratios,
		inputFlowrateMinute:
			input_flowrate_per_minute,
		outputFlowrateMinute:
			output_flowrate_per_minute,
		proliferatorProductMultiplier:
			proliferator_product_multiplier,
	} = config;

	const { preferEven, keepBeltUnderMaxFlow } =
		preferences;

	const cycles_per_minute =
		computeCyclesPerMinute(config);

	const input_limiting_item =
		Math.max(
			...Object.values(recipe_material_ratios),
		) * cycles_per_minute;

	const input_supportable: number =
		computeFacilitiesPerBelt(
			input_flowrate_per_minute,
			input_limiting_item,
		);

	const output_limiting_item =
		Math.max(
			...Object.values(recipe_product_ratios),
		) *
		cycles_per_minute *
		proliferator_product_multiplier;

	let output_supportable: number =
		computeFacilitiesPerBelt(
			output_flowrate_per_minute,
			output_limiting_item,
		);

	if (
		keepBeltUnderMaxFlow &&
		output_supportable > 1 &&
		output_supportable * output_limiting_item >=
			output_flowrate_per_minute
	) {
		output_supportable = output_supportable - 1;
	}

	let facilities_per_array: number = Math.min(
		input_supportable,
		output_supportable,
	);

	if (
		preferEven &&
		facilities_per_array % 2 === 1 &&
		facilities_per_array > 2
	) {
		return facilities_per_array - 1;
	}

	return facilities_per_array;
};

export const computeFacilitiesNeeded = (
	objectives: Record<string, number>,
	config: Configuration,
	// facility: Facility,
	// recipe: Recipe,
	// prolfierator: Proliferator,
): number => {
	if (
		Object.values(objectives).every(
			(demand) => demand === 0,
		)
	) {
		return 0;
	}

	const {
		proliferatorProductMultiplier:
			proliferator_product_multiplier,
		recipeProductRatioRecord:
			recipe_product_ratios,
	} = config;

	const cycles_per_minute =
		computeCyclesPerMinute(config);

	let facilities_neeeded: number = Math.max(
		...Object.keys(objectives).map((key) => {
			return (
				objectives[key] /
				(recipe_product_ratios[key] *
					cycles_per_minute *
					proliferator_product_multiplier)
			);
		}),
	);

	return facilities_neeeded;
};

export const computeIdlePowerPerFacility = (
	config: Configuration,
	// facility: Facility,
	// recipe: Recipe,
	// sorter: Sorter,
): number => {
	const {
		facilityIdleConsumptionMW:
			facility_idle_consumption_MW,
		sorterIdleConsumptionMW:
			sorter_idle_consumption_MW,
		recipeMaterialRatioRecord:
			recipe_material_ratios,
		recipeProductRatioRecord:
			recipe_product_ratios,
	} = config;

	const sorter_consumption =
		sorter_idle_consumption_MW *
		(Object.values(recipe_material_ratios)
			.length +
			Object.values(recipe_product_ratios)
				.length);

	return (
		sorter_consumption +
		facility_idle_consumption_MW
	);
};

export const computeWorkPowerPerFacility = (
	config: Configuration,
	// facility: Facility,
	// recipe: Recipe,
	// proliferator: Proliferator,
	// sorter: Sorter,
): number => {
	const {
		recipeMaterialRatioRecord:
			recipe_material_ratios,
		recipeProductRatioRecord:
			recipe_product_ratios,
		sorterWorkConsumptionMW:
			sorter_work_consumption_MW,
		facilityWorkConsumptionMW:
			facility_work_consumption_MW,
		proliferatorWorkConsumptionMultiplier:
			proliferator_work_consumption_multiplier,
	} = config;

	const sorter_consumption =
		sorter_work_consumption_MW *
		(Object.values(recipe_material_ratios)
			.length +
			Object.values(recipe_product_ratios)
				.length);
	const facility_consumption =
		facility_work_consumption_MW *
		proliferator_work_consumption_multiplier;

	return (
		sorter_consumption + facility_consumption
	);
};

export const computeBillMaterialsPerFacility = (
	config: Configuration,
	preferences: Preferences,
): { [K: string]: number } => {
	const {
		recipeMaterialRatioRecord:
			recipe_material_ratios,
		recipeProductRatioRecord:
			recipe_product_ratios,
		proliferatorWorkConsumptionMultiplier:
			proliferator_work_consumption_multiplier,
		proliferatorProductMultiplier:
			proliferator_product_multiplier,
	} = config;

	const { proliferateProducts } = preferences;

	const bill: { [K: string]: number } = {};

	const cycles_per_minute: number =
		computeCyclesPerMinute(config);

	let total_item_flow: number = 0;

	if (proliferateProducts) {
		Object.values(recipe_product_ratios).forEach(
			(value) => {
				total_item_flow +=
					value *
					cycles_per_minute *
					proliferator_product_multiplier;
			},
		);
	}

	Object.entries(recipe_material_ratios).forEach(
		(entry) => {
			const [key, value] = entry;
			const material_consumption: number =
				value * cycles_per_minute;
			bill[key] = material_consumption;

			total_item_flow += material_consumption;
		},
	);

	if (
		proliferator_work_consumption_multiplier ===
		1.3
	) {
		bill["Proliferator Mk. I"] =
			total_item_flow / 12;
	}

	if (
		proliferator_work_consumption_multiplier ===
		1.7
	) {
		bill["Proliferator Mk. II"] =
			total_item_flow / 24;
	}

	if (
		proliferator_work_consumption_multiplier ===
		2.5
	) {
		bill["Proliferator Mk. III "] =
			total_item_flow / 60;
	}

	return bill;
};

export const computeBillProductsPerFacility = (
	config: Configuration,
): { [K: string]: number } => {
	const {
		recipeProductRatioRecord:
			recipe_product_ratios,
		proliferatorProductMultiplier:
			proliferator_product_multiplier,
	} = config;

	const bill: { [K: string]: number } = {};
	const cycles_per_minute: number =
		computeCyclesPerMinute(config);

	Object.entries(recipe_product_ratios).forEach(
		(entry) => {
			const [key, value] = entry;
			bill[key] =
				value *
				cycles_per_minute *
				proliferator_product_multiplier;
		},
	);

	return bill;
};
