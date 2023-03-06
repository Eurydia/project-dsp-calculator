import { ChangeEventHandler, FC } from "react";
import { MenuItem, TextField } from "@mui/material";

import { AssetProliferators } from "../../assets";

import { Proliferator, ProliferatorMode } from "../../types";

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

  const handleChangeSelect: ChangeEventHandler<
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
      onChange={handleChangeSelect}
    >
      {AssetProliferators.filter((proliferator) => {
        return true;
        // proliferator.mode === ProliferatorMode.PRODUCTION_SPEEDUP ||
        // (!disableExtraProducts &&
        //   proliferator.mode === ProliferatorMode.EXTRA_PRODUCTS)
      }).map((proliferator) => {
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
