import { Preferences, Context } from "../types";

const computeCyclesPerMinute = (
	config: Context,
): number => {
	const {
		recipeCycleTime: recipeCycleTimeSecond,
		facilitySpeedupMultiplier,
		proliferatorSpeedupMultiplier,
	} = config;

	return (
		(60 / recipeCycleTimeSecond) *
		facilitySpeedupMultiplier *
		proliferatorSpeedupMultiplier
	);
};

const computeFacilitiesPerBelt = (
	beltFlowrateMinute: number,
	itemFlowrateMinute: number,
): number => {
	const supportable: number = Math.floor(
		beltFlowrateMinute / itemFlowrateMinute,
	);

	return supportable;
};

export const computeFacilitiesPerArray = (
	config: Context,
	preferences: Preferences,
	// facility: Facility,
	// recipe: Recipe,
	// proliferator: Proliferator,
	// input_flowrate_per_minute: number,
	// output_flowrate_per_minute: number,
): number => {
	const {
		recipeMaterialRatioRecord,
		recipeProductRatioRecord,
		materialFlowratePerMinute,
		productFlowratePerMinute,
		proliferatorProductMultiplier,
	} = config;

	const { preferEven, keepBeltUnderMaxFlow } =
		preferences;

	const cyclesPerMinute =
		computeCyclesPerMinute(config);

	const inputLimitingItem =
		Math.max(
			...Object.values(recipeMaterialRatioRecord),
		) * cyclesPerMinute;

	const inputSupportable: number =
		computeFacilitiesPerBelt(
			materialFlowratePerMinute,
			inputLimitingItem,
		);

	const outputLimitingItem =
		Math.max(
			...Object.values(recipeProductRatioRecord),
		) *
		cyclesPerMinute *
		proliferatorProductMultiplier;

	let outputSupportable: number =
		computeFacilitiesPerBelt(
			productFlowratePerMinute,
			outputLimitingItem,
		);

	if (
		keepBeltUnderMaxFlow &&
		outputSupportable > 1 &&
		outputSupportable * outputLimitingItem >=
			productFlowratePerMinute
	) {
		outputSupportable = outputSupportable - 1;
	}

	const facilitiesPerArray: number = Math.min(
		inputSupportable,
		outputSupportable,
	);

	if (
		preferEven &&
		facilitiesPerArray % 2 === 1 &&
		facilitiesPerArray > 2
	) {
		return facilitiesPerArray - 1;
	}

	return facilitiesPerArray;
};

export const computeFacilitiesNeeded = (
	itemRecord: Record<string, number>,
	config: Context,
	// facility: Facility,
	// recipe: Recipe,
	// prolfierator: Proliferator,
): number => {
	if (
		Object.values(itemRecord).every(
			(demand) => demand === 0,
		)
	) {
		return 0;
	}

	const {
		proliferatorProductMultiplier,
		recipeProductRatioRecord,
	} = config;

	const cyclesPerMinute =
		computeCyclesPerMinute(config);

	const facilitiesNeeeded: number = Math.max(
		...Object.keys(itemRecord).map((key) => {
			return (
				itemRecord[key] /
				(recipeProductRatioRecord[key] *
					cyclesPerMinute *
					proliferatorProductMultiplier)
			);
		}),
	);

	return facilitiesNeeeded;
};

export const computeIdleConsumptionMWPerFacility =
	(
		config: Context,
		// facility: Facility,
		// recipe: Recipe,
		// sorter: Sorter,
	): number => {
		const {
			idleConsumptionMWPerFacility,
			idleConsumptionMWPerSorter,
			recipeMaterialRatioRecord,
			recipeProductRatioRecord,
		} = config;

		const idleConsumptionMWTotalSorterPerFacility =
			idleConsumptionMWPerSorter *
			(Object.values(recipeMaterialRatioRecord)
				.length +
				Object.values(recipeProductRatioRecord)
					.length);

		return (
			idleConsumptionMWPerFacility +
			idleConsumptionMWTotalSorterPerFacility
		);
	};

export const computeWorkConsumptionMWPerFacility =
	(
		config: Context,
		// facility: Facility,
		// recipe: Recipe,
		// proliferator: Proliferator,
		// sorter: Sorter,
	): number => {
		const {
			recipeMaterialRatioRecord,
			recipeProductRatioRecord,
			workConsumptionMWPerSorter,
			workConsumptionMWPerFacility,
			proliferatorWorkConsumptionMultiplier,
		} = config;

		const workComsumptionMWTotalSorterPerFacility =
			workConsumptionMWPerSorter *
			(Object.values(recipeMaterialRatioRecord)
				.length +
				Object.values(recipeProductRatioRecord)
					.length);

		return (
			workComsumptionMWTotalSorterPerFacility +
			workConsumptionMWPerFacility *
				proliferatorWorkConsumptionMultiplier
		);
	};

export const computeMaterialRecordPerFacility = (
	config: Context,
	preferences: Preferences,
): { [K: string]: number } => {
	const {
		recipeMaterialRatioRecord,
		recipeProductRatioRecord,
		proliferatorWorkConsumptionMultiplier,
		proliferatorProductMultiplier,
	} = config;

	const { proliferateProducts } = preferences;

	const meterialRecord: {
		[K: string]: number;
	} = {};

	const cyclesPerMinute: number =
		computeCyclesPerMinute(config);

	let totalItemFlowratePerMinute: number = 0;

	if (proliferateProducts) {
		Object.values(
			recipeProductRatioRecord,
		).forEach((value) => {
			totalItemFlowratePerMinute +=
				value *
				cyclesPerMinute *
				proliferatorProductMultiplier;
		});
	}

	Object.entries(
		recipeMaterialRatioRecord,
	).forEach((entry) => {
		const [key, value] = entry;
		const materialFlowratePerMinute: number =
			value * cyclesPerMinute;
		meterialRecord[key] =
			materialFlowratePerMinute;

		totalItemFlowratePerMinute +=
			materialFlowratePerMinute;
	});

	if (
		proliferatorWorkConsumptionMultiplier === 1.3
	) {
		meterialRecord["Proliferator Mk. I"] =
			totalItemFlowratePerMinute / 12;
	}

	if (
		proliferatorWorkConsumptionMultiplier === 1.7
	) {
		meterialRecord["Proliferator Mk. II"] =
			totalItemFlowratePerMinute / 24;
	}

	if (
		proliferatorWorkConsumptionMultiplier === 2.5
	) {
		meterialRecord["Proliferator Mk. III"] =
			totalItemFlowratePerMinute / 60;
	}

	return meterialRecord;
};

export const computeProductRecordPerFacility = (
	config: Context,
): { [K: string]: number } => {
	const {
		recipeProductRatioRecord,
		proliferatorProductMultiplier,
	} = config;

	const productRecord: { [K: string]: number } =
		{};
	const cyclesPerMinute: number =
		computeCyclesPerMinute(config);

	Object.entries(
		recipeProductRatioRecord,
	).forEach((entry) => {
		const [key, value] = entry;
		productRecord[key] =
			value *
			cyclesPerMinute *
			proliferatorProductMultiplier;
	});

	return productRecord;
};
