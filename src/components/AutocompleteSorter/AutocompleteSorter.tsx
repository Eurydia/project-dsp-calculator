import { FC, memo, SyntheticEvent, useCallback } from "react";
import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";

import { AssetSorters, Sorter } from "../../assets";

import { filterOptions } from "./helper";
import { AutocompleteOption } from "./AutocompleteOption";

type AutocompleteSorterProps = {
  sorter: Sorter;
  onSorterChange: (next_sorter: Sorter) => void;
};
export const AutocompleteSorter: FC<AutocompleteSorterProps> = (
  props,
) => {
  const { sorter, onSorterChange } = props;

  const handleSorterChange = (
    event: SyntheticEvent<Element, Event>,
    value: Sorter | null,
    reason: AutocompleteChangeReason,
  ) => {
    if (value === null) {
      return;
    }
    onSorterChange(value);
  };

  return (
    <Autocomplete
      fullWidth
      disableClearable
      options={AssetSorters}
      value={sorter}
      onChange={handleSorterChange}
      filterOptions={filterOptions}
      isOptionEqualToValue={(option, value) => {
        return option.label === value.label;
      }}
      renderOption={(props, option) => {
        return (
          <AutocompleteOption
            key={option.label}
            LIProps={props}
            option={option}
          />
        );
      }}
      renderInput={(param) => {
        return <TextField {...param} label="Sorter" />;
      }}
    />
  );
};
