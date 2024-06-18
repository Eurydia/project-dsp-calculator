import {
	Facility,
	Proliferator,
	Recipe,
	Sorter,
} from "@eurydos/dsp-item-registry";
import { openDB } from "idb";
import {
	DBv1,
	migrateDBv1,
} from "./migration/v1";

export const db = await openDB<DBv1>(
	"asset-db",
	1,
	{
		upgrade: async (db, prevVersion) => {
			if (prevVersion < 1) {
				migrateDBv1(db);
			}
			const fItems: Facility[] = await fetch(
				"https://eurydia.github.io/package-dsp-item-registry/facility.json",
			)
				.then((r) => r.json())
				.catch((err) => {
					console.warn(err);
					return [];
				});
			const fPutReqs = fItems.map((item) =>
				db.put("facilities", item),
			);
			await Promise.all(fPutReqs);

			const rItems: Recipe[] = await fetch(
				"https://eurydia.github.io/package-dsp-item-registry/recipe.json",
			)
				.then((r) => r.json())
				.catch((err) => {
					console.warn(err);
					return [];
				});
			const rPutReqs = rItems.map((item) =>
				db.put("recipes", item),
			);
			await Promise.all(rPutReqs);

			const sItems: Sorter[] = await fetch(
				"https://eurydia.github.io/package-dsp-item-registry/sorter.json",
			)
				.then((r) => r.json())
				.catch((err) => {
					console.warn(err);
					return [];
				});
			const sPutReqs = sItems.map((item) =>
				db.put("sorters", item),
			);
			await Promise.all(sPutReqs);

			const pItems: Proliferator[] = await fetch(
				"https://eurydia.github.io/package-dsp-item-registry/proliferator.json",
			)
				.then((r) => r.json())
				.catch((err) => {
					console.warn(err);
					return [];
				});
			const pPutReqs = pItems.map((item) =>
				db.put("proliferators", item),
			);
			await Promise.all(pPutReqs);
		},
	},
);
