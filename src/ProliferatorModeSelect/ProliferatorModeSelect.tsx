import { ChangeEvent, FC } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

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
      <FormLabel>proliferator bonus</FormLabel>
      <RadioGroup value={props.value} onChange={handleChange}>
        {["extra products", "production speedup"].map(
          (label, index) => (
            <FormControlLabel
              disabled={props.speedup_only && index === 0}
              key={label}
              label={label}
              value={index}
              control={<Radio />}
            />
          ),
        )}
      </RadioGroup>
    </FormControl>
  );
};

export default ProliferatorModeSelect;
