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
	const label = localStorage.getItem(storageKey);

	if (label === null) {
		return fallback;
	}

	const data = Sorter.fromLabel(label);
	if (data === null) {
		return fallback;
	}

	return data;
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
