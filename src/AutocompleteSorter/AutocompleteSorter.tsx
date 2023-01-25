import { FC, SyntheticEvent } from "react";
import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";
import { Sorter } from "../types";
import { filterOptions, renderOption } from "./helper";
import SORTERS from "../assets/data/sorters/data";

interface AutocompleteSorterProps {
  disabled?: boolean;
  value: Sorter;
  onChange: (value: Sorter) => void;
}
const AutocompleteSorter: FC<AutocompleteSorterProps> = (props) => {
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
      filterOptions={filterOptions}
      isOptionEqualToValue={(option, value) =>
        option.label === value.label
      }
      renderInput={(param) => <TextField {...param} label="Sorter" />}
    />
  );
};

export default AutocompleteSorter;
