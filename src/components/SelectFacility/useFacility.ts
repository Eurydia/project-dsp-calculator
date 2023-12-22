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
	const label = localStorage.getItem(storageKey);

	if (label === null) {
		return fallback;
	}

	const data = Facility.fromLabel(label);
	if (data === null) {
		return fallback;
	}

	return data;
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
