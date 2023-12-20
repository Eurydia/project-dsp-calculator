import { useEffect, useState } from "react";
import { z } from "zod";

import { Preferences } from "../../types";

const preferencesSchema = z.object({
	preferEven: z.boolean(),
	keepBeltUnderMaxFlow: z.boolean(),
	proliferateProducts: z.boolean(),
});

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

	const jsonParsedString =
		JSON.parse(loadedString);
	const zodParsedString =
		preferencesSchema.safeParse(jsonParsedString);

	if (!zodParsedString.success) {
		return fallback;
	}

	const { data } = zodParsedString;

	return data;
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
	setPreferences: (
		nextPreferences:
			| Preferences
			| ((
					prevPreferences: Preferences,
			  ) => Preferences),
	) => void;
} => {
	const [value, setValue] = useState<Preferences>(
		loadData(storageKey, defaultValue),
	);

	useEffect(() => {
		saveData(storageKey, value);
	}, [value]);

	return {
		preferences: value,
		setPreferences: setValue,
	};
};
