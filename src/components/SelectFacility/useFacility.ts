import { useEffect, useState } from "react";
import { z } from "zod";

import {
	Facility,
	RecipeEnum,
} from "../../types";

const facilitySchema = z.object({
	label: z.string(),
	speedupMultiplier: z.number(),
	workConsumptionMW: z.number(),
	idleConsumptionMW: z.number(),
	recipeType: z.nativeEnum(RecipeEnum),
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
	fallback: Facility,
): Facility => {
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
		facilitySchema.safeParse(jsonParsedString);

	if (!zodParsedString.success) {
		return fallback;
	}

	const data = zodParsedString.data;
	const facility: Facility | null =
		Facility.fromLabel(data.label);
	if (facility !== null) {
		return facility;
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
	facility: Facility;
	setFacility: (
		nextFacility:
			| Facility
			| ((prevFacility: Facility) => Facility),
	) => void;
} => {
	const [value, setValue] = useState<Facility>(
		loadData(storageKey, fallback),
	);

	useEffect(() => {
		saveData(storageKey, value);
	}, [value]);

	return {
		facility: value,
		setFacility: setValue,
	};
};
