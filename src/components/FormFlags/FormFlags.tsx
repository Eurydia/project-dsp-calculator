import { FC } from "react";
import { Box, List, Stack, Typography } from "@mui/material";

import { FlagItem } from "./FlagItem";

type FormFlagsProps = {};
export const FormFlags: FC<FormFlagsProps> = (props) => {
  return (
    <Box>
      <Stack spacing={2}>
        <Typography fontWeight="bold" fontSize="x-large">
          Flags
        </Typography>
        <List dense disablePadding>
          <FlagItem
            label="Prefer even facilities"
            info="If the calculation results in an odd number of facility, subtract one to make it an even number."
            flag="preferEven"
          />
          <FlagItem
            label="Keep belt under max flow"
            info="The flowrate should be strictly less than 100% flowrate which allow for some margin of error."
            flag="keepBeltUnderMaxFlow"
          />
          <FlagItem
            label="Account for sorters consumption"
            info="Account for the power usage of sorters."
            flag="accountForSortersConsumption"
          />
        </List>
      </Stack>
    </Box>
  );
};
