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
	const savedData =
		localStorage.getItem(storageKey);

	if (savedData === null) {
		return fallback;
	}
	try {
		const data = JSON.parse(savedData);
		return data;
	} catch (error) {
		return fallback;
	}
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
