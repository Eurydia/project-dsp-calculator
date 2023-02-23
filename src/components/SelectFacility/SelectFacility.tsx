import { ChangeEventHandler, FC } from "react";
import { TextField, MenuItem } from "@mui/material";

import { AssetFacilities } from "../../assets";
import { Facility } from "../../types";

type SelectFacilityProps = {
  facility: Facility;
  onFacilityChange: (next_facility: Facility) => void;
};
export const SelectFacility: FC<SelectFacilityProps> = (props) => {
  const { facility, onFacilityChange } = props;

  const handleChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event): void => {
    const next_label = event.target.value;
    const next_value: Facility | null =
      Facility.fromLabel(next_label);

    if (next_value === null) {
      return;
    }
    onFacilityChange(next_value);
  };

  return (
    <TextField
      fullWidth
      select
      label="Facility"
      value={facility.label}
      onChange={handleChange}
    >
      {AssetFacilities.map((facility) => {
        const { label } = facility;
        return (
          <MenuItem key={label} value={label}>
            {label}
          </MenuItem>
        );
      })}
    </TextField>
  );
};
