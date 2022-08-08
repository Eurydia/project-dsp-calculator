// Copyright (c) 2022 Eurydia
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FC, SyntheticEvent } from "react";
import {
  Autocomplete,
  AutocompleteChangeReason,
  Select,
  TextField,
} from "@mui/material";
import DATA from "./data";
import { filterOptions, renderOption } from "./helper";
import { Recipe } from "./types";
import { RecipeType } from "../enums";

interface RecipeSelectProps {
  disabled?: boolean;
  helperText?: string;
  recipe_type?: RecipeType;
  value: null | Recipe;
  onChange: (value: null | Recipe) => void;
}

const RecipeSelect: FC<RecipeSelectProps> = (props) => {
  let helper_text = " ";
  if (Boolean(props.helperText)) {
    helper_text = props.helperText!;
  }

  let options: Recipe[] = [];
  if (!Boolean(props.disabled)) {
    options = filterOptions(DATA, props.recipe_type);
  }

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: null | Recipe,
    reason: AutocompleteChangeReason,
  ) => {
    props.onChange(value);
  };

  return (
    <Select
      disabled={props.disabled}
      value={props.value}
      onChange={handleChange}
      groupBy={(option) => option.recipe_type}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="recipe"
          variant="filled"
          helperText={helper_text}
        />
      )}
    ></Select>
  );
};

export default RecipeSelect;
