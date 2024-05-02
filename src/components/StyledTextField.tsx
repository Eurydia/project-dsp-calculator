import { RestartAltRounded } from "@mui/icons-material";
import {
	IconButton,
	InputAdornment,
	Stack,
	TextField,
} from "@mui/material";
import {
	ChangeEvent,
	FC,
	ReactNode,
} from "react";

type StyledTextField = {
	prefix?: ReactNode;
	suffix?: ReactNode;
	disabled?: boolean;
	label: string;
	maxLength: number;
	value: string;
	onChange: (value: string) => void;
	onReset: () => void;
};
export const StyledTextField: FC<
	StyledTextField
> = (props) => {
	const {
		disabled,
		maxLength,
		prefix,
		suffix,
		label,
		value,
		onChange,
		onReset,
	} = props;

	const handleReset = () => {
		onReset();
	};

	const handleValueChange = (
		event: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement
		>,
	) => {
		const nextValue = event.target.value
			.slice(0, maxLength)
			.normalize();
		onChange(nextValue);
	};

	return (
		<Stack
			direction="row"
			alignItems="center"
		>
			<TextField
				fullWidth
				disabled={disabled}
				label={label}
				value={value}
				onChange={handleValueChange}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							{prefix}
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment position="end">
							{suffix}
						</InputAdornment>
					),
				}}
			/>
			<IconButton
				size="small"
				onClick={handleReset}
			>
				<RestartAltRounded />
			</IconButton>
		</Stack>
	);
};
