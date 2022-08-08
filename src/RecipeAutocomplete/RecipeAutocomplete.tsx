// Copyright (c) 2022 Eurydia
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FC, SyntheticEvent } from "react";
import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";
import { renderOption } from "./helper";
import { Recipe } from "../types";
import { RecipeType } from "../enums";

interface RecipeAutocompleteProps {
  disabled?: boolean;
  recipe_type?: RecipeType;
  options: Recipe[];
  value: Recipe;
  onChange: (value: Recipe) => void;
}

const RecipeAutocomplete: FC<RecipeAutocompleteProps> = (props) => {
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: Recipe,
    reason: AutocompleteChangeReason,
  ) => {
    if (Boolean(value)) {
      props.onChange(value!);
    }
  };

  return (
    <Autocomplete
      disableClearable
      disabled={props.disabled}
      options={props.options}
      value={props.value}
      onChange={handleChange}
      renderOption={renderOption}
      groupBy={(option) => option.recipe_type}
      renderInput={(params) => (
        <TextField
          {...params}
          label="recipe"
          variant="filled"
          helperText=" "
        />
      )}
    />
  );
};

export default RecipeAutocomplete;
