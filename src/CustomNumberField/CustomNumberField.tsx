import { InputAdornment, TextField } from "@mui/material";
import { ChangeEvent, FC } from "react";

interface CustomNumberFieldProps {
  min_value?: number;
  max_value?: number;
  suffix?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}
const CustomNumberField: FC<CustomNumberFieldProps> = (props) => {
  const { min_value, max_value } = props;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target_val = event.target.value;
    const numeric_only = target_val.replace(/[^0-9]/, "");

    if (numeric_only === "") {
      props.onChange("");
    } else {
      let val = parseInt(numeric_only);

      if (min_value !== undefined && val < min_value) {
        val = min_value;
      }

      if (max_value !== undefined && val > max_value) {
        val = max_value;
      }

      props.onChange(val.toString());
    }
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
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
          style: { textAlign: "right" },
          inputMode: "numeric",
        },
      }}
    />
  );
};

export default CustomNumberField;
