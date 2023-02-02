import { FC, SyntheticEvent, useEffect, useMemo } from "react";
import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";

import { AssetRecipes, Recipe, RecipeEnum } from "../../assets";

import { filterOptions } from "./helper";
import { AutocompleteOption } from "./AutocompleteOption";

type AutocompleteRecipeProps = {
  recipeType: RecipeEnum;
  recipe: Recipe;
  onRecipeChange: (next_recipe: Recipe) => void;
};
export const AutocompleteRecipe: FC<AutocompleteRecipeProps> = (
  props,
) => {
  const { recipe, recipeType, onRecipeChange } = props;

  const handleRecipeChange = (
    event: SyntheticEvent<Element, Event>,
    value: null | Recipe,
    reason: AutocompleteChangeReason,
  ) => {
    if (value === null) {
      return;
    }
    onRecipeChange(value);
  };

  const options = useMemo((): Recipe[] => {
    return AssetRecipes.filter((recipe) => {
      return recipe.recipe_type === recipeType;
    });
  }, [recipeType]);

  useEffect(() => {
    onRecipeChange(options[0]);
  }, [recipeType]);

  return (
    <Autocomplete
      fullWidth
      disableClearable
      options={options}
      value={recipe}
      onChange={handleRecipeChange}
      filterOptions={filterOptions}
      isOptionEqualToValue={(option, value) => {
        return option.label === value.label;
      }}
      renderOption={(props, option) => {
        return (
          <AutocompleteOption
            key={option.label}
            LIProps={props}
            option={option}
          />
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label="Recipe" />
      )}
    />
  );
};
