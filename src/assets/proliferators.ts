import {
	Proliferator,
	ProliferatorMode,
} from "../types";

export const PROLIFERATOR_DATA_LIST: Proliferator[] =
	[
		Proliferator.create(
			"None",
			ProliferatorMode.PRODUCTION_SPEEDUP,
			1,
			1,
			1,
		),
		Proliferator.create(
			"Cycle Speed +25%",
			ProliferatorMode.PRODUCTION_SPEEDUP,
			1.3,
			1,
			1.25,
		),
		Proliferator.create(
			"Cycle Speed +50%",
			ProliferatorMode.PRODUCTION_SPEEDUP,
			1.7,
			1,
			1.5,
		),
		Proliferator.create(
			"Cycle Speed +100%",
			ProliferatorMode.PRODUCTION_SPEEDUP,
			2.5,
			1,
			2,
		),
		Proliferator.create(
			"Products +12.5%",
			ProliferatorMode.EXTRA_PRODUCTS,
			1.3,
			1.125,
			1,
		),
		Proliferator.create(
			"Products +20%",
			ProliferatorMode.EXTRA_PRODUCTS,
			1.7,
			1.2,
			1,
		),
		Proliferator.create(
			"Products +25%",
			ProliferatorMode.EXTRA_PRODUCTS,
			2.5,
			1.25,
			1,
		),
	];
