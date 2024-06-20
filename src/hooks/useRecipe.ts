import { Recipe } from "@eurydos/dsp-item-registry";
import { useState } from "react";
import { recipeKey } from "~database/local";

export const useRecipe = (
	init: Recipe,
): [Recipe, (next: Recipe) => void] => {
	const [item, setItem] = useState(init);

	const onItemChange = (next: Recipe) => {
		setItem(next);
		localStorage.setItem(recipeKey, next.label);
	};

	return [item, onItemChange];
};
