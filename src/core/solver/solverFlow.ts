import { tryParseIntClamp } from "~core/parsing";
import {
	ConfigFormData,
	EditorFormData,
	FlowData,
} from "~types/query";

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

	const sprayCount = tryParseIntClamp(
		pSC,
		0,
		Number.MAX_SAFE_INTEGER,
	);
	if (sprayCount > 0 && p.sprayCount > 0) {
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

export const computeFlow = (
	formData: EditorFormData,
): FlowData => {
	const materialFlowPerMinutePerFacility =
		computeDemandPerMinutePerFacility(formData);

	const productFlowPerMinutePerFacility =
		computeProductionPerMinutePerFacility(
			formData,
		);

	return {
		materialFlowPerMinutePerFacility,
		productFlowPerMinutePerFacility,
	};
};
