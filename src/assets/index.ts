export * from "./facility";
export * from "./proliferator";
export * from "./recipe";
export * from "./sorter";

export const ingredientIconFromLabel = (
	label: string,
) => {
	const filename = `./images/${label}.webp`
		.replaceAll(" ", "_")
		.toLowerCase();
	return filename;
};
