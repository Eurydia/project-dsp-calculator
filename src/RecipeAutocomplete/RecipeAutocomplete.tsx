import { FC, SyntheticEvent } from "react";
import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";
import RECIPES from "../data/recipes";
import { Recipe } from "../types";
import { RecipeType } from "../enums";
import { filterOptions, renderOption } from "./helper";

interface RecipeAutocompleteProps {
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
      options={RECIPES}
      value={props.value}
      onChange={handleChange}
      renderOption={renderOption}
      filterOptions={(options, state) =>
        filterOptions(options, state, props.recipe_type)
      }
      isOptionEqualToValue={(option, value) =>
        option.label === value.label
      }
      groupBy={(option) => option.recipe_type}
      renderInput={(params) => (
        <TextField {...params} label="Recipe" />
      )}
    />
  );
};

export default RecipeAutocomplete;
