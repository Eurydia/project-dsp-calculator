import { FC, useMemo } from "react";
import { Stack } from "@mui/material";

import { facilityFromLabel } from "assets/facility.mts";
import { recipeFromLabel } from "assets/recipes/recipe.mts";

import {
	getDemandPerMinutePerFacility,
	getFacilityPerArrayCount,
	getFacilityNeededCount,
	getIdleConsumptionPerFacility,
	getProductionPerMinutePerFacility,
	getWorkConsumptionPerFacility,
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
import { useDesiredProductRecord } from "hooks/useDesiredProductRecord";
import {
	proliferatorFromLabel,
	proliferatorLabelFromSprayCount,
} from "assets/proliferator.mts";

import { EditorLayout } from "./EditorLayout";

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
		desiredProductRecord,
		setDesiredProductRecord,
		updateDesiredProductRecord,
	} = useDesiredProductRecord(
		{},
		"desiredProduction",
	);
	const {
		content: prolifSprayCount,
		setContent: setProlifSprayCount,
	} = useContent("0", "sprayCount");

	const { facilityLabel, setFacilityLabel } =
		useFacility("Arc Smelter", "activeFacility");

	const {
		recipeLabel,
		setRecipeLabel,
		updateRecipeLabel,
	} = useRecipe("Copper Ingot", "activeRecipe");

	const {
		prolifEffectLabel,
		setProlifEffectLabel,
		updateProlifEffectLabel,
	} = useProlifEffect("None", "activeProlif");

	const handleFacilityChange = (
		label: string,
	) => {
		setFacilityLabel(label);
		updateRecipeLabel(label);
	};

	const handleRecipeChange = (
		nextRecipeLabel: string,
	) => {
		setRecipeLabel(nextRecipeLabel);
		updateProlifEffectLabel(nextRecipeLabel);

		const nextRecipe = recipeFromLabel(
			nextRecipeLabel,
		);
		setDesiredProductRecord(
			Object.keys(nextRecipe.productRecord),
			"",
		);
		setFlowrateRecord(
			Object.keys({
				...nextRecipe.materialRecord,
				...nextRecipe.productRecord,
			}),
			"",
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
		setProlifSprayCount("");
	};

	const facility = facilityFromLabel(
		facilityLabel,
	);
	const recipe = recipeFromLabel(recipeLabel);
	const prolif = proliferatorFromLabel(
		prolifEffectLabel,
	);

	const prolifLabel =
		proliferatorLabelFromSprayCount(
			prolif.sprayCount,
		);
	const computedCycleSpeed =
		facility.cycleMultiplier *
		prolifEffectLabel.cycleMultiplier;
	const facilityNeededCount = useMemo(
		() =>
			getFacilityNeededCount(
				recipe.cycleTimeSecond,
				computedCycleSpeed,
				prolifEffectLabel.productMultiplier,
				recipe.productRecord,
				desiredProducts,
			),
		[
			recipe.cycleTimeSecond,
			computedCycleSpeed,
			prolifEffectLabel.productMultiplier,
			recipe.productRecord,
			desiredProducts,
		],
	);

	const facilityPerArrayCount = useMemo(
		() =>
			getFacilityPerArrayCount(
				recipe.cycleTimeSecond,
				computedCycleSpeed,
				prolifEffectLabel.productMultiplier,
				flowrateRecord,
				recipe.materialRecord,
				recipe.productRecord,
			),
		[
			recipe.cycleTimeSecond,
			computedCycleSpeed,
			prolifEffectLabel.productMultiplier,
			flowrateRecord,
			recipe.materialRecord,
			recipe.productRecord,
		],
	);

	const materialPerMinutePerFacility = useMemo(
		() =>
			getDemandPerMinutePerFacility(
				recipe.cycleTimeSecond,
				computedCycleSpeed,
				prolifEffectLabel.productMultiplier,
				recipe.materialRecord,
				recipe.productRecord,
				prolifLabel,
				prolifSprayCount,
			),
		[
			recipe.cycleTimeSecond,
			computedCycleSpeed,
			prolifEffectLabel.productMultiplier,
			recipe.materialRecord,
			recipe.productRecord,
			prolifLabel,
			prolifSprayCount,
		],
	);

	const productPerMinutePerFacility = useMemo(
		() =>
			getProductionPerMinutePerFacility(
				recipe.cycleTimeSecond,
				computedCycleSpeed,
				prolifEffectLabel.productMultiplier,
				recipe.productRecord,
			),
		[
			recipe.cycleTimeSecond,
			computedCycleSpeed,
			prolifEffectLabel.productMultiplier,
			recipe.productRecord,
		],
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
		getWorkConsumptionPerFacility(
			facility.workConsumptionMW,
			prolifEffectLabel.workConsumptionMultiplier,
			sorters,
		);

	const idleConsumptionPerFacility =
		getIdleConsumptionPerFacility(
			facility.idleConsumptionMW,
			sorters,
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
					desiredProducts={desiredProductRecord}
					onDesiredProductChange={
						updateDesiredProductRecord
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
