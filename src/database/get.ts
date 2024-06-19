import { Facility } from "@eurydos/dsp-item-registry";
import { dbTx } from "~database/migrate";

export const getFacility = async (
	label: string,
): Promise<Facility | undefined> => {
	const db = await dbTx;
	const item = await db.get("facilities", label);
	return item;
};

export const getFacilityAll = async (): Promise<
	Facility[]
> => {
	const db = await dbTx;
	const items = await db.getAll("facilities");
	return items;
};

export const getRecipeWithType = async (
	rType: string,
) => {
	const db = await dbTx;
	const item = await db.getFromIndex(
		"recipes",
		"by-recipe-type",
		rType,
	);
	return item;
};

export const getRecipe = async (
	label: string,
) => {
	const db = await dbTx;
	const item = await db.get("recipes", label);
	return item;
};

export const getRecipeAll = async () => {
	const db = await dbTx;
	const item = await db.getAll("recipes");
	return item;
};

export const getProliferator = async (
	label: string,
) => {
	const db = await dbTx;
	const item = await db.get(
		"proliferators",
		label,
	);
	return item;
};
export const getProliferatorAll = async () => {
	const db = await dbTx;
	const item = await db.getAll("proliferators");
	return item;
};

export const getProliferatorWithMode = async (
	mode: string,
) => {
	const db = await dbTx;
	const item = await db.getFromIndex(
		"proliferators",
		"by-mode",
		mode,
	);
	return item;
};

export const getSorter = async (
	label: string,
) => {
	const db = await dbTx;
	const item = await db.get("sorters", label);
	return item;
};
