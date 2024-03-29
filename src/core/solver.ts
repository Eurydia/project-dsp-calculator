import { sorterFromLabel } from "assets/sorter.mts";
import { facilityFromLabel } from "assets/facility.mts";
import {
	proliferatorFromLabel,
	proliferatorLabelFromSprayCount,
} from "assets/proliferator.mts";
import { recipeFromLabel } from "assets/recipes/recipe.mts";

export const solveFacilityPerArrayCount = (
	facilityLabel: string,
	recipeLabel: string,
	prolifEffectLabel: string,
	flowrateRecord: Record<string, string>,
): number => {
	const _facility = facilityFromLabel(
		facilityLabel,
	);
	const _recipe = recipeFromLabel(recipeLabel);
	const _prolifEffect = proliferatorFromLabel(
		prolifEffectLabel,
	);

	const _flowrateRecord: Record<string, number> =
		{};
	for (const entry of Object.entries(
		flowrateRecord,
	)) {
		const [itemLabel, flowrate] = entry;
		let parsedFlowrate =
			Number.parseInt(flowrate);
		if (Number.isNaN(parsedFlowrate)) {
			parsedFlowrate = 0;
		}
		_flowrateRecord[itemLabel] = parsedFlowrate;
	}

	const cycleMuliplier =
		_facility.cycleMultiplier *
		_prolifEffect.cycleMultiplier;
	const cyclesPerMinutePerFacility =
		(60 / _recipe.cycleTimeSecond) *
		cycleMuliplier;

	const productMultiplier =
		_prolifEffect.productMultiplier;

	let materialBottleNeck = 0;
	for (const entry of Object.entries(
		_recipe.materialRecord,
	)) {
		const [itemLabel, ratio] = entry;
		const itemFlowrate =
			_flowrateRecord[itemLabel];
		const currBottleNeck =
			itemFlowrate /
			(ratio * cyclesPerMinutePerFacility);
		if (
			(materialBottleNeck === 0 &&
				currBottleNeck > 0) ||
			currBottleNeck < materialBottleNeck
		) {
			materialBottleNeck = currBottleNeck;
		}
	}

	let productBottleNeck = 0;
	for (const entry of Object.entries(
		_recipe.productRecord,
	)) {
		const [itemLabel, ratio] = entry;
		const itemFlowrate =
			_flowrateRecord[itemLabel];
		const currBottleNeck =
			itemFlowrate /
			(ratio *
				cyclesPerMinutePerFacility *
				productMultiplier);
		if (
			(productBottleNeck === 0 &&
				currBottleNeck > 0) ||
			currBottleNeck < productBottleNeck
		) {
			productBottleNeck = currBottleNeck;
		}
	}

	return Math.min(
		materialBottleNeck,
		productBottleNeck,
	);
};

export const solveIdleConsumptionMWPerFacility = (
	facilityLabel: string,
	sorterRecord: Record<string, string>,
): number => {
	let sorterIdleConsumptionMW = 0;
	for (const entry of Object.entries(
		sorterRecord,
	)) {
		const [sorterLabel, count] = entry;
		let parsedCount = Number.parseInt(count);
		if (Number.isNaN(parsedCount)) {
			parsedCount = 0;
		}
		sorterIdleConsumptionMW +=
			parsedCount *
			sorterFromLabel(sorterLabel)
				.idleConsumptionMW;
	}
	const facility = facilityFromLabel(
		facilityLabel,
	);
	return (
		facility.idleConsumptionMW +
		sorterIdleConsumptionMW
	);
};

export const solveWorkConsumptionMWPerFacility = (
	facilityLabel: string,
	prolifEffectLabel: string,
	sorterRecord: Record<string, string>,
): number => {
	let sorterWorkConsumptionMW = 0;
	for (const entry of Object.entries(
		sorterRecord,
	)) {
		const [sorterLabel, count] = entry;
		let parsedCount = Number.parseInt(count);
		if (Number.isNaN(parsedCount)) {
			parsedCount = 0;
		}
		sorterWorkConsumptionMW +=
			parsedCount *
			sorterFromLabel(sorterLabel)
				.workConsumptionMW;
	}
	const facility = facilityFromLabel(
		facilityLabel,
	);
	const prolifEffect = proliferatorFromLabel(
		prolifEffectLabel,
	);
	const facilityWorkConsumptionMW =
		facility.workConsumptionMW *
		prolifEffect.workConsumptionMultiplier;

	return (
		facilityWorkConsumptionMW +
		sorterWorkConsumptionMW
	);
};

export const solveDemandPerMinutePerFacility = (
	facilityLabel: string,
	recipeLabel: string,
	prolifEffectLabel: string,
	prolifSprayCount: string,
): Record<string, number> => {
	const _facility = facilityFromLabel(
		facilityLabel,
	);
	const {
		cycleTimeSecond,
		materialRecord,
		productRecord,
	} = recipeFromLabel(recipeLabel);
	const _prolifEffect = proliferatorFromLabel(
		prolifEffectLabel,
	);

	const cycleMuliplier =
		_facility.cycleMultiplier *
		_prolifEffect.cycleMultiplier;

	const cycles =
		(60 / cycleTimeSecond) * cycleMuliplier;

	const demand: Record<string, number> = {};
	for (const entry of Object.entries(
		materialRecord,
	)) {
		const [itemLabel, ratio] = entry;
		demand[itemLabel] = ratio * cycles;
	}

	const _prolifSprayCount = Number.parseInt(
		prolifSprayCount,
	);
	if (
		!Number.isNaN(_prolifSprayCount) &&
		_prolifSprayCount > 0
	) {
		let prolifMaterialCost = 0;
		for (const ratio of Object.values(
			materialRecord,
		)) {
			prolifMaterialCost += cycles * ratio;
		}

		let prolifProductCost = 0;
		for (const ratio of Object.values(
			productRecord,
		)) {
			prolifProductCost +=
				cycles *
				ratio *
				_prolifEffect.productMultiplier;
		}

		const prolifLabel =
			proliferatorLabelFromSprayCount(
				_prolifEffect.sprayCount,
			);
		demand[`${prolifLabel} (materials)`] =
			prolifMaterialCost / _prolifSprayCount;
		demand[`${prolifLabel} (products)`] =
			prolifProductCost / _prolifSprayCount;
	}
	return demand;
};

export const solveProductionPerMinutePerFacility =
	(
		facilityLabel: string,
		recipeLabel: string,
		prolifEffectLabel: string,
	): Record<string, number> => {
		const _facility = facilityFromLabel(
			facilityLabel,
		);
		const { cycleTimeSecond, productRecord } =
			recipeFromLabel(recipeLabel);
		const _prolifEffect = proliferatorFromLabel(
			prolifEffectLabel,
		);

		const cycleMuliplier =
			_facility.cycleMultiplier *
			_prolifEffect.cycleMultiplier;

		const cycles =
			(60 / cycleTimeSecond) * cycleMuliplier;

		const production: Record<string, number> = {};
		for (const entry of Object.entries(
			productRecord,
		)) {
			const [itemLabel, ratio] = entry;
			production[itemLabel] =
				ratio *
				cycles *
				_prolifEffect.productMultiplier;
		}
		return production;
	};
