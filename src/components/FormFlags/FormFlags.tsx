import { FC } from "react";
import {
  Box,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import { Flags } from "../../types";

type FormFlagsProps = {
  flags: Flags;
  onFlagChange: (next_flags: (prev_flag: Flags) => Flags) => void;
};
export const FormFlags: FC<FormFlagsProps> = (props) => {
  const { flags, onFlagChange } = props;

  return (
    <Box>
      <Stack spacing={2}>
        <Box>
          <FormControlLabel
            label={<Typography>Prefer even array</Typography>}
            control={<Switch />}
            checked={flags["preferEven"]}
            onClick={() => {
              onFlagChange((prev) => {
                const next = { ...prev };
                next["preferEven"] = !prev["preferEven"];
                return next;
              });
            }}
          />
        </Box>
        <Box>
          <FormControlLabel
            label={
              <Typography>Keep flowrate under max capcity</Typography>
            }
            control={<Switch />}
            checked={flags["keepBeltUnderMaxFlow"]}
            onClick={() => {
              onFlagChange((prev) => {
                const next = { ...prev };
                next["keepBeltUnderMaxFlow"] =
                  !prev["keepBeltUnderMaxFlow"];
                return next;
              });
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};
