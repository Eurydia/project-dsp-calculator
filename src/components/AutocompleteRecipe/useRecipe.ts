import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

import { AssetRecipes, Recipe } from "../../assets";

const BASE_RECIPE = AssetRecipes[0];

const recipeSchema = z.string();

const loadRecipe = (storage_key: string): Recipe => {
  const loaded_string: string | null =
    localStorage.getItem(storage_key);

  if (loaded_string === null) {
    return BASE_RECIPE;
  }

  const parsed_string = recipeSchema.safeParse(loaded_string);
  if (!parsed_string.success) {
    return BASE_RECIPE;
  }
  const label: string = parsed_string.data;
  const recipe: Recipe | null = Recipe.fromLabel(label);
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
  setRecipe: (next_recipe: Recipe) => void;
} => {
  const [value, setValue] = useState(() => {
    return loadRecipe(storage_key);
  });

  const setRecipe = useCallback((next_facility: Recipe): void => {
    setValue(next_facility);
  }, []);

  useEffect(() => {
    saveRecipe(storage_key, value);
  }, [value]);

  return {
    recipe: value,
    setRecipe,
  };
};
