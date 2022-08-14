import { FC, HTMLAttributes } from "react";
import {
  AutocompleteRenderOptionState,
  MenuItem,
  Tooltip,
  Stack,
  Typography,
  FilterOptionsState,
} from "@mui/material";
import { Sorter } from "../types";
import { matchSorter } from "match-sorter";

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
  option: Sorter,
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
              label="Work consumption"
              value={`${option.work_consumption}`}
            />
            <CustomDetail
              label="Idle consumption"
              value={`${option.idle_consumption}`}
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
  options: Sorter[],
  state: FilterOptionsState<Sorter>,
): Sorter[] => {
  const value = state.inputValue;

  return matchSorter(options, value, {
    keys: [(item) => item.label],
  });
};
