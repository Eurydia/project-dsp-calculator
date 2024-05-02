import {
	FACILITY_REGISTRY,
	PROLIFERATOR_REGISTERY,
	ProliferatorMode,
	RECIPE_REGISTRY,
	RecipeType,
} from "@eurydos/dsp-item-registry";
import { Stack } from "@mui/material";
import { EditorConfig } from "pages/Editor/EditorConfig";
import { EditorInfoCards } from "pages/Editor/EditorInfoCard/EditorInfoCards";
import { EditorResultItemTable } from "pages/Editor/EditorResultItemTable";
import { EditorResultPowerTable } from "pages/Editor/EditorResultPowerTable";
import { EditorTarget } from "pages/Editor/EditorTarget";
import { FC } from "react";
import { ingredientIconFromLabel } from "~assets/index";
import {
	proliferatorFromLabel,
	proliferatorLabelFromSprayCount,
} from "~assets/proliferator";
import { StyledSelect } from "~components/StyledSelect";
import { StyledTextField } from "~components/StyledTextField";
import {
	solveDemandPerMinutePerFacility,
	solveFacilityNeededCountCapacity,
	solveFacilityNeededCountConstraint,
	solveFacilityPerArrayCount,
	solveIdleConsumptionMWPerFacility,
	solveProductionPerMinutePerFacility,
	solveWorkConsumptionMWPerFacility,
} from "~core/solver";
import { useCalculator } from "~hooks/useCalculator";
import { useContent } from "~hooks/useContent";
import { EditorLayout } from "../../views/AdaptiveLayout";

const FACILITY_OPTIONS = Object.values(
	FACILITY_REGISTRY,
).map(({ label }) => label);
const RECIPE_OPTIONS = Object.values(
	RECIPE_REGISTRY,
).map(({ label }) => label);
const PROLIF_OPTIONS = Object.values(
	PROLIFERATOR_REGISTERY,
).map(({ label }) => label);

console.debug(RECIPE_OPTIONS);

const getDisabledRecipeOptions = (
	currRecipeType: RecipeType,
) =>
	Object.values(RECIPE_REGISTRY)
		.filter(
			({ recipeType }) =>
				recipeType !== currRecipeType,
		)
		.map(({ label }) => label);

const getDisabledProlifOptions = (
	speedupOnly: boolean,
) =>
	Object.values(PROLIFERATOR_REGISTERY)
		.filter(
			({ mode }) =>
				speedupOnly &&
				mode !==
					ProliferatorMode.PRODUCTION_SPEEDUP,
		)
		.map(({ label }) => label);

const prolifEffectToLabel = (effect: string) => {
	return ingredientIconFromLabel(
		proliferatorLabelFromSprayCount(
			proliferatorFromLabel(effect).sprayCount,
		),
	);
};

export const Editor: FC = () => {
	const {
		capacityRecord,
		constraintRecord,
		facility,
		flowrateRecord,
		prolifEffectLabel,
		prolifSprayCount,
		recipe,
		sorterRecord,
		handleCapacityRecordChange,
		handleConstraintRecordChange,
		handleFacilityChange,
		handleFlowrateRecordChange,
		handleProlifChange,
		handleProlifSprayCountChange,
		handleRecipeChange,
		handleSorterRecordChange,
	} = useCalculator();

	const { content: mode, setContent: setMode } =
		useContent("0", "mode");

	const facilityLabel = facility.label;
	const recipeLabel = recipe.label;

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

	const renderedFlowrateNumberFields =
		Object.entries(flowrateRecord).map(
			([label, value]) => (
				<StyledTextField
					key={label}
					label={label}
					maxLength={6}
					value={value}
					onChange={(nextValue) =>
						handleFlowrateRecordChange(
							label,
							nextValue,
						)
					}
					onReset={() =>
						handleFlowrateRecordChange(label, "")
					}
					suffix="/min"
					prefix={
						<img
							alt={label}
							src={ingredientIconFromLabel(label)}
						/>
					}
				/>
			),
		);

	const renderedSorterSelect = Object.entries(
		sorterRecord,
	).map(([label, value]) => (
		<StyledTextField
			key={label}
			label={label}
			maxLength={2}
			value={value}
			onReset={() =>
				handleSorterRecordChange(label, "0")
			}
			onChange={(nextValue) =>
				handleSorterRecordChange(label, nextValue)
			}
			suffix={`/${facility.connectionCount}`}
			prefix={
				<img
					alt={label}
					src={ingredientIconFromLabel(label)}
				/>
			}
		/>
	));

	return (
		<EditorLayout
			slotConfig={
				<EditorConfig
					facilitySelect={
						<StyledSelect
							sortOptions
							label="Facility"
							value={facility.label}
							onValueChange={handleFacilityChange}
							optionToIcon={
								ingredientIconFromLabel
							}
							options={FACILITY_OPTIONS}
							disabledOptions={[]}
						/>
					}
					recipeSelect={
						<StyledSelect
							sortOptions
							label="Recipe"
							value={recipe.label}
							onValueChange={handleRecipeChange}
							optionToIcon={
								ingredientIconFromLabel
							}
							options={RECIPE_OPTIONS}
							disabledOptions={getDisabledRecipeOptions(
								recipe.recipeType,
							)}
						/>
					}
					flowrateNumberFields={
						renderedFlowrateNumberFields
					}
					proliferatorSelect={
						<StyledSelect
							label="Proliferator"
							value={prolifEffectLabel}
							onValueChange={handleProlifChange}
							options={PROLIF_OPTIONS}
							optionToIcon={prolifEffectToLabel}
							disabledOptions={getDisabledProlifOptions(
								recipe.speedupOnly,
							)}
						/>
					}
					prolfieratorUsesNumberField={
						<StyledTextField
							maxLength={6}
							label="Uses"
							value={prolifSprayCount}
							onChange={
								handleProlifSprayCountChange
							}
							onReset={() =>
								handleProlifSprayCountChange("")
							}
							suffix="sprays"
						/>
					}
					sorterSelects={renderedSorterSelect}
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
							handleCapacityRecordChange
						}
						onConstraintChange={
							handleConstraintRecordChange
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
					<EditorInfoCards
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
