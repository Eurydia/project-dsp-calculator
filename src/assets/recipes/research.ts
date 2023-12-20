import {
	Recipe,
	RecipeEnum,
	ItemEnum,
} from "../../types";
const file = await fetch(
	"assets/recipes/research.json",
);

const data: {
	label: string;
	cycleTime: number;
	materials: { [K: string]: number };
	products: { [K: string]: number };
	speedupOnly: boolean;
}[] = await file.json();

export const RESEARCH_RECIPES: Recipe[] =
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
				RecipeEnum.RESEARCH_FACILITY,
				speedupOnly,
			),
	);
