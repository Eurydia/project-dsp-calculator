import { useEffect, useState } from "react";
import { z } from "zod";

import { Facility, Recipe, RecipeEnum } from "../../assets";

const recipeSchema = z.object({
  label: z.string(),
  cycle_time: z.number(),
  speedup_only: z.boolean(),
  recipe_type: z.nativeEnum(RecipeEnum),
  materials: z.record(z.string(), z.number()),
  products: z.record(z.string(), z.number()),
});

const isValidJSON = (data: string): boolean => {
  try {
    JSON.parse(data);
    return true;
  } catch {
    return false;
  }
};

const loadData = (storage_key: string, fallback: Recipe): Recipe => {
  const loaded_string: string | null =
    localStorage.getItem(storage_key);

  if (loaded_string === null) {
    return fallback;
  }

  if (!isValidJSON(loaded_string)) {
    return fallback;
  }

  const json_parsed_data = JSON.parse(loaded_string);
  const zod_parsed_data = recipeSchema.safeParse(json_parsed_data);
  if (!zod_parsed_data.success) {
    return fallback;
  }

  const { data } = zod_parsed_data;
  const recipe: Recipe | null = Recipe.fromLabel(data.label);
  if (recipe !== null) {
    return recipe;
  }
  return data;
};

const saveData = (storage_key: string, data: Recipe): void => {
  const data_string: string = Recipe.toJSON(data);
  localStorage.setItem(storage_key, data_string);
};

export const useRecipe = (
  storage_key: string,
  default_value: Recipe,
): {
  recipe: Recipe;
  setRecipe: (
    next_recipe: Recipe | ((prev_recipe: Recipe) => Recipe),
  ) => void;
} => {
  const [recipe, setRecipe] = useState<Recipe>(() => {
    return loadData(storage_key, default_value);
  });

  useEffect(() => {
    saveData(storage_key, recipe);
  }, [recipe]);

  return {
    recipe,
    setRecipe,
  };
};
