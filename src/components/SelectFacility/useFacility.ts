import {
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
} from "react";

import { Facility } from "../../types";

const loadData = (
	storageKey: string,
): Facility => {
	const label: string | null =
		localStorage.getItem(storageKey);

	if (label === null) {
		return Facility.getRegisteredItems()[0];
	}

	return Facility.fromLabel(label);
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
): {
	facility: Facility;
	setFacility: Dispatch<SetStateAction<Facility>>;
} => {
	const [value, setValue] = useState<Facility>(
		loadData(storageKey),
	);

	useEffect(() => {
		saveData(storageKey, value);
	}, [storageKey, value]);

	return {
		facility: value,
		setFacility: setValue,
	};
};
