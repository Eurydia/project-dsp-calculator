import { ChangeEvent, FC, ReactNode, useCallback } from "react";
import { InputAdornment, TextField } from "@mui/material";

type FieldTextProps = {
  prefix?: ReactNode;
  suffix?: ReactNode;
  label: string;

  maxLength: number;

  value: string;
  onValueChange: (next_value: string) => void;
};
export const FieldText: FC<FieldTextProps> = (props) => {
  const { maxLength, prefix, suffix, label, value, onValueChange } =
    props;

  const handleValueChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value_input: string = event.target.value;

    const value_sliced = value_input.slice(0, maxLength);
    const value_normalized = value_sliced.normalize();

    onValueChange(value_normalized);
  };

  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={handleValueChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{prefix}</InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">{suffix}</InputAdornment>
        ),
      }}
    />
  );
};
