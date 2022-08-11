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
import FACILITIES from "../data/facilities";
import { Facility } from "../types";
import { renderOption } from "./helper";

interface FacilitySelectProps {
  value: Facility;
  onChange: (value: Facility) => void;
}

const FacilityAutocomplete: FC<FacilitySelectProps> = (props) => {
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: null | Facility,
    reason: AutocompleteChangeReason,
  ): void => {
    if (Boolean(value)) {
      props.onChange(value!);
    }
  };

  return (
    <Autocomplete
      disableClearable
      options={FACILITIES}
      value={props.value}
      onChange={handleChange}
      renderOption={renderOption}
      groupBy={(option) => option.recipe_type}
      renderInput={(params) => (
        <TextField {...params} label="facility" variant="outlined" />
      )}
    />
  );
};

export default FacilityAutocomplete;
