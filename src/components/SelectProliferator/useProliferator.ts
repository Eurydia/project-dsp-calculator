import { useEffect, useState } from "react";
import { z } from "zod";

import {
	Proliferator,
	ProliferatorMode,
} from "../../types";

const proliferatorSchema = z.object({
	label: z.string(),
	mode: z.nativeEnum(ProliferatorMode),
	workConsumptionMultiplier: z.number(),
	productMultiplier: z.number(),
	speedupMultiplier: z.number(),
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
	fallack: Proliferator,
): Proliferator => {
	const loadedString =
		localStorage.getItem(storageKey);

	if (loadedString === null) {
		return fallack;
	}

	if (!isValidJSON(loadedString)) {
		return fallack;
	}

	const jsonParsedString =
		JSON.parse(loadedString);

	const zodParsedString =
		proliferatorSchema.safeParse(
			jsonParsedString,
		);

	if (!zodParsedString.success) {
		return fallack;
	}

	const data = zodParsedString.data;
	const proliferator = Proliferator.fromLabel(
		data.label,
	);
	if (proliferator !== null) {
		return proliferator;
	}

	return data;
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
	fallback: Proliferator,
): {
	proliferator: Proliferator;
	setProliferator: (
		nextProliferator:
			| Proliferator
			| ((
					prevProliferator: Proliferator,
			  ) => Proliferator),
	) => void;
} => {
	const [value, setValue] =
		useState<Proliferator>(
			loadData(storageKey, fallback),
		);

	useEffect(() => {
		saveData(storageKey, value);
	}, [value]);

	return {
		proliferator: value,
		setProliferator: setValue,
	};
};
