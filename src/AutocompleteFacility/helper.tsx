import { FC, HTMLAttributes } from "react";
import {
  AutocompleteRenderOptionState,
  MenuItem,
  Tooltip,
  Typography,
  FilterOptionsState,
  Grid,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import { matchSorter } from "match-sorter";
import { Facility } from "../types";
import { grey } from "@mui/material/colors";

interface TooltipDetailsProps {
  label: string;
  value: string;
}
const TooltipDetails: FC<TooltipDetailsProps> = (props) => {
  return (
    <Grid container columns={2} alignItems="start">
      <Grid item xs={1}>
        <Typography>{props.value}</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography>{props.label}</Typography>
      </Grid>
    </Grid>
  );
};

export const renderOption = (
  props: HTMLAttributes<HTMLLIElement>,
  option: Facility,
  state: AutocompleteRenderOptionState,
) => {
  return (
    <MenuItem {...props}>
      <Tooltip
        followCursor
        placement="right-start"
        title={
          <Stack
            padding={1}
            spacing={1}
            textTransform="capitalize"
            divider={
              <Divider flexItem sx={{ backgroundColor: grey[300] }} />
            }
          >
            <TooltipDetails
              label="production speed"
              value={`${option.speedup_multiplier}x`}
            />
            <TooltipDetails
              label="work consumption"
              value={`${option.work_consumption} MW`}
            />
            <TooltipDetails
              label="idle consumption"
              value={`${option.idle_consumption} MW`}
            />
          </Stack>
        }
      >
        <Typography textTransform="capitalize">
          {option.label}
        </Typography>
      </Tooltip>
    </MenuItem>
  );
};

export const filterOptions = (
  options: Facility[],
  state: FilterOptionsState<Facility>,
): Facility[] => {
  const value = state.inputValue;

  return matchSorter(options, value, {
    keys: [(item) => item.label],
  }).sort((a, b) => {
    if (a.recipe_type > b.recipe_type) {
      return 1;
    }
    if (a.recipe_type < b.recipe_type) {
      return -1;
    }
    return 0;
  });
};
