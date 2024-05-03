import {
	Facility,
	Proliferator,
	Recipe,
} from "@eurydos/dsp-item-registry";
import {
	AbcRounded,
	AddRounded,
	BoltRounded,
	CategoryRounded,
	DataSaverOffRounded,
	FactoryRounded,
	RemoveRounded,
	SpeedRounded,
	UsbRounded,
} from "@mui/icons-material";
import { formatNumber } from "~core/formatting";
import { InfoDefinition } from "~types/generic";

export const FACILITY_INFO_DEFINITIONS: InfoDefinition<Facility>[] =
	[
		{
			icon: <AbcRounded color="secondary" />,
			render: (facility: Facility) =>
				facility.label,
			label: "Name",
		},
		{
			icon: <CategoryRounded color="secondary" />,
			render: (facility: Facility) =>
				facility.recipeType,
			label: "Category",
		},
		{
			icon: <SpeedRounded color="secondary" />,
			render: (facility: Facility) =>
				`${formatNumber(
					facility.cycleMultiplier * 100,
				)}%`,
			label: "Cycle speed",
		},
		{
			icon: <UsbRounded color="secondary" />,
			render: (facility: Facility) =>
				facility.connectionCount,
			label: "Sorter connections",
		},
		{
			icon: <BoltRounded color="secondary" />,
			render: (facility: Facility) =>
				`${formatNumber(
					facility.workConsumptionMW,
				)} MW`,
			label: "Work comsumption",
		},
		{
			icon: <BoltRounded color="secondary" />,
			render: (facility: Facility) =>
				`${formatNumber(
					facility.idleConsumptionMW,
				)} MW`,
			label: "Idle comsumption",
		},
	];

export const PROLIF_INFO_DEFINITION: InfoDefinition<Proliferator>[] =
	[
		{
			icon: <SpeedRounded color="secondary" />,
			render: (prolif: Proliferator) =>
				`${formatNumber(
					(prolif.cycleMultiplier - 1) * 100,
				)}%`,
			label: "Bonus cycle speed",
		},
		{
			icon: <SpeedRounded color="secondary" />,
			render: (prolif: Proliferator) =>
				`${formatNumber(
					(prolif.productMultiplier - 1) * 100,
				)}%`,
			label: "Bonus products per cycle",
		},
		{
			icon: <BoltRounded color="secondary" />,
			render: (prolif: Proliferator) =>
				`${formatNumber(
					(prolif.workConsumptionMultiplier - 1) *
						100,
				)}%`,
			label: "Additional work consumption",
		},
	];

export const RECIPE_INFO_DEFINITION: InfoDefinition<Recipe>[] =
	[
		{
			icon: <SpeedRounded color="secondary" />,
			render: (recipe: Recipe) =>
				`${formatNumber(
					recipe.cycleTimeSecond,
				)} s`,
			label: "Cycle time",
		},
		{
			icon: (
				<DataSaverOffRounded color="secondary" />
			),
			render: (recipe: Recipe) =>
				recipe.speedupOnly ? "No" : "Yes",
			label: "Extra products bonus",
		},
		{
			icon: <RemoveRounded color="secondary" />,
			render: (recipe: Recipe) =>
				Object.entries(recipe.materialRecord).map(
					([label, ratio]) => `${ratio} ${label}`,
				),
			label: "Materials",
		},
		{
			icon: <AddRounded color="secondary" />,
			render: (recipe: Recipe) =>
				Object.entries(recipe.productRecord).map(
					([label, ratio]) => `${ratio} ${label}`,
				),
			label: "Products",
		},
	];

export const LAYOUT_INFO_DEFINITION: InfoDefinition<number>[] =
	[
		{
			icon: <FactoryRounded color="secondary" />,
			render: (x: number) => x,
			label: "Facilities per array",
		},
		{
			icon: <FactoryRounded color="secondary" />,
			render: (x: number) => x,
			label: "Arrays needed",
		},
		{
			icon: <FactoryRounded color="secondary" />,
			render: (x: number) => x,
			label: "Total facilities needed",
		},
		{
			icon: <FactoryRounded color="secondary" />,
			render: (x: number) => x,
			label: "Leftover facilities",
		},
	];
