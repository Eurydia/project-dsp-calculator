import {
	Facility,
	Proliferator,
	Recipe,
	Sorter,
} from "@eurydos/dsp-item-registry";
import { DBSchema, IDBPDatabase } from "idb";

export interface DBv1 extends DBSchema {
	facilities: {
		key: string;
		value: Facility;
	};
	recipes: {
		key: string;
		value: Recipe;
		indexes: { "by-recipe-type": string };
	};
	sorters: {
		key: string;
		value: Sorter;
	};
	proliferators: {
		key: string;
		value: Proliferator;
		indexes: { "by-mode": string };
	};
}

export const migrateDBv1 = async (
	db: IDBPDatabase<DBv1>,
) => {
	// MIGRATE FACILITIES
	db.createObjectStore("facilities", {
		keyPath: "label",
		autoIncrement: false,
	});
	// MIGRATE RECIPES
	const rStore = db.createObjectStore("recipes", {
		keyPath: "label",
		autoIncrement: false,
	});
	rStore.createIndex(
		"by-recipe-type",
		"recipeType",
		{
			multiEntry: true,
			unique: false,
		},
	);
	// MIGRATE SORTERS
	db.createObjectStore("sorters", {
		keyPath: "label",
		autoIncrement: false,
	});
	// MIGRATE PROLIFERATORS
	const pStore = db.createObjectStore(
		"proliferators",
		{
			keyPath: "label",
			autoIncrement: false,
		},
	);
	pStore.createIndex("by-mode", "mode", {
		multiEntry: true,
		unique: false,
	});
};
