import { ChangeEventHandler, FC } from "react";
import {
	MenuItem,
	TextField,
} from "@mui/material";

import { Recipe, RecipeType } from "../../types";

type SelectRecipeProps = {
	recipeType: RecipeType;
	recipe: Recipe;
	onRecipeChange: (next_recipe: Recipe) => void;
};
export const SelectRecipe: FC<
	SelectRecipeProps
> = (props) => {
	const { recipe, recipeType, onRecipeChange } =
		props;

	const handleChange: ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (event) => {
		const nextLabel = event.target.value;
		const nextRecipe: Recipe | null =
			Recipe.fromLabel(nextLabel);
		if (nextRecipe === null) {
			return;
		}
		onRecipeChange(nextRecipe);
	};
	return (
		<TextField
			select
			fullWidth
			label="Recipe"
			value={recipe.label}
			onChange={handleChange}
		>
			{Recipe.getRegisteredItems()
				.filter((recipe) => {
					return recipe.recipeType === recipeType;
				})
				.map((recipe) => {
					const { label } = recipe;
					return (
						<MenuItem
							key={label}
							value={label}
						>
							{label}
						</MenuItem>
					);
				})}
		</TextField>
	);
};
