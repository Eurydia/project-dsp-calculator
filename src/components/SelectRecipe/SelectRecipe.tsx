import { ChangeEventHandler, FC } from "react";
import { MenuItem, TextField } from "@mui/material";

import { AssetRecipes, Recipe, RecipeEnum } from "../../assets";

type SelectRecipeProps = {
  recipeType: RecipeEnum;
  recipe: Recipe;
  onRecipeChange: (next_recipe: Recipe) => void;
};
export const SelectRecipe: FC<SelectRecipeProps> = (props) => {
  const { recipe, recipeType, onRecipeChange } = props;

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const next_label = event.target.value;
    const next_value: Recipe | null = Recipe.fromLabel(next_label);
    if (next_value === null) {
      return;
    }
    onRecipeChange(next_value);
  };

  return (
    <TextField
      select
      fullWidth
      label="Recipe"
      value={recipe.label}
      onChange={handleChange}
    >
      {AssetRecipes.filter((recipe) => {
        return recipe.recipe_type === recipeType;
      }).map((recipe) => {
        const { label } = recipe;
        return (
          <MenuItem key={label} value={label}>
            {label}
          </MenuItem>
        );
      })}
    </TextField>
  );
};
