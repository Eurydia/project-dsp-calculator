import {
  FC,
  memo,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";

import {
  AssetRecipes,
  Recipe,
  GroupEnumRecipe,
} from "../../assets/data";

import { filterOptions } from "./helper";
import { AutocompleteOption } from "./AutocompleteOption";

type AutocompleteRecipeProps = {
  recipeType: GroupEnumRecipe;
  recipe: Recipe;
  onRecipeChange: (next_recipe: Recipe) => void;
};
export const AutocompleteRecipe: FC<AutocompleteRecipeProps> = memo(
  (props) => {
    const { recipe, recipeType, onRecipeChange } = props;

    const handleRecipeChange = useCallback(
      (
        event: SyntheticEvent<Element, Event>,
        value: null | Recipe,
        reason: AutocompleteChangeReason,
      ) => {
        if (value === null) {
          return;
        }
        onRecipeChange(value);
      },
      [],
    );

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
              LIprops={props}
              option={option}
            />
          );
        }}
        renderInput={(params) => (
          <TextField {...params} label="Recipe" />
        )}
      />
    );
  },
  (prev, next) => {
    return (
      prev.recipe.label === next.recipe.label &&
      prev.recipeType === next.recipeType
    );
  },
);
