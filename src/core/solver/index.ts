import {
	Facility,
	Proliferator,
	Recipe,
} from "@eurydos/dsp-item-registry";
import { safeParseClamp } from "~core/parsing";
import { getSorter } from "~database/get";

export * from "./solverCapacity";
export * from "./solverConstraint";

export const solveFacilityPerArrayCount = (
	f: Facility,
	r: Recipe,
	p: Proliferator,
	flowrate: Record<string, string>,
) => {
	const result: Record<string, number> = {};
	for (const [label, value] of Object.entries(
		flowrate,
	)) {
		result[label] = safeParseClamp(
			value,
			0,
			Number.MAX_SAFE_INTEGER,
		);
	}

	const cycleMuliplier =
		f.cycleMultiplier * p.cycleMultiplier;
	const cyclesPerMinutePerFacility =
		(60 / r.cycleTimeSecond) * cycleMuliplier;

	const productMultiplier = p.productMultiplier;

	let materialBottleNeck = 0;
	for (const entry of Object.entries(
		r.materialRecord,
	)) {
		const [itemLabel, ratio] = entry;
		const itemFlowrate = result[itemLabel];
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
		r.productRecord,
	)) {
		const [itemLabel, ratio] = entry;
		const itemFlowrate = result[itemLabel];
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

export const solveIdleConsumptionMWPerFacility =
	async (
		f: Facility,
		sorter: Record<string, string>,
	) => {
		let sorterIdleConsumptionMW = 0;
		for (const [label, value] of Object.entries(
			sorter,
		)) {
			const s = await getSorter(label);
			if (s === undefined) {
				continue;
			}
			const parsedCount = safeParseClamp(
				value,
				0,
				Number.MAX_SAFE_INTEGER,
			);
			sorterIdleConsumptionMW +=
				parsedCount * s.idleConsumptionMW;
		}
		return (
			f.idleConsumptionMW +
			sorterIdleConsumptionMW
		);
	};

export const solveWorkConsumptionMWPerFacility =
	async (
		f: Facility,
		p: Proliferator,
		sorter: Record<string, string>,
	) => {
		let sorterWorkConsumptionMW = 0;
		for (const [label, value] of Object.entries(
			sorter,
		)) {
			const s = await getSorter(label);
			if (s === undefined) {
				continue;
			}

			const parsedCount = safeParseClamp(
				value,
				0,
				Number.MAX_SAFE_INTEGER,
			);
			sorterWorkConsumptionMW +=
				parsedCount * s.workConsumptionMW;
		}
		const facilityWorkConsumptionMW =
			f.workConsumptionMW *
			p.workConsumptionMultiplier;

		return (
			facilityWorkConsumptionMW +
			sorterWorkConsumptionMW
		);
	};

export const solveDemandPerMinutePerFacility = (
	f: Facility,
	r: Recipe,
	p: Proliferator,
	pSprayCount: string,
): Record<string, number> => {
	const {
		cycleTimeSecond,
		materialRecord,
		productRecord,
	} = r;

	const cycleMuliplier =
		f.cycleMultiplier * p.cycleMultiplier;

	const cycles =
		(60 / cycleTimeSecond) * cycleMuliplier;

	const demand: Record<string, number> = {};
	for (const [label, value] of Object.entries(
		materialRecord,
	)) {
		demand[label] = value * cycles;
	}

	const sprayCount = safeParseClamp(
		pSprayCount,
		0,
		Number.MAX_SAFE_INTEGER,
	);
	if (sprayCount > 0) {
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
				cycles * ratio * p.productMultiplier;
		}

		demand[`${p.label} (materials)`] =
			prolifMaterialCost / sprayCount;
		demand[`${p.label} (products)`] =
			prolifProductCost / sprayCount;
	}
	return demand;
};

export const solveProductionPerMinutePerFacility =
	(
		f: Facility,
		r: Recipe,
		p: Proliferator,
	): Record<string, number> => {
		const { cycleTimeSecond, productRecord } = r;

		const cycleMuliplier =
			f.cycleMultiplier * p.cycleMultiplier;

		const cycles =
			(60 / cycleTimeSecond) * cycleMuliplier;

		const production: Record<string, number> = {};
		for (const [label, value] of Object.entries(
			productRecord,
		)) {
			production[label] =
				value * cycles * p.productMultiplier;
		}
		return production;
	};
