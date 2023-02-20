import { FC } from "react";
import { Box, Stack } from "@mui/material";

import { RecipeEnum } from "../../assets";
import { Configuration } from "../../types";

import { useFacility } from "../SelectFacility";
import { useRecipe } from "../SelectRecipe";

type FormConfigDebugProps = {
  onConfigurationChange: (next_config: Configuration) => void;
};
export const FormConfigDebug: FC<FormConfigDebugProps> = (props) => {
  const { onConfigurationChange } = props;

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
    recipe_type: RecipeEnum.DEBUG,
    materials: {},
    products: {},
    speedup_only: false,
  });

  return (
    <Box>
      <Stack spacing={3}>
        <Stack spacing={1}></Stack>
      </Stack>
    </Box>
  );
};
