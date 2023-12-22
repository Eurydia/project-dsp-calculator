import {
	Proliferator,
	ProliferatorMode,
} from "../types";

export const AssetProliferators: Proliferator[] =
	[
		Proliferator.create(
			"None",
			ProliferatorMode.PRODUCTION_SPEEDUP,
			1,
			1,
			1,
		),
	];

export const prepapreAssetProliferators =
	async () => {
		const proliferators = await fetch(
			"public/assets/proliferators.json",
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

		for (const proliferator of proliferators) {
			Proliferator.register(proliferator);
		}

		// AssetProliferators.push(...proliferators);
	};
