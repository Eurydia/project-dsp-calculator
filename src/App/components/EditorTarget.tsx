import { FC } from "react";

import {
	Stack,
	Typography,
	Paper,
	Tabs,
	Tab,
	Grid,
	Box,
} from "@mui/material";

import { StyledTextField } from "components/StyledTextField";
import { ingredientIconFromLabel } from "assets/ingredient.mts";

type EditorTargetProps = {
	mode: string;
	onModeChange: (mode: string) => void;
	capacityRecord: Record<string, string>;
	onCapacityChange: (
		itemLabel: string,
		value: string,
	) => void;
	constraintRecord: Record<string, string>;
	onConstraintChange: (
		itemLabel: string,
		value: string,
	) => void;
};
export const EditorTarget: FC<
	EditorTargetProps
> = (props) => {
	const {
		mode,
		capacityRecord,
		constraintRecord,
		onModeChange,
		onCapacityChange,
		onConstraintChange,
	} = props;

	const header =
		mode === "0"
			? "Production constraint"
			: "Production capacity";

	const subheader =
		mode === "0"
			? "Compute result based on available material."
			: "Compute result based on desired 	production capacity material.";

	const targetItems =
		mode === "0"
			? constraintRecord
			: capacityRecord;

	const targetCallback =
		mode === "0"
			? onConstraintChange
			: onCapacityChange;

	return (
		<Paper
			square
			elevation={2}
			sx={{ padding: 2 }}
		>
			<Stack spacing={2}>
				<Tabs
					value={mode}
					onChange={(_, value) =>
						onModeChange(value)
					}
					aria-label="basic tabs example"
				>
					<Tab
						label="Constraint"
						value="0"
					/>
					<Tab
						label="Capacity"
						value="1"
					/>
				</Tabs>
				<Typography variant="h2">
					{header}
				</Typography>
				<Typography
					paragraph
					variant="subtitle1"
					component="p"
				>
					{subheader}
				</Typography>
				<Box>
					<Grid
						container
						spacing={2}
					>
						{Object.entries(targetItems).map(
							([label, value]) => (
								<Grid
									item
									key={label}
									xs={12}
									md={6}
								>
									<StyledTextField
										label={label}
										maxLength={6}
										suffix="/min"
										prefix={
											<img
												alt={label}
												src={ingredientIconFromLabel(
													label,
												)}
											/>
										}
										value={value}
										onChange={(nextValue) =>
											targetCallback(
												label,
												nextValue,
											)
										}
										onReset={() =>
											targetCallback(label, "0")
										}
									/>
								</Grid>
							),
						)}
					</Grid>
				</Box>
			</Stack>
		</Paper>
	);
};
