import {
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
} from "react";

import { Preferences } from "../../types";

const loadData = (
	storageKey: string,
	fallback: Preferences,
): Preferences => {
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
	data: Preferences,
): void => {
	localStorage.setItem(
		storageKey,
		JSON.stringify(data),
	);
};

export const usePreferences = (
	storageKey: string,
	defaultValue: Preferences,
): {
	preferences: Preferences;
	setPreferences: Dispatch<
		SetStateAction<Preferences>
	>;
} => {
	const [value, setValue] = useState<Preferences>(
		loadData(storageKey, defaultValue),
	);

	useEffect(() => {
		saveData(storageKey, value);
	}, [storageKey, value]);

	return {
		preferences: value,
		setPreferences: setValue,
	};
};
