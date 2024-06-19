import { RestartAltRounded } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { FC } from "react";
import { toIconURL } from "~assets/icon";
import { StyledTextField } from "./StyledTextField";

type SorterFieldProps = {
	value: string;
	label: string;
	onChange: (l: string, next: string) => void;
	maxConnection: number;
};
export const SorterField: FC<SorterFieldProps> = (
	props,
) => {
	const {
		value,
		label,
		onChange,
		maxConnection,
	} = props;

	const handleReset = () => {
		onChange(label, "0");
	};
	const handleChange = (next: string) => {
		onChange(label, next);
	};
	const suffix = `/${maxConnection}`;
	return (
		<Stack
			direction="row"
			alignItems="center"
		>
			<StyledTextField
				label={label}
				maxLength={6}
				value={value}
				suffix={suffix}
				onChange={handleChange}
				prefix={
					<img
						alt={label}
						src={toIconURL(label)}
					/>
				}
			/>
			<IconButton
				disableRipple
				size="small"
				color="primary"
				children={<RestartAltRounded />}
				onClick={handleReset}
			/>
		</Stack>
	);
};
