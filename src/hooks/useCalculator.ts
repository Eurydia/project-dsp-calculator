import { facilityFromLabel } from "~assets/facility";
import {
	RECIPE_DEFAULT_LOOKUP,
	recipeFromLabel,
} from "~assets/recipe";
import { SORTER_RECORD_DEFAULT } from "~constants/HOOK_DEFAULT_STATE";
import { useClampedRecord } from "./useClampedRecord";
import { useContent } from "./useContent";
import { useFacility } from "./useFacility";
import { useFlowrateRecord } from "./useFlowrateRecord";
import { useProlifEffect } from "./useProlifEffect";
import { useRecipe } from "./useRecipe";
import { useSorterRecord } from "./useSorterRecord";

export const useCalculator = () => {
	const {
		label: facilityLabel,
		setFacilityLabel,
	} = useFacility(
		"Arc Smelter",
		"activeFacility",
	);

	const handleFacilityChange = async (
		label: string,
	) => {
		setFacilityLabel(label);
		const nextFacility = await facilityFromLabel(
			label,
		);
		const nextRecipe = await recipeFromLabel(
			RECIPE_DEFAULT_LOOKUP[
				nextFacility.recipeType
			],
		);
		handleRecipeChange(nextRecipe.label);
	};

	const { recipeLabel, setRecipeLabel } =
		useRecipe("Copper Ingot", "activeRecipe");
	const handleRecipeChange = async (
		nextRecipeLabel: string,
	) => {
		setRecipeLabel(nextRecipeLabel);
		updateProlifEffectLabel(nextRecipeLabel);

		const nextRecipe = await recipeFromLabel(
			nextRecipeLabel,
		);
		setConstraintRecord(
			Object.keys(nextRecipe.materialRecord),
			"",
		);
		setCapacityRecord(
			Object.keys(nextRecipe.productRecord),
			"",
		);
		setFlowrateRecord(
			Object.keys({
				...nextRecipe.materialRecord,
				...nextRecipe.productRecord,
			}),
			"0",
		);
	};

	const {
		sorterRecord,
		updateSorterRecord: setSorterRecord,
	} = useSorterRecord(
		SORTER_RECORD_DEFAULT,
		"sorters",
	);
	const handleSorterRecordChange = async (
		itemLabel: string,
		value: string,
	) => {
		const { connectionCount } =
			await facilityFromLabel(facilityLabel);
		setSorterRecord(
			itemLabel,
			value,
			connectionCount,
		);
	};

	const {
		flowrateRecord,
		setFlowrateRecord,
		updateFlowrateRecord,
	} = useFlowrateRecord({}, "flowrates");
	const handleFlowrateRecordChange = async (
		itemLabel: string,
		value: string,
	) => {
		const { connectionCount } =
			await facilityFromLabel(facilityLabel);
		updateFlowrateRecord(
			itemLabel,
			value,
			connectionCount,
		);
	};

	const {
		clampedRecord: constraintRecord,
		setClampedRecord: setConstraintRecord,
		updateClampedRecord:
			handleConstraintRecordChange,
	} = useClampedRecord({}, "constraintRecord");
	const {
		clampedRecord: capacityRecord,
		setClampedRecord: setCapacityRecord,
		updateClampedRecord:
			handleCapacityRecordChange,
	} = useClampedRecord({}, "capacityRecord");
	const {
		content: prolifSprayCount,
		setContent: handleProlifSprayCountChange,
	} = useContent("0", "sprayCount");

	const {
		prolifEffectLabel,
		setProlifEffectLabel,
		updateProlifEffectLabel,
	} = useProlifEffect("None", "activeProlif");
	const handleProlifChange = (
		prolifLabel: string,
	) => {
		setProlifEffectLabel(prolifLabel);
		handleProlifSprayCountChange("0");
	};

	return {
		facilityLabel,
		handleFacilityChange,
		recipeLabel,
		handleRecipeChange,
		sorterRecord,
		handleSorterRecordChange,
		flowrateRecord,
		handleFlowrateRecordChange,
		prolifEffectLabel,
		handleProlifChange,
		prolifSprayCount,
		handleProlifSprayCountChange,
		capacityRecord,
		handleCapacityRecordChange,
		constraintRecord,
		handleConstraintRecordChange,
	};
};
