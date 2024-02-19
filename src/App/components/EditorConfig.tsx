import { FC } from "react";

import { Stack, Typography } from "@mui/material";

import {
	FACILITY_REGISTRY,
	GAME_VERSION,
	PROLIFERATOR_REGISTERY,
	ProliferatorMode,
	RECIPE_REGISTRY,
	RecipeType,
} from "assets/index.mts";
import { ingredientIconFromLabel } from "assets/ingredient.mts";

import { CollapseRegion } from "components/CollapseRegion";
import { StyledSelect } from "components/StyledSelect";
import { StyledTextField } from "components/StyledTextField";

const FACILITY_OPTIONS = Object.values(
	FACILITY_REGISTRY,
).map(({ label }) => label);
const RECIPE_OPTIONS = Object.values(
	RECIPE_REGISTRY,
).map(({ label }) => label);
const PROLIF_OPTIONS = Object.values(
	PROLIFERATOR_REGISTERY,
).map(({ label }) => label);

const getDisabledRecipeOptions = (
	currRecipeType: RecipeType,
) =>
	Object.values(RECIPE_REGISTRY)
		.filter(
			({ recipeType }) =>
				recipeType !== currRecipeType,
		)
		.map(({ label }) => label);

const getDisabledProlifOptions = (
	speedupOnly: boolean,
) =>
	Object.values(PROLIFERATOR_REGISTERY)
		.filter(
			({ mode }) =>
				speedupOnly &&
				mode !==
					ProliferatorMode.PRODUCTION_SPEEDUP,
		)
		.map(({ label }) => label);

const prolifEffectToLabel = (effect: string) => {
	switch (effect) {
		case "Extra Products +12.5%":
		case "Cycle Speed +25%":
			return ingredientIconFromLabel(
				"Proliferator Mk.I",
			);
		case "Cycle Speed +50%":
		case "Extra Products +20%":
			return ingredientIconFromLabel(
				"Proliferator Mk.II",
			);
		case "Cycle Speed +100%":
		case "Extra Products +25%":
			return ingredientIconFromLabel(
				"Proliferator Mk.III",
			);
		default:
			return ingredientIconFromLabel("None");
	}
};

type EditorConfigProps = {
	speedupOnly: boolean;
	recipeType: RecipeType;
	connectionCount: number;
	facility: string;
	onFacilityChange: (label: string) => void;
	recipe: string;
	onRecipeChange: (label: string) => void;
	desiredProducts: Record<string, string>;
	onDesiredProductChange: (
		label: string,
		value: string,
	) => void;
	flowrates: Record<string, string>;
	onFlowrateChange: (
		label: string,
		value: string,
	) => void;
	prolif: string;
	onProlifChange: (label: string) => void;
	prolifSpray: string;
	onProlifSprayChange: (value: string) => void;
	sorters: Record<string, string>;
	onSorterChange: (
		label: string,
		value: string,
	) => void;
};
export const EditorConfig: FC<
	EditorConfigProps
> = (props) => {
	const {
		connectionCount,
		recipeType,
		facility,
		onFacilityChange,
		recipe,
		onRecipeChange,
		flowrates,
		onFlowrateChange,
		desiredProducts,
		onDesiredProductChange,
		speedupOnly,
		prolif,
		onProlifChange,
		prolifSpray,
		onProlifSprayChange,
		sorters,
		onSorterChange,
	} = props;
	return (
		<Stack spacing={2}>
			<Typography variant="h1">
				Configuration
			</Typography>
			<Typography
				variant="subtitle1"
				component="p"
			>
				DSP version: {GAME_VERSION}
			</Typography>
			<CollapseRegion
				title={
					<Typography variant="h2">
						Manufacturing
					</Typography>
				}
			>
				<Stack spacing={2}>
					<StyledSelect
						sortOptions
						label="Facility"
						value={facility}
						onValueChange={onFacilityChange}
						optionToIcon={ingredientIconFromLabel}
						options={FACILITY_OPTIONS}
						disabledOptions={[]}
					/>
					<StyledSelect
						sortOptions
						label="Recipe"
						value={recipe}
						onValueChange={onRecipeChange}
						optionToIcon={ingredientIconFromLabel}
						options={RECIPE_OPTIONS}
						disabledOptions={getDisabledRecipeOptions(
							recipeType,
						)}
					/>
				</Stack>
			</CollapseRegion>
			<CollapseRegion
				title={
					<Typography variant="h2">
						Production target
					</Typography>
				}
			>
				<Stack spacing={2}>
					{Object.entries(desiredProducts).map(
						([label, value]) => (
							<StyledTextField
								key={label}
								label={label}
								maxLength={6}
								suffix="/min"
								prefix={
									<img
										alt={label}
										src={ingredientIconFromLabel(
											label,
										)}
									></img>
								}
								value={value}
								onChange={(nextValue) =>
									onDesiredProductChange(
										label,
										nextValue,
									)
								}
								onReset={() =>
									onDesiredProductChange(
										label,
										"0",
									)
								}
							/>
						),
					)}
				</Stack>
			</CollapseRegion>
			<CollapseRegion
				title={
					<Typography variant="h2">
						Transport capacity
					</Typography>
				}
			>
				<Stack spacing={2}>
					{Object.entries(flowrates).map(
						([label, value]) => (
							<StyledTextField
								key={label}
								label={label}
								maxLength={6}
								value={value}
								onChange={(nextValue) =>
									onFlowrateChange(
										label,
										nextValue,
									)
								}
								onReset={() =>
									onFlowrateChange(label, "")
								}
								suffix="/min"
								prefix={
									<img
										alt={label}
										src={ingredientIconFromLabel(
											label,
										)}
									/>
								}
							/>
						),
					)}
				</Stack>
			</CollapseRegion>
			<CollapseRegion
				title={
					<Typography variant="h2">
						Proliferation
					</Typography>
				}
			>
				<Stack spacing={2}>
					<StyledSelect
						label="Proliferator"
						value={prolif}
						onValueChange={onProlifChange}
						options={PROLIF_OPTIONS}
						optionToIcon={prolifEffectToLabel}
						disabledOptions={getDisabledProlifOptions(
							speedupOnly,
						)}
					/>
					<StyledTextField
						maxLength={6}
						label="Uses"
						value={prolifSpray}
						onChange={onProlifSprayChange}
						onReset={() =>
							onProlifSprayChange("")
						}
						suffix="sprays"
					/>
				</Stack>
			</CollapseRegion>
			<CollapseRegion
				title={
					<Typography variant="h2">
						Sorter connections
					</Typography>
				}
			>
				<Stack spacing={2}>
					{Object.entries(sorters).map(
						([label, value]) => (
							<StyledTextField
								key={label}
								label={label}
								maxLength={2}
								value={value}
								onReset={() =>
									onSorterChange(label, "0")
								}
								onChange={(nextValue) =>
									onSorterChange(label, nextValue)
								}
								suffix={`/${connectionCount}`}
								prefix={
									<img
										alt={label}
										src={ingredientIconFromLabel(
											label,
										)}
									/>
								}
							/>
						),
					)}
				</Stack>
			</CollapseRegion>
		</Stack>
	);
};
