import { facilityFromLabel } from "~assets/facility";
import {
	RECIPE_DEFAULT_LOOKUP,
	recipeFromLabel,
} from "~assets/recipe";
import { useClampedRecord } from "./useClampedRecord";
import { useContent } from "./useContent";
import { useFacility } from "./useFacility";
import { useFlowrateRecord } from "./useFlowrateRecord";
import { useProlifEffect } from "./useProlifEffect";
import { useRecipe } from "./useRecipe";
import { useSorterRecord } from "./useSorterRecord";

const SORTER_RECORD_DEFAULT = {
	"Sorter Mk.I": "0",
	"Sorter Mk.II": "0",
	"Sorter Mk.III": "0",
	"Pile Sorter": "0",
};

export const useCalculator = () => {
	const { facilityLabel, setFacilityLabel } =
		useFacility("Arc Smelter", "activeFacility");
	const facility = facilityFromLabel(
		facilityLabel,
	);
	const handleFacilityChange = (
		label: string,
	) => {
		setFacilityLabel(label);
		const nextFacility = facilityFromLabel(label);
		const nextRecipe = recipeFromLabel(
			RECIPE_DEFAULT_LOOKUP[
				nextFacility.recipeType
			],
		);
		handleRecipeChange(nextRecipe.label);
	};

	const { recipeLabel, setRecipeLabel } =
		useRecipe("Copper Ingot", "activeRecipe");
	const recipe = recipeFromLabel(recipeLabel);
	const handleRecipeChange = (
		nextRecipeLabel: string,
	) => {
		setRecipeLabel(nextRecipeLabel);
		updateProlifEffectLabel(nextRecipeLabel);

		const nextRecipe = recipeFromLabel(
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
	const handleSorterRecordChange = (
		itemLabel: string,
		value: string,
	) => {
		setSorterRecord(
			itemLabel,
			value,
			facility.connectionCount,
		);
	};

	const {
		flowrateRecord,
		setFlowrateRecord,
		updateFlowrateRecord,
	} = useFlowrateRecord({}, "flowrates");
	const handleFlowrateRecordChange = (
		itemLabel: string,
		value: string,
	) => {
		updateFlowrateRecord(
			itemLabel,
			value,
			facility.connectionCount,
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
		facility,
		handleFacilityChange,
		recipe,
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
