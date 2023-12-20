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
	Sorter,
} from "../../types";
import { AssetRecipes } from "../../assets";

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

	const { facility, setFacility } = useFacility(
		"facility",
		Facility.fromLabel("Arc Smelter")!,
	);
	const { recipe, setRecipe } = useRecipe(
		"recipe",
		Recipe.fromLabel("Copper Ingot")!,
	);
	const { proliferator, setProliferator } =
		useProliferator(
			"proliferator",
			Proliferator.fromLabel("None")!,
		);
	const { sorter, setSorter } = useSorter(
		"sorter",
		Sorter.fromLabel("Sorter Mk.I")!,
	);
	const {
		value: inputFlowratePerMinute,
		setValue: setInputFlowratePerSecond,
	} = useNumber("in-flow", 360, 7200);
	const {
		value: outputFlowratePerMinute,
		setValue: setOutputFlowratePerSecond,
	} = useNumber("out-flow", 360, 7200);

	useEffect(() => {
		onConfigChange({
			facilitySpeedupMultiplier:
				facility.speedupMultiplier,
			facilityWorkConsumptionMW:
				facility.workConsumptionMW,
			facilityIdleConsumptionMW:
				facility.idleConsumptionMW,

			recipeCycleTimeSecond: recipe.cycleTime,
			recipeMaterialRatioRecord: recipe.materials,
			recipeProductRatioRecord: recipe.products,

			sorterWorkConsumptionMW:
				sorter.workConsumptionMW,
			sorterIdleConsumptionMW:
				sorter.idleConsumptionMW,

			proliferatorProductMultiplier:
				proliferator.productMultiplier,
			proliferatorSpeedupMultiplier:
				proliferator.speedupMultiplier,
			proliferatorWorkConsumptionMultiplier:
				proliferator.workConsumptionMultiplier,

			inputFlowrateMinute: inputFlowratePerMinute,
			outputFlowrateMinute:
				outputFlowratePerMinute,
		});
	}, [
		facility,
		recipe,
		sorter,
		proliferator,
		inputFlowratePerMinute,
		outputFlowratePerMinute,
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

		const nextRecipe = AssetRecipes.filter(
			(r) => {
				return (
					r.recipeType === nextFacility.recipeType
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
					value={inputFlowratePerMinute}
					onValueChange={
						setInputFlowratePerSecond
					}
				/>
				<FieldNumber
					suffix="/min"
					label="Output belt capacity"
					minValue={360}
					maxValue={7200}
					value={outputFlowratePerMinute}
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
