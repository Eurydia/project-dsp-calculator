import { Sorter } from "../types";

export const AssetSorters: Sorter[] = [
	Sorter.create("Sorter Mk.I", 0.018, 0.009),
];

export const prepareAssetSorters = async () => {
	const sorters: Sorter[] = await fetch(
		"public/assets/sorters.json",
		{
			cache: "force-cache",
		},
	).then((response) => {
		try {
			return response.json();
		} catch (e) {
			return [];
		}
	});

	for (const sorter of sorters) {
		Sorter.register(sorter);
	}

	// AssetSorters.push(...sorters);
};
