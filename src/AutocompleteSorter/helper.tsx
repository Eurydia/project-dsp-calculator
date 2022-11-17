import { FC, HTMLAttributes } from "react";
import {
  AutocompleteRenderOptionState,
  MenuItem,
  Tooltip,
  Typography,
  FilterOptionsState,
  Grid,
  Divider,
  Stack,
} from "@mui/material";
import { matchSorter } from "match-sorter";
import { Sorter } from "../types";
import { grey } from "@mui/material/colors";
import { capitalizeAll } from "../utils";

interface CustomDetailProps {
  label: string;
  value: string;
}
const TooltipDetail: FC<CustomDetailProps> = (props) => {
  return (
    <Stack direction="column">
      <Typography>{props.label}</Typography>
      <Typography paddingLeft={2}>{props.value}</Typography>
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
          <Stack
            padding={1}
            spacing={1}
            divider={
              <Divider flexItem sx={{ backgroundColor: grey[300] }} />
            }
          >
            <TooltipDetail
              label="Work Consumption"
              value={`${option.work_consumption} MW`}
            />
            <TooltipDetail
              label="Idle Consumption"
              value={`${option.idle_consumption} MW`}
            />
          </Stack>
        }
      >
        <Typography>{capitalizeAll(option.label)}</Typography>
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
