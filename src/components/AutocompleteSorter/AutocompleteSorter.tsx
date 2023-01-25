import { FC, memo, SyntheticEvent, useCallback } from "react";
import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";

import { AssetSorter, Sorter } from "../../assets";

import { filterOptions } from "./helper";
import { AutocompleteOption } from "./AutocompleteOption";

type AutocompleteSorterProps = {
  sorter: Sorter;
  onSorterChange: (next_sorter: Sorter) => void;
};
export const AutocompleteSorter: FC<AutocompleteSorterProps> = memo(
  (props) => {
    const { sorter, onSorterChange } = props;

    const handleSorterChange = useCallback(
      (
        event: SyntheticEvent<Element, Event>,
        value: Sorter | null,
        reason: AutocompleteChangeReason,
      ) => {
        if (value === null) {
          return;
        }
        onSorterChange(value);
      },
      [],
    );

    return (
      <Autocomplete
        fullWidth
        disableClearable
        options={AssetSorter}
        value={sorter}
        onChange={handleSorterChange}
        filterOptions={filterOptions}
        renderOption={(props, option) => {
          return (
            <AutocompleteOption
              key={option.label}
              LIprops={props}
              option={option}
            />
          );
        }}
        renderInput={(param) => {
          return <TextField {...param} label="Sorter" />;
        }}
      />
    );
  },
  (prev, next) => {
    return prev.sorter.label === next.sorter.label;
  },
);
