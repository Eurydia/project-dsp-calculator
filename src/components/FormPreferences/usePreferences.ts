import {
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
} from "react";

import { Preferences } from "../../types";

const isValidJSON = (data: string) => {
	try {
		JSON.parse(data);
		return true;
	} catch {
		return false;
	}
};

const loadData = (
	storageKey: string,
	fallback: Preferences,
): Preferences => {
	const loadedString: string | null =
		localStorage.getItem(storageKey);
	if (loadedString === null) {
		return fallback;
	}

	if (!isValidJSON(loadedString)) {
		return fallback;
	}

	return JSON.parse(loadedString);
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
