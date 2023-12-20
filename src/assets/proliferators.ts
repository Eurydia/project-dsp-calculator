import {
	Proliferator,
	ProliferatorMode,
} from "../types";

const file = await fetch(
	"assets/proliferators.json",
);
const data: {
	label: string;
	mode: ProliferatorMode;
	workConsumptionMultiplier: number;
	productMultiplier: number;
	speedupMultiplier: number;
}[] = await file.json();

export const AssetProliferators: Proliferator[] =
	data.map(
		({
			label,
			mode,
			workConsumptionMultiplier,
			productMultiplier,
			speedupMultiplier,
		}) =>
			Proliferator.create(
				label,
				mode,
				workConsumptionMultiplier,
				productMultiplier,
				speedupMultiplier,
			),
	);
