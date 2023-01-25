import {
  FC,
  memo,
  SyntheticEvent,
  useCallback,
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
  recipe_type: GroupEnumRecipe;
  recipe: Recipe;
  onRecipeChange: (next_recipe: Recipe) => void;
};
export const AutocompleteRecipe: FC<AutocompleteRecipeProps> = memo(
  (props) => {
    const { recipe, recipe_type, onRecipeChange } = props;

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
        return recipe.recipe_type === recipe_type;
      });
    }, [recipe_type]);

    return (
      <Autocomplete
        fullWidth
        disableClearable
        options={options}
        value={recipe}
        onChange={handleRecipeChange}
        filterOptions={filterOptions}
        renderOption={(props, option) => {
          return (
            <AutocompleteOption LIprops={props} option={option} />
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
      prev.recipe_type === next.recipe_type
    );
  },
);
