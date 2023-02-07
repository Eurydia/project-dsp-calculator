import { FC, HTMLAttributes } from "react";
import { MenuItem, Typography } from "@mui/material";

import { Recipe } from "../../assets";

type AutocompleteOptionProps = {
  LIProps: HTMLAttributes<HTMLLIElement>;
  option: Recipe;
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
