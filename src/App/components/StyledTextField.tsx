import {
	ChangeEvent,
	FC,
	ReactNode,
} from "react";
import {
	InputAdornment,
	TextField,
} from "@mui/material";

type StyledTextField = {
	prefix?: ReactNode;
	suffix?: ReactNode;
	disabled?: boolean;
	label: string;
	maxLength: number;
	value: string;
	onChange: (value: string) => void;
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
	} = props;

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
	);
};
