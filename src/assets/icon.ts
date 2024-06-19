import { Proliferator } from "@eurydos/dsp-item-registry";

export const toIconURL = (option: string) => {
	const target = option
		.replaceAll(" ", "_")
		.toLowerCase();
	const href = `./images/${target}.webp`;
	return href;
};

export const proliferatorToIconURL = (
	item: Proliferator,
) => {
	switch (item.sprayCount) {
		case 12:
			return `./images/proliferator_mk.i.webp`;
		case 24:
			return `./images/proliferator_mk.ii.webp`;
		case 60:
			return `./images/proliferator_mk.iii.webp`;
	}
	return "./images/none.webp";
};
