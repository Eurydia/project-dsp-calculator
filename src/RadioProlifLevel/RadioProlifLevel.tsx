import { ChangeEvent, FC } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface RadioProlifLevelProps {
  value: number;
  onChange: (value: number) => void;
}

const RadioProlifLevel: FC<RadioProlifLevelProps> = (props) => {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    props.onChange(parseInt(value));
  };

  return (
    <FormControl size="small">
      <FormLabel>Proliferator Level</FormLabel>
      <RadioGroup value={props.value} onChange={handleChange}>
        {[0, 1, 2, 3].map((label, index) => (
          <FormControlLabel
            key={`prolif-level-${index}`}
            label={label}
            value={index}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioProlifLevel;
