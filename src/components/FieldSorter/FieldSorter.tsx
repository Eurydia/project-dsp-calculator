import { ChangeEventHandler, FC } from "react";
import { MenuItem, TextField } from "@mui/material";

import { AssetSorters, Sorter } from "../../assets";

type FieldSorterProps = {
  sorter: Sorter;
  onSorterChange: (next_sorter: Sorter) => void;
};
export const FieldSorter: FC<FieldSorterProps> = (props) => {
  const { sorter, onSorterChange } = props;

  const handleChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => {
    const next_label = event.target.value;
    const next_value: Sorter | null = Sorter.fromLabel(next_label);

    if (next_value === null) {
      return;
    }
    onSorterChange(next_value);
  };

  return (
    <TextField
      select
      fullWidth
      label="Sorter"
      value={sorter.label}
      onChange={handleChange}
    >
      {AssetSorters.map((sorter) => {
        const { label } = sorter;
        return (
          <MenuItem key={label} value={label}>
            {label}
          </MenuItem>
        );
      })}
    </TextField>
  );
};
