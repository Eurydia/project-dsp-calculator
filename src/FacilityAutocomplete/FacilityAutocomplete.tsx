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

import DATA, { Facility } from "./data";
import { renderOption } from "./helper";

interface FacilitySelectProps {
  disabled?: boolean;
  helperText?: string;
  value: null | Facility;
  onChange: (value: null | Facility) => void;
}

const FacilityAutocomplete: FC<FacilitySelectProps> = (props) => {
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: null | Facility,
    reason: AutocompleteChangeReason,
  ): void => {
    props.onChange(value);
  };

  return (
    <Autocomplete
      options={DATA}
      disabled={props.disabled}
      value={props.value}
      onChange={handleChange}
      renderOption={renderOption}
      groupBy={(option) => option.recipe_type}
      renderInput={(params) => (
        <TextField
          {...params}
          label="facility"
          variant="filled"
          helperText={
            Boolean(props.helperText) ? props.helperText : " "
          }
        />
      )}
    />
  );
};

export default FacilityAutocomplete;
