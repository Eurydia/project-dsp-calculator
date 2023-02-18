import { ChangeEvent, FC } from "react";
import { Box, Stack, TextField } from "@mui/material";

import { FieldText } from "../FieldText";

import { Recipe } from "../../assets";
import { FieldNumber } from "../FieldNumber";

type FormCustomRecipeProps = {
  recipe: Recipe;
  onRecipeChange: (
    next_recipe: (prev_recipe: Recipe) => Recipe,
  ) => void;
};
export const FormCustomRecipe: FC<FormCustomRecipeProps> = (
  props,
) => {
  const { recipe, onRecipeChange } = props;

  const handleLabelChange = (next_label: string) => {
    onRecipeChange((prev) => {
      return {
        ...prev,
        label: next_label,
      };
    });
  };

  const handleCycleTimeChange = (next_cycle_time: number) => {
    onRecipeChange((prev) => {
      return {
        ...prev,
        cycle_time: next_cycle_time,
      };
    });
  };

  return (
    <Box>
      <Stack spacing={2}>
        <FieldText
          maxLength={32}
          label="Recipe name"
          value={recipe.label}
          onValueChange={handleLabelChange}
        />
        <FieldNumber
          float
          suffix="s"
          label="Cycle time"
          maxValue={Number.MAX_SAFE_INTEGER - 1}
          minValue={0}
          value={recipe.cycle_time}
          onValueChange={handleCycleTimeChange}
        />
      </Stack>
    </Box>
  );
};
