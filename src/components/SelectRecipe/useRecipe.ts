import {
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
} from "react";

import { Recipe } from "../../types";

const loadData = (storageKey: string): Recipe => {
	const label = localStorage.getItem(storageKey);

	if (label === null) {
		return Recipe.getRegisteredItems()[0];
	}

	return Recipe.fromLabel(label);
};

const saveData = (
	storageKey: string,
	data: Recipe,
): void => {
	localStorage.setItem(
		storageKey,
		Recipe.toJSON(data),
	);
};

export const useRecipe = (
	storageKey: string,
): {
	recipe: Recipe;
	setRecipe: Dispatch<SetStateAction<Recipe>>;
} => {
	const [recipe, setRecipe] = useState(
		loadData(storageKey),
	);

	useEffect(() => {
		saveData(storageKey, recipe);
	}, [storageKey, recipe]);

	return {
		recipe,
		setRecipe,
	};
};
