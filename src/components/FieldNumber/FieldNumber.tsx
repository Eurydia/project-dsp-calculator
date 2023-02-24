import {
  ChangeEvent,
  FC,
  ReactNode,
  useCallback,
  useState,
} from "react";
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
    const value_input: string = event.target.value
      .slice(0, 32)
      .replace(/^0+(?!\.)|(?<=\.)0+(?=[1-9])/, "");

    _setValue(value_input);

    if (value_input === "") {
      onValueChange(minValue);
      _setValue(minValue.toString());
      return;
    }

    const value_parsed: number = Number.parseFloat(value_input);
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
          min: minValue || 0,
          max: maxValue || 0,
          inputMode: "numeric",
          style: { textAlign: "right" },
        },
      }}
    />
  );
};
