import {
	ChangeEvent,
	FC,
	ReactNode,
} from "react";
import {
	InputAdornment,
	TextField,
} from "@mui/material";

type FieldTextProps = {
	prefix?: ReactNode;
	suffix?: ReactNode;
	label: string;

	maxLength: number;

	value: string;
	onValueChange: (next_value: string) => void;
};
export const FieldText: FC<FieldTextProps> = (
	props,
) => {
	const {
		maxLength,
		prefix,
		suffix,
		label,
		value,
		onValueChange,
	} = props;

	const handleValueChange = (
		event: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement
		>,
	) => {
		const valueInput: string = event.target.value;

		onValueChange(
			valueInput.slice(0, maxLength).normalize(),
		);
	};

	return (
		<TextField
			fullWidth
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
