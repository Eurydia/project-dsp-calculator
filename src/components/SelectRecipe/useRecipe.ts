import {
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
} from "react";

import { Recipe } from "../../types";

const loadData = (
	storageKey: string,
	fallback: Recipe,
): Recipe => {
	const label = localStorage.getItem(storageKey);

	if (label === null) {
		return fallback;
	}

	const data = Recipe.fromLabel(label);

	if (data === null) {
		return fallback;
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
	value: Recipe;
	setValue: Dispatch<SetStateAction<Recipe>>;
} => {
	const [value, setValue] = useState(
		loadData(storageKey, fallback),
	);

	useEffect(() => {
		saveData(storageKey, value);
	}, [storageKey, value]);

	return {
		value,
		setValue,
	};
};
