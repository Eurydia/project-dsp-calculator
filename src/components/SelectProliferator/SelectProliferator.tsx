import { ChangeEventHandler, FC } from "react";
import { MenuItem, TextField } from "@mui/material";

import {
  AssetProliferators,
  Proliferator,
  ProliferatorMode,
} from "../../assets";

type SelectProliferatorProps = {
  disableExtraProducts: boolean;
  proliferator: Proliferator;
  onProliferatorChange: (next_proliferator: Proliferator) => void;
};
export const SelectProliferator: FC<SelectProliferatorProps> = (
  props,
) => {
  const { proliferator, disableExtraProducts, onProliferatorChange } =
    props;

  const handleChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => {
    const next_label = event.target.value;
    const next_value: Proliferator | null =
      Proliferator.fromLabel(next_label);

    if (next_value === null) {
      return;
    }

    onProliferatorChange(next_value);
  };

  return (
    <TextField
      select
      fullWidth
      label="Proliferator"
      value={proliferator.label}
      onChange={handleChange}
    >
      {AssetProliferators.map((proliferator) => {
        const { label } = proliferator;
        return (
          <MenuItem
            key={label}
            value={label}
            disabled={
              proliferator.mode === ProliferatorMode.EXTRA_PRODUCTS &&
              disableExtraProducts
            }
          >
            {label}
          </MenuItem>
        );
      })}
    </TextField>
  );
};
