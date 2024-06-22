import { Recipe } from "@eurydos/dsp-item-registry";
import { useState } from "react";
import { RECIPE_KEY } from "~database/local";

export const useRecipe = (
	init: Recipe,
): [Recipe, (next: Recipe) => void] => {
	const [item, setItem] = useState(init);

	const onItemChange = (next: Recipe) => {
		setItem(next);
		localStorage.setItem(RECIPE_KEY, next.label);
	};

	return [item, onItemChange];
};
