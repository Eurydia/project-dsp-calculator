import { FC, useEffect } from "react";
import { Box, Stack } from "@mui/material";

import {
	Configuration,
	RecipeEnum,
} from "../../types";

import { useFacility } from "../SelectFacility";
import { useRecipe } from "../SelectRecipe";
import { DebugFieldFacility } from "./DebugFieldFacility";
import { DebugFieldRecipe } from "./DebugFieldRecipe";

type FormConfigDebugProps = {
	onConfigChange: (
		next_config: Configuration,
	) => void;
};
export const FormConfigDebug: FC<
	FormConfigDebugProps
> = (props) => {
	const { onConfigChange } = props;

	const { facility, setFacility } = useFacility(
		"debug-facility",
		{
			label: "debug facility",
			speedupMultiplier: 1,
			recipeType: RecipeEnum.DEBUG,
			idleConsumptionMW: 0,
			workConsumptionMW: 0,
		},
	);

	const { recipe, setRecipe } = useRecipe(
		"debug-recipe",
		{
			label: "debug recipe",
			cycleTime: 1,
			materials: {},
			products: {},
			recipeType: RecipeEnum.DEBUG,
			speedupOnly: false,
		},
	);

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

			sorterWorkConsumptionMW: 0,
			sorterIdleConsumptionMW: 0,

			proliferatorProductMultiplier: 0,
			proliferatorSpeedupMultiplier: 0,
			proliferatorWorkConsumptionMultiplier: 0,

			inputFlowrateMinute: 5,
			outputFlowrateMinute: 5,
		});
	}, [facility, recipe]);

	return (
		<Box>
			<Stack spacing={2}>
				<DebugFieldFacility
					facility={facility}
					onFacilityChange={setFacility}
				/>
				<DebugFieldRecipe
					recipe={recipe}
					onRecipeChange={setRecipe}
				/>
			</Stack>
		</Box>
	);
};
