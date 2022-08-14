// Copyright (c) 2022 Eurydia
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { FC, HTMLAttributes, ReactNode } from "react";
import {
  AutocompleteRenderOptionState,
  MenuItem,
  Tooltip,
  Box,
  Stack,
  Typography,
  createTheme,
  ThemeProvider,
  alpha,
  FilterOptionsState,
} from "@mui/material";
import { Recipe, BOM } from "../types";
import { lightBlue, orange } from "@mui/material/colors";
import { RecipeType } from "../enums";
import { matchSorter } from "match-sorter";

const BOMToTypography = (bom: BOM) => {
  const res: JSX.Element[] = [];

  for (const key of Object.keys(bom)) {
    res.push(
      <Typography key={key}>{`${bom[key]}x ${key}`}</Typography>,
    );
  }
  return res;
};

interface CustomDetailProps {
  label: string;
  value: string;
}
const CustomDetail: FC<CustomDetailProps> = (props) => {
  return (
    <Stack direction="row" spacing={4} justifyContent="space-between">
      <Typography>{props.label}</Typography>
      <Typography>{props.value}</Typography>
    </Stack>
  );
};

interface CustomListProps {
  label: string;
  children: ReactNode;
}
const CustomList: FC<CustomListProps> = (props) => {
  return (
    <Box>
      <Typography>{props.label}</Typography>
      <Box paddingLeft={2}>{props.children}</Box>
    </Box>
  );
};

const theme = createTheme({
  palette: {
    primary: lightBlue,
    secondary: orange,
  },
});

export const renderOption = (
  props: HTMLAttributes<HTMLLIElement>,
  option: Recipe,
  state: AutocompleteRenderOptionState,
) => {
  return (
    <MenuItem {...props}>
      <Tooltip
        followCursor
        placement="right-start"
        title={
          <Stack spacing={1} padding={1}>
            <CustomDetail
              label="Cycle time"
              value={`${option.cycle_time}s`}
            />
            <CustomList label="Material">
              {BOMToTypography(option.material)}
            </CustomList>
            <CustomList label="Product">
              {BOMToTypography(option.product)}
            </CustomList>
            <CustomList label="Bonus">
              <ThemeProvider theme={theme}>
                {!option.speedup_only && (
                  <Typography
                    color="primary"
                    fontWeight="bold"
                    sx={{ textShadow: "0 0 10px" }}
                  >
                    Extra products
                  </Typography>
                )}
                <Typography
                  color="secondary"
                  fontWeight="bold"
                  sx={{ textShadow: "0 0 10px" }}
                >
                  Production speedup
                </Typography>
              </ThemeProvider>
            </CustomList>
          </Stack>
        }
      >
        <Typography width={1}>{option.label}</Typography>
      </Tooltip>
    </MenuItem>
  );
};

export const filterOptions = (
  options: Recipe[],
  state: FilterOptionsState<Recipe>,
  recipe_type: RecipeType,
): Recipe[] => {
  const value = state.inputValue;

  const filtered_options = matchSorter(options, recipe_type, {
    keys: [(item) => item.recipe_type],
  });

  return matchSorter(filtered_options, value, {
    keys: [(item) => item.label],
  });
};
