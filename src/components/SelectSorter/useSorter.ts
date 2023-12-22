import {
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
} from "react";

import { Sorter } from "../../types";

const loadData = (storageKey: string): Sorter => {
	const label = localStorage.getItem(storageKey);

	if (label === null) {
		return Sorter.getRegisteredItems()[0];
	}

	return Sorter.fromLabel(label);
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
): {
	sorter: Sorter;
	setSorter: Dispatch<SetStateAction<Sorter>>;
} => {
	const [value, setValue] = useState(
		loadData(storageKey),
	);

	useEffect(() => {
		saveData(storageKey, value);
	}, [storageKey, value]);

	return {
		sorter: value,
		setSorter: setValue,
	};
};
