import { FC, useMemo, useState } from "react";
import {
	Divider,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Stack,
	Tooltip,
	Typography,
	Paper,
} from "@mui/material";
import {
	AbcRounded,
	AddRounded,
	Battery80Rounded,
	BoltRounded,
	CategoryRounded,
	DataSaverOffRounded,
	FactoryRounded,
	Remove,
	RemoveRounded,
	RestartAltRounded,
	SpeedRounded,
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
import { StyledSelect } from "components/StyledSelect";

import { StyledTextField } from "components/StyledTextField";

import {
	getDemandPerMinutePerFacility,
	getFacilityPerArrayCount,
	getFacilityNeededCount,
	getIdleConsumptionPerFacility,
	getProductionPerMinutePerFacility,
	getWorkConsumptionPerFacility,
} from "./calculator";
import {
	safeParseClamp,
	sumArray,
	formatNumber,
	loadStorage,
	getProlifLabel,
} from "./helper";
import { EditorLayout } from "./EditorLayout";
import { useContent } from "./useContent";
import { useRecord } from "App/pages/Editor/useRecord";
import {
	lightBlue,
	orange,
} from "@mui/material/colors";

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
		content: desiredProduction,
		setContent: setDesiredProduction,
	} = useRecord({}, "desiredProduction");
	const {
		content: sprayCount,
		setContent: setSprayCount,
	} = useContent("0", "sprayCount");
	const [facility, setFacility] = useState(() =>
		loadStorage(
			"activeFacility",
			facilityFromLabel,
			facilityFromLabel("Arc Smelter"),
		),
	);
	const [recipe, setRecipe] = useState(() =>
		loadStorage(
			"activeRecipe",
			recipeFromLabel,
			recipeFromLabel("Copper Ingot"),
		),
	);
	const [prolif, setProlif] = useState(() =>
		loadStorage(
			"activeProlif",
			proliferatorFromLabel,
			proliferatorFromLabel("None"),
		),
	);

	const handleFacilityChange = (
		label: string,
	) => {
		const nFacility = facilityFromLabel(label);
		setFacility(nFacility);
		localStorage.setItem(
			"activeFacility",
			JSON.stringify(nFacility.label),
		);
		if (
			recipe.recipeType === nFacility.recipeType
		) {
			return;
		}
		let nRecipeLabel = "Uh oh";
		const relatedRecipes = Object.values(
			RECIPE_REGISTRY,
		)
			.filter(
				({ recipeType }) =>
					recipeType === nFacility.recipeType,
			)
			.map(({ label }) => label);
		if (relatedRecipes.length > 0) {
			nRecipeLabel = relatedRecipes[0];
		}
		handleRecipeChange(nRecipeLabel);
	};

	const handleRecipeChange = (label: string) => {
		const nRecipe = recipeFromLabel(label);
		if (
			nRecipe.speedupOnly &&
			prolif.mode ===
				ProliferatorMode.EXTRA_PRODUCTS
		) {
			handleProlifChange("None");
		}
		setRecipe(nRecipe);
		localStorage.setItem(
			"activeRecipe",
			JSON.stringify(nRecipe.label),
		);
		setDesiredProduction((prev) => {
			const next: Record<string, string> = {};
			for (const label of Object.keys(
				nRecipe.productRecord,
			)) {
				next[label] = prev[label] ?? "0";
			}
			return next;
		});
		setFlowrates(() => {
			const next: Record<string, string> = {};
			for (const label of Object.keys(
				nRecipe.materialRecord,
			)) {
				next[label] = "360";
			}
			for (const label of Object.keys(
				nRecipe.productRecord,
			)) {
				next[label] = "360";
			}
			return next;
		});
	};

	const handleProlifChange = (label: string) => {
		const nProlif = proliferatorFromLabel(label);
		setSprayCount(nProlif.sprayCount.toString());
		setProlif(nProlif);
		localStorage.setItem(
			"activeProlif",
			JSON.stringify(nProlif.label),
		);
	};

	const handleDesiredProductionChange = (
		label: string,
		value: string,
	) => {
		setDesiredProduction((prev) => {
			const next = { ...prev };
			if (value === "") {
				next[label] = "";
				return next;
			}
			next[label] = safeParseClamp(
				value,
				0,
				1e7,
			).toString();
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

			const maxConnection =
				facility.connectionCount * 7200;

			const leftover = sumArray(
				Object.entries(prev)
					.filter(
						([prevLabel]) => prevLabel !== label,
					)
					.map(([, prevValue]) =>
						safeParseClamp(
							prevValue,
							360,
							maxConnection,
						),
					),
			);

			next[label] = safeParseClamp(
				value,
				0,
				maxConnection - leftover,
			).toString();
			return next;
		});
	};

	const handleSorterChange = (
		label: string,
		value: string,
	) => {
		setSorters((prev) => {
			const next = { ...prev };
			if (value === "") {
				next[label] = "";
				return next;
			}
			const leftover = sumArray(
				Object.entries(prev)
					.filter(
						([prevLabel]) => prevLabel !== label,
					)
					.map(([, prevValue]) =>
						safeParseClamp(
							prevValue,
							0,
							facility.connectionCount,
						),
					),
			);
			next[label] = safeParseClamp(
				value,
				0,
				facility.connectionCount - leftover,
			).toString();
			return next;
		});
	};
	const prolifLabel = getProlifLabel(
		prolif.sprayCount,
	);
	const facilityNeededCount = useMemo(
		() =>
			getFacilityNeededCount(
				recipe.cycleTimeSecond,
				facility.cycleMultiplier *
					prolif.cycleMultiplier,
				prolif.productMultiplier,
				recipe.productRecord,
				desiredProduction,
			),
		[
			recipe.cycleTimeSecond,
			facility.cycleMultiplier,
			prolif.cycleMultiplier,
			prolif.productMultiplier,
			recipe.productRecord,
			desiredProduction,
		],
	);

	const facilityPerArrayCount = useMemo(
		() =>
			getFacilityPerArrayCount(
				recipe.cycleTimeSecond,
				facility.cycleMultiplier *
					prolif.cycleMultiplier,
				prolif.productMultiplier,
				flowrates,
				recipe.materialRecord,
				recipe.productRecord,
			),
		[
			recipe.cycleTimeSecond,
			facility.cycleMultiplier,
			prolif.cycleMultiplier,
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
				prolif.cycleMultiplier *
					facility.cycleMultiplier,
				prolif.productMultiplier,
				recipe.materialRecord,
				recipe.productRecord,
				prolifLabel,
				sprayCount,
			),
		[
			recipe.cycleTimeSecond,
			prolif.cycleMultiplier,
			facility.cycleMultiplier,
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
				prolif.cycleMultiplier *
					facility.cycleMultiplier,
				prolif.productMultiplier,
				recipe.productRecord,
			),
		[
			recipe.cycleTimeSecond,
			prolif.cycleMultiplier,
			facility.cycleMultiplier,
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
				<Stack
					spacing={4}
					divider={
						<Divider
							flexItem
							variant="fullWidth"
						/>
					}
				>
					<Stack spacing={2}>
						<Typography>Manufacturing</Typography>
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
					</Stack>
					<Stack spacing={2}>
						<Typography>
							Production target
						</Typography>
						{Object.entries(
							desiredProduction,
						).map(([label, value]) => (
							<Stack
								key={label}
								spacing={2}
								direction="row"
								alignItems="center"
								justifyContent="left"
							>
								<StyledTextField
									label={label}
									maxLength={8}
									suffix={`/min`}
									value={value}
									onChange={(nextValue) =>
										handleDesiredProductionChange(
											label,
											nextValue,
										)
									}
								/>
								<IconButton
									disabled={value === "0"}
									onClick={() =>
										handleDesiredProductionChange(
											label,
											"0",
										)
									}
								>
									<Tooltip title="Reset">
										<RestartAltRounded />
									</Tooltip>
								</IconButton>
							</Stack>
						))}
					</Stack>
					<Stack spacing={2}>
						<Typography>Proliferation</Typography>
						<StyledSelect
							label="Proliferator"
							value={prolif.label}
							onValueChange={handleProlifChange}
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
								disabled={prolif.sprayCount <= 0}
								maxLength={9}
								suffix="sprays"
								label="Uses"
								value={sprayCount}
								onChange={setSprayCount}
							/>
							<IconButton
								disabled={
									prolif.sprayCount <= 0 ||
									prolif.sprayCount.toString() ===
										sprayCount
								}
								onClick={() =>
									setSprayCount(
										prolif.sprayCount.toString(),
									)
								}
							>
								<Tooltip title="Reset">
									<RestartAltRounded />
								</Tooltip>
							</IconButton>
						</Stack>
					</Stack>
					<Stack spacing={2}>
						<Typography>
							Transport capacity
						</Typography>
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
										label={label}
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
									<IconButton
										disabled={value === "360"}
										onClick={() =>
											handleFlowrateChange(
												label,
												"360",
											)
										}
									>
										<Tooltip title="Reset">
											<RestartAltRounded />
										</Tooltip>
									</IconButton>
								</Stack>
							),
						)}
					</Stack>
					<Stack spacing={2}>
						<Typography>
							Sorter connections
						</Typography>
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
										label={label}
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
									<IconButton
										disabled={value === "0"}
										onClick={() =>
											handleSorterChange(
												label,
												"0",
											)
										}
									>
										<Tooltip title="Reset">
											<RestartAltRounded />
										</Tooltip>
									</IconButton>
								</Stack>
							),
						)}
					</Stack>
				</Stack>
			}
			slotMain={
				<Stack spacing={2}>
					<Paper sx={{ padding: 2 }}>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell colSpan={3}>
											Item (per minute)
										</TableCell>
										<TableCell
											colSpan={1}
											align="right"
										>
											Total
										</TableCell>
										<TableCell
											colSpan={1}
											align="right"
										>
											Per Array
										</TableCell>
										<TableCell
											colSpan={1}
											align="right"
										>
											Per Facility
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{Object.entries(
										materialPerMinutePerFacility,
									).map(([label, value]) => (
										<TableRow key={label}>
											<TableCell colSpan={3}>
												{label}
											</TableCell>
											{[
												value *
													facilityNeededCount,
												value *
													facilityPerArrayCount,
												value,
											].map((data, index) => (
												<TableCell
													colSpan={1}
													key={`demand-${index}`}
												>
													<Typography
														display="flex"
														alignItems="center"
														justifyContent="flex-end"
														fontSize="inherit"
														color={orange[200]}
													>
														<Remove fontSize="inherit" />
														{formatNumber(data)}
													</Typography>
												</TableCell>
											))}
										</TableRow>
									))}
									{Object.entries(
										productPerMinutePerFacility,
									).map(([label, value]) => (
										<TableRow key={label}>
											<TableCell colSpan={3}>
												<Typography
													fontSize="inherit"
													color={lightBlue[300]}
												>
													{label}
												</Typography>
											</TableCell>
											{[
												value *
													facilityNeededCount,
												value *
													facilityPerArrayCount,
												value,
											].map((data, index) => (
												<TableCell
													key={`supply-${index}`}
													colSpan={1}
												>
													<Typography
														display="flex"
														alignItems="center"
														justifyContent="flex-end"
														fontSize="inherit"
													>
														<AddRounded fontSize="inherit" />
														{formatNumber(data)}
													</Typography>
												</TableCell>
											))}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
					<Paper sx={{ padding: 2 }}>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell colSpan={3}>
											Power consumption (MW)
										</TableCell>
										<TableCell
											colSpan={1}
											align="right"
										>
											Total
										</TableCell>
										<TableCell
											colSpan={1}
											align="right"
										>
											Per array
										</TableCell>
										<TableCell
											colSpan={1}
											align="right"
										>
											Per facility
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell colSpan={3}>
											Work
										</TableCell>
										{[
											workConsumptionPerFacility *
												facilityNeededCount,
											workConsumptionPerFacility *
												facilityPerArrayCount,
											workConsumptionPerFacility,
										].map((value, index) => (
											<TableCell
												key={`supply-${index}`}
												colSpan={1}
											>
												<Typography
													display="flex"
													alignItems="center"
													justifyContent="flex-end"
													fontSize="inherit"
												>
													<Remove fontSize="inherit" />
													{formatNumber(value)}
												</Typography>
											</TableCell>
										))}
									</TableRow>
									<TableRow>
										<TableCell colSpan={3}>
											Idle
										</TableCell>
										{[
											idleConsumptionPerFacility *
												facilityNeededCount,
											idleConsumptionPerFacility *
												facilityPerArrayCount,
											idleConsumptionPerFacility,
										].map((value, index) => (
											<TableCell
												key={`supply-${index}`}
												colSpan={1}
											>
												<Typography
													display="flex"
													alignItems="center"
													justifyContent="flex-end"
													fontSize="inherit"
												>
													<Remove fontSize="inherit" />
													{formatNumber(value)}
												</Typography>
											</TableCell>
										))}
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</Stack>
			}
		>
			<List
				subheader="Layout"
				dense
			>
				<ListItem>
					<ListItemAvatar>
						<FactoryRounded />
					</ListItemAvatar>
					<ListItemText
						primary={facilityPerArrayCount}
						secondary="Facilities per array"
					/>
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<FactoryRounded />
					</ListItemAvatar>
					<ListItemText
						primary={arrayNeededCount}
						secondary="Arrays"
					/>
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<FactoryRounded />
					</ListItemAvatar>
					<ListItemText
						primary={facilityNeededCount}
						secondary="Total facilities"
					/>
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<FactoryRounded />
					</ListItemAvatar>
					<ListItemText
						primary={facilityLeftoverCount}
						secondary="Leftover facilities"
					/>
				</ListItem>
			</List>
			<List
				subheader="Facility information"
				dense
			>
				<ListItem>
					<ListItemAvatar>
						<AbcRounded />
					</ListItemAvatar>
					<ListItemText
						primary={facility.label}
						secondary="Name"
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
				<ListItem>
					<ListItemAvatar>
						<SpeedRounded />
					</ListItemAvatar>
					<ListItemText
						primary={`${formatNumber(
							facility.cycleMultiplier * 100,
						)}%`}
						secondary="Cycle speed"
					/>
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<UsbRounded />
					</ListItemAvatar>
					<ListItemText
						primary={facility.connectionCount}
						secondary="Sorter connections"
					/>
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<BoltRounded />
					</ListItemAvatar>
					<ListItemText
						primary={`${formatNumber(
							facility.workConsumptionMW,
						)} MW`}
						secondary="Work comsumption"
					/>
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<BoltRounded />
					</ListItemAvatar>
					<ListItemText
						primary={`${formatNumber(
							facility.idleConsumptionMW,
						)} MW`}
						secondary="Idle comsumption"
					/>
				</ListItem>
			</List>
			<List
				subheader="Recipe infomation"
				dense
			>
				<ListItem>
					<ListItemAvatar>
						<SpeedRounded />
					</ListItemAvatar>
					<ListItemText
						primary={`${formatNumber(
							recipe.cycleTimeSecond,
						)} s`}
						secondary="Cycle time"
					/>
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<DataSaverOffRounded />
					</ListItemAvatar>
					<ListItemText
						primary={
							recipe.speedupOnly ? "No" : "Yes"
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
						).map(([label, ratio]) => (
							<Typography
								key={label}
								fontSize="inherit"
							>
								{`${ratio} ${label}`}
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
						).map(([label, ratio]) => (
							<Typography
								key={label}
								fontSize="inherit"
							>
								{`${ratio} ${label}`}
							</Typography>
						))}
						secondary="Products"
					/>
				</ListItem>
			</List>
			<List
				dense
				subheader="Proliferator effects"
			>
				<ListItem>
					<ListItemAvatar>
						<BoltRounded />
					</ListItemAvatar>
					<ListItemText
						primary={`${formatNumber(
							(prolif.workConsumptionMultiplier -
								1) *
								100,
						)}%`}
						secondary="Additional work consumption"
					/>
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<SpeedRounded />
					</ListItemAvatar>
					<ListItemText
						primary={`${formatNumber(
							(prolif.cycleMultiplier - 1) * 100,
						)}%`}
						secondary="Bonus cycle speed"
					/>
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<SpeedRounded />
					</ListItemAvatar>
					<ListItemText
						primary={`${formatNumber(
							(prolif.productMultiplier - 1) *
								100,
						)}%`}
						secondary="Bonus products per cycle"
					/>
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Battery80Rounded />
					</ListItemAvatar>
					<ListItemText
						primary={formatNumber(
							sprayCount === ""
								? 0
								: Number.parseInt(sprayCount),
						)}
						secondary="Sprays"
					/>
				</ListItem>
			</List>
		</EditorLayout>
	);
};
