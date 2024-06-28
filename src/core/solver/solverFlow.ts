import { safeParseClamp } from "~core/parsing";
import {
	ConfigFormData,
	EditorFormData,
	FlowData,
} from "~types/query";
import { computeFacilityNeededCountCapacity } from "./solverCapacity";
import { computeFacilityNeededCountConstraint } from "./solverConstraint";

const computeDemandPerMinutePerFacility = (
	configFormData: ConfigFormData,
): Record<string, number> => {
	const {
		facility: f,
		recipe: r,
		proliferator: p,
		proliferatorSprayCount: pSC,
	} = configFormData;

	const { cycleTimeSecond, materialRecord } = r;

	const cycles =
		(60 / cycleTimeSecond) *
		f.cycleMultiplier *
		p.cycleMultiplier;

	const result: Record<string, number> = {};
	for (const k in materialRecord) {
		result[k] = materialRecord[k] * cycles;
	}

	const sprayCount = safeParseClamp(
		pSC,
		0,
		Number.MAX_SAFE_INTEGER,
	);
	if (sprayCount > 0) {
		let prolifMaterialCost = 0;
		for (const ratio of Object.values(
			r.materialRecord,
		)) {
			prolifMaterialCost += cycles * ratio;
		}

		let prolifProductCost = 0;
		for (const ratio of Object.values(
			r.productRecord,
		)) {
			prolifProductCost +=
				cycles * ratio * p.productMultiplier;
		}

		result[`${p.label} (materials)`] =
			prolifMaterialCost / sprayCount;
		result[`${p.label} (products)`] =
			prolifProductCost / sprayCount;
	}
	return result;
};

const computeProductionPerMinutePerFacility = (
	configFormData: ConfigFormData,
): Record<string, number> => {
	const {
		facility: f,
		recipe: r,
		proliferator: p,
	} = configFormData;
	const { cycleTimeSecond, productRecord } = r;

	const cyclesPerMinute =
		(60 / cycleTimeSecond) *
		f.cycleMultiplier *
		p.cycleMultiplier;

	const result: Record<string, number> = {};
	for (const k in productRecord) {
		result[k] =
			productRecord[k] *
			cyclesPerMinute *
			p.productMultiplier;
	}
	return result;
};

const computeFacilitiesPerArray = (
	config: ConfigFormData,
) => {
	const {
		flowrate,
		facility,
		recipe,
		proliferator,
	} = config;

	const parsed: Record<string, number> = {};
	for (const k in flowrate) {
		parsed[k] = safeParseClamp(
			flowrate[k],
			0,
			Number.MAX_SAFE_INTEGER,
		);
	}

	const cyclesPerMinute =
		(60 / recipe.cycleTimeSecond) *
		facility.cycleMultiplier *
		proliferator.cycleMultiplier;

	let matBottleNeck = 0;
	for (const k in recipe.materialRecord) {
		const itemFlowrate = parsed[k];
		const currBottleNeck =
			itemFlowrate /
			(parsed[k] * cyclesPerMinute);
		if (
			(matBottleNeck === 0 &&
				currBottleNeck > 0) ||
			currBottleNeck < matBottleNeck
		) {
			matBottleNeck = currBottleNeck;
		}
	}

	let prodBottleNeck = 0;
	for (const k in recipe.productRecord) {
		const itemFlowrate = parsed[k];
		const currBottleNeck =
			itemFlowrate /
			(parsed[k] *
				cyclesPerMinute *
				proliferator.productMultiplier);
		if (
			(prodBottleNeck === 0 &&
				currBottleNeck > 0) ||
			currBottleNeck < prodBottleNeck
		) {
			prodBottleNeck = currBottleNeck;
		}
	}

	return Math.min(matBottleNeck, prodBottleNeck);
};

export const computeFlow = (
	formData: EditorFormData,
): FlowData => {
	let facilitiesNeeded = 0;
	if (formData.computeMode === "constraint") {
		facilitiesNeeded =
			computeFacilityNeededCountConstraint(
				formData,
				formData.constraint,
			);
	} else {
		facilitiesNeeded =
			computeFacilityNeededCountCapacity(
				formData,
				formData.capacity,
			);
	}
	const facilitiesPerArray =
		computeFacilitiesPerArray(formData);

	const materialFlowPerMinutePerFacility =
		computeDemandPerMinutePerFacility(formData);

	const productFlowPerMinutePerFacility =
		computeProductionPerMinutePerFacility(
			formData,
		);

	return {
		facilitiesNeeded,
		facilitiesPerArray,
		materialFlowPerMinutePerFacility,
		productFlowPerMinutePerFacility,
	};
};
