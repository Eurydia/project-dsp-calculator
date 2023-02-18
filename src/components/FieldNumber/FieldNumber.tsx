import { ChangeEvent, FC, ReactNode, useCallback } from "react";
import { InputAdornment, TextField } from "@mui/material";

import { clamp } from "./helper";

type FieldNumberProps = {
  float?: boolean;
  suffix?: ReactNode;
  label: string;

  minValue: number;
  maxValue: number;
  value: number;
  onValueChange: (next_value: number) => void;
};
export const FieldNumber: FC<FieldNumberProps> = (props) => {
  const {
    float,
    minValue,
    maxValue,
    suffix,
    label,
    value,
    onValueChange,
  } = props;

  const handleValueChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value_input: string = event.target.value;
    if (value_input === "") {
      onValueChange(minValue);
      return;
    }
    const value_parsed: number = float
      ? Number.parseFloat(value_input)
      : Number.parseInt(value_input);

    if (Number.isNaN(value_parsed)) {
      return;
    }

    const value_clamped: number = clamp(
      value_parsed,
      minValue,
      maxValue,
    );
    onValueChange(value_clamped);
  };

  return (
    <TextField
      fullWidth
      label={label}
      value={value.toString()}
      onChange={handleValueChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{suffix}</InputAdornment>
        ),
        inputProps: {
          inputMode: "numeric",
          type: "number",
          style: { textAlign: "right" },
        },
      }}
    />
  );
};
