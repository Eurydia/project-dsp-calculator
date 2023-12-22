import {
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
} from "react";
import { Sorter } from "../../types";

const loadData = (
	storageKey: string,
	fallback: Sorter,
): Sorter => {
	const savedData =
		localStorage.getItem(storageKey);

	if (savedData === null) {
		return fallback;
	}

	try {
		const data: Sorter = JSON.parse(savedData);
		return data;
	} catch (error) {
		return fallback;
	}
};

const saveData = (
	storageKey: string,
	data: Sorter,
): void => {
	localStorage.setItem(
		storageKey,
		Sorter.toJSON(data),
	);
};

export const useSorter = (
	storageKey: string,
	fallback: Sorter,
): {
	value: Sorter;
	setValue: Dispatch<SetStateAction<Sorter>>;
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
