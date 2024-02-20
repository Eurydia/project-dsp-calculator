import { facilityFromLabel } from "assets/facility.mts";
import { RECIPE_DEFAULT_LOOKUP } from "assets/index.mts";
import { recipeFromLabel } from "assets/recipes/recipe.mts";
import { useContent } from "hooks/useContent";
import { useEffect } from "react";

export const useRecipe = (
	initValue: string,
	storageKey: string,
) => {
	const { content, setContent } = useContent(
		initValue,
		storageKey,
	);

	useEffect(() => {
		localStorage.setItem(
			storageKey,
			JSON.stringify(content),
		);
	}, [content, storageKey]);

	const setRecipeLabel = (label: string) => {
		const nextRecipe = recipeFromLabel(label);
		setContent(nextRecipe.label);
	};

	const updateRecipeLabel = (label: string) => {
		const nextFacility = facilityFromLabel(label);
		const nextRecipe = recipeFromLabel(
			RECIPE_DEFAULT_LOOKUP[
				nextFacility.recipeType
			],
		);
		setContent(nextRecipe.label);
	};

	return {
		recipeLabel: content,
		setRecipeLabel,
		updateRecipeLabel,
	};
};
