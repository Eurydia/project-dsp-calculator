import {
	FACILITY_REGISTRY,
	PROLIFERATOR_REGISTERY,
	RECIPE_REGISTRY,
	SORTER_REGISTRY,
} from "@eurydos/dsp-item-registry";
import { IDBPDatabase, openDB } from "idb";
import {
	DBv1,
	migrateDBv1,
} from "./migration/v1";

export const dbTx = openDB<DBv1>("asset-db", 1, {
	upgrade: async (db, prevVersion) => {
		if (prevVersion < 1) {
			migrateDBv1(db);
		}
		populateFacilityItems(db);
		populateRecipeItems(db);
		populateProliferatorItems(db);
		populateSorterItems(db);
	},
});

const populateFacilityItems = async (
	db: IDBPDatabase<DBv1>,
) => {
	const putReqs = Object.values(
		FACILITY_REGISTRY,
	).map((item) => db.put("facilities", item));
	await Promise.all(putReqs);
};

const populateRecipeItems = async (
	db: IDBPDatabase<DBv1>,
) => {
	const putReqs = Object.values(
		RECIPE_REGISTRY,
	).map((item) => db.put("recipes", item));
	await Promise.all(putReqs);
};

const populateSorterItems = async (
	db: IDBPDatabase<DBv1>,
) => {
	const putReqs = Object.values(
		SORTER_REGISTRY,
	).map((item) => db.put("sorters", item));
	await Promise.all(putReqs);
};

const populateProliferatorItems = async (
	db: IDBPDatabase<DBv1>,
) => {
	const putReqs = Object.values(
		PROLIFERATOR_REGISTERY,
	).map((item) => db.put("proliferators", item));
	await Promise.all(putReqs);
};
