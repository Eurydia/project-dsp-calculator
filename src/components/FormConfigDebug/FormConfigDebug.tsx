import { FC, useEffect } from "react";
import { Box, Stack } from "@mui/material";

import { Configuration, RecipeEnum } from "../../types";

import { useFacility } from "../SelectFacility";
import { useRecipe } from "../SelectRecipe";
import { DebugFieldFacility } from "./DebugFieldFacility";
import { DebugFieldRecipe } from "./DebugFieldRecipe";

type FormConfigDebugProps = {
  onConfigChange: (next_config: Configuration) => void;
};
export const FormConfigDebug: FC<FormConfigDebugProps> = (props) => {
  const { onConfigChange } = props;

  const { facility, setFacility } = useFacility("debug-facility", {
    label: "debug facility",
    speed_multiplier: 1,
    recipe_type: RecipeEnum.DEBUG,
    idle_consumption_MW: 0,
    work_consumption_MW: 0,
  });

  const { recipe, setRecipe } = useRecipe("debug-recipe", {
    label: "debug recipe",
    cycle_time: 1,
    materials: {},
    products: {},
    recipe_type: RecipeEnum.DEBUG,
    speedup_only: false,
  });

  useEffect(() => {
    onConfigChange({
      facility_speed_multiplier: facility.speed_multiplier,
      facility_work_consumption_MW: facility.work_consumption_MW,
      facility_idle_consumption_MW: facility.idle_consumption_MW,

      recipe_cycle_time_second: recipe.cycle_time,
      recipe_material_ratios: recipe.materials,
      recipe_product_ratios: recipe.products,

      sorter_work_consumption_MW: 0,
      sorter_idle_consumption_MW: 0,

      proliferator_product_multiplier: 0,
      proliferator_speed_multiplier: 0,
      proliferator_work_consumption_multiplier: 0,

      input_flowrate_per_second: 5,
      output_flowrate_per_second: 5,
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
