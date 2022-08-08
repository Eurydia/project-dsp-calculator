// Copyright (c) 2022 Eurydia
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FC, SyntheticEvent } from "react";
import {
  Autocomplete,
  TextField,
  AutocompleteChangeReason,
} from "@mui/material";

import DATA from "./data";
import { Facility } from "./types";
import { renderOption } from "./helper";

interface FacilitySelectProps {
  disabled?: boolean;
  helperText?: string;
  value: null | Facility;
  onChange: (value: null | Facility) => void;
}

const FacilityAutocomplete: FC<FacilitySelectProps> = (props) => {
  let helper_text = " ";
  if (Boolean(props.helperText)) {
    helper_text = props.helperText!;
  }

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: null | Facility,
    reason: AutocompleteChangeReason,
  ): void => {
    props.onChange(value);
  };

  return (
    <Autocomplete
      fullWidth
      disabled={props.disabled}
      value={props.value}
      onChange={handleChange}
      renderOption={renderOption}
      groupBy={(option) => option.recipe_type}
      options={DATA}
      renderInput={(params) => (
        <TextField
          {...params}
          label="facility"
          variant="filled"
          helperText={helper_text}
        />
      )}
    />
  );
};

export default FacilityAutocomplete;
