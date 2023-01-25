import { FC, SyntheticEvent } from "react";
import {
  Autocomplete,
  TextField,
  AutocompleteChangeReason,
} from "@mui/material";
import FACILITIES from "../assets/data/facilities/data";
import { Facility } from "../types";
import { filterOptions, renderOption } from "./helper";

interface AutocompleteFacilityProps {
  value: Facility;
  onChange: (value: Facility) => void;
}
const AutocompleteFacility: FC<AutocompleteFacilityProps> = (
  props,
) => {
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: null | Facility,
    reason: AutocompleteChangeReason,
  ): void => {
    if (value !== null) {
      props.onChange(value);
    }
  };

  return (
    <Autocomplete
      fullWidth
      disableClearable
      options={FACILITIES}
      value={props.value}
      onChange={handleChange}
      renderOption={renderOption}
      filterOptions={filterOptions}
      groupBy={(option) => option.recipe_type}
      isOptionEqualToValue={(option, value) =>
        option.label === value.label
      }
      renderInput={(params) => (
        <TextField {...params} label="Facility" />
      )}
    />
  );
};

export default AutocompleteFacility;
