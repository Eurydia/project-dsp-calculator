import {
	FC,
	Fragment,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListSubheader,
	Paper,
	Stack,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import {
	AddRounded,
	Battery80Rounded,
	BoltRounded,
	CableRounded,
	CategoryRounded,
	DataSaverOffRounded,
	RemoveRounded,
	RestartAlt,
	RestartAltRounded,
	SettingsInputComponentRounded,
	SpeedRounded,
	TuneRounded,
	UsbRounded,
} from "@mui/icons-material";

import {
	FACILITY_REGISTRY,
	facilityFromLabel,
} from "assets/facility.mts";
import {
	RECIPE_REGISTRY,
	recipeFromLabel,
} from "assets/recipes/recipe.mts";
import {
	PROLIFERATOR_REGISTERY,
	ProliferatorMode,
	proliferatorFromLabel,
} from "assets/proliferator.mts";
import { sorterFromLabel } from "assets/sorter.mts";
import {
	getDemandPerMinutePerFacility,
	getFacilityCountPerArray,
	getFacilityNeededCount,
	getIdleConsumptionPerFacility,
	getProductionPerMinutePerFacility,
	getWorkConsumptionPerFacility,
} from "core/calculator.mts";

import { EditorLayout } from "./EditorLayout";
import { useNumber } from "components/FieldNumber";
import { StyledSelect } from "components/StyledSelect";
import { FieldNumber } from "components/FieldNumber";
import { ViewSummary } from "components/ViewSummary";
import {
	safeParseClamp,
	sumArray,
} from "components/Editor/helper";
import { StyledTextField } from "components/StyledTextField";

export const Editor: FC = () => {
	const [sprayCount, setSprayCount] =
		useState("0");
	const [sorters, setSorters] = useState<
		Record<string, string>
	>({
		"Sorter Mk.I": "0",
		"Sorter Mk.II": "0",
		"Sorter Mk.III": "0",
		"Pile Sorter": "0",
	});
	const [flowrates, setFlowrates] = useState<
		Record<string, string>
	>({});
	const [
		desiredProduction,
		setDesiredProduction,
	] = useState<Record<string, string>>({});

	const [facility, setFacility] = useState(
		facilityFromLabel("Arc Smelter"),
	);
	const [recipe, setRecipe] = useState(
		recipeFromLabel("Copper Ingot"),
	);
	const [proliferator, setProliferator] =
		useState(proliferatorFromLabel("None"));

	useEffect(() => {
		setDesiredProduction((prev) => {
			const next: Record<string, string> = {};
			for (const label of Object.keys(
				recipe.productRecord,
			)) {
				next[label] = prev[label] ?? "0";
			}
			return next;
		});
		setFlowrates((prev) => {
			const next: Record<string, string> = {};
			for (const label of Object.keys(
				recipe.materialRecord,
			)) {
				next[label] = "360";
			}
			for (const label of Object.keys(
				recipe.productRecord,
			)) {
				next[label] = "360";
			}
			return next;
		});
	}, [recipe]);

	const handleFacilityChange = (
		label: string,
	) => {
		const nextFacility = facilityFromLabel(label);
		setFacility(nextFacility);
		if (
			recipe.recipeType ===
			nextFacility.recipeType
		) {
			return;
		}

		let nextRecipeLabel = "Uh oh";
		for (const entry of Object.entries(
			RECIPE_REGISTRY,
		)) {
			const [label, recipe] = entry;
			if (
				recipe.recipeType ===
				nextFacility.recipeType
			) {
				nextRecipeLabel = label;
				break;
			}
		}
		handleRecipeChange(nextRecipeLabel);
	};

	const handleRecipeChange = (
		nextLabel: string,
	) => {
		const nextRecipe = recipeFromLabel(nextLabel);
		if (
			nextRecipe.speedupOnly &&
			proliferator.mode ===
				ProliferatorMode.EXTRA_PRODUCTS
		) {
			setProliferator(
				proliferatorFromLabel("None"),
			);
		}
		setRecipe(nextRecipe);
	};

	const handleFlowrateChange = (
		label: string,
		value: string,
	) => {
		setFlowrates((prev) => {
			const next = { ...prev };
			next[label] = value;
			return next;
		});
	};

	const handleSorterChange = (
		label: string,
		value: string,
	) => {
		setSorters((prev) => {
			const next = { ...prev };
			next[label] = value;
			return next;
		});
	};

	const handleProliferatorChange = (
		label: string,
	) => {
		const nextProliferator =
			proliferatorFromLabel(label);
		setProliferator(nextProliferator);
		setSprayCount(
			nextProliferator.sprayCount.toString(),
		);
	};

	const proliferatorLabel = useMemo(() => {
		if (proliferator.sprayCount === 12) {
			return "Proliferator Mk.I";
		}
		if (proliferator.sprayCount === 24) {
			return "Proliferator Mk.II";
		}
		if (proliferator.sprayCount === 60) {
			return "Proliferator Mk.III";
		}
		return "None";
	}, [proliferator]);

	return (
		<EditorLayout
			slotTopLeft={
				<Paper sx={{ padding: 2 }}>
					<Stack spacing={2}>
						<StyledSelect
							sortOptions
							label="Facility"
							value={facility.label}
							onValueChange={handleFacilityChange}
							options={Object.keys(
								FACILITY_REGISTRY,
							)}
							disabledOptions={[]}
						/>
						<List
							subheader="Infomation"
							dense
						>
							<ListItem>
								<ListItemAvatar>
									<SpeedRounded />
								</ListItemAvatar>
								<ListItemText
									primary={`${(
										facility.cycleMultiplier * 100
									).toPrecision()}%`}
									secondary="Cycle speed"
								/>
							</ListItem>
							<ListItem>
								<ListItemAvatar>
									<UsbRounded />
								</ListItemAvatar>
								<ListItemText
									primary={
										facility.connectionCount
									}
									secondary="Sorter connections"
								/>
							</ListItem>
							<ListItem>
								<ListItemAvatar>
									<BoltRounded />
								</ListItemAvatar>
								<ListItemText
									primary={`${facility.workConsumptionMW.toPrecision()} MW`}
									secondary="Work comsumption"
								/>
							</ListItem>
							<ListItem>
								<ListItemAvatar>
									<BoltRounded />
								</ListItemAvatar>
								<ListItemText
									primary={`${facility.idleConsumptionMW.toPrecision()} MW`}
									secondary="Idle comsumption"
								/>
							</ListItem>
							<ListItem>
								<ListItemAvatar>
									<CategoryRounded />
								</ListItemAvatar>
								<ListItemText
									primary={facility.recipeType}
									secondary="Category"
								/>
							</ListItem>
						</List>
					</Stack>
				</Paper>
			}
			slotTopMiddleLeft={
				<Paper sx={{ padding: 2 }}>
					<Stack spacing={2}>
						<StyledSelect
							sortOptions
							label="Recipe"
							value={recipe.label}
							onValueChange={handleRecipeChange}
							options={Object.keys(
								RECIPE_REGISTRY,
							)}
							disabledOptions={Object.values(
								RECIPE_REGISTRY,
							)
								.filter(
									(r) =>
										r.recipeType !==
										facility.recipeType,
								)
								.map((r) => r.label)}
						/>
						<List
							subheader="Infomation"
							dense
						>
							<ListItem>
								<ListItemAvatar>
									<SpeedRounded />
								</ListItemAvatar>
								<ListItemText
									primary={`${recipe.cycleTimeSecond} s`}
									secondary="Cycle time"
								/>
							</ListItem>
							<ListItem>
								<ListItemAvatar>
									<DataSaverOffRounded />
								</ListItemAvatar>
								<ListItemText
									primary={
										recipe.speedupOnly
											? "No"
											: "Yes"
									}
									secondary="Extra products bonus"
								/>
							</ListItem>
							<ListItem>
								<ListItemAvatar>
									<RemoveRounded />
								</ListItemAvatar>
								<ListItemText
									primary={Object.entries(
										recipe.materialRecord,
									).map((entry, index) => (
										<Typography
											key={`material-${index}`}
											fontSize="inherit"
										>
											{entry[1]} {entry[0]}
										</Typography>
									))}
									secondary="Materials"
								/>
							</ListItem>
							<ListItem>
								<ListItemAvatar>
									<AddRounded />
								</ListItemAvatar>
								<ListItemText
									primary={Object.entries(
										recipe.productRecord,
									).map(
										([label, ratio]) =>
											`${ratio} ${label}`,
									)}
									secondary="Products"
								/>
							</ListItem>
						</List>
					</Stack>
				</Paper>
			}
			slotTopMiddleRight={
				<Paper sx={{ padding: 2 }}>
					<Stack spacing={2}>
						<StyledSelect
							label="Proliferator"
							value={proliferator.label}
							onValueChange={
								handleProliferatorChange
							}
							options={Object.keys(
								PROLIFERATOR_REGISTERY,
							)}
							disabledOptions={Object.values(
								PROLIFERATOR_REGISTERY,
							)
								.filter(
									(p) =>
										recipe.speedupOnly &&
										p.mode ===
											ProliferatorMode.EXTRA_PRODUCTS,
								)
								.map((p) => p.label)}
						/>
						<Stack
							spacing={2}
							direction="row"
							alignItems="center"
							justifyContent="left"
						>
							<StyledTextField
								disabled={
									proliferator.sprayCount <= 0
								}
								maxLength={9}
								suffix="sprays"
								label="Spray count"
								value={sprayCount}
								onChange={setSprayCount}
							/>
							<Tooltip title="Reset">
								<IconButton
									disabled={
										proliferator.sprayCount <=
											0 ||
										proliferator.sprayCount.toString() ===
											sprayCount
									}
									onClick={() =>
										setSprayCount(
											proliferator.sprayCount.toString(),
										)
									}
								>
									<RestartAltRounded />
								</IconButton>
							</Tooltip>
						</Stack>
						<List
							dense
							subheader="Infomation"
						>
							<ListItem>
								<ListItemAvatar>
									<BoltRounded />
								</ListItemAvatar>
								<ListItemText
									primary={`${(
										(proliferator.workConsumptionMultiplier -
											1) *
										100
									).toPrecision()}%`}
									secondary="Additional work consumption"
								/>
							</ListItem>
						</List>
					</Stack>
				</Paper>
				// <Paper
				// 	sx={{ padding: 2, height: "100%" }}
				// >
				// 	<Stack spacing={2}>
				// 		{Object.entries(
				// 			desiredProduction,
				// 		).map((entry) => {
				// 			const [label, value] = entry;
				// 			return (
				// 				<FieldNumber
				// 					minValue={0}
				// 					maxValue={1e6}
				// 					key={label}
				// 					label={label}
				// 					value={value}
				// 					onValueChange={(nextValue) =>
				// 						setDesiredProduction(
				// 							(prev) => {
				// 								const next = {
				// 									...prev,
				// 								};
				// 								next[label] = nextValue;
				// 								return next;
				// 							},
				// 						)
				// 					}
				// 				/>
				// 			);
				// 		})}
				// 	</Stack>
				// </Paper>
			}
			slotTopRight={
				<Paper sx={{ padding: 2 }}>
					<Stack spacing={2}>
						{Object.entries(sorters).map(
							([label, value]) => (
								<Stack
									key={label}
									spacing={2}
									direction="row"
									alignItems="center"
									justifyContent="left"
								>
									<StyledTextField
										label={`${label} connection`}
										maxLength={6}
										suffix={`/${facility.connectionCount}`}
										value={value}
										onChange={(nextValue) =>
											handleSorterChange(
												label,
												nextValue,
											)
										}
									/>
									<Tooltip title="Reset">
										<IconButton
											disabled={value === "0"}
											onClick={() =>
												handleSorterChange(
													label,
													"0",
												)
											}
										>
											<RestartAltRounded />
										</IconButton>
									</Tooltip>
								</Stack>
							),
						)}
						<List
							dense
							subheader="Note"
						>
							<ListItem>
								<ListItemAvatar>
									<TuneRounded />
								</ListItemAvatar>
								<ListItemText>
									Fine-tune sorter connections
									here. Only affect power
									consumption calculation.
								</ListItemText>
							</ListItem>
						</List>
					</Stack>
				</Paper>
			}
			slotMain={
				<Paper
					sx={{ padding: 2, height: "100%" }}
				>
					<Stack spacing={2}>
						{Object.entries(flowrates).map(
							([label, value]) => (
								<Stack
									key={label}
									spacing={2}
									direction="row"
									alignItems="center"
									justifyContent="left"
								>
									<StyledTextField
										label={`${label} capacity`}
										maxLength={8}
										suffix={`/min`}
										value={value}
										onChange={(nextValue) =>
											handleFlowrateChange(
												label,
												nextValue,
											)
										}
									/>
									<Tooltip title="Reset">
										<IconButton
											disabled={value === "360"}
											onClick={() =>
												handleSorterChange(
													label,
													"360",
												)
											}
										>
											<RestartAltRounded />
										</IconButton>
									</Tooltip>
								</Stack>
							),
						)}
					</Stack>
				</Paper>
				// <ViewSummary
				// 	facilitiesNeeded={getFacilityNeededCount(
				// 		recipe.cycleTimeSecond,
				// 		facility.cycleMultiplier,
				// 		proliferator.productMultiplier,
				// 		recipe.productRecord,
				// 		desiredProduction,
				// 	)}
				// 	facilitiesPerArray={getFacilityCountPerArray(
				// 		recipe.cycleTimeSecond,
				// 		facility.cycleMultiplier *
				// 			proliferator.cycleMultiplier,
				// 		proliferator.productMultiplier,
				// 		materialFlowratePerMinute,
				// 		productFlowratePerMinute,
				// 		recipe.materialRecord,
				// 		recipe.productRecord,
				// 	)}
				// 	idleConsumptionMWPerFacility={getIdleConsumptionPerFacility(
				// 		facility.idleConsumptionMW,
				// 		sorter.idleConsumptionMW,
				// 		Object.keys(recipe.materialRecord)
				// 			.length +
				// 			Object.keys(recipe.productRecord)
				// 				.length,
				// 	)}
				// 	workConsumptionMWPerFacility={getWorkConsumptionPerFacility(
				// 		facility.idleConsumptionMW,
				// 		proliferator.workConsumptionMultiplier,
				// 		sorter.idleConsumptionMW,
				// 		Object.keys(recipe.materialRecord)
				// 			.length +
				// 			Object.keys(recipe.productRecord)
				// 				.length,
				// 	)}
				// 	materialPerFacility={getDemandPerMinutePerFacility(
				// 		recipe.cycleTimeSecond,
				// 		facility.cycleMultiplier *
				// 			proliferator.cycleMultiplier,
				// 		recipe.materialRecord,
				// 		recipe.productRecord,
				// 		proliferatorLabel,
				// 		proliferator.numberOfSprays <= 0
				// 			? 0
				// 			: numberOfSpraysParsed,
				// 	)}
				// 	productPerFacility={getProductionPerMinutePerFacility(
				// 		recipe.cycleTimeSecond,
				// 		facility.cycleMultiplier *
				// 			proliferator.cycleMultiplier,
				// 		proliferator.productMultiplier,
				// 		recipe.productRecord,
				// 	)}
				// />
			}
		/>
	);
};
