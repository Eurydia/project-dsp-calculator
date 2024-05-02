import {
	Box,
	Grid,
	Paper,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";
import { FC } from "react";
import { ingredientIconFromLabel } from "~assets/index";
import { StyledTextField } from "~components/StyledTextField";

type ProductionConfigProps = {
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
export const ProductionConfig: FC<
	ProductionConfigProps
> = (props) => {
	const {
		mode,
		capacityRecord,
		constraintRecord,
		onModeChange,
		onCapacityChange,
		onConstraintChange,
	} = props;

	const handleTabChange = (
		_: React.SyntheticEvent<Element, Event>,
		value: string,
	) => {
		onModeChange(value);
	};

	const header =
		mode === "0"
			? "Production constraint"
			: "Production capacity";

	const targetItems =
		mode === "0"
			? constraintRecord
			: capacityRecord;

	const targetCallback =
		mode === "0"
			? onConstraintChange
			: onCapacityChange;

	const renderedItems = Object.entries(
		targetItems,
	).map(([label, value]) => (
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
						src={ingredientIconFromLabel(label)}
					/>
				}
				value={value}
				onChange={(nextValue) =>
					targetCallback(label, nextValue)
				}
				onReset={() => targetCallback(label, "0")}
			/>
		</Grid>
	));

	return (
		<Paper
			square
			elevation={2}
			sx={{
				padding: 2,
				flexDirection: "column",
				display: "flex",
				gap: 2,
			}}
		>
			<Tabs
				value={mode}
				onChange={handleTabChange}
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
			<Box>
				<Grid
					container
					spacing={2}
				>
					{renderedItems}
				</Grid>
			</Box>
		</Paper>
	);
};
