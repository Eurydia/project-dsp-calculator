import { FC, SyntheticEvent } from "react";
import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";

import {
  AssetProliferators,
  Proliferator,
  ProliferatorMode,
} from "../../assets";

import { filterOptions } from "./helper";

type AutocompleteProliferatorProps = {
  disableExtraProducts: boolean;
  proliferator: Proliferator;
  onProliferatorChange: (next_proliferator: Proliferator) => void;
};
export const AutocompleteProliferator: FC<
  AutocompleteProliferatorProps
> = (props) => {
  const { proliferator, disableExtraProducts, onProliferatorChange } =
    props;

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
      getOptionDisabled={(option) => {
        return (
          option.mode === ProliferatorMode.EXTRA_PRODUCTS &&
          disableExtraProducts
        );
      }}
      renderInput={(param) => {
        return <TextField {...param} label="Proliferator" />;
      }}
    />
  );
};
