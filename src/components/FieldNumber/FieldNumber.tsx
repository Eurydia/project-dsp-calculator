import { ChangeEvent, FC, ReactNode, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";

import { clamp } from "./helper";

type FieldNumberProps = {
  prefix?: ReactNode;
  suffix?: ReactNode;
  label: string;

  minValue: number;
  maxValue: number;
  value: number;
  onValueChange: (next_value: number) => void;
};
export const FieldNumber: FC<FieldNumberProps> = (props) => {
  const {
    minValue,
    maxValue,
    prefix,
    suffix,
    label,
    value,
    onValueChange,
  } = props;

  const [_value, _setValue] = useState<string>(value.toString());

  const handleValueChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value_input: string = event.target.value.slice(0, 16);

    _setValue(value_input);

    if (value_input === "") {
      onValueChange(minValue);
      _setValue("");
      return;
    }

    const value_parsed: number = Number.parseInt(value_input);
    const value_clamped: number = clamp(
      value_parsed,
      minValue,
      maxValue,
    );

    if (value_clamped < value_parsed) {
      _setValue(maxValue.toString());
    }
    onValueChange(value_clamped);
  };

  return (
    <TextField
      fullWidth
      label={label}
      value={_value}
      onChange={handleValueChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{prefix}</InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">{suffix}</InputAdornment>
        ),
        inputProps: {
          type: "number",
          min: minValue,
          max: maxValue,
          inputMode: "numeric",
          style: { textAlign: "right" },
        },
      }}
    />
  );
};
