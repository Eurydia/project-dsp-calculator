import { FC, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import {
	FactoryRounded,
	LocalShippingRounded,
	PowerRounded,
} from "@mui/icons-material";

import {
	Configuration,
	Facility,
	Proliferator,
	Recipe,
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

type FormConfigProps = {
	onConfigChange: (
		nextConfig: Configuration,
	) => void;
};
export const FormConfig: FC<FormConfigProps> = (
	props,
) => {
	const { onConfigChange } = props;

	const { facility, setFacility } =
		useFacility("facility");
	const { recipe, setRecipe } =
		useRecipe("recipe");
	const { proliferator, setProliferator } =
		useProliferator("proliferator");
	const { sorter, setSorter } =
		useSorter("sorter");
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
			recipeMaterialRatioRecord: recipe.materials,
			recipeProductRatioRecord: recipe.products,

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
					facility={facility}
					onFacilityChange={handleFacilityChange}
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
					sorter={sorter}
					onSorterChange={setSorter}
				/>
				<SelectProliferator
					disableExtraProducts={
						recipe.speedupOnly
					}
					proliferator={proliferator}
					onProliferatorChange={setProliferator}
				/>
			</Stack>
		</Box>
	);
};
