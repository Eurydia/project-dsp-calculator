import { useEffect, useState } from "react";
import { z } from "zod";

const numberSchema = z.number();

const isValidJSON = (data: string): boolean => {
	try {
		JSON.parse(data);
		return true;
	} catch {
		return false;
	}
};

const loadNumber = (
	storageKey: string,
	minValue: number,
	maxValue: number,
): number => {
	const loadedString: string | null =
		localStorage.getItem(storageKey);

	if (loadedString === null) {
		return minValue;
	}

	if (!isValidJSON(loadedString)) {
		return minValue;
	}

	const jsonParsedString =
		JSON.parse(loadedString);
	const zodParsedString = numberSchema.safeParse(
		Number(jsonParsedString),
	);
	if (!zodParsedString.success) {
		return minValue;
	}

	const data = zodParsedString.data;

	if (data > maxValue) {
		return maxValue;
	}

	if (data < minValue) {
		return minValue;
	}

	return data;
};

const saveNumber = (
	storageKey: string,
	value: number,
): void => {
	localStorage.setItem(
		storageKey,
		JSON.stringify(value),
	);
};

export const useNumber = (
	storageKey: string,
	minValue: number = 0,
	maxValue: number = Number.MAX_SAFE_INTEGER - 1,
): {
	value: number;
	setValue: (nextValue: number) => void;
} => {
	const [value, setValue] = useState(
		(): number => {
			return loadNumber(
				storageKey,
				minValue,
				maxValue,
			);
		},
	);

	useEffect(() => {
		saveNumber(storageKey, value);
	}, [value]);

	return {
		value,
		setValue,
	};
};
