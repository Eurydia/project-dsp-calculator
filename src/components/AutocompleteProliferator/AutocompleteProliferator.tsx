import { FC, SyntheticEvent } from "react";
import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";

import { AssetProliferators, Proliferator } from "../../assets";

import { filterOptions } from "./helper";
import { AutocompleteOption } from "./AutocompleteOption";

type AutocompleteProliferatorProps = {
  proliferator: Proliferator;
  onProliferatorChange: (next_proliferator: Proliferator) => void;
};
export const AutocompleteProliferator: FC<
  AutocompleteProliferatorProps
> = (props) => {
  const { proliferator, onProliferatorChange } = props;

  const handleSorterChange = (
    event: SyntheticEvent<Element, Event>,
    value: Proliferator | null,
    reason: AutocompleteChangeReason,
  ) => {
    if (value === null) {
      return;
    }

    onProliferatorChange(value);
  };

  return (
    <Autocomplete
      fullWidth
      disableClearable
      options={AssetProliferators}
      value={proliferator}
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
        return <TextField {...param} label="Proliferator" />;
      }}
    />
  );
};
