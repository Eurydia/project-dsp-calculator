import { RestartAltRounded } from "@mui/icons-material";
import {
	Grid,
	IconButton,
	Tab,
	Tabs,
} from "@mui/material";
import {
	FC,
	SyntheticEvent,
	useMemo,
} from "react";
import { toIconURL } from "~assets/icon";
import {
	ComputeFormData,
	ComputeFormHandlers,
} from "~types/query";
import { PaddedPaper } from "./PaddedPaper";
import { StyledTextField } from "./StyledTextField";

type ComputeFormProps = {
	data: ComputeFormData;
	handlers: ComputeFormHandlers;
};
export const ComputeForm: FC<ComputeFormProps> = (
	props,
) => {
	const { data, handlers } = props;

	const handleComputeModeChange = (
		_: SyntheticEvent<Element, Event>,
		value: string,
	) => {
		handlers.handleComputeModeChange(value);
	};

	const items = useMemo(() => {
		return data.computeMode === "0"
			? data.constraint
			: data.capacity;
	}, [data.computeMode]);

	const callback = useMemo(() => {
		return data.computeMode === "0"
			? handlers.handleConstraintUpdate
			: handlers.handleCapacityUpdate;
	}, [data.computeMode]);

	const itemFields = Object.entries(items).map(
		([label, value]) => (
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
						callback(label, nextValue)
					}
				/>
				<IconButton
					size="small"
					color="primary"
					children={<RestartAltRounded />}
					onClick={() => callback(label, "")}
				/>
			</Grid>
		),
	);

	return (
		<PaddedPaper
			square
			elevation={2}
		>
			<Tabs
				value={data.computeMode}
				onChange={handleComputeModeChange}
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
			<Grid
				container
				spacing={2}
			>
				{itemFields}
			</Grid>
		</PaddedPaper>
	);
};
