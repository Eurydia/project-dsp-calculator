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
	const {
		cycleTimeSecond,
		materialRecord,
		productRecord,
	} = recipeFromLabel(recipeLabel);
	const _prolifEffect = proliferatorFromLabel(
		prolifEffectLabel,
	);

	const _flowrateRecord: Record<string, number> =
		{};

	for (const entry of Object.entries(
		flowrateRecord,
	)) {
		const [itemLabel, flowrate] = entry;

		const parsedFlowrate =
			Number.parseInt(flowrate);
		if (
			Number.isNaN(parsedFlowrate) ||
			parsedFlowrate === 0
		) {
			continue;
		}
		_flowrateRecord[itemLabel] = parsedFlowrate;
	}

	const cycleMuliplier =
		_facility.cycleMultiplier *
		_prolifEffect.cycleMultiplier;
	const productMultiplier =
		_prolifEffect.productMultiplier;

	const cycles =
		(60 / cycleTimeSecond) * cycleMuliplier;

	let materialBottleNeck = -1;
	for (const entry of Object.entries(
		materialRecord,
	)) {
		const [itemLabel, ratio] = entry;
		const itemFlowrate =
			_flowrateRecord[itemLabel];
		if (itemFlowrate === undefined) {
			continue;
		}
		const currBottleNeck =
			itemFlowrate / (ratio * cycles);
		if (
			(materialBottleNeck < 0 &&
				currBottleNeck > 0) ||
			currBottleNeck < materialBottleNeck
		) {
			materialBottleNeck = currBottleNeck;
		}
	}

	let productBottleNeck = -1;
	for (const entry of Object.entries(
		productRecord,
	)) {
		const [itemLabel, ratio] = entry;
		const itemFlowrate =
			_flowrateRecord[itemLabel];
		if (itemFlowrate === undefined) {
			continue;
		}
		const currBottleNeck =
			itemFlowrate /
			(ratio * cycles * productMultiplier);
		if (
			(productBottleNeck < 0 &&
				currBottleNeck > 0) ||
			currBottleNeck < productBottleNeck
		) {
			productBottleNeck = currBottleNeck;
		}
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

export const solveFacilityNeededCount = (
	facilityLabel: string,
	recipeLabel: string,
	prolifEffectLabel: string,
	desiredProductRecord: Record<string, string>,
): number => {
	const _facility = facilityFromLabel(
		facilityLabel,
	);
	const { cycleTimeSecond, productRecord } =
		recipeFromLabel(recipeLabel);
	const _prolif = proliferatorFromLabel(
		prolifEffectLabel,
	);
	const _desiredProductRecord: Record<
		string,
		number
	> = {};
	for (const entry of Object.entries(
		desiredProductRecord,
	)) {
		const [itemLabel, value] = entry;
		let parsedValue = Number.parseInt(value);
		if (Number.isNaN(parsedValue)) {
			parsedValue = 0;
		}
		_desiredProductRecord[itemLabel] =
			parsedValue;
	}

	if (
		Object.values(_desiredProductRecord).every(
			(value) => value === 0,
		)
	) {
		return 0;
	}

	const cycleMuliplier =
		_facility.cycleMultiplier *
		_prolif.cycleMultiplier;
	const productMultiplier =
		_prolif.productMultiplier;

	const cycles =
		(60 / cycleTimeSecond) * cycleMuliplier;

	let needed = 0;

	for (const entry of Object.entries(
		productRecord,
	)) {
		const [label, ratio] = entry;
		const itemFlowrate =
			ratio * cycles * productMultiplier;
		const currNeeded =
			_desiredProductRecord[label] / itemFlowrate;

		if (currNeeded > needed) {
			needed = currNeeded;
		}
	}

	return needed;
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
		let totalProlifMaterial = 0;
		for (const ratio of Object.values(
			materialRecord,
		)) {
			totalProlifMaterial += cycles * ratio;
		}

		let totalProlifProduct = 0;
		for (const ratio of Object.values(
			productRecord,
		)) {
			totalProlifProduct +=
				cycles *
				ratio *
				_prolifEffect.productMultiplier;
		}

		const prolifLabel =
			proliferatorLabelFromSprayCount(
				_prolifEffect.sprayCount,
			);
		demand[`${prolifLabel} (materials)`] =
			totalProlifMaterial / _prolifSprayCount;
		demand[`${prolifLabel} (products)`] =
			totalProlifProduct / _prolifSprayCount;
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
