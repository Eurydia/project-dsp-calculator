import {
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
} from "react";

import { Proliferator } from "../../types";

const loadData = (
	storageKey: string,
): Proliferator => {
	const label = localStorage.getItem(storageKey);

	if (label === null) {
		return Proliferator.getRegisteredItems()[0];
	}

	return Proliferator.fromLabel(label);
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
): {
	proliferator: Proliferator;
	setProliferator: Dispatch<
		SetStateAction<Proliferator>
	>;
} => {
	const [value, setValue] =
		useState<Proliferator>(loadData(storageKey));

	useEffect(() => {
		saveData(storageKey, value);
	}, [storageKey, value]);

	return {
		proliferator: value,
		setProliferator: setValue,
	};
};
