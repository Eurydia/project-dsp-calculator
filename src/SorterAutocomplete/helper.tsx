import { FC, HTMLAttributes } from "react";
import {
  AutocompleteRenderOptionState,
  MenuItem,
  Tooltip,
  Box,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { Sorter } from "../types";

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
        placement="right-start"
        componentsProps={{
          tooltip: { sx: { backgroundColor: alpha("#000000", 0.8) } },
        }}
        title={
          <Stack spacing={1} padding={1}>
            <CustomDetail
              label="work consumption"
              value={`${option.work_consumption}`}
            />
            <CustomDetail
              label="idle consumption"
              value={`${option.idle_consumption}`}
            />
          </Stack>
        }
      >
        <Typography>{option.label}</Typography>
      </Tooltip>
    </MenuItem>
  );
};
