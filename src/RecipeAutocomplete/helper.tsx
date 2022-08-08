// Copyright (c) 2022 Eurydia
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { HTMLAttributes } from "react";
import {
  AutocompleteRenderOptionState,
  MenuItem,
  Tooltip,
  Box,
  Stack,
  Typography,
  FilterOptionsState,
} from "@mui/material";
import { Recipe, BOM } from "./types";
import { lightBlue, orange } from "@mui/material/colors";
import { RecipeType } from "../enums";

const BOMToString = (bom: BOM): string[] => {
  const res: string[] = [];

  for (const key of Object.keys(bom)) {
    res.push(`${bom[key]}x ${key}`);
  }

  return res;
};

export const renderOption = (options: Recipe) => {
  return (
    <MenuItem {...props}>
      <Tooltip
        arrow
        placement="right-start"
        title={
          <Box>
            <Stack>
              <Typography>{`cycle time: ${option.cycle_time}s`}</Typography>
              <Box paddingBottom={1}>
                <Typography>material:</Typography>
                {BOMToString(option.material).map((v) => (
                  <Typography key={v} paddingLeft={2}>
                    {v}
                  </Typography>
                ))}
              </Box>
              <Box paddingBottom={1}>
                <Typography>product:</Typography>
                {BOMToString(option.product).map((v) => (
                  <Typography key={v} paddingLeft={2}>
                    {v}
                  </Typography>
                ))}
              </Box>
              <Box>
                <Typography>proliferator bonus:</Typography>
                <Box paddingLeft={2}>
                  {!option.speedup_only && (
                    <Typography
                      fontWeight="bold"
                      color={orange["A200"]}
                    >
                      extra products
                    </Typography>
                  )}
                  <Typography
                    fontWeight="bold"
                    color={lightBlue["A200"]}
                  >
                    production speedup
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>
        }
      >
        <Typography>{option.label}</Typography>
      </Tooltip>
    </MenuItem>
  );
};

export const filterOptions = (
  options: Recipe[],
  recipe_type: undefined | RecipeType = undefined,
): Recipe[] => {
  if (!Boolean(recipe_type)) {
    return options;
  }

  return options.filter((r) => r.recipe_type === recipe_type);
};
