import {
	FC,
	Fragment,
	useMemo,
	useState,
} from "react";
import {
	Stack,
	Typography,
	Paper,
} from "@mui/material";
import {
	AbcRounded,
	AddRounded,
	Battery80Sharp,
	BoltRounded,
	CategoryRounded,
	DataSaverOffRounded,
	FactoryRounded,
	RemoveRounded,
	SpeedRounded,
	UsbRounded,
} from "@mui/icons-material";

import { facilityFromLabel } from "assets/facility.mts";
import {
	RECIPE_REGISTRY,
	recipeFromLabel,
} from "assets/recipes/recipe.mts";
import {
	ProliferatorMode,
	proliferatorFromLabel,
} from "assets/proliferator.mts";

import {
	getDemandPerMinutePerFacility,
	getFacilityPerArrayCount,
	getFacilityNeededCount,
	getIdleConsumptionPerFacility,
	getProductionPerMinutePerFacility,
	getWorkConsumptionPerFacility,
} from "../../../core/solver";

import { ItemFlowTable } from "components/EditorMainResultTable";
import { PowerConsumptionTable } from "components/EditorPowerResultTable";
import { EditorConfig } from "components/EditorConfig";

import { formatNumber } from "core/formatLocaleNumber";
import { InfoList } from "components/InfoCard";

import {
	safeParseClamp,
	loadStorage,
	getProlifLabel,
} from "./helper";
import { EditorLayout } from "./EditorLayout";
import { useContent } from "./useContent";
import { useRecord } from "./useRecord";

