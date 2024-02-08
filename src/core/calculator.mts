export const getFacilityCountPerArray = (
	cycleTimeSecond: number,
	cycleMuliplier: number,
	productMultiplier: number,
	materialFlowrateMinute: number,
	productFlowrateMinute: number,
	materialRecord: Record<string, number>,
	productRecord: Record<string, number>,
): number => {
	const cyclesPerMinute =
		(60 / cycleTimeSecond) * cycleMuliplier;

	const materialLimitingItem =
		Math.max(...Object.values(materialRecord)) *
		cyclesPerMinute;

	const materialMaxFacility = Math.floor(
		materialFlowrateMinute / materialLimitingItem,
	);

	const productLimitingItem =
		Math.max(...Object.values(productRecord)) *
		cyclesPerMinute *
		productMultiplier;

	const productMaxFacility = Math.floor(
		productFlowrateMinute / productLimitingItem,
	);

	const facilitiesPerArray: number = Math.min(
		materialMaxFacility,
		productMaxFacility,
	);

	return facilitiesPerArray;
};

export const getFacilityNeededCount = (
	cycleTimeSecond: number,
	cycleMuliplier: number,
	productMultiplier: number,
	productRecord: Record<string, number>,
	desiredProductRecord: Record<string, number>,
): number => {
	if (
		Object.values(desiredProductRecord).every(
			(demand) => demand === 0,
		)
	) {
		return 0;
	}

	const cyclesPerMinute =
		(60 / cycleTimeSecond) * cycleMuliplier;

	let needed = 0;
	for (const entry of Object.entries(
		productRecord,
	)) {
		const [label, ratio] = entry;
		const curr =
			desiredProductRecord[label] /
			(ratio *
				cyclesPerMinute *
				productMultiplier);

		if (curr > needed) {
			needed = curr;
		}
	}

	return needed;
};

export const getIdleConsumptionPerFacility = (
	facilityConsumptionMW: number,
	sorterConsumptionMW: number,
	sorterPerFacility: number,
): number => {
	const sorterConsumption =
		sorterConsumptionMW * sorterPerFacility;

	return (
		facilityConsumptionMW + sorterConsumption
	);
};

export const getWorkConsumptionPerFacility = (
	facilityConsumptionMW: number,
	consumptionMultiplier: number,
	sorterConsumptionMW: number,
	sorterPerFacility: number,
): number => {
	const facilityConsumption =
		facilityConsumptionMW * consumptionMultiplier;

	const sorterConsumption =
		sorterConsumptionMW * sorterPerFacility;

	return facilityConsumption + sorterConsumption;
};

export const getDemandPerMinutePerFacility = (
	cycleTimeSecond: number,
	cycleMuliplier: number,
	materialRecord: Record<string, number>,
	productRecord: Record<string, number>,
	proliferatorLabel: string,
	proliferatorUse: number,
): Record<string, number> => {
	const demandPerMinutePerFacility: Record<
		string,
		number
	> = {};

	const cyclesPerMinute =
		(60 / cycleTimeSecond) * cycleMuliplier;

	let totalItemFlowratePerMinute = 0;

	for (const entry of Object.entries(
		materialRecord,
	)) {
		const [label, ratio] = entry;
		const materialFlowrate =
			ratio * cyclesPerMinute;

		demandPerMinutePerFacility[label] =
			materialFlowrate;
		totalItemFlowratePerMinute +=
			materialFlowrate;
	}

	for (const ratio of Object.values(
		productRecord,
	)) {
		totalItemFlowratePerMinute +=
			ratio * cyclesPerMinute * ratio;
	}
	if (proliferatorUse > 0) {
		demandPerMinutePerFacility[
			proliferatorLabel
		] =
			totalItemFlowratePerMinute /
			proliferatorUse;
	}

	return demandPerMinutePerFacility;
};

export const getProductionPerMinutePerFacility = (
	cycleTimeSecond: number,
	cycleMuliplier: number,
	productMultiplier: number,
	productRecord: Record<string, number>,
): Record<string, number> => {
	const productPerMinutePerFacility: Record<
		string,
		number
	> = {};

	const cyclesPerMinute =
		(60 / cycleTimeSecond) * cycleMuliplier;

	for (const entry of Object.entries(
		productRecord,
	)) {
		const [label, ratio] = entry;

		productPerMinutePerFacility[label] =
			ratio * cyclesPerMinute * productMultiplier;
	}

	return productPerMinutePerFacility;
};
