import {
	prolifNameFromSprayCount,
	proliferatorFromLabel,
} from "./proliferator";

export * from "./facility";
export * from "./proliferator";
export * from "./recipe";
export * from "./sorter";

export const toIconURL = (option: string) => {
	const target = option
		.replaceAll(" ", "_")
		.toLowerCase();
	const href = `./images/${target}.webp`;
	return href;
};

export const prolifLabelToIcon = async (
	label: string,
) => {
	return toIconURL(
		prolifNameFromSprayCount(
			(await proliferatorFromLabel(label))
				.sprayCount,
		),
	);
};
