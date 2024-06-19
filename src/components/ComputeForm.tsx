import { RestartAltRounded } from "@mui/icons-material";
import {
	Grid,
	IconButton,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";
import { FC } from "react";
import { toIconURL } from "~assets/icon";
import { ComputeFormData } from "~types/query";
import { PaddedPaper } from "./PaddedPaper";
import { StyledTextField } from "./StyledTextField";

type ComputeFormProps = {
	data: ComputeFormData;
	// mode: string;
	// onModeChange: (mode: string) => void;
	// capacityRecord: Record<string, string>;
	// onCapacityChange: (
	// 	itemLabel: string,
	// 	value: string,
	// ) => void;
	// constraintRecord: Record<string, string>;
	// onConstraintChange: (
	// 	itemLabel: string,
	// 	value: string,
	// ) => void;
};
export const ComputeForm: FC<ComputeFormProps> = (
	props,
) => {
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
			key={label}
			item
			xs={12}
			md={6}
			display="flex"
			alignItems="center"
		>
			<StyledTextField
				label={label}
				maxLength={6}
				suffix="/min"
				prefix={
					<img
						alt={label}
						src={toIconURL(label)}
					/>
				}
				value={value}
				onChange={(nextValue) =>
					targetCallback(label, nextValue)
				}
			/>
			<IconButton
				size="small"
				color="primary"
				children={<RestartAltRounded />}
				onClick={() => targetCallback(label, "0")}
			/>
		</Grid>
	));

	return (
		<PaddedPaper
			square
			elevation={2}
		>
			<Tabs
				value={mode}
				onChange={handleTabChange}
			>
				<Tab
					disableRipple
					label="Constraint"
					value="0"
				/>
				<Tab
					disableRipple
					label="Capacity"
					value="1"
				/>
			</Tabs>
			<Typography
				fontWeight="500"
				fontSize="large"
				color="secondary.main"
			>
				{header}
			</Typography>
			<Grid
				container
				spacing={2}
			>
				{renderedItems}
			</Grid>
		</PaddedPaper>
	);
};
