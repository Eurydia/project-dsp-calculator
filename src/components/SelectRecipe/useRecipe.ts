import { useEffect, useState } from "react";
import { z } from "zod";

import { Recipe, RecipeEnum } from "../../types";

const recipeSchema = z.object({
	label: z.string(),
	cycleTime: z.number(),
	recipeType: z.nativeEnum(RecipeEnum),
	materials: z.record(z.string(), z.number()),
	products: z.record(z.string(), z.number()),
	speedupOnly: z.boolean(),
});

const isValidJSON = (data: string): boolean => {
	try {
		JSON.parse(data);
		return true;
	} catch {
		return false;
	}
};

const loadData = (
	storageKey: string,
	fallback: Recipe,
): Recipe => {
	const loadedString =
		localStorage.getItem(storageKey);

	if (loadedString === null) {
		return fallback;
	}

	if (!isValidJSON(loadedString)) {
		return fallback;
	}

	const jsonParsedString =
		JSON.parse(loadedString);
	const zodParsedString = recipeSchema.safeParse(
		jsonParsedString,
	);
	if (!zodParsedString.success) {
		return fallback;
	}

	const data = zodParsedString.data;
	const recipe = Recipe.fromLabel(data.label);
	if (recipe !== null) {
		return recipe;
	}
	return data;
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
	fallback: Recipe,
): {
	recipe: Recipe;
	setRecipe: (
		nextRecipe:
			| Recipe
			| ((prevRecipe: Recipe) => Recipe),
	) => void;
} => {
	const [recipe, setRecipe] = useState<Recipe>(
		loadData(storageKey, fallback),
	);

	useEffect(() => {
		saveData(storageKey, recipe);
	}, [recipe]);

	return {
		recipe,
		setRecipe,
	};
};
