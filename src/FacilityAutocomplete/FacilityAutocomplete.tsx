import { FC, SyntheticEvent } from "react";
import {
  Autocomplete,
  TextField,
  AutocompleteChangeReason,
} from "@mui/material";
import FACILITIES from "../data/facilities";
import { Facility } from "../types";
import { filterOptions, renderOption } from "./helper";

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

export default FacilityAutocomplete;
