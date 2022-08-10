// Copyright (c) 2022 Eurydia
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FC, SyntheticEvent } from "react";
import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";
import { Sorter } from "../types";
import { renderOption } from "./helper";
import SORTERS from "../data/sorter";

interface SorterAutocompleteProps {
  disabled?: boolean;
  value: Sorter;
  onChange: (value: Sorter) => void;
}

const SorterAutocomplete: FC<SorterAutocompleteProps> = (props) => {
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: Sorter,
    reason: AutocompleteChangeReason,
  ) => {
    if (Boolean(value)) {
      props.onChange(value!);
    }
  };

  return (
    <Autocomplete
      disableClearable
      disabled={props.disabled}
      options={SORTERS}
      value={props.value}
      onChange={handleChange}
      renderOption={renderOption}
      renderInput={(params) => (
        <TextField {...params} label="sorter" variant="filled" />
      )}
    />
  );
};

export default SorterAutocomplete;
