import { ChangeEvent, FC } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface ProliferatorLevelSelectProps {
  value: number;
  onChange: (value: number) => void;
}

const ProliferatorLevelSelect: FC<ProliferatorLevelSelectProps> = (
  props,
) => {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    props.onChange(parseInt(value));
  };

  return (
    <FormControl size="small">
      <FormLabel>proliferator level</FormLabel>
      <RadioGroup value={props.value} onChange={handleChange}>
        {[0, 1, 2, 3].map((label, index) => (
          <FormControlLabel
            key={label}
            label={label}
            value={index}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default ProliferatorLevelSelect;
