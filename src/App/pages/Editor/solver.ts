import { sorterFromLabel } from "assets/sorter.mts";
import { sumArray } from "App/pages/Editor/helper";

export const getFacilityPerArrayCount = (
	cycleTime: number,
	cycleMuliplier: number,
	productMultiplier: number,
	flowrateRecord: Record<string, string>,
	materialRecord: Record<string, number>,
	productRecord: Record<string, number>,
): number => {
	const pFlowrateRecord = Object.fromEntries(
		Object.entries(flowrateRecord)
			.filter(([_, value]) => {
				const pValue = Number.parseInt(value);
				return (
					!Number.isNaN(pValue) && pValue !== 0
				);
			})
			.map(([label, value]) => {
				const pValue = Number.parseInt(value);
				return [label, pValue];
			}),
	);

	const cycles =
		(60 / cycleTime) * cycleMuliplier;

	const filteredMaterial = Object.entries(
		materialRecord,
	).filter(
		([label]) =>
			pFlowrateRecord[label] !== undefined,
	);
	let materialBottleNeck = 0;
	if (filteredMaterial.length > 0)
		materialBottleNeck = Math.min(
			...filteredMaterial.map(
				([label, ratio]) =>
					pFlowrateRecord[label] /
					(ratio * cycles),
			),
		);
	const filteredProducts = Object.entries(
		productRecord,
	).filter(
		([label]) =>
			pFlowrateRecord[label] !== undefined,
	);

	let productBottleNeck = 0;
	if (filteredProducts.length > 0) {
		productBottleNeck = Math.min(
			...filteredProducts.map(
				([label, ratio]) =>
					pFlowrateRecord[label] /
					(ratio * cycles * productMultiplier),
			),
		);
	}
	if (
		materialBottleNeck > 0 &&
		productBottleNeck === 0
	) {
		return materialBottleNeck;
	}

	if (
		productBottleNeck > 0 &&
		materialBottleNeck === 0
	) {
		return productBottleNeck;
	}

	return Math.min(
		materialBottleNeck,
		productBottleNeck,
	);
};

export const getFacilityNeededCount = (
	cycleTime: number,
	cycleMuliplier: number,
	productMultiplier: number,
	productRecord: Record<string, number>,
	desiredProductRecord: Record<string, string>,
): number => {
	const pDesiredProductRecord =
		Object.fromEntries(
			Object.entries(desiredProductRecord).map(
				([label, value]) => {
					let pValue = Number.parseInt(value);
					if (Number.isNaN(pValue)) {
						pValue = 0;
					}
					return [label, pValue];
				},
			),
		);

	if (
		Object.values(pDesiredProductRecord).every(
			(value) => value === 0,
		)
	) {
		return 0;
	}

	const cycles =
		(60 / cycleTime) * cycleMuliplier;

	const needed = Math.max(
		...Object.entries(productRecord).map(
			([label, ratio]) => {
				const itemFlow =
					ratio * cycles * productMultiplier;
				return (
					pDesiredProductRecord[label] / itemFlow
				);
			},
		),
	);

	return needed;
};

const getSorterConsumption = (
	sorterRecord: Record<string, string>,
): number => {
	const pSorterRecord = Object.fromEntries(
		Object.entries(sorterRecord).map(
			([label, value]) => {
				let pValue = Number.parseInt(value);
				if (Number.isNaN(pValue)) {
					pValue = 0;
				}
				return [label, pValue];
			},
		),
	);
	const sorterConsumption = sumArray(
		Object.entries(pSorterRecord).map(
			([label, value]) =>
				sorterFromLabel(label).idleConsumptionMW *
				value,
		),
	);
	return sorterConsumption;
};

export const getIdleConsumptionPerFacility = (
	facilityConsumption: number,
	sorterRecord: Record<string, string>,
): number => {
	const sorterConsumption =
		getSorterConsumption(sorterRecord);
	return facilityConsumption + sorterConsumption;
};

export const getWorkConsumptionPerFacility = (
	facilityConsumption: number,
	workConsumptionMultiplier: number,
	sorterRecord: Record<string, string>,
): number => {
	const sorterConsumption =
		getSorterConsumption(sorterRecord);
	const facilityComputedConsumption =
		facilityConsumption *
		workConsumptionMultiplier;

	return (
		facilityComputedConsumption +
		sorterConsumption
	);
};

export const getDemandPerMinutePerFacility = (
	cycleTime: number,
	cycleMuliplier: number,
	productMultiplier: number,
	materialRecord: Record<string, number>,
	productRecord: Record<string, number>,
	proliferatorLabel: string,
	proliferatorUse: string,
): Record<string, number> => {
	const cycles =
		(60 / cycleTime) * cycleMuliplier;

	const material = Object.fromEntries(
		Object.entries(materialRecord).map(
			([label, ratio]) => [label, ratio * cycles],
		),
	);

	const pProliferatorUse = Number.parseInt(
		proliferatorUse,
	);
	if (
		!Number.isNaN(pProliferatorUse) &&
		pProliferatorUse > 0
	) {
		material[`${proliferatorLabel} (materials)`] =
			sumArray(
				Object.values(materialRecord).map(
					(ratio) => cycles * ratio,
				),
			) / pProliferatorUse;
		material[`${proliferatorLabel} (products)`] =
			sumArray(
				Object.values(productRecord).map(
					(ratio) =>
						cycles * ratio * productMultiplier,
				),
			) / pProliferatorUse;
	}
	return material;
};

export const getProductionPerMinutePerFacility = (
	cycleTime: number,
	cycleMuliplier: number,
	productMultiplier: number,
	productRecord: Record<string, number>,
): Record<string, number> => {
	const cycles =
		(60 / cycleTime) * cycleMuliplier;

	const product = Object.fromEntries(
		Object.entries(productRecord).map(
			([label, ratio]) => [
				label,
				ratio * cycles * productMultiplier,
			],
		),
	);

	return product;
};
