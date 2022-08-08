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
} from "@mui/material";
import { Facility } from "../types";

export const renderOption = (
  props: HTMLAttributes<HTMLLIElement>,
  option: Facility,
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
              <Typography>
                {`speed multiplier: ${option.cycle_multiplier}x`}
              </Typography>
              <Typography>
                {`work consumption: ${option.work_consumption} MW`}
              </Typography>
              <Typography>
                {`idle consumption: ${option.idle_consumption} MW`}
              </Typography>
            </Stack>
          </Box>
        }
      >
        <Typography>{option.label}</Typography>
      </Tooltip>
    </MenuItem>
  );
};
