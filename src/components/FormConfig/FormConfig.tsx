import { FC, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import {
	FactoryRounded,
	LocalShippingRounded,
	PowerRounded,
} from "@mui/icons-material";

import {
	Context,
	Facility,
	Proliferator,
	Recipe,
	Sorter,
} from "../../types";

import { IconDivider } from "../IconDivider";
import {
	SelectFacility,
	useFacility,
} from "../SelectFacility";
import {
	SelectRecipe,
	useRecipe,
} from "../SelectRecipe";
import {
	FieldNumber,
	useNumber,
} from "../FieldNumber";
import {
	SelectSorter,
	useSorter,
} from "../SelectSorter";
import {
	SelectProliferator,
	useProliferator,
} from "../SelectProliferator";
import { RECIPE_DATA_LIST } from "../../assets";

type FormConfigProps = {
	onCtxChange: (nextCtx: Context) => void;
};
export const FormConfig: FC<FormConfigProps> = (
	props,
) => {
	const { onCtxChange: onConfigChange } = props;

	const {
		value: facility,
		setValue: setFacility,
	} = useFacility(
		"facility",
		Facility.fromLabel("Arc Smelter")!,
	);
	const { value: recipe, setValue: setRecipe } =
		useRecipe(
			"recipe",
			RECIPE_DATA_LIST.filter(
				({ recipeType }) =>
					recipeType === facility.recipeType,
			)[0],
		);
	const {
		value: proliferator,
		setValue: setProliferator,
	} = useProliferator(
		"proliferator",
		Proliferator.fromLabel("None")!,
	);
	const { value: sorter, setValue: setSorter } =
		useSorter(
			"sorter",
			Sorter.fromLabel("Sorter Mk.I")!,
		);
	const {
		value: materialBeltFlowratePerMinute,
		setValue: setInputFlowratePerSecond,
	} = useNumber(
		"materialBeltFlowrate",
		360,
		7200,
	);
	const {
		value: productBeltFlowratePerMinute,
		setValue: setOutputFlowratePerSecond,
	} = useNumber("productBeltFlowrate", 360, 7200);

	useEffect(() => {
		onConfigChange({
			facilitySpeedupMultiplier:
				facility.speedupMultiplier,
			workConsumptionMWPerFacility:
				facility.workConsumptionMW,
			idleConsumptionMWPerFacility:
				facility.idleConsumptionMW,

			recipeCycleTime: recipe.cycleTime,
			recipeMaterialRatioRecord:
				recipe.materialRecord,
			recipeProductRatioRecord:
				recipe.productRecord,

			workConsumptionMWPerSorter:
				sorter.workConsumptionMW,
			idleConsumptionMWPerSorter:
				sorter.idleConsumptionMW,

			proliferatorProductMultiplier:
				proliferator.productMultiplier,
			proliferatorSpeedupMultiplier:
				proliferator.speedupMultiplier,
			proliferatorWorkConsumptionMultiplier:
				proliferator.workConsumptionMultiplier,

			materialFlowratePerMinute:
				materialBeltFlowratePerMinute,
			productFlowratePerMinute:
				productBeltFlowratePerMinute,
		});
	}, [
		facility,
		recipe,
		sorter,
		proliferator,
		materialBeltFlowratePerMinute,
		productBeltFlowratePerMinute,
		onConfigChange,
	]);

	const handleFacilityChange = (
		nextFacility: Facility,
	) => {
		setFacility(nextFacility);

		if (
			recipe.recipeType ===
			nextFacility.recipeType
		) {
			return;
		}

		const nextRecipe =
			Recipe.getRegisteredItems().filter(
				(recipe) => {
					return (
						recipe.recipeType ===
						nextFacility.recipeType
					);
				},
			)[0];
		handleRecipeChange(nextRecipe);
	};

	const handleRecipeChange = (
		nextRecipe: Recipe,
	) => {
		if (nextRecipe.speedupOnly) {
			setProliferator(
				Proliferator.fromLabel("None")!,
			);
		}
		setRecipe(nextRecipe);
	};

	return (
		<Box>
			<Stack spacing={2}>
				<IconDivider
					icon={
						<FactoryRounded color="primary" />
					}
					label="Manufacturer"
				/>
				<SelectFacility
					value={facility}
					onValueChange={handleFacilityChange}
				/>
				<SelectRecipe
					recipeType={facility.recipeType}
					recipe={recipe}
					onRecipeChange={handleRecipeChange}
				/>
				<IconDivider
					icon={
						<LocalShippingRounded color="primary" />
					}
					label="Transportation"
				/>
				<FieldNumber
					suffix="/min"
					label="Input belt capacity"
					minValue={360}
					maxValue={7200}
					value={materialBeltFlowratePerMinute}
					onValueChange={
						setInputFlowratePerSecond
					}
				/>
				<FieldNumber
					suffix="/min"
					label="Output belt capacity"
					minValue={360}
					maxValue={7200}
					value={productBeltFlowratePerMinute}
					onValueChange={
						setOutputFlowratePerSecond
					}
				/>
				<IconDivider
					icon={<PowerRounded color="primary" />}
					label="Power consumption"
				/>
				<SelectSorter
					value={sorter}
					onValueChange={setSorter}
				/>
				<SelectProliferator
					value={proliferator}
					onValueChange={setProliferator}
					speedupOnly={recipe.speedupOnly}
				/>
			</Stack>
		</Box>
	);
};
