import { sorterFromLabel } from "assets/sorter.mts";
import { sumArray } from "components/Editor/helper";

export const getFacilityPerArrayCount = (
	cycleTimeSecond: number,
	cycleMuliplier: number,
	productMultiplier: number,
	flowratesPerMinute: Record<string, number>,
	materialRecord: Record<string, number>,
	productRecord: Record<string, number>,
): number => {
	const cyclesPerMinute =
		(60 / cycleTimeSecond) * cycleMuliplier;

	const materialBottleNeck = Math.min(
		...Object.entries(materialRecord).map(
			([label, ratio]) => {
				let flowrate = flowratesPerMinute[label];
				if (
					Number.isNaN(flowrate) ||
					flowrate === 0
				) {
					flowrate = 360;
				}
				const itemFlow = ratio * cyclesPerMinute;
				return flowrate / itemFlow;
			},
		),
	);

	const productBottleNeck = Math.min(
		...Object.entries(productRecord).map(
			([label, ratio]) => {
				let flowrate = flowratesPerMinute[label];
				if (
					Number.isNaN(flowrate) ||
					flowrate === 0
				) {
					flowrate = 360;
				}
				const itemFlow =
					ratio *
					cyclesPerMinute *
					productMultiplier;
				return flowrate / itemFlow;
			},
		),
	);

	return Math.min(
		materialBottleNeck,
		productBottleNeck,
	);
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
			(value) => value === 0,
		)
	) {
		return 0;
	}

	const cyclesPerMinute =
		(60 / cycleTimeSecond) * cycleMuliplier;

	const needed = Math.max(
		...Object.entries(productRecord).map(
			([label, ratio]) => {
				const perFacility =
					ratio *
					cyclesPerMinute *
					productMultiplier;

				return (
					desiredProductRecord[label] /
					perFacility
				);
			},
		),
	);

	return needed;
};

export const getIdleConsumptionPerFacility = (
	facilityConsumption: number,
	sorterConsumptionRecord: Record<string, number>,
): number => {
	const sorterConsumption = sumArray(
		Object.entries(sorterConsumptionRecord).map(
			([label, count]) =>
				sorterFromLabel(label).idleConsumptionMW *
				count,
		),
	);
	return facilityConsumption + sorterConsumption;
};

export const getWorkConsumptionPerFacility = (
	facilityConsumption: number,
	workConsumptionMultiplier: number,
	sorterConsumptionRecord: Record<string, number>,
): number => {
	const facilityComputedConsumption =
		facilityConsumption *
		workConsumptionMultiplier;
	const sorterConsumption = sumArray(
		Object.entries(sorterConsumptionRecord).map(
			([label, count]) =>
				sorterFromLabel(label).workConsumptionMW *
				count,
		),
	);
	return (
		facilityComputedConsumption +
		sorterConsumption
	);
};

export const getDemandPerMinutePerFacility = (
	cycleTimeSecond: number,
	cycleMuliplier: number,
	productMultiplier: number,
	materialRecord: Record<string, number>,
	productRecord: Record<string, number>,
	proliferatorLabel: string,
	proliferatorUse: number,
): Record<string, number> => {
	const demand: Record<string, number> = {};

	const cyclesPerMinute =
		(60 / cycleTimeSecond) * cycleMuliplier;

	let totalItemFlowratePerMinute = 0;

	for (const entry of Object.entries(
		materialRecord,
	)) {
		const [label, ratio] = entry;
		const materialFlowrate =
			ratio * cyclesPerMinute;

		demand[label] = materialFlowrate;
		totalItemFlowratePerMinute +=
			materialFlowrate;
	}

	totalItemFlowratePerMinute += sumArray(
		Object.values(productRecord).map(
			(ratio) =>
				cyclesPerMinute *
				ratio *
				productMultiplier,
		),
	);
	if (
		!Number.isNaN(proliferatorUse) &&
		proliferatorUse > 0
	) {
		demand[proliferatorLabel] =
			totalItemFlowratePerMinute /
			proliferatorUse;
	}
	return demand;
};

export const getProductionPerMinutePerFacility = (
	cycleTimeSecond: number,
	cycleMuliplier: number,
	productMultiplier: number,
	productRecord: Record<string, number>,
): Record<string, number> => {
	const product: Record<string, number> = {};

	const cyclesPerMinute =
		(60 / cycleTimeSecond) * cycleMuliplier;

	for (const entry of Object.entries(
		productRecord,
	)) {
		const [label, ratio] = entry;
		product[label] =
			ratio * cyclesPerMinute * productMultiplier;
	}

	return product;
};
