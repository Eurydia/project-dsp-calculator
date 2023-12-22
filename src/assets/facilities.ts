import { Facility, RecipeType } from "../types";

export const AssetFacilities: Facility[] = [
	Facility.create(
		"Arc Smelter",
		1,
		0.36,
		0.012,
		RecipeType.SMELTING_FACILITY,
	),
];

export const prepareAssetFacilities =
	async () => {
		const facilities = await fetch(
			"public/assets/facilities.json",
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

		for (const facility of facilities) {
			Facility.register(facility);
		}

		// AssetFacilities.push(...facilities);
	};
