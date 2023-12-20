import { useEffect, useState } from "react";
import { z } from "zod";

import { Sorter } from "../../types";

const sorterSchema = z.object({
	label: z.string(),
	workConsumptionMW: z.number(),
	idleConsumptionMW: z.number(),
});

const isValidJSON = (data: string): boolean => {
	try {
		JSON.parse(data);
		return true;
	} catch {
		return false;
	}
};

const loadData = (
	storageKey: string,
	fallback: Sorter,
): Sorter => {
	const loadedString =
		localStorage.getItem(storageKey);

	if (loadedString === null) {
		return fallback;
	}

	if (!isValidJSON(loadedString)) {
		return fallback;
	}

	const jsonParsedString =
		JSON.parse(loadedString);

	const zodParsedString = sorterSchema.safeParse(
		jsonParsedString,
	);
	if (!zodParsedString.success) {
		return fallback;
	}

	const data = zodParsedString.data;
	const sorter = Sorter.fromLabel(data.label);
	if (sorter !== null) {
		return sorter;
	}

	return data;
};

const saveData = (
	storageKey: string,
	sorter: Sorter,
): void => {
	localStorage.setItem(
		storageKey,
		Sorter.toJSON(sorter),
	);
};

export const useSorter = (
	storageKey: string,
	fallback: Sorter,
): {
	sorter: Sorter;
	setSorter: (
		nextSorter:
			| Sorter
			| ((prevSorter: Sorter) => Sorter),
	) => void;
} => {
	const [value, setValue] = useState<Sorter>(
		() => {
			return loadData(storageKey, fallback);
		},
	);

	useEffect(() => {
		saveData(storageKey, value);
	}, [value]);

	return {
		sorter: value,
		setSorter: setValue,
	};
};
