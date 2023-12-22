import { FC } from "react";
import {
	Box,
	Grid,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import { StarRounded } from "@mui/icons-material";

import { FieldNumber } from "../FieldNumber";

type FormItemProps = {
	isPrimaryObjective: boolean;
	label: string;
	value: number;
	onValueChange: (nextValue: number) => void;
};
const FormItem: FC<FormItemProps> = (props) => {
	const {
		isPrimaryObjective,
		label,
		value,
		onValueChange,
	} = props;

	const { palette } = useTheme();

	return (
		<Box>
			<Grid
				container
				alignItems="center"
				spacing={1}
				columns={{ xs: 5, sm: 10 }}
			>
				<Grid
					item
					xs={5}
					sm={2}
					md={1}
				>
					<Typography
						color={
							isPrimaryObjective
								? palette.primary.main
								: palette.text.primary
						}
					>
						{label}
					</Typography>
				</Grid>
				<Grid
					item
					xs
					sm={5}
				>
					<FieldNumber
						label={`${label} production`}
						suffix="/min"
						prefix={
							isPrimaryObjective ? (
								<StarRounded color="primary" />
							) : null
						}
						minValue={0}
						maxValue={Number.MAX_SAFE_INTEGER - 1}
						value={value}
						onValueChange={onValueChange}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};

type FormObjectivesProps = {
	productRatios: { [K: string]: number };
	objectives: { [K: string]: number };
	onObjectiveChange: (
		label: string,
		nextValue: number,
	) => void;
};
export const FormObjectives: FC<
	FormObjectivesProps
> = (props) => {
	const {
		productRatios,
		objectives,
		onObjectiveChange,
	} = props;

	let goalValue = 0;
	let goalLabel = "";

	for (const label of Object.keys(
		productRatios,
	)) {
		const ratio =
			objectives[label] / productRatios[label];
		if (ratio >= goalValue) {
			goalLabel = label;
			goalValue = ratio;
		}
	}

	return (
		<Box>
			<Stack spacing={3.5}>
				{Object.entries(objectives).map(
					(entry) => {
						const [label, value] = entry;
						return (
							<FormItem
								key={label}
								isPrimaryObjective={
									label === goalLabel
								}
								label={label}
								value={value}
								onValueChange={(nextValue) => {
									onObjectiveChange(
										label,
										nextValue,
									);
								}}
							/>
						);
					},
				)}
			</Stack>
		</Box>
	);
};
