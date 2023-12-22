import {
	useEffect,
	useState,
	SetStateAction,
	Dispatch,
} from "react";

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

	const data = JSON.parse(loadedString);

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
	setValue: Dispatch<SetStateAction<number>>;
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
	}, [storageKey, value]);

	return {
		value,
		setValue,
	};
};
