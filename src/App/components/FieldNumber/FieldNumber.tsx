import {
	ChangeEvent,
	FC,
	ReactNode,
} from "react";

import {
	InputAdornment,
	TextField,
} from "@mui/material";

type FieldNumberProps = {
	disabled: boolean;
	prefix?: ReactNode;
	suffix?: ReactNode;
	label: string;
	value: string;
	onValueChange: (value: string) => void;
};
export const FieldNumber: FC<FieldNumberProps> = (
	props,
) => {
	const {
		disabled,
		prefix,
		suffix,
		label,
		value,
		onValueChange,
	} = props;

	const handleContentChange = (
		event: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement
		>,
	) => {
		onValueChange(event.target.value);
	};

	return (
		<TextField
			disabled={disabled}
			fullWidth
			label={label}
			value={value}
			onChange={handleContentChange}
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
