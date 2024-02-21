import { FC } from "react";
import { Stack } from "@mui/material";

import { facilityFromLabel } from "assets/facility.mts";
import {
	RECIPE_DEFAULT_LOOKUP,
	recipeFromLabel,
} from "assets/recipes/recipe.mts";

import {
	solveDemandPerMinutePerFacility,
	solveFacilityPerArrayCount,
	solveIdleConsumptionMWPerFacility,
	solveProductionPerMinutePerFacility,
	solveWorkConsumptionMWPerFacility,
} from "core/solver";

import { EditorResultItemTable } from "components/EditorResultItemTable";
import { EditorResultPowerTable } from "components/EditorResultPowerTable";
import { EditorConfig } from "components/EditorConfig";
import { EditorResultAux } from "components/EditorResultAux";

import { useContent } from "hooks/useContent";
import { useFacility } from "hooks/useFacility";
import { useRecipe } from "hooks/useRecipe";
import { useProlifEffect as useProlifEffect } from "hooks/useProlifEffect";
import { useSorterRecord } from "hooks/useSorterRecord";
import { useFlowrateRecord } from "hooks/useFlowrateRecord";
import { useClampedRecord } from "hooks/useClampedRecord";

import { EditorLayout } from "./EditorLayout";
import { EditorTarget } from "components/EditorTarget";
import { solveFacilityNeededCountConstraint } from "core/solverConstraint";
import { solveFacilityNeededCountCapacity } from "core/solverCapacity";

export const Editor: FC = () => {
	const {
		sorterRecord,
		updateSorterRecord: setSorterRecord,
	} = useSorterRecord(
		{
			"Sorter Mk.I": "0",
			"Sorter Mk.II": "0",
			"Sorter Mk.III": "0",
			"Pile Sorter": "0",
		},
		"sorters",
	);
	const {
		flowrateRecord,
		setFlowrateRecord,
		updateFlowrateRecord,
	} = useFlowrateRecord({}, "flowrates");
	const {
		clampedRecord: constraintRecord,
		setClampedRecord: setConstraintRecord,
		updateClampedRecord: updateConstraintRecord,
	} = useClampedRecord({}, "constraintRecord");
	const {
		clampedRecord: capacityRecord,
		setClampedRecord: setCapacityRecord,
		updateClampedRecord: updateCapacityRecord,
	} = useClampedRecord({}, "capacityRecord");
	const {
		content: prolifSprayCount,
		setContent: setProlifSprayCount,
	} = useContent("0", "sprayCount");

	const { facilityLabel, setFacilityLabel } =
		useFacility("Arc Smelter", "activeFacility");

	const { recipeLabel, setRecipeLabel } =
		useRecipe("Copper Ingot", "activeRecipe");

	const {
		prolifEffectLabel,
		setProlifEffectLabel,
		updateProlifEffectLabel,
	} = useProlifEffect("None", "activeProlif");
	const { content: mode, setContent: setMode } =
		useContent("0", "mode");

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

	const handleProlifChange = (
		prolifLabel: string,
	) => {
		setProlifEffectLabel(prolifLabel);
		setProlifSprayCount("0");
	};

	const facility = facilityFromLabel(
		facilityLabel,
	);
	const recipe = recipeFromLabel(recipeLabel);

	let facilityNeededCount = 0;
	if (mode === "0") {
		facilityNeededCount =
			solveFacilityNeededCountConstraint(
				facilityLabel,
				recipeLabel,
				prolifEffectLabel,
				constraintRecord,
			);
	} else {
		facilityNeededCount =
			solveFacilityNeededCountCapacity(
				facilityLabel,
				recipeLabel,
				prolifEffectLabel,
				capacityRecord,
			);
	}

	const facilityPerArrayCount =
		solveFacilityPerArrayCount(
			facilityLabel,
			recipeLabel,
			prolifEffectLabel,
			flowrateRecord,
		);

	const materialPerMinutePerFacility =
		solveDemandPerMinutePerFacility(
			facilityLabel,
			recipeLabel,
			prolifEffectLabel,
			prolifSprayCount,
		);

	const productPerMinutePerFacility =
		solveProductionPerMinutePerFacility(
			facilityLabel,
			recipeLabel,
			prolifEffectLabel,
		);

	let arrayNeededCount = 0;
	if (facilityPerArrayCount > 0) {
		arrayNeededCount = Math.floor(
			facilityNeededCount / facilityPerArrayCount,
		);
	}

	const facilityLeftoverCount =
		facilityNeededCount -
		arrayNeededCount * facilityPerArrayCount;

	const workConsumptionPerFacility =
		solveWorkConsumptionMWPerFacility(
			facilityLabel,
			prolifEffectLabel,
			sorterRecord,
		);

	const idleConsumptionPerFacility =
		solveIdleConsumptionMWPerFacility(
			facilityLabel,
			sorterRecord,
		);

	return (
		<EditorLayout
			slotConfig={
				<EditorConfig
					speedupOnly={recipe.speedupOnly}
					recipeType={recipe.recipeType}
					connectionCount={
						facility.connectionCount
					}
					facility={facilityLabel}
					onFacilityChange={handleFacilityChange}
					recipe={recipeLabel}
					onRecipeChange={handleRecipeChange}
					flowrates={flowrateRecord}
					onFlowrateChange={
						handleFlowrateRecordChange
					}
					prolif={prolifEffectLabel}
					onProlifChange={handleProlifChange}
					prolifSpray={prolifSprayCount}
					onProlifSprayChange={
						setProlifSprayCount
					}
					sorters={sorterRecord}
					onSorterChange={
						handleSorterRecordChange
					}
				/>
			}
			slotResult={
				<Stack spacing={2}>
					<EditorTarget
						mode={mode}
						constraintRecord={constraintRecord}
						capacityRecord={capacityRecord}
						onModeChange={setMode}
						onCapacityChange={
							updateCapacityRecord
						}
						onConstraintChange={
							updateConstraintRecord
						}
					/>
					<EditorResultItemTable
						facilityNeededCount={
							facilityNeededCount
						}
						facilityPerArrayCount={
							facilityPerArrayCount
						}
						materialFlowPerMinutePerFacility={
							materialPerMinutePerFacility
						}
						productFlowPerMinutePerFacility={
							productPerMinutePerFacility
						}
					/>
					<EditorResultPowerTable
						facilityNeededCount={
							facilityNeededCount
						}
						facilityPerArrayCount={
							facilityPerArrayCount
						}
						idleConsumptionPerFacility={
							idleConsumptionPerFacility
						}
						workConsumptionPerFacility={
							workConsumptionPerFacility
						}
					/>
					<EditorResultAux
						arrayNeededCount={arrayNeededCount}
						facilityPerArrayCount={
							facilityPerArrayCount
						}
						facilityNeededCount={
							facilityNeededCount
						}
						facilityLeftoverCount={
							facilityLeftoverCount
						}
						facilityLabel={facilityLabel}
						recipeLabel={recipeLabel}
						prolifLabel={prolifEffectLabel}
						prolifSpray={prolifSprayCount}
					/>
				</Stack>
			}
		/>
	);
};
