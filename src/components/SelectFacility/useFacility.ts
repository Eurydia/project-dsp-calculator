import {
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
} from "react";

import { Facility } from "../../types";

const loadData = (
	storageKey: string,
	fallback: Facility,
): Facility => {
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
	data: Facility,
): void => {
	localStorage.setItem(
		storageKey,
		Facility.toJSON(data),
	);
};

export const useFacility = (
	storageKey: string,
	fallback: Facility,
): {
	value: Facility;
	setValue: Dispatch<SetStateAction<Facility>>;
} => {
	const [value, setValue] = useState<Facility>(
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
