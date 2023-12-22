import { FC, useEffect, useState } from "react";
import {
	Container,
	ThemeProvider,
	CssBaseline,
	Card,
	CardHeader,
	CardContent,
	Fab,
	Typography,
	Tooltip,
	Dialog,
	DialogTitle,
	DialogContent,
	CircularProgress,
} from "@mui/material";
import { SettingsRounded } from "@mui/icons-material";

import {
	FormObjectives,
	ViewSummary,
	FormConfig,
	FormPreferences,
	usePreferences,
} from "../components";
import {
	Configuration,
	Preferences,
} from "../types";

import { theme } from "./theme";
import { AppLayout } from "./AppLayout";
import {
	computeMaterialRecordPerFacility,
	computeProductRecordPerFacility,
	computeFacilitiesNeeded,
	computeFacilitiesPerArray,
	computeIdleConsumptionMWPerFacility,
	computeWorkConsumptionMWPerFacility,
} from "./helper";

import {
	prepapreAssetProliferators,
	prepapreAssetRecipes,
	prepareAssetFacilities,
	prepareAssetSorters,
} from "../assets";

export const App: FC = () => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		Promise.all([
			prepapreAssetProliferators(),
			prepapreAssetRecipes(),
			prepareAssetFacilities(),
			prepareAssetSorters(),
		]).then(() => {
			setIsLoaded(true);
		});
	}, []);

	const [dialogOpen, setDialogOpen] =
		useState(false);

	const { preferences, setPreferences } =
		usePreferences(
			"preferences",
			Preferences.create(),
		);

	const [config, setConfig] =
		useState<Configuration>(
			Configuration.create(),
		);

	const [productRecord, setProductRecord] =
		useState<Record<string, number>>({});

	const handleProductRecordChange = (
		key: string,
		nextTarget: number,
	) => {
		setProductRecord((prev) => {
			const next = { ...prev };
			next[key] = nextTarget;
			return next;
		});
	};

	const handleConfigChange = (
		nextConfig: Configuration,
	) => {
		setConfig(nextConfig);
		setProductRecord((prev) => {
			const next: Record<string, number> = {};

			for (const key of Object.keys(
				nextConfig.recipeProductRatioRecord,
			)) {
				next[key] = 0;

				if (prev[key] !== undefined) {
					next[key] = prev[key];
				}
			}

			return next;
		});
	};

	if (!isLoaded) {
		return <CircularProgress />;
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Tooltip
				title={
					<Typography>
						Preference Settings
					</Typography>
				}
				placement="top"
			>
				<Fab
					color="primary"
					sx={{
						position: "fixed",
						bottom: 16,
						right: 16,
						backgroundColor:
							theme.palette.background.default,
					}}
					onClick={() => {
						setDialogOpen(true);
					}}
				>
					<SettingsRounded color="primary" />
				</Fab>
			</Tooltip>
			<Container maxWidth="lg">
				<AppLayout
					slotSideTop={
						<Card>
							<CardHeader
								title="Configurations"
								titleTypographyProps={{
									fontWeight: "bold",
								}}
							/>
							<CardContent>
								<FormConfig
									onConfigChange={
										handleConfigChange
									}
								/>
							</CardContent>
						</Card>
					}
					slotMainTop={
						<Card>
							<CardHeader
								title="Production"
								titleTypographyProps={{
									fontWeight: "bold",
								}}
							/>
							<CardContent>
								<FormObjectives
									productRatios={
										config.recipeProductRatioRecord
									}
									objectives={productRecord}
									onObjectiveChange={
										handleProductRecordChange
									}
								/>
							</CardContent>
						</Card>
					}
					slotMainBottom={
						<Card>
							<CardContent>
								<ViewSummary
									facilitiesNeeded={computeFacilitiesNeeded(
										productRecord,
										config,
									)}
									facilitiesPerArray={computeFacilitiesPerArray(
										config,
										preferences,
									)}
									idleConsumptionMWPerFacility={computeIdleConsumptionMWPerFacility(
										config,
									)}
									workConsumptionMWPerFacility={computeWorkConsumptionMWPerFacility(
										config,
									)}
									materialPerFacility={computeMaterialRecordPerFacility(
										config,
										preferences,
									)}
									productPerFacility={computeProductRecordPerFacility(
										config,
									)}
								/>
							</CardContent>
						</Card>
					}
				/>
			</Container>
			<Dialog
				fullWidth
				maxWidth="sm"
				open={dialogOpen}
				onClose={() => {
					setDialogOpen(false);
				}}
			>
				<DialogTitle>
					Preference Settings
				</DialogTitle>
				<DialogContent>
					<FormPreferences
						preferences={preferences}
						onPrefernceChange={setPreferences}
					/>
				</DialogContent>
			</Dialog>
		</ThemeProvider>
	);
};
