import { useEffect } from "react";
import { facilityFromLabel } from "~assets/facility";
import {
	RECIPE_DEFAULT_LOOKUP,
	recipeFromLabel,
} from "~assets/recipe";
import { useContent } from "./useContent";

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

	const setRecipeLabel = async (
		label: string,
	) => {
		const nextRecipe = await recipeFromLabel(
			label,
		);
		setContent(nextRecipe.label);
	};

	const updateRecipeLabel = async (
		label: string,
	) => {
		const nextFacility = await facilityFromLabel(
			label,
		);
		const nextRecipe = await recipeFromLabel(
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
