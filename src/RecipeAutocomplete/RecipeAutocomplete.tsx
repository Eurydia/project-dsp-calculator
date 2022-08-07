// Copyright (c) 2022 Eurydia
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FC } from "react";
import { Autocomplete, TextField } from "@mui/material";
import DATA from "./data";
import { renderOption } from "./helper";

interface RecipeAutocompleteProps {}

const RecipeAutocomplete: FC<RecipeAutocompleteProps> = (props) => {
  return (
    <Autocomplete
      options={DATA}
      renderOption={renderOption}
      groupBy={(option) => option.recipe_type}
      renderInput={(params) => (
        <TextField {...params} label="recipe" variant="filled" />
      )}
    />
  );
};

export default RecipeAutocomplete;
