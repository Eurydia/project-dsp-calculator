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
import RECIPES from "../data/recipes";
import { Recipe } from "../types";
import { RecipeType } from "../enums";
import { renderOption } from "./helper";

interface RecipeAutocompleteProps {
  disabled?: boolean;
  recipe_type: RecipeType;
  value: Recipe;
  onChange: (value: Recipe) => void;
}

const RecipeAutocomplete: FC<RecipeAutocompleteProps> = (props) => {
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: null | Recipe,
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
      options={RECIPES}
      value={props.value}
      onChange={handleChange}
      renderOption={renderOption}
      filterOptions={(options, state) =>
        options.filter(
          (option) => option.recipe_type === props.recipe_type,
        )
      }
      groupBy={(option) => option.recipe_type}
      renderInput={(params) => (
        <TextField {...params} label="recipe" variant="standard" />
      )}
    />
  );
};

export default RecipeAutocomplete;
