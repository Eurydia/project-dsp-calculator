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
	TextDivider,
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

	const [preferences, setPreferences] = useState(
		Preferences.create(),
	);

	const [ctx, setCtx] = useState(
		Context.create(),
	);

	const [productRecord, setProductRecord] =
		useState<Record<string, number>>({});

	const handleProductRecordChange = (
		key: string,
		nextProductionTarget: number,
	) => {
		setProductRecord((prev) => {
			const next = { ...prev };
			next[key] = nextProductionTarget;
			return next;
		});
	};

	const handleConfigChange = (
		nextCtx: Context,
	) => {
		setCtx(nextCtx);
		setProductRecord((prev) => {
			const next: Record<string, number> = {};

			for (const key of Object.keys(
				nextCtx.recipeProductRatioRecord,
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
								<TextDivider label="Settings" />
								<Button
									variant="outlined"
									onClick={() => {
										setDialogOpen(true);
									}}
								>
									Preference settings
								</Button>
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
						onPreferenceChange={setPreferences}
					/>
				</DialogContent>
			</Dialog>
		</ThemeProvider>
	);
};
