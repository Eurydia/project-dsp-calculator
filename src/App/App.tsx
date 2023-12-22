import { FC, useState } from "react";
import {
	Container,
	ThemeProvider,
	CssBaseline,
	Card,
	CardHeader,
	CardContent,
	Dialog,
	DialogTitle,
	DialogContent,
	Button,
} from "@mui/material";

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
								<Button
									variant="contained"
									onClick={() => {
										setDialogOpen(true);
									}}
								>
									Preference settings
								</Button>
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
