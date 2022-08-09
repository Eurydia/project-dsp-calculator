import { HTMLAttributes } from "react";
import {
  AutocompleteRenderOptionState,
  MenuItem,
  Tooltip,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { Sorter } from "../types";

export const renderOption = (
  props: HTMLAttributes<HTMLLIElement>,
  option: Sorter,
  state: AutocompleteRenderOptionState,
) => {
  return (
    <MenuItem {...props}>
      <Tooltip
        arrow
        placement="right-start"
        title={
          <Box>
            <Stack>
              <Typography>{`work consumption: ${option.work_consumption} MW`}</Typography>
              <Typography>{`idle consumption: ${option.idle_consumption} MW`}</Typography>
            </Stack>
          </Box>
        }
      >
        <Typography>{option.label}</Typography>
      </Tooltip>
    </MenuItem>
  );
};
