import { FC, HTMLAttributes } from "react";
import { MenuItem, Typography } from "@mui/material";

import { Sorter } from "../../assets";

type AutocompleteOptionProps = {
  LIProps: HTMLAttributes<HTMLLIElement>;
  option: Sorter;
};
export const AutocompleteOption: FC<AutocompleteOptionProps> = (
  props,
) => {
  const { LIProps, option } = props;

  const { label } = option;

  return (
    <MenuItem {...LIProps}>
      <Typography>{label}</Typography>
    </MenuItem>
  );
};
