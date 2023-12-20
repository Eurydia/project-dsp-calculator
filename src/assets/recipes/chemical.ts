import { Recipe, RecipeEnum } from "../../types";

const file = await fetch(
	"assets/recipes/chemical.json",
);

const data: {
	label: string;
	cycleTime: number;
	materials: { [K: string]: number };
	products: { [K: string]: number };
	speedupOnly: boolean;
}[] = await file.json();

export const CHEMICAL_RECIPES: Recipe[] =
	data.map(
		({
			label,
			cycleTime,
			materials,
			products,
			speedupOnly,
		}) =>
			Recipe.create(
				label,
				cycleTime,
				materials,
				products,
				RecipeEnum.CHEMICAL_FACILITY,
				speedupOnly,
			),
	);
