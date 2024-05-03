import { RestartAltRounded } from "@mui/icons-material";
import {
	Grid,
	IconButton,
	Tab,
	Tabs,
} from "@mui/material";
import { FC } from "react";
import { ingredientIconFromLabel } from "~assets/index";
import { PaddedPaper } from "~components/PaddedPaper";
import { StyledHeadingB } from "~components/StyledHeadings";
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
						src={ingredientIconFromLabel(label)}
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
			<StyledHeadingB>{header}</StyledHeadingB>
			<Grid
				container
				spacing={2}
			>
				{renderedItems}
			</Grid>
		</PaddedPaper>
	);
};
