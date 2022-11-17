import { InputAdornment, TextField } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { capitalizeAll } from "../utils";

interface FieldNumberProps {
  minValue?: number;
  maxValue?: number;
  suffix?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}
/**
 * Number only field with clamping.
 * For input and output belt capacity.
 */
const FieldNumber: FC<FieldNumberProps> = (props) => {
  const { minValue, maxValue } = props;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const input_field_value = event.target.value;
    /**
     * Remove non-digit charater typed on the input field,
     * effectively only allowing digits to be typed.
     */
    const numeric_only = input_field_value.replace(/[^0-9]/, "");

    if (numeric_only === "") {
      props.onChange("");
    } else {
      let value = parseInt(numeric_only);

      if (minValue !== undefined && value < minValue) {
        value = minValue;
      }
      if (maxValue !== undefined && value > maxValue) {
        value = maxValue;
      }
      props.onChange(value.toString());
    }
  };

  return (
    <TextField
      fullWidth
      label={props.label}
      value={props.value}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {props.suffix}
          </InputAdornment>
        ),
        inputProps: {
          inputMode: "numeric",
          style: { textAlign: "right" },
        },
      }}
    />
  );
};

export default FieldNumber;
