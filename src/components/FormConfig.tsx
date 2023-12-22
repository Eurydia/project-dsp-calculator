import { FC, useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";

import {
	Context,
	Facility,
	Proliferator,
	ProliferatorMode,
	Recipe,
	Sorter,
} from "../types";

import { TextDivider } from "./TextDivider";
import { SelectFacility } from "./SelectFacility";
import { SelectRecipe } from "./SelectRecipe";
import { FieldNumber } from "./FieldNumber";
import { SelectSorter } from "./SelectSorter";
import { SelectProliferator } from "./SelectProliferator";
import { RECIPE_DATA_LIST } from "../assets";

type FormConfigProps = {
	onCtxChange: (nextCtx: Context) => void;
};
export const FormConfig: FC<FormConfigProps> = (
	props,
) => {
	const { onCtxChange: onCtxChange } = props;

	const [facility, setFacility] = useState(
		Facility.fromLabel("Arc Smelter")!,
	);
	const [recipe, setRecipe] = useState(() => {
		return RECIPE_DATA_LIST.filter(
			({ recipeType }) =>
				recipeType === facility.recipeType,
		)[0];
	});
	const [proliferator, setProliferator] =
		useState(Proliferator.fromLabel("None")!);
	const [sorter, setSorter] = useState(
		Sorter.fromLabel("Sorter Mk.I")!,
	);
	const [
		materialBeltFlowratePerMinute,
		setMaterialBeltFlowratePerMinute,
	] = useState(360);
	const [
		productBeltFlowratePerMinute,
		setProductBeltFlowratePerMinute,
	] = useState(360);

	useEffect(() => {
		onCtxChange({
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
		onCtxChange,
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

		const nextRecipe = RECIPE_DATA_LIST.filter(
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
		if (
			nextRecipe.speedupOnly &&
			proliferator.mode ===
				ProliferatorMode.EXTRA_PRODUCTS
		) {
			setProliferator(
				Proliferator.fromLabel("None")!,
			);
		}
		setRecipe(nextRecipe);
	};

	return (
		<Box>
			<Stack spacing={2}>
				<TextDivider label="Manufacturing" />
				<SelectFacility
					value={facility}
					onValueChange={handleFacilityChange}
				/>
				<SelectRecipe
					recipeType={facility.recipeType}
					recipe={recipe}
					onRecipeChange={handleRecipeChange}
				/>
				<TextDivider label="Transportation" />
				<FieldNumber
					suffix="/min"
					label="Material belt capacity"
					minValue={360}
					maxValue={7200}
					value={materialBeltFlowratePerMinute}
					onValueChange={
						setMaterialBeltFlowratePerMinute
					}
				/>
				<FieldNumber
					suffix="/min"
					label="Product belt capacity"
					minValue={360}
					maxValue={7200}
					value={productBeltFlowratePerMinute}
					onValueChange={
						setProductBeltFlowratePerMinute
					}
				/>
				<TextDivider label="Power consumption" />
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
