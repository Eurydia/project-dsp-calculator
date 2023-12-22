import { FC, useState } from "react";
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
} from "@mui/material";
import { SettingsRounded } from "@mui/icons-material";

import {
	FormObjectives,
	ViewSummary,
	FormConfig,
	FormPreferences,
	usePreferences,
} from "../components";
import { Context, Preferences } from "../types";

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

export const App: FC = () => {
	const [dialogOpen, setDialogOpen] =
		useState(false);

	const { preferences, setPreferences } =
		usePreferences(
			"preferences",
			Preferences.create(),
		);

	const [ctx, setCtx] = useState(
		Context.create(),
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
		nextConfig: Context,
	) => {
		setCtx(nextConfig);
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
									onCtxChange={handleConfigChange}
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
										ctx.recipeProductRatioRecord
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
										ctx,
									)}
									facilitiesPerArray={computeFacilitiesPerArray(
										ctx,
										preferences,
									)}
									idleConsumptionMWPerFacility={computeIdleConsumptionMWPerFacility(
										ctx,
									)}
									workConsumptionMWPerFacility={computeWorkConsumptionMWPerFacility(
										ctx,
									)}
									materialPerFacility={computeMaterialRecordPerFacility(
										ctx,
										preferences,
									)}
									productPerFacility={computeProductRecordPerFacility(
										ctx,
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