export const Editor: FC = () => {
	const {
		content: sorters,
		setContent: setSorters,
	} = useRecord(
		{
			"Sorter Mk.I": "0",
			"Sorter Mk.II": "0",
			"Sorter Mk.III": "0",
			"Pile Sorter": "0",
		},
		"sorters",
	);
	const {
		content: flowrates,
		setContent: setFlowrates,
	} = useRecord({}, "flowrates");
	const {
		content: desiredProducts,
		setContent: setDesiredProduction,
	} = useRecord({}, "desiredProduction");
	const {
		content: sprayCount,
		setContent: setSprayCount,
	} = useContent("0", "sprayCount");
	const [facility, setFacility] = useState(
		loadStorage(
			"activeFacility",
			facilityFromLabel,
			facilityFromLabel("Arc Smelter"),
		),
	);
	const [recipe, setRecipe] = useState(
		loadStorage(
			"activeRecipe",
			recipeFromLabel,
			recipeFromLabel("Copper Ingot"),
		),
	);
	const [prolif, setProlif] = useState(
		loadStorage(
			"activeProlif",
			proliferatorFromLabel,
			proliferatorFromLabel("None"),
		),
	);

	const handleFacilityChange = (
		label: string,
	) => {
		const nextFacility = facilityFromLabel(label);
		setFacility(nextFacility);
		localStorage.setItem(
			"activeFacility",
			JSON.stringify(nextFacility.label),
		);

		if (
			recipe.recipeType ===
			nextFacility.recipeType
		) {
			return;
		}

		let nextRecipeLabel = "Uh oh";
		for (const registeredRecipe of Object.values(
			RECIPE_REGISTRY,
		)) {
			if (
				registeredRecipe.recipeType ===
				nextFacility.recipeType
			) {
				nextRecipeLabel = registeredRecipe.label;
				break;
			}
		}
		handleRecipeChange(nextRecipeLabel);
	};

	const handleRecipeChange = (label: string) => {
		const nextRecipe = recipeFromLabel(label);
		setRecipe(nextRecipe);
		localStorage.setItem(
			"activeRecipe",
			JSON.stringify(nextRecipe.label),
		);

		if (
			nextRecipe.speedupOnly &&
			prolif.mode ===
				ProliferatorMode.EXTRA_PRODUCTS
		) {
			handleProlifChange("None");
		}

		setDesiredProduction((prev) => {
			const next: Record<string, string> = {};
			for (const label of Object.keys(
				nextRecipe.productRecord,
			)) {
				next[label] = prev[label] ?? "0";
			}
			return next;
		});

		setFlowrates(() => {
			const next: Record<string, string> = {};
			const labels = [
				...Object.keys(nextRecipe.materialRecord),
				...Object.keys(nextRecipe.productRecord),
			];
			for (const label of labels) {
				next[label] = "";
			}
			return next;
		});
	};

	const handleProlifChange = (label: string) => {
		const nextProlif =
			proliferatorFromLabel(label);
		setSprayCount(
			nextProlif.sprayCount.toString(),
		);
		setProlif(nextProlif);
		localStorage.setItem(
			"activeProlif",
			JSON.stringify(nextProlif.label),
		);
	};

	const handleDesiredProductChange = (
		label: string,
		value: string,
	) => {
		setDesiredProduction((prev) => {
			const next = { ...prev };
			if (value === "") {
				next[label] = "";
				return next;
			}
			const nextValue = safeParseClamp(
				value,
				0,
				1e7,
			);
			next[label] = nextValue.toString();
			return next;
		});
	};

	const handleFlowrateChange = (
		label: string,
		value: string,
	) => {
		setFlowrates((prev) => {
			const next = { ...prev };
			if (value === "") {
				next[label] = "";
				return next;
			}

			let leftover =
				facility.connectionCount * 7200;
			for (const entry of Object.entries(next)) {
				const [prevLabel, prevValue] = entry;
				if (prevLabel === label) {
					continue;
				}
				leftover -= safeParseClamp(
					prevValue,
					7200,
					leftover,
				);
			}
			const nextValue = safeParseClamp(
				value,
				0,
				leftover,
			);
			next[label] = nextValue.toString();
			return next;
		});
	};

	const handleSorterChange = (
		label: string,
		value: string,
	) => {
		setSorters((prev) => {
			if (value === "") {
				prev[label] = "";
				return prev;
			}
			let leftover = facility.connectionCount;
			for (const entry of Object.entries(prev)) {
				const [prevLabel, prevValue] = entry;
				if (prevLabel === label) {
					continue;
				}
				leftover -= safeParseClamp(
					prevValue,
					0,
					leftover,
				);
			}
			const nextValue = safeParseClamp(
				value,
				0,
				leftover,
			);
			prev[label] = nextValue.toString();
			return prev;
		});
	};
	const prolifLabel = getProlifLabel(
		prolif.sprayCount,
	);
	const computedCycleSpeed =
		facility.cycleMultiplier *
		prolif.cycleMultiplier;
	const facilityNeededCount = useMemo(
		() =>
			getFacilityNeededCount(
				recipe.cycleTimeSecond,
				computedCycleSpeed,
				prolif.productMultiplier,
				recipe.productRecord,
				desiredProducts,
			),
		[
			recipe.cycleTimeSecond,
			computedCycleSpeed,
			prolif.productMultiplier,
			recipe.productRecord,
			desiredProducts,
		],
	);

	const facilityPerArrayCount = useMemo(
		() =>
			getFacilityPerArrayCount(
				recipe.cycleTimeSecond,
				computedCycleSpeed,
				prolif.productMultiplier,
				flowrates,
				recipe.materialRecord,
				recipe.productRecord,
			),
		[
			recipe.cycleTimeSecond,
			computedCycleSpeed,
			prolif.productMultiplier,
			flowrates,
			recipe.materialRecord,
			recipe.productRecord,
		],
	);

	const materialPerMinutePerFacility = useMemo(
		() =>
			getDemandPerMinutePerFacility(
				recipe.cycleTimeSecond,
				computedCycleSpeed,
				prolif.productMultiplier,
				recipe.materialRecord,
				recipe.productRecord,
				prolifLabel,
				sprayCount,
			),
		[
			recipe.cycleTimeSecond,
			computedCycleSpeed,
			prolif.productMultiplier,
			recipe.materialRecord,
			recipe.productRecord,
			prolifLabel,
			sprayCount,
		],
	);

	const productPerMinutePerFacility = useMemo(
		() =>
			getProductionPerMinutePerFacility(
				recipe.cycleTimeSecond,
				computedCycleSpeed,
				prolif.productMultiplier,
				recipe.productRecord,
			),
		[
			recipe.cycleTimeSecond,
			computedCycleSpeed,
			prolif.productMultiplier,
			recipe.productRecord,
		],
	);

	let arrayNeededCount = 0;
	if (facilityPerArrayCount > 0) {
		arrayNeededCount = Math.floor(
			facilityNeededCount / facilityPerArrayCount,
		);
	}

	const facilityLeftoverCount =
		facilityNeededCount -
		arrayNeededCount * facilityPerArrayCount;

	const workConsumptionPerFacility =
		getWorkConsumptionPerFacility(
			facility.workConsumptionMW,
			prolif.workConsumptionMultiplier,
			sorters,
		);

	const idleConsumptionPerFacility =
		getIdleConsumptionPerFacility(
			facility.idleConsumptionMW,
			sorters,
		);

	return (
		<EditorLayout
			slotSide={
				<EditorConfig
					speedupOnly={recipe.speedupOnly}
					recipeType={recipe.recipeType}
					connectionCount={
						facility.connectionCount
					}
					desiredProducts={desiredProducts}
					onDesiredProductChange={
						handleDesiredProductChange
					}
					facility={facility.label}
					onFacilityChange={handleFacilityChange}
					recipe={recipe.label}
					onRecipeChange={handleRecipeChange}
					flowrates={flowrates}
					onFlowrateChange={handleFlowrateChange}
					prolif={prolif.label}
					onProlifChange={handleProlifChange}
					prolifSpray={sprayCount}
					onProlifSprayChange={setSprayCount}
					sorters={sorters}
					onSorterChange={handleSorterChange}
				/>
			}
			slotMain={
				<Stack spacing={2}>
					<Paper
						square
						elevation={2}
						sx={{
							padding: 2,
						}}
					>
						<ItemFlowTable
							facilityNeededCount={
								facilityNeededCount
							}
							facilityPerArrayCount={
								facilityPerArrayCount
							}
							materialFlowPerMinutePerFacility={
								materialPerMinutePerFacility
							}
							productFlowPerMinutePerFacility={
								productPerMinutePerFacility
							}
						/>
					</Paper>
					<Paper
						square
						elevation={2}
						sx={{
							padding: 2,
						}}
					>
						<PowerConsumptionTable
							facilityNeededCount={
								facilityNeededCount
							}
							facilityPerArrayCount={
								facilityPerArrayCount
							}
							idleConsumptionPerFacility={
								idleConsumptionPerFacility
							}
							workConsumptionPerFacility={
								workConsumptionPerFacility
							}
						/>
					</Paper>
				</Stack>
			}
			slotColumnLeft={
				<Fragment>
					<InfoList
						subheader="Layout"
						info={[
							{
								icon: <FactoryRounded />,
								primary: facilityPerArrayCount,
								secondary: "Facilities per array",
							},
							{
								icon: <FactoryRounded />,
								primary: arrayNeededCount,
								secondary: "Arrays needed",
							},
							{
								icon: <FactoryRounded />,
								primary: facilityNeededCount,
								secondary:
									"Total facilities needed",
							},
							{
								icon: <FactoryRounded />,
								primary: facilityLeftoverCount,
								secondary: "Leftover facilities",
							},
						]}
					/>
					<InfoList
						subheader="Facility information"
						info={[
							{
								icon: <AbcRounded />,
								primary: facility.label,
								secondary: "Name",
							},
							{
								icon: <CategoryRounded />,
								primary: facility.recipeType,
								secondary: "Category",
							},
							{
								icon: <SpeedRounded />,
								primary: `${formatNumber(
									facility.cycleMultiplier * 100,
								)}%`,
								secondary: "Cycle speed",
							},
							{
								icon: <UsbRounded />,
								primary: facility.connectionCount,
								secondary: "Sorter connections",
							},
							{
								icon: <BoltRounded />,
								primary: `${formatNumber(
									facility.workConsumptionMW,
								)} MW`,
								secondary: "Work comsumption",
							},
							{
								icon: <BoltRounded />,
								primary: `${formatNumber(
									facility.idleConsumptionMW,
								)} MW`,
								secondary: "Idle comsumption",
							},
						]}
					/>
				</Fragment>
			}
			slotColumnRight={
				<Fragment>
					<InfoList
						subheader="Recipe information"
						info={[
							{
								icon: <SpeedRounded />,
								primary: `${formatNumber(
									recipe.cycleTimeSecond,
								)} s`,
								secondary: "Cycle time",
							},
							{
								icon: <DataSaverOffRounded />,
								primary: recipe.speedupOnly
									? "No"
									: "Yes",
								secondary: "Extra products bonus",
							},
							{
								icon: <RemoveRounded />,
								primary: Object.entries(
									recipe.materialRecord,
								).map(([label, ratio]) => (
									<Typography
										key={label}
										fontSize="inherit"
									>
										{`${ratio} ${label}`}
									</Typography>
								)),
								secondary: "Materials",
							},
							{
								icon: <AddRounded />,
								primary: Object.entries(
									recipe.productRecord,
								).map(([label, ratio]) => (
									<Typography
										key={label}
										fontSize="inherit"
									>
										{`${ratio} ${label}`}
									</Typography>
								)),
								secondary: "Products",
							},
						]}
					/>
					<InfoList
						subheader="Proliferator effects"
						info={[
							{
								icon: <SpeedRounded />,
								primary: `${formatNumber(
									(prolif.cycleMultiplier - 1) *
										100,
								)}%`,
								secondary: "Bonus cycle speed",
							},
							{
								icon: <SpeedRounded />,
								primary: `${formatNumber(
									(prolif.productMultiplier - 1) *
										100,
								)}%`,
								secondary:
									"Bonus products per cycle",
							},
							{
								icon: <BoltRounded />,
								primary: `${formatNumber(
									(prolif.workConsumptionMultiplier -
										1) *
										100,
								)}%`,
								secondary:
									"Additional work consumption",
							},
							{
								icon: <Battery80Sharp />,
								primary: formatNumber(
									sprayCount === ""
										? 0
										: Number.parseInt(sprayCount),
								),
								secondary: "Sprays",
							},
						]}
					/>
				</Fragment>
			}
		/>
	);
};
