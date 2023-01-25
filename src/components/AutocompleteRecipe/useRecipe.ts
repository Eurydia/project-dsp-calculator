import { useCallback, useEffect, useState } from "react";
import { AssetRecipes, Recipe } from "../../assets";

const BASE_RECIPE = AssetRecipes[0];

const loadRecipe = (storage_key: string): Recipe => {
  const loaded_string: string | null =
    localStorage.getItem(storage_key);

  if (loaded_string === null) {
    return BASE_RECIPE;
  }

  const parsed_string: string | unknown = JSON.parse(loaded_string);
  if (typeof parsed_string !== "string") {
    return BASE_RECIPE;
  }

  const recipe: Recipe | null = Recipe.fromLabel(parsed_string);
  if (recipe === null) {
    return BASE_RECIPE;
  }

  return recipe;
};

const saveRecipe = (storage_key: string, facility: Recipe): void => {
  const data_string: string = Recipe.toString(facility);
  localStorage.setItem(storage_key, data_string);
};

export const useRecipe = (
  storage_key: string,
): {
  recipe: Recipe;
  onRecipeChange: (next_recipe: Recipe) => void;
} => {
  const [value, setValue] = useState(() => {
    return loadRecipe(storage_key);
  });

  const onRecipeChange = useCallback(
    (next_facility: Recipe): void => {
      setValue(next_facility);
    },
    [],
  );

  useEffect(() => {
    saveRecipe(storage_key, value);
  }, [value]);

  return {
    recipe: value,
    onRecipeChange,
  };
};
