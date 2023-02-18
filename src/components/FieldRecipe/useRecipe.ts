import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

import { AssetRecipes, Recipe } from "../../assets";

const BASE_RECIPE = AssetRecipes[0];

const recipeSchema = z.string();

const isValidJSON = (data: string): boolean => {
  try {
    JSON.parse(data);
    return true;
  } catch {
    return false;
  }
};

const loadRecipe = (storage_key: string): Recipe => {
  const loaded_string: string | null =
    localStorage.getItem(storage_key);

  if (loaded_string === null) {
    return BASE_RECIPE;
  }

  if (!isValidJSON(loaded_string)) {
    return BASE_RECIPE;
  }

  const parsed_string = JSON.parse(loaded_string);
  const zod_parsed_string = recipeSchema.safeParse(parsed_string);
  if (!zod_parsed_string.success) {
    return BASE_RECIPE;
  }
  const label: string = zod_parsed_string.data;
  const recipe: Recipe | null = Recipe.fromLabel(label);
  if (recipe === null) {
    return BASE_RECIPE;
  }

  return recipe;
};

const saveRecipe = (storage_key: string, facility: Recipe): void => {
  const data_string: string = Recipe.toJSON(facility);
  localStorage.setItem(storage_key, data_string);
};

export const useRecipe = (
  storage_key: string,
): {
  recipe: Recipe;
  setRecipe: (
    next_recipe: Recipe | ((prev_recipe: Recipe) => Recipe),
  ) => void;
} => {
  const [value, setValue] = useState((): Recipe => {
    return loadRecipe(storage_key);
  });

  useEffect(() => {
    saveRecipe(storage_key, value);
  }, [value]);

  return {
    recipe: value,
    setRecipe: setValue,
  };
};
