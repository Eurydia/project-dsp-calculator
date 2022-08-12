import { FC, HTMLAttributes } from "react";
import {
  AutocompleteRenderOptionState,
  MenuItem,
  Tooltip,
  Stack,
  Typography,
  FilterOptionsState,
} from "@mui/material";
import { matchSorter } from "match-sorter";
import { Facility } from "../types";

interface CustomDetailProps {
  label: string;
  value: string;
}
const CustomDetail: FC<CustomDetailProps> = (props) => {
  return (
    <Stack spacing={4} direction="row" justifyContent="space-between">
      <Typography>{props.label}</Typography>
      <Typography>{props.value}</Typography>
    </Stack>
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
          <Stack spacing={1} padding={1}>
            <CustomDetail
              label="production speedup"
              value={`${option.speedup_multiplier}x`}
            />
            <CustomDetail
              label="work consumption"
              value={`${option.work_consumption} MW`}
            />
            <CustomDetail
              label="idle consumption"
              value={`${option.idle_consumption} MW`}
            />
          </Stack>
        }
      >
        <Typography width={1}>{option.label}</Typography>
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
