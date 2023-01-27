import { ChangeEvent, FC } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";

type FormProliferatorProps = {
  mode: number;
  level: number;
  disableExtraProduct: boolean;
  onModeChange: (next_mode: number) => void;
  onLevelChange: (next_level: number) => void;
};
export const FormProliferator: FC<FormProliferatorProps> = (
  props,
) => {
  const {
    mode,
    level,
    disableExtraProduct,
    onModeChange,
    onLevelChange,
  } = props;

  const handleProlifModeChange = (
    event: ChangeEvent<HTMLInputElement>,
    value: string,
  ): void => {
    const next_mode: number = Number.parseInt(value);
    if (Number.isNaN(next_mode)) {
      return;
    }
    onModeChange(next_mode);
  };
  const handleProlifLevelChange = (
    event: ChangeEvent<HTMLInputElement>,
    value: string,
  ): void => {
    const next_level: number = Number.parseInt(value);
    if (Number.isNaN(next_level)) {
      return;
    }
    onLevelChange(next_level);
  };

  return (
    <Box>
      <Grid container spacing={2} columns={{ xs: 1, sm: 2 }}>
        <Grid item xs={1}>
          <FormControl>
            <FormLabel>Proliferator Mode</FormLabel>
            <RadioGroup
              value={mode}
              onChange={handleProlifModeChange}
            >
              <FormControlLabel
                value={0}
                disabled={disableExtraProduct}
                control={<Radio />}
                label="Extra Products"
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Production Speedup"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <FormControl>
            <FormLabel>Proliferator Level</FormLabel>
            <RadioGroup
              value={level}
              onChange={handleProlifLevelChange}
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="No proliferator"
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="1"
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="2"
              />
              <FormControlLabel
                value={3}
                control={<Radio />}
                label="3"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};
