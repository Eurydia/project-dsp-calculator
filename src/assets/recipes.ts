import { Recipe, RecipeType } from "../types";

export const AssetRecipes: Recipe[] = [
	Recipe.create(
		"Copper Ingot",
		1,
		{
			"Copper Ore": 1,
		},
		{
			"Copper Ingot": 1,
		},
		RecipeType.SMELTING_FACILITY,
		false,
	),
];

export const prepapreAssetRecipes = async () => {
	const reicpeTypes: string[] = [
		"assembler",
		"chemical",
		"particle",
		"refining",
		"research",
		"smelting",
	];

	for (const recipeType of reicpeTypes) {
		const recipes: Recipe[] = await fetch(
			`public/assets/recipes/${recipeType}.json`,
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
		for (const recipe of recipes) {
			Recipe.register(recipe);
		}

		// AssetRecipes.push(...recipes);
	}

	// AssetRecipes.sort((a, b) => {
	// 	if (a.label < b.label) {
	// 		return -1;
	// 	}

	// 	if (a.label > b.label) {
	// 		return 1;
	// 	}

	// 	return 0;
	// });
};
