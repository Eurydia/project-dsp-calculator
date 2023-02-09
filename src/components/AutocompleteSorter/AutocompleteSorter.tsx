import { FC, SyntheticEvent } from "react";
import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";

import { AssetSorters, Sorter } from "../../assets";

import { filterOptions } from "./helper";

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
      renderInput={(param) => {
        return <TextField {...param} label="Sorter" />;
      }}
    />
  );
};
