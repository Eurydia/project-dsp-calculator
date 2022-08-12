import { ChangeEvent, FC } from "react";
import {
  createTheme,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { lightBlue, orange } from "@mui/material/colors";

interface ProliferatorModeSelectProps {
  speedup_only: boolean;
  value: number;
  onChange: (value: number) => void;
}

const ProliferatorModeSelect: FC<ProliferatorModeSelectProps> = (
  props,
) => {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    if (props.speedup_only) {
      props.onChange(1);
    } else {
      props.onChange(parseInt(value));
    }
  };

  return (
    <FormControl size="small">
      <FormLabel>Proliferator Bonus</FormLabel>
      <RadioGroup value={props.value} onChange={handleChange}>
        <FormControlLabel
          label="Extra products"
          value={0}
          control={<Radio />}
        />
        <FormControlLabel
          label="Production speedup"
          value={1}
          control={<Radio />}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default ProliferatorModeSelect;
