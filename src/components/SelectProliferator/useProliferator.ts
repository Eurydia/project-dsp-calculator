import {
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
} from "react";

import { Proliferator } from "../../types";

const loadData = (
	storageKey: string,
	fallback: Proliferator,
): Proliferator => {
	const label = localStorage.getItem(storageKey);

	if (label === null) {
		return fallback;
	}

	const data = Proliferator.fromLabel(label);
	if (data === null) {
		return fallback;
	}

	return data;
};

const saveData = (
	storageKey: string,
	data: Proliferator,
): void => {
	localStorage.setItem(
		storageKey,
		Proliferator.toJSON(data),
	);
};

export const useProliferator = (
	storageKey: string,
	fallback: Proliferator,
): {
	value: Proliferator;
	setValue: Dispatch<
		SetStateAction<Proliferator>
	>;
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
