import { FC, memo, SyntheticEvent, useCallback } from "react";
import {
  Autocomplete,
  TextField,
  AutocompleteChangeReason,
} from "@mui/material";

import { AssetFacilities, Facility } from "../../assets";

import { filterOptions } from "./helper";
import { AutocompleteOption } from "./AutocompleteOption";

type AutocompleteFacilityProps = {
  facility: Facility;
  onFacilityChange: (next_facility: Facility) => void;
};
export const AutocompleteFacility: FC<AutocompleteFacilityProps> =
  memo(
    (props) => {
      const { facility, onFacilityChange } = props;

      const handleChange = useCallback(
        (
          event: SyntheticEvent<Element, Event>,
          value: Facility | null,
          reason: AutocompleteChangeReason,
        ): void => {
          if (value === null) {
            return;
          }
          onFacilityChange(value);
        },
        [],
      );

      return (
        <Autocomplete
          fullWidth
          disableClearable
          options={AssetFacilities}
          value={facility}
          onChange={handleChange}
          isOptionEqualToValue={(option, value) => {
            return option.label === value.label;
          }}
          renderOption={(props, option) => {
            return (
              <AutocompleteOption
                key={option.label}
                LIprops={props}
                option={option}
              />
            );
          }}
          filterOptions={filterOptions}
          renderInput={(params) => {
            return <TextField {...params} label="Facility" />;
          }}
        />
      );
    },
    (prev, next) => {
      return prev.facility.label === next.facility.label;
    },
  );
