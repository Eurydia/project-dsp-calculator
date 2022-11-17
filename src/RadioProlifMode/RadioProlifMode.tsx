import { ChangeEvent, FC } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { capitalizeAll } from "../utils";

interface RadioProlifModeProps {
  value: number;
  disableProductBonus: boolean;
  onChange: (value: number) => void;
}
const RadioProlifMode: FC<RadioProlifModeProps> = (props) => {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    next_value: string,
  ) => {
    props.onChange(parseInt(next_value));
  };

  return (
    <FormControl size="small">
      <FormLabel>Proliferator Bonus</FormLabel>
      <RadioGroup value={props.value} onChange={handleChange}>
        {["extra products", "production speedup"].map(
          (label, index) => (
            <FormControlLabel
              key={`prolif-mode-${index}`}
              disabled={index === 0 && props.disableProductBonus}
              value={index}
              label={capitalizeAll(label)}
              control={<Radio />}
            />
          ),
        )}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioProlifMode;
